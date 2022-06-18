/**
 * Function that makes a Fetch request to the server
 * @param {string} url URL to where fetch request is being made
 * @return {object} Object containing the resulting data from executing the request in the server
 */

 async function getFetchRequest(url, options) {
   console.log("Fetching from Server...");
      
   // TO-DO handling headers, response-types, etc for how to parse data; 
    let response;
    if (!options) {
      response = await fetch(url)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        // TO-DO plan out how we will handle errors and route them appropriately. 
        .catch((err) => console.log("fetch error: ", err));
    } else if (options.method.toUpperCase() === 'GET') {
      response = await fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => console.log("fetch error: ", err));
    } else if (options.method.toUpperCase() === 'POST') {
      response = await fetch(url, options)
        .then((res) => res.json())
        .then((data) => {
          return data;
        })
        .catch((err) => console.log("fetch error: ", err));
    } else {
      // TO-DO: add error handling
      // catch invalid request methods in @param options
      // Error handling function:
        // throw a custom error of some kind
        // then handle through another function 
      return new Error('invalid request method');
    }
   
    return response;
 }
  
 export default getFetchRequest;