import { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { TranscriptionState, Segment, KeyVocabulary } from '../../../types/transcription';
import { transcriptionService } from '../../../services/api/transcriptionService';
import { formatSecondsToMMSS } from '../../../services/utils/timeUtils';

interface UseTranscriptionProps 
{
  videoId: string | null;
  language: string;
}

export function useTranscription({ videoId, language }: UseTranscriptionProps) 
{
  const { t } = useTranslation('common');
  const [state, setState] = useState<TranscriptionState>({
    segments: [],
    currentSegment: 0,
    loading: false,
    error: null,
    estimationData: null,
    elapsed: 0,
    keyVocabulary: null,
    summaryText: null,
    summaryLoading: false,
    summaryError: null,
  });

  useEffect(() => 
  {
    if (!videoId) 
    {
      setState(prev => ({ ...prev, loading: false }));
      return;
    }

    let timerId: ReturnType<typeof setInterval> | undefined;

    async function fetchTranscription() 
    {
      if (!videoId) return; // Additional null check for TypeScript

      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        segments: [],
        elapsed: 0,
        estimationData: null,
        keyVocabulary: null,
        summaryText: null,
        summaryError: null,
      }));

      try 
      {
        // 1) Get estimate
        const estimateData = await transcriptionService.estimateTranscriptionTime(videoId);
        setState(prev => ({ ...prev, estimationData: estimateData }));

        // Start progress timer if estimate is positive
        if (estimateData && estimateData.estimatedTranscriptTimeSec > 0) 
        {
          timerId = setInterval(() => 
          {
            setState(prev => 
            {
              if (prev.elapsed + 1 >= estimateData.estimatedTranscriptTimeSec) 
              {
                if (timerId) clearInterval(timerId);
                return { ...prev, elapsed: estimateData.estimatedTranscriptTimeSec };
              }
              return { ...prev, elapsed: prev.elapsed + 1 };
            });
          }, 1000);
        }

        // 2) Get transcription
        const transcriptData = await transcriptionService.transcriptAudio(videoId, language);
        const transcriptSegments = transcriptData.result.data || [];
        setState(prev => ({ ...prev, segments: transcriptSegments }));

        // 3) Get key vocabulary (async)
        transcriptionService.extractKeyVocab(videoId, language)
          .then(vocabData => 
          {
            if (vocabData.result && Array.isArray(vocabData.result.data)) 
            {
              setState(prev => ({ ...prev, keyVocabulary: vocabData.result.data as KeyVocabulary[][] }));
              console.log(`✅ Key vocabulary data loaded for videoId: ${videoId}`);
            } 
            else 
            {
              console.warn('⚠️ Key vocabulary extraction returned unexpected data:', vocabData);
            }
          })
          .catch(vocabErr => 
          {
            console.error('❌ Error extracting key vocabulary:', vocabErr);
          });

        // 4) Get summary (async)
        if (transcriptSegments.length > 0) 
        {
          setState(prev => ({ ...prev, summaryLoading: true, summaryError: null }));
          
          transcriptionService.summarizeVideo(videoId, language)
            .then(summaryData => 
            {
              if (summaryData.result && typeof summaryData.result.data === 'string') 
              {
                setState(prev => ({ 
                  ...prev, 
                  summaryText: summaryData.result.data,
                  summaryLoading: false 
                }));
                console.log(`✅ Summary data loaded for videoId: ${videoId}`);
              } 
              else 
              {
                console.warn('⚠️ Summarize video returned unexpected data:', summaryData);
                setState(prev => ({ 
                  ...prev, 
                  summaryError: t('error_summary_unexpected'),
                  summaryLoading: false 
                }));
              }
            })
            .catch(summaryErr => 
            {
              console.error('❌ Error fetching summary:', summaryErr);
              setState(prev => ({ 
                ...prev, 
                summaryError: summaryErr.message || t('error_summary_fetch'),
                summaryLoading: false 
              }));
            });
        }

      } 
      catch (err: any) 
      {
        console.error(err);
        setState(prev => ({ 
          ...prev, 
          error: err.message || t('error_fetch') 
        }));
      } 
      finally 
      {
        if (timerId) 
        {
          clearInterval(timerId);
        }
        setState(prev => ({ ...prev, loading: false }));
      }
    }

    fetchTranscription();

    return () => 
    {
      if (timerId) clearInterval(timerId);
    };
  }, [videoId, language, t]);

  const setCurrentSegment = (segmentIndex: number) => 
  {
    setState(prev => ({ ...prev, currentSegment: segmentIndex }));
  };

  return {
    ...state,
    setCurrentSegment,
  };
} 