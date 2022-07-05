import React, { useState } from 'react';

const Requests = () => {
    const [req, setReq] = useState(null);

    function getStorage () {
        chrome.storage.sync.get('request', function(result) {
            console.log('whats stored in request: ',result);
            if (result != {}) {
            let allRequests = []
            for (let i = 0; i < result.request.url.length; i++) {
                allRequests.push(<div>URL: {result.request.url[i]} -- Time (ms): {result.request.time[i]}</div>)
            }
            setReq(allRequests)
            }
        });
    }
    setInterval(getStorage, 2000 );
      return (
        <div>
            <h3>Requests:</h3>
            {req}
        </div>
      );
    };
    
export default Requests;