/* > Loop through each key (request) in cache
     > grab URL portion of value
     > delete it 
     > fetching from server
     > set it in cache  */
     
async function validateCacheWS () {
    const allKeys = await this.store.keys()
    .then(function(keys) {
        // An array of all the key names.
        console.log(keys);
        return keys; 
    })
    .catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
      
    for (let i = 0; i < allKeys.length; i++) {
        const  URL = await this.store.getItem(allKeys[i])
        .then((value) => {
            if (!value) return null;
            return value.url
        })
        .catch(err => err);
      
        await this.store.removeItem(allKeys[i]);
        this.flacheRequest(URL);
    }
}

export default validateCacheWS;