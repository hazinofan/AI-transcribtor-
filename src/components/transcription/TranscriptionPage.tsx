import React from 'react';
import { useTranslation } from 'next-i18next';
import { useTranscription } from './hooks/useTranscription';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { useKeyboardControls } from './hooks/useKeyboardControls';
import { VideoPlayer } from './VideoPlayer';
import { ProgressIndicator } from './ProgressIndicator';
import { SegmentSlider, SegmentNavigationBar } from './SegmentNavigation';
import { SegmentViewer } from './SegmentViewer';
import { VocabularyBox } from './VocabularyBox';
import { VideoSummary } from './VideoSummary';
import styles from '../../styles/transcription.module.css';

interface TranscriptionPageProps 
{
  videoId: string | null;
  language: string;
  isReady: boolean;
}

export function TranscriptionPage({ videoId, language, isReady }: TranscriptionPageProps) 
{
  const { t } = useTranslation('common');

  // Custom hooks for state management
  const {
    segments,
    currentSegment,
    loading,
    error,
    estimatedTimeData,
    elapsed,
    keyVocab,
    summaryText,
    summaryLoading,
    summaryError,
    setCurrentSegment,
  } = useTranscription({ videoId, language });

  const {
    onPlayerReady,
    handleNextSegment,
    handlePrevSegment,
    handleSliderChange,
    togglePlayPause,
  } = useVideoPlayer({ segments, currentSegment, setCurrentSegment });

  // Setup keyboard controls
  useKeyboardControls({ handlePrevSegment, handleNextSegment, togglePlayPause });

  // Handle loading states
  if (!videoId && !loading && !isReady) 
  {
    return (
      <div className={styles.loadingContainer}>
        <p>{t('loading_video')}</p>
      </div>
    );
  }

  if (!videoId && isReady) 
  {
    return (
      <div className={styles.loadingContainer}>
        <p>No video ID provided.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Video Player */}
      {videoId && (
        <VideoPlayer 
          videoId={videoId} 
          onReady={onPlayerReady} 
        />
      )}

      {/* Progress Indicator */}
      <ProgressIndicator 
        loading={loading}
        estimatedTimeData={estimatedTimeData}
        elapsed={elapsed}
      />

      {/* Error Messages */}
      {error && <p className={styles.errorMessage}>{error}</p>}
      {!loading && !error && segments.length === 0 && videoId && (
        <p className={styles.emptyMessage}>{t('no_segments')}</p>
      )}

      {/* Segment Slider (separate, full width) */}
      <SegmentSlider
        segments={segments}
        currentSegment={currentSegment}
        loading={loading}
        onSliderChange={handleSliderChange}
      />

      {/* Current Segment Display with integrated navigation */}
      {!loading && segments.length > 0 && (
        <div className={styles.mainContentArea}>
          <div className={styles.segmentContainer}>
            {/* Navigation Bar - now part of the segment container */}
            <SegmentNavigationBar
              segments={segments}
              currentSegment={currentSegment}
              onPrevSegment={handlePrevSegment}
              onNextSegment={handleNextSegment}
            />
            {/* Segment Content */}
            <SegmentViewer segment={segments[currentSegment]} />
          </div>
          <VocabularyBox 
            keyVocab={keyVocab} 
            currentSegment={currentSegment} 
          />
        </div>
      )}

      {/* Keyboard Controls Hint */}
      {!loading && segments.length > 0 && (
        <div className={styles.keyboardHint}>{t('keyboard_controls_hint')}</div>
      )}

      {/* Video Summary */}
      <VideoSummary 
        loading={loading}
        error={error}
        segments={segments}
        summaryLoading={summaryLoading}
        summaryError={summaryError}
        summaryText={summaryText}
      />
    </div>
  );
} 