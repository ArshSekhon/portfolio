# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm run dev` — Start development server (localhost:3000)
- `npm run build` — Production build
- `npm start` — Start production server

No test runner or linter is configured.

## Environment Variables

- `NEXT_PUBLIC_ABOUT_MARKDOWN_URL` — URL to raw markdown for the About page (fetched at build time via `getStaticProps`)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` — reCAPTCHA site key for contact form
- `RECAPTCHA_SECRET_KEY` — reCAPTCHA secret for server-side verification
- `MJ_APIKEY_PUBLIC` / `MJ_APIKEY_PRIVATE` — Mailjet API keys for contact form email

## Architecture

Next.js 16 (Pages Router) portfolio site using TypeScript, React 19, Chakra UI v3, Framer Motion 12, and CSS Modules.

### Pages (`pages/`)

File-based routing. `_app.tsx` wraps the app with `AppContextProvider`, `ChakraProvider` (with `defaultSystem`), `MainLayout`, and NProgress for route-change progress bars.

Key pages: `index.tsx` (home with intro animation sequence), `about.tsx` (markdown content via `getStaticProps`), `work.tsx` (portfolio showcase), `contact.tsx` (contact form with step-by-step wizard), `404.tsx` (custom glitch-effect 404).

### State Management

React Context in `src/providers/AppContext.tsx` with two pieces of state:
- `introViewed` (boolean) — gates the intro sequence, adjusts page entrance delays
- `navTransitionRect` (DOMRect | null) — stores clicked nav link's bounding rect for the morph transition system

### Animation System

**Intro sequence** (`index.tsx`): LoadScreen → IntroText → Home, gated by `introViewed`.

**Home page exit** (`Home.tsx`): When a nav link is clicked, coordinated `useAnimation` controls fade out the logo/banner and sibling links while the clicked link centers. After 500ms, the link's bounding rect is captured into `navTransitionRect` and `router.push()` fires.

**Cross-page morph** (`src/hooks/useMorphTransition.tsx`): Custom FLIP animation hook that replaces the removed `AnimateSharedLayout` from framer-motion v4. On destination page mount, it reads the stored source rect, positions the title at the source location using `position: fixed`, and animates it vertically to its natural position. The Work page uses a CSS transition on the `right` property instead (horizontal slide).

**Destination page titles**: Start with expanded character spacing (matching the Home link's clicked state), then collapse after the morph completes via `onComplete` callback.

**Exit pattern**: Destination pages listen to `beforeHistoryChange` to set `Open=false`, hiding the title during route transitions.

### Chakra UI v3 Notes

- `ChakraProvider` requires `value={defaultSystem}`
- Use `css` prop (not style props or `style`) for button styling — Chakra v3 recipe system overrides style props, and inline `style` has higher specificity than `_hover` classes. The `css` prop with `"&:hover"` keeps everything at the same specificity.
- `spacing` → `gap` on Stack/HStack
- `useToast` → `createToaster` + `Toaster` component
- Tooltip/Progress use compound component pattern (`Tooltip.Root`, `Progress.Root`, etc.)

### API Routes (`pages/api/`)

`sendMessage.ts` — Contact form backend using node-mailjet v6 (`new Mailjet({ apiKey, apiSecret })`). Validates reCAPTCHA, then sends email.

### Components (`src/components/`)

- `BackButton/` — Fixed bottom-left back navigation with brutalist hover reveal
- `branding/` — Logo, spinner, intro text animations
- `navigation/` — HomeNavigation, Navlink (character-level motion.span animations)
- `ContactForm/` — Step-by-step wizard with AnimatePresence transitions
- `LoadScreen/`, `LoadingText/` — Intro loading sequence

### Hooks (`src/hooks/`)

- `useMorphTransition` — FLIP morph animation for cross-page nav link transitions
- `useWindowSize` — Tracks window dimensions
- `useBreakpoint` — Media query matching with listener

### Styling

CSS Modules (`.module.css`) for component styles + Chakra UI v3 for layout primitives + Framer Motion 12 for animations. Global styles in `styles/globals.css`.
