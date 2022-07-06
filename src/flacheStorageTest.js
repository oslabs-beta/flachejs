import localforage from 'localforage';
import FLACHESTORAGE from './flacheStorage';

// Testing FlacheStorage
const testStorage = localforage.defineDriver(FLACHESTORAGE)

  // Set Driver
  .then(() => {
    console.log('Set Driver:', FLACHESTORAGE._driver);
    return localforage.setDriver(FLACHESTORAGE._driver);

  // Check Driver
  }).then(() => {
    console.log('Driver In Use: ' + localforage.driver());

  // Set An Item - Non-LRU
  }).then(() => {
    console.log('setItem(test1, value1)');
    return localforage.setItem('test1', 'value1');

  // Get The Item (Promise) - Non-LRU
  }).then(() => {
    console.log('getItem(test1): ', localforage.getItem('test1'));
    return localforage.getItem('test1');

  // // Get Item and Clear The Storage - Non-LRU
  // }).then(value => {
  //   console.log('getItem(test1): ', value);
  //   return localforage.clear();

  // Put An Item - LRU
  }).then(() => {
    console.log('LRU -- put(test2, value2)');
    return localforage.setItem('test2', 'value2');

  // Put An Item - LRU
  }).then(() => {
    console.log('LRU -- put(test3, value3)');
    return localforage.setItem('test3', 'value3');

  // Put An Item - LRU
  }).then(() => {
    console.log('LRU -- put(test4, value4)');
    return localforage.setItem('test4', 'value4');

  // Get The Item -LRU
  }).then(() => {
    console.log('LRU -- get(test3): ', localforage.getItem('test3'));
    return localforage.getItem('test3');

  // Get The Item -LRU
  }).then(() => {
    console.log('Cache: ', localforage.checkCache());

  // Keys
  }).then(() => {
    // console.log('Keys Promise?: ', localforage.keys());
    return localforage.keys();

  // Keys
  }).then((keys) => {
    console.log('Keys: ', keys);

  // Keys
  }).then(() => {
    return localforage.length().then((length) => console.log('length: ', length));

  // // Clear
  // }).then(() => {
  //   console.log('clear it out');
  //   return localforage.clear();

  // // Check Cache After Clearing
  // }).then(() => {
  //   console.log('Cache: ', localforage.checkCache());
  //   console.log('checking after clear: ', localforage.getItem('test3'));

  // Other Then
  }).then(() => {
    // console.log('getItem(test1) should be undefined: ', localforage.getItem('test1'));
    localforage.checkLL();
  }).catch(err => console.log('Error: ', err));

  export default testStorage;