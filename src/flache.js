import flacheRequest from './helpers/flacheRequest';
import generateKey from './helpers/generateKey';
import validateCache from './helpers/validateCache';
import getFetchRequest from './helpers/serverRequest';
import reqExtension from './helpers/reqExtension';

/**
 * The localforage module
 * @external "localforage"
 * @see {@link https://www.npmjs.com/package/localforage}
 */
import localforage from 'localforage';
import FLACHESTORAGE from './flacheStorage';
localforage.defineDriver(FLACHESTORAGE);

// import testStorage from './flacheStorageTest';

const defaultOptions = {
  maxCapacity: null, // this is in development
  ttl: 5000,
  duration: null,
  config: {
    name: 'httpCache',
    storeName: 'request_response',
    description: 'A cache for client-side http requests',
    driver: [
      FLACHESTORAGE._driver,
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
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

    // console.log("This store is: ",this.store); 
    // console.log("Current driver: ",localforage.driver());

    /** Create details store */
    // TO-DO: same as above. 
    this.details = localforage.createInstance({
      name: 'cacheDetails',
      storeName: 'requests',
      description: 'A list of past requests',
      driver: localforage.INDEXEDDB,
      version: 1.0,
    })

    /** Apply TTL (time to live) and maxCapacity from user configuration or default */
    this.ttl = options.ttl || defaultOptions.ttl;
    this.maxCapacity = options.maxCapacity;
    this.duration = defaultOptions.duration;
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

  getItem(key) {
    const store = this.store;
    store.getItem(key)
    .then(value => {return value})
    .catch(err => {return err.message})
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
clientCache.prototype.reqExtension = reqExtension;

let cacheTest = localforage.createInstance({})
cacheTest.setDriver('FLACHESTORAGE'); 

console.log('local forage', cacheTest.driver);

export default clientCache