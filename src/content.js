document.addEventListener('input', (e) => {
  const el = e.target;

  if (
    el.tagName === 'TEXTAREA' ||
    (el.tagName === 'INPUT' && el.type === 'text') ||
    el.isContentEditable
  ) {
    let text = el.value ?? el.innerText;

    const updated = text
      .replace(/\b(Muhammad|Rasulullah)\b(?!\s*ﷺ)/g, "$1 ﷺ");

    if (updated !== text) {
      if (el.value !== undefined) el.value = updated;
      else el.innerText = updated;
    }
  }
});

// Terima perintah dari popup
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "replaceAll") {
    const all = document.querySelectorAll('[contenteditable="true"], textarea, input[type="text"]');
    all.forEach((el) => {
      let text = el.value ?? el.innerText;
      const updated = text
        .replace(/\b(Muhammad|Rasulullah)\b(?!\s*ﷺ)/g, "$1 ﷺ");
      if (updated !== text) {
        if (el.value !== undefined) el.value = updated;
        else el.innerText = updated;
      }
    });
    sendResponse({status: "done"});
  }
});

