import { IndexeddbAccessor } from './IndexeddbAccessor';
import constant from './constant';
const idbAccessors = new Map();
let currentDbName = constant.dbName;
export class idbw {
	constructor(dbName) {
		this.dbName = dbName;
		// not use
	}
	async getObAccessor(obName, keyPathName = 'pk') {
		if (idbAccessors.has(obName)) {
			return idbAccessors.get(obName);
		}
		const accessor = new IndexeddbAccessor(obName, keyPathName, this.dbName);
		idbAccessors.set(obName, accessor);
		await accessor.init();
		return accessor;
	}
}
