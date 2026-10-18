import React from 'react';

interface TopRunningTickerProps {
  className?: string;
}

export const TopRunningTicker: React.FC<TopRunningTickerProps> = ({ className = '' }) => {
  const tickerText = 'Hành trình của hương thơm – Câu chuyện của thiên nhiên';

  return (
    <aside
      id="top-running-ticker"
      aria-label="Thông điệp thương hiệu"
      className={`w-full bg-[#18261D] text-[#EFE4D2] border-b border-[#2C3E30]/70 py-1.5 overflow-hidden select-none z-50 ${className}`}
    >
      <div className="flex animate-marquee-infinite text-[11px] sm:text-xs font-medium tracking-wide">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx} className="flex items-center shrink-0">
            <span className="font-serif italic text-[#F1E0C5] text-xs sm:text-[13px] tracking-normal font-medium">
              {tickerText}
            </span>
            <span className="mx-6 sm:mx-8 text-[#C99B52] opacity-80 text-[10px]">✦</span>
          </div>
        ))}
      </div>
    </aside>
  );
};
