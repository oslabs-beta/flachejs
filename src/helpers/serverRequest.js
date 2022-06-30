/**
 * Function that makes a Fetch request to the server
 * @param {string} url URL to where fetch request is being made
 * @return {object} Object containing the resulting data from executing the request in the server
 */

/**
 * How will we handle being redirected? 
 */
async function getFetchRequest(url, options) {
  console.log("Fetching from Server...");
  // TO-DO handling headers, response-types, etc for how to parse data; 
  let response = await fetch(url, options)
    .then(res => {
      console.log('Response from server', res)
      const proxyResponse = parseResponse(res);
      return proxyResponse;
    })
    .catch(err => console.log('Fetch error', err.message));
  return response;
}

/**
 * Parse response from the server to record the data type
 * Middleware pattern calls functions in order until it receives valid data from response
 * @param {string} res - response from server request
 * @return {object} Object containing the resulting data from executing the request in the server
 */

async function parseResponse(res, skip) {
  const responseCopy = copyResponse(res);
  const dataCopy = await parseJSON(res); 

  if (!dataCopy) throw new Error('failed to parse data');

  return { response: responseCopy, data: dataCopy };
}


async function parseJSON(res) {
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


function copyResponse(res, skip = ['body']) {
  if (!(res instanceof Response)) throw new Error('Not a valid response object'); 

  const newObj = {};
  for (const key in res) {
    // this is to avoid copying function definitions from the objects prototype; 
    // it also checks if we have marked this as a property ot skip. 
    if (skip.includes(key) || typeof res[key] === 'function') continue;
   
    //This is to iterate through the headers obj and copy all of the headers returned by the server
    // we will reconstruct this later and recreate the exact same response. 
    if (key === 'headers') {
      newObj[key] = copyHeaders(res[key]);
      continue; 
    }
    newObj[key] = res[key]; 
  }
  return newObj; 
}

function copyHeaders(header) {
  const entries = header.entries();

  const newObj = {};

  for (const [key, value] of entries) {
    newObj[key] = value;
  }

  return newObj
}


class syntheticResponse extends Response {
  constructor(url) {
    super();
  }

  get url() {
    return url;
  }
}

// console.log(new syntheticResponse('12345'))
export default getFetchRequest;