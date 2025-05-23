import React from 'react';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { EstimateResponse } from '../../types/transcription';
import { formatSecondsToMMSS } from '../../services/utils/timeUtils';
import styles from '../../styles/transcription.module.css';
import animationData from '../../../public/assets/writing-feather-yellow.json';

// Dynamically import Lottie component with SSR disabled
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface ProgressIndicatorProps 
{
  loading: boolean;
  estimatedTimeData: EstimateResponse | null;
  elapsed: number;
}

export function ProgressIndicator({ loading, estimatedTimeData, elapsed }: ProgressIndicatorProps) 
{
  const { t } = useTranslation('common');

  // Lottie animation options
  const lottieOptions = 
  {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: 
    {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  if (!loading) return null;

  if (estimatedTimeData === null) 
  {
    // 1️⃣ While waiting for the estimate:
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.loadingText}>
          {t('calcul_estimation')}
        </p>
      </div>
    );
  }

  if (estimatedTimeData.estimatedTranscriptTimeSec > 0) 
  {
    // 2️⃣ Once we have a positive estimate, show progress:
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <p className={styles.loadingText}>{t('transcribing')}</p>
          <div className={styles.lottieContainer}>
            <Lottie
              animationData={lottieOptions.animationData}
              loop={lottieOptions.loop}
              autoplay={lottieOptions.autoplay}
              rendererSettings={lottieOptions.rendererSettings}
            />
          </div>
          <p className={styles.estimatedTime}>
            {t('estimated_time', { time: estimatedTimeData.estimatedTranscriptTimeFormatted })}
          </p>
          <div className={styles.progressDisplayContainer}>
            <div className={styles.progressWrapper}>
              <progress
                className={styles.progressBar}
                value={elapsed}
                max={estimatedTimeData.estimatedTranscriptTimeSec}
              />
              <div className={styles.progressTrack}></div>
            </div>
            <span className={styles.progressPercentage}>
              {estimatedTimeData.estimatedTranscriptTimeSec > 0 ? Math.round((elapsed / estimatedTimeData.estimatedTranscriptTimeSec) * 100) : 0}%
            </span>
          </div>
          <div className={styles.timeLabels}>
            {estimatedTimeData.estimatedTranscriptTimeSec > 0 && elapsed < estimatedTimeData.estimatedTranscriptTimeSec && (
              <span className={styles.remainingTimeText}>
                {t('remaining_time', { time: formatSecondsToMMSS(estimatedTimeData.estimatedTranscriptTimeSec - elapsed) })}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 3️⃣ Estimate is 0 (or not positive), just show "transcribing"
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingContent}>
        <p className={styles.loadingText}>{t('transcribing')}</p>
        <div className={styles.lottieContainer}>
          <Lottie
            animationData={lottieOptions.animationData}
            loop={lottieOptions.loop}
            autoplay={lottieOptions.autoplay}
            rendererSettings={lottieOptions.rendererSettings}
          />
        </div>
      </div>
    </div>
  );
} 