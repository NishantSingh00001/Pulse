# Security Review — Pulse

Pulse is a fully static, client-side habit tracker (`pulse.js` + 5 HTML
pages). All habit/streak/mood data lives only in browser `localStorage`. The
only network call is the optional "AI coach" feature
(`pulse.js:135`): if the user enters their own Gemini API key (stored only in
`localStorage`), the app calls `generativelanguage.googleapis.com` directly
from the browser with that key as a query parameter — there is no backend
proxy, consistent with this author's other bring-your-own-key apps and with
the README's own privacy section. Without a key configured, an offline
rule-based coach (`offlineCoach()`) is used instead and nothing is sent
anywhere.

## 20-point pen-test checklist

| # | Check | Applicable? | Notes |
|---|-------|-------------|-------|
| 1 | HTTP/2 Rapid Reset (CVE-2023-44487) | N/A | No server component in this repo. |
| 2 | bcrypt 72-byte truncation | N/A | No password hashing. |
| 3 | SAML signature bypass (CVE-2024-45409) | N/A | No SAML/SSO. |
| 4 | nOAuth | N/A | No OAuth/auth of any kind. |
| 5 | GraphQL alias batching | N/A | No GraphQL. |
| 6 | TOTP replay (RFC 6238 §5.2) | N/A | No TOTP/2FA. |
| 7 | ReDoS | No | No user-supplied-pattern regexes. |
| 8 | JWT algorithm confusion | N/A | No JWTs. |
| 9 | HTTP request smuggling | N/A | No server; the Gemini call goes straight from the browser to Google's API. |
| 10 | Web cache poisoning | N/A | No server/cache layer. |
| 11 | Spoofed X-Forwarded-For | N/A | No server-side request handling. |
| 12 | Postgres views bypassing RLS | N/A | No database. |
| 13 | `Math.random()` for security tokens | No | `Math.random()` is used for a display-only record ID suffix (`uid()`, `pulse.js:75`) and decorative background-blob positions/demo-seed values — none are security tokens. |
| 14 | Timing attacks on secret comparison | N/A | No secrets/credentials are compared in this app (the Gemini key is only forwarded, never checked). |
| 15 | Padding oracle | N/A | No encryption/decryption. |
| 16 | Server-side prototype pollution | N/A | No server; `localStorage` state is loaded into a fixed shape. |
| 17 | Server-side template injection | N/A | No server, no templating engine. |
| 18 | XXE | N/A | No XML parsing (JSON/CSV export only). |
| 19 | Cross-site WebSocket hijacking | N/A | No WebSockets. |
| 20 | Unicode username normalization | N/A | No usernames/accounts. |

## Findings outside the 20-point list

None. `esc()` (`pulse.js:76`) escapes `&`/`<`/`>` and is applied to
user-entered habit/note text wherever it's interpolated into `innerHTML`; no
`esc()` output is used to build an `href`/`src` attribute anywhere in this
app, so the narrower escape set (no quote-escaping) is safe as used here. The
AI coach's response text is assigned via `el.textContent` (`pulse.js:135`),
not `innerHTML`, so even an adversarial model response can't inject markup.
The Gemini key, entered and stored only in the user's own browser, is never
sent anywhere except directly to Google's documented API endpoint.

No fixes are proposed or applied in this review.
