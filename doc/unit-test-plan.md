
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
    "identity-obj-proxy": "^3.0.0"
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
  moduleNameMapping: {
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
  },
}

module.exports = createJestConfig(customJestConfig)
```

### Step 1.3: Test Setup with Mocks for Next.js 15
**Action**: Create `__tests__/setup.ts`

**Key mocks needed**:
  - next-i18next integration
  - Lottie React animations
  - react-youtube player
  - CSS Modules
  - Next.js router

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

**urlUtils.ts Test Categories** (8 functions):
  - `extractVideoId()`: All YouTube URL formats, invalid URLs
  - `validateYouTubeUrl()`: Valid/invalid YouTube URLs
  - `buildTranscriptionUrl()`: URL construction with parameters
  - `isValidVideoId()`: Video ID format validation
  - `normalizeYouTubeUrl()`: URL normalization
  - `getYouTubeThumbnail()`: Thumbnail URL generation
  - `parseYouTubeUrl()`: URL component parsing
  - `buildApiUrl()`: Backend API URL construction

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
  - System preference detection
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

**DarkModeToggle.tsx Tests**:
  - iOS-style toggle functionality
  - Theme switching integration
  - Accessibility (ARIA labels)
  - Animation states

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
  - Route parameter handling
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

### Step 7.2: Critical User Journeys
**Priority E2E Tests**:

  1. **Transcription Workflow**:
     - Enter YouTube URL → Navigate to transcription page
     - Wait for transcription progress → View results
     - Navigate segments with keyboard/mouse
     - View vocabulary and summary

  2. **Theme Switching**:
     - Toggle between light/dark themes
     - Verify persistence across navigation
     - Check CSS variable application

  3. **Multilingual Support**:
     - Switch languages using i18n
     - Verify content translation
     - Test RTL Arabic text rendering

  4. **Video Player Integration**:
     - YouTube video loading and playback
     - Segment synchronization with video time
     - Keyboard controls (spacebar, arrows)

  5. **Error Scenarios**:
     - Invalid YouTube URLs
     - Network failures during transcription
     - Error boundary activation and recovery

## Phase 8: Testing Utilities & Helpers

### Step 8.1: Custom Render Function
**Action**: Create `__tests__/utils/renderWithProviders.tsx`

**Providers to Include**:
  - ThemeProvider
  - i18n provider (appWithTranslation wrapper)
  - React Router provider
  - ErrorBoundary wrapper

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
  - CSS Module class name helpers
  - Async operation waiters
  - Keyboard event simulators

## Implementation Priority & Timeline

### Week 1-2: Foundation (Critical)
1. ✅ **Step 1**: Complete project setup and configuration
2. ✅ **Step 2.1**: Utility services testing (timeUtils, urlUtils)
3. ✅ **Step 8.1-8.3**: Testing utilities and helpers setup
4. ✅ **Step 2.2**: API service testing (transcriptionService)

### Week 3-4: Core Logic (High Priority)
5. ✅ **Step 3.1**: useTranscription hook testing
6. ✅ **Step 3.2**: useVideoPlayer hook testing  
7. ✅ **Step 3.3**: useKeyboardControls hook testing
8. ✅ **Step 4.1**: ThemeContext testing

### Week 5-6: Component Layer (Medium Priority)
9. ✅ **Step 5.1**: Common components (Layout, DarkModeToggle, ErrorBoundary)
10. ✅ **Step 5.2**: UI components (Button, LoadingSpinner)
11. ✅ **Step 5.3**: Transcription components (all 7 components)
12. ✅ **Step 6.1**: Hook-service integration testing

### Week 7-8: Advanced Testing (Lower Priority)
13. ✅ **Step 5.4**: Page component testing
14. ✅ **Step 6.2-6.3**: Component integration and theme testing
15. ✅ **Step 7**: E2E testing setup and critical journeys

## Success Metrics

### Coverage Targets
  - **Services**: 90% coverage (pure functions, well-defined inputs/outputs)
  - **Hooks**: 85% coverage (complex state management)
  - **Components**: 80% coverage (UI interactions and rendering)
  - **Integration**: 70% coverage (cross-component workflows)

### Quality Gates
  - All tests pass in CI/CD pipeline
  - No test flakiness (<1% failure rate)
  - Fast unit test execution (<45s for all unit tests)
  - E2E tests complete in <10 minutes

## Special Considerations for Architecture

### CSS Modules Testing
  - Test CSS class name application
  - Verify CSS variable integration
  - Test responsive behavior
  - Dark/light theme CSS switching

### Next.js 15 Specific Testing
  - App Router behavior
  - SSG/SSR testing
  - Dynamic route parameter handling
  - i18n integration testing

### React 19 Compatibility
  - Test new React 19 features if used
  - Verify concurrent features work correctly
  - Test Suspense boundaries if implemented

### Accessibility Testing
  - ARIA label verification
  - Keyboard navigation testing
  - Screen reader compatibility
  - Color contrast validation

## LLM Implementation Instructions

### Before Each Phase:
1. **Examine Current Structure**: Use codebase search to understand existing files
2. **Analyze Dependencies**: Check imports and exports in target files
3. **Understand Data Flow**: Trace how data flows between components/hooks/services

### For Each Test File:
1. **Import Analysis**: Identify all functions, components, types to test
2. **Dependency Mapping**: List all external dependencies to mock
3. **Edge Case Identification**: Consider error states, boundary conditions
4. **Integration Points**: Test how the unit interacts with other parts

### Validation After Each Step:
1. **Run Tests**: Ensure all tests pass
2. **Coverage Check**: Verify coverage meets thresholds
3. **Integration Verification**: Test with related components
4. **Performance Check**: Ensure test execution time is reasonable

This plan provides a comprehensive roadmap for testing the Qalamus frontend, respecting the actual architecture with CSS Modules, custom hooks, Next.js 15, and the specific component organization already in place.