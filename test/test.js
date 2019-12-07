import chai from 'chai';
import { idbw } from '../src/indexeddbWrapper';
import { TestUtil } from './testUtil';

const expect = chai.expect;
export class indexeddbWrapperTest {
	constructor() {
		this.db = new idbw('indexeddbWrapper-test');
		this.logger = new TestUtil('idbw test!');
	}
	execAll() {
		alert('test!');
	}
	//test-----------------------------------------------
	//createDB
	//creatTable
	//bulkInsertUpdate
	//select
	//_updateExecute
	//delete
	async test1() {
		const ac = await this.db.getObAccessor('test', 'pk');
	}
	async test2() {}
}
