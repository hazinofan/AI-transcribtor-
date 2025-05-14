// pages/transcription/[videoId].tsx
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from '../../styles/transcription.module.css' // We'll create this CSS file

const BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:5001/learn-arabic-ee19c/us-central1'

async function transcribeVideo(videoId: string, language: string) {
    const res = await fetch(`${BASE_URL}/processVideo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            data: { videoId, url: `https://www.youtube.com/watch?v=${videoId}`, targetLanguage: language }
        }),
    })
    if (!res.ok) throw new Error(`Transcription API returned ${res.status}`)
    return res.json()
}

type Segment = {
    startTime: string
    endTime: string
    arabic: string
    translation: string
    vocabulary?: { arabic: string; translation: string }[]
}

export default function TranscriptionPage() {
    const { t } = useTranslation('common')
    const { query, isReady } = useRouter()
    const videoId = isReady && typeof query.videoId === 'string' ? query.videoId : null
    const lang = isReady && typeof query.lang === 'string' ? query.lang : 'fr'

    const [segments, setSegments] = useState<Segment[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [currentSegment, setCurrentSegment] = useState<number>(0)

    useEffect(() => {
        if (!videoId) return
        setLoading(true)
        setError(null)

        transcribeVideo(videoId, lang)
            .then(data => {
                console.log('API segments:', data.result.output)
                setSegments(data.result.output || [])
            })
            .catch(err => {
                console.error(err)
                setError('Could not fetch transcription. Please try again.')
            })
            .finally(() => setLoading(false))
    }, [videoId, lang])

    if (!videoId) {
        return (
            <div className={styles.loadingContainer}>
                <p>Loading video info…</p>
            </div>
        )
    }

    const handleNextSegment = () => {
        if (currentSegment < segments.length - 1) {
            setCurrentSegment(currentSegment + 1)
        }
    }

    const handlePrevSegment = () => {
        if (currentSegment > 0) {
            setCurrentSegment(currentSegment - 1)
        }
    }

    return (
        <div className={styles.container}>
            {/* Video Player */}
            <div className={styles.videoContainer}>
                <iframe
                    className={styles.videoPlayer}
                    src={`https://www.youtube.com/embed/${videoId}` +
                        `?autoplay=1` +           // start playing right away
                        `&controls=0` +           // hide controls bar
                        `&loop=1` +               // loop the video
                        `&playlist=${videoId}` +  // needed to make loop work
                        `&modestbranding=1` +     // no big YouTube logo
                        `&rel=0` +                // don’t show related videos
                        `&fs=0` +                 // hide fullscreen button
                        `&disablekb=1`            // disable keyboard controls
                    }
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                />
            </div>


            {/* Status / Messages */}
            {loading && <main className='spinner-loading'>
                <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stop-color="#5ebd3e" />
                            <stop offset="33%" stop-color="#ffb900" />
                            <stop offset="67%" stop-color="#f78200" />
                            <stop offset="100%" stop-color="#e23838" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
                            <stop offset="0%" stop-color="#e23838" />
                            <stop offset="33%" stop-color="#973999" />
                            <stop offset="67%" stop-color="#009cdf" />
                            <stop offset="100%" stop-color="#5ebd3e" />
                        </linearGradient>
                    </defs>
                    <g fill="none" strokeLinecap="round" strokeWidth="16">
                        <g className="ip__track" stroke="#ddd">
                            <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                        <g stroke-dasharray="180 656">
                            <path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                            <path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                        </g>
                    </g>
                </svg>
                <p> {t('transcribing')} </p>
            </main>}
            {error && <p className={styles.errorMessage}>{error}</p>}
            {!loading && !error && segments.length === 0 && (
                <p className={styles.emptyMessage}>{t('error_fetch')}</p>
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
                            Segment {currentSegment + 1} of {segments.length}
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
                        {/* French Translation (Left) */}
                        <div className={styles.translationSide}>
                            <div className={styles.timeStamp}>
                                {segments[currentSegment].startTime} – {segments[currentSegment].endTime}
                            </div>
                            <p className={styles.translationText}>
                                {segments[currentSegment].translation}
                            </p>

                            {segments[currentSegment].vocabulary && segments[currentSegment].vocabulary.length > 0 && (
                                <div className={styles.vocabularyBox}>
                                    <h3 className={styles.vocabularyTitle}>{t('key_vocabulary')}</h3>
                                    <ul className={styles.vocabularyList}>
                                        {segments[currentSegment].vocabulary?.map((vocab, j) => (
                                            <li key={j} className={styles.vocabularyItem}>
                                                <span className={styles.vocabularyArabic}>{vocab.arabic}</span>
                                                <span className={styles.vocabularyTranslation}>{vocab.translation}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Arabic (Right) */}
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
    )
}

export const getStaticPaths = () => ({
    paths: [],
    fallback: 'blocking',
})

export async function getStaticProps({ locale }: { locale?: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
        },
    }
}