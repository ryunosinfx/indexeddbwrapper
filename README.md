# Indexeddb wrapper

## This is a indexedbwrapper like kvs.

## the purpose(目的)

簡単に使えるようにするライブラリです。

## Usage

```
npm -i indexeddbwrapper
```

js 内での利用方法

```
import {idbw} from 'indexeddbwrapper'

const databaseName = "test";
const idbwInstance = new idbw(databaseName);

export class Test(){

	constructor(dbName) {
  }
  async test(){

		const objectStoreName = 'aaaa';
    // KVSのキーを用意しましょう。
		const key = 'bbbb';
		//default keyPathName = "pk"
    // ObjectStore毎にアクセッサーを生成します。
		const ac = await idbwInstance.getObAccessor(objectStoreName);
    // データを用意
		const data = { z: 'aaaaa' };
    // 記録
		await ac.put(key, data);
    // 取得※一本釣り、無い場合はnull
		const result = await ac.get(key);
		const key2 = 'bbbb';
    const keys = [key2,key];
    // 取得※Obejctで
		const resultMap = await ac.getAsMap(keys);
    // 全部取得
		const results = await ac.getAll();
    // 一括登録
		await ac.putByMap(resultMap);

    // 削除
		await ac.delete(key);
    // ObjectStore全部消し
		await ac.truncate();

    // 該当DBのObjectStore名一覧取得
		const objectStoreNames = await ac.getOsNames();
  }

```
