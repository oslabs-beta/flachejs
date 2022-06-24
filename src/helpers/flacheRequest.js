import generateKey from "./generateKey";


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
 * @param {object=} options - the request body
 * @return {object} Object containing the retreived data from the cache
 */
// TO-DO Add errror handling and potentially some routing. 
const flacheRequest = async function (url, options) {
  options = {
    ...defaultOptions,
    ...options
  }

  let uniqueKey = generateKey(url, options)

  /** Check if the cache already contains the response to the given url or exists in cache but is invalid */
  const cacheResult = await this.store.getItem(uniqueKey)
    .then((data) => {
      if (!data) return null;
      // needs to return data if valid and null if not;
      return this.validateCache(uniqueKey, data);
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

    if (this.websockets === true) {
      apiResult.url = url;
    }
    else {
      /** Apply TTL to object to be stored in cache */
      apiResult.ttl = Date.now() + this.ttl
    }

    /** Add to cache */
    await this.store.setItem(uniqueKey, apiResult);
    // this is where we would potetnially trigger evictions
    return apiResult.data;
  }

  return cacheResult.data;
};

export default flacheRequest;
