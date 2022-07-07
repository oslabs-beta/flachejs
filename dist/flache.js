(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("md5"), require("localforage"));
	else if(typeof define === 'function' && define.amd)
		define(["md5", "localforage"], factory);
	else if(typeof exports === 'object')
		exports["flachejs"] = factory(require("md5"), require("localforage"));
	else
		root["flachejs"] = factory(root["md5"], root["localforage"]);
})(self, (__WEBPACK_EXTERNAL_MODULE__99__, __WEBPACK_EXTERNAL_MODULE__428__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 428:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__428__;

/***/ }),

/***/ 99:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__99__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ flache)
});

;// CONCATENATED MODULE: ./src/helpers/synthResponse.js
class SyntheticResponse extends Response {
  #redirected;
  #type;
  #url;
  constructor(body, init) {
    super(body, init);
    this.#redirected = init.redirected || false;
    this.#url = init.url || '';
    this.#type = init.type || 'default';
  }

  get url() {
    return this.#url;
  }

  get redirected() {
    return this.#redirected;
  }

  get type() {
    return this.#type;
  }
}

function constructResponse(entry) {
  const init = {
    ...entry.response,
    headers: new Headers(entry.response.headers),
  }
  /**
   * The only properties that acan actually be set via our options are as follow: 
   * Status
   * Status Text
   * Headers
   * 
   * Our 'synthetic reposne' overwirtes the getter functions for the url, redirect, and the type to mimic
   * the native api as much as possible. Unclear if this could cause serious bugs or not yet. 
   * 
   * We should consider what if any of the other properties may interfere with the normal workflow
   * a developer might expect, and also how this will impact any other native functions
   * that interface with the response obj. 
   * 
   * For example - if a user is redirected, but the header is set to manual, the response will not
   * be automatically redirected and the user will have to specify a control flow to handle this. 
   *
   * Additionally - in testing I've noticed that the clone method does not work properly either. 
   */


  // TO-DO Make sure to parse the data appropriately if it is text v. JSON 
  const outputResponse = new SyntheticResponse(JSON.stringify(entry.data.data), init)
 
  return outputResponse;
}


;// CONCATENATED MODULE: ./src/helpers/flacheRequest.js


/**
 * Function to retreive data from Cache
 * @param {string} url - the url to the server request
 * @param {object} options - the request body
 * @return {object} Object containing the retreived data from the cache
 */

 const defaultOptions = {
  method: 'GET',
  mode: 'cors',
  cache: 'default',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  redirect: 'follow',
  referrerPolicy: 'no-referrer-when-downgrade',
  body: null,
}

// TO-DO Add errror handling and potentially some routing. 
const flacheRequest = async function (url, options) {
  
  let start = performance.now()

  options = {
    ...defaultOptions,
    ...options
  };

  let uniqueKey = this.generateKey(url, options);

  /** Check if the cache already contains the response to the given url or exists in cache but is invalid */
  const cacheResult = await this.store.getItem(uniqueKey)
    .then((entry) => {
      if (!entry) return null;
      // needs to return data if valid and null if not;
      return this.validateCache(uniqueKey, entry);
    })
    .catch(err => err);

  // what should we do if this throws an err? -> err would indicate that storage is full for write operations 
  // read operations this would probably indicate an issue with the store itself. 

  /** If the cache does not already have stored response from the given url */
  if (!cacheResult) {
    /** Make a request to the server through the url param to store its response */
    const apiResult = await this.getFetchRequest(url, options);

    // if no data returned - should we try again or return an error? 
    if (!apiResult) {
      return null;
    }

    /** Apply TTL to object to be stored in cache */
    apiResult.ttl = Date.now() + this.ttl;
    /** Add to cache */
    await this.store.setItem(uniqueKey, apiResult);
    // this is where we would potetnially trigger evictions
    this.duration = (performance.now() - start).toFixed(2);
    this.reqExtension(url, this.duration, 'Miss', this.ttl);
    return constructResponse(apiResult);
  }
  
  this.duration = (performance.now() - start).toFixed(2);
  this.reqExtension(url, this.duration, 'Hit', -1);
  return constructResponse(cacheResult);
};


/* harmony default export */ const helpers_flacheRequest = (flacheRequest);

// EXTERNAL MODULE: external {"commonjs":"md5","commonjs2":"md5","amd":"md5","root":"md5"}
var external_commonjs_md5_commonjs2_md5_amd_md5_root_md5_ = __webpack_require__(99);
var external_commonjs_md5_commonjs2_md5_amd_md5_root_md5_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_md5_commonjs2_md5_amd_md5_root_md5_);
;// CONCATENATED MODULE: ./src/helpers/generateKey.js

  
/**
* Function that takes in arguments of an HTTP request and returns them as a single unique (hashed) key
* @param {string} url - request URL
* @param {object} data - object containing request body such as the HTTP method
* @return {string} - Hashed key
**/
// TO-DO consider including headers in our hashing strategy? If a POST request is made with different headers its conceivable that
// the expected repsonse would be different;       
const generateKey = (url, data) => {
  // TO-DO error handling for incorrect method
  const method = data.method.toUpperCase();
  if (method === 'GET') {
    return (`${method}/${url}`);
  }
  if (method === 'POST') {
    if (!Object.hasOwn(data, 'body')) throw new Error('Must include a body with POST request');
    return (`${method}/${external_commonjs_md5_commonjs2_md5_amd_md5_root_md5_default()(JSON.stringify(data.body))}/${url}`);
  }
}

/* harmony default export */ const helpers_generateKey = (generateKey);
;// CONCATENATED MODULE: ./src/helpers/validateCache.js
/**
 * Function that validates the cache
 * @param {string} uniqueKey - hashed key that contains request url and body
 * @param {object} data - response from the server request containing the request's TTL
 * @return {object} object cache value (keys: ttl, data) if in cache and valid, null if not
 */
async function validateCache(uniqueKey, data) {
  // check if the item in the store's TTL has passed from the current time of the function call
  if (data.ttl < Date.now()) {
    await this.store.removeItem(uniqueKey);
    return null;
  } else return data;
}

/* harmony default export */ const helpers_validateCache = (validateCache);
;// CONCATENATED MODULE: ./src/helpers/copyResponse.js
function copyResponse(res, skip = ['body']) {
  if (!(res instanceof Response)) throw new Error('Not a valid response object'); 

  const newObj = {};
  for (const key in res) {
    // this is to avoid copying function definitions from the objects prototype; 
    // it also checks if we have marked this as a property ot skip. 
    if (skip.includes(key) || typeof res[key] === 'function') continue;
   
    //This is to iterate through the headers obj and copy all of the headers returned by the server
    // we will reconstruct this later and recreate the exact same response. 
    if (key === 'headers') {
      newObj[key] = copyHeaders(res[key]);
      continue; 
    }
    newObj[key] = res[key]; 
  }
  return newObj; 
}

function copyHeaders(header) {
  const entries = header.entries();

  const newObj = {};

  for (const [key, value] of entries) {
    newObj[key] = value;
  }

  return newObj
}

/* harmony default export */ const helpers_copyResponse = (copyResponse);
;// CONCATENATED MODULE: ./src/helpers/parsers.js


/**
 * Parse response from the server to record the data type
 * Middleware pattern calls functions in order until it receives valid data from response
 * @param {Response} res - response from server request
 * @param {string} res - response from server request
 * @return {object} Object containing the resulting data from executing the request in the server and the response detils for later reconstruction. 
 */


async function parseResponse(res) {
  const responseCopy = helpers_copyResponse(res);
  const dataCopy = await parseJSON(res); 

  if (!dataCopy) throw new Error('failed to parse data');

  return { response: responseCopy, data: dataCopy };
}


async function parseJSON(res) {
  try {
    const data = { type: 'json', data: await res.json() }
    return data
  } catch (err) {
    console.log(err.message);
    return parseText(res);
  }
}


async function parseText(res) {
  try {
    const data = { type: 'text', data: await res.text() }
    return data
  } catch (err) {
    console.log(err.message);
    return parseBlob(res);
  }
}

// Note these are still in experimental phase
async function parseBlob(res) {
  try {
    const data = { type: 'blob', data: await res.blob() }
    return data
  } catch (err) {
    console.log(err.message);
    return parseArrayBuffer(res);
  }
}

async function parseArrayBuffer(res) {
  try {
    const data = { type: 'buffer', data: await res.arrayBuffer() };
    return data
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

/* harmony default export */ const parsers = (parseResponse);
;// CONCATENATED MODULE: ./src/helpers/serverRequest.js
 

/**
 * Function that makes a Fetch request to the server
 * @param {string} url URL to where fetch request is being made
 * @return {object} Object containing the resulting data from executing the request in the server
 */

/**
 * How will we handle being redirected? 
 */

async function getFetchRequest(url, options) {
  // TO-DO handling headers, response-types, etc for how to parse data; 
  let response = await fetch(url, options)
    .then(res => {
      const proxyResponse = parsers(res);
      return proxyResponse;
    })
    .catch(err => {
      console.log('Fetch error', err.message);
      return err;
    });
  return response;
}

/* harmony default export */ const serverRequest = (getFetchRequest);
;// CONCATENATED MODULE: ./src/helpers/reqExtension.js
const reqExtension = (url, duration, inCache, TTL) => {
    // Send data to our Extension
    if(chrome && chrome.runtime && chrome.runtime.sendMessage) {
        async function sendReq () {
          let aRequest = {
            requestURL: url,
            time: duration, 
            inCache: inCache,
            ttl: TTL
          }
          chrome.runtime.sendMessage("bmkhjogdgeafjdanmhjddmcldejpgaga", aRequest);
        }  
        sendReq();
    }
}
  
/* harmony default export */ const helpers_reqExtension = (reqExtension);
// EXTERNAL MODULE: external {"commonjs":"localforage","commonjs2":"localforage","amd":"localforage","root":"localforage"}
var external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_ = __webpack_require__(428);
var external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_);
;// CONCATENATED MODULE: ./src/flacheStorage.js
class Node {
  constructor(key, val) {
    this.key = key;
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

// Implement the driver here.
const flacheStorage = {
  _driver: 'FLACHESTORAGE',
  _initStorage: function(capacity, options) {
    this.capacity = capacity;
    this.cache = new Map(); 
    this.head = null;
    this.tail = null;

    if (options) {
      for (let key in options) {
        this.cache[key] = options[key];
      }
    }

    return Promise.resolve();
  },

  clear: function (callback) {

    return new Promise((resolve, reject) => { 
      try {
        this.cache.clear(); 
        resolve(true);
      } catch (err) {
        reject(err)
      }
    })
  },
  
  getItem: function(key) {
    return new Promise((resolve, reject) => {
      try {
        if (this.cache.has(key)) {
          let node = this.cache.get(key);
          this.moveToFront(node);
          return resolve(node.value);
        }
        
        return resolve(null);
      } catch (err) {
        reject(err); 
      }
    })
  },

  iterate: function(iteratorCallback, successCallback) {
      // Custom implementation here...
      // TO-DO 
  },  

  key: function (n, callback) {
    return new Promise((resolve, reject) => {
      try {
        if (n < 0 || !this.head) return resolve(null);
    
        if (n === 0) {
          if (!callback) resolve(this.head.key);
          resolve(callback(this.head.key));
        } 
        
        let start = this.head; 
        let count = 0;
    
        while (start) {
          start = start.next;
          count++;
          if (count === n) break;
        }
    
        if (count < n) resolve(null);
    
        if(!callback) resolve(start.key);
        resolve(callback(start.key));
      } catch (err) {
        reject(err);
      }
  })
  },

  keys: function (callback) {
    return new Promise((resolve, reject) => {
      try {
        const keys = this.cache.keys();
        if (!callback) resolve([...keys])
        resolve(callback([...keys]));
      } catch (err) {
        reject(err)
      }
    })
  },

  length: function (callback) {
    return this.keys().then(keys => {
      const length = keys.length;
      if (!callback) return length;
      return callback(length);
    });
  },

  removeItem: function(key, callback) {
    delete this.cache[key];
    return Promise.resolve();
  },

  setItem: function(key, value) {
    return new Promise((resolve, reject) => {
      try {
        if (this.cache.has(key)) {
          let node = this.cache.get(key);
          node.value = value;
          this.moveToFront(node);
          resolve(value);
        }
        
        let node = new Node(key, value);
    
        if (this.cache.size === this.capacity) {
          this.cache.delete(this.tail.key);
          this.deleteNode(this.tail);
        }
    
        this.cache.set(key, node);
        this.addFirst(node);
        resolve(value);

      } catch (err) {
        reject(err);
      }
    })
  },

  moveToFront: function(node) {
    this.deleteNode(node);
    this.addFirst(node);
    return;
  },

  deleteNode: function(node) {
    let prevNode = node.prev;
    let nextNode = node.next;

    if (prevNode) {
      prevNode.next = nextNode;
    } else {
      this.head = nextNode;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    } else {
      this.tail = prevNode;
    }

    return;
  },

  addFirst: function(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return;
  },
 
  printLL: function () {
    console.log('This is our Linked List \n', this.head)
  }
}


/* harmony default export */ const src_flacheStorage = (flacheStorage);
;// CONCATENATED MODULE: ./src/flache.js






/**
 * The localforage module
 * @external "localforage"
 * @see {@link https://www.npmjs.com/package/localforage}
 */





external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default().defineDriver(src_flacheStorage);

// import testStorage from './flacheStorageTest';

const flache_defaultOptions = {
  maxCapacity: null, // this is only relevant for local memory at the moment. 
  ttl: 5000,
  duration: null,
  config: {
    name: 'httpCache',
    storeName: 'request_response',
    description: 'A cache for client-side http requests',
    driver: [
      src_flacheStorage._driver,
      (external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default()).INDEXEDDB,
      (external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default()).LOCALSTORAGE,
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
  
  constructor(options = flache_defaultOptions) {

    /** Create store and override the default store options with user-given configurations */
    // TO-DO: check if the store exists already and create new store only if it isn't already there.
    this.store = external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default().createInstance(({
      ...flache_defaultOptions.config,
      ...options.config
    }))

    /** Create details store */
    // TO-DO: same as above. 
    this.details = external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default().createInstance({
      name: 'cacheDetails',
      storeName: 'requests',
      description: 'A list of past requests',
      driver: (external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default()).INDEXEDDB,
      version: 1.0,
    })

    /** Apply TTL (time to live) and maxCapacity from user configuration or default */
    this.ttl = options.ttl || flache_defaultOptions.ttl;
    this.maxCapacity = options.maxCapacity;
    this.duration = flache_defaultOptions.duration;
  }

  static INDEXEDDB = (external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default()).INDEXEDDB;
  static LOCALSTORAGE = (external_commonjs_localforage_commonjs2_localforage_amd_localforage_root_localforage_default()).LOCALSTORAGE;
  static MEMORY = 'FLACHESTORAGE';
}

/** bind helper functions to class clientCache */
clientCache.prototype.flacheRequest = helpers_flacheRequest;
clientCache.prototype.generateKey = helpers_generateKey;
clientCache.prototype.validateCache = helpers_validateCache;
clientCache.prototype.getFetchRequest = serverRequest;
clientCache.prototype.reqExtension = helpers_reqExtension;

/* harmony default export */ const flache = (clientCache);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=flache.js.map