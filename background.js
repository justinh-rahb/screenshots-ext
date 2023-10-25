// Listening to messages from popup.js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "captureViewport") {
      captureViewport();
    } else if (request.action === "captureFullPage") {
      captureFullPage();
    }
  });
  
  // Function to capture viewport screenshot
  function captureViewport() {
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, function(dataUrl) {
      saveScreenshot(dataUrl);
    });
  }
  
  // Function to capture full page screenshot
  function captureFullPage() {
    // You can use a library to scroll and capture, or write custom logic
    // For this example, let's assume we have a function that does this and returns a dataUrl
    let dataUrl = captureFullPageHelperFunction();
    saveScreenshot(dataUrl);
  }
  
  // Function to save screenshot
  function saveScreenshot(dataUrl) {
    const blob = dataURItoBlob(dataUrl);
    const url = URL.createObjectURL(blob);
    const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `screenshot_${timeStamp}.png`;
  
    chrome.downloads.download({
      url: url,
      filename: fileName
    });
  }
  
  // Convert data URL to blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
  
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([ab], {type: mimeString});
  }
  
  // Helper function to capture the full page (Placeholder, add your logic here)
  function captureFullPageHelperFunction() {
    // Your logic to scroll and capture the full page, stitch images together and return a dataUrl
    return 'data:image/png;base64,...'; // Replace with actual data URL
  }
  