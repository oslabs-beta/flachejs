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
  maxCapacity: null, // this is only relevant for local memory at the moment. 
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
    version: 1.0, // this is only relevant if using IndexedDB
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
  }

  static INDEXEDDB = localforage.INDEXEDDB;
  static LOCALSTORAGE = localforage.LOCALSTORAGE;
  static MEMORY = 'FLACHESTORAGE';
}

/** bind helper functions to class clientCache */
clientCache.prototype.flacheRequest = flacheRequest;
clientCache.prototype.generateKey = generateKey;
clientCache.prototype.validateCache = validateCache;
clientCache.prototype.getFetchRequest = getFetchRequest;
clientCache.prototype.reqExtension = reqExtension;

export default clientCache