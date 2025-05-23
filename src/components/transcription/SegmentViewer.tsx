import React from 'react';
import { Segment } from '../../types/transcription';
import styles from '../../styles/components/SegmentViewer.module.css';

interface SegmentViewerProps 
{
  segment: Segment;
}

export function SegmentViewer({ segment }: SegmentViewerProps) 
{
  return (
    <div className={styles.segmentContent}>
      <div className={styles.translationSide}>
        <p className={styles.translationText}>
          {segment.translation}
        </p>
      </div>

      <div className={styles.arabicSide}>
        <p className={styles.arabicText} dir="rtl">
          {segment.arabic}
        </p>
      </div>
    </div>
  );
} 