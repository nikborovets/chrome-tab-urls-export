const exportBtn = document.getElementById("exportBtn");
const statusEl = document.getElementById("status");
const includeTitlesEl = document.getElementById("includeTitles");

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}_${hour}-${minute}-${second}`;
}

function buildExportContent(tabs, includeTitles) {
  return tabs
    .map((tab) => {
      const title = tab.title || "(No Title)";
      const url = tab.url || "(No URL)";
      return includeTitles ? `${title}\n${url}` : `${url}`;
    })
    .join("\n\n");
}

async function exportTabs() {
  try {
    statusEl.textContent = "Collecting tabs...";

    const tabs = await chrome.tabs.query({ currentWindow: true });
    const includeTitles = includeTitlesEl.checked;
    const content = buildExportContent(tabs, includeTitles);

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const filename = `tabs_export_${formatDate(new Date())}.txt`;

    await chrome.downloads.download({
      url,
      filename,
      saveAs: false
    });

    statusEl.textContent = `Exported ${tabs.length} tab(s).`;

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Failed to export tabs.";
  }
}

exportBtn.addEventListener("click", exportTabs);
