import localforage from 'localforage';

const store = localforage.createInstance({
  name: 'httpCache',
  storeName: 'entries',
  description: 'A cache for client HTTP requests',
  version: 1.0
})


store.setItem('test', { message: 'this is a test to see if this even works' });
store.setItem('test2', [1,2,3]);

// store.clear();
store.getItem('test').then(res => console.log(res))

// async function Flache() {}

// module.exports = {Flache}