import { IndexeddbAccessor } from './IndexeddbAccessor';
import constant from './constant';
const currentDbName = constant.dbName;
export class idbw {
	constructor(dbName = currentDbName) {
		this.dbName = dbName;
		// not use
	}
	async init() {}
	async getObAccessor(obName = currentDbName, keyPathName = 'pk') {
		return await IndexeddbAccessor.getInstance(obName, keyPathName, this.dbName);
	}
}
