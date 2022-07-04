import React, { useState } from 'react';
import Trend from 'react-trend';

const Metrics = () => {
  const [duration, setDuration] = useState(null);

  function getStorage () {
      chrome.storage.sync.get('duration', function(result) {
          //console.log(duration,'vs', result.duration)
          setDuration(result.duration)
          //console.log('Value currently is ' + duration);
      });
  }
  
  setInterval(getStorage, 2000 );
    return (
      <div>
      <div id="speed-graph">
        <h3>Speed Graph:</h3>
          <Trend
            height = {Number(`${window.innerHeight}`)>=250 ? Number(`${window.innerHeight}`)-220 : 30}
            width={Number(window.innerWidth / 5)}
            className="trend"
            data={duration}
            gradient={['#1feaea','#ffd200', '#f72047']}
            radius={0.9}
            strokeWidth={2.2}
            strokeLinecap={'round'}
          />
        </div>
      </div>
    );
  };
  
  export default Metrics;