import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// 👇 Import your API call function
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/learn-arabic-ee19c/us-central1"

async function transcribeVideo(videoId: string, language: string) {
    const response = await fetch(`${BASE_URL}/processVideo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: {
                videoId: videoId,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                targetLanguage: language,
            },
        }),
    })

    if (!response.ok) {
        throw new Error('Failed to transcribe the video')
    }

    const data = await response.json()
    return data
}

export default function TranscriptionPage() {
    const router = useRouter()
    const { videoId } = router.query

    const [transcript, setTranscript] = useState<string[]>([])
    const [translatedTranscript, setTranslatedTranscript] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!videoId || typeof videoId !== 'string') return

        async function loadTranscription() {
            setLoading(true)
            setError(null)

            try {
                const result = await transcribeVideo(videoId, 'en')
                const transcription = result.result?.output?.transcription || []

                const original = transcription.map((item: any) => `${item.timestamp} ${item.arabic}`)
                const translated = transcription.map((item: any) => `${item.timestamp} ${item.english}`)

                setTranscript(original)
                setTranslatedTranscript(translated)

            } catch (error: any) {
                console.error('Error fetching transcription:', error)
                setError('Failed to fetch transcription. Please try again.')
            }

            setLoading(false)
        }

        loadTranscription()
    }, [videoId])

    if (!videoId) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading video ID...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Video player */}
                <div className="flex justify-center">
                    <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-md">
                        <iframe
                            className="w-full h-full rounded-2xl"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&fs=0&disablekb=1&loop=1&playlist=${videoId}`}
                            title="YouTube video player"
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>


                {/* Error Handling */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Loading state */}
                {loading ? (
                    <main className='spinner-loading'>
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
                            <g fill="none" stroke-linecap="round" stroke-width="16">
                                <g className="ip__track" stroke="#ddd">
                                    <path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                    <path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                                </g>
                                <g stroke-dasharray="180 656">
                                    <path className="ip__worm1" stroke="url(#grad1)" stroke-dashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56" />
                                    <path className="ip__worm2" stroke="url(#grad2)" stroke-dashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64" />
                                </g>
                            </g>
                        </svg>
                        <p> Transcribing the video, please wait ...</p>
                    </main>
                ) : (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Header */}
                        <div className="sticky top-0 z-10 border-b border-gray-200 px-6 py-4 bg-white">
                            <h2 className="text-2xl font-bold text-gray-800">Video Transcript</h2>
                            <p className="text-base text-gray-500 mt-1 pb-12">Original (Arabic) and translated (English Or French) sentences</p>
                        </div>

                        {/* Content */}
                        <div className="divide-y divide-gray-200 max-h-[calc(100vh-300px)] overflow-y-auto">
                            {transcript.map((line, idx) => (
                                <div
                                    key={idx}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 hover:bg-gray-50 transition-colors duration-150"
                                >
                                    {/* Arabic Side */}
                                    <div className="space-y-2 text-right">
                                        <div className="text-sm font-mono text-gray-400">{line.split(' ')[0]}</div> {/* Timestamp */}
                                        <p className="text-2xl font-semibold text-gray-900 leading-relaxed" dir="rtl">
                                            {line.split(' ').slice(1).join(' ')}
                                        </p>
                                    </div>

                                    {/* English Side */}
                                    <div className="space-y-2">
                                        <div className="text-sm font-mono text-gray-400">
                                            {translatedTranscript[idx]?.split(' ')[0] || ''}
                                        </div>
                                        <p className="text-lg font-medium text-gray-800 leading-relaxed">
                                            {translatedTranscript[idx]?.split(' ').slice(1).join(' ') || ''}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}