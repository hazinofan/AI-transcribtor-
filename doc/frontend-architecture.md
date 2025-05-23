# Frontend Architecture Documentation

## Overview

The Qalamus frontend is a Next.js 15 application built with React 19 and TypeScript, designed to provide YouTube video transcription with multilingual support and dark mode functionality. The architecture follows modern React patterns with clean separation of concerns, custom hooks for state management, and a component-based design with comprehensive CSS organization and centralized theming.

## Technology Stack

- **Framework**: Next.js 15.3.1 with App Router
- **UI Library**: React 19.0.0
- **Language**: TypeScript
- **Styling**: CSS Modules with centralized variables
- **Internationalization**: next-i18next
- **State Management**: React Context API + Custom Hooks
- **UI Components**: Radix UI components
- **Animations**: Lottie React
- **Utilities**: Custom utility functions for URLs and time formatting

## Project Structure

```
frontend/
├── src/                          # Source code
│   ├── components/               # Reusable UI components
│   │   ├── common/              # Common layout components
│   │   │   ├── Layout.tsx       # Main layout wrapper
│   │   │   ├── DarkModeToggle.tsx # Theme switcher
│   │   │   ├── ErrorBoundary.tsx # Error handling component
│   │   │   └── index.ts         # Clean exports
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx       # Button component with variants
│   │   │   ├── LoadingSpinner.tsx # Loading indicator
│   │   │   └── index.ts         # Clean exports
│   │   └── transcription/       # Transcription feature components
│   │       ├── hooks/           # Custom hooks for transcription
│   │       │   ├── useTranscription.ts
│   │       │   ├── useVideoPlayer.ts
│   │       │   └── useKeyboardControls.ts
│   │       ├── TranscriptionPage.tsx
│   │       ├── VideoPlayer.tsx
│   │       ├── ProgressIndicator.tsx
│   │       ├── SegmentNavigation.tsx
│   │       ├── SegmentViewer.tsx
│   │       ├── VocabularyBox.tsx
│   │       └── VideoSummary.tsx
│   ├── contexts/                # React contexts
│   │   └── ThemeContext.tsx     # Dark/light theme management
│   ├── pages/                   # Next.js pages (App Router)
│   │   ├── transcription/       # Transcription routes
│   │   ├── _app.tsx            # App wrapper
│   │   ├── _document.tsx       # HTML document structure
│   │   └── index.tsx           # Home page
│   ├── services/                # Business logic layer
│   │   ├── api/                # API service classes
│   │   │   └── transcriptionService.ts
│   │   └── utils/              # Utility functions
│   │       ├── timeUtils.ts    # Time formatting utilities
│   │       └── urlUtils.ts     # URL handling utilities
│   ├── styles/                  # CSS modules and global styles
│   │   ├── components/         # Component-specific CSS modules
│   │   │   ├── TranscriptionPage.module.css
│   │   │   ├── VideoPlayer.module.css
│   │   │   ├── ProgressIndicator.module.css
│   │   │   ├── SegmentViewer.module.css
│   │   │   ├── SegmentNavigation.module.css
│   │   │   ├── VocabularyBox.module.css
│   │   │   ├── VideoSummary.module.css
│   │   │   └── DarkModeToggle.module.css
│   │   ├── variables.css        # Centralized CSS variables
│   │   ├── globals.css          # Global styles and resets
│   │   └── home.css            # Home page styles
│   └── types/                   # TypeScript type definitions
│       ├── api.ts              # Generic API types
│       ├── common.ts           # Shared utility types
│       └── transcription.ts    # Transcription-specific types
├── public/                      # Static assets
│   ├── assets/                 # Images and animations
│   ├── locales/                # i18n translation files
│   └── [static files]
├── doc/                        # Documentation
│   ├── frontend-architecture.md
│   └── medium-priority-fixes-summary.md
├── dev-tracking/               # Development logs
└── [config files]
```

## Core Architecture Principles

### 1. Component-Based Architecture
- **Single Responsibility**: Each component handles one specific concern
- **Composition over Inheritance**: Components are composed together to build complex UIs
- **Reusability**: Components are designed to be reusable across different contexts
- **Organized Structure**: Components organized by functionality (common, ui, feature-specific)

### 2. Custom Hooks Pattern
- **State Logic Separation**: Business logic is extracted into custom hooks
- **Reusability**: Hooks can be shared across multiple components
- **Testability**: Hooks can be tested independently from UI components

### 3. Service Layer Pattern
- **API Abstraction**: All API calls are centralized in service classes
- **Error Handling**: Consistent error handling across all API interactions
- **Type Safety**: Full TypeScript coverage for API responses

### 4. Modular CSS Architecture
- **Component Isolation**: Each component has its own CSS module
- **Centralized Variables**: All CSS variables managed in a single file
- **Theme Consistency**: Comprehensive light/dark mode support
- **Maintainable Naming**: Consistent camelCase naming conventions

### 5. Type Organization
- **Domain Separation**: Types organized by domain (api, common, transcription)
- **Generic Patterns**: Reusable generic types for consistent API structure
- **Documentation**: JSDoc comments for better developer experience

## Recent Architecture Improvements

### CSS Organization Enhancement
- **Modular Structure**: Split monolithic CSS into 7 component-specific files
- **Centralized Variables**: Created `variables.css` with 145+ CSS variables
- **Theme System**: Comprehensive light/dark mode variable sets
- **Naming Consistency**: Standardized camelCase CSS class naming

### Component Organization
- **Directory Structure**: Created `components/common/` and `components/ui/`
- **Reusable Components**: Added ErrorBoundary, Button, LoadingSpinner
- **Clean Imports**: Index files for better import organization
- **Error Handling**: Comprehensive ErrorBoundary with fallback UI

### Type System Enhancement
- **Generic API Types**: Created `ApiResponse<T>` for consistent API structure
- **Semantic Aliases**: Added semantic type aliases for better readability
- **Domain Organization**: Separated types by domain for better maintainability
- **Enhanced Documentation**: Added comprehensive JSDoc comments

### Utility Functions
- **URL Utilities**: Comprehensive YouTube URL handling and validation
- **Time Utilities**: Enhanced time formatting and conversion functions
- **Type Safety**: Full TypeScript coverage for all utilities

## File-by-File Documentation

### Configuration Files

#### `next.config.ts`
- **Purpose**: Next.js configuration
- **Key Features**: 
  - TypeScript configuration
  - Build optimization settings
  - Environment variable handling

#### `next-i18next.config.js`
- **Purpose**: Internationalization configuration
- **Key Features**:
  - Locale detection settings (`localeDetection: false`)
  - Default locale configuration
  - Namespace organization

#### `tsconfig.json`
- **Purpose**: TypeScript compiler configuration
- **Key Features**:
  - Strict type checking enabled
  - Path mapping for clean imports
  - Next.js specific settings

#### `tailwind.config.js`
- **Purpose**: Tailwind CSS configuration
- **Key Features**:
  - Custom color palette
  - Component class definitions
  - Responsive breakpoints

### Core Application Files

#### `src/pages/_app.tsx`
- **Purpose**: Application wrapper and global providers
- **Key Features**:
  - Theme provider integration
  - i18n wrapper (`appWithTranslation`)
  - Global CSS imports
  - Layout component integration
  - ErrorBoundary integration
- **Interactions**: 
  - Wraps all pages with `ThemeProvider`
  - Provides translation context to entire app
  - Catches and handles application-wide errors

#### `src/pages/_document.tsx`
- **Purpose**: Custom HTML document structure
- **Key Features**:
  - Google Fonts integration
  - Meta tags configuration
  - HTML structure customization

#### `src/pages/index.tsx`
- **Purpose**: Home page component
- **Key Features**:
  - Landing page UI
  - Navigation to transcription features
  - Internationalization support
- **Interactions**:
  - Uses `Layout` component for consistent structure
  - Integrates with i18n for multilingual content

### Layout and Navigation

#### `src/components/common/Layout.tsx`
- **Purpose**: Main layout wrapper for all pages
- **Key Features**:
  - Header with navigation
  - Language switcher integration
  - Dark mode toggle integration
  - Responsive design
  - Border separator styling
- **Interactions**:
  - Uses `DarkModeToggle` component
  - Integrates with Next.js router for navigation
  - Provides consistent layout across all pages

#### `src/components/common/DarkModeToggle.tsx`
- **Purpose**: Theme switcher component
- **Key Features**:
  - iOS-style toggle switch
  - Sun/moon icon animations
  - Accessibility support (ARIA labels)
  - Smooth transitions
- **Interactions**:
  - Consumes `ThemeContext` for theme state
  - Updates global theme via context methods

#### `src/components/common/ErrorBoundary.tsx`
- **Purpose**: Application-wide error handling
- **Key Features**:
  - React error boundary implementation
  - Fallback UI for error states
  - Error logging and reporting
  - Graceful error recovery
- **Interactions**:
  - Catches JavaScript errors in component tree
  - Provides user-friendly error messages
  - Integrates with application monitoring

### Reusable UI Components

#### `src/components/ui/Button.tsx`
- **Purpose**: Reusable button component with variants
- **Key Features**:
  - Multiple button variants (primary, secondary, outline)
  - Size variations (small, medium, large)
  - Loading and disabled states
  - TypeScript prop validation
- **Interactions**:
  - Used throughout the application for consistent button styling
  - Supports custom click handlers and accessibility features

#### `src/components/ui/LoadingSpinner.tsx`
- **Purpose**: Reusable loading indicator
- **Key Features**:
  - Customizable size and color
  - Smooth CSS animations
  - Accessibility support
- **Interactions**:
  - Used in various loading states throughout the application

### Context Management

#### `src/contexts/ThemeContext.tsx`
- **Purpose**: Global theme state management
- **Key Features**:
  - Light/dark theme switching
  - localStorage persistence
  - System preference detection
  - Theme state provider
- **Interactions**:
  - Provides theme state to entire application
  - Persists user preferences across sessions
  - Automatically detects system theme preferences

### Transcription Feature Architecture

#### `src/pages/transcription/[videoId].tsx`
- **Purpose**: Dynamic route for video transcription
- **Key Features**:
  - URL parameter extraction (`videoId`)
  - Language parameter handling
  - Static generation configuration
- **Interactions**:
  - Delegates to `TranscriptionPage` component
  - Handles Next.js routing and SSG

#### `src/components/transcription/TranscriptionPage.tsx`
- **Purpose**: Main orchestrator for transcription feature
- **Key Features**:
  - Component composition and layout
  - State management coordination
  - Error boundary handling
  - Loading state management
  - Absolute positioning for vocabulary box
- **Interactions**:
  - Uses `useTranscription` hook for data management
  - Uses `useVideoPlayer` hook for player controls
  - Uses `useKeyboardControls` hook for shortcuts
  - Composes all transcription sub-components

#### `src/components/transcription/VideoPlayer.tsx`
- **Purpose**: YouTube video player wrapper
- **Key Features**:
  - YouTube API integration
  - Player configuration
  - Responsive video container
  - Clean styling with rounded corners and shadows
- **Interactions**:
  - Receives `onReady` callback from `useVideoPlayer` hook
  - Provides player instance to parent components

#### `src/components/transcription/ProgressIndicator.tsx`
- **Purpose**: Loading and progress display during transcription
- **Key Features**:
  - Lottie animation integration
  - Progress bar with percentage
  - Estimated time display
  - Multiple loading states
  - Fixed runtime error with estimationData prop
- **Interactions**:
  - Receives loading state from `useTranscription` hook
  - Displays progress based on estimation data

#### `src/components/transcription/SegmentNavigation.tsx`
- **Purpose**: Navigation controls for transcript segments
- **Key Features**:
  - Radix UI slider integration
  - Previous/next navigation buttons with elegant styling
  - Segment counter and timestamp display
  - Split into `SegmentSlider` and `SegmentNavigationBar`
  - Clean slider design without background
  - Refined button styling with subtle hover effects
  - Separator line between navigation and content
- **Styling Improvements**:
  - Removed grey background from slider container
  - Added elegant button styling with blue theme
  - Enhanced hover effects with lift animation
  - Added fine separator line for visual hierarchy
- **Interactions**:
  - Receives navigation handlers from `useVideoPlayer` hook
  - Updates current segment via callback functions

#### `src/components/transcription/SegmentViewer.tsx`
- **Purpose**: Display current segment content
- **Key Features**:
  - Arabic text display (RTL) with large font size
  - Translation text display on top
  - Responsive flex column layout
  - Proper color scheme integration
- **Interactions**:
  - Receives current segment data from parent
  - Displays content based on segment structure

#### `src/components/transcription/VocabularyBox.tsx`
- **Purpose**: Key vocabulary display for current segment
- **Key Features**:
  - Arabic-translation word pairs
  - Scrollable list interface
  - Conditional rendering
  - Absolute positioning for side-by-side layout
  - Responsive design with fallback positioning
- **Interactions**:
  - Receives vocabulary data from `useTranscription` hook
  - Displays vocabulary for current segment
  - Positioned absolutely on the right side of main content

#### `src/components/transcription/VideoSummary.tsx`
- **Purpose**: Video summary display
- **Key Features**:
  - Summary text rendering
  - Loading and error states
  - Formatted text display
  - Consistent styling with other components
- **Interactions**:
  - Receives summary data from `useTranscription` hook
  - Handles various summary states

### Custom Hooks

#### `src/components/transcription/hooks/useTranscription.ts`
- **Purpose**: Transcription state and API management
- **Key Features**:
  - API orchestration for all transcription services
  - Progress tracking and estimation
  - Error handling and state management
  - Async data loading coordination
  - Updated property names (estimationData, keyVocabulary)
- **Interactions**:
  - Uses `TranscriptionService` for API calls
  - Manages complex state with multiple async operations
  - Provides state and actions to components

#### `src/components/transcription/hooks/useVideoPlayer.ts`
- **Purpose**: YouTube player control and synchronization
- **Key Features**:
  - Player state management
  - Segment navigation logic
  - Video-segment synchronization
  - Player event handling
- **Interactions**:
  - Manages YouTube player instance
  - Synchronizes video time with transcript segments
  - Provides navigation functions to components

#### `src/components/transcription/hooks/useKeyboardControls.ts`
- **Purpose**: Keyboard shortcut management
- **Key Features**:
  - Arrow key navigation (left/right for segments)
  - Spacebar play/pause control
  - Input field detection (prevents conflicts)
- **Interactions**:
  - Receives navigation functions from other hooks
  - Adds global keyboard event listeners

### Service Layer

#### `src/services/api/transcriptionService.ts`
- **Purpose**: Centralized API service for transcription operations
- **Key Features**:
  - Singleton pattern implementation
  - Type-safe API methods with updated type names
  - Consistent error handling
  - Response validation
- **Methods**:
  - `estimateTranscriptionTime()`: Get transcription time estimate
  - `transcriptAudio()`: Perform video transcription
  - `extractKeyVocab()`: Extract key vocabulary
  - `summarizeVideo()`: Generate video summary
- **Interactions**:
  - Used by `useTranscription` hook
  - Communicates with backend API endpoints
  - Returns typed responses based on updated type definitions

#### `src/services/utils/timeUtils.ts`
- **Purpose**: Time formatting and conversion utilities
- **Key Features**:
  - Seconds to MM:SS conversion
  - Time string to seconds conversion
  - Input validation and error handling
  - Enhanced error messages
- **Functions**:
  - `formatSecondsToMMSS()`: Format seconds as MM:SS string
  - `timeToSeconds()`: Convert time string to seconds
- **Interactions**:
  - Used throughout transcription components
  - Used by video player synchronization logic

#### `src/services/utils/urlUtils.ts`
- **Purpose**: URL handling and validation utilities
- **Key Features**:
  - YouTube URL validation and extraction
  - Video ID parsing from various YouTube URL formats
  - App-specific URL building functions
  - Input sanitization and validation
- **Functions**:
  - `extractVideoId()`: Extract video ID from YouTube URLs
  - `validateYouTubeUrl()`: Validate YouTube URL format
  - `buildTranscriptionUrl()`: Build app transcription URLs
  - `isValidVideoId()`: Validate video ID format
  - `normalizeYouTubeUrl()`: Normalize URL to standard format
  - `getYouTubeThumbnail()`: Get thumbnail URL for video
  - `parseYouTubeUrl()`: Parse URL components
  - `buildApiUrl()`: Build backend API URLs
- **Interactions**:
  - Used by URL processing components
  - Used for YouTube integration validation

### Type Definitions

#### `src/types/api.ts`
- **Purpose**: Generic API types and interfaces
- **Key Interfaces**:
  - `ApiResponse<T>`: Generic API response wrapper
  - `ApiError`: Standardized error structure
  - `PaginatedResponse<T>`: Paginated API responses
  - `RequestOptions`: HTTP request configuration
- **Interactions**:
  - Used by all API services for consistent response structure
  - Provides type safety for API communications

#### `src/types/common.ts`
- **Purpose**: Shared utility types and component props
- **Key Types**:
  - `VideoId`: Semantic alias for video identifier
  - `TimeString`: Time format string type
  - `VoidCallback`: Function with no parameters/return
  - `ValueCallback<T>`: Function accepting a value
  - `ComponentProps`: Common component prop patterns
- **Interactions**:
  - Used throughout application for consistent typing
  - Provides semantic meaning to primitive types

#### `src/types/transcription.ts`
- **Purpose**: Transcription-specific type definitions
- **Key Interfaces**:
  - `Segment`: Individual transcript segment structure
  - `KeyVocabulary`: Vocabulary item structure (updated name)
  - `EstimationResponse`: API response for time estimation (updated name)
  - `TranscriptResponse`: API response for transcription
  - `VocabularyResponse`: API response for vocabulary (updated name)
  - `SummaryResponse`: API response for summary
  - `TranscriptionState`: Hook state structure with updated properties
  - `VideoPlayerState`: Player state structure
  - `UseTranscriptionReturn`: Hook return type interface
  - `UseVideoPlayerReturn`: Video player hook return type
- **Documentation**: Enhanced with comprehensive JSDoc comments
- **Interactions**:
  - Used by all transcription-related components and hooks
  - Ensures type safety across the transcription feature

### Styling Architecture

#### `src/styles/variables.css`
- **Purpose**: Centralized CSS custom properties for theming
- **Key Features**:
  - 145+ CSS variables organized by component/purpose
  - Complete light and dark mode variable sets
  - Color system organization (Base, Card, Segment, etc.)
  - Button, progress, and UI component variables
- **Organization**:
  - Base Colors (backgrounds, text, borders)
  - Component-specific variables (cards, segments, vocabulary)
  - Interactive element variables (buttons, sliders, progress)
  - Message and state variables (error, success, warning)
- **Interactions**:
  - Provides theme variables to all components
  - Automatically switches themes based on body class

#### `src/styles/globals.css`
- **Purpose**: Global styles and CSS resets
- **Key Features**:
  - CSS reset and normalization
  - Global font and layout rules
  - Import of variables.css
  - Base HTML element styling
- **Interactions**:
  - Applied globally to entire application
  - Inherits theme variables from variables.css

#### Component-Specific CSS Modules

#### `src/styles/components/TranscriptionPage.module.css`
- **Purpose**: Main transcription page layout
- **Key Features**:
  - Container and layout structure
  - Responsive main content area with relative positioning
  - Message styling (error, empty, loading)
  - Keyboard hint styling

#### `src/styles/components/SegmentNavigation.module.css`
- **Purpose**: Segment navigation and slider styling
- **Key Features**:
  - Elegant navigation button styling with blue theme
  - Clean slider design without background
  - Hover effects with lift animation and color changes
  - Fine separator line between navigation and content
  - Responsive width constraints matching segment content
- **Recent Improvements**:
  - Removed grey background from slider container
  - Enhanced button styling with subtle shadows
  - Added smooth transitions and hover effects
  - User-customized hover color (#a3b3c5)

#### `src/styles/components/SegmentViewer.module.css`
- **Purpose**: Segment content display styling
- **Key Features**:
  - Flex column layout for translation and Arabic text
  - Large Arabic font size (3rem) with RTL support
  - Background colors and border styling
  - Responsive design adjustments

#### `src/styles/components/VocabularyBox.module.css`
- **Purpose**: Vocabulary sidebar styling
- **Key Features**:
  - Absolute positioning for side-by-side layout
  - Scrollable list with dashed separators
  - Large Arabic text (2rem) with RTL direction
  - Responsive fallback to static positioning
  - Border and background color integration

#### `src/styles/components/VideoPlayer.module.css`
- **Purpose**: Video player container styling
- **Key Features**:
  - Responsive video container with aspect ratio
  - Rounded corners and shadow effects
  - Proper iframe styling and constraints

#### `src/styles/components/ProgressIndicator.module.css`
- **Purpose**: Loading and progress display styling
- **Key Features**:
  - Lottie animation container styling
  - Progress bar with custom styling
  - Loading text and time display formatting
  - Percentage display and remaining time styling

#### `src/styles/components/VideoSummary.module.css`
- **Purpose**: Video summary section styling
- **Key Features**:
  - Summary container with card-like appearance
  - Title styling with bottom border
  - Content text formatting with proper spacing
  - Loading and error state styling

#### `src/styles/components/DarkModeToggle.module.css`
- **Purpose**: Theme toggle component styling
- **Key Features**:
  - iOS-style toggle switch design
  - Smooth animations and transitions
  - Icon positioning and styling
  - Hover and focus states

## Data Flow and Interactions

### 1. Application Initialization
```
_app.tsx → ThemeProvider → ErrorBoundary → Layout → Page Components
```

### 2. Transcription Feature Flow
```
[videoId].tsx → TranscriptionPage → useTranscription → TranscriptionService → Backend API
                                 ↓
                                 Components (VideoPlayer, ProgressIndicator, etc.)
```

### 3. Theme Management Flow
```
ThemeContext → DarkModeToggle → CSS Variables → Component Styles
```

### 4. Video Player Synchronization
```
YouTube Player → useVideoPlayer → Segment Navigation → Current Segment Update
```

### 5. Keyboard Controls Flow
```
Global Keyboard Events → useKeyboardControls → Navigation Functions → Player/Segment Updates
```

### 6. Component Styling Flow
```
variables.css → Component CSS Modules → Rendered Components
```

### 7. Error Handling Flow
```
Component Error → ErrorBoundary → Fallback UI → User Notification
```

## Performance Considerations

### 1. Code Splitting
- Dynamic imports for Lottie animations (SSR compatibility)
- Component-level code splitting with Next.js
- Lazy loading of heavy components

### 2. State Management
- Minimal re-renders through proper hook design
- Context optimization to prevent unnecessary updates
- Local state for component-specific data

### 3. API Optimization
- Singleton pattern for service instances
- Proper error handling and retry logic
- Async operations with proper loading states

### 4. Styling Performance
- CSS Modules for scoped styling and performance
- CSS variables for theme switching (no JavaScript re-renders)
- Modular CSS architecture for better caching
- Optimized CSS with minimal specificity

### 5. Component Architecture
- Reusable components to reduce bundle size
- Proper component memoization where needed
- Clean imports with index files

## Testing Strategy

### 1. Component Testing
- Individual component testing with React Testing Library
- Hook testing with React Hooks Testing Library
- Snapshot testing for UI consistency
- Error boundary testing

### 2. Integration Testing
- API service testing with mock responses
- Hook integration testing
- Component interaction testing
- Theme switching testing

### 3. E2E Testing
- Critical user flows (video transcription)
- Cross-browser compatibility
- Accessibility testing
- Error state handling

### 4. Utility Testing
- URL utility function testing
- Time formatting function testing
- Type validation testing

## Recent Improvements and Bug Fixes

### 1. CSS Architecture Overhaul
- **Modular Organization**: Split 460-line monolithic CSS into 7 focused component files
- **Centralized Variables**: 145+ CSS variables in dedicated variables.css
- **Naming Consistency**: Standardized camelCase naming conventions
- **Theme System**: Comprehensive light/dark mode support

### 2. Component Organization Enhancement
- **Directory Structure**: Organized components into common/, ui/, and feature directories
- **Reusable Components**: Added ErrorBoundary, Button, LoadingSpinner
- **Clean Imports**: Index files for better developer experience
- **Error Handling**: Comprehensive error boundary implementation

### 3. Type System Improvements
- **Domain Organization**: Separated types into api.ts, common.ts, transcription.ts
- **Generic Patterns**: Created reusable ApiResponse<T> pattern
- **Enhanced Documentation**: Added comprehensive JSDoc comments
- **Naming Consistency**: Updated property names for better semantics

### 4. Utility Function Addition
- **URL Utilities**: 8 comprehensive YouTube URL handling functions
- **Enhanced Time Utils**: Improved time formatting with better error handling
- **Type Safety**: Full TypeScript coverage for all utilities

### 5. UI/UX Enhancements
- **Layout Restoration**: Fixed layout to match original design with side-by-side vocabulary
- **Navigation Styling**: Elegant button styling with refined hover effects
- **Slider Improvements**: Removed grey background, added proper width constraints
- **Visual Hierarchy**: Added separator lines and improved spacing

### 6. Bug Fixes
- **Runtime Error Fix**: Resolved estimationData property mismatch in ProgressIndicator
- **Layout Issues**: Restored original transcription page layout with absolute positioning
- **Responsive Design**: Improved vocabulary box positioning and responsive behavior

## Future Scalability

### 1. Feature Addition
- New features can be added as separate component directories
- Service layer can be extended with new API services
- Hook pattern allows for easy state management extension
- Modular CSS architecture supports new component styling

### 2. Performance Optimization
- Component memoization can be added where needed
- State management can be upgraded to Zustand/Redux if complexity grows
- Bundle analysis and optimization with improved code splitting
- CSS optimization with better caching strategies

### 3. Maintenance
- Clear separation of concerns makes debugging easier
- TypeScript provides compile-time error detection
- Comprehensive documentation supports team development
- Modular architecture enables independent component updates

### 4. Design System Evolution
- Centralized variables support easy theme additions
- Component variants system supports design consistency
- Reusable UI components enable rapid development
- Documentation supports design system growth

## Conclusion

The Qalamus frontend architecture has evolved into a highly maintainable, scalable, and developer-friendly system. The recent architectural improvements including CSS organization, component restructuring, type system enhancement, and utility additions have significantly improved code quality and developer experience. The clear separation of concerns, comprehensive type safety, modular CSS architecture, and modern React patterns ensure that the codebase remains manageable and performant as it grows. The component-based architecture with custom hooks provides excellent reusability and testability, while the enhanced service layer and utility functions ensure clean API management and consistent functionality across the application. 