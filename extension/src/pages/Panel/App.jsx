import React, { useState } from "react";
import Metrics from './Components/Metrics';
import Requests from './Components/Requests';

const App = () => {
    return (
        <div>
            <Metrics />
            <Requests />
        </div>
    );
}; 

export default App;