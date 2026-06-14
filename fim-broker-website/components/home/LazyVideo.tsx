'use client'

import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  className?: string
  /** Margine di prefetch: avvia il caricamento poco prima che il video entri in viewport */
  rootMargin?: string
}

/**
 * Video decorativo caricato in modo differito: la sorgente viene impostata solo
 * quando la sezione entra (o sta per entrare) nel viewport. Evita di scaricare
 * il file al load iniziale della pagina, liberando banda per le risorse critiche
 * e migliorando LCP/TBT su mobile.
 */
export default function LazyVideo({ src, className, rootMargin = '200px' }: LazyVideoProps) {
  const [load, setLoad] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (load) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [load, rootMargin])

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className={className}
    >
      {load && <source src={src} type="video/mp4" />}
    </video>
  )
}
