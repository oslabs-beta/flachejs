import localforage from "localforage";
import generateKey from "./generateKey";
import validateCache from "./validateCache";
import getFetchRequest from "./serverRequest"; 

/**
 * Function to Retreive data from Cache
 * @param {func} func
 * @return {object} Object containing the resulting data from the cache
 */


// Test for memoized version of cache - working at the moment; 

//  function memoizer(func) {
//     var cache = localforage.createInstance({
//       name: "fetchRequests",
//     });
  
//     return async function (url, reqbody) {
//       let uniqueKey;
//       if (!reqbody) uniqueKey = generateKey(url);
//       else uniqueKey = generateKey(url, reqbody);
  
//       const cacheResult = await cache.getItem(uniqueKey).then((data) => {
//         if (!data) return null;
//         // needs to return data if valid and null if not;
//         return validateCache(cache, uniqueKey, data);
//       });
  
//       if (!cacheResult) {
//         let apiResult;
//         if (!reqbody) apiResult = await func(url);
//         else apiResult = await func(url, reqbody);
//         const value = { ttl: Date.now() + 5000, data: apiResult };
//         await cache.setItem(uniqueKey, value);
//         return value.data;
//       }
  
//       // Take from cache and return the data value
//       return cacheResult.data;
//     };
//  }
  
 const flacheRequest = async function (url, options) {
  let uniqueKey;
  if (!options) uniqueKey = generateKey(url);
  else uniqueKey = generateKey(url, options);

  const cacheResult = await this.store.getItem(uniqueKey).then((data) => {
    if (!data) return null;
    // needs to return data if valid and null if not;
    return this.validateCache(uniqueKey, data);
  });

  if (!cacheResult) {
    const apiResult = await this.getFetchRequest(url, options);
    const value = { ttl: Date.now() + this.ttl, data: apiResult };
    await this.store.setItem(uniqueKey, value);
    return value.data;
  }
  // Take from cache and return the data value
  return cacheResult.data;
};

  export default flacheRequest;
