import React from 'react';
import Loki from 'lokijs';

export const db = new Loki('client-cache', {
  autoload: true,
  autosave: true,
  autosaveInterval: 4000
});

export const requests = db.addCollection('requests');

const queryContext = React.createContext(requests);;

export const QueryProvider = queryContext.Provider;

export default queryContext; 

