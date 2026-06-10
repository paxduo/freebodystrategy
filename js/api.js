/* LibreNow — API client */

async function api(path, opts = {}) {
  const res = await fetch("/api" + path, {
    method: opts.method || "GET",
    headers: { "Content-Type": "application/json", "X-Requested-With": "LibreNow" },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
    credentials: "same-origin"
  });
  let data = {};
  try { data = await res.json(); } catch (_) {}
  if (!res.ok) {
    const err = new Error(data.error || "http_" + res.status);
    err.status = res.status;
    throw err;
  }
  return data;
}

// Server availability probe — the static pages work without the server,
// but intake, attorney dashboard, and family portal need it.
let LN_SERVER = null;

async function probeServer() {
  try {
    LN_SERVER = await api("/health");
  } catch (_) {
    LN_SERVER = null;
  }
  return LN_SERVER;
}
