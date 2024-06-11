document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("toggleButton");
  const siteInput = document.getElementById("siteInput");
  const addSiteButton = document.getElementById("addSiteButton");
  const siteList = document.getElementById("siteList");

  let rejectSites = [];

  // Load reject sites from storage
  chrome.storage.sync.get(["rejectSites"], function (result) {
    if (result.rejectSites) {
      rejectSites = result.rejectSites;
      updateSiteList();
    }
  });

  // get auto-reject status
  chrome.runtime.sendMessage(
    { action: "toggleAutoReject" },
    function (response) {
      updateButton(response.autoRejectEnabled);
    }
  );

  // Toggle auto-reject
  toggleButton.addEventListener("click", function () {
    chrome.runtime.sendMessage(
      { action: "toggleAutoReject" },
      function (response) {
        updateButton(response.autoRejectEnabled);
      }
    );
  });

  // add site to reject list
  addSiteButton.addEventListener("click", function () {
    const site = siteInput.value.trim();
    if (site && !rejectSites.includes(site)) {
      rejectSites.push(site);
      chrome.runtime.sendMessage(
        { action: "updateSites", sites: rejectSites },
        function (response) {
          if (response.success) {
            updateSiteList();
            siteInput.value = "";
          }
        }
      );
    }
  });

  // update toggle button text
  function updateButton(enabled) {
    if (enabled) {
      toggleButton.textContent = "Disable Auto Reject";
    } else {
      toggleButton.textContent = "Enable Auto Reject";
    }
  }
  // update the site list in the popup

  //
});
