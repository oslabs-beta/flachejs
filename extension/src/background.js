
chrome.storage.sync.set({'request': {}}, function() {
  console.log('Key Request in Storage reset to empty.');
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.requestURL) {
      chrome.storage.sync.get('request', function(result) {
        if (result.request.url === undefined) {
          chrome.storage.sync.set({'request': {url: [request.requestURL], time: [request.time], inCache: [request.inCache]}});
        }
        else {
          let urls = result.request.url;
          let reqs = result.request.time;
          let inCache = result.request.inCache;
          urls.push(request.requestURL);
          reqs.push(request.time);
          inCache.push(request.inCache);
          chrome.storage.sync.set({'request': {url: urls, time: reqs, inCache: inCache}});
        }
    });
   }
});
