chrome.devtools.panels.create('Flache', null, '/pages/Panel/index.html');

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        console.log('This is the response from devtools: ',request);

/*       if (sender.url === blocklistedWebsite)
        return;  // don't allow this web page access
      if (request.openUrlInEditor)
        openUrl(request.openUrlInEditor); */
    }); 