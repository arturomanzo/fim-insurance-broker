import { ImageResponse } from 'next/og'

export const size = { width: 192, height: 192 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #091c4a 0%, #0b4a7a 55%, #00b4c8 100%)',
          borderRadius: '36px',
        }}
      >
        {/* White F letterform */}
        <div
          style={{
            color: 'white',
            fontSize: 128,
            fontWeight: 900,
            fontFamily: 'Georgia, serif',
            lineHeight: 1,
            marginTop: -8,
          }}
        >
          F
        </div>
      </div>
    ),
    { ...size },
  )
}
