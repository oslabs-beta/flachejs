const reqExtension = (url, duration) => {
    // Send data to our Extension
    if(chrome && chrome.runtime && chrome.runtime.sendMessage) {
        async function sendReq () {
          let aRequest = {
            requestURL: url,
            time: duration
          }
          chrome.runtime.sendMessage("bmkhjogdgeafjdanmhjddmcldejpgaga", aRequest);
        }  
        sendReq();
    }
}
  
export default reqExtension;