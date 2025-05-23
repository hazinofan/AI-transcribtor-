# Week 5 Changelog

## Bug Fixes & Improvements

### Frontend Architecture Refactoring (Major)
- **Monolithic Component Breakdown:**
    - Completely refactored the 609-line monolithic `transcription/[videoId].tsx` component into 8 focused, single-responsibility components
    - Created dedicated components: `VideoPlayer.tsx`, `ProgressIndicator.tsx`, `SegmentNavigation.tsx`, `SegmentViewer.tsx`, `VocabularyBox.tsx`, `VideoSummary.tsx`, and `TranscriptionPage.tsx`
    - Each component now handles a specific aspect of the transcription feature for improved maintainability and testability
- **API Service Layer Implementation:**
    - Created comprehensive `TranscriptionService` class in `services/api/transcriptionService.ts` to centralize all API calls
    - Extracted and organized all API methods: `estimateTranscriptionTime()`, `transcriptAudio()`, `extractKeyVocab()`, and `summarizeVideo()`
    - Implemented proper error handling, response typing, and singleton pattern for the service
    - Eliminated API logic mixing with UI components for clean separation of concerns
- **Custom Hooks Architecture:**
    - Created `useTranscription.ts` hook to manage transcription state, API calls, and data flow logic
    - Built `useVideoPlayer.ts` hook to handle YouTube player controls, segment navigation, and video synchronization
    - Developed `useKeyboardControls.ts` hook to manage keyboard shortcuts (arrow keys, spacebar) separately from UI logic
    - Each hook encapsulates specific functionality for better code organization and reusability
- **Type Safety Enhancement:**
    - Created comprehensive TypeScript interfaces in `types/transcription.ts` for all data structures
    - Added interfaces: `Segment`, `KeyVocab`, `EstimateResponse`, `TranscriptResponse`, `VocabResponse`, `SummaryResponse`, `TranscriptionState`, and `VideoPlayerState`
    - Eliminated inline type definitions and improved compile-time error checking
    - Enhanced IDE support with full autocomplete and type validation
- **Utility Functions Organization:**
    - Extracted time formatting functions to `services/utils/timeUtils.ts`
    - Created reusable `formatSecondsToMMSS()` and `timeToSeconds()` functions
    - Removed duplicate inline utility code for better maintainability
- **Component Layout & Styling Fixes:**
    - Fixed segment navigation bar width alignment to match transcript section (1000px)
    - Eliminated unwanted spacing between navigation bar and transcript content by removing `.mainContentArea` padding
    - Integrated navigation bar inside segment container for seamless visual connection
    - Ensured proper rounded corners with navigation bar getting top corners and content getting bottom corners
    - Split `SegmentNavigation` into `SegmentSlider` and `SegmentNavigationBar` for better layout control

### Dark Mode Implementation
- **Comprehensive Dark Mode System:**
    - Implemented a complete dark mode feature with modern toggle switch in the header
    - Created `ThemeContext.tsx` for React context-based theme management with localStorage persistence and system preference detection
    - Built `DarkModeToggle.tsx` component with smooth animations, sun/moon icons, and accessibility support
    - Added `DarkModeToggle.module.css` with modern iOS-style toggle switch design and hover effects
- **Centralized Color Management:**
    - Completely restructured color system in `globals.css` with 70+ CSS variables for comprehensive theme support
    - Created color categories: brand colors, layout colors, segment colors, vocabulary colors, slider colors, progress bar colors, button colors, and message colors
    - Implemented automatic color switching for both light and dark modes with smooth 0.3s transitions
    - Created `DARK_MODE_COLORS.md` documentation file for easy color reference and management
- **Component Dark Mode Integration:**
    - Updated `transcription.module.css` to use centralized color variables instead of hardcoded colors
    - Enhanced slider component with proper dark mode colors (dark track, bright thumb, yellow accents)
    - Updated segment display boxes with appropriate dark backgrounds and contrast
    - Modified vocabulary boxes to use dark theme with proper text contrast
    - Updated progress bars with green theme in dark mode for better visibility
    - Applied dark mode styling to all buttons, navigation elements, and text components
- **Header Layout Improvements:**
    - Fixed header layout structure with proper full-width container and centered content
    - Added `header-controls` section to group language switcher and dark mode toggle
    - Enhanced language switcher with standardized flag sizes (28x20px), hover effects, and improved active states
    - Implemented responsive design for mobile devices with proper spacing and sizing
- **Theme Integration:**
    - Wrapped application with `ThemeProvider` in `_app.tsx` for global theme state management
    - Updated `Layout.tsx` to include dark mode toggle in header alongside language switcher
    - Applied CSS variables throughout `home.css` for consistent theming across all pages
    - Ensured all color references use centralized variables for maintainability

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

### Transcription Page Improvements (`transcription/[videoId].tsx`)
- **Improved Loading State Handling:**
    - Updated the loading UI to conditionally display the transcription progress bar and estimated time only when the backend successfully returns a positive estimated time.
    - If the estimated time is 0 (due to backend error or missing data), the UI now displays a simpler "Transcription en cours, veuillez patienter…" message without progress details.
    - Ensured the progress timer is only active when the estimated time is greater than 0.
    - Corrected the translation key for "Calcul du temps de transcription…" to use the existing `calcul_estimation` key.
- **Integrated Lottie Animation:**
    - Added a Lottie animation to the transcription loading state using the `lottie-react` library.
    - Ensured the animation is displayed prominently during the loading process and hidden once the transcription is complete.
    - Handled client-side rendering of the Lottie animation in Next.js using dynamic imports to prevent "document is not defined" errors during server-side rendering.
- **Formatted Time Display:** Updated the transcription loading state to display the estimated and remaining times in "MM:SS" format. This involved modifying the backend to return a pre-formatted string and updating the frontend to use this new value. The corresponding i18n translation keys (`estimated_time`, `remaining_time`) in `public/locales/fr/common.json` were also updated from using `{{seconds}}` to `{{time}}`.
- **Enhanced Segment Navigation with Radix UI Slider:**
    - Replaced the native HTML range input with a more robust and stylable slider from `@radix-ui/react-slider` for segment navigation.
    - Installed `@radix-ui/react-slider` package.
    - Updated `transcription/[videoId].tsx` to integrate the Radix Slider, including logic for value changes and synchronization with `currentSegment`.
    - Revised `transcription.module.css` to remove old slider styles and add new, improved styles for the Radix Slider components.
    - Adjusted slider styling to ensure its width aligns with the segment display area and the slider thumb is visually centered and matches the design aesthetic.
- **Added Video Summary Display:**
    - Implemented a new section below the transcription and vocabulary to display a video summary.
    - Added state variables (`summaryText`, `summaryLoading`, `summaryError`) to `transcription/[videoId].tsx` to manage summary data and UI states.
    - Updated `useEffect` to call the `summarizeVideoCall` API after transcription and key vocabulary are loaded.
    - Included UI elements to handle loading, error, and empty states for the summary.
    - Styled the summary section in `transcription.module.css` for visual consistency, ensuring newlines in the summary text are preserved (`white-space: pre-line`).
    - Modified the `generateSummarizationPrompt` in `backend/functions/src/utils/prompt.ts` to explicitly request plain text output and discourage Markdown/HTML, aligning with frontend rendering capabilities.

## Known Issues / Observations
- "Fast Refresh had to perform a full reload" messages may still appear in the console during development. These are often non-critical if the application functions correctly. 