var indexeddbwrapper =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dest/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! exports provided: indexedbwrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexedbwrapper", function() { return indexedbwrapper; });
/* harmony import */ var _src_indexeddbWrapper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/indexeddbWrapper */ "./src/indexeddbWrapper.js");

const indexedbwrapper = _src_indexeddbWrapper__WEBPACK_IMPORTED_MODULE_0__["idbw"];
module.exports = {
	run: function() {
		console.log('run from library');
	}
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/constant.js":
/*!*************************!*\
  !*** ./src/constant.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const ua = navigator.userAgent.replace(/[\.0-9]+/g, "x");
const domain = window.location;
/* harmony default export */ __webpack_exports__["default"] = ({
	dbName: "IDBWrapper",
	ua: ua,
	domain: domain,
	keypathName: "pk"
});

/***/ }),

/***/ "./src/idbUtil.js":
/*!************************!*\
  !*** ./src/idbUtil.js ***!
  \************************/
/*! exports provided: IdbUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdbUtil", function() { return IdbUtil; });
class IdbUtil {
	static currentTables(table, tabels) {
		return tabels ? tabels : [table];
	}
	// static async getTransaction(db,tables,mode,reject,reject){
	//   let transaction = db.transaction(tables, mode);
	//   transaction.oncomplete = (event) => {
	//     db.close();
	//     resolve();
	//   };
	//   transaction.onerror = (event) => {
	//     db.close();
	//     reject();
	//   };
	// }

	//private
	static isMutch(value, condetions) {
		if (condetions === undefined || condetions === null) {
			return false;
		}
		if (Array.isArray(condetions)) {
			for (let condition of condetions) {
				if (IdbUtil.isMutch(value, condition)) {
					return true;
				}
			}
			return false;
		} else {
			for (let key in condetions) {
				let condition = condetions[key];
				if (typeof condition === 'object') {
					if (IdbUtil.isMutch(value, condition)) {
						return true;
					}
				} else {
					let target = value[key];
					if (target !== condition) {
						return false;
					}
				}
			}
			return true;
		}
	};
	static makeKeyRange(start, end, isNotEqualStart, isNotEqualEnd) {
		return (isNotEqualStart === undefined && isNotEqualEnd === undefined) ?
			IDBKeyRange.bound(start, end, false, false) :
			IDBKeyRange.bound(start, end, isNotEqualStart, isNotEqualEnd);
	}
	static makeKeyRangeUpper(start, isNotEqualStart) {
		return (isNotEqualStart !== true) ?
			IDBKeyRange.upperBound(start) :
			IDBKeyRange.upperBound(start, isNotEqualStart);
	}
	static makeKeyRangeLower(end, isNotEqualEnd) {
		return (isNotEqualStart !== true) ?
			KeyRange.lowerBound(end) :
			IDBKeyRange.lowerBound(end, isNotEqualEnd);
	}
	static makeKeyRangeOnly(only) {
		return (isNotEqualStart !== true) ?
			IDBKeyRange.only(only) :
			IDBKeyRange.lowerBound(end, isNotEqualEnd);
	}
	//IDを生成
	static buildKeyPath(key1, key2, key3, key4, key5) {
		let array = [];
		if (key1 !== undefined) {
			array.push((key1 + "")
				.split("&")
				.join("&amp;")
				.split(".")
				.join("&#046;"));
		}
		if (key2 !== undefined) {
			array.push((key2 + "")
				.split("&")
				.join("&amp;")
				.split(".")
				.join("&#046;"));
		}
		if (key3 !== undefined) {
			array.push((key3 + "")
				.split("&")
				.join("&amp;")
				.split(".")
				.join("&#046;"));
		}
		if (key4 !== undefined) {
			array.push((key4 + "")
				.split("&")
				.join("&amp;")
				.split(".")
				.join("&#046;"));
		}
		if (key5 !== undefined) {
			array.push((key5 + "")
				.split("&")
				.join("&amp;")
				.split(".")
				.join("&#046;"));
		}
		return array.join("");
	};
}

/***/ }),

/***/ "./src/indexeddbAccessor.js":
/*!**********************************!*\
  !*** ./src/indexeddbAccessor.js ***!
  \**********************************/
/*! exports provided: IndexeddbAccessor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexeddbAccessor", function() { return IndexeddbAccessor; });
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant */ "./src/constant.js");
/* harmony import */ var _indexeddbHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexeddbHelper */ "./src/indexeddbHelper.js");


const initQueue = [];
let dbName = _constant__WEBPACK_IMPORTED_MODULE_0__["default"].dbName;
// stock par db
const idbHelperMap = new Map();
class IndexeddbAccessor {
	constructor(objectStoreName, keypathName = _constant__WEBPACK_IMPORTED_MODULE_0__["default"].keypathName, currentDbName = dbName) {
		if (!idbHelperMap.has(currentDbName)) {
			this.idbh = new _indexeddbHelper__WEBPACK_IMPORTED_MODULE_1__["IndexeddbHelper"](currentDbName);
			idbHelperMap.set(currentDbName, this.idbh);
		} else {
			this.idbh = idbHelperMap.get(currentDbName);
		}
		this.keyPathName = keypathName;
		this.objectStoreName = objectStoreName;
	}
	static setDbName(dbNameNew) {
		dbName = dbNameNew;
	}
	init() {
		return new Promise((reslve, reject) => {
			this.idbh.createStore(this.objectStoreName, this.keyPathName)
				.then(() => {
					reslve(true)
				}, (e) => {
					reject(e);
					throw e;
				});
		});
	}
	async putByMap(dataMap, callback) {
		const record = {
			data: data
		};
		record[this.keyPathName] = key;
		//console.log("saveDataDefault 001:" + key + "/" + data);
		await this.putRecord(record, undefined, callback);
		//console.log("saveDataDefault 002:" + key + "/" + data);
	}
	async put(key, data, callback) {
		const record = {
			data: data
		};
		record[this.keyPathName] = key;
		//console.log("saveDataDefault 001:" + key + "/" + data);
		await this.putRecord(record, undefined, callback);
		//console.log("saveDataDefault 002:" + key + "/" + data);
	}
	async putRecord(record, key, callback) {
		//console.log("saveData 001:" + key + "/" + JSON.stringify(dataObj)+"/dataObj.data:"+dataObj.data);
		const storeData = record;
		//console.log("saveData 002:" + key + "/" + dataObj[this.keyPathName]);
		if (record[this.keyPathName] === undefined) {
			storeData = {
				data: record
			};
			storeData[this.keyPathName] = key;
		} else if (key !== undefined) {}
		//console.log("saveData 003:" + key + "/" + dataObj +"/this.objectStoreName:"+this.objectStoreName);
		const value = await this.idbh.insertUpdate(this.objectStoreName, this.keyPathName, storeData, callback);
		//console.log("saveData 004:" + key + "/" + dataObj+"/"+JSON.stringify(value)+"/"+value.data.data);
		return value;
	}
	async getAsMap(keys) {
		if (keys !== undefined) {
			const recordAsLoadedData = await this.idbh.selectByKeys(this.objectStoreName, keys);
			return recordAsLoadedData;
		}
		return null;
	}
	async getRecord(key) {
		if (key !== undefined) {
			const recordAsLoadedData = await this.idbh.selectByKey(this.objectStoreName, key);
			return recordAsLoadedData;
		}
		return null;
	}
	async get(key) {
		const recordAsDefaultLoad = await this.getRecord(key);
		return recordAsDefaultLoad === undefined || recordAsDefaultLoad === null ?
			null :
			recordAsDefaultLoad.data;
	}
	async getAll() {
		return await this.idbh.selectAll(this.objectStoreName);
	}
	async delete(key) {
		if (key !== undefined) {
			return await this.idbh.delete(this.objectStoreName, key);
		}
		return null;
	}
	async getOsNames() {
		return await this.idbh.getObjectStoreNames();
	}
}

/***/ }),

/***/ "./src/indexeddbCore.js":
/*!******************************!*\
  !*** ./src/indexeddbCore.js ***!
  \******************************/
/*! exports provided: IndexeddbCore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexeddbCore", function() { return IndexeddbCore; });
/* harmony import */ var _idbUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idbUtil */ "./src/idbUtil.js");

const MODE_R = "readonly";
const MODE_RW = "readwrite";
class IndexeddbCore {
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
		this.tableCache = {};
	}

	getOpenDB(newVersion) {
		return new Promise((resolve, reject) => {
			this.lastVersion = newVersion;
			if ((this.lastVersion) && this.db) {
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
			let request = this.indexedDB.open(this.dbName, newVersion);
			request.onsuccess = (event) => {
				this.db = event.target.result;
				this.isDBClosed = false;
				resolve(this.db);
			};
			request.onupgradeneeded = (event) => {
				this.db = event.target.result;
				this.isDBClosed = false;
				resolve(this.db);
			};
			request.onabort = (e) => {
				resolve(e);
			};
			request.onerror = (e) => {
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
	cacheClear() {
		const keys = [];
		for (let tableName in this.tableCache) {
			keys.push(tableName);
		}
		for (let tableName of keys) {
			const tableCache = this.tableCache[tableName];
			for (let index in tableCache) {
				delete tableCache[index];
			}
		}
	}
	setCache(tableName, key, value) {
		if (!value || !value.data) {
			return;
		}
		const data = value.data;
		for (let key in data) {
			const elm = data[key];
			if (elm && elm.byteLength) {
				return;
			}
		}
		if (!this.tableCache[tableName]) {
			this.tableCache[tableName] = {};
		}
		this.tableCache[tableName][key] = value;
	}
	getCache(tableName, key) {
		const tableCache = this.tableCache[tableName];
		return tableCache ? tableCache[key] : null;
	}
	getObjectStore(db, tableName, tables, mode) {
		if (mode === MODE_R) {
			this.cacheClear();
		}
		let transaction = db.transaction(tables, mode);
		transaction.oncomplete = (event) => {
			this.closeDB();
		};
		transaction.onerror = (event) => {
			this.closeDB();
		};
		const table = transaction.objectStore(tableName);
		return table;
	}
	throwNewError(callerName) {
		return (e) => {
			console.error(e);
			if (e.stack) {
				console.log(e.stack);
			} else {
				console.log(e.message, e);
			}
			console.error(
				callerName ?
				callerName :
				"" + "/" + e);
			throw new Error(e);
		}
	}
	getKeyPathByMap(tableName) {
		return this.keyPathMap[tableName];
	}
	async getKeyPath(tableName) {
		let keyPathName = this.keyPathMap[tableName];
		if (keyPathName !== undefined && keyPathName !== null) {
			return keyPathName;
		}
		const db = await this.getOpenDB()
			.catch(this.throwNewError("getKeyPath->getOpenDB"));
		let objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		this.closeDB();
		let keyPathNameCurrent = objectStore.keyPath;
		this.keyPathMap[tableName] = keyPathNameCurrent;
		return keyPathNameCurrent;
	}
	//private
	async getCurrentVersion() {
		let db = await this.getOpenDB()
			.catch(this.throwNewError("getCurrentVersion->getOpenDB"));
		const version = db.version;
		this.closeDB();
		return version;
	};
	//public
	async selectAll(payload) {
		let { tableName, range, condetions } = payload;
		return await this._selectAll(tableName, range, condetions);
	}
	//Select In-line-Keyで返す。
	async _selectAll(tableName, range, direction, offset, count, callback) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_selectAll->getOpenDB tableName:" + tableName));
		let objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		return await this._selectAllExecute(objectStore, range, false, offset, count, callback);
	};
	_selectAllExecute(objectStore, range, isGetFirstOne, offset, count, callback) {
		return new Promise((resolve, reject) => {
			const isValidCallBack = typeof offset === "function";
			const isOnLimit = typeof offset === "number" && typeof count === "number" && offset > 0 && count > 0;
			const endCount = offset + count;
			const list = [];
			let rowCount = 0;
			let req = range === undefined ?
				objectStore.openCursor() :
				objectStore.openCursor(range);
			req.onsuccess = (event) => {
				let cursor = event.target.result;
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
			req.onerror = (e) => {
				reject(e);
			};
		});
	}
	//public
	async selectByKey(payload) {
		let { tableName, key } = payload;
		return await this._selectByKey(tableName, key);
	}
	//Select In-line-return promise;Keyで返す。
	async _selectByKey(tableName, key) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_selectByKey->getOpenDB tableName:" + tableName));
		// console.log("_selectByKey tableName:" + tableName + "/pk:" + key);
		// console.log(key);
		return await this._selectByKeyOnTran(db, tableName, key)
			.catch(this.throwNewError("_selectByKey->_selectByKeyOnTran tableName:" + tableName + "/mode:" + MODE_R));
	}
	_selectByKeyOnTran(db, tableName, key, tables, mode = MODE_R) {
		return new Promise((resolve, reject) => {
			const cachekey = tableName + "_" + mode;
			const cache = this.getCache(cachekey, key);
			if (cache) {
				resolve(cache);
			} else {
				let objectStore = this.getObjectStore(db, tableName, [tableName], mode);
				let request = objectStore.get(key); //keyはsonomama
				request.onsuccess = (event) => {
					const result = request.result;
					resolve(result);
					this.setCache(cachekey, key, result);
				};
				request.onerror = (e) => {
					reject(e);
				};
			}
		});
	}
	//public
	async selectByKeys(payload) {
		let { tableName, keys } = payload;
		return await this._selectByKeys(tableName, keys);
	}
	//Select In-line-return promise;Keyで返す。
	async _selectByKeys(tableName, keys) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_selectByKeys->getOpenDB tableName:" + tableName));
		return await this._selectByKeysOnTran(db, tableName, keys)
			.catch(this.throwNewError("_selectByKeys->_selectByKeyOnTran tableName:" + tableName));
	}
	async _selectByKeysOnTran(db, tableName, keys, tables) {
		let objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		return await this._selectByKeysOnTranExec(objectStore, keys, tableName);
	}
	async _selectByKeysOnTranExec(objectStore, keys, tableName) {
		const retMap = {};
		for (let key of keys) {
			const cache = this.getCache(tableName, key);
			const result = cache ? cache : await this._getByKeyFromeObjectStore(objectStore, key);
			if (!cache) {
				this.setCache(tableName, key, result);
			}
			retMap[key] = result;
		}
		return retMap;
	}
	_getByKeyFromeObjectStore(objectStore, key) {
		return new Promise((resolve, reject) => {
			if (!key) {
				resolve(null);
			}
			let request = objectStore.get(key); //keyはsonomama
			request.onsuccess = (event) => {
				resolve(request.result);
			};
			request.onerror = (e) => {
				reject(e);
			};
		});
	}
	//public
	async selectFirstOne(payload) {
		let { tableName, range, direction } = payload;
		return await this._selectFirstOne(tableName, range, direction);
	}
	//Select FirstOnek
	async _selectFirstOne(tableName, range, direction) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_selectFirstOne->getOpenDB tableName:" + tableName));
		let objectStore = this.getObjectStore(db, tableName, [tableName], MODE_R);
		return await this._selectAllExecute(objectStore, range, true);
	};

	//InsertUpdate
	async insertUpdate(payload) {
		let { tableName, data, callback } = payload;
		const keyPathName = this.getKeyPathByMap();
		return await this._insertUpdate(tableName, keyPathName, data, callback)
			.catch(this.throwNewError("insertUpdate->_insertUpdate tableName:" + tableName));
	}
	//private
	async bulkInsertUpdate(tableName, keyPathName, data, callback) {
		for (let recoord of data) {
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
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_insertUpdate->getOpenDB tableName:" + tableName));
		const tables = _idbUtil__WEBPACK_IMPORTED_MODULE_0__["IdbUtil"].currentTables(tableName);
		const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		const dataMap = await this._selectByKeysOnTranExec(objectStore, keys, tableName);
		await this._bulkUpdateExecute(objectStore, tableName, dataList, dataMap);
		await this._bulkInsertExecute(objectStore, tableName, dataList, dataMap);
		if (typeof callback === "function") {
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
			let objectStoreRequest = objectStore.add(data); //,keyPath
			objectStoreRequest.onsuccess = (event) => {
				resolve({ data, key });
			};
			objectStoreRequest.onerror = (e) => {
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
	};
	_bulkUpdateExecuteOne(objectStore, key, data) {
		return new Promise((resolve, reject) => {
			let objectStoreRequest = objectStore.put(data); //,keyPath
			objectStoreRequest.onsuccess = (event) => {
				resolve({ data, key });
			};
			objectStoreRequest.onerror = (e) => {
				console.error(e);
				reject(e);
			};
		});
	}
	//----------------------------------------------------------------
	//private
	async _insertUpdate(tableName, keyPathName, data, callback) {
		const key = data[keyPathName];
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_insertUpdate->getOpenDB tableName:" + tableName));
		const tables = _idbUtil__WEBPACK_IMPORTED_MODULE_0__["IdbUtil"].currentTables(tableName);
		const value = await this._selectByKeyOnTran(db, tableName, key, tables, MODE_RW)
			.catch(this.throwNewError("_insertUpdate->_selectByKeyOnTran tableName:" + tableName + "/MODE_RW"));
		if (callback) {
			callback(value, data);
		}
		if (value === undefined) {
			return await this._insertExecute(db, tableName, key, data, tables)
				.catch(this.throwNewError("_insertUpdate->_insertExecute tableName:" + tableName));
		} else {
			return await this._updateExecute(db, tableName, key, data, tables)
				.catch(this.throwNewError("_insertUpdate->_updateExecute tableName:" + tableName));
		}
	}
	_insertExecute(db, tableName, key, data, tables) {
		let objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
		return new Promise((resolve, reject) => {
			let objectStoreRequest = objectStore.add(data); //,keyPath
			objectStoreRequest.onsuccess = (event) => {
				resolve({ data, key });
			};
			objectStoreRequest.onerror = (e) => {
				console.error(e);
				reject(e);
			};
		});
	}
	_updateExecute(db, tableName, key, data, tables) {
		return new Promise((resolve, reject) => {
			let objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			let request = objectStore.put(data); //,keyPathValue
			request.onsuccess = (event) => {
				resolve({ data, key });
			};
			request.onerror = (e) => {
				console.error(e);
				resolve(e);
			};
		});
	};
	//public
	async deleteWithRange(payload) {
		let { tableName, range, condetions } = payload;
		return await this._deleteWithRange(tableName, range, condetions);
	}
	//Delete
	async _deleteWithRange(tableName, range, condetions) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_deleteWithRange->getOpenDB tableName:" + tableName));
		const tables = _idbUtil__WEBPACK_IMPORTED_MODULE_0__["IdbUtil"].currentTables(tableName);
		return await this._deleteWithRangeExecute(db, tableName, range, condetions, tables);
	};
	_deleteWithRangeExecute(db, tableName, range, condetions, tables) {
		return new Promise((resolve, reject) => {
			let objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			let request = objectStore.openCursor(range);
			request.onsuccess = (event) => {
				let cursor = event.target.result;
				let list = [];
				if (cursor) {
					let value = cursor.value;
					if (_idbUtil__WEBPACK_IMPORTED_MODULE_0__["IdbUtil"].isMutch(value, condetions)) {
						let or = objectStore.delete(cursor.key);
						or.onsuccess = (event) => {
							list.push(value);
						}
						or.onerror = (e) => {
							//momiee
						};
					}
					cursor.continue();
				} else {
					resolve(list);
				}
			};
			request.onerror = (e) => {
				reject(e);
			};
		});
	}
	//public
	async delete(payload) {
		let { tableName, key } = payload;
		return await this._delete(tableName, key);
	}
	//Delete
	async _delete(tableName, keyPathValue) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_delete->getOpenDB tableName:" + tableName));
		const tables = _idbUtil__WEBPACK_IMPORTED_MODULE_0__["IdbUtil"].currentTables(tableName);
		return await this._deleteOnTran(db, tableName, keyPathValue, tables);
	};
	_deleteOnTran(db, tableName, key, tables) {
		return new Promise((resolve, reject) => {
			let objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			let request = objectStore.delete(key + "");
			request.onsuccess = (event) => {
				resolve({ tableName, key });
			}
			request.onerror = (e) => {
				console.error(e);
				reject(e);
			};
		});
	}
	//public
	async truncate(payload) {
		let { tableName } = payload;
		return await this._truncate(tableName);
	}
	//truncate
	async _truncate(tableName) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("_truncate->getOpenDB tableName:" + tableName));
		const tables = _idbUtil__WEBPACK_IMPORTED_MODULE_0__["IdbUtil"].currentTables(tableName);
		return await this._truncateExecute(db, tableName, tables);
	};
	//truncate
	_truncateExecute(db, tableName, tables) {
		return new Promise((resolve, reject) => {
			let objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			let request = objectStore.clear();
			request.onsuccess = (event) => {
				resolve();
			};
			request.onerror = (e) => {
				reject(e);
			};
		});
	};
	async getObjectStoreNames() {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("getObjectStoreNames->getOpenDB"));
		const names = db.objectStoreNames;
		this.closeDB();
		return names;
	}
	async isExistsObjectStore(tableName) {
		const db = await this.getOpenDB()
			.catch(this.throwNewError("isExistsObjectStore->getOpenDB tableName:" + tableName));
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
	async createIndex(tableName, key) {
			const db = await this.getOpenDB()
				.catch(this.throwNewError("getObjectStoreNames->getOpenDB"));
			const names = db.objectStoreNames;
			this.closeDB();
			return names;
		}
		 _createIndex(db ,tableName, keyPath ,isMultiEntry) {
				const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
				const indexName = tableName+'-'+keyPath;
				return objectStore.createIndex(indexName, keyPath, {multiEntry:!!isMultiEntry});
		}
		async getIndexNames(tableName) {
			const db = await this.getOpenDB()
			.catch(this.throwNewError("getObjectStoreNames->getOpenDB"));
 				const objectStore = this.getObjectStore(db, tableName, tables, MODE_RW);
			const names = objectStore.indexNames;
			this.closeDB();
			return names;
		}
	//public
	async createStore(payload) {
		let { tableName, keyPathName, isAutoIncrement } = payload;
		return await this._createStore(tableName, keyPathName, isAutoIncrement);
	}
	//createStore
	async _createStore(tableName, keyPathName, isAutoIncrement) {
		const isExistsObjectStore = await this.isExistsObjectStore();
		if (isExistsObjectStore === false) {
			const newVersion = (await this.getCurrentVersion()) + 1;
			const db = await this.getOpenDB(newVersion)
				.catch(this.throwNewError("_createStore->getOpenDB tableName:" + tableName));
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
		};
	};
	//public
	async dropStore(payload) {
		let { tableName } = payload;
		return await this._dropStore(tableName);
	}
	//DropStore
	async _dropStore(tableName) {
		const newVersion = (await this.getCurrentVersion()) + 1;
		const db = await this.getOpenDB(newVersion)
			.catch(this.throwNewError("_dropStore->getOpenDB tableName:" + tableName));
		db.deleteObjectStore(tableName);
		this.closeDB();
		return;
	};
}


/***/ }),

/***/ "./src/indexeddbHelper.js":
/*!********************************!*\
  !*** ./src/indexeddbHelper.js ***!
  \********************************/
/*! exports provided: IndexeddbHelper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexeddbHelper", function() { return IndexeddbHelper; });
/* harmony import */ var _idbUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./idbUtil */ "./src/idbUtil.js");
/* harmony import */ var _indexeddbCore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./indexeddbCore */ "./src/indexeddbCore.js");


const MODE_R = "readonly";
const MODE_RW = "readwrite";
const cmdSelectAll = "cmdSelectAll";
const cmdSelectByKey = "cmdSelectByKey";
const cmdSelectByKeys = "cmdSelectByKeys";
const cmdSelectFirstOne = "cmdSelectFirstOne";
const cmdInsertUpdate = "cmdInsertUpdate";
const cmdDeleteWithRange = "cmdDeleteWithRange";
const cmdDelete = "cmdDelete";
const cmdTruncate = "cmdTruncate";
const cmdCreateStore = "cmdCreateStore";
const cmdGetObjectStoreNames = "cmdGetObjectStoreNames";
class IndexeddbHelper {
	constructor(dbName) {
		this.core = new _indexeddbCore__WEBPACK_IMPORTED_MODULE_1__["IndexeddbCore"](dbName);
		this.queue = [];
		this.lastTaskMode = null;
		this.lastLockTime = new Date()
			.getTime();
		this.counter = 0;
	}

	async deQueue() {
		// console.log("deQueue1---:this.counter:" + this.counter);
		if (this.counter < 1) {
			this.counter++;
			if (this.counter > 1) {
				this.counter--;
				setTimeout(async () => { await this.deQueue() }, 0);
			} else {
				await this.deQueueExec();
				// console.log("deQueue2:this.queue.length:" + this.queue.length);
				this.counter--;

				// console.log("deQueue3:this.counter:" + this.counter);
				if (this.counter < 1 && this.queue.length > 0) {
					// console.log("deQueue4:this.counter:" + this.counter);
					this.deQueue();
				}
			}
		}
	}
	deQueueExec() {
		return new Promise(
			(resolve, reject) => {
				while (this.queue.length > 0) {
					// console.log("deQueueExec:1" + "this.counter:" + this.counter);
					const promises = [];
					const selectTasks = [];
					while (this.queue.length > 0) {
						// console.log("deQueueExec:2" + "this.counter:" + this.counter);
						const task = this.queue.shift();
						if (task) {
							if (this.lastTaskMode !== task.mode || task.mode === MODE_RW) {
								//ここでそのまま発行、そして終わるまで待機
								if (promises.length > 0) {
									Promise.all(promises)
										.then(
											(results) => {
												for (let index in results) {
													const taskOfRead = selectTasks[index];
													const result = results[index];
													taskOfRead.resolve(result);
												}
												promises.splice(0, promises.length);
												this.executUpdateTask(task, resolve);
											},
											(error) => {
												alert(error);
												reject(error);
											}
										);
								} else {
									this.executUpdateTask(task, resolve);
								}
								return;
							} else {
								//じゃんじゃん流していこう。
								const promise = this.execCmd(task.cmd, task.data);
								promises.push(promise);
								selectTasks.push(task);
							}
							this.lastTaskMode = task.mode;
						} else {
							//なんだっけ
						}
					}
					if (promises.length > 0) {
						Promise.all(promises)
							.then(
								(results) => {
									for (let index in results) {
										const taskOfRead = selectTasks[index];
										const result = results[index];
										taskOfRead.resolve(result);
									}
									promises.splice(0, promises.length);
									resolve();
								},
								(error) => {
									alert(error);
									reject(error);
								}
							);
					}
				}
			}
		);
	}
	executSelectPromiseAndTask(task, resolve, updateTask) {
		if (updateTask) {
			this.executUpdateTask(updateTask, resolve);
		}
	}
	executUpdateTask(task, resolve) {
		const promise = this.execCmd(task.cmd, task.data);
		promise.then((data) => {
			task.resolve(data);
			resolve(data);
		});
	}
	enQueueReadTask(cmd, data) {
		return this.enQueueTask(cmd, data, MODE_R);
	}
	enQueueWriteTask(cmd, data) {
		return this.enQueueTask(cmd, data, MODE_RW);
	}
	enQueueTask(cmd, data, mode) {
		return new Promise((resolve, reject) => {
			const task = { cmd, data, resolve, reject, mode };
			// console.log("this.enQueueTask1:" + this.counter);
			this.queue.push(task);
			// console.log("this.enQueueTask2:" + this.counter);
			this.deQueue();
			// console.log("this.enQueueTask3:" + this.counter);
		});
	}

	async execCmd(cmd, data) {
		// console.log("cmd:" + cmd + "/data:" + data);
		if (cmdSelectAll === cmd) {
			return await this.core._selectAll(data.tableName, data.range, data.direction, data.offset, data.limmitCount);
		}
		if (cmdSelectByKey === cmd) {
			return await this.core._selectByKey(data.tableName, data.key);
		}
		if (cmdSelectByKeys === cmd) {
			return await this.core._selectByKeys(data.tableName, data.keys);
		}
		if (cmdSelectFirstOne === cmd) {
			return await this.core._selectFirstOne(data.tableName, data.range, data.direction);
		}
		if (cmdInsertUpdate === cmd) {
			return await this.core._insertUpdate(data.tableName, data.keyPathName, data.data, data.callback);
		}
		if (cmdDeleteWithRange === cmd) {
			return await this.core._deleteWithRange(data.tableName, data.range, data.condetions);
		}
		if (cmdDelete === cmd) {
			return await this.core._delete(data.tableName, data.keyPathValue);
		}
		if (cmdTruncate === cmd) {
			return await this.core._truncate(data.tableName);
		}
		if (cmdCreateStore === cmd) {
			return await this.core._createStore(data.tableName, data.keyPathName, data.isAutoIncrement);
		}
		if (cmdGetObjectStoreNames === cmd) {
			return await this.core.getObjectStoreNames();
		}
	}

	//Select In-line-Keyで返す。
	async selectAllForwardMatch(tableName, key, direction, offset, limmitCount) {
		const nextKey = key.slice(0, -1) + String.fromCharCode(key.slice(-1)
			.charCodeAt() + 1);
		const range = IDBKeyRange.bound(str, nextStr, false, true);
		return await this.enQueueReadTask(cmdSelectAll, { tableName, range, direction, offset, limmitCount });
	};
	//Select In-line-Keyで返す。
	async selectAll(tableName, range, direction, offset, limmitCount) {
		return await this.enQueueReadTask(cmdSelectAll, { tableName, range, direction, offset, limmitCount });
	};
	//Select In-line-return promise;Keyで返す。
	async selectByKey(tableName, key) {
		return await this.enQueueReadTask(cmdSelectByKey, { tableName, key });
	}
	//Select In-line-return promise;Keyで返す。
	async selectByKeys(tableName, keys) {
		return await this.enQueueReadTask(cmdSelectByKeys, { tableName, keys });
	}
	//Select FirstOnek
	async selectFirstOne(tableName, range, direction) {
		return await this.enQueueReadTask(cmdSelectFirstOne, { tableName, range, direction });
	};

	//private
	async insertUpdate(tableName, keyPathName, data, callback) {
		return await this.enQueueWriteTask(cmdInsertUpdate, { tableName, keyPathName, data, callback });
	}
	//Delete
	async deleteWithRange(tableName, range, condetions) {
		return await this.enQueueWriteTask(cmdDeleteWithRange, { tableName, range, direction });
	};
	//Delete
	async delete(tableName, keyPathValue) {
		return await this.enQueueWriteTask(cmdDelete, { tableName, keyPathValue });
	};
	//truncate
	async truncate(tableName) {
		return await this.enQueueWriteTask(cmdTruncate, { tableName });
	};
	//truncate
	async createStore(tableName, keyPathName, isAutoIncrement) {
		return await this.enQueueWriteTask(cmdCreateStore, { tableName, keyPathName, isAutoIncrement });
	};
	async getObjectStoreNames() {
		return await this.enQueueReadTask(cmdGetObjectStoreNames, {});
	}
}

/***/ }),

/***/ "./src/indexeddbWrapper.js":
/*!*********************************!*\
  !*** ./src/indexeddbWrapper.js ***!
  \*********************************/
/*! exports provided: idbw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "idbw", function() { return idbw; });
/* harmony import */ var _indexeddbAccessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./indexeddbAccessor */ "./src/indexeddbAccessor.js");
/* harmony import */ var _constant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant */ "./src/constant.js");


const idbAccessors = new Map();
let currentDbName = _constant__WEBPACK_IMPORTED_MODULE_1__["default"].dbName;
class idbw {
	constructor(dbName) {
		this.dbName = dbName;
		// not use
	}
	async getObAccessor(obName, keypathName) {
		if (idbAccessors.has(obName)) {
			return idbAccessors.get(obName);
		}
		const accessor = new _indexeddbAccessor__WEBPACK_IMPORTED_MODULE_0__["IndexeddbAccessor"](obName, keypathName, this.dbName);
		idbAccessors.set(obName, accessor);
		await accessor.init();
		return accessor;
	}
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map