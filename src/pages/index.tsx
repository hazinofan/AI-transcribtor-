// pages/index.tsx
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'

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
        <p className="sub-title">{t('subtitle1')} <br /> {t('subtitle2')} <br /> {t('subtitle3')} </p>
      </div>
      <img src="/assets/green-star.svg" alt="" className="star star--right" />
      <img
        src="/assets/writing-hand-with-shadow.svg"
        alt=""
        className="star star--center"
      />

      <div className="input_container">
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder={t('placeholder_url')}
          className="styled-input"
        />

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="styled-input"
        >
          <option value="fr">{t('lang_fr')}</option>
          <option value="en">{t('lang_en')}</option>
        </select>

        <button className="styled-button" onClick={handleSubmit}>
          {t('button_go')}
        </button>
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
