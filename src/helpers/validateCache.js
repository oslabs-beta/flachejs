/**
 * Function that validates the cache
 * @param {object} data
 * @return {object} object cache value (keys: ttl, data) if in cache and valid, null if not
 */

async function validateCache(uniqueKey, data) {
  console.log(data.ttl, Date.now());
   if (data.ttl < Date.now()) {
      console.log('cache miss', data.ttl)
      // TO-DO: remove invalid item from cache and remove all? 
      await this.store.removeItem(uniqueKey);
      return null;
    } else return data;
  }
  
  export default validateCache;