# Pulse

**A habit-building companion that runs entirely in your browser.**

Build good habits, quit the ones you don't want, hit quantity goals, keep streaks, track mood, earn XP and achievements, and see your consistency in a year heatmap — all offline. An optional free Gemini key adds a personalised coach; a smart offline coach works without one. No account, no server, no tracking.

A true multi-page site with a shared design system and state that persists across pages.

---

## Pages

| Page | File | What it does |
|------|------|--------------|
| **Today** | `index.html` | Today's scheduled habits (one-tap check / quantity stepper), day summary, XP/level, momentum bars, offline + AI coach. |
| **Habits** | `habits.html` | Full library; create/edit (build or quit, quantity + unit, schedule, tags, reminder, notes, SVG icon, color); per-habit history (8-week chart, mood, notes); duplicate/archive/delete; search/sort/filter. |
| **Insights** | `insights.html` | Completion rates, this-week check-ins, best weekdays, and a heatmap per habit. |
| **Achievements** | `achievements.html` | Level + XP progress and eight milestone achievements. |
| **Settings** | `settings.html` | Theme, accent, coach key, data backup/restore/CSV/reset, shortcuts, full feature list. |

## Highlights (50+ features)

Tracking — build & quit habits, quantity goals, custom units, daily / X-per-week / pick-days schedules, one-tap check, quantity stepper, progress ring, backfill any day, rest/skip days, per-habit color & SVG icon, tags, reminders, notes.

Streaks & stats — current & best streak, 7/30/all-time rates, weekly goal tracking, at-risk alerts, perfect-day detection, year heatmap, 8-week chart, best-weekday insight, per-habit consistency bars.

Gamification & review — XP, levels, progress bar, 8 achievements, per-day notes, 5-point mood logging.

Coach & data — offline smart coach, optional Gemini coach, JSON backup/restore, CSV export, progress-card copy, reset.

Platform — multi-page nav, light & dark, 5 accents, custom reactive cursor, pulse-wave motion, scroll reveals, keyboard shortcuts (`N`, `T`, `Esc`), autosave across pages, reduced-motion support, fully offline, responsive.

## Deploy (free)

Static site, no build step.

1. Create a GitHub repo and upload the whole folder (all `.html`, `pulse.css`, `pulse.js`).
2. Connect to **Netlify** or **Vercel** (no build command; publish directory is the repo root).
3. Open the URL — `index.html` is the entry point.

Local preview:

```bash
cd pulse
python3 -m http.server 8000
# open http://localhost:8000
```

> Open via a server or your deployed URL, not by double-clicking — browsers restrict shared storage on `file://`.

## Privacy

All data lives in your browser's `localStorage`. Nothing is uploaded. Only if you add a Gemini key is a short summary of your habits sent to Google (directly from your device) to write a coaching tip.

## Tech

Vanilla HTML/CSS/JS. Fonts: Space Grotesk, Inter, IBM Plex Mono. No framework, no tracker, no backend.
