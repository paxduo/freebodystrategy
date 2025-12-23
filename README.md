# Real Estate Activity Tracker

A single-page web application for tracking real estate status changes, hours, and notes while syncing with Google Sheets.

## Features
- Configurable Google Sheets connection (Sheet ID, range, API key, optional OAuth token or Apps Script webhook).
- Log property activities with status, hours, date, and notes; entries persist locally.
- Load existing rows from a Google Sheet and view combined totals.
- Append new rows to Google Sheets when credentials permit, and optionally POST to an Apps Script webhook.

## Usage
1. Open `index.html` in a browser.
2. In **Connection settings**, enter your Sheet ID, tab range (e.g., `Activities!A:G`), API key, and optional OAuth access token or webhook URL.
3. Click **Load sheet data** to pull existing rows.
4. Use **Log new activity** to record updates. Entries are stored locally and the app attempts to append them to your Google Sheet.

> If appending fails (for example, missing OAuth scope), the data stays in local storage so you can retry after updating credentials.
