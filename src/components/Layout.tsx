// components/Layout.tsx
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation('common')
  const { locale } = useRouter()

  return (
    <div className="wrapper">
      <header className="header">
        <Link href="/" className="logo">
          <img src="/assets/Qalamus.svg" alt="Qalamus" />
        </Link>
        <div className="lang-switcher">
          <img
            src="/assets/eng-flag.svg"
            alt={t('lang_en')}
            onClick={() => i18n.changeLanguage('en')}
            className={locale === 'en' ? 'active' : ''}
          />
          <img
            src="/assets/fr-flag.png"
            alt={t('lang_fr')}
            onClick={() => i18n.changeLanguage('fr')}
            className={locale === 'fr' ? 'active' : ''}
          />
        </div>
      </header>

      <main className="main">{children}</main>

      <footer className="footer">
        <div className="footer-links">
          <Link href="/" className="apropos">
            {t('footer_apropos')}
          </Link>
          <Link href="/" className="contact">
            {t('footer_contact')}
          </Link>
        </div>
        <div className="footer_rights">
          {t('footer_rights', { year: '2025', app: 'Qalamus' })}
        </div>
      </footer>
    </div>
  )
}
