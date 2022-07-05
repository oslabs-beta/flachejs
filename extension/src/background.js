console.log("Step 1 - boot");
chrome.storage.sync.set({'duration': []}, function() {
  console.log('Value is set to [] at start: ');
});
chrome.storage.sync.set({'request': {}}, function() {
  console.log('Value is set to null at start: ');
});
chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    if (request.duration) chrome.storage.sync.set({'duration': request.duration});
    else if (request.requestURL) {
      chrome.storage.sync.get('request', function(result) {
        console.log('whats stored in request: ',result);
        if (result.request.url === undefined) {
          chrome.storage.sync.set({'request': {url: [request.requestURL], time: [request.time]}});
        }
        else {
          let urls = result.request.url;
          let reqs = result.request.time;
          urls.push(request.requestURL);
          reqs.push(request.time);
          chrome.storage.sync.set({'request': {url: urls, time: reqs}});
        }
    });
    }
});
