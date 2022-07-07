class Node {
  constructor(key, val) {
    this.key = key;
    this.value = val;
    this.next = null;
    this.prev = null;
  }
}

// Implement the driver here.
const flacheStorage = {
  _driver: 'FLACHESTORAGE',
  _initStorage: function(capacity, options) {
    this.capacity = capacity;
    this.cache = new Map(); 
    this.head = null;
    this.tail = null;

    if (options) {
      for (let key in options) {
        this.cache[key] = options[key];
      }
    }

    return Promise.resolve();
  },

  clear: function (callback) {

    return new Promise((resolve, reject) => { 
      try {
        this.cache.clear(); 
        resolve(true);
      } catch (err) {
        reject(err)
      }
    })
  },
  
  getItem: function(key) {
    this.printLL();
    return new Promise((resolve, reject) => {
      try {
        if (this.cache.has(key)) {
          let node = this.cache.get(key);
          this.moveToFront(node);
          return resolve(node.value);
        }
        
        return resolve(null);
      } catch (err) {
        reject(err); 
      }
    })
  },

  iterate: function(iteratorCallback, successCallback) {
      // Custom implementation here...
      // TO-DO 
  },  

  key: function (n, callback) {
    return new Promise((resolve, reject) => {
      try {
        if (n < 0 || !this.head) return resolve(null);
    
        if (n === 0) {
          if (!callback) resolve(this.head.key);
          resolve(callback(this.head.key));
        } 
        
        let start = this.head; 
        let count = 0;
    
        while (start) {
          start = start.next;
          count++;
          if (count === n) break;
        }
    
        if (count < n) resolve(null);
    
        if(!callback) resolve(start.key);
        resolve(callback(start.key));
      } catch (err) {
        reject(err);
      }
  })
  },

  keys: function (callback) {
    return new Promise((resolve, reject) => {
      try {
        const keys = this.cache.keys();
        if (!callback) resolve([...keys])
        resolve(callback([...keys]));
      } catch (err) {
        reject(err)
      }
    })
  },

  length: function (callback) {
    return this.keys().then(keys => {
      const length = keys.length;
      if (!callback) return length;
      return callback(length);
    });
  },

  removeItem: function(key, callback) {
    delete this.cache[key];
    return Promise.resolve();
  },

  setItem: function(key, value) {
    return new Promise((resolve, reject) => {
      try {
        if (this.cache.has(key)) {
          let node = this.cache.get(key);
          node.value = value;
          this.moveToFront(node);
          resolve(value);
        }
        
        let node = new Node(key, value);
    
        if (this.cache.size === this.capacity) {
          this.cache.delete(this.tail.key);
          this.deleteNode(this.tail);
        }
    
        this.cache.set(key, node);
        this.addFirst(node);
        resolve(value);

      } catch (err) {
        reject(err);
      }
    })
  },

  moveToFront: function(node) {
    this.deleteNode(node);
    this.addFirst(node);
    return;
  },

  deleteNode: function(node) {
    let prevNode = node.prev;
    let nextNode = node.next;

    if (prevNode) {
      prevNode.next = nextNode;
    } else {
      this.head = nextNode;
    }

    if (nextNode) {
      nextNode.prev = prevNode;
    } else {
      this.tail = prevNode;
    }

    return;
  },

  addFirst: function(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) {
      this.head.prev = node;
    }

    this.head = node;

    if (!this.tail) {
      this.tail = node;
    }

    return;
  },
 
  printLL: function () {
    console.log('This is our Linked List \n', this.head)
  }
}


export default flacheStorage;