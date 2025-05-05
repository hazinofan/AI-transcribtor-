import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useState } from 'react'
import Layout from '@/components/Layout'
import { useTranslation } from 'next-i18next'

export default function Home() {
  const { t } = useTranslation('common')
  const [videoUrl, setVideoUrl] = useState('')
  const [language, setLanguage] = useState('fr')

  const handleSubmit = async () => {
    if (!videoUrl) return alert(t('alert_paste_url'))
    const videoId = new URLSearchParams(new URL(videoUrl).search).get('v')
    if (!videoId) return alert(t('alert_invalid_link'))

    window.location.href = `/transcription/${videoId}?lang=${language}`
  }

  return (
    <>
      <Head>
        <title>{t('ai_transcriber')}</title>
      </Head>

        <div className="ai-container h-screen">
          <div className="rgb-border">
            <span>{t('ai_transcriber')}</span>
          </div>
          <div className="ai-title">
            <p>
              {t('instant_transcriptions')} <br /> {t('and_translations')}
            </p>
            <h4>{t('enter_video')}</h4>
          </div>

          <div className="search-bar">
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="search-input"
              placeholder={t('paste_link')}
            />

            <div className="display-bar">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="search-input mt-4"
              >
                <option value="fr">🇫🇷 {t('french')}</option>
                <option value="en">🇬🇧 {t('english')}</option>
                <option value="de">🇩🇪 {t('german')}</option>
              </select>

              <div className="search-actions">
                <button onClick={handleSubmit} className="option-btn primary">
                  🎙️ {t('transcribe')}
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
})
