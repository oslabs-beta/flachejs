/**
 * Function that makes a Fetch request to the server
 * @param {string} url URL to where fetch request is being made
 * @return {object} Object containing the resulting data from executing the request in the server
 */

 async function getFetchRequest(url, options) {
   console.log("Fetching from Server..."); 
   // TO-DO handling headers, response-types, etc for how to parse data; 
   let response = await fetch(url, options)
     .then(res => parseResponse(res))
     .catch(err => console.log('Fetch error', err.message));
    return response;
 }

// idea basic middleware pattern that calls functions in order until it receives valid data from response. 
async function parseResponse(res) {
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

export default getFetchRequest;
 


// Legacy attempt

    // if (!options) {
    //   response = await fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       return data;
    //     })
    //     // TO-DO plan out how we will handle errors and route them appropriately. 
    //     .catch((err) => console.log("fetch error: ", err));
    // } else if (options.method.toUpperCase() === 'GET') {
    //   response = await fetch(url, options)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       return data;
    //     })
    //     .catch((err) => console.log("fetch error: ", err));
    // } else if (options.method.toUpperCase() === 'POST') {
    //   response = await fetch(url, options)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       return data;
    //     })
    //     .catch((err) => console.log("fetch error: ", err));
    // } else {
    //   // TO-DO: add error handling
    //   // catch invalid request methods in @param options
    //   // Error handling function:
    //     // throw a custom error of some kind
    //     // then handle through another function 
    //   return new Error('invalid request method');
    // }
   