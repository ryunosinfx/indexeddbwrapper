import { IdbUtil } from './IdbUtil';
import { MODE_R, MODE_RW } from './IndexedddbModeConsts';
export class IndexeddbCore {
	constructor(dbName) {
		this.IDBKeyRange = window.IDBKeyRange;
		this.indexedDB = window.indexedDB;
		this.dbName = dbName;
		this.keyPathMap = {};
		this.db = null;
		this.lastVersion = null;
		this.isUpdateOpen = false;
		this.timer = null;
		this.isDBClosed = true;
	}

	getOpenDB(newVersion) {
		return new Promise((resolve, reject) => {
			this.lastVersion = newVersion;
			if (this.lastVersion && this.db) {
				this.db.close();
				this.isUpdateOpen = true;
				// this.cacheClear();
			} else if (this.db && this.isDBClosed === false) {
				resolve(this.db);
				return;
			} else if (this.lastVersion) {
				this.isUpdateOpen = true;
			} else {
				this.isUpdateOpen = false;
			}
			// TODO instance
			const request = this.indexedDB.open(this.dbName, newVersion);
			request.onsuccess = event => {
				this.db = event.target.result;
				this.isDBClosed = false;
				resolve(this.db);
			};
			request.onupgradeneeded = event => {
				this.db = event.target.result;
				this.isDBClosed = false;
				resolve(this.db);
			};
			request.onabort = e => {
				resolve(e);
			};
			request.onerror = e => {
				reject(e);
			};
		});
	}
	closeDB() {
		if (this.isUpdateOpen) {
			this.db.close();
			this.isDBClosed = true;
		} else {
			if (this.timer) {
				clearTimeout(this.timer);
			}
			this.timer = setTimeout(() => {
				this.db.close();
				this.isDBClosed = true;
			}, 1000);
		}
	}
	getObjectStore(db, tableName, tables, mode) {
		const transaction = db.transaction(tables, mode);
		transaction.oncomplete = event => {
			this.closeDB();
		};
		transaction.onerror = event => {
			this.closeDB();
		};
		const table = transaction.objectStore(tableName);
		return table;
	}
	throwNewError(callerName) {
		return e => {
			console.error(e);
			if (e.stack) {
				console.warn(e.stack);
			} else {
				console.warn(e.message, e);
			}
			console.error(callerName ? callerName : '' + '/' + e);
			throw new Error(e);
		};
	}
	getKeyPathByMap(tableName) {
		return this.keyPathMap[tableName];
	}
	async getKeyPath(tableName) {
		const keyPathName = this.keyPathMap[tableName];
		if (keyPathName !== undefined && keyPathName !== null) {
			return keyPathName;
		}
		const db = await this.getOpenDB().catch(this.throwNewError('getKeyPath->getOpenDB'));
		const objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		this.closeDB();
		const keyPathNameCurrent = objectStore.keyPath;
		this.keyPathMap[tableName] = keyPathNameCurrent;
		return keyPathNameCurrent;
	}
	//private
	async getCurrentVersion() {
		const db = await this.getOpenDB().catch(this.throwNewError('getCurrentVersion->getOpenDB'));
		const version = db.version;
		this.closeDB();
		return version;
	}
	//public
	async selectAll(payload) {
		const { tableName, range, condetions } = payload;
		return await this._selectAll(tableName, range, condetions);
	}
	//Select In-line-Keyで返す。
	async _selectAll(tableName, range, direction, offset, count, callback) {
		const db = await this.getOpenDB().catch(this.throwNewError('_selectAll->getOpenDB tableName:' + tableName));
		const objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		return await this._selectAllExecute(objectStore, range, false, offset, count, callback);
	}
	_selectAllExecute(objectStore, range, isGetFirstOne, offset, count, callback) {
		return new Promise((resolve, reject) => {
			const isValidCallBack = typeof offset === 'function';
			const isOnLimit = typeof offset === 'number' && typeof count === 'number' && offset > 0 && count > 0;
			const endCount = offset + count;
			const list = [];
			let rowCount = 0;
			const req = range === undefined ? objectStore.openCursor() : objectStore.openCursor(range);
			req.onsuccess = event => {
				const cursor = event.target.result;
				if (cursor) {
					const value = cursor.value;
					if (isValidCallBack && !callback(value)) {
						cursor.continue();
						return;
					}
					if (isOnLimit) {
						if (offset > rowCount) {
							rowCount++;
							cursor.continue();
							return;
						} else if (endCount < rowCount) {
							resolve(list);
							return;
						}
					}
					// console.log(cursor.value)
					list.push(value);
					if (isGetFirstOne) {
						resolve(list[0]);
						return;
					}
					rowCount++;
					cursor.continue();
				} else {
					resolve(list);
				}
			};
			req.onerror = e => {
				reject(e);
			};
		});
	}
	//public
	async selectByKey(payload) {
		const { tableName, key } = payload;
		return await this._selectByKey(tableName, key);
	}
	//Select In-line-return promise;Keyで返す。
	async _selectByKey(tableName, key) {
		const db = await this.getOpenDB().catch(this.throwNewError('_selectByKey->getOpenDB tableName:' + tableName));
		// console.log("_selectByKey tableName:" + tableName + "/pk:" + key);
		// console.log(key);
		return await this._selectByKeyOnTran(db, tableName, key).catch(this.throwNewError('_selectByKey->_selectByKeyOnTran tableName:' + tableName + '/mode:' + MODE_R));
	}
	_selectByKeyOnTran(db, tableName, key, tables, mode = MODE_R) {
		return new Promise((resolve, reject) => {
			const objectStore = this.getObjectStore(db, tableName, [tableName], mode);
			const request = objectStore.get(key); //keyはsonomama
			request.onsuccess = event => {
				const result = request.result;
				resolve(result);
			};
			request.onerror = e => {
				reject(e);
			};
		});
	}
	//public
	async selectByKeys(payload) {
		const { tableName, keys } = payload;
		return await this._selectByKeys(tableName, keys);
	}
	//Select In-line-return promise;Keyで返す。
	async _selectByKeys(tableName, keys) {
		const db = await this.getOpenDB().catch(this.throwNewError('_selectByKeys->getOpenDB tableName:' + tableName));
		return await this._selectByKeysOnTran(db, tableName, keys).catch(this.throwNewError('_selectByKeys->_selectByKeyOnTran tableName:' + tableName));
	}
	async _selectByKeysOnTran(db, tableName, keys, tables) {
		const objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		return await this._selectByKeysOnTranExec(objectStore, keys, tableName);
	}
	async _selectByKeysOnTranExec(objectStore, keys, tableName) {
		const retMap = {};
		for (let key of keys) {
			const result = await this._getByKeyFromeObjectStore(objectStore, key);
			retMap[key] = result;
		}
		return retMap;
	}
	_getByKeyFromeObjectStore(objectStore, key) {
		return new Promise((resolve, reject) => {
			if (!key) {
				resolve(null);
			}
			const request = objectStore.get(key); //keyはsonomama
			request.onsuccess = event => {
				resolve(request.result);
			};
			request.onerror = e => {
				reject(e);
			};
		});
	}
	//public
	async selectFirstOne(payload) {
		const { tableName, range, direction } = payload;
		return await this._selectFirstOne(tableName, range, direction);
	}
	//Select FirstOnek
	async _selectFirstOne(tableName, range, direction) {
		const db = await this.getOpenDB().catch(this.throwNewError('_selectFirstOne->getOpenDB tableName:' + tableName));
		const objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		return await this._selectAllExecute(objectStore, range, true);
	}

	//InsertUpdate
	async insertUpdate(payload) {
		const { tableName, data, callback } = payload;
		const keyPathName = this.getKeyPathByMap();
		return await this._insertUpdate(tableName, keyPathName, data, callback).catch(this.throwNewError('insertUpdate->_insertUpdate tableName:' + tableName));
	}
	//private
	async bulkInsertUpdate(tableName, keyPathName, data, callback) {
		for (let record of data) {
			await this._insertUpdate(tableName, keyPathName, record, callback);
		}
	}
	//----------------------------------------------------------------
	//private
	async _bulkInsertUpdate(tableName, keyPathName, data, callback) {
		const dataList = [];
		const keys = [];
		for (let recoord of data) {
			const key = recoord[keyPathName];
			dataList.push({ key, data: record });
			keys.push(key);
		}
		const db = await this.getOpenDB().catch(this.throwNewError('_insertUpdate->getOpenDB tableName:' + tableName));
		const tables = IdbUtil.currentTables(tableName);
		const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		const dataMap = await this._selectByKeysOnTranExec(objectStore, keys, tableName);
		await this._bulkUpdateExecute(objectStore, tableName, dataList, dataMap);
		await this._bulkInsertExecute(objectStore, tableName, dataList, dataMap);
		if (typeof callback === 'function') {
			callback();
		}
	}
	_bulkInsertExecute(objectStore, tableName, dataList, dataMap) {
		const promises = [];
		for (const { key, data } of dataList) {
			if (dataMap[key]) {
				continue;
			}
			const promise = this._bulkInsertExecuteOne(objectStore, key, data);
			promises.push(promise);
		}
		return Promise.all(promises);
	}
	_bulkInsertExecuteOne(objectStore, key, data) {
		return new Promise((resolve, reject) => {
			const objectStoreRequest = objectStore.add(data); //,keyPath
			objectStoreRequest.onsuccess = event => {
				resolve({ data, key });
			};
			objectStoreRequest.onerror = e => {
				console.error(e);
				reject(e);
			};
		});
	}
	_bulkUpdateExecute(objectStore, tableName, dataList, dataMap) {
		const promises = [];
		for (const { key, data } of dataList) {
			if (!dataMap[key]) {
				continue;
			}
			const promise = this._bulkUpdateExecuteOne(objectStore, key, data);
			promises.push(promise);
		}
		return Promise.all(promises);
	}
	_bulkUpdateExecuteOne(objectStore, key, data) {
		return new Promise((resolve, reject) => {
			const objectStoreRequest = objectStore.put(data); //,keyPath
			objectStoreRequest.onsuccess = event => {
				resolve({ data, key });
			};
			objectStoreRequest.onerror = e => {
				console.error(e);
				reject(e);
			};
		});
	}
	//----------------------------------------------------------------
	//private
	async _insertUpdate(tableName, keyPathName, data, callback) {
		const key = data[keyPathName];
		const db = await this.getOpenDB().catch(this.throwNewError('_insertUpdate->getOpenDB tableName:' + tableName));
		const tables = IdbUtil.currentTables(tableName);
		const value = await this._selectByKeyOnTran(db, tableName, key, tables, MODE_RW).catch(this.throwNewError('_insertUpdate->_selectByKeyOnTran tableName:' + tableName + '/MODE_RW'));
		if (callback) {
			callback(value, data);
		}
		let result = null;
		// console.log(value);
		if (value === undefined) {
			result = await this._insertExecute(db, tableName, key, data, tables).catch(this.throwNewError('_insertUpdate->_insertExecute tableName:' + tableName));
		} else {
			result = await this._updateExecute(db, tableName, key, data, tables).catch(this.throwNewError('_insertUpdate->_updateExecute tableName:' + tableName));
		}
		// const value2 = await this._selectByKeyOnTran(db, tableName, key, tables, MODE_RW);
		// console.log(result);
		// console.log(value2);
		return result;
	}
	_insertExecute(db, tableName, key, data, tables) {
		const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		return new Promise((resolve, reject) => {
			const objectStoreRequest = objectStore.add(data); //,keyPath
			objectStoreRequest.onsuccess = event => {
				resolve({ data, key });
			};
			objectStoreRequest.onerror = e => {
				console.error(e);
				reject(e);
			};
		});
	}
	_updateExecute(db, tableName, key, data, tables) {
		return new Promise((resolve, reject) => {
			const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			const request = objectStore.put(data); //,keyPathValue
			request.onsuccess = event => {
				resolve({ data, key });
			};
			request.onerror = e => {
				console.error(e);
				resolve(e);
			};
		});
	}
	//public
	async deleteWithRange(payload) {
		const { tableName, range, condetions } = payload;
		return await this._deleteWithRange(tableName, range, condetions);
	}
	//Delete
	async _deleteWithRange(tableName, range, condetions) {
		const db = await this.getOpenDB().catch(this.throwNewError('_deleteWithRange->getOpenDB tableName:' + tableName));
		const tables = IdbUtil.currentTables(tableName);
		return await this._deleteWithRangeExecute(db, tableName, range, condetions, tables);
	}
	_deleteWithRangeExecute(db, tableName, range, condetions, tables) {
		return new Promise((resolve, reject) => {
			const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			const request = objectStore.openCursor(range);
			request.onsuccess = event => {
				const cursor = event.target.result;
				const list = [];
				if (cursor) {
					const value = cursor.value;
					if (IdbUtil.isMutch(value, condetions)) {
						const key = cursor.key;
						const or = objectStore.delete(key);
						or.onsuccess = event => {
							list.push(value);
						};
						or.onerror = e => {
							//momiee
						};
					}
					cursor.continue();
				} else {
					resolve(list);
				}
			};
			request.onerror = e => {
				reject(e);
			};
		});
	}
	//public
	async delete(payload) {
		const { tableName, key } = payload;
		return await this._delete(tableName, key);
	}
	//Delete
	async _delete(tableName, keyPathValue) {
		const db = await this.getOpenDB().catch(this.throwNewError('_delete->getOpenDB tableName:' + tableName));
		const tables = IdbUtil.currentTables(tableName);
		return await this._deleteOnTran(db, tableName, keyPathValue, tables);
	}
	_deleteOnTran(db, tableName, key, tables) {
		return new Promise((resolve, reject) => {
			const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			const request = objectStore.delete(key + '');
			request.onsuccess = event => {
				resolve({ tableName, key });
			};
			request.onerror = e => {
				console.error(e);
				reject(e);
			};
		});
	}
	//public
	async truncate(payload) {
		const { tableName } = payload;
		return await this._truncate(tableName);
	}
	//truncate
	async _truncate(tableName) {
		const db = await this.getOpenDB().catch(this.throwNewError('_truncate->getOpenDB tableName:' + tableName));
		const tables = IdbUtil.currentTables(tableName);
		return await this._truncateExecute(db, tableName, tables);
	}
	//truncate
	_truncateExecute(db, tableName, tables) {
		return new Promise((resolve, reject) => {
			const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			const request = objectStore.clear();
			request.onsuccess = event => {
				resolve();
			};
			request.onerror = e => {
				reject(e);
			};
		});
	}
	async getObjectStoreNames() {
		const db = await this.getOpenDB().catch(this.throwNewError('getObjectStoreNames->getOpenDB'));
		const names = db.objectStoreNames;
		this.closeDB();
		return names;
	}
	async isExistsObjectStore(tableName) {
		const db = await this.getOpenDB().catch(this.throwNewError('isExistsObjectStore->getOpenDB tableName:' + tableName));
		let isExist = false;
		for (let name of db.objectStoreNames) {
			if (name === tableName) {
				isExist = true;
				break;
			}
		}
		this.closeDB();
		return isExist;
	}
	async createIndex(tableName, keyPath, isMultiEntry) {
		const db = await this.getOpenDB().catch(this.throwNewError('getObjectStoreNames->getOpenDB'));
		const names = db.objectStoreNames;
		this._createIndex(db, tableName, keyPath, isMultiEntry);
		this.closeDB();
		return names;
	}
	_createIndex(db, tableName, keyPath, isMultiEntry) {
		const tables = IdbUtil.currentTables(tableName);
		const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		const indexName = tableName + '-' + keyPath;
		return objectStore.createIndex(indexName, keyPath, { multiEntry: !!isMultiEntry });
	}
	async getIndexNames(tableName) {
		const tables = IdbUtil.currentTables(tableName);
		const db = await this.getOpenDB().catch(this.throwNewError('getObjectStoreNames->getOpenDB'));
		const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		const names = objectStore.indexNames;
		this.closeDB();
		return names;
	}
	async deleteIndex(tableName) {
		const db = await this.getOpenDB().catch(this.throwNewError('getObjectStoreNames->getOpenDB'));
		const names = db.objectStoreNames;
		this.closeDB();
		return names;
	}
	_deleteIndex(db, tableName) {
		const tables = IdbUtil.currentTables(tableName);
		const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		const indexName = tableName + '-' + keyPath;
		const names = objectStore.indexNames;
		if (names.includes(indexName)) {
			return objectStore.deleteIndex(indexName);
		}
		return null;
	}
	//public
	async createStore(payload) {
		const { tableName, keyPathName, isAutoIncrement } = payload;
		return await this._createStore(tableName, keyPathName, isAutoIncrement);
	}
	//createStore
	async _createStore(tableName, keyPathName, isAutoIncrement) {
		const isExistsObjectStore = await this.isExistsObjectStore();
		if (isExistsObjectStore === false) {
			const newVersion = (await this.getCurrentVersion()) + 1;
			const db = await this.getOpenDB(newVersion).catch(this.throwNewError('_createStore->getOpenDB tableName:' + tableName));
			let isExist = false;
			for (let name of db.objectStoreNames) {
				if (name === tableName) {
					isExist = true;
					break;
				}
			}
			if (isExist === false) {
				db.createObjectStore(tableName, { keyPath: keyPathName });
			}
			this.closeDB();
		}
	}
	//public
	async dropStore(payload) {
		const { tableName } = payload;
		return await this._dropStore(tableName);
	}
	//DropStore
	async _dropStore(tableName) {
		const newVersion = (await this.getCurrentVersion()) + 1;
		const db = await this.getOpenDB(newVersion).catch(this.throwNewError('_dropStore->getOpenDB tableName:' + tableName));
		db.deleteObjectStore(tableName);
		this.closeDB();
		return;
	}
}
