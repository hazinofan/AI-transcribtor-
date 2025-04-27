import Layout from '@/components/Layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function TranscriptionPage() {
    const router = useRouter()
    const { videoId } = router.query

    const [transcript, setTranscript] = useState<string[]>([])
    const [translatedTranscript, setTranslatedTranscript] = useState<string[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!videoId) return

        // TODO: Replace this with your real backend call to fetch the transcript
        async function fetchTranscripts() {
            setLoading(true)

            try {
                // Example fake data (remove and replace with real API call)
                setTranscript([
                    '[00:01] Hello everyone, welcome to the video.',
                    '[00:05] Today we are learning about transcription apps.',
                ])
                setTranslatedTranscript([
                    '[00:01] Bonjour à tous, bienvenue dans la vidéo.',
                    '[00:05] Aujourd\'hui, nous apprenons les applications de transcription.',
                ])
            } catch (error) {
                console.error('Error fetching transcript:', error)
            }

            setLoading(false)
        }

        fetchTranscripts()
    }, [videoId])

    if (!videoId) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-5xl mx-auto space-y-8">
                    {/* Video player */}
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            className="w-full h-96 rounded-lg shadow-md"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>

                    {/* Transcripts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Original Transcript */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Original Transcript</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    {transcript.map((line, idx) => (
                                        <li key={idx}>{line}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Translated Transcript */}
                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h2 className="text-xl font-bold mb-4 text-gray-800">Translated Transcript</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <ul className="space-y-2 text-gray-700 text-sm">
                                    {translatedTranscript.map((line, idx) => (
                                        <li key={idx}>{line}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
