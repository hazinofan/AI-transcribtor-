# Week 5 Changelog

## Bug Fixes & Improvements

### Language Selector Enhancement with Multi-Language Support (Major)
- **Dropdown Language Selector Implementation:**
    - Completely redesigned language selector from flag-based clicking system to modern dropdown interface
    - Created `LanguageSelector.tsx` component with professional dropdown menu featuring smooth animations and keyboard navigation
    - Built `HomeLanguageSelector.tsx` component for homepage that matches `styled-input` appearance while providing dropdown functionality
    - Implemented comprehensive CSS modules (`LanguageSelector.module.css`, `HomeLanguageSelector.module.css`) with dark mode support and responsive design
    - Added keyboard accessibility (arrow keys, Enter, Escape), click-outside-to-close behavior, and ARIA labels for screen readers
- **Multi-Language Expansion:**
    - Extended language support from 2 to 6 languages: French, English, Spanish, Italian, German, and Dutch
    - Updated `next-i18next.config.js` to include new locales: `['fr', 'en', 'es', 'it', 'de', 'nl']`
    - Created comprehensive translation files for all new languages with culturally appropriate translations:
        - **Spanish** (`es/common.json`): Complete UI translations with proper Spanish terminology
        - **Italian** (`it/common.json`): Full localization with Italian language conventions  
        - **German** (`de/common.json`): Professional German translations with formal addressing
        - **Dutch** (`nl/common.json`): Complete Dutch translations with proper terminology
    - Updated existing English and French translation files with new language labels
    - Enhanced `SupportedLanguage` type definition to include all new language codes
- **Flag Icon Integration:**
    - Created high-quality SVG flag files for all new languages with consistent 28×20px dimensions:
        - **🇪🇸 Spain** (`flag-es.svg`): Red-yellow-red horizontal stripes with official colors
        - **🇮🇹 Italy** (`flag-it.svg`): Green-white-red vertical stripes with proper proportions
        - **🇩🇪 Germany** (`flag-de.svg`): Black-red-yellow horizontal tricolor design
        - **🇳🇱 Netherlands** (`flag-nl.svg`): Red-white-blue horizontal stripes
    - Recreated French flag (`flag-fr.svg`) with proper tricolor design using official colors (`#0055A4`, `#FFFFFF`, `#EF4135`)
    - Integrated flag icons into both header and homepage language selectors with proper alt text and accessibility
- **CSS Architecture & Styling Enhancements:**
    - Added missing CSS variables to `variables.css`: `--input-bg-hover`, `--input-border-hover`, `--input-border-focus`, `--input-focus-shadow`
    - Implemented comprehensive dark mode support for all dropdown elements with proper contrast ratios
    - Created responsive design that adapts flag sizes (20×14px desktop, 18×12px mobile) and typography
    - Added high contrast mode support and reduced motion accessibility features
    - Ensured consistent styling with existing design system using CSS variables and theme integration
- **User Experience Improvements:**
    - **Visual Recognition**: Users can instantly identify languages by their national flags
    - **Modern Interface**: Dropdown replaces outdated flag-clicking system with industry-standard UX patterns
    - **Accessibility**: Full keyboard navigation, screen reader support, and focus management
    - **Mobile Optimization**: Responsive design that works seamlessly on all screen sizes
    - **Animation & Feedback**: Smooth fade-in animations, hover effects, and visual feedback for all interactions
- **Technical Architecture:**
    - Consistent component architecture with proper TypeScript interfaces and error handling
    - Reusable language data structure with flag paths and labels for maintainability
    - Clean separation of concerns between header and homepage language selector implementations
    - Integration with Next.js i18n routing system for proper locale handling and URL updates

### Dark Mode Button Harmonization & Design Improvements
- **Enhanced "Let's go!" Button Dark Mode Styling:**
    - Replaced bright peach-orange button color with harmonious muted green (#3fb68b) for better dark theme integration
    - Updated hover state to complementary deeper green (#339f7a) for elegant interaction feedback
    - Changed button text color to dark gray (#212121) for optimal contrast and readability
    - Improved visual consistency by increasing border radius from 4px to 8px for both button and shadow elements
    - Maintained light mode styling unchanged to preserve existing brand identity
- **Design Benefits:**
    - **Visual Harmony**: Muted green creates more sophisticated appearance against dark backgrounds
    - **Reduced Eye Strain**: Softer color palette eliminates overwhelming bright orange in dark environments  
    - **Professional Aesthetics**: Color choice signals calm action while maintaining energy and visibility
    - **Enhanced Consistency**: Unified 8px border radius across button elements for modern, cohesive appearance
    - **Accessibility**: Improved contrast ratios with optimized text color choices for both themes

### CSS Architecture Optimization & Code Quality Improvements (Major)
- **Frontend Structural Optimization:**
    - Conducted comprehensive code quality improvements during investigation of an intermittent header bar visual issue
    - While the original visual bug persists and requires further investigation, identified and resolved multiple structural inefficiencies
    - Fixed 5 architectural problems: duplicate DOM wrappers, nested flexbox conflicts, duplicate CSS declarations, redundant property declarations, and CSS reset duplication
    - Improved overall code maintainability and performance through DOM simplification and CSS deduplication
    - Eliminated unnecessary wrapper element reducing DOM nesting by 1 element per page
    - Centralized CSS reset management to prevent styling conflicts
    - **📄 [Detailed Technical Documentation](week5/bug-fix/header-fix.md)** - Complete analysis of optimizations, architectural benefits, and quality metrics
- **Optimization Impact:**
    - **Performance**: Reduced CSS bundle size, simplified layout calculations, eliminated redundant property evaluations
    - **Maintainability**: Single layout responsibility, cleaner DOM hierarchy, aligned with CSS architecture best practices
    - **Code Quality**: Removed 10+ lines of duplicate/redundant CSS, eliminated 4 conflicting property declarations
    - **Architecture**: Established single source of truth for layout management and CSS resets

### Homepage UI & Responsiveness Enhancements
- **Input Bar Layout Refinement (Responsive):**
    - Implemented a responsive input bar that switches from a horizontal layout on wider screens to a vertical, stacked layout on screens narrower than 680px (initially 550px, then adjusted).
    - HTML structure in `index.tsx` was updated to use `input_row_top` and `input_row_bottom` divs to facilitate this flexbox-based switch.
    - Added specific classes (`url-input`, `lang-select`) for more targeted styling.
    - CSS in `home.css` was updated with new flexbox rules for `.input_container`, `.input_row_top`, and `.input_row_bottom` to manage the layout change via a media query (`@media (max-width: 680px)`).
    - Restored base styles for `.styled-input` and `select.styled-input` that were inadvertently removed during an earlier edit, ensuring consistent input field appearance.
- **Conditional Hiding of Decorative Element:**
    - The `.writing-hand` decorative image is now hidden (`display: none;`) on screens narrower than 680px to prevent layout clutter when the input bar stacks vertically.
- **Improved Subtitle Readability on Small Screens:**
    - Adjusted font sizes for `.title` and `.sub-title` within the `@media (max-width: 600px)` query in `home.css` to prevent text overflow and improve readability on mobile devices.
    - Reduced `padding-top` for `.sub-title` and `gap` for `.hero_text` at the same breakpoint.
- **Subtitle Internationalization Refactoring:**
    - Consolidated `subtitle1`, `subtitle2`, and `subtitle3` translation keys into a single `subtitle` key in `public/locales/en/common.json`.
    - Updated `frontend/src/pages/index.tsx` to use the single `t('subtitle')` call, removing forced `<br />` tags.
    - This change improves translation context, allows for more natural text flow, and simplifies maintenance. (Note: Similar changes are pending for `fr` and `de` locale files).

### Qalamus Favicon Implementation
- **Favicon Selection & Analysis:**
    - Evaluated available favicon options: `favicon-qalamus.svg` (3.2KB) and `favicon-qalamus-32px.png` (1.2KB, 34x34px)
    - Selected SVG as primary favicon for superior scalability, modern browser support, and high-DPI display compatibility
    - Confirmed SVG format provides infinite scalability while maintaining reasonable file size
- **Multi-Format Favicon Configuration:**
    - Implemented comprehensive favicon setup in `_document.tsx` with modern best practices
    - Added primary SVG favicon link with proper MIME type (`image/svg+xml`) for modern browsers
    - Included PNG fallback favicon for older browser compatibility
    - Configured Apple Touch Icon using PNG format for iOS/macOS bookmark and home screen icons
    - Created traditional `favicon.ico` file in public root directory for maximum browser compatibility
- **Brand Identity Integration:**
    - Established consistent Qalamus branding across all browser contexts (tabs, bookmarks, PWA icons)
    - Favicon features professional design with green circular background (`#00632E`) and golden feather/pen motif (`#ECAE2E`)
    - Ensures crisp rendering at all sizes from 16px browser tabs to 512px+ PWA icons
- **Technical Implementation:**
    - Added organized favicon links in document head with proper comments for maintainability
    - Followed Next.js conventions by placing `favicon.ico` in public root directory
    - Implemented progressive enhancement with SVG-first approach and PNG fallbacks

### Tailwind CSS Removal & CSS Architecture Unification (Major)
- **Architectural Analysis & Cleanup:**
    - Conducted comprehensive audit of Tailwind CSS usage throughout the codebase
    - Identified minimal Tailwind usage limited to only 2 UI components (`Button.tsx` and `LoadingSpinner.tsx`) plus one antialiasing class
    - Confirmed that the project already had a robust CSS Modules + CSS Variables architecture handling 95% of styling
    - Recognized redundancy of maintaining two different styling paradigms for such limited Tailwind usage
- **CSS Modules Migration:**
    - Created `Button.module.css` with complete styling for all button variants (primary, secondary, outline, ghost), sizes (small, medium, large), and status states (success, warning, error)
    - Built `LoadingSpinner.module.css` with spinner animations, size variants, and proper dark mode text color handling
    - Replaced all Tailwind utility classes with equivalent CSS using existing custom CSS variables from `variables.css`
    - Maintained exact visual appearance and functionality while improving architectural consistency
- **Component Refactoring:**
    - Updated `Button.tsx` to use CSS Modules with `styles` object instead of concatenated Tailwind class strings
    - Converted `LoadingSpinner.tsx` from Tailwind flex utilities to CSS Modules with proper class composition
    - Removed antialiasing Tailwind class from `_document.tsx` and added equivalent CSS properties to `globals.css`
    - Ensured all components now follow the same CSS Modules + CSS Variables pattern used throughout the application
- **Dependency & Configuration Cleanup:**
    - Removed `tailwindcss`, `@tailwindcss/postcss`, and `@tailwindcss/aspect-ratio` packages (47 packages total)
    - Deleted `tailwind.config.js` configuration file as it's no longer needed
    - Confirmed that native CSS `aspect-ratio` property in `VideoPlayer.module.css` makes the Tailwind aspect-ratio plugin redundant
    - Reduced build complexity and bundle size by eliminating unused styling framework
- **Benefits Achieved:**
    - **Unified Architecture:** All styling now uses the consistent CSS Modules + CSS Variables system with comprehensive light/dark mode theming
    - **Enhanced Maintainability:** Single styling paradigm eliminates confusion and reduces cognitive load for developers
    - **Performance Improvement:** Reduced bundle size and simplified build process without Tailwind CSS compilation
    - **Better Theming Integration:** Components now leverage the existing sophisticated custom CSS variables system instead of Tailwind's default theme

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