// Implement the driver here.
const flacheStorage = {
  _driver: 'FLACHESTORAGE',
  _initStorage: function(options) {
    console.log('here')
    this.dbInfo = {};
    if (options) {
      for (let key in options) {
        this.dbInfo[key] = options[key];
      }
    }
    // return Promise.resolve();
  },
  clear: function(callback) {
    for (const key in this.dbInfo) {
      delete this.dbInfo[key];
    }
  },
  getItem: function(key, callback) {
    return Promise.resolve(this.dbInfo[key]);
  },
  iterate: function(iteratorCallback, successCallback) {
      // Custom implementation here...
  },    
  key: function(n, callback) {
      // Custom implementation here...
  },
  keys: function(callback) {
      // Custom implementation here...
  },
  length: function(callback) {
    return Object.keys(this.dbInfo).length;
  },
  removeItem: function(key, callback) {
    delete this.dbInfo[key];
  },
  setItem: function(key, value, callback) {
    console.log('here');
    this.dbInfo[key] = value;
  }
}

export default flacheStorage;