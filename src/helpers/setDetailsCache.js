
const setDetailsCache = async function (newDuration)  {
    const value = await this.details.getItem('duration');
    let newValue; 
    if (value === null) {
      newValue = [newDuration];
      this.details.setItem('duration', newValue);
    }
    else {
      newValue = value;
      newValue.push(newDuration);
      this.details.setItem('duration', newValue);
    }

    // Send data to our Extension
    if(chrome && chrome.runtime && chrome.runtime.sendMessage) {
      async function sendDuration () {
        //console.log("Sending this duration: ", newValue);
        chrome.runtime.sendMessage("bmkhjogdgeafjdanmhjddmcldejpgaga", {duration: newValue});
      }  
      sendDuration();
    }
}

export default setDetailsCache;