import { EstimateResponse, TranscriptResponse, VocabResponse, SummaryResponse } from '../../types/transcription';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/ai-transcriptor-app-48cea/us-central1';

export class TranscriptionService 
{
  private baseUrl: string;

  constructor() 
  {
    this.baseUrl = BASE_URL;
  }

  /**
   * Estimate transcription time for a video
   */
  async estimateTranscriptionTime(videoId: string): Promise<EstimateResponse> 
  {
    const res = await fetch(`${this.baseUrl}/estimateTranscriptionTime`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { videoId }
      })
    });
    
    if (!res.ok) 
    {
      throw new Error(`Estimate API returned ${res.status}`);
    }
    
    const { result } = await res.json();
    return result;
  }

  /**
   * Transcribe audio from video
   */
  async transcriptAudio(videoId: string, language: string): Promise<TranscriptResponse> 
  {
    const res = await fetch(`${this.baseUrl}/transcriptAudio`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { videoId, targetLanguage: language }
      }),
    });
    
    if (!res.ok) 
    {
      throw new Error(`Transcription API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.error || data.result?.error) 
    {
      throw new Error(data.error?.message || data.result?.error || 'Transcription failed');
    }
    
    return data;
  }

  /**
   * Extract key vocabulary from video
   */
  async extractKeyVocab(videoId: string, language: string): Promise<VocabResponse> 
  {
    const res = await fetch(`${this.baseUrl}/extractKeyVocab`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { videoId, targetLanguage: language } }),
    });
    
    if (!res.ok) 
    {
      throw new Error(`Key Vocab API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.error || data.result?.error) 
    {
      throw new Error(data.error?.message || data.result?.error || 'Key Vocab extraction failed');
    }
    
    return data;
  }

  /**
   * Generate video summary
   */
  async summarizeVideo(videoId: string, language: string): Promise<SummaryResponse> 
  {
    const res = await fetch(`${this.baseUrl}/summarizeVideo`, 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: { videoId, language: language } }),
    });
    
    if (!res.ok) 
    {
      throw new Error(`Summarize Video API returned ${res.status}`);
    }
    
    const data = await res.json();
    if (data.error || data.result?.error) 
    {
      throw new Error(data.error?.message || data.result?.error || 'Summarize Video failed');
    }
    
    return data;
  }
}

// Export singleton instance
export const transcriptionService = new TranscriptionService(); 