import generateKey from "./helpers/generateKey";
import getFetchRequest from "./helpers/serverRequest";
import memoizer from "./helpers/memoizer";
import validateCache from "./helpers/validateCache";

/**
 * The localforage module
 * @external "localforage"
 * @see {@link https://www.npmjs.com/package/localforage}
 */
import localforage from "localforage";

/**
 * Function that starts the caching process
 * @param {function} cbFunction
 * @param {string} uniqueKey The URL to which request is made to
 * @return {object} object containing the duration and the resulting data from executing the request
 */
async function GetRequest(cbFunction, url) {
  let start = performance.now();
  const resultData = await cbFunction(url);
  let end = performance.now();
  let duration = (end - start).toFixed(2);
  let result = { duration: duration, data: resultData };
  return result;
}

/**
 * Function that posts
 * @param {function} cbFunction callback function - function returned by memoizer
 * @param {string} uniqueKey The URL to which request is made to
 * @param {object} body
 * @return {object} object containing the duration and the resulting data from executing the request
 */
async function PostRequest(cbFunction, url, reqbody) {
  let start = performance.now();
  const resultData = await cbFunction(url, reqbody);
  let end = performance.now();
  let duration = (end - start).toFixed(2);
  let result = { duration: duration, data: resultData };
  return result;
}

// Testing GET requests
async function testMultipleRequests() {
  const test = memoizer(getFetchRequest);
  const url = "https://thps.vercel.app/api/skaters";

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
  }, 6000);

  console.log("Fourth Request");
  const response4 = await PostRequest(test, url, {
    method: 'POST',
    body: {username: 'codesmith', password: 'password'}
  });
  console.log("Data:", response4.data);
  console.log("Duration:", response4.duration, "ms");

}

testMultipleRequests();

module.exports = {GetRequest, PostRequest} 

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
