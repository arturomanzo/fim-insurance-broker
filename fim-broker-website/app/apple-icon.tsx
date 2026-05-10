import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #060f1d 0%, #0d2945 55%, #2FA36B 100%)',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 120,
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
