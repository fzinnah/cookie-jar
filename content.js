function clickRejectAllButton() {
  // This function should contain logic to find and click the "Reject All" button
  const buttons = document.querySelectorAll(
    'button, input[type="button"], input[type="submit"]'
  );
  buttons.forEach((button) => {
    const buttonText =
      button.textConect.toLowerCase() || button.value.toLowerCase();
    if (
      buttonText.includes("reject all") ||
      buttonText.includes("decline all") ||
      buttonText.includes("refuse all") ||
      buttonText.includes("refuse") ||
      buttonText.includes("reject")
    ) {
      button.click();
      console.log("Reject All button clicked");
    }
  });
}

// Use MutationObserver to detect changes in the DOM (popups appearing)
const observer = new MutationObserver((mutationsList) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      clickRejectAllButton();
    }
  }
});

// Start observing the document body for added nodes (popups)
observer.observe(document.body, { childList: true, subtree: true });

// Initial check in case the popup is already present
clickRejectAllButton();
