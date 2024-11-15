import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'Steam Summarize'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
  // Font
  const geistSans = fetch(new URL('./fonts/GeistVF.woff', import.meta.url)).then((res) =>
    res.arrayBuffer()
  )

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 72,
          background: '#1b2838', // Steam's dark blue background
          color: '#ffffff', // White text
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        <div>Steam Summarize</div>
        <div style={{ fontSize: 32, color: '#66c0f4' }}>Analyze Your Steam Library</div>
      </div>
    ),
    // ImageResponse options
    {
      ...size,
      fonts: [
        {
          name: 'Geist Sans',
          data: await geistSans,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
