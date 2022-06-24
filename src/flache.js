import flacheRequest from './helpers/flacheRequest';
import generateKey from './helpers/generateKey';
import validateCache from './helpers/validateCache';
import validateCacheWS from './helpers/validateCacheWS';
import getFetchRequest from './helpers/serverRequest';
import websocketSetUp from './helpers/websocketSetUp';

/**
 * The localforage module
 * @external "localforage"
 * @see {@link https://www.npmjs.com/package/localforage}
 */
import localforage from 'localforage';


const defaultOptions = {
  maxCapacity: null, // this is in development
  ttl: 5000,
  websockets: false, 
  config: {
    name: 'httpCache',
    storeName: 'request_response',
    description: 'A cache for client-side http requests',
    driver: [
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
    this.websockets = options.websockets || defaultOptions.websockets;
    this.maxCapacity = options.maxCapacity;

    /* If user set invalidation method to websockets instead of TTL: 
     - set up web socket connection on client side every time someone initializes our store with WS
     - listen for new events, every time you get a new event you need to call a function that invalidates the cache, 
     - sends a new fetch request to the server 
     - and update the cache so that the next time the request is made they have the new data instead of stale data 
     */
     if (this.websockets === true) {
      console.log('store initiated, cache invalidation method is web sockets:',this.websockets);
      this.websocketSetUp();
    }
    else console.log('store initiated ttl is:', this.ttl)
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
clientCache.prototype.validateCacheWS = validateCacheWS;
clientCache.prototype.websocketSetUp = websocketSetUp;

export default clientCache