import React from 'react';
import { useTranslation } from 'next-i18next';
import styles from '../../styles/components/VideoSummary.module.css';

interface VideoSummaryProps 
{
  loading: boolean;
  error: string | null;
  segments: any[];
  summaryLoading: boolean;
  summaryError: string | null;
  summaryText: string | null;
}

export function VideoSummary({ 
  loading, 
  error, 
  segments, 
  summaryLoading, 
  summaryError, 
  summaryText 
}: VideoSummaryProps) 
{
  const { t } = useTranslation('common');

  if (loading || error || segments.length === 0) 
  {
    return null;
  }

  return (
    <div className={styles.summarySectionContainer}>
      <h3 className={styles.summaryTitle}>{t('video_summary_title')}</h3>
      {summaryLoading && (
        <div className={styles.loadingContainerSmall}>
          <p>{t('loading_summary')}</p>
        </div>
      )}
      {summaryError && (
        <p className={`${styles.errorMessage} ${styles.summaryErrorMessage}`}>
          {summaryError}
        </p>
      )}
      {!summaryLoading && !summaryError && summaryText && (
        <div className={styles.summaryContent}>
          <p style={{ whiteSpace: 'pre-line' }}>{summaryText}</p>
        </div>
      )}
      {!summaryLoading && !summaryError && !summaryText && (
        <p className={styles.emptyMessage}>{t('no_summary_available')}</p>
      )}
    </div>
  );
} 