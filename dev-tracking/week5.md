# Week 5 Changelog

## Bug Fixes & Improvements

### Internationalization (i18n) & Localization (l10n)
- **Fixed `next-i18next` Configuration:**
    - Resolved `Invalid next.config.ts options detected: Invalid literal value, expected false at "i18n.localeDetection"`. Changed `i18n.localeDetection` to `false` in `next-i18next.config.js`.
- **Resolved `NO_I18NEXT_INSTANCE` Error:**
    - Initially downgraded React from v19 to v18 to address this error, as it was suspected to be a compatibility issue with `next-i18next` and the then-new React 19.
    - Later, reverted to React 19 after other fixes seemed to resolve the core i18n instance issue.
    - Ensured `serverSideTranslations` is correctly implemented in all relevant pages (`index.tsx`, `transcription/[videoId].tsx`).
    - Passed the `next-i18next` configuration explicitly to `appWithTranslation` in `_app.tsx` using a type assertion to satisfy strict type requirements for `UserConfig` (specifically `i18n.localeDetection` needing to be literal `false`).
- **Corrected Language Switcher Logic:**
    - Modified the language switcher in `Layout.tsx` to use `router.push({ pathname, query }, asPath, { locale: newLocale })` instead of `i18n.changeLanguage()`. This ensures that Next.js routing correctly handles locale changes, re-triggering `serverSideTranslations` and updating URL paths if applicable.
    - Added `cursor: pointer` style to language flag images for better UX.

### Build & Development Environment
- **Stylesheet Loading:**
    - Fixed warning: `Do not add stylesheets using next/head... Use Document instead.` Moved the Google Fonts stylesheet link (`Material+Symbols+Outlined`) from `_app.tsx` to `_document.tsx`.
- **Dependency Management & Type Errors:**
    - Addressed various TypeScript "Cannot find module..." errors for `next-i18next` and `react-youtube` by advising IDE/TypeScript server restarts and ensuring correct type imports.
    - Explicitly typed the `event` parameter in `onPlayerReady` function in `transcription/[videoId].tsx` using `YouTubePlayerEvent` from `react-youtube`.
    - Corrected a syntax error in `next-i18next.config.js` where `as const` (a TypeScript feature) was mistakenly added to a JavaScript file.

### Code Style
- Applied Allman style bracing to `Layout.tsx` and `_app.tsx` as per user instruction.

## Known Issues / Observations
- "Fast Refresh had to perform a full reload" messages may still appear in the console during development. These are often non-critical if the application functions correctly. 