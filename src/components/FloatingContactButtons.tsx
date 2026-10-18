import React from 'react';
import { Phone, Facebook } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface FloatingContactButtonsProps {
  facebookUrl?: string;
  zaloPhone?: string;
  hotlinePhone?: string;
}

export const FloatingContactButtons: React.FC<FloatingContactButtonsProps> = ({
  facebookUrl = 'https://www.facebook.com/share/192hEhEYeV/?mibextid=wwXIfr',
  zaloPhone,
  hotlinePhone,
}) => {
  const { siteData } = useContent();
  const rawHotline = hotlinePhone || siteData.texts.contact.hotline || '0833-15-3388';
  const cleanPhone = (zaloPhone || rawHotline).replace(/[^0-9]/g, '');

  return (
    <div
      aria-label="Kênh liên hệ nhanh"
      className="floating-contact-buttons fixed right-3.5 sm:right-5 md:right-6 bottom-6 sm:bottom-8 z-40 flex flex-col items-center gap-3 sm:gap-3.5 select-none"
    >
      {/* 1. Facebook Messenger / Fanpage Button */}
      <div className="relative group flex items-center justify-end">
        {/* Tooltip Label */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#18261D]/90 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg border border-white/10 hidden sm:block">
          Facebook Vườn Tinh Dầu
        </span>

        {/* Concentric Pulsing Wave Ring for Facebook */}
        <div className="absolute inset-0 rounded-full bg-[#1877F2]/45 animate-fb-wave pointer-events-none" />

        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Nhắn tin qua Facebook Vườn Tinh Dầu"
          title="Nhắn tin Facebook"
          className="floating-contact-btn relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white flex items-center justify-center shadow-lg hover:shadow-blue-500/50 border-2 border-white/90 cursor-pointer animate-icon-float"
        >
          <Facebook className="w-6 h-6 sm:w-6.5 sm:h-6.5 fill-current animate-icon-wobble transition-transform group-hover:scale-110 drop-shadow-xs" />
        </a>
      </div>

      {/* 2. Zalo Chat Button */}
      <div className="relative group flex items-center justify-end">
        {/* Tooltip Label */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#18261D]/90 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg border border-white/10 hidden sm:block">
          Chat Zalo: {rawHotline}
        </span>

        {/* Concentric Pulsing Wave Ring for Zalo */}
        <div className="absolute inset-0 rounded-full bg-[#0068FF]/45 animate-zalo-wave pointer-events-none" />

        <a
          href={`https://zalo.me/${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat trực tuyến qua Zalo"
          title="Chat Zalo"
          style={{ animationDelay: '0.6s' }}
          className="floating-contact-btn relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0068FF] hover:bg-[#0058dd] text-white flex items-center justify-center shadow-lg hover:shadow-blue-600/50 border-2 border-white/90 cursor-pointer overflow-hidden p-0 animate-icon-float"
        >
          {/* Official Zalo Circular Icon matching user uploaded reference */}
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full animate-icon-heartbeat transition-transform group-hover:scale-110"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="250" cy="250" r="250" fill="#0068FF" className="transition-all animate-zalo-circle" />
            <g transform="translate(68.3, 186.1) scale(0.291)">
              <path
                fill="#FFFFFF"
                fillRule="evenodd"
                d="m649.69 129.68v-23.37h70.02v328.67h-40.06c-16.49 0-29.87-13.32-29.96-29.78-0.01 0.01-0.02 0.01-0.03 0.02-28.2 20.62-63.06 32.87-100.71 32.87-94.3 0-170.76-76.41-170.76-170.65s76.46-170.64 170.76-170.64c37.65 0 72.51 12.24 100.71 32.86 0.01 0.01 0.02 0.01 0.03 0.02zm-289.64-129.06v10.65c0 19.88-2.66 36.1-15.57 55.14l-1.56 1.78c-2.82 3.2-9.44 10.71-12.59 14.78l-224.76 282.11h254.48v39.94c0 16.55-13.43 29.96-29.98 29.96h-329.73v-18.83c0-23.07 5.73-33.35 12.97-44.07l239.61-296.57h-242.59v-74.89h349.72zm444.58 434.36c-13.77 0-24.97-11.19-24.97-24.94v-409.42h74.94v434.36h-49.97zm271.56-340.24c94.95 0 171.91 76.98 171.91 171.79 0 94.9-76.96 171.88-171.91 171.88-94.96 0-171.91-76.98-171.91-171.88 0-94.81 76.95-171.79 171.91-171.79zm-527.24 273.1c55.49 0 100.46-44.94 100.46-100.4 0-55.37-44.97-100.32-100.46-100.32s-100.47 44.95-100.47 100.32c0 55.46 44.98 100.4 100.47 100.4zm527.24-0.17c55.82 0 101.12-45.27 101.12-101.14 0-55.78-45.3-101.05-101.12-101.05-55.91 0-101.13 45.27-101.13 101.05 0 55.87 45.22 101.14 101.13 101.14z"
              />
            </g>
          </svg>
        </a>
      </div>

      {/* 3. Phone Hotline Button with Pulsing Wave Rings (matching user reference image) */}
      <div className="relative group flex items-center justify-end">
        {/* Tooltip Label */}
        <span className="pointer-events-none absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#18261D]/90 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg border border-white/10 hidden sm:block">
          Hotline: <strong className="text-amber-300 font-bold">{rawHotline}</strong> (Gọi ngay)
        </span>

        {/* Concentric Pulsing Wave Rings */}
        <div className="absolute inset-0 rounded-full bg-red-500/40 animate-contact-wave pointer-events-none" />
        <div className="absolute inset-0 rounded-full bg-orange-500/35 animate-contact-wave-delayed pointer-events-none" />

        <a
          href={`tel:${cleanPhone}`}
          aria-label={`Gọi điện thoại hotline: ${rawHotline}`}
          title={`Gọi ngay: ${rawHotline}`}
          className="floating-contact-btn relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#EA580C] via-[#DC2626] to-[#EF4444] hover:from-[#C2410C] hover:to-[#DC2626] text-white flex items-center justify-center shadow-xl shadow-red-500/40 border-2 border-white cursor-pointer"
        >
          <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white animate-phone-ring" />
        </a>
      </div>
    </div>
  );
};
