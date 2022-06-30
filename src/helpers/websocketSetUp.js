
import io from "socket.io-client";

async function websocketSetUp () {
  console.log("URL: ",this.websocketsURL);
    const socket = io(this.websocketsURL);
    socket.on("newItem", (item) => {
      console.log("Here is the new item: ", item);
      console.log("Need to Invalidate Cache");
      this.validateCacheWS();
    })
}

export default websocketSetUp;