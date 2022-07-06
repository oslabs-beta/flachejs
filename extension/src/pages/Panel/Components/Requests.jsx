import React, { useState } from 'react';

const Requests = () => {
    const [req, setReq] = useState(null);

    function getStorage () {
        chrome.storage.sync.get('request', function(result) {
            if (result != {}) {
            let allRequests = []
            for (let i = 0; i < result.request.url.length; i++) {
                allRequests.push(<tr><td>{i+1}</td><td>{result.request.url[i]}</td>
                <td>{result.request.time[i]}</td>
                <td>{result.request.inCache[i]}</td></tr>)
            }
            setReq(allRequests)
            }
        });
    }
    chrome.storage.onChanged.addListener(getStorage);
      return (
        <div>
            <h3>Requests:</h3>
            <div class="TableFixed">
            <table>
                <thead>
                    <tr><td></td><td>URL</td><td>Time (ms)</td><td>In Flache?</td></tr>
                </thead>
                <tbody>
                    {req}
                </tbody>
            </table>
            </div>
        </div>
      );
    };
    
export default Requests;