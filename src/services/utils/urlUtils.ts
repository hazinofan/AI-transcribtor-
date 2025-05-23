/**
 * URL utility functions for the Qalamus frontend
 */

/**
 * Extracts YouTube video ID from various YouTube URL formats
 * @param url - YouTube URL in various formats
 * @returns Video ID or null if not found
 */
export function extractYouTubeVideoId(url: string): string | null 
{
  if (!url || typeof url !== 'string') 
  {
    return null;
  }

  // Remove whitespace
  url = url.trim();

  // Regular expressions for different YouTube URL formats
  const patterns = [
    // Standard watch URL: https://www.youtube.com/watch?v=VIDEO_ID
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Short URL: https://youtu.be/VIDEO_ID
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    // Mobile URL: https://m.youtube.com/watch?v=VIDEO_ID
    /(?:m\.youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    // Just the video ID
    /^([a-zA-Z0-9_-]{11})$/
  ];

  for (const pattern of patterns) 
  {
    const match = url.match(pattern);
    if (match && match[1]) 
    {
      return match[1];
    }
  }

  return null;
}

/**
 * Validates if a string is a valid YouTube video ID
 * @param videoId - String to validate
 * @returns True if valid YouTube video ID
 */
export function isValidYouTubeVideoId(videoId: string): boolean 
{
  if (!videoId || typeof videoId !== 'string') 
  {
    return false;
  }

  // YouTube video IDs are exactly 11 characters long and contain only alphanumeric characters, hyphens, and underscores
  const videoIdPattern = /^[a-zA-Z0-9_-]{11}$/;
  return videoIdPattern.test(videoId);
}

/**
 * Constructs a YouTube watch URL from a video ID
 * @param videoId - YouTube video ID
 * @returns Full YouTube watch URL
 */
export function buildYouTubeWatchUrl(videoId: string): string 
{
  if (!isValidYouTubeVideoId(videoId)) 
  {
    throw new Error('Invalid YouTube video ID');
  }

  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Constructs a YouTube thumbnail URL from a video ID
 * @param videoId - YouTube video ID
 * @param quality - Thumbnail quality ('default', 'medium', 'high', 'standard', 'maxres')
 * @returns YouTube thumbnail URL
 */
export function buildYouTubeThumbnailUrl(videoId: string, quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'): string 
{
  if (!isValidYouTubeVideoId(videoId)) 
  {
    throw new Error('Invalid YouTube video ID');
  }

  const qualityMap = 
  {
    'default': 'default.jpg',
    'medium': 'mqdefault.jpg',
    'high': 'hqdefault.jpg',
    'standard': 'sddefault.jpg',
    'maxres': 'maxresdefault.jpg'
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}`;
}

/**
 * Validates if a URL is a valid HTTP/HTTPS URL
 * @param url - URL to validate
 * @returns True if valid URL
 */
export function isValidUrl(url: string): boolean 
{
  if (!url || typeof url !== 'string') 
  {
    return false;
  }

  try 
  {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } 
  catch 
  {
    return false;
  }
}

/**
 * Builds a transcription page URL
 * @param videoId - YouTube video ID
 * @param language - Language code (optional)
 * @returns Transcription page URL
 */
export function buildTranscriptionUrl(videoId: string, language?: string): string 
{
  if (!isValidYouTubeVideoId(videoId)) 
  {
    throw new Error('Invalid YouTube video ID');
  }

  let url = `/transcription/${videoId}`;
  
  if (language) 
  {
    url += `?lang=${encodeURIComponent(language)}`;
  }

  return url;
}

/**
 * Parses query parameters from a URL
 * @param url - URL to parse
 * @returns Object with query parameters
 */
export function parseQueryParams(url: string): Record<string, string> 
{
  const params: Record<string, string> = {};

  try 
  {
    const urlObj = new URL(url);
    urlObj.searchParams.forEach((value, key) => 
    {
      params[key] = value;
    });
  } 
  catch 
  {
    // If URL parsing fails, try to extract query string manually
    const queryStart = url.indexOf('?');
    if (queryStart !== -1) 
    {
      const queryString = url.substring(queryStart + 1);
      const pairs = queryString.split('&');
      
      for (const pair of pairs) 
      {
        const [key, value] = pair.split('=');
        if (key) 
        {
          params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
        }
      }
    }
  }

  return params;
} 