import React from 'react'
import * as ReactDOMClient from 'react-dom/client';
import App from './components/App.jsx';
import clientCache from '../../src/flache.js';
// import { QueryProvider } from './components/Query.jsx';

// import { QueryProvider, requests } from './components/Query.jsx';


const store = new clientCache();
console.log(store); 
store.setItem('test', 'Trying to see if this works');
import styles from './stylesheets/application.css';

const container = document.getElementById('app');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(
    // <QueryProvider>
        <App />
    // </QueryProvider>
);

