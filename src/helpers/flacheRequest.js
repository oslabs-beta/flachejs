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

/**
 * Function to retreive data from Cache
 * @param {string} url - the url to the server request
 * @param {object} options - the request body
 * @return {object} Object containing the retreived data from the cache
 */
// TO-DO Add errror handling and potentially some routing. 
const flacheRequest = async function (url, options) {
  
  let start = performance.now()

  options = {
    ...defaultOptions,
    ...options
  }

  let uniqueKey = this.generateKey(url, options)

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
    apiResult.ttl = Date.now() + this.ttl
    /** Add to cache */
    await this.store.setItem(uniqueKey, apiResult);
    // this is where we would potetnially trigger evictions
    this.duration = parseInt((performance.now() - start).toFixed(2));
    this.reqExtension(url, this.duration, 'Cache Miss');
    return constructResponse(apiResult);
  }
  
  this.duration = parseInt((performance.now() - start).toFixed(2));
  this.reqExtension(url, this.duration, '');
  return constructResponse(cacheResult);
};


//TO-DO how would this work with Blob or Array Buffer Data?

const constructResponse = (entry) => {
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
   * We should consider what if any of the other properties may interfere with the normal workflow
   * a developer might expect, and also how this will impact any other native functions
   * that interface with the response obj. 
   * 
   * For example - if a user is redirected, but the header is set to manual, the response will not
   * be automatically redirected and the user will have to specify a control flow to handle this. 
   * I think our li
   */

  const outputResponse = new Response(JSON.stringify(entry.data.data), init)
  /**
   * Note: this is to set the url. The url on the native Response Class is received via
   * a getter. To overwirte this we have set an enunerable property url on our repsonse object, this 
   * will modifiy the default behavior of the response somewhat and shluld be tested thoroughly. A 
   * bug from this would probably be almost impossible to track down...
   */
  Object.defineProperty(outputResponse, 'url', {value: entry.response.url, enumerable: true})
  return outputResponse; 
}

export default flacheRequest;
