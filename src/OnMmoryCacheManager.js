import { MODE_R, MODE_RW } from './IndexedddbModeConsts';
const cache = {};
export class OnMmoryCacheManager {
	constructor(dbName) {
		this.dbName = dbName;
		this.cache = {};
		this.tableNames = {};
	}
	static getInstance(dbName) {
		let instance = cache[dbName];
		if (instance) {
			return instance;
		}
		instance = new OnMmoryCacheManager(dbName);
		return instance;
	}
	cacheClear() {
		for (let tableName of tableNames) {
			const tableCache = this.cache[tableName];
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
		let tableCache = this.cache[tableName];
		if (!tableCache) {
			tableCache = {};
			this.cache[tableName] = tableCache;
		}
		tableCache[key] = value;
	}
	getCache(tableName, key) {
		const tableCache = this.cache[tableName];
		return tableCache ? tableCache[key] : null;
	}
	updateCache(tableName, key, data) {
		const cachekeyRW = tableName + '_' + MODE_RW;
		this.setCache(cachekeyRW, key, data);
		const cachekeyR = tableName + '_' + MODE_R;
		this.setCache(cachekeyR, key, data);
	}
	trancateCache(tableName) {
		const cachekeyRW = tableName + '_' + MODE_RW;
		const cachekeyR = tableName + '_' + MODE_R;
		delete this.cache[cachekeyRW];
		delete this.cache[cachekeyR];
	}
	removeCache(tableName, key) {
		const cachekeyRW = tableName + '_' + MODE_RW;
		const cachekeyR = tableName + '_' + MODE_R;
		const tableCacheA = this.cache[cachekeyRW];
		if (tableCacheA) {
			delete tableCacheA[key];
		}
		const tableCacheB = this.cache[cachekeyR];
		if (tableCacheB) {
			delete tableCacheB[key];
		}
	}
}
