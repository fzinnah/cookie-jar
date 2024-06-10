let autoRejectEnabled = true;
let rejectSites = [];

// Load initial reject sites from storage
chrome.storage.sync.get(["rejectSites"], function (result) {
  if (result.rejectSites) {
    rejectSites = result.rejectSites;
  }
});

// Intercept and modify request headers to reject cookies
chrome.webRequest.onBeforeSendHeaders.addListener(
  function (details) {
    if (
      autoRejectEnabled &&
      rejectSites.some((site) => details.url.includes(site))
    ) {
      for (let header of details.requestHeaders) {
        if (header.name.toLowerCase() === "cookie") {
          header.value = ""; // Clear the cookie header to reject cookies
        }
      }
    }
    return { requestHeaders: details.requestHeaders };
  },
  { urls: ["<all_urls>"] },
  ["blocking", "requestHeaders"]
);

// Handle messages from popup.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "toggleAutoReject") {
    autoRejectEnabled = !autoRejectEnabled;
    sendResponse({ autoRejectEnabled });
  } else if (request.action === "updateSites") {
    rejectSites = request.sites;
    chrome.storage.sync.set({ rejectSites: rejectSites });
    sendResponse({ success: true });
  } else if (request.action === "getAutoRejectStatus") {
    sendResponse({ autoRejectEnabled });
  }
});
