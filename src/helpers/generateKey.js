import md5 from 'md5';


/**
 * Below are the default settings for the native fetch API
 * const response = await fetch(url, {
    method: *GET
    mode:  *cors
    cache: *default
    credentials: *same-origin
    headers: {
      'Content-Type': application/x-www-form-urlencoded,
    },
    redirect: follow
    referrerPolicy: *no-referrer-when-downgrade
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
 */

  
/**
* Function that takes in arguments of an HTTP request and returns them as a single unique (hashed) key
* @param {string} url - request URL
* @param {object} data - object containing HTTP method and other fetch request arguments
* @return {string} - Hashed key
**/



const generateKey = (url, data = defaultHeaders) => {

  // TO-DO error handling for incorrect method
  const method = data.method.toUpperCase();
  if (method === 'GET') {
    return (`${method}/${url}`);
  }
  if (method === 'POST') {
    return (`${method}/${md5(JSON.stringify(data.body))}/${url}`);
  }
}

fetch('url', {})

export default generateKey;