import React, { useState } from "react";
import Metrics from './Components/Metrics';
import Requests from './Components/Requests';

const App = () => {
    return (
        <div>
            <Requests />
            <Metrics />
        </div>
    );
}; 

export default App;