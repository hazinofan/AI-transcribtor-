/**
 * Helper function to format seconds into MM:SS
 */
export function formatSecondsToMMSS(seconds: number): string 
{
  if (isNaN(seconds) || seconds < 0) 
  {
    return '00:00';
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Helper function to convert MM:SS to seconds
 */
export function timeToSeconds(timeStr: string): number 
{
  if (!timeStr || typeof timeStr !== 'string') return 0;
  const parts = timeStr.split(':').map(Number);
  if (parts.length === 2) 
  { // MM:SS
    return parts[0] * 60 + parts[1];
  } 
  else if (parts.length === 3) 
  { // HH:MM:SS
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  return 0;
} 