import { ReactNode } from 'react'
import Link from 'next/link'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="logo">
            <svg className="logo-icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
            </svg>
            <span className="logo-text">AI Transcriber</span>
          </div>
          <ul className="menu">
            <span className="menu-title">Previous Prompts</span>
            <li className="menu-item">Generate from YouTube</li>
          </ul>
        </div>
        <div className="button-learn-how">
          <button className="button">
            <span className="button_lg">
              <span className="button_sl"></span>
              <span className="button_text">Download Now</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Page Content */}
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}
