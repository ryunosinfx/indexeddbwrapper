import constant from './constant'
import { IndexeddbHelper } from './indexeddbHelper'
const initQueue = [];
let dbName = constant.dbName;
// stock par db
const idbHelperMap = new Map();
export class IndexeddbAccessor {
	constructor(objectStoreName, keypathName = constant.keypathName, currentDbName = dbName) {
		if (!idbHelperMap.has(currentDbName)) {
			this.idbh = new IndexeddbHelper(currentDbName);
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