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

  // Toggle auto-reject

  // add site to reject list

  // update toggle button text

  // update the site list in the popup

  //
});
