chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addSholawat",
    title: "Tambahkan Sholawat ﷺ",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addSholawat") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (selectedText) => {
        const sim = " ﷺ";
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        const span = document.createElement("span");
        span.textContent = selectedText + sim;
        range.deleteContents();
        range.insertNode(span);
      },
      args: [info.selectionText]
    });
  }
});
