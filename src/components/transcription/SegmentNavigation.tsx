import React from 'react';
import { useTranslation } from 'next-i18next';
import * as Slider from '@radix-ui/react-slider';
import { Segment } from '../../types/transcription';
import styles from '../../styles/components/SegmentNavigation.module.css';

interface SegmentSliderProps 
{
  segments: Segment[];
  currentSegment: number;
  loading: boolean;
  onSliderChange: (value: number[]) => void;
}

export function SegmentSlider({ 
  segments, 
  currentSegment, 
  loading, 
  onSliderChange
}: SegmentSliderProps) 
{
  const { t } = useTranslation('common');

  if (loading || segments.length <= 1) return null;

  return (
    <div className={styles.sliderContainer}>
      <Slider.Root
        className={styles.segmentSliderRoot}
        value={[currentSegment]}
        onValueChange={onSliderChange}
        min={0}
        max={segments.length - 1}
        step={1}
        aria-label={t('segment_slider_label') || "Segment Slider"}
      >
        <Slider.Track className={styles.segmentSliderTrack}>
          <Slider.Range className={styles.segmentSliderRange} />
        </Slider.Track>
        <Slider.Thumb className={styles.segmentSliderThumb} />
      </Slider.Root>
    </div>
  );
}

interface SegmentNavigationBarProps 
{
  segments: Segment[];
  currentSegment: number;
  onPrevSegment: () => void;
  onNextSegment: () => void;
}

export function SegmentNavigationBar({ 
  segments, 
  currentSegment, 
  onPrevSegment, 
  onNextSegment 
}: SegmentNavigationBarProps) 
{
  const { t } = useTranslation('common');

  return (
    <div className={styles.segmentNavigation}>
      <button
        onClick={onPrevSegment}
        disabled={currentSegment === 0}
        className={`${styles.navButton} ${currentSegment === 0 ? styles.disabledButton : ''}`}
      >
        ← {/* {t('previous')} */}
      </button>
      <div className={styles.segmentInfoGroup}>
        <span className={styles.segmentCounter}>
          {t('segment_counter', { current: currentSegment + 1, total: segments.length })}
        </span>
        <span className={styles.segmentTimestamp}>
          {segments[currentSegment].startTime} – {segments[currentSegment].endTime}
        </span>
      </div>
      <button
        onClick={onNextSegment}
        disabled={currentSegment === segments.length - 1}
        className={`${styles.navButton} ${currentSegment === segments.length - 1 ? styles.disabledButton : ''}`}
      >
        {/* {t('next')} */} →
      </button>
    </div>
  );
}

// Keep backward compatibility
export function SegmentNavigation({ 
  segments, 
  currentSegment, 
  loading, 
  onSliderChange, 
  onPrevSegment, 
  onNextSegment 
}: SegmentSliderProps & SegmentNavigationBarProps) 
{
  if (loading || segments.length === 0) return null;

  return (
    <>
      <SegmentSlider 
        segments={segments}
        currentSegment={currentSegment}
        loading={loading}
        onSliderChange={onSliderChange}
      />
      <SegmentNavigationBar 
        segments={segments}
        currentSegment={currentSegment}
        onPrevSegment={onPrevSegment}
        onNextSegment={onNextSegment}
      />
    </>
  );
} 