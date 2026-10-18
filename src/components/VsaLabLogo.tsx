import React from 'react';

interface VsaLabLogoIconProps {
  className?: string;
  size?: number;
  isLight?: boolean;
}

export const VsaLabLogoIcon: React.FC<VsaLabLogoIconProps> = ({
  className = 'w-10 h-10',
  size = 48,
  isLight = false,
}) => {
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="VSALAB Logo"
    >
      <defs>
        {/* Golden Drop Gradient */}
        <linearGradient id="vsaGoldDrop" x1="60" y1="8" x2="60" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F9D776" />
          <stop offset="50%" stopColor="#DF9F28" />
          <stop offset="100%" stopColor="#A86F12" />
        </linearGradient>

        {/* Drop Gleam Highlight */}
        <linearGradient id="vsaGleam" x1="56" y1="12" x2="63" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Green Leaf Gradient */}
        <linearGradient id="vsaGreenLeaf" x1="40" y1="40" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E824C" />
          <stop offset="100%" stopColor="#0B4323" />
        </linearGradient>

        {/* Golden Arc Gradient */}
        <linearGradient id="vsaGoldArc" x1="20" y1="20" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E5B54E" />
          <stop offset="50%" stopColor="#BF8826" />
          <stop offset="100%" stopColor="#8C5C0F" />
        </linearGradient>

        {/* Green Arc Gradient */}
        <linearGradient id="vsaGreenArc" x1="45" y1="50" x2="95" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#166534" />
          <stop offset="100%" stopColor="#073318" />
        </linearGradient>
      </defs>

      {/* --- 1. Outer Golden Crescent Arc (Left to bottom) --- */}
      <path
        d="M 52 20 C 32 24 20 40 22 62 C 24 82 42 96 66 94 C 54 94 40 88 34 76 C 28 64 32 46 44 32 C 47 28 50 24 52 20 Z"
        fill={isLight ? '#F5E2B3' : 'url(#vsaGoldArc)'}
      />

      {/* --- 2. Inner Green Crescent Arc (Right to bottom) --- */}
      <path
        d="M 68 20 C 73 24 76 29 80 34 C 91 48 93 68 83 82 C 75 92 62 95 48 95 C 62 97 78 93 88 82 C 100 66 98 42 82 28 C 77 24 73 22 68 20 Z"
        fill={isLight ? '#FFFFFF' : 'url(#vsaGreenArc)'}
      />

      {/* --- 3. Base Horizontal Green Mound / Foundation Arc --- */}
      <path
        d="M 36 78 C 48 83 72 83 84 78 C 80 84 70 88 60 88 C 50 88 40 84 36 78 Z"
        fill={isLight ? '#E8DEC9' : 'url(#vsaGreenArc)'}
      />

      {/* --- 4. Central Golden Drop of Essential Oil --- */}
      <path
        d="M 60 10 C 60 10 50 25 50 34 C 50 42 54.5 46.5 60 46.5 C 65.5 46.5 70 42 70 34 C 70 25 60 10 60 10 Z"
        fill={isLight ? '#FFEDBA' : 'url(#vsaGoldDrop)'}
      />
      {/* Drop Inner Soft Specular Gleam */}
      <path
        d="M 57 16 C 57 16 53 26 53 33 C 53 37 55 40 57 41 C 55 39 54 35 54 32 C 54 26 57 16 57 16 Z"
        fill="url(#vsaGleam)"
      />

      {/* --- 5. Small Golden Stem / Droplet Connector --- */}
      <rect x="58.5" y="48" width="3" height="8" rx="1.5" fill={isLight ? '#FFEDBA' : '#DF9F28'} />

      {/* --- 6. Left Green Sprouting Leaf --- */}
      <path
        d="M 60 76 C 59 62 47 48 34 46 C 34 58 45 74 60 76 Z"
        fill={isLight ? '#FFFFFF' : 'url(#vsaGreenLeaf)'}
      />
      {/* Left Leaf Center Vein */}
      <path
        d="M 60 76 C 52 64 45 54 36 48"
        stroke={isLight ? '#D4C5A9' : '#34D399'}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* --- 7. Right Green Sprouting Leaf --- */}
      <path
        d="M 60 76 C 61 62 73 48 86 46 C 86 58 75 74 60 76 Z"
        fill={isLight ? '#FFFFFF' : 'url(#vsaGreenLeaf)'}
      />
      {/* Right Leaf Center Vein */}
      <path
        d="M 60 76 C 68 64 75 54 84 48"
        stroke={isLight ? '#D4C5A9' : '#34D399'}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
};
