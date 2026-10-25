import { ImageResponse } from 'next/og'
import FimLogo from '@/components/ui/FimLogo'

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
          background: '#ffffff',
        }}
      >
        <FimLogo variant="icon" height={size.height - 44} />
      </div>
    ),
    { ...size },
  )
}
