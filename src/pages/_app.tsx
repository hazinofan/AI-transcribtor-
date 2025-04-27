import '../styles/globals.css'
import { Inter } from 'next/font/google'
import '../styles/home.css'
import '../styles/transcription.css'
// Load the font with any options you need
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', // optional: create CSS variable
  display: 'swap', // optional: ensures text remains visible during webfont load
})

function MyApp({ Component, pageProps }) {
  return (
    // Apply the font to the root element
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp