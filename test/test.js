import { idbw } from '../src/indexeddbWrapper'

export class indexeddbWrapperTest {
	constructor() {
		this.db = new idbw("indexeddbWrapper-test");
	}
	execAll() {
		alert("test!");
	}
}