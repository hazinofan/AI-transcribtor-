import { ReactNode, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const { locale, asPath } = router

  const [isModalOpen, setIsModalOpen] = useState(false)

  const switchLanguage = () => {
    const nextLocale = locale === 'fr' ? 'en' : 'fr'
    router.push(asPath, asPath, { locale: nextLocale })
  }

  return (
    <div className="layout">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">{t('title')}</h1>
        <nav className="nav-links">
          <a href="#" className='steps' onClick={() => setIsModalOpen(true)}>
            {t('steps')}
          </a>
          {/* Language Switcher */}
          <button onClick={switchLanguage} className="lang-switch-btn">
            {locale === 'fr' ? '🇬🇧 English' : '🇫🇷 Français'}
          </button>
          <a href="https://www.youtube.com/" className="youtube-btn">
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </span>
            <span className="btn-text">{t('getYoutubeLink')}</span>
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} {t('madeBy')}</span>
        <div className="footer-links">
          <Link href='/terms' >{t('suggestFeature')}</Link>
        </div>
      </footer>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">{t('stepsTitle')}</h2>
              <button className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <ol className="steps-list">
                {[1, 2, 3, 4].map((step) => (
                  <li key={step} className="step-item">
                    <div className="step-number">{step}</div>
                    <div className="step-text">{t(`step${step}`)}</div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="modal-footer">
              <button
                className="modal-confirm-btn"
                onClick={() => setIsModalOpen(false)}
              >
                {t('gotIt')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
