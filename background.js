let autoRejectEnabled = true;
let rejectSites = [];
let autoClickEnabled = false;

// Load initial reject sites from storage
chrome.storage.sync.get(["rejectSites"], function (result) {
  if (result.rejectSites) {
    rejectSites = result.rejectSites;
  }
  if (result.autoClickEnabled !== undefined) {
    autoClickEnabled = result.autoClickEnabled;
  }
});

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
  } else if (request.action === "setAutoClickEnabled") {
    autoClickEnabled = request.autoClickEnabled;
    chrome.storage.sync.set({ autoClickEnabled: autoClickEnabled });
    sendResponse({ success: true });
  }
});

// Inject content script to handle auto click on "Reject All"
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && autoClickEnabled) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["content.js"],
    });
  }
});
