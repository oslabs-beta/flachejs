const reqExtension = (url, duration, inCache, TTL) => {
    // Send data to our Extension
    if(chrome && chrome.runtime && chrome.runtime.sendMessage) {
        async function sendReq () {
          let aRequest = {
            requestURL: url,
            time: duration, 
            inCache: inCache,
            ttl: TTL
          }
          chrome.runtime.sendMessage("bmkhjogdgeafjdanmhjddmcldejpgaga", aRequest);
        }  
        sendReq();
    }
}
  
export default reqExtension;