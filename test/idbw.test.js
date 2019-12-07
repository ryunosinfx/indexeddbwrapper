import chai from 'chai';
import { idbw } from '../src/indexeddbWrapper';
const expect = chai.expect;
describe('テスト IndexeddbWrapper', () => {
	it('put and get1!', async () => {
		const db = new idbw('indexeddbWrapper-test');

		const objectStoreName = 'aaaa';
		//default keyPathName = "pk"
		const ac = await db.getObAccessor(objectStoreName);
		const data = { a: 'a', time: Date.now() };
		await ac.put('aaaa', data);
		const result = await ac.get('aaaa');
		const A = JSON.stringify(data);
		const B = JSON.stringify(result);
		console.log('A:' + A);
		console.log(typeof result);
		expect(B).to.be.equal(A);
		const data2 = { a: 'aaaaa' };
		await ac.put('aaaa', data2);
		const result2 = await ac.get('aaaa');
		const A1 = JSON.stringify(data2);
		const B1 = JSON.stringify(result2);
		console.log(A1);
		console.log('A1:' + A1);
		console.log(typeof result2);
		expect(B1).to.be.equal(A1);
	});
	it('put and get2!', async () => {
		const db = new idbw('indexeddbWrapper-test');

		const objectStoreName = 'aaaa';
		//default keyPathName = "pk"
		const ac = await db.getObAccessor(objectStoreName);
		const data = { a: 'aaaaa' };
		await ac.put('aaaa', data);
		const result = await ac.get('aaaa');
		const A = JSON.stringify(data);
		const B = JSON.stringify(result);
		console.log(A);
		console.log(typeof result);
		expect(B).to.be.equal(A);
	});
});
