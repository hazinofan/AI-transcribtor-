// pages/index.tsx
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import HomeLanguageSelector from '../components/common/HomeLanguageSelector'

const Index = () => {
  const { t } = useTranslation('common')
  const [videoUrl, setVideoUrl] = useState('')
  const [language, setLanguage] = useState('fr')

  const handleSubmit = () => {
    if (!videoUrl) return alert(t('alert_paste_url'))
    let videoId: string | null = null

    try {
      const urlObj = new URL(videoUrl)
      videoId = new URLSearchParams(urlObj.search).get('v')
    } catch {
      return alert(t('alert_invalid_link'))
    }

    if (!videoId) return alert(t('alert_invalid_link'))

    window.location.href = `/transcription/${videoId}?lang=${language}`
  }

  return (
    <div className="hero_section">
      <img src="/assets/red-star.svg" alt="" className="star star--left" />
      <div className="hero_text">
        <h1 className="title">{t('title')} <br /> {t('title2')} </h1>
        <p className="sub-title">{t('subtitle')}</p>
      </div>
      <img src="/assets/green-star.svg" alt="" className="star star--right" />
      <img
        src="/assets/writing-hand.svg"
        alt=""
        className="star writing-hand"
      />

      <div className="input_container">
          <div className="input_row_top">
              <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder={t('placeholder_url')}
                  className="styled-input url-input"
              />
          </div>
          <div className="input_row_bottom">
              <HomeLanguageSelector
                  value={language}
                  onChange={setLanguage}
              />
              <div className="btn-container">
                  <div className="button-shadow"></div>
                  <button className="styled-button" onClick={handleSubmit}>
                      {t('button_go')}
                  </button>
              </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default Index
