# Chrome Tab URLs Export

A simple Chrome Extension (Manifest V3) that exports all open tabs from the current window into a `.txt` file.

## Features

- Export tabs from the current browser window
- Choose output mode:
  - URLs only
  - Title + URL
  - Markdown links (`[Title](URL)`)
- One-click export from popup
- Automatic filename with timestamp: `tabs_export_YYYY-MM-DD_HH-MM-SS.txt`

## Files

- `manifest.json` - extension configuration and permissions
- `popup.html` - popup UI (dark mode)
- `popup.js` - tab query and file export logic

## Installation (Unpacked)

1. Open `chrome://extensions/` in Chrome/Chromium.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select this project folder.

## Usage

1. Click the extension icon.
2. Select options:
   - **Include titles**
   - **Markdown links** (works when titles are included)
3. Click **Export Tabs**.
4. The file is downloaded automatically.

## Permissions

- `tabs` - read tabs in the current window
- `downloads` - save the export file
