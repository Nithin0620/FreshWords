chrome.runtime.onInstalled.addListener(() => {
   chrome.contextMenus.create({
      id: "simplifyText",
      title: "Take Help from FreshWords",
      contexts: ["selection"]
   });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
   if (info.menuItemId === "simplifyText") {
      const selectedText = info.selectionText;

      
      chrome.storage.local.set({ selectedText });

      
      chrome.action.openPopup(); 
      // chrome.tabs.create({
      //    url: `popup.html`
      // });
   }
});
