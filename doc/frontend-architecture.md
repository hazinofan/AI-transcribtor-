# Frontend Architecture Documentation

## Overview

The Qalamus frontend is a Next.js 15 application built with React 19 and TypeScript, designed to provide YouTube video transcription with multilingual support and dark mode functionality. The architecture follows modern React patterns with clean separation of concerns, custom hooks for state management, and a component-based design.

## Technology Stack

- **Framework**: Next.js 15.3.1 with App Router
- **UI Library**: React 19.0.0
- **Language**: TypeScript
- **Styling**: CSS Modules + Tailwind CSS 4
- **Internationalization**: next-i18next
- **State Management**: React Context API + Custom Hooks
- **UI Components**: Radix UI components
- **Animations**: Lottie React

## Project Structure

  ```
  frontend/
  ├── src/                          # Source code
  │   ├── components/               # Reusable UI components
  │   │   ├── transcription/        # Transcription feature components
  │   │   │   ├── hooks/           # Custom hooks for transcription
  │   │   │   ├── TranscriptionPage.tsx
  │   │   │   ├── VideoPlayer.tsx
  │   │   │   ├── ProgressIndicator.tsx
  │   │   │   ├── SegmentNavigation.tsx
  │   │   │   ├── SegmentViewer.tsx
  │   │   │   ├── VocabularyBox.tsx
  │   │   │   └── VideoSummary.tsx
  │   │   ├── Layout.tsx            # Main layout wrapper
  │   │   └── DarkModeToggle.tsx    # Theme switcher component
  │   ├── contexts/                 # React contexts
  │   │   └── ThemeContext.tsx      # Dark/light theme management
  │   ├── pages/                    # Next.js pages (App Router)
  │   │   ├── transcription/        # Transcription routes
  │   │   ├── _app.tsx             # App wrapper
  │   │   ├── _document.tsx        # HTML document structure
  │   │   └── index.tsx            # Home page
  │   ├── services/                 # Business logic layer
  │   │   ├── api/                 # API service classes
  │   │   │   └── transcriptionService.ts
  │   │   └── utils/               # Utility functions
  │   │       └── timeUtils.ts
  │   ├── styles/                   # CSS modules and global styles
  │   │   ├── globals.css          # Global styles and CSS variables
  │   │   ├── transcription.module.css
  │   │   ├── DarkModeToggle.module.css
  │   │   └── home.css
  │   └── types/                    # TypeScript type definitions
  │       └── transcription.ts
  ├── public/                       # Static assets
  │   ├── assets/                  # Images and animations
  │   ├── locales/                 # i18n translation files
  │   └── [static files]
  ├── doc/                         # Documentation
  ├── dev-tracking/                # Development logs
  └── [config files]
  ```

## Core Architecture Principles

### 1. Component-Based Architecture
- **Single Responsibility**: Each component handles one specific concern
- **Composition over Inheritance**: Components are composed together to build complex UIs
- **Reusability**: Components are designed to be reusable across different contexts

### 2. Custom Hooks Pattern
- **State Logic Separation**: Business logic is extracted into custom hooks
- **Reusability**: Hooks can be shared across multiple components
- **Testability**: Hooks can be tested independently from UI components

### 3. Service Layer Pattern
- **API Abstraction**: All API calls are centralized in service classes
- **Error Handling**: Consistent error handling across all API interactions
- **Type Safety**: Full TypeScript coverage for API responses

### 4. Context-Based State Management
- **Global State**: Theme and other global state managed via React Context
- **Local State**: Component-specific state managed with useState/useReducer
- **Performance**: Minimal re-renders through proper context design

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
- **Interactions**: 
  - Wraps all pages with `ThemeProvider`
  - Provides translation context to entire app

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

#### `src/components/Layout.tsx`
- **Purpose**: Main layout wrapper for all pages
- **Key Features**:
  - Header with navigation
  - Language switcher integration
  - Dark mode toggle integration
  - Responsive design
- **Interactions**:
  - Uses `DarkModeToggle` component
  - Integrates with Next.js router for navigation
  - Provides consistent layout across all pages

#### `src/components/DarkModeToggle.tsx`
- **Purpose**: Theme switcher component
- **Key Features**:
  - iOS-style toggle switch
  - Sun/moon icon animations
  - Accessibility support (ARIA labels)
  - Smooth transitions
- **Interactions**:
  - Consumes `ThemeContext` for theme state
  - Updates global theme via context methods

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
- **Interactions**:
  - Receives loading state from `useTranscription` hook
  - Displays progress based on estimation data

#### `src/components/transcription/SegmentNavigation.tsx`
- **Purpose**: Navigation controls for transcript segments
- **Key Features**:
  - Radix UI slider integration
  - Previous/next navigation buttons
  - Segment counter and timestamp display
  - Split into `SegmentSlider` and `SegmentNavigationBar`
- **Interactions**:
  - Receives navigation handlers from `useVideoPlayer` hook
  - Updates current segment via callback functions

#### `src/components/transcription/SegmentViewer.tsx`
- **Purpose**: Display current segment content
- **Key Features**:
  - Arabic text display (RTL)
  - Translation text display
  - Responsive layout
- **Interactions**:
  - Receives current segment data from parent
  - Displays content based on segment structure

#### `src/components/transcription/VocabularyBox.tsx`
- **Purpose**: Key vocabulary display for current segment
- **Key Features**:
  - Arabic-translation word pairs
  - Scrollable list interface
  - Conditional rendering
- **Interactions**:
  - Receives vocabulary data from `useTranscription` hook
  - Displays vocabulary for current segment

#### `src/components/transcription/VideoSummary.tsx`
- **Purpose**: Video summary display
- **Key Features**:
  - Summary text rendering
  - Loading and error states
  - Formatted text display
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
  - Type-safe API methods
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
  - Returns typed responses based on `types/transcription.ts`

#### `src/services/utils/timeUtils.ts`
- **Purpose**: Time formatting and conversion utilities
- **Key Features**:
  - Seconds to MM:SS conversion
  - Time string to seconds conversion
  - Input validation and error handling
- **Functions**:
  - `formatSecondsToMMSS()`: Format seconds as MM:SS string
  - `timeToSeconds()`: Convert time string to seconds
- **Interactions**:
  - Used throughout transcription components
  - Used by video player synchronization logic

### Type Definitions

#### `src/types/transcription.ts`
- **Purpose**: TypeScript interfaces for transcription feature
- **Key Interfaces**:
  - `Segment`: Individual transcript segment structure
  - `KeyVocab`: Vocabulary item structure
  - `EstimateResponse`: API response for time estimation
  - `TranscriptResponse`: API response for transcription
  - `VocabResponse`: API response for vocabulary
  - `SummaryResponse`: API response for summary
  - `TranscriptionState`: Hook state structure
  - `VideoPlayerState`: Player state structure
- **Interactions**:
  - Used by all transcription-related components and hooks
  - Ensures type safety across the transcription feature

### Styling Architecture

#### `src/styles/globals.css`
- **Purpose**: Global styles and CSS custom properties
- **Key Features**:
  - CSS variables for theming (70+ variables)
  - Light and dark theme definitions
  - Global reset and base styles
  - Color system organization
- **Interactions**:
  - Provides theme variables to all components
  - Automatically switches themes based on context

#### `src/styles/transcription.module.css`
- **Purpose**: Styles specific to transcription components
- **Key Features**:
  - Component-specific styling
  - Responsive design rules
  - CSS variable integration
  - Radix UI component styling
- **Interactions**:
  - Used by all transcription components
  - Inherits theme variables from globals.css

#### `src/styles/DarkModeToggle.module.css`
- **Purpose**: Styles for the dark mode toggle component
- **Key Features**:
  - iOS-style toggle switch design
  - Smooth animations and transitions
  - Hover and focus states
- **Interactions**:
  - Used exclusively by `DarkModeToggle` component

#### `src/styles/home.css`
- **Purpose**: Styles for the home page
- **Key Features**:
  - Landing page specific styling
  - Hero section design
  - Navigation elements
- **Interactions**:
  - Used by the home page component

## Data Flow and Interactions

### 1. Application Initialization
  ```
  _app.tsx → ThemeProvider → Layout → Page Components
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
- CSS Modules for scoped styling
- CSS variables for theme switching (no JavaScript re-renders)
- Optimized CSS with minimal specificity

## Testing Strategy

### 1. Component Testing
- Individual component testing with React Testing Library
- Hook testing with React Hooks Testing Library
- Snapshot testing for UI consistency

### 2. Integration Testing
- API service testing with mock responses
- Hook integration testing
- Component interaction testing

### 3. E2E Testing
- Critical user flows (video transcription)
- Cross-browser compatibility
- Accessibility testing

## Future Scalability

### 1. Feature Addition
- New features can be added as separate component directories
- Service layer can be extended with new API services
- Hook pattern allows for easy state management extension

### 2. Performance Optimization
- Component memoization can be added where needed
- State management can be upgraded to Zustand/Redux if complexity grows
- Bundle analysis and optimization

### 3. Maintenance
- Clear separation of concerns makes debugging easier
- TypeScript provides compile-time error detection
- Comprehensive documentation supports team development

## Conclusion

The Qalamus frontend architecture is designed for maintainability, scalability, and developer experience. The clear separation of concerns, comprehensive type safety, and modern React patterns ensure that the codebase remains manageable as it grows. The component-based architecture with custom hooks provides excellent reusability and testability, while the service layer ensures clean API management. 