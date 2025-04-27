import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/Layout' // 👈 import your layout

export default function Home() {
  const [videoUrl, setVideoUrl] = useState('')
  const [language, setLanguage] = useState('fr')

  const handleSubmit = async () => {
    if (!videoUrl) return alert('Please paste a YouTube URL')
    const videoId = new URLSearchParams(new URL(videoUrl).search).get('v')
    if (!videoId) return alert('Invalid YouTube link')

    window.location.href = `/transcription/${videoId}`
  }

  return (
    <>
      <Head>
        <title>AI YouTube Transcriber</title>
      </Head>

      <Layout>
        {/* Main Content inside Layout now */}
        <div className="ai-container">
          <div className="">
            <span> AI Transcriber </span>
          </div>
          <div className="ai-title">
            <p> Instant YouTube Video Transcriptions <br /> and Translations </p>
            <h4> ENTER A YOUTUBE VIDEO TO GENERATE THE TRANSCRIPTION</h4>
          </div>
          <div className="search-bar">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="search-input"
              placeholder="Paste a YouTube link..."
            />

            <div className="search-actions">
              <button onClick={handleSubmit} className="option-btn primary">
                🎙️ Transcribe
              </button>

              <button className="icon-btn dark">
                ⬆️
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}
