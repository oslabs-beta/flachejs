import copyResponse from './copyResponse';

/**
 * Parse response from the server to record the data type
 * Middleware pattern calls functions in order until it receives valid data from response
 * @param {Response} res - response from server request
 * @param {string} res - response from server request
 * @return {object} Object containing the resulting data from executing the request in the server and the response detils for later reconstruction. 
 */


async function parseResponse(res) {
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

// Note these are still in experimental phase
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

export default parseResponse