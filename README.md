# Off the Hook

A tuna-themed web app that helps you ride out vape cravings. Tap **There's a hook!**, draw a silly side-quest card, do it, and build an aquarium of cards along the way. Every craving beaten adds a tuna to your school.

The sources for every milestone claim live in [`docs/milestones.md`](docs/milestones.md). The `docs/` folder isn't part of the app: only the built `dist/` is deployed.

**Off the Hook is not medical advice.** If you want help quitting, talk to a doctor or your local quitline.

## How it works

- **No backend.** It's a static site. All progress stays on your phone (IndexedDB), with backup/restore to a file.
- **Installable and offline.** It's a PWA: add it to the home screen from Safari and it runs full screen, offline.
- **English, Dutch, Lithuanian and Czech.** The language is picked from the phone's settings and can be changed in Settings. To add one, add its code to `Lang`, `LANGS`, `LANG_NAMES` and `LOCALES` in [`src/cards.ts`](src/cards.ts), add a strings file like [`src/i18n-nl.ts`](src/i18n-nl.ts), and fill in the new key in the cards, milestones, comparisons and seabed names; `npm test` and `npm run build` point out anything missing.
- **Where are you?** At the start of a craving you can switch between *At home* and *Out and about* (remembered). Out of the house, only cards tagged `anywhere` or `outside` are drawn.
- **Sunken Treasure** (optional): a live counter of the money you're not spending, from a weekly amount and a start date. It never resets; a changed weekly amount only applies from then on. Currency (Kč, €, $) is separate from the language. Below it, a few random things the money would already buy, from an ice cream to a hot tub. They're in [`src/comparisons.ts`](src/comparisons.ts). With 3D, opening the treasure swims the camera down to a chest in the middle of the tank, whose lid opens above the page.
- **Milestones**, below the treasure: what to expect from quit day to one year, counted from the treasure's start date. Text in [`src/data/milestones.json`](src/data/milestones.json), sources in [`docs/milestones.md`](docs/milestones.md).
- **Daydream cards** walk you through picturing something you'd love, from a slow cup of tea to the front row at your favourite artist's show. They work anywhere.
- **Postcards:** the win screen can send a picture of the win through the share sheet. It never mentions vaping, and nothing leaves the phone unless you pick someone.
- **Dodge the hooks and Bubbles:** a 2½-minute game and two minutes of slow breathing with the tuna (in 4, out 6). A brutal hook (8 to 10) starts with one of them at random, and "Not yet" offers both. Timings are in `DODGE_SETTINGS` (`src/dodge.ts`) and `BREATHE_SETTINGS` (`src/breathe.ts`).
- **A 3D tank on the home screen.** Your school swims behind the button, one tuna per hook beaten (up to 200 drawn), with your milestone decorations on the sand and the tuna you pet in front, all in 3D. “Visit my school” under the button pulls back to the whole tank; drag to look around, or tap the treasure chest in the middle to open the treasure. three.js loads just after the app opens, so the button never waits: once 3D has worked on a phone, it opens with just the water and the button and the tank fades in; a phone without 3D keeps the drawn seabed. Tuning is in `SCHOOL3D_SETTINGS` (`src/school3d.ts`); the scene is in `src/tank/`.
- **Getting snagged:** the quiet “I got snagged” link asks what the bait was (quick taps and a note), lets you choose to start a fresh streak or keep it, and offers two minutes of breathing. Only the streak can reset; the quit date, milestones, treasure and school never do. The treasure shows current and best streak once there's been a snag.
- **Sounds and vibrations** are generated in code (no audio files) and can be turned off in Settings. On iPhone, vibrations need iOS 18+.

## Adding or editing cards

All cards are in [`src/data/cards.json`](src/data/cards.json). Each card has a title and task in every language.

1. Add the card. Give it a new, permanent `id` (never change or reuse an ID: players' collections are keyed on it).
2. Set `addedIn` to the next deck version, and bump `deckVersion` at the top of the file.
3. Tag where it can be done (`where`: `anywhere`, `outside`, `home`, `quiet`). At least half the deck must work out of the house (`anywhere` or `outside`), with at least two cards per rarity; `npm test` checks this. Also update the card count in `src/draw.test.ts`.
4. Push to `main`. GitHub Actions tests, builds and deploys. Installed copies pick up the new version, and the app shows "New catches washed ashore!".

Rarity chances, the guaranteed-rare counter and the weighting toward uncaught cards are in [`src/draw.ts`](src/draw.ts) (`DRAW_SETTINGS`).

## The petting Easter egg

Tap the tuna on the home screen and it closes its eyes. Tap it five times fast and it tells a joke: 1 in 10 come from the dark list. The jokes are `petJokes` and `petDarkJokes` in [`src/i18n.ts`](src/i18n.ts) (every language). Timing and odds are `PET_SETTINGS` in [`src/pet.ts`](src/pet.ts). Every tap is counted, and the Logbook shows the total just above the history (`PetCount` in [`src/components/Logbook.tsx`](src/components/Logbook.tsx)).

## Development

```sh
npm install
npm run dev      # local dev server
npm test         # draw algorithm and deck checks
npm run build    # production build into dist/
npm run icons    # re-render app icons from scripts/icon.svg
```

## Deploying

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

One-time setup: in the repo on GitHub, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. Not "Deploy from a branch": that publishes the unbuilt source files, and the app shows a blank page (or a "couldn't start" message).

The app is served at `https://merhex.github.io/off-the-hook/`.

### How updates reach phones

The app runs from a copy saved on the device, so it works offline. On every open (and every time it comes back into view) it checks for a new version in the background. If one arrives within 15 seconds of opening, it reloads into it right away; otherwise it switches the next time you leave the app. It never reloads during a craving.

To see which version is running, look at the bottom of **Settings**: `Version <commit> · <build time>`. The commit matches the one on GitHub.
