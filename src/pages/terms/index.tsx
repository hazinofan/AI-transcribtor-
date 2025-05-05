// src/pages/terms.tsx
import { useTranslation } from 'next-i18next'

export default function Terms() {
  const { t } = useTranslation('common')

  return (
      <div className="terms-page">
        <h1>{t('termsTitle')}</h1>
        <p>{t('termsIntro')}</p>

        <h2>{t('termsSection1')}</h2>
        <p>{t('terms1')}</p>

        <h2>{t('termsSection2')}</h2>
        <p>{t('terms2')}</p>

        <h2>{t('termsSection3')}</h2>
        <ul>
          <li>{t('terms3a')}</li>
          <li>{t('terms3b')}</li>
        </ul>

        <h2>{t('termsSection4')}</h2>
        <p>{t('terms4')}</p>

        <h2>{t('termsSection5')}</h2>
        <p>{t('terms5')}</p>

        <h2>{t('termsSection6')}</h2>
        <p>{t('terms6')}</p>

        <h2>{t('termsSection7')}</h2>
        <p>{t('terms7')}</p>

        <h2>{t('termsSection8')}</h2>
        <p>{t('terms8')}</p>

        <h2>{t('termsSection9')}</h2>
        <p>{t('terms9')}</p>

        <h2>{t('termsSection10')}</h2>
        <p>
          {t('terms10')}
          <a href="mailto:support@aitranscriptor.com">{t('termsContact')}</a>.
        </p>
      </div>
  )
}
