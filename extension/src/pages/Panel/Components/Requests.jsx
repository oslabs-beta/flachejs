import React, { useState } from 'react';

const Requests = () => {
    const [req, setReq] = useState(null);

    function getStorage () {
        chrome.storage.sync.get('request', function(result) {
            console.log('whats stored in request: ',result);
            if (result != {}) {
            let allRequests = []
            for (let i = 0; i < result.request.url.length; i++) {
                allRequests.push(<tr><td>{result.request.url[i]}</td><td>{result.request.time[i]}</td></tr>)
            }
            setReq(allRequests)
            }
        });
    }
    setInterval(getStorage, 2000 );
      return (
        <div>
            <h3>Requests:</h3>
            <table>
                <thead>
                    <tr><td>URL</td><td>Time (ms)</td></tr>
                </thead>
                <tbody>
                    {req}
                </tbody>
            </table>
        </div>
      );
    };
    
export default Requests;