import { IdbUtil } from './idbUtil'
import { IndexeddbCore } from './indexeddbCore'
const MODE_R = "readonly";
const MODE_RW = "readwrite";
const cmdSelectAll = "cmdSelectAll";
const cmdSelectByKey = "cmdSelectByKey";
const cmdSelectByKeys = "cmdSelectByKeys";
const cmdSelectFirstOne = "cmdSelectFirstOne";
const cmdBulkInsertUpdate = "cmdBulkInsertUpdate";
const cmdInsertUpdate = "cmdInsertUpdate";
const cmdDeleteWithRange = "cmdDeleteWithRange";
const cmdDelete = "cmdDelete";
const cmdTruncate = "cmdTruncate";
const cmdCreateStore = "cmdCreateStore";
const cmdDeleteStore = "cmdDeleteStore";
const cmdCreateIndex = "cmdCreateIndex";
const cmdDeleteIndex = "cmdDeleteIndex";
const cmdGetObjectStoreNames = "cmdGetObjectStoreNames";
export class IndexeddbHelper {
	constructor(dbName) {
		this.core = new IndexeddbCore(dbName);
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
		if (cmdBulkInsertUpdate === cmd) {
			return await this.core._bulkInsertUpdate(data.tableName, data.keyPathName, data.data, data.callback);
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
		if (cmdDeleteStore === cmd) {
			return await this.core._deleteStore(data.tableName);
		}
		if (cmdCreateIndex === cmd) {
			return await this.core._createIndex(data.tableName, data.keyPathName, data.isMultiColumns);
		}
		if (cmdDeleteIndex === cmd) {
			return await this.core._deleteIndex(data.tableName, data.indexName);
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
	async bulkInsertUpdate(tableName, keyPathName, data, callback) {
		return await this.enQueueWriteTask(cmdBulkInsertUpdate, { tableName, keyPathName, data, callback });
	}

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
	//truncate
	async deleteStore(tableName) {
		return await this.enQueueWriteTask(cmdDeleteStore, { tableName });
	};
	//truncate
	async creatIndex(tableName, keyPathName, isMultiColumns) {
		return await this.enQueueWriteTask(cmdCreateIndex, { tableName, keyPathName, isMultiColumns });
	};
	//truncate
	async deleteIndex(tableName,indexName) {
		return await this.enQueueWriteTask(cmdDeleteIndex, { tableName, indexName });
	};
	async getObjectStoreNames() {
		return await this.enQueueReadTask(cmdGetObjectStoreNames, {});
	}
}
