import React, { useState } from 'react';
import Trend from 'react-trend';

function Metrics () {
  const [durationArr, setDuration] = useState(null)
  const [time, setTime] = useState(null);
  const [avg, setAvg] = useState(null);

  function getStorage () {
      chrome.storage.sync.get('request', function(result) {
          if (result != {}) {
            setDuration(result.request.time)
            setTime(result.request.time[result.request.time.length - 1])
            let avg = result.request.time.reduce((partialSum, a) => partialSum + a, 0)/result.request.time.length
            if (!isNaN(avg)) setAvg(avg.toFixed(2))
          }
      });
  }
  chrome.storage.onChanged.addListener(getStorage);
    return (
      <div class="Metrics">
      <h3>Metrics: </h3>
      <div id="speed-graph">
        <h4><u>Speed Graph:</u></h4>
          <Trend
            height = {Number(window.innerWidth / 3)}
            //{Number(`${window.innerHeight}`)>=250 ? Number(`${window.innerHeight}`)-220 : 30}
            //width={Number(window.innerWidth / 3)}
            className="trend"
            data={durationArr}
            gradient={['#B22222','#DC143C', '#FF7518','#FFAA33']}
            radius={0.9}
            strokeWidth={2.3}
            strokeLinecap={'round'}
          />
        </div>
        <div class="info">
        <div>Last Request Duration: <b>{time} ms</b></div>
        <div>Average Cache Time: <b>{avg} ms</b></div>
      </div>
      </div>
    );
  };
  
  export default Metrics;