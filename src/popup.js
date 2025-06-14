document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("status");
  const autoEnable = document.getElementById("autoEnable");
  const manualBtn = document.getElementById("manualBtn");

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    const url = new URL(tab.url);
    const domain = url.hostname;

    // Cek kompatibilitas halaman (ada area editable?)
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return !!document.querySelector('[contenteditable], textarea, input');
      }
    }, res => {
      const aktif = res[0].result;
      statusEl.textContent = aktif ? "✅ Aktif di halaman ini" : "❌ Tidak kompatibel. Gunakan Mode Manual.";
      statusEl.className = aktif ? "text-green-600 font-semibold" : "text-red-600 font-semibold";
    });

    // Load preferensi pengguna
    chrome.storage.sync.get("enabledSites", data => {
      const enabledSites = data.enabledSites || [];
      autoEnable.checked = enabledSites.includes(domain);

      autoEnable.addEventListener("change", () => {
        const updated = autoEnable.checked
          ? [...new Set([...enabledSites, domain])]
          : enabledSites.filter(d => d !== domain);
        chrome.storage.sync.set({ enabledSites: updated });
      });
    });

    // Tombol Manual
    manualBtn.addEventListener("click", () => {
      chrome.tabs.create({ url: "https://your-webapp-url.com" });
    });
  });
});
