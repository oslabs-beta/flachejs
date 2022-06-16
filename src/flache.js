// const localforage = require("../node_modules/localforage");

localforage.config({
  name: 'clientCache',
  storeName: 'http',
  description: 'A cache for client HTTP requests',
  version: 1.0
})

const store = localforage.createInstance({
  name: 'httpCache'
})

store.setItem('test', { message: 'this is a test to see if this even works' });
store.setItem('test2', [1,2,3]);

store.getItem('test').then(res => console.log(res))

// async function Flache() {}

// module.exports = {Flache}