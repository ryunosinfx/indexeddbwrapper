import { idbw } from '../src/indexeddbWrapper'
import { TestUtil } from './testUtil'
export class indexeddbWrapperTest {
	constructor() {
		this.db = new idbw("indexeddbWrapper-test");
		this.logger = new TestUtil('idbw test!');
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
	test1() {
		const ac = this.db.getObAccessor('test', 'pk');
	}
<<<<<<< HEAD
}
=======
	async test2(){
		const ac =this.db.getObAccessor('test','pk');
		
	}
}
>>>>>>> 1befebcb45581a5c1342125717fab17d0b15200f
