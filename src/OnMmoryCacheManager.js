const cache = {};
export class OnMmoryCacheManager {
	constructor(dbName) {
		this.maxSize = '';
		this.dbName = dbName;
		this.cache = {};
		this.tableNames = [];
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
		for (let tableName of this.tableNames) {
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
			this.tableNames.push(tableName);
			this.cache[tableName] = tableCache;
		}
		tableCache[key] = value;
	}
	getCache(tableName, key) {
		const tableCache = this.cache[tableName];
		return tableCache ? tableCache[key] : null;
	}
	updateCache(tableName, key, data) {
		const cachekeyRW = tableName;
		this.setCache(cachekeyRW, key, data);
	}
	trancateCache(tableName) {
		const cachekeyRW = tableName;
		delete this.cache[cachekeyRW];
	}
	removeCache(tableName, key) {
		const cachekeyRW = tableName;
		const tableCacheA = this.cache[cachekeyRW];
		if (tableCacheA) {
			delete tableCacheA[key];
		}
	}
	maintainCache() {}
}
