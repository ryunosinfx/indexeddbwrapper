import { idbw } from '../src/indexeddbWrapper'
import { TestUtil } from './testUtil'
export class indexeddbWrapperTest {
	constructor() {
		this.db = new idbw("indexeddbWrapper-test");
		this.logger= new TestUtil('idbw test!');
	}
	execAll() {
		alert("test!");
	}
	//test-----------------------------------------------
	//createDB
	//creatTable
	//bulkInsertUpdate
	//select
	//_updateExecute
	//delete
	test1(){
		this.db.getObAccessor('test','pk');
	}
}
