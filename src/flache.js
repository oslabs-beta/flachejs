import localforage from 'localforage';
import generateKey from './helpers/generateKey';

const store = localforage.createInstance({
  name: 'httpCache',
  storeName: 'entries',
  description: 'A cache for client HTTP requests',
  version: 1.0
})

store.setItem('test', { message: 'this is a test to see if this even works' });
store.setItem('test2', [1, 2, 3]);
// store.clear();
//store.getItem('test').then(res => console.log(res))

/* 
REMAINING NOTES FOR GET FETCH REQUEST FUNCTIONS
Still to do: 
- Change it to accept parameters like a usual Fetch Request
- This will probably take the same arguments as the standard fetch request, but will execute logic/helper functions before returning data to the client. 
- Take in key from jasmirs function: value is data response from fetch request
- This should take a request and transform it into a valid entry for the DB
- Add a TTL component to response too
- Should probably send some kind of success note or failure notice.  */

/**
 * Function that makes a Fetch request to the server
 * @param {string} url URL to where fetch request is being made
 * @return {object} Object containing the resulting data from executing the request in the server
 */
async function getFetchRequest(url) {
  console.log("Fetching from Server...");
  let response = await fetch(url)
    .then((res) => res.json())
    .then((data) => { return data; })
    .catch((err) => console.log('fetch error: ', err));

  return response;
}

/**
 * Function to Retreive data from Cache
 * @param {func} func
 * @return {object} Object containing the resulting data from the cache
 */
function memoizer(func) {
  var cache = localforage.createInstance({
    name: "fetchRequests"
  });

  return async function (url) {
    const uniqueKey = generateKey(url);
    const cacheResult = await cache.getItem(uniqueKey)
      .then(data => {
        if (!data) return null; 
        // needs to return data if valid and null if not; 
        return validateCache(cache, uniqueKey, data);
      });
    
    if (!cacheResult) {
      const apiResult = await func(url);
      const value = {ttl: Date.now() + 5000, data: apiResult};
      await cache.setItem(uniqueKey, value);
      return value.data; 
    }

    // Take from cache and return the data value
    return cacheResult.data; 
  }
}

/**
 * Function that starts the caching process
 * @param {function} cbFunction 
 * @param {string} uniqueKey The URL to which request is made to 
 * @return {object} object containing the duration and the resulting data from executing the request
 */
async function GetRequest(cbFunction, url) {
  let start = performance.now();
  const resultData = await cbFunction(url); 
  let end = performance.now()
  let duration = (end - start).toFixed(2);
  let result = {duration: duration, data: resultData};
  return result;
}

/**
 * Function that validates the cache
 * @param {object} object data
 * @return {object} object cache value (keys: ttl, data) if in cache and valid, null if not
 */
async function validateCache(cache, uniqueKey, data) {
  if (data.ttl < Date.now()) {
    //TO-DO: remove invalid item from cache
    await cache.removeItem(uniqueKey);
    return null;
  } else return data;
}

// Testing GET requests
async function testMultipleRequests() {
  const test = memoizer(getFetchRequest);
  const url = 'https://thps.vercel.app/api/skaters';

  console.log("First Request");
  const response1 = await GetRequest(test, url);
  console.log("Data:", response1.data);
  console.log("Duration:", response1.duration, "ms");

  console.log("Second Request");
  const response2 = await GetRequest(test, url);
  console.log("Data:", response2.data);
  console.log("Duration:", response2.duration, "ms");

  setTimeout(async () => {
    console.log("Third Request");
    const response3 = await GetRequest(test, url);
    console.log("Data:", response3.data);
    console.log("Duration:", response3.duration, "ms");
  }, 6000)
}

testMultipleRequests();


/*//TO-DO: Add LRU & TTL Validation
async function validateCache() {
  //while DLL.tail.TTL is not valid
    //delete hashmap entry
    //move DLL.tail to DLL.tail.prev
    //request to node.query for updated information
    //.then save to new LLNode
    //.then save key and ref of new node to hashmap
    //delete invalidated node
}

async function getCache(key) {
  await validateCache();
  //check in cache hashmap for key
  //check referenced DLL node
  //change refs of prev and next nodes to each other
  //move new node to DLL.tail, update tail
  //return value
}*/