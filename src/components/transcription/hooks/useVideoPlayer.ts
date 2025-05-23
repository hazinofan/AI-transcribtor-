import { useState, useEffect, useRef, useCallback } from 'react';
import { YouTubePlayer, YouTubeProps } from 'react-youtube';
import { Segment } from '../../../types/transcription';
import { timeToSeconds } from '../../../services/utils/timeUtils';

interface UseVideoPlayerProps 
{
  segments: Segment[];
  currentSegment: number;
  setCurrentSegment: (index: number) => void;
}

export function useVideoPlayer({ segments, currentSegment, setCurrentSegment }: UseVideoPlayerProps) 
{
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // YouTube Player Ready Handler
  const onPlayerReady: YouTubeProps['onReady'] = useCallback((event: { target: YouTubePlayer }) => 
  {
    setPlayer(event.target);
  }, []);

  // Seek video to segment start time
  const seekToSegment = useCallback((segmentIndex: number) => 
  {
    if (player && segments[segmentIndex] && player.seekTo) 
    {
      player.seekTo(timeToSeconds(segments[segmentIndex].startTime), true);
      if (player.getPlayerState && player.getPlayerState() !== 1) 
      { // If not playing, play
        player.playVideo?.();
      }
    }
  }, [player, segments]);

  // Segment Navigation Handlers
  const handleNextSegment = useCallback(() => 
  {
    if (currentSegment < segments.length - 1) 
    {
      const newSegmentIndex = currentSegment + 1;
      setCurrentSegment(newSegmentIndex);
      seekToSegment(newSegmentIndex);
    }
  }, [currentSegment, segments.length, setCurrentSegment, seekToSegment]);

  const handlePrevSegment = useCallback(() => 
  {
    if (currentSegment > 0) 
    {
      const newSegmentIndex = currentSegment - 1;
      setCurrentSegment(newSegmentIndex);
      seekToSegment(newSegmentIndex);
    }
  }, [currentSegment, setCurrentSegment, seekToSegment]);

  // Handler for slider change
  const handleSliderChange = useCallback((value: number[]) => 
  {
    const newSegmentIndex = value[0];
    if (!isNaN(newSegmentIndex) && newSegmentIndex >= 0 && newSegmentIndex < segments.length) 
    {
      setCurrentSegment(newSegmentIndex);
      seekToSegment(newSegmentIndex);
    }
  }, [segments, setCurrentSegment, seekToSegment]);

  // Effect for synchronizing segment with player time
  useEffect(() => 
  {
    if (!player || segments.length === 0 || !player.getCurrentTime) 
    {
      return;
    }

    const checkPlayerTime = () => 
    {
      if (!player || typeof player.getCurrentTime !== 'function' || typeof player.getPlayerState !== 'function') 
      {
        animationFrameIdRef.current = requestAnimationFrame(checkPlayerTime);
        return;
      }

      const currentTime = player.getCurrentTime();
      const playerState = player.getPlayerState();

      if (typeof currentTime === 'number' && (playerState === 1 /* Playing */ || playerState === 2 /* Paused */)) 
      {
        let newSegmentIdx = -1;
        for (let i = 0; i < segments.length; i++) 
        {
          const segment = segments[i];
          const startTimeSec = timeToSeconds(segment.startTime);
          const endTimeSec = timeToSeconds(segment.endTime);

          // Determine if current time falls within this segment
          // For the last segment, ensure it's selected if time is >= its start and <= its end (or slightly beyond)
          if (i === segments.length - 1) 
          {
            if (currentTime >= startTimeSec && currentTime <= endTimeSec + 0.5) 
            { // Add small buffer for end
              newSegmentIdx = i;
              break;
            }
          } 
          else 
          {
            if (currentTime >= startTimeSec && currentTime < endTimeSec) 
            {
              newSegmentIdx = i;
              break;
            }
          }
        }

        if (newSegmentIdx !== -1 && newSegmentIdx !== currentSegment) 
        {
          setCurrentSegment(newSegmentIdx);
        }
      }
      animationFrameIdRef.current = requestAnimationFrame(checkPlayerTime);
    };

    animationFrameIdRef.current = requestAnimationFrame(checkPlayerTime);

    return () => 
    {
      if (animationFrameIdRef.current) 
      {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [player, segments, currentSegment, setCurrentSegment]);

  // Toggle play/pause
  const togglePlayPause = useCallback(() => 
  {
    if (player && typeof player.getPlayerState === 'function' && typeof player.playVideo === 'function' && typeof player.pauseVideo === 'function') 
    {
      const playerState = player.getPlayerState();
      if (playerState === 1) 
      { // Playing
        player.pauseVideo();
      } 
      else 
      { // Paused, Ended, Cued, Buffering, Unstarted
        player.playVideo();
      }
    }
  }, [player]);

  return {
    player,
    onPlayerReady,
    seekToSegment,
    handleNextSegment,
    handlePrevSegment,
    handleSliderChange,
    togglePlayPause,
  };
} 