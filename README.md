# YouTube Video Filter

A Tampermonkey userscript that filters out unwanted videos from the YouTube homepage and watch pages, the goal is to help you focus by removing distracting content such as Shorts and irrelevant channels or topics

## Features

- Removes **YouTube Shorts** from the homepage and watch pages
- Filters homepage videos based on **channel names** and **title keywords**
- Auto-refreshes filtering every 3 seconds to catch newly loaded content
- Automatically patches `touchstart` events to be passive for performance

---

## Setup Instructions

### 1. Install Tampermonkey

If you haven't already, install the Tampermonkey extension:

- [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Tampermonkey for Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- [Tampermonkey for Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/dghhmoicpeapghbciepepcadhgjhhfma)

---

### 2. Install the Script

1. Go to your Tampermonkey dashboard
2. Click the **`+`** (Create a new script) button
3. Paste the contents of [`main.js`](./main.js) into the editor
4. Save the script (File > Save or `Ctrl+S`)

---

### 3. Customize Filters

Edit the arrays in `main.js` to personalize what gets filtered:

```js
const channel_list = ["unsolicited advice"]; // Channels you WANT to see
const titles = ["chess"]; // Keywords you WANT to see in video titles
````

Everything not matching these will be removed

---

## Endpoints

The script runs when you're on:

  * The homepage (`https://www.youtube.com/`)
  * Any Shorts URL (`/shorts/*`)
  * Watch pages (`/watch?v=*`)

---

## Notes

YouTube's layout may change, which can break the script, in case send me an update

---
