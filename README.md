# Qalamus - YouTube Language Learning Tool 

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![next-i18next](https://img.shields.io/badge/i18n-next--i18next-orange?style=flat-square)](https://www.npmjs.com/package/next-i18next)

**Qalamus** transforms YouTube videos into an immersive language learning experience, initially focusing on Arabic. It provides accurate transcriptions, synchronized translations, key vocabulary, and video summaries to aid in language acquisition.

---

## 🌟 Key Features

*   **YouTube Video Integration:** Paste any YouTube URL to get started.
*   **Accurate Transcription:** AI-powered transcription of video audio.
*   **Synchronized Translation:** Transcripts are translated (e.g., into French or English) and displayed alongside the original language.
*   **Real-time Segment Highlighting:** The active transcription segment automatically updates as the video plays or when the user seeks.
*   **Interactive Video Player:**
    *   Embedded YouTube player (`react-youtube`).
    *   Custom segment navigation (previous/next, slider).
*   **Keyboard Controls:**
    *   Navigate segments using `ArrowLeft` / `ArrowRight`.
    *   Toggle video play/pause using `Spacebar`.
*   **Key Vocabulary Extraction:** Important vocabulary from each segment is highlighted with translations.
*   **Video Summarization:** AI-generated summary of the video content.
*   **Dark Mode:** Comfortable viewing in low-light conditions with a modern toggle.
*   **Internationalization (i18n):** Interface available in English and French using `next-i18next`.
*   **Responsive Design:** UI adapts to various screen sizes.
*   **Loading & Progress Indication:** Clear visual feedback during transcription and data fetching, including Lottie animations and progress bars.
*   **Refactored Architecture:** Evolved from a monolithic component to a well-structured application with custom hooks and a service layer for better maintainability.

## 📸 Demo

> **Note:** This application requires a backend service to function. The frontend provides an interactive interface for YouTube video transcription and language learning features.

The application includes:
- Clean, modern UI with dark/light mode support
- Responsive design that works on desktop and mobile
- Real-time video synchronization with transcription segments
- Intuitive navigation with keyboard shortcuts

## 🛠️ Tech Stack

*   **Frontend:**
    *   [Next.js 15.3.1](https://nextjs.org/) (React Framework)
    *   [React 19.0.0](https://reactjs.org/)
    *   [TypeScript 5](https://www.typescriptlang.org/)
*   **Styling:**
    *   CSS Modules
    *   Global CSS Variables for Theming (Light/Dark Mode)
    *   [Tailwind CSS 4](https://tailwindcss.com/) (for utility classes and responsive design)
*   **State Management:**
    *   React Context API (for Theme and Global State)
    *   Custom React Hooks (`useState`, `useEffect`, `useCallback`)
*   **Internationalization:**
    *   [next-i18next 15.4.2](https://github.com/i18next/next-i18next)
*   **UI Components & Libraries:**
    *   [react-youtube 10.1.0](https://github.com/tjallingt/react-youtube) (for YouTube player integration)
    *   [@radix-ui/react-slider 1.3.5](https://www.radix-ui.com/docs/primitives/components/slider) (for accessible segment navigation slider)
    *   [lottie-react 2.4.1](https://github.com/gamote/lottie-react) (for animations)
*   **Development & Linting:**
    *   ESLint 9 (with Next.js core-web-vitals configuration)
    *   TypeScript strict mode enabled
*   **API Communication:**
    *   Browser `fetch` API (managed via a dedicated `TranscriptionService`)
*   **Backend Integration:**
    *   RESTful API integration
    *   Support for Firebase Functions or similar serverless architecture

## 📋 Prerequisites

*   [Node.js](https://nodejs.org/) (v18 or higher recommended)
*   [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/)
*   A running backend service for transcription and AI processing

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/qalamus.git
    cd qalamus/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of the frontend directory:
    ```env
    # Backend API Configuration
    NEXT_PUBLIC_API_URL=your_backend_api_url
    
    # Example for local development:
    # NEXT_PUBLIC_API_URL=http://localhost:5001/your-project-id/us-central1
    
    # Example for Firebase Functions:
    # NEXT_PUBLIC_API_URL=https://us-central1-your-project-id.cloudfunctions.net
    ```

4.  **Configure Internationalization (Optional):**
    The app supports English and French by default. Language files are located in `public/locales/`.

5.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```
    
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

6.  **Backend Setup:**
    > **Important:** This frontend requires a compatible backend service. Please refer to the backend documentation for setup instructions.

## 📜 Available Scripts

In the project directory, you can run:

*   `npm run dev` - Runs the app in development mode on port 3000
*   `npm run build` - Builds the app for production to the `.next` folder
*   `npm run start` - Starts the production server (requires `npm run build` first)
*   `npm run lint` - Lints the codebase using ESLint with Next.js configuration

## 🏗️ Project Structure

The project follows a well-organized Next.js structure optimized for scalability:

```
frontend/
├── .gitignore
├── .aidigestignore
├── dev-tracking/         # Development progress documentation
│   ├── week1.md
│   ├── week4.md
│   └── week5.md
├── public/               # Static assets
│   ├── assets/           # Images and static files
│   ├── locales/          # i18n translation files (en, fr)
│   │   ├── en/
│   │   └── fr/
│   ├── bg.png
│   ├── bg-image.png
│   ├── favicon.ico
│   └── *.svg             # Various SVG icons
├── src/
│   ├── components/       # React components
│   │   ├── common/       # Shared components (Layout, DarkModeToggle, etc.)
│   │   ├── transcription/# Transcription-specific components
│   │   └── ui/           # Reusable UI elements
│   ├── contexts/         # React Context providers (ThemeContext)
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Next.js pages and API routes
│   ├── services/         # Business logic and API services
│   ├── styles/           # CSS files (global styles, modules, variables)
│   └── types/            # TypeScript type definitions
├── eslint.config.mjs     # ESLint configuration
├── next-i18next.config.js # Internationalization configuration
├── next.config.ts        # Next.js configuration
├── next-env.d.ts         # Next.js TypeScript definitions
├── package.json          # Dependencies and scripts
├── package-lock.json     # Dependency lock file
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## ⚙️ Configuration Files

*   **`next.config.ts`** - Next.js configuration with TypeScript
*   **`tailwind.config.js`** - Tailwind CSS customization
*   **`next-i18next.config.js`** - Internationalization settings
*   **`tsconfig.json`** - TypeScript compiler options with strict mode
*   **`eslint.config.mjs`** - ESLint rules for code quality

## 🌐 Backend Integration

This frontend is designed to work with a backend service that provides:

*   **Video Processing:** YouTube video download and audio extraction
*   **Transcription:** AI-powered speech-to-text conversion
*   **Translation:** Multi-language translation services
*   **Vocabulary Extraction:** Key term identification and translation
*   **Summarization:** AI-generated content summaries

The backend is expected to expose RESTful endpoints that the `TranscriptionService` can consume.

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1.  **Fork the repository**
2.  **Create a feature branch** (`git checkout -b feature/your-feature-name`)
3.  **Follow the coding standards:**
    *   Use TypeScript for type safety
    *   Follow the existing code style and formatting
    *   Use Allman style brackets for consistency
    *   Add comments for complex logic
4.  **Test your changes** thoroughly
5.  **Run linting** (`npm run lint`) and fix any issues
6.  **Commit your changes** (`git commit -m 'Add some feature'`)
7.  **Push to your branch** (`git push origin feature/your-feature-name`)
8.  **Open a Pull Request**

### Development Guidelines

*   Ensure responsive design for all new components
*   Maintain internationalization support for new text content
*   Follow the established folder structure
*   Add appropriate TypeScript types for new functionality
*   Test dark/light mode compatibility

## 📝 License

This project is proprietary.

## ✨ Acknowledgements

*   **Framework:** Built with [Next.js](https://nextjs.org/), [React](https://reactjs.org/), and [TypeScript](https://www.typescriptlang.org/)
*   **UI Libraries:** [Tailwind CSS](https://tailwindcss.com/), [Radix UI](https://www.radix-ui.com/), [Lottie React](https://github.com/gamote/lottie-react)
*   **Internationalization:** [next-i18next](https://github.com/i18next/next-i18next)
*   **Video Integration:** [react-youtube](https://github.com/tjallingt/react-youtube)

---

📋 **Development Progress:** For detailed development history and feature implementation notes, see the `dev-tracking/` directory which contains comprehensive weekly progress reports.