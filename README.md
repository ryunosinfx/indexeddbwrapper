# Indexeddb wrapper
This is a indexedbwrapper like kvs.
---
## the purpose(目的)
簡単に使えるようにするライブラリです。

## Usage
~~~
npm -i indexeddbwrapper
~~~

js内

~~~
import {idbw} from 'indexeddbwrapper'

const databaseName = "test";
const idbwInstance = new idbw(databaseName);

export class Test(){

	constructor(dbName) {
  }
  async test(){
    const idba = idbwInstance();
  }

~~~
