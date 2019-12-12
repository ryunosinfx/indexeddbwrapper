import constant from './constant';
import { IndexeddbHelper } from './IndexeddbHelper';
const initQueue = [];
let dbName = constant.dbName;
// stock par db
const idbHelperMap = new Map();
const idbAccessors = new Map();
let SystemDBAccessor = null;
const systemDbName = constant.systemDbName;
const cacheObName = constant.cacheObName;
const keyPathName = 'pk';
export class IndexeddbAccessor {
	constructor(objectStoreName, keypathName = constant.keypathName, isAutoincrements = false, currentDbName = dbName) {
		if (!idbHelperMap.has(currentDbName)) {
			this.idbh = new IndexeddbHelper(currentDbName);
			idbHelperMap.set(currentDbName, this.idbh);
		} else {
			this.idbh = idbHelperMap.get(currentDbName);
		}
		this.keyPathName = keypathName;
		this.objectStoreName = objectStoreName;
		this.isAutoincrements = isAutoincrements;
	}
	static setDbName(dbNameNew) {
		dbName = dbNameNew;
	}
	static async getInstance(objectStoreName, keypathNamee, isAutoincrements = false, currentDbName = dbName, isCacheEnable = true) {
		const key = JSON.stringify([currentDbName, objectStoreName]);
		if (idbAccessors.has(key)) {
			return idbAccessors.get(key);
		}
		if (!SystemDBAccessor) {
			SystemDBAccessor = true;
			SystemDBAccessor = await IndexeddbAccessor.getInstance(cacheObName, keyPathName, false, systemDbName, false);
		}
		const inst = new IndexeddbAccessor(objectStoreName, keypathNamee, isAutoincrements, currentDbName);
		await inst.init(isCacheEnable);
		idbAccessors.set(key, inst);
		return inst;
	}
	init(isEnableCache = true) {
		this.isEnableCache = isEnableCache;
		return new Promise((reslve, reject) => {
			this.idbh.init().then(() => {
				this.idbh.createStore(this.objectStoreName, this.keyPathName, this.isAutoincrements).then(
					() => {
						reslve(true);
					},
					e => {
						reject(e);
						throw e;
					}
				);
			});
		});
	}
	async dump() {
		return {};
	}
	async restore(dumpData) {
		return;
	}
	async putByMap(dataMap, callback) {
		for (let key in dataMap) {
			const record = {
				data: dataMap[key]
			};
			record[this.keyPathName] = key;
			await this.putRecord(record, undefined, callback);
		}
	}
	async put(key, data, callback) {
		const record = {
			data: data
		};
		record[this.keyPathName] = key;
		await this.putRecord(record, undefined, callback);
	}
	async putRecord(record, key, callback) {
		const storeData = record;
		if (record[this.keyPathName] === undefined) {
			storeData = {
				data: record
			};
			storeData[this.keyPathName] = key;
		} else if (key !== undefined) {
		}
		const value = await this.idbh.insertUpdate(this.objectStoreName, this.keyPathName, storeData, callback, this.isEnableCache);
		return value;
	}
	async getAsMap(keys) {
		if (keys !== undefined) {
			const recordAsLoadedData = await this.idbh.selectByKeys(this.objectStoreName, keys, this.isEnableCache);
			return recordAsLoadedData;
		}
		return null;
	}
	async getRecord(key) {
		if (key !== undefined) {
			const recordAsLoadedData = await this.idbh.selectByKey(this.objectStoreName, key, this.isEnableCache);
			return recordAsLoadedData;
		}
		return null;
	}
	async get(key) {
		const recordAsDefaultLoad = await this.getRecord(key);
		return recordAsDefaultLoad === undefined || recordAsDefaultLoad === null ? null : recordAsDefaultLoad.data;
	}
	async getAll() {
		return await this.idbh.selectAll(this.objectStoreName, this.isEnableCache);
	}
	async delete(key) {
		if (key !== undefined) {
			return await this.idbh.delete(this.objectStoreName, key, this.isEnableCache);
		}
		return;
	}
	async remove(key) {
		return await this.delete(key);
	}
	async truncate() {
		return await this.idbh.truncate(this.objectStoreName, this.isEnableCache);
	}
	async getOsNames() {
		return await this.idbh.getObjectStoreNames();
	}
}
