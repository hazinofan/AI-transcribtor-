export interface Segment 
{
  startTime: string;
  endTime: string;
  arabic: string;
  translation: string;
}

export interface KeyVocab 
{
  original: string;
  translation: string;
}

export interface EstimateResponse 
{
  estimatedTranscriptTimeSec: number;
  estimatedTranscriptTimeFormatted: string;
}

export interface TranscriptResponse 
{
  result: 
  {
    data: Segment[];
  };
}

export interface VocabResponse 
{
  result: 
  {
    data: KeyVocab[][];
  };
}

export interface SummaryResponse 
{
  result: 
  {
    data: string;
  };
}

export interface TranscriptionState 
{
  segments: Segment[];
  currentSegment: number;
  loading: boolean;
  error: string | null;
  estimatedTimeData: EstimateResponse | null;
  elapsed: number;
  keyVocab: KeyVocab[][] | null;
  summaryText: string | null;
  summaryLoading: boolean;
  summaryError: string | null;
}

export interface VideoPlayerState 
{
  player: any | null; // YouTubePlayer type from react-youtube
  isReady: boolean;
} 