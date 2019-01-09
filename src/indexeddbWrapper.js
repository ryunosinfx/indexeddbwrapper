import { IndexeddbAccessor } from './indexeddbAccessor'
import constant from './constant'
const idbAccessors = new Map();
let currentDbName = constant.dbName;
export class idbw {
	constructor(dbName) {
		this.dbName = dbName;
		// not use
	}
	async getObAccessor(obName, keypathName) {
		if (idbAccessors.has(obName)) {
			return idbAccessors.get(obName);
		}
		const accessor = new IndexeddbAccessor(obName, keypathName, this.dbName);
		idbAccessors.put(obName, accessor);
		await accessor.init();
		return accessor;
	}
};