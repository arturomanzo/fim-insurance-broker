import { ImageResponse } from 'next/og'
import FimLogo from '@/components/ui/FimLogo'

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
          background: '#ffffff',
          borderRadius: '36px',
        }}
      >
        <FimLogo variant="icon" height={size.height - 40} />
      </div>
    ),
    { ...size },
  )
}
