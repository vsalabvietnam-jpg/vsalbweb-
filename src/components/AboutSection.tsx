import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionEditButton } from './SectionEditButton';
import { ParallaxImage } from './ParallaxImage';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  const { siteData } = useContent();
  const { about } = siteData.texts;

  return (
    <section id="about" className="py-14 sm:py-20 lg:py-28 bg-[#F8F3EA] overflow-hidden border-b border-[#E5DAC4] relative">
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-50" />
      <div className="sunbeam-overlay opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-4">
          <SectionEditButton sectionTab="about" label="Chỉnh sửa Giới thiệu (About)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Story text and CTA */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 max-w-xl">
            <span className="text-[#9E571E] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase block">
              {about.eyebrow}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#241D17] tracking-tight leading-[1.2] whitespace-pre-line">
              {about.title}
            </h2>

            <p className="text-[#4D4236] text-sm sm:text-base md:text-lg leading-relaxed font-normal whitespace-pre-line">
              {about.description}
            </p>

            <div className="pt-2">
              <button
                id="about-cta-learn-more-btn"
                onClick={onLearnMore}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#8C521E] text-[#FAF5EB] font-medium text-sm sm:text-base hover:bg-[#724116] transition-all duration-300 shadow-md hover:shadow-xl border border-[#D9C8AC]/50 cursor-pointer active:scale-[0.98] btn-hover-shimmer"
              >
                <span>{about.ctaText}</span>
                <ArrowRight className="w-4 h-4 text-[#F5EDE1] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Farmer photo with cursive script */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-stone-100 aspect-[4/3] sm:aspect-[16/11]">
              <ParallaxImage
                src={about.farmerImage || "/images/background/nong-dan-cham-soc-duoc-lieu.jpg"}
                alt="Người nông dân thu hoạch dược liệu sạch"
                speed={0.12}
                maxOffset={25}
                scale={1.1}
                containerClassName="w-full h-full"
                className="transform hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Soft gradient in bottom-left for cursive calligraphy legibility */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent pointer-events-none" />

              {/* Calligraphy positioned in bottom-left corner */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-left max-w-xs sm:max-w-sm pointer-events-none select-none z-10">
                <div className="pl-3 sm:pl-4 border-l-2 border-amber-300/70 backdrop-blur-[2px]">
                  <p className="font-['Dancing_Script',cursive] text-xl sm:text-2xl md:text-3xl text-amber-100 font-bold italic leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] whitespace-pre-line">
                    {about.quote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

