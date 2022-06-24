
import io from "socket.io-client";

async function websocketSetUp () {
    const socket = io(`http://localhost:3000/api/socket`);
    socket.on("newBook", (book) => {
      console.log("Here is the new book on the client side: ", book);
      console.log("Need to Invalidate Cache");
      this.validateCacheWS();
    })
}

export default websocketSetUp;