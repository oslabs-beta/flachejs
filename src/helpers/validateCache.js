/**
 * Function that validates the cache
 * @param {string} uniqueKey - hashed key that contains request url and body
 * @param {object} data - response from the server request containing the request's TTL
 * @return {object} object cache value (keys: ttl, data) if in cache and valid, null if not
 */
async function validateCache(uniqueKey, data) {
  // check if the item in the store's TTL has passed from the current time of the function call
  if (data.ttl < Date.now()) {
    console.log('cache miss', data.ttl)
    // TO-DO: remove invalid item from cache and remove all? 
    await this.store.removeItem(uniqueKey);
    return null;
  } else return data;
}

export default validateCache;