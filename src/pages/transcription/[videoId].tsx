import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { TranscriptionPage } from '../../components/transcription/TranscriptionPage';

export default function VideoTranscriptionRoute() 
{
  const { query, isReady } = useRouter();
  const videoId = isReady && typeof query.videoId === 'string' ? query.videoId : null;
  const lang = isReady && typeof query.lang === 'string' ? query.lang : 'fr';

  return (
    <TranscriptionPage 
      videoId={videoId} 
      language={lang} 
      isReady={isReady} 
    />
  );
}

export const getStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export async function getStaticProps({ locale }: { locale?: string }) 
{
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'fr', ['common'])),
    },
  };
} 