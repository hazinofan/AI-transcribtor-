import { ApiResponse } from './api';
import { TimeString, VideoId, VoidCallback, ValueCallback } from './common';

/**
 * Individual transcript segment structure
 */
export interface Segment 
{
  startTime: TimeString;
  endTime: TimeString;
  arabic: string;
  translation: string;
}

/**
 * Key vocabulary item structure
 */
export interface KeyVocabulary 
{
  original: string;
  translation: string;
}

/**
 * Transcription time estimation response
 */
export interface EstimationResponse 
{
  estimatedTranscriptTimeSec: number;
  estimatedTranscriptTimeFormatted: string;
}

/**
 * API response types using the generic ApiResponse structure
 */
export type TranscriptResponse = ApiResponse<Segment[]>;
export type VocabularyResponse = ApiResponse<KeyVocabulary[][]>;
export type SummaryResponse = ApiResponse<string>;

/**
 * Main transcription state interface
 */
export interface TranscriptionState 
{
  segments: Segment[];
  currentSegment: number;
  loading: boolean;
  error: string | null;
  estimationData: EstimationResponse | null;
  elapsed: number;
  keyVocabulary: KeyVocabulary[][] | null;
  summaryText: string | null;
  summaryLoading: boolean;
  summaryError: string | null;
}

/**
 * Video player state interface
 */
export interface VideoPlayerState 
{
  player: any | null; // YouTubePlayer type from react-youtube
  isReady: boolean;
}

/**
 * Hook return types for better type safety
 */
export interface UseTranscriptionReturn 
{
  state: TranscriptionState;
  actions: 
  {
    loadTranscription: (videoId: VideoId, language: string) => Promise<void>;
    loadVocabulary: (videoId: VideoId, language: string) => Promise<void>;
    loadSummary: (videoId: VideoId, language: string) => Promise<void>;
    setCurrentSegment: ValueCallback<number>;
    reset: VoidCallback;
  };
}

export interface UseVideoPlayerReturn 
{
  state: VideoPlayerState;
  actions: 
  {
    handlePlayerReady: (event: any) => void;
    jumpToSegment: (segmentIndex: number) => void;
    handlePrevSegment: VoidCallback;
    handleNextSegment: VoidCallback;
    togglePlayPause: VoidCallback;
  };
} 