const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/learn-arabic-ee19c/us-central1"

export async function transcribeVideo(videoId: string, language: string) {
  const response = await fetch(`${BASE_URL}/processVideo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        videoId: videoId,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        targetLanguage: language,
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Failed to transcribe the video')
  }

  const data = await response.json()
  return data
}
