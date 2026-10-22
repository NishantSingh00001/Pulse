# Pulse — Plan

**What it is:** A habit-building companion. Build and quit habits, hit quantity goals, keep streaks, track mood, earn XP and achievements, and see your consistency in a year heatmap — all offline in the browser. Optional free Gemini key powers a personalised coach; a smart offline coach works without one.

**Visual identity:** Energetic / vital — distinct from Loom's cool editorial. Deep plum-charcoal canvas, coral→violet accent gradient, bold geometric display type (Space Grotesk) with Inter body and IBM Plex Mono labels. Motion motif: a living **pulse waveform** (ECG-style line + particle field) that reacts to the cursor. Gradient-edged rounded cards, bold numerals, texture (dot grid + grain), flowing gradients. No emojis — inline SVG icon system + bespoke "pulse" wave logo.

**Tech:** Static multi-page site. Shared `pulse.css` + `pulse.js`. State in localStorage (`pulse_mp`), shared across pages. Gemini REST via user key.

## Pages (each its own unique functionality)
1. **index.html — Today**: today's scheduled habits with one-tap check / quantity stepper, day summary (done today, active streaks, XP/level), at-risk nudges, offline+AI coach.
2. **habits.html — Habits**: full habit library; create/edit (type build/quit, quantity+unit, schedule daily/X-per-week/pick-days, tags, reminder, notes, emoji-free icon, color); per-habit detail (8-week chart, mood, notes); archive/duplicate/delete; search/sort/filter.
3. **insights.html — Insights**: year heatmap, completion rates (7/30/all), best-weekday, per-habit consistency bars, totals.
4. **achievements.html — Achievements**: XP + level progress, 8 achievements with locked/earned states, milestones.
5. **settings.html — Settings**: theme, accent, Gemini key, data export/import/CSV/reset, shortcuts, full feature list, about/privacy.

## 50 features (target)
Tracking: build habits · quit habits · quantity goals · custom units · daily schedule · X-per-week schedule · pick-days schedule · one-tap check · quantity stepper · progress ring · backfill any day · rest/skip days · per-habit color · per-habit SVG icon · tags · reminder time · notes.
Streaks & stats: current streak · best streak · 7-day rate · 30-day rate · all-time rate · weekly goal tracking · at-risk alerts · perfect-day detection · year heatmap · 8-week bar chart · best-weekday insight · per-habit consistency bars · totals.
Gamification: XP · levels · level progress bar · 8 achievements · locked/earned states.
Review & mood: per-day notes · mood logging (5-point) · recent-notes list.
Coach: offline smart coach · optional Gemini coach.
Manage: create · edit · duplicate · archive · delete · search · sort (streak/rate/name) · filter active/all/archived.
Data: JSON backup · JSON restore · CSV export · progress-card copy · reset.
Platform: multi-page nav · light & dark · 5 accents · custom cursor · pulse-waveform motion · scroll reveals · keyboard shortcuts · autosave across pages · reduced-motion · offline · responsive.
