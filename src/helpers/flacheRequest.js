import generateKey from "./generateKey";

/**
 * Function to Retreive data from Cache
 * @param {func} func
 * @return {object} Object containing the resulting data from the cache
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
  }
  

// TO-DO Add errror handling and potentially some routing. 

const flacheRequest = async function (url, options) {
  options = {
    ...defaultOptions,
    ...options
  }
  
  let uniqueKey;
  if (!options) uniqueKey = generateKey(url);
  else uniqueKey = generateKey(url, options);

   const cacheResult = await this.store.getItem(uniqueKey)
     .then((data) => {
        if (!data) return null;
        // needs to return data if valid and null if not;
        return this.validateCache(uniqueKey, data);
     })
     .catch(err => err);
   
   // what should we do if this throws an err? -> err would indicate that storage is full for write operations 
   // read operations this would probably indicate an issue with the store itself. 

  if (!cacheResult) {
    const apiResult = await this.getFetchRequest(url, options);
    console.log('setting ttl', this.ttl)
    const value = { ttl: Date.now() + this.ttl, data: apiResult };
    await this.store.setItem(uniqueKey, value);
    // this is where we would potetniall trigger evictions
    return value.data;
  }
   
  return cacheResult.data;
};

  export default flacheRequest;
