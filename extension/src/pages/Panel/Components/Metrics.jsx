import React, { useState } from 'react';
import Trend from 'react-trend';

const Metrics = () => {
  const [duration, setDuration] = useState(null);
  const [lastDuration, setLast] = useState(null);
  const [avg, setAvg] = useState(null);

  function getStorage () {
      chrome.storage.sync.get('duration', function(result) {
          if (result.duration != undefined) {
            setDuration(result.duration)
            setLast(result.duration[result.duration.length - 1])
            let avg = result.duration.reduce((partialSum, a) => partialSum + a, 0)/result.duration.length
            if (!isNaN(avg)) setAvg(avg.toFixed(2))
          }
      });
  }

  setInterval(getStorage, 2000 );
    return (
      <div>
        <h3>Metrics: </h3>
        <h4>Last request duration: {lastDuration} ms</h4>
        <h4>Average Cache Time: {avg} ms</h4>
      <div id="speed-graph">
        <h4><u>Speed Graph:</u></h4>
          <Trend
            height = {Number(window.innerWidth / 5)}
            //{Number(`${window.innerHeight}`)>=250 ? Number(`${window.innerHeight}`)-220 : 30}
            //width={Number(window.innerWidth / 3)}
            className="trend"
            data={duration}
            gradient={['#B22222','#DC143C']}
            radius={0.9}
            strokeWidth={2.3}
            strokeLinecap={'round'}
          />
        </div>
      </div>
    );
  };
  
  export default Metrics;