import React from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import styles from '../../styles/components/VideoPlayer.module.css';

interface VideoPlayerProps 
{
  videoId: string;
  onReady: YouTubeProps['onReady'];
}

export function VideoPlayer({ videoId, onReady }: VideoPlayerProps) 
{
  const playerOpts: YouTubeProps['opts'] = 
  {
    playerVars: 
    {
      autoplay: 0,
      controls: 1, // Set to 1 to show controls, 0 to hide
      loop: 0, // Loop is often better handled by custom logic if needed with segments
      modestbranding: 1,
      rel: 0,
      fs: 0, // Allow fullscreen
      disablekb: 1, // Enable keyboard controls
    },
  };

  return (
    <div className={styles.videoContainer}>
      {videoId && (
        <YouTube
          videoId={videoId}
          opts={playerOpts}
          onReady={onReady}
          className={styles.videoPlayer} // Styles the div container by react-youtube
          iframeClassName={styles.videoPlayerIframe} // Styles the actual iframe
        />
      )}
    </div>
  );
} 