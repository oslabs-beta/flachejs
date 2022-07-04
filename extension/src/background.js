console.log("Step 1 - boot");
chrome.storage.sync.set({'duration': []}, function() {
  console.log('Value is set to [] at start: ');
});

chrome.runtime.onMessageExternal.addListener(function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    chrome.storage.sync.set({'duration': request});
    //console.log("This is what's sent from APP yo: ", request);
/*     chrome.storage.sync.set({'duration': request}, function() {
      console.log('Value is set to ' + request);
    }); */
/*     if (request.greeting == "hello")
      sendResponse({farewell: "goodbye"}); */
});