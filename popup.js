document.getElementById('viewportScreenshot').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "captureViewport"});
  });
  
  document.getElementById('fullPageScreenshot').addEventListener('click', function() {
    chrome.runtime.sendMessage({action: "captureFullPage"});
  });
  