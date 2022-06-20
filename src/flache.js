import localforage from 'localforage';
import flacheRequest from './helpers/flacheRequest';
import generateKey from './helpers/generateKey';
import validateCache from './helpers/validateCache';
import getFetchRequest from './helpers/serverRequest';

/**
 * clientCache will take in arguments for the Database name, The Store name, and an options object for further config options. 
 * It will produce a class that will provide a container for our db store to attach to our flaceClient class. The store itself will provide 
 * functionality that is outside of the scope of making requests and interfacing with the store. Some examples include - store diagnostic info,
 * storing the total entries and (maybe) total store size approximation, and maybe some other key metrics. It will also handle
 * 
 *  @param {string} dbName - The name of the Database to be stored in IndexedDB. Default = httpCache
 *  @param {string} storeName - The name of the store that will be created in the Database Default = request_response
 *  @param {object} options - further options for configuring the store. This will include custom options for flacheJS as well as a config property for localforage
 */

const defaultOptions = {
  maxCapacity: null, // this is in development
  ttl: 5000,
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

class clientCache {
  constructor(options = defaultOptions) {

    // TO-DO: check if the store exists already and create new store only if it isn't already there.
    this.store = localforage.createInstance(({
      ...defaultOptions.config,
      ...options.config
    }))

    // TO-DO: same as above. 
    this.details = localforage.createInstance({
      name: 'cacheDetails',
      storeName: 'requests',
      description: 'A list of past requests',
      version: 1.0
    })

    this.ttl = options.ttl || defaultOptions.ttl;
    this.maxCapacity = options.maxCapacity;
    console.log('store initiated ttl is:', this.ttl)
  }

  //
  async getSize() {
    const size = await this.store.keys()
    return await size.length; 
  }


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

clientCache.prototype.flacheRequest = flacheRequest;
clientCache.prototype.generateKey = generateKey;
clientCache.prototype.validateCache = validateCache;
clientCache.prototype.getFetchRequest = getFetchRequest;

export default clientCache
  
// const store = new clientCache({ttl: 20000});


// (async () => {
//   let url = 'https://swapi.dev/api/people';

//   // with cache;
//   const now = performance.now();

//   for (let i = 0; url; i++) {
//     const data = await store.flacheRequest(url);
//     console.log(data);
//     url = data.next; 
//   }

//   const test1 = performance.now();
  
//   console.log('performed 5 requests wihtout cache in ', Math.abs(now - test1).toFixed(2), ' ms');

//   url = 'https://swapi.dev/api/people'
//   const now2 = performance.now();
  
//   for (let i = 0; url; i++) {
//     const data = await store.flacheRequest(url);
//     console.log(data);
//     url = data.next; 
//   }
  
//     const test2 = performance.now();
//     console.log('perfomred 5 requests with cache in ', Math.abs(now2 - test2).toFixed(2), ' ms')
  

//   // for (let i = 0; i < 5; i++) {
//   //   await fetch(url); 
//   // }


//   // const now = performance.now();
//   // const data = await store.flacheRequest(url)
//   // const test1 = performance.now();
//   // console.log(data);
//   // console.log('Fetched in : ', Math.abs(now - test1).toFixed(2));

//   // const now2 = performance.now();
//   // const data2 = await store.flacheRequest(url);
//   // const test2 = performance.now();
//   // console.log(data2);
//   // console.log('Fetched in : ', Math.abs(now2 - test2).toFixed(2));

//   // const now3 = performance.now();
//   // const data3 = await store.flacheRequest(url, {
//   //   method: 'POST',
//   //   body: JSON.stringify({user: 'jake', pw:'teamFlacheGo!'})
//   // });

//   // const test3 = performance.now();
//   // console.log(data3);
//   // console.log('Fetched in : ', Math.abs(now3 - test3).toFixed(2));

//   // store.getSize().then(data => console.log('collection size', data));
// })();


// store.setItem('test', { message: 'this is a test to see if this even works' });
// store.setItem('test2', [1,2,3]);

// // store.clear();
// store.getItem('test').then(res => console.log(res))

// async function Flache() {}

// module.exports = {Flache}



  // fetch request methods, validation,

  
  

