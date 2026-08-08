export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      :root {
        --color-bg: #fafafa;
        --color-fg: #111;
        --color-muted: #4b5563;
        --color-border: #e5e7eb;
        --color-accent: #667eea;
        --color-accent-alt: #764ba2;
        --color-white: #fff;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --color-bg: #0f172a;
          --color-fg: #f1f5f9;
          --color-muted: #94a3b8;
          --color-border: #334155;
          --color-white: #1e293b;
        }
      }
      html { font-size: 16px; }
      body {
        font: 1rem/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif;
        background: var(--color-bg);
        color: var(--color-fg);
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1.5rem;
        transition: background-color 0.3s ease;
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .container {
        max-width: 28rem;
        width: 100%;
        animation: slideUp 0.6s ease-out;
      }
      .icon {
        font-size: 3rem;
        display: inline-block;
        margin-bottom: 1.5rem;
      }
      .icon-error {
        animation: shake 0.5s ease-in-out;
      }
      .icon-404 {
        animation: float 3s ease-in-out infinite;
      }
      h1 {
        font-size: 2rem;
        margin: 0 0 1rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        animation: slideUp 0.6s ease-out 0.1s both;
      }
      .code-404 {
        font-size: 3.5rem;
        font-weight: 900;
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-alt) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin: 0.5rem 0;
        letter-spacing: -0.04em;
        animation: slideUp 0.6s ease-out 0.05s both;
      }
      p {
        color: var(--color-muted);
        margin: 0 0 2rem;
        font-size: 0.95rem;
        line-height: 1.6;
        animation: slideUp 0.6s ease-out 0.2s both;
      }
      .actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 1.5rem;
        animation: slideUp 0.6s ease-out 0.3s both;
      }
      a, button {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font: inherit;
        font-weight: 500;
        cursor: pointer;
        text-decoration: none;
        border: 1px solid transparent;
        transition: all 0.2s ease;
        font-size: 0.95rem;
      }
      .btn-primary {
        background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-alt) 100%);
        color: var(--color-white);
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
      }
      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
      }
      .btn-secondary {
        background: var(--color-white);
        color: var(--color-fg);
        border-color: var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-border);
        border-color: var(--color-border);
      }
      .details {
        text-align: left;
        background: var(--color-white);
        padding: 1rem;
        border-radius: 0.5rem;
        border: 1px solid var(--color-border);
        font-size: 0.8rem;
        color: var(--color-muted);
        font-family: "Monaco", "Courier New", monospace;
        max-height: 15rem;
        overflow-y: auto;
        animation: slideUp 0.6s ease-out 0.4s both;
        word-break: break-all;
      }
      .details-title {
        color: var(--color-fg);
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .details-content {
        white-space: pre-wrap;
        line-height: 1.4;
      }
      @media (max-width: 28rem) {
        h1 { font-size: 1.5rem; }
        .code-404 { font-size: 2.5rem; }
        .icon { font-size: 2.5rem; }
        a, button { padding: 0.6rem 1.2rem; font-size: 0.9rem; }
      }
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: var(--color-border);
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb {
        background: var(--color-muted);
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--color-fg);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div style="text-align: center;">
        <div class="icon icon-error">⚠️</div>
        <h1>Something went wrong</h1>
        <p>An unexpected error occurred while loading this page. Our team has been notified. Please try again or return to the homepage.</p>
        <div class="actions">
          <button class="btn-primary" onclick="window.location.href = '/'">Go to homepage</button>
          <button class="btn-secondary" onclick="location.reload()">Reload page</button>
        </div>
      </div>
    </div>
  </body>
</html>`;
}
