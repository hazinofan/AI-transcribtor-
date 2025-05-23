import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import '../styles/home.css'
import { AppProps } from 'next/app'
import Layout from '@/components/Layout'
import { ThemeProvider } from '@/contexts/ThemeContext'
import importedNextI18NextConfig from '../../next-i18next.config.js'
import { UserConfig } from 'next-i18next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <div className="wrapper">
        <main className={inter.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </div>
    </ThemeProvider>
  )
}

// Cast the imported config to ensure localeDetection is treated as literal false if necessary
const typedConfig = importedNextI18NextConfig as UserConfig & { i18n: { localeDetection: false } };

export default appWithTranslation(MyApp, typedConfig)
