**Changelog Week 4 (Thursday, May 15th)**
**Author: Samir**

# Advanced YouTube Player Synchronization & Keyboard Controls

## Feature: Real-time Segment Synchronization with YouTube Player

**Summary:**
Implemented advanced synchronization between the displayed transcription segments and the YouTube video player's current playback time. The active segment now automatically updates as the video plays or if the user seeks using the player's controls. This feature utilizes the `react-youtube` library for easier interaction with the YouTube Iframe Player API.

**Key Changes & Enhancements:**

1.  **Library Integration:**
    *   Added `react-youtube` and `@types/react-youtube` as project dependencies.
    *   Replaced the manual `iframe` embed with the `<YouTube>` component from `react-youtube` in `src/pages/transcription/[videoId].tsx`.

2.  **Player Instance Management:**
    *   Introduced a state variable `player: YouTubePlayer | null` to store the `react-youtube` player instance once it's ready.
    *   The `onPlayerReady` callback provided by `react-youtube` is used to capture and set this player instance.

3.  **Time Conversion Utility:**
    *   The existing `timeToSeconds(timeStr: string)` helper function is used to convert "MM:SS" or "HH:MM:SS" timestamps from segments into total seconds, aligning with the YouTube Player API's time format.

4.  **Segment Seeking Logic (`seekToSegment`):**
    *   When a segment is changed via custom navigation buttons (Next/Previous) or keyboard controls:
        *   The `seekToSegment` function is called.
        *   It uses `player.seekTo(seconds, true)` to jump the video playback to the `startTime` of the target segment.
        *   It automatically initiates playback (`player.playVideo()`) if the player was not already playing.

5.  **Real-time Time Synchronization (`useEffect` & `requestAnimationFrame`):**
    *   A new `useEffect` hook continuously monitors the YouTube player's current time.
    *   It uses `requestAnimationFrame` for a performant loop to repeatedly:
        *   Get the `player.getCurrentTime()`.
        *   Iterate through the `segments` array.
        *   Determine which segment's `startTime` and `endTime` (converted to seconds) encapsulate the `currentTime`.
        *   If the `currentTime` falls into a new segment different from the `currentSegment` state, the `currentSegment` state is updated, causing the UI to highlight the new active segment.
    *   A small buffer (0.5 seconds) is added to the `endTime` of the last segment to ensure it remains active until the very end.
    *   The loop is properly cleaned up using `cancelAnimationFrame` when the component unmounts or dependencies change.

6.  **Enhanced Segment Navigation Handlers:**
    *   `handleNextSegment` and `handlePrevSegment` now call `seekToSegment` to ensure the video player jumps to the corresponding segment when these buttons are clicked.

7.  **Player Options (`playerOpts`):**
    *   The `<YouTube>` component uses an `opts` prop to configure `playerVars`:
        *   `controls: 1` (enabled by default in the provided code, can be set to `0` to hide).
        *   `autoplay: 1`.
        *   `loop: 0` (looping is generally better handled by custom logic if integrating with segments).
        *   `modestbranding: 1`, `rel: 0`, `fs: 1`.
        *   `disablekb: 0` (initially set to allow YouTube's default keyboard shortcuts, can be set to `1` if custom keyboard handling should be exclusive).

8.  **Improved State Management on `videoId` Change:**
    *   The main `useEffect` hook for fetching transcription data now explicitly resets the `player` state to `null` when `videoId` changes. This ensures that a new player instance is correctly initialized for the new video and prevents issues with stale player references.

9.  **Robust Error Handling:**
    *   The `transcribeVideo` function and its calling `useEffect` have been updated to better parse and display error messages originating from the backend API or fetch failures.

10. **CSS Adjustments for `react-youtube`:**
    *   CSS classes `styles.videoPlayer` (for the wrapper div) and `styles.videoPlayerIframe` (for the actual iframe) are used to ensure proper styling of the embedded player.

**Impact:**

*   Provides a significantly more interactive and intuitive user experience by keeping the displayed text content in sync with the video.
*   Allows users to utilize the YouTube player's seek bar (if controls are enabled) and have the highlighted segment update accordingly.
*   Custom segment navigation buttons also correctly control the video's playback position.


# Keyboard Controls Implementation for Transcription Page

This document outlines the modifications made to the `src/pages/transcription/[videoId].tsx` file to introduce keyboard control functionalities. These enhancements aim to provide a smoother and more accessible user experience when navigating through transcription segments and controlling video playback.

## Objective

The primary goal of this implementation is to enable users to:
1.  Navigate between transcription segments (previous/next) using the keyboard arrow keys.
2.  Pause or resume YouTube video playback using the space bar.

## Implemented Features

### 1. Segment Navigation

-   **Left Arrow Key (`ArrowLeft`)**:
    -   Action: Moves to the previous transcription segment.
    -   Behavior: If the user is not on the first segment, the page displays the preceding segment, and the YouTube video seeks to the beginning of this new segment.
-   **Right Arrow Key (`ArrowRight`)**:
    -   Action: Moves to the next transcription segment.
    -   Behavior: If the user is not on the last segment, the page displays the subsequent segment, and the YouTube video seeks to the beginning of this new segment.

### 2. Video Playback Control

-   **Space Bar (` `)**:
    -   Action: Toggles play/pause for the video.
    -   Behavior:
        -   If the video is currently playing, it is paused.
        -   If the video is paused (or in another non-playing state like "ended," "cued," "buffering"), playback resumes.

## Technical Implementation Details

The modifications were primarily carried out within the `TranscriptionPage` component (`src/pages/transcription/[videoId].tsx`).

### React Hooks Used

-   **`useEffect`**:
    -   Utilized to register a `keydown` event listener on the `document` object when the component mounts.
    -   This listener is responsible for detecting key presses.
    -   The `useEffect` hook also ensures the cleanup of this listener (removal via `removeEventListener`) when the component unmounts, preventing memory leaks and unexpected behavior.
-   **`useCallback`**:
    -   Employed to memoize the event handling function (`handleKeyDown`) and navigation functions (`handlePrevSegment`, `handleNextSegment`, `seekToSegment`).
    -   This optimizes performance by avoiding the recreation of these functions on every render, unless their dependencies change. This is particularly important as `handleKeyDown` is a dependency of the `useEffect` hook that manages the event listener.

### Event Handling Logic (`handleKeyDown`)

The `handleKeyDown` function is central to this feature:

1.  **Event Target Check**:
    -   Before processing a key press, the function checks if the event originates from an input field (like `<input>`, `<select>`, `<textarea>`) or an element with `contentEditable`.
    -   If so, the function does nothing (`return`) to avoid interfering with user text input.

2.  **Specific Key Press Handling**:
    -   A `switch` statement is used to determine the action to take based on the pressed key (`event.key`).
    -   For `ArrowLeft`, `ArrowRight`, and the space bar, `event.preventDefault()` is called to stop the default browser behavior (e.g., page scrolling with arrows or space bar).

3.  **Interaction with YouTube Player**:
    -   For the space bar, the function interacts with the YouTube player API (`player`):
        -   It verifies if the player (`player`) is available and if the necessary methods (`getPlayerState`, `playVideo`, `pauseVideo`) exist.
        -   It retrieves the current state of the player (`player.getPlayerState()`).
        -   If the video is playing (state `1`), `player.pauseVideo()` is called.
        -   Otherwise (video is paused or in another state), `player.playVideo()` is called.

### Memoized Navigation Functions

-   `seekToSegment(segmentIndex)`: Seeks the video playback to the start of the specified segment.
-   `handleNextSegment()`: Increments the current segment index and calls `seekToSegment`.
-   `handlePrevSegment()`: Decrements the current segment index and calls `seekToSegment`.

These functions were wrapped in `useCallback` with their respective dependencies to stabilize their references.

## Modified File

-   `src/pages/transcription/[videoId].tsx`

## Conclusion

The addition of these keyboard controls significantly enhances the usability of the transcription page, making navigation and playback more direct and intuitive, without requiring constant mouse interaction.

---

## UI Adjustment: Language Selector Width

**Summary:**
Adjusted the CSS for the language selection dropdown on the homepage (`src/pages/index.tsx`) to prevent it from being unnecessarily wide.

**Key Changes:**
*   **File Modified:** `src/styles/home.css`
*   Added a specific CSS rule for `select.styled-input` setting `flex-grow: 0;`. This ensures the dropdown only takes up the width necessary for its content ("Français", "English") and padding, while still respecting its `min-width`. The URL input field continues to fill the remaining space.