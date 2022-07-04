
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
      //console.log("Step 1: trying");
      async function getDuration () {
        console.log("Sending this duration: ", newValue);
        chrome.runtime.sendMessage("bmkhjogdgeafjdanmhjddmcldejpgaga", newValue, function(response) {
          console.log(response);
        });
      }
      
      getDuration();
      //setInterval(getDuration, 6000 );
    }
}

export default setDetailsCache;