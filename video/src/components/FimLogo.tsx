import React from 'react';
import { BRAND } from '../lib/brand';

interface FimLogoProps {
  width?: number;
  variant?: 'light' | 'dark';
}

export const FimLogo: React.FC<FimLogoProps> = ({ width = 320, variant = 'light' }) => {
  const textColor = variant === 'light' ? BRAND.white : BRAND.primary;
  const id = variant;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 100"
      width={width}
      height={width / 4}
    >
      <defs>
        <linearGradient id={`sg-${id}`} x1="7" y1="97" x2="93" y2="1" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={BRAND.primaryDark} />
          <stop offset="100%" stopColor={BRAND.primary} />
        </linearGradient>
        <linearGradient id={`ag-${id}`} x1="55" y1="30" x2="93" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={BRAND.accent} />
          <stop offset="100%" stopColor={BRAND.accentLight} />
        </linearGradient>
      </defs>

      {/* Scudo */}
      <path d="M7,15 C7,5 15,1 24,1 L76,1 C85,1 93,5 93,15 L93,56 C93,78 50,97 50,97 C50,97 7,78 7,56 Z" fill={`url(#sg-${id})`} />
      {/* F - layer profondità */}
      <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" fillOpacity={0.18} transform="translate(5,4)" />
      <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" fillOpacity={0.35} transform="translate(2.5,2)" />
      {/* F principale */}
      <path d="M26,24 L26,75 L37,75 L37,52 L59,52 L59,42 L37,42 L37,33 L63,33 L63,24 Z" fill="white" />
      {/* Freccia verde */}
      <polygon points="66,1 93,1 93,28" fill={`url(#ag-${id})`} />
      <polygon points="50,28 59,18 84,5 75,15" fill={`url(#ag-${id})`} />

      {/* Testo FIM */}
      <text x="110" y="64" fontFamily="'Montserrat','Arial Black',sans-serif" fontWeight="900" fontSize="58" fill={textColor} letterSpacing="1">FIM</text>
      {/* INSURANCE BROKER */}
      <text x="113" y="83" fontFamily="'Montserrat',Arial,sans-serif" fontWeight="700" fontSize="13.5" fill={BRAND.accent} letterSpacing="4">INSURANCE BROKER</text>
    </svg>
  );
};
