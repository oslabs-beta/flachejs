import md5 from 'md5';
  
/**
* Function that takes in arguments of an HTTP request and returns them as a single unique (hashed) key
* @param {string} url - request URL
* @param {object} data - object containing request body such as the HTTP method
* @return {string} - Hashed key
**/
const generateKey = (url, data) => {
  // TO-DO error handling for incorrect method
  const method = data.method.toUpperCase();
  if (method === 'GET') {
    return (`${method}/${url}`);
  }
  if (method === 'POST') {
    if (!Object.hasOwn(data, 'body')) throw new Error('Must include a body with POST request');
    return (`${method}/${md5(JSON.stringify(data.body))}/${url}`);
  }
}

export default generateKey;