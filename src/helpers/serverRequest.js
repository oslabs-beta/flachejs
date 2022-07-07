import parseResponse from './parsers'; 

/**
 * Function that makes a Fetch request to the server
 * @param {string} url URL to where fetch request is being made
 * @return {object} Object containing the resulting data from executing the request in the server
 */

/**
 * How will we handle being redirected? 
 */

async function getFetchRequest(url, options) {
  // TO-DO handling headers, response-types, etc for how to parse data; 
  let response = await fetch(url, options)
    .then(res => {
      const proxyResponse = parseResponse(res);
      return proxyResponse;
    })
    .catch(err => {
      console.log('Fetch error', err.message);
      return err;
    });
  return response;
}

export default getFetchRequest;