# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start development server (localhost:3000)
- `npm run build` — Production build
- `npm start` — Start production server

No test runner or linter is configured.

## Architecture

Next.js 10 portfolio site using TypeScript, Chakra UI v1, Framer Motion, and CSS Modules.

### Pages (`pages/`)

File-based routing. `_app.tsx` wraps the app with `AppContextProvider`, `ChakraProvider`, `AnimateSharedLayout`, and NProgress for route-change progress bars.

Key pages: `index.tsx` (home with intro animation sequence), `about.tsx` (markdown content via `getStaticProps`), `work.tsx` (portfolio showcase), `contact.tsx` (contact form), `404.tsx` (custom glitch-effect 404).

### State Management

Minimal React Context in `src/providers/AppContext.tsx`. Tracks a single `introViewed` boolean so the home intro animation only plays once per session. Access via `useAppContext()` hook.

### Layout

`src/components/layouts/Main.Layout.tsx` wraps all pages with a shared container, animated resume download button (appears after intro), and footer. Uses Framer Motion `layoutId` for shared layout animations across page transitions.

### Animation Pattern

Pages are animation-heavy. They check `introViewed` to determine animation timing, and listen to `router.events` (`beforeHistoryChange`) to trigger exit animations before navigation.

### API Routes (`pages/api/`)

`sendMessage.ts` — Contact form backend that validates reCAPTCHA, then sends email via Mailjet. Requires `MJ_APIKEY_PUBLIC`, `MJ_APIKEY_PRIVATE`, and reCAPTCHA secret env vars.

### Components (`src/components/`)

- `branding/` — Logo, spinner, intro text animations
- `navigation/` — HomeNavigation, Navlink components
- `ContactForm/` — Form with reCAPTCHA integration
- `LoadScreen/`, `LoadingText/` — Intro loading sequence
- `RainbowButton/` — Animated button component

### Hooks (`src/hooks/`)

- `useWindowSize` — Tracks window dimensions
- `useBreakpoint` — Media query matching with listener

### Styling

CSS Modules (`.module.css`) for component styles + Chakra UI for layout primitives + Framer Motion for animations. Global styles in `styles/globals.css`.
