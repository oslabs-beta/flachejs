import flacheRequest from './helpers/flacheRequest';
import generateKey from './helpers/generateKey';
import validateCache from './helpers/validateCache';
import getFetchRequest from './helpers/serverRequest';

/**
 * The localforage module
 * @external "localforage"
 * @see {@link https://www.npmjs.com/package/localforage}
 */
import localforage from 'localforage';
import FLACHESTORAGE from './flacheStorage';
localforage.defineDriver(FLACHESTORAGE);
// console.log(FLACHESTORAGE._driver);

// localforage.defineDriver(FLACHESTORAGE).then(function() {
//   var instances = [
//     localforage.createInstance({
//       name: 'storage1',
//       size: 1024,
//       storeName: 'storagename1',
//       driver: FLACHESTORAGE._driver
//     }),
//     localforage.createInstance({
//       name: 'storage1',
//       size: 1024,
//       storeName: 'storagename2',
//       driver: FLACHESTORAGE._driver
//     }),
//     localforage.createInstance({
//       name: 'storage2',
//       size: 1024,
//       storeName: 'storagename1',
//       driver: FLACHESTORAGE._driver
//     })
//   ];

//   Promise.all(instances.map(function(instance) {
//     return instance.ready().then(function() {
//       console.log(instance.driver());
//     });
//   })).then(function() {
//     return instances[0].setItem('item1', 'value1');
//   }).then(function() {
//     return instances[1].setItem('item1', 'value2');
//   }).then(function() {
//     return instances[2].setItem('item1', 'value3');
//   }).then(function() {  
//     return Promise.all(instances.map(function(instance) {
//       return instance.getItem('item1');
//     }));
//   }).then(function(results) {
//     console.log(results);
//   })
// });

// Testing FlacheStorage
// localforage.defineDriver(FLACHESTORAGE)
//   .then(function() {
//     // console.log('this is the driver: ', FLACHESTORAGE._driver);
//     return localforage.setDriver(FLACHESTORAGE._driver);
//   }).then(function() {
//     console.log('Driver: ' + localforage.driver());
//     console.log('setItem(test1, value1)');
//     return localforage.setItem('test1', 'value1');
//   }).then(function() {
//     console.log('getItem(test1): ', localforage.getItem('test1'));
//     return localforage.getItem('test1');
//   }).then(function(value) {
//     return localforage.clear();
//   }).then(function() {
//     console.log('getItem(test1) should be undefined: ', localforage.getItem('test1'));
//   }).catch(err => console.log('Error: ', err));

const defaultOptions = {
  maxCapacity: null, // this is in development
  ttl: 5000,
  config: {
    name: 'httpCache',
    storeName: 'request_response',
    description: 'A cache for client-side http requests',
    driver: [
      // localforage.INDEXEDDB,
      // localforage.LOCALSTORAGE,
      localforage.FLACHESTORAGE,
    ],
    version: 1.0,
  }
}

/** class clientCache provides a container for our db store */
class clientCache {

  /**
   * create a clientCache
   * @param {object} options - further options for configuring the store
   */
  
  constructor(options = defaultOptions) {

    /** Create store and override the default store options with user-given configurations */
    // TO-DO: check if the store exists already and create new store only if it isn't already there.
    this.store = localforage.createInstance(({
      ...defaultOptions.config,
      ...options.config
    }))

    console.log("This store is: ",this.store); 
    console.log("Current driver: ",localforage.driver());

    /** Create details store */
    // TO-DO: same as above. 
    this.details = localforage.createInstance({
      name: 'cacheDetails',
      storeName: 'requests',
      description: 'A list of past requests',
      version: 1.0
    })

    /** Apply TTL (time to live) and maxCapacity from user configuration or default */
    this.ttl = options.ttl || defaultOptions.ttl;
    this.maxCapacity = options.maxCapacity;
    console.log('store initiated ttl is:', this.ttl)
  }

  /**
   * Get the size of the store
   * @return {number} the store's size, by number of keys 
   */
  async getSize() {
    const size = await this.store.keys()
    return await size.length;
  }

  /**
   * Set an item in the store
   * @param {string} key - key of item in store
   * @param {string} value - value of item in store
   * @return {string} confirmation or error message to setting item in store
   */
  setItem(key, value) {
    const store = this.store;
    return store.setItem(key, value, (err, value) => {
      if (err) {
        return err.message
      }

      return `${value} added to store`
    })
  }

  listRequests(verbose = false) {
    if (verbose) {
      // print a pretty list of all requests with reverse hash.
    }
    // return an array representaiton of requests. 
    return;
  }
}

/** bind helper functions to class clientCache */
clientCache.prototype.flacheRequest = flacheRequest;
clientCache.prototype.generateKey = generateKey;
clientCache.prototype.validateCache = validateCache;
clientCache.prototype.getFetchRequest = getFetchRequest;

export default clientCache