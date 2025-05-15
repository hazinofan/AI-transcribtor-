// pages/transcription/[videoId].tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube'; // Import react-youtube
import styles from '../../styles/transcription.module.css';

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5001/ai-transcriptor-app/us-central1'; // Corrected BASE_URL

async function transcribeVideo(videoId: string, language: string) {
    const res = await fetch(`${BASE_URL}/processVideo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: { videoId, url: `https://www.youtube.com/watch?v=${videoId}`, targetLanguage: language }
        }),
    });
    if (!res.ok) throw new Error(`Transcription API returned ${res.status}`);
    const data = await res.json();
    if (data.error || data.result?.error) { // Check for backend errors
        throw new Error(data.error?.message || data.result?.error || `Transcription failed`);
    }
    return data;
}

type Segment = {
    startTime: string;
    endTime: string;
    arabic: string;
    translation: string;
    vocabulary?: { arabic: string; translation: string }[];
};

// Helper function to convert MM:SS to seconds
function timeToSeconds(timeStr: string): number {
    if (!timeStr || typeof timeStr !== 'string') return 0;
    const parts = timeStr.split(':').map(Number);
    if (parts.length === 2) { // MM:SS
        return parts[0] * 60 + parts[1];
    } else if (parts.length === 3) { // HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2];
    }
    return 0;
}

export default function TranscriptionPage() {
    const { t } = useTranslation('common');
    const { query, isReady } = useRouter();
    const videoId = isReady && typeof query.videoId === 'string' ? query.videoId : null;
    const lang = isReady && typeof query.lang === 'string' ? query.lang : 'fr';

    const [segments, setSegments] = useState<Segment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentSegment, setCurrentSegment] = useState<number>(0);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    // Fetch transcription data
    useEffect(() => {
        if (!videoId) {
             // Clear state if videoId is not present (e.g., navigating away or initial load)
            setSegments([]);
            setCurrentSegment(0);
            setPlayer(null); // Important to reset player for new video
            setLoading(false);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);
        setSegments([]); // Clear previous segments
        setCurrentSegment(0); // Reset to first segment

        transcribeVideo(videoId, lang)
            .then(data => {
                setSegments(data.result.output || []);
            })
            .catch(err => {
                console.error("Transcription fetch error:", err);
                setError(err.message || t('error_fetch'));
            })
            .finally(() => setLoading(false));
    }, [videoId, lang, t]);


    // YouTube Player Ready Handler
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        setPlayer(event.target);
    };

    // Seek video to segment start time
    const seekToSegment = (segmentIndex: number) => {
        if (player && segments[segmentIndex] && player.seekTo) {
            player.seekTo(timeToSeconds(segments[segmentIndex].startTime), true);
            if (player.getPlayerState() !== 1) { // If not playing, play
                player.playVideo?.();
            }
        }
    };

    // Segment Navigation Handlers
    const handleNextSegment = () => {
        if (currentSegment < segments.length - 1) {
            const newSegmentIndex = currentSegment + 1;
            setCurrentSegment(newSegmentIndex);
            seekToSegment(newSegmentIndex);
        }
    };

    const handlePrevSegment = () => {
        if (currentSegment > 0) {
            const newSegmentIndex = currentSegment - 1;
            setCurrentSegment(newSegmentIndex);
            seekToSegment(newSegmentIndex);
        }
    };

    // Effect for synchronizing segment with player time
    useEffect(() => {
        if (!player || segments.length === 0 || !player.getCurrentTime) {
            return;
        }

        const checkPlayerTime = () => {
            if (!player || typeof player.getCurrentTime !== 'function' || typeof player.getPlayerState !== 'function') {
                animationFrameIdRef.current = requestAnimationFrame(checkPlayerTime);
                return;
            }
            
            const currentTime = player.getCurrentTime();
            const playerState = player.getPlayerState();

            if (typeof currentTime === 'number' && (playerState === 1 /* Playing */ || playerState === 2 /* Paused */)) {
                let newSegmentIdx = -1;
                for (let i = 0; i < segments.length; i++) {
                    const segment = segments[i];
                    const startTimeSec = timeToSeconds(segment.startTime);
                    const endTimeSec = timeToSeconds(segment.endTime);

                    // Determine if current time falls within this segment
                    // For the last segment, ensure it's selected if time is >= its start and <= its end (or slightly beyond)
                    if (i === segments.length - 1) {
                        if (currentTime >= startTimeSec && currentTime <= endTimeSec + 0.5) { // Add small buffer for end
                            newSegmentIdx = i;
                            break;
                        }
                    } else {
                        if (currentTime >= startTimeSec && currentTime < endTimeSec) {
                            newSegmentIdx = i;
                            break;
                        }
                    }
                }

                if (newSegmentIdx !== -1 && newSegmentIdx !== currentSegment) {
                    setCurrentSegment(newSegmentIdx);
                }
            }
            animationFrameIdRef.current = requestAnimationFrame(checkPlayerTime);
        };

        animationFrameIdRef.current = requestAnimationFrame(checkPlayerTime);

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [player, segments, currentSegment]); // currentSegment is included to re-evaluate if it changes externally

    const playerOpts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: 1,
            controls: 1, // Set to 1 to show controls, 0 to hide
            loop: 0, // Loop is often better handled by custom logic if needed with segments
            // playlist: videoId || undefined, // Only needed with loop=1 for single video
            modestbranding: 1,
            rel: 0,
            fs: 1, // Allow fullscreen
            disablekb: 0, // Enable keyboard controls
        },
    };

    if (!videoId && !loading && !isReady) { // Handle case where videoId might still be undefined during initial Next.js render passes
        return (
            <div className={styles.loadingContainer}>
                <p>{t('loading_video')}</p>
            </div>
        );
    }
    if (!videoId && isReady) { // Explicitly no videoId after router is ready
         return (
            <div className={styles.loadingContainer}>
                <p>No video ID provided.</p>
            </div>
        );
    }


    return (
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                {videoId && (
                    <YouTube
                        videoId={videoId}
                        opts={playerOpts}
                        onReady={onPlayerReady}
                        className={styles.videoPlayer} // Styles the div container by react-youtube
                        iframeClassName={styles.videoPlayerIframe} // Styles the actual iframe
                    />
                )}
            </div>

            {/* Status / Messages */}
            {loading && (
                <main className='spinner-loading'>
                    {/* SVG Loader remains the same */}
                    <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#5ebd3e" />
                                <stop offset="33%" stopColor="#ffb900" />
                                <stop offset="67%" stopColor="#f78200" />
                                <stop offset="100%" stopColor="#e23838" />
                            </linearGradient>
                            <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                                <stop offset="0%" stopColor="#e23838" />
                                <stop offset="33%" stopColor="#973999" />
                                <stop offset="67%" stopColor="#009cdf" />
                                <stop offset="100%" stopColor="#5ebd3e" />
                            </linearGradient>
                        </defs>
                        <g fill="none" strokeLinecap="round" strokeWidth="16">
                            <g className="ip__track" stroke="#ddd">
                                <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                            </g>
                            <g strokeDasharray="180 656">
                                <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                            </g>
                        </g>
                    </svg>
                    <p> {t('transcribing')} </p>
                </main>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {!loading && !error && segments.length === 0 && videoId && (
                <p className={styles.emptyMessage}>{t('no_segments')}</p>
            )}

            {/* Current Segment Display */}
            {!loading && segments.length > 0 && (
                <div className={styles.segmentContainer}>
                    <div className={styles.segmentNavigation}>
                        <button
                            onClick={handlePrevSegment}
                            disabled={currentSegment === 0}
                            className={`${styles.navButton} ${currentSegment === 0 ? styles.disabledButton : ''}`}
                        >
                            ← {t('previous')}
                        </button>
                        <span className={styles.segmentCounter}>
                            {t('segment_counter', { current: currentSegment + 1, total: segments.length })}
                        </span>
                        <button
                            onClick={handleNextSegment}
                            disabled={currentSegment === segments.length - 1}
                            className={`${styles.navButton} ${currentSegment === segments.length - 1 ? styles.disabledButton : ''}`}
                        >
                            {t('next')} →
                        </button>
                    </div>

                    <div className={styles.segmentContent}>
                        <div className={styles.translationSide}>
                            <div className={styles.timeStamp}>
                                {segments[currentSegment].startTime} – {segments[currentSegment].endTime}
                            </div>
                            <p className={styles.translationText}>
                                {segments[currentSegment].translation}
                            </p>

                            {segments[currentSegment].vocabulary && segments[currentSegment].vocabulary!.length > 0 && (
                                <div className={styles.vocabularyBox}>
                                    <h3 className={styles.vocabularyTitle}>{t('key_vocabulary')}</h3>
                                    <ul className={styles.vocabularyList}>
                                        {segments[currentSegment].vocabulary!.map((vocab, j) => (
                                            <li key={j} className={styles.vocabularyItem}>
                                                <span className={styles.vocabularyArabic}>{vocab.arabic}</span>
                                                <span className={styles.vocabularyTranslation}>{vocab.translation}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className={styles.arabicSide}>
                            <div className={styles.timeStamp}>
                                {segments[currentSegment].startTime} – {segments[currentSegment].endTime}
                            </div>
                            <p className={styles.arabicText} dir="rtl">
                                {segments[currentSegment].arabic}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export const getStaticPaths = () => ({
    paths: [],
    fallback: 'blocking',
});

export async function getStaticProps({ locale }: { locale?: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
        },
    };
}