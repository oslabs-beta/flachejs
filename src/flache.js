import localforage from 'localforage';

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

  return async function (uniqueKey) {
    const cacheResult = await cache.getItem(uniqueKey);
    if (!cacheResult) {
      const apiResult = await func(uniqueKey);
      await cache.setItem(uniqueKey, apiResult)
      return apiResult; 
    }

    // Take from cache and return the data value
    return cacheResult; 
  }
}

/**
 * Function that starts the caching process
 * @param {function} cbFunction 
 * @param {string} uniqueKey The URL to which request is made to 
 * @return {object} Object containing the duration and the resulting data from executing the request
 */
async function GetRequest(cbFunction, uniqueKey) {
  let start = performance.now();
  const resultData = await cbFunction(uniqueKey); 
  let end = performance.now()
  let duration = (end - start).toFixed(2);
  let result = {duration: duration, data: resultData};
  return result;
}

// Testing GET requests
async function testMultipleRequests() {
  const test = memoizer(getFetchRequest);
  const uniqueKey = 'https://thps.vercel.app/api/skaters';

  console.log("First Request");
  const response1 = await GetRequest(test, uniqueKey);
  console.log("Data:", response1.data);
  console.log("Duration:", response1.duration, "ms");

  console.log("Second Request");
  const response2 = await GetRequest(test, uniqueKey);
  console.log("Data:", response2.data);
  console.log("Duration:", response2.duration, "ms");
}

testMultipleRequests();
