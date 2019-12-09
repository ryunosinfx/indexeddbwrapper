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
	it('put and remove and get!', async () => {
		const db = new idbw('indexeddbWrapper-test');

		const objectStoreName = 'aaaa';
		const key = 'bbbb';
		const key2 = 'bbbb2';
		//default keyPathName = "pk"
		const ac = await db.getObAccessor(objectStoreName);
		const data = { z: 'aaaaa' };
		const data1 = { z1: 'aaaaa1' };
		const data2 = { z2: 'aaaaa2' };
		await ac.put(key, data);
		await ac.put(key, data1);
		await ac.put(key2, data2);
		const result = await ac.get(key);
		await ac.delete(key);
		const result1 = await ac.get(key);
		const result2 = await ac.get(key2);
		const A = JSON.stringify(data1);
		const A2 = JSON.stringify(data2);
		const B = JSON.stringify(result);
		const C = JSON.stringify(result1);
		const D = JSON.stringify(result2);
		console.log(A);
		console.log(typeof result);
		expect(B).to.be.equal(A);
		expect(B).to.not.equal(C);
		expect(A2).to.be.equal(D);
	});
	it('put and trancate and get!', async () => {
		const db = new idbw('indexeddbWrapper-test');
		const objectStoreName = 'aaaa';
		const key = 'ccccc';
		//default keyPathName = "pk"
		const ac = await db.getObAccessor(objectStoreName);
		const data = { z: 'aaaaa' };
		await ac.put(key, data);
		const result = await ac.get(key);
		await ac.truncate();
		const result2 = await ac.get(key);
		const A = JSON.stringify(data);
		const B = JSON.stringify(result);
		const C = JSON.stringify(result2);
		console.log(A);
		console.log(typeof result);
		expect(B).to.be.equal(A);
		expect(B).to.not.equal(C);
	});
});
