// pages/transcription/[videoId].tsx
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef, useCallback } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube'; // Import react-youtube
import styles from '../../styles/transcription.module.css';

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5001/ai-transcriptor-app-48cea/us-central1'; // Corrected BASE_URL

async function estimateTranscriptionTimeCall(videoId: string) {
    const res = await fetch(`${BASE_URL}/estimateTranscriptionTime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: {videoId}
        })
    });
    if (!res.ok) throw new Error(`Estimate API returned ${res.status}`);
    const { result } = await res.json();
    return result.estimatedTranscriptTimeSec as number;
}


async function transcriptAudioCall(videoId: string, language: string) {
    const res = await fetch(`${BASE_URL}/transcriptAudio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: { videoId, targetLanguage: language }
        }),
    });
    if (!res.ok) throw new Error(`Transcription API returned ${res.status}`);
    const data = await res.json();
    if (data.error || data.result?.error) { // Check for backend errors
        throw new Error(data.error?.message || data.result?.error || `Transcription failed`);
    }
    return data;
}

async function extractKeyVocabCall(videoId: string, language: string) {
    const res = await fetch(`${BASE_URL}/extractKeyVocab`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: { videoId, targetLanguage: language } }),
    });
    if (!res.ok) throw new Error(`Key Vocab API returned ${res.status}`);
    const data = await res.json();
    if (data.error || data.result?.error) { // Check for backend errors
        throw new Error(data.error?.message || data.result?.error || `Key Vocab extraction failed`);
    }
    return data;
}

type Segment = {
    startTime: string;
    endTime: string;
    arabic: string;
    translation: string;
};

type KeyVocab = {
    original: string;
    translation: string;
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
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
    // how many seconds have elapsed since we started
    const [elapsed, setElapsed] = useState(0);
    const [segments, setSegments] = useState<Segment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [currentSegment, setCurrentSegment] = useState<number>(0);
    const [player, setPlayer] = useState<YouTubePlayer | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const [keyVocab, setKeyVocab] = useState<KeyVocab[][] | null>(null); // New state for key vocabulary

    // Fetch transcription data
    useEffect(() => {
        if (!videoId) {
            setLoading(false);
            return;
        }
        let timerId: ReturnType<typeof setInterval>;

        async function go() {
            setLoading(true);
            setError(null);
            setSegments([]);
            setElapsed(0);
            setEstimatedTime(null);

            try {
                // 1) get estimate
                if (!videoId) throw new Error('Video ID is null');
                const e = await estimateTranscriptionTimeCall(videoId);
                setEstimatedTime(e);

                // start a 1-sec tick to update your progress
                timerId = setInterval(() => {
                    setElapsed(old => {
                        if (old + 1 >= e) {
                            clearInterval(timerId);
                            return e;
                        }
                        return old + 1;
                    });
                }, 1000);

                // 2) now fire the real transcription
                const data = await transcriptAudioCall(videoId, lang);
                const transcriptSegments = data.result.data || [];
                setSegments(transcriptSegments);

                // 3) fire key vocab extraction without awaiting
                extractKeyVocabCall(videoId, lang).then(vocabData => {
                    if (vocabData.result && Array.isArray(vocabData.result.data)) {
                        setKeyVocab(vocabData.result.data as KeyVocab[][]); // Set vocabulary data in new state
                        console.log(`✅ Key vocabulary data loaded for videoId: ${videoId}`);
                    } else {
                        console.warn('⚠️ Key vocabulary extraction returned unexpected data:', vocabData);
                    }
                }).catch(vocabErr => {
                    console.error('❌ Error extracting key vocabulary:', vocabErr);
                    // Optionally set an error state specifically for vocab extraction if needed
                });

            } catch (err: any) {
                console.error(err);
                setError(err.message || t('error_fetch'));
            } finally {
                // Ensure loading is set to false after transcription is available
                clearInterval(timerId);
                setLoading(false);
            }
        }

        go();
        return () => clearInterval(timerId);
    }, [videoId, lang, t]);



    // YouTube Player Ready Handler
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        setPlayer(event.target);
    };

    // Seek video to segment start time
    const seekToSegment = useCallback((segmentIndex: number) => {
        if (player && segments[segmentIndex] && player.seekTo) {
            player.seekTo(timeToSeconds(segments[segmentIndex].startTime), true);
            if (player.getPlayerState && player.getPlayerState() !== 1) { // If not playing, play
                player.playVideo?.();
            }
        }
    }, [player, segments]);

    // Segment Navigation Handlers
    const handleNextSegment = useCallback(() => {
        if (currentSegment < segments.length - 1) {
            const newSegmentIndex = currentSegment + 1;
            setCurrentSegment(newSegmentIndex);
            seekToSegment(newSegmentIndex);
        }
    }, [currentSegment, segments.length, setCurrentSegment, seekToSegment]);

    const handlePrevSegment = useCallback(() => {
        if (currentSegment > 0) {
            const newSegmentIndex = currentSegment - 1;
            setCurrentSegment(newSegmentIndex);
            seekToSegment(newSegmentIndex);
        }
    }, [currentSegment, setCurrentSegment, seekToSegment]);

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

    // Effect for keyboard controls
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const target = event.target as HTMLElement;
        // Ignore if focus is on an input, select, textarea, or contentEditable element
        if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
            return;
        }

        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                handlePrevSegment();
                break;
            case 'ArrowRight':
                event.preventDefault();
                handleNextSegment();
                break;
            case ' ': // Space bar
                event.preventDefault();
                if (player && typeof player.getPlayerState === 'function' && typeof player.playVideo === 'function' && typeof player.pauseVideo === 'function') {
                    const playerState = player.getPlayerState();
                    if (playerState === 1) { // Playing
                        player.pauseVideo();
                    } else { // Paused, Ended, Cued, Buffering, Unstarted
                        player.playVideo();
                    }
                }
                break;
            default:
                break;
        }
    }, [handlePrevSegment, handleNextSegment, player]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const playerOpts: YouTubeProps['opts'] = {
        playerVars: {
            autoplay: 0,
            controls: 1, // Set to 1 to show controls, 0 to hide
            loop: 0, // Loop is often better handled by custom logic if needed with segments
            // playlist: videoId || undefined, // Only needed with loop=1 for single video
            modestbranding: 1,
            rel: 0,
            fs: 0, // Allow fullscreen
            disablekb: 1, // Enable keyboard controls
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
                // 1️⃣ While waiting for the estimate:
                estimatedTime === null ? (
                    <div className={styles.loadingContainer}>
                        <p className={styles.loadingText}>
                            Calcul du temps de transcription…
                        </p>
                    </div>
                ) : (
                    // 2️⃣ Once we have the estimate, show progress:
                    <div className={styles.loadingContainer}>
                        <div className={styles.loadingContent}>
                            <p className={styles.loadingText}>{t('transcribing')}</p>
                            <p className={styles.estimatedTime}>
                                {t('estimated_time', { seconds: estimatedTime })}
                            </p>
                            <div className={styles.progressDisplayContainer}>
                                <div className={styles.progressWrapper}>
                                    <progress
                                        className={styles.progressBar}
                                        value={elapsed}
                                        max={estimatedTime}
                                    />
                                    <div className={styles.progressTrack}></div>
                                </div>
                                {estimatedTime > 0 && (
                                    <span className={styles.progressPercentage}>
                                        {Math.round((elapsed / estimatedTime) * 100)}%
                                    </span>
                                )}
                            </div>
                            <div className={styles.timeLabels}>
                                {estimatedTime > 0 && elapsed < estimatedTime && (
                                    <span className={styles.remainingTimeText}>
                                        {t('remaining_time', { seconds: estimatedTime - elapsed })}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )
            )}

            {error && <p className={styles.errorMessage}>{error}</p>}
            {!loading && !error && segments.length === 0 && videoId && (
                <p className={styles.emptyMessage}>{t('no_segments')}</p>
            )}

            {/* Current Segment Display */}
            {!loading && segments.length > 0 && (
                <div className={styles.mainContentArea}>
                    <div className={styles.segmentContainer}>
                        <div className={styles.segmentNavigation}>
                            <button
                                onClick={handlePrevSegment}
                                disabled={currentSegment === 0}
                                className={`${styles.navButton} ${currentSegment === 0 ? styles.disabledButton : ''}`}
                            >
                                ← {t('previous')}
                            </button>
                            <div className={styles.segmentInfoGroup}>
                                <span className={styles.segmentCounter}>
                                    {t('segment_counter', { current: currentSegment + 1, total: segments.length })}
                                </span>
                                <span className={styles.segmentTimestamp}>
                                    {segments[currentSegment].startTime} – {segments[currentSegment].endTime}
                                </span>
                            </div>
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
                                <p className={styles.translationText}>
                                    {segments[currentSegment].translation}
                                </p>
                            </div>

                            <div className={styles.arabicSide}>
                                <p className={styles.arabicText} dir="rtl">
                                    {segments[currentSegment].arabic}
                                </p>
                            </div>
                        </div>
                    </div>
                    {keyVocab && keyVocab[currentSegment] && keyVocab[currentSegment].length > 0 && (
                        <div className={styles.vocabularyBox}>
                            <h3 className={styles.vocabularyTitle}>{t('key_vocabulary')}</h3>
                            <ul className={styles.vocabularyList}>
                                {keyVocab[currentSegment].map((vocab, j) => (
                                    <li key={j} className={styles.vocabularyItem}>
                                        <span className={styles.vocabularyArabic}>{vocab.original}</span>
                                        <span className={styles.vocabularyTranslation}>{vocab.translation}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
            {/* Keyboard Controls Hint */}
            {!loading && segments.length > 0 && (
                <div className={styles.keyboardHint}>{t('keyboard_controls_hint')}</div>
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