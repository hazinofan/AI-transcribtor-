import { appWithTranslation } from 'next-i18next'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import '../styles/home.css'
import '../styles/transcription.css'
import Head from 'next/head'
import "plyr-react/plyr.css";
import { AppProps } from 'next/app'
import Layout from '@/components/Layout'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </Head>
      <main className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </>
  )
}

export default appWithTranslation(MyApp)
