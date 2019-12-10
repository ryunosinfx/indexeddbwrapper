import { IndexeddbCore } from './IndexeddbCore';
import constant from './constant';
const cache = {};
const systemDbName = constant.systemDbName;
const keypathName = constant.keypathName;
const cacheObName = 'cache';
const core = new IndexeddbCore(systemDbName);

export class OnMmoryCacheManager {
	constructor(dbName) {
		this.maxSize = '';
		this.dbName = dbName;
		this.cache = {};
		this.tableNames = [];
		this.lastUpdateDateMap = {};
	}
	static async getInstance(dbName) {
		let instance = cache[dbName];
		if (instance) {
			return instance;
		}
		instance = new OnMmoryCacheManager(dbName);
		await instance.init();
		return instance;
	}
	async init() {
		await core._createStore(cacheObName, keypathName, false);
	}
	cacheClearWithDbUpdate(tableName) {
		const tableCache = this.cache[tableName];
		for (let index in tableCache) {
			delete tableCache[index];
		}
		this.registeCacherUpdateTime(tableName);
	}
	async registeCacherUpdateTime(tableName, now = Date.now()) {
		this.lastUpdateDateMap[tableName] = now;
		//////
		const dbTableKey = JSON.stringify([this.dbName, tableName]);
		const updateTimeData = { updateTime: now };
		updateTimeData[keypathName] = dbTableKey;
		core._insertUpdate(cacheObName, keypathName, updateTimeData);
	}
	cacheClear() {
		for (let tableName of this.tableNames) {
			const tableCache = this.cache[tableName];
			for (let index in tableCache) {
				delete tableCache[index];
			}
		}
	}
	async setCache(tableName, key, value) {
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

		const dbTableKey = JSON.stringify([this.dbName, tableName]);
		const result = await core._selectByKey(cacheObName, dbTableKey);
		if (result && result.updateTime !== this.lastUpdateDateMap[tableName]) {
			this.cacheClearWithDbUpdate(tableName);
			return null;
		} else if (!this.lastUpdateDateMap[tableName] && result.updateTime) {
			this.registeCacherUpdateTime(tableName, result.updateTime);
		} else if (!result.updateTime) {
			this.registeCacherUpdateTime(tableName);
		}
		let tableCache = this.cache[tableName];
		if (!tableCache) {
			tableCache = {};
			this.tableNames.push(tableName);
			this.cache[tableName] = tableCache;
		}
		tableCache[key] = value;
	}
	async getCache(tableName, key) {
		const dbTableKey = JSON.stringify([this.dbName, tableName]);
		const result = await core._selectByKey(cacheObName, dbTableKey);
		if (result && result.updateTime !== this.lastUpdateDateMap[tableName]) {
			this.cacheClearWithDbUpdate(tableName);
			return null;
		}
		const tableCache = this.cache[tableName];
		return tableCache ? tableCache[key] : null;
	}
	updateCache(tableName, key, data) {
		const cachekeyRW = tableName;
		this.setCache(cachekeyRW, key, data);
	}
	trancateCache(tableName) {
		this.cacheClearWithDbUpdate(tableName);
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
