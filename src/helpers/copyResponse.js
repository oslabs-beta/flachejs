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

export default copyResponse