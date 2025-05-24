# Unit Testing Implementation Plan - Qalamus Frontend

## Project Overview
This document provides a comprehensive, step-by-step strategy for implementing unit testing in the Qalamus transcription app frontend. The plan is based on the actual Next.js 15 + React 19 + TypeScript architecture with CSS Modules, custom hooks, and comprehensive component organization.

## Current Architecture Analysis

### Technology Stack (Actual)
  - **Framework**: Next.js 15.3.1 with App Router  
  - **UI Library**: React 19.0.0
  - **Language**: TypeScript
  - **Styling**: CSS Modules with centralized variables (145+ CSS variables)
  - **Internationalization**: next-i18next
  - **State Management**: React Context API + Custom Hooks
  - **UI Components**: Radix UI components (@radix-ui/react-slider)
  - **Animations**: Lottie React
  - **Video**: react-youtube

### Existing Components to Test
  - **Common Components**: `Layout.tsx`, `DarkModeToggle.tsx`, `ErrorBoundary.tsx`
  - **UI Components**: `Button.tsx`, `LoadingSpinner.tsx`
  - **Transcription Components**: `TranscriptionPage.tsx`, `VideoPlayer.tsx`, `ProgressIndicator.tsx`, `SegmentNavigation.tsx`, `SegmentViewer.tsx`, `VocabularyBox.tsx`, `VideoSummary.tsx`

### Existing Hooks to Test
  - `useTranscription.ts` - Main transcription state management
  - `useVideoPlayer.ts` - YouTube player controls and synchronization
  - `useKeyboardControls.ts` - Keyboard shortcuts (arrow keys, spacebar)

### Existing Services to Test
  - `transcriptionService.ts` - API methods (estimateTranscriptionTime, transcriptAudio, extractKeyVocab, summarizeVideo)
  - `timeUtils.ts` - Time formatting (formatSecondsToMMSS, timeToSeconds)
  - `urlUtils.ts` - YouTube URL handling (7 utility functions)

### Existing Contexts to Test
  - `ThemeContext.tsx` - Dark/light theme management with localStorage persistence

## Testing Stack & Architecture

### Recommended Testing Framework
  - **Jest**: Primary testing framework
  - **React Testing Library**: Component testing
  - **React Hooks Testing Library**: Custom hook testing
  - **MSW (Mock Service Worker)**: API mocking
  - **Playwright**: E2E testing
  - **@testing-library/user-event**: User interaction simulation
  - **next-router-mock**: Next.js router mocking
  - **jest-axe**: Accessibility testing

### Test File Structure
```
frontend/
├── __tests__/                    # Global test setup and utilities
│   ├── setup.ts                 # Test environment setup
│   ├── mocks/                   # Global mocks
│   │   ├── next-i18next.ts     # i18n mocks
│   │   ├── lottie-react.ts     # Lottie animation mocks
│   │   └── react-youtube.ts    # YouTube player mocks
│   └── utils/                  # Test utilities
│       ├── renderWithProviders.tsx
│       ├── mockData.ts
│       └── testHelpers.ts
├── src/
│   ├── components/
│   │   ├── common/__tests__/    # Layout, DarkModeToggle, ErrorBoundary tests
│   │   ├── ui/__tests__/        # Button, LoadingSpinner tests
│   │   └── transcription/__tests__/ # All transcription component tests
│   │       └── hooks/__tests__/ # Hook tests
│   ├── contexts/__tests__/      # ThemeContext tests
│   ├── services/__tests__/      # Service layer tests
│   │   ├── api/__tests__/       # transcriptionService tests
│   │   └── utils/__tests__/     # timeUtils, urlUtils tests
│   ├── types/__tests__/         # Type validation tests
│   └── pages/__tests__/         # Page component tests
└── e2e/                        # End-to-end tests
    ├── specs/
    └── fixtures/
```

## Phase 1: Project Setup & Configuration

### Step 1.1: Install Testing Dependencies
**Action**: Add testing packages based on actual tech stack

```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@testing-library/react-hooks": "^8.0.1",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "@types/jest": "^29.5.0",
    "msw": "^2.0.0",
    "@playwright/test": "^1.40.0",
    "identity-obj-proxy": "^3.0.0",
    "next-router-mock": "^0.9.0",
    "jest-axe": "^8.0.0"
  }
}
```

### Step 1.2: Jest Configuration for Next.js 15 + CSS Modules
**Action**: Create `jest.config.js` with CSS Module support

```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/e2e/'],
  moduleNameMapper: { // Corrected property name
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/pages/_app.tsx',
    '!src/pages/_document.tsx',
    '!src/types/**',
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    'src/services/utils/': {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Step 1.3: Test Setup with Comprehensive Mocks
**Action**: Create `__tests__/setup.ts`

```typescript
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock window.matchMedia for ThemeContext
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false, // Default to light theme
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock next-i18next
jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Return the key as translation
    i18n: { language: 'en' },
  }),
  appWithTranslation: (Component: any) => Component, // Identity function
}))

// Mock react-youtube
jest.mock('react-youtube', () => {
  return function YouTube(props: any) {
    return <div data-testid="youtube-player" {...props} />
  }
})

// Mock lottie-react
jest.mock('lottie-react', () => {
  return function Lottie(props: any) {
    return <div data-testid="lottie-animation" {...props} />
  }
})

// Mock Next.js router
jest.mock('next/router', () => require('next-router-mock'))
```

### Step 1.4: Package.json Scripts
**Action**: Add comprehensive test scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:components": "jest src/components",
    "test:hooks": "jest src/components/transcription/hooks",
    "test:services": "jest src/services",
    "test:utils": "jest src/services/utils",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## Phase 2: Service Layer Testing (Highest Priority)

### Step 2.1: Utility Services Testing
**Target Files**:
  - `src/services/utils/timeUtils.ts`
  - `src/services/utils/urlUtils.ts`

**timeUtils.ts Test Categories**:
  - `formatSecondsToMMSS()`: Valid inputs, edge cases (0, negative, decimals)
  - `timeToSeconds()`: Various time formats, invalid inputs, error handling

**urlUtils.ts Test Categories** (Actual 7 functions):
  - `extractYouTubeVideoId()`: All YouTube URL formats, invalid URLs, edge cases
  - `isValidYouTubeVideoId()`: Valid/invalid video ID format validation
  - `buildYouTubeWatchUrl()`: URL construction with validation
  - `buildYouTubeThumbnailUrl()`: Thumbnail URL generation with quality options
  - `isValidUrl()`: Generic URL validation for HTTP/HTTPS
  - `buildTranscriptionUrl()`: App transcription URL construction with language parameter
  - `parseQueryParams()`: URL query parameter parsing with fallback handling

### Step 2.2: API Service Testing
**Target**: `src/services/api/transcriptionService.ts`

**API Methods to Test**:
  - `estimateTranscriptionTime()`: Request/response handling
  - `transcriptAudio()`: Transcription process
  - `extractKeyVocab()`: Vocabulary extraction
  - `summarizeVideo()`: Summary generation

**Testing Strategy**:
  - MSW for mocking HTTP requests
  - Test singleton pattern behavior
  - Error handling for 4xx/5xx responses
  - Type safety validation
  - Response data transformation

## Phase 3: Custom Hooks Testing (High Priority)

### Step 3.1: useTranscription Hook Testing
**Target**: `src/components/transcription/hooks/useTranscription.ts`

**Test Categories**:
  - Initial state management
  - API orchestration workflow
  - Progress tracking and estimation data
  - Error state handling
  - Loading states coordination
  - State updates with estimationData and keyVocabulary

### Step 3.2: useVideoPlayer Hook Testing
**Target**: `src/components/transcription/hooks/useVideoPlayer.ts`

**Test Categories**:
  - YouTube player instance management
  - Segment navigation logic
  - Video-segment synchronization
  - Player event handling
  - State management for player controls

### Step 3.3: useKeyboardControls Hook Testing
**Target**: `src/components/transcription/hooks/useKeyboardControls.ts`

**Test Categories**:
  - Arrow key navigation (left/right for segments)
  - Spacebar play/pause control
  - Input field detection and conflict prevention
  - Event listener management
  - Cleanup on unmount

## Phase 4: Context Testing

### Step 4.1: ThemeContext Testing
**Target**: `src/contexts/ThemeContext.tsx`

**Test Categories**:
  - Theme switching (light/dark)
  - localStorage persistence
  - System preference detection via `window.matchMedia`
  - Provider functionality
  - CSS variable application

## Phase 5: Component Testing

### Step 5.1: Common Components Testing
**Targets**:
  - `src/components/common/Layout.tsx`
  - `src/components/common/DarkModeToggle.tsx`
  - `src/components/common/ErrorBoundary.tsx`

**Layout.tsx Tests**:
  - Header rendering with navigation
  - Language switcher integration
  - Dark mode toggle integration
  - Responsive layout behavior
  - Accessibility with jest-axe

**DarkModeToggle.tsx Tests**:
  - iOS-style toggle functionality
  - Theme switching integration
  - Accessibility (ARIA labels)
  - Animation states
  - Keyboard navigation

**ErrorBoundary.tsx Tests**:
  - Error catching and fallback UI
  - Error logging
  - Recovery mechanisms

### Step 5.2: UI Components Testing
**Targets**:
  - `src/components/ui/Button.tsx`
  - `src/components/ui/LoadingSpinner.tsx`

**Button.tsx Tests**:
  - Multiple variants (primary, secondary, outline)
  - Size variations (small, medium, large)
  - Loading and disabled states
  - Click handlers and accessibility
  - CSS class application with identity-obj-proxy

### Step 5.3: Transcription Components Testing
**Targets**:
  - `TranscriptionPage.tsx` - Main orchestrator
  - `VideoPlayer.tsx` - YouTube integration
  - `ProgressIndicator.tsx` - Lottie animations and progress
  - `SegmentNavigation.tsx` - Radix UI slider integration
  - `SegmentViewer.tsx` - Arabic RTL text display
  - `VocabularyBox.tsx` - Absolute positioning and scrolling
  - `VideoSummary.tsx` - Summary display

**Component-Specific Test Focus**:
  - **TranscriptionPage**: Hook integration, component composition, layout
  - **VideoPlayer**: react-youtube integration, responsive container
  - **ProgressIndicator**: Lottie animations, progress calculations
  - **SegmentNavigation**: Radix slider, navigation controls, elegant styling
  - **SegmentViewer**: RTL Arabic text, translation display, flex layout
  - **VocabularyBox**: Absolute positioning, scrollable vocabulary list
  - **VideoSummary**: Summary content rendering, loading states

### Step 5.4: Page Components Testing
**Targets**:
  - `src/pages/index.tsx` - Home page
  - `src/pages/transcription/[videoId].tsx` - Dynamic route

**Test Categories**:
  - Route parameter handling with next-router-mock
  - SSG behavior testing
  - i18n integration
  - Component composition

## Phase 6: Integration Testing

### Step 6.1: Hook-Service Integration
**Test Scenarios**:
  - `useTranscription` + `transcriptionService` integration
  - `useVideoPlayer` + `timeUtils` integration
  - Error propagation through hook-service layers

### Step 6.2: Component-Hook Integration
**Test Scenarios**:
  - `TranscriptionPage` with all three hooks
  - `SegmentNavigation` with `useVideoPlayer`
  - `VocabularyBox` with `useTranscription`
  - State synchronization between components

### Step 6.3: Theme Integration Testing
**Test Scenarios**:
  - ThemeContext with DarkModeToggle
  - CSS variable application across components
  - Theme persistence across page navigation

## Phase 7: End-to-End Testing

### Step 7.1: Playwright Configuration
**Action**: Create `playwright.config.ts` for E2E testing

**Browser Coverage**:
  - Chromium, Firefox, Safari
  - Mobile viewports
  - Dark/light theme testing

### Step 7.2: Critical User Journeys (Initial Focus)
**Priority E2E Tests for Week 7-8**:

  1. **Primary Transcription Workflow (Happy Path)**:
     - Enter valid YouTube URL → Navigate to transcription page
     - Wait for transcription progress → View completed results
     - Navigate segments with mouse/keyboard
     - Verify Arabic text display and vocabulary

  2. **Theme Switching**:
     - Toggle between light/dark themes
     - Verify persistence across page refresh

**Future E2E Tests** (Post Week 8):
  - Complex error scenarios
  - Multilingual support testing
  - Advanced keyboard controls
  - Network failure recovery

## Phase 8: Testing Utilities & Helpers

### Step 8.1: Custom Render Function with jest-axe
**Action**: Create `__tests__/utils/renderWithProviders.tsx`

```typescript
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { configureAxe } from 'jest-axe'

// Configure jest-axe
const axe = configureAxe({
  rules: {
    // Disable color contrast rule for CSS variable testing
    'color-contrast': { enabled: false },
  },
})

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  initialTheme?: 'light' | 'dark'
}

function AllTheProviders({ children, initialTheme = 'light' }: any) {
  return (
    <ThemeProvider initialTheme={initialTheme}>
      {children}
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: CustomRenderOptions
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render, axe }
```

### Step 8.2: Mock Data Generation
**Action**: Create `__tests__/utils/mockData.ts`

**Mock Data Categories**:
  - Transcription segments with Arabic/English text
  - API responses for all transcriptionService methods
  - YouTube video metadata
  - Vocabulary items
  - Estimation data structures

### Step 8.3: Test Utilities
**Action**: Create `__tests__/utils/testHelpers.ts`

**Helper Functions**:
  - Custom matchers for RTL text
  - Theme testing utilities
  - CSS Module class name helpers (compatible with identity-obj-proxy)
  - Async operation waiters
  - Keyboard event simulators
  - YouTube URL test data generators

## Implementation Priority & Timeline

### Week 1-2: Foundation (Critical)
1. ✅ **Step 1**: Complete project setup and configuration
2. ✅ **Step 2.1**: Utility services testing (timeUtils, urlUtils with correct function names)
3. ✅ **Step 8.1-8.3**: Testing utilities and helpers setup
4. ✅ **Step 2.2**: API service testing (transcriptionService)

### Week 3-4: Core Logic (High Priority)
5. ✅ **Step 3.1**: useTranscription hook testing
6. ✅ **Step 3.2**: useVideoPlayer hook testing  
7. ✅ **Step 3.3**: useKeyboardControls hook testing
8. ✅ **Step 4.1**: ThemeContext testing (with window.matchMedia mocking)

### Week 5-6: Component Layer (Medium Priority)
9. ✅ **Step 5.1**: Common components (Layout, DarkModeToggle, ErrorBoundary)
10. ✅ **Step 5.2**: UI components (Button, LoadingSpinner)
11. ✅ **Step 5.3**: Transcription components (all 7 components)
12. ✅ **Step 6.1**: Hook-service integration testing

### Week 7-8: Advanced Testing (Lower Priority)
13. ✅ **Step 5.4**: Page component testing
14. ✅ **Step 6.2-6.3**: Component integration and theme testing
15. ✅ **Step 7**: E2E testing setup and primary happy path

## Success Metrics

### Coverage Targets
  - **Utility Functions** (timeUtils, urlUtils): 95% coverage (pure functions)
  - **Services**: 90% coverage (API layer with defined inputs/outputs)
  - **Hooks**: 85% coverage (complex state management)
  - **Components**: 80% coverage (UI interactions and rendering)
  - **Integration**: 70% coverage (cross-component workflows)

### Quality Gates
  - All tests pass in CI/CD pipeline
  - No test flakiness (<1% failure rate)
  - Fast unit test execution (<45s for all unit tests)
  - E2E tests complete in <10 minutes
  - Zero accessibility violations in component tests

## Special Considerations for Architecture

### CSS Modules Testing with identity-obj-proxy
  - Test CSS class name application (returns class names as strings)
  - Verify CSS variable integration in components
  - Test responsive behavior where applicable
  - Dark/light theme CSS switching via body class

### Next.js 15 Specific Testing
  - App Router behavior with next-router-mock
  - SSG/SSR testing where applicable
  - Dynamic route parameter handling
  - i18n integration testing with mocked next-i18next

### React 19 Compatibility
  - Current codebase doesn't use new React 19 features (useOptimistic, Actions)
  - Existing hooks and components test with standard React Testing Library patterns
  - Monitor for future use of concurrent features

### Accessibility Testing with jest-axe
  - Automatic accessibility violation detection in renderWithProviders
  - ARIA label verification
  - Keyboard navigation testing
  - Color contrast validation (configured for CSS variables)

### window.matchMedia Mocking
  - Consistent theme detection testing
  - System preference simulation
  - Media query testing for responsive components

## LLM Implementation Instructions

### Before Each Phase:
1. **Examine Current Structure**: Use codebase search to understand existing files
2. **Analyze Dependencies**: Check imports and exports in target files
3. **Understand Data Flow**: Trace how data flows between components/hooks/services
4. **Check Actual Function Names**: Verify function names in target files (especially utilities)

### For Each Test File:
1. **Import Analysis**: Identify all functions, components, types to test
2. **Dependency Mapping**: List all external dependencies to mock appropriately
3. **Edge Case Identification**: Consider error states, boundary conditions
4. **Integration Points**: Test how the unit interacts with other parts
5. **Accessibility**: Include jest-axe testing for components

### Validation After Each Step:
1. **Run Tests**: Ensure all tests pass
2. **Coverage Check**: Verify coverage meets specific thresholds (95% for utils)
3. **Integration Verification**: Test with related components
4. **Performance Check**: Ensure test execution time is reasonable
5. **Accessibility Check**: Verify no a11y violations

This plan provides a comprehensive roadmap for testing the Qalamus frontend, respecting the actual architecture with CSS Modules, custom hooks, Next.js 15, and addressing all the technical refinements and corrections identified. 