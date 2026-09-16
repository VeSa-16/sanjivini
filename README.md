# Sanjivani Web

A polished SIH-ready frontend prototype for a crop lifecycle companion.

## Run

```bash
npm install
npm run dev
```

## Demo behavior

- Onboarding creates a local farm profile.
- The default date is prefilled ~47 days in the past so Tomato opens around flowering stage.
- Today generates stage/weather-based mock advice.
- Tasks, plant checks and mock photo checks are persisted in localStorage.
- Journey supports farmer stage correction.
- Weekly Report summarizes the last seven days.
- History shows the recorded farm timeline.

## Reset onboarding

Open browser DevTools → Application → Local Storage and delete:
- `sanjivani:farm`
- `sanjivani:logs`

Or run in console:

```js
localStorage.clear()
location.reload()
```

## Data safety

All agricultural recommendations in this prototype are demonstration content. Replace mock rules with validated, source-attributed regional agricultural guidance before real-world use.
