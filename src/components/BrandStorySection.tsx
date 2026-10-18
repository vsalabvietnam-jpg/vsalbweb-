import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND_STORY_BG } from '../data/mockData';
import { useContent } from '../context/ContentContext';
import { SectionEditButton } from './SectionEditButton';
import { useParallax } from '../hooks/useParallax';

interface BrandStorySectionProps {
  onExploreJourney?: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onExploreJourney }) => {
  const { siteData } = useContent();
  const { brandStory } = siteData.texts;

  const { ref: bgRef, style: bgParallaxStyle } = useParallax<HTMLDivElement>({
    speed: 0.16,
    maxOffset: 45,
    scale: 1.15,
  });

  return (
    <section id="brand-story" className="relative bg-[#201A16] text-[#FAF5EB] py-14 sm:py-16 lg:py-20 overflow-hidden border-t border-b border-[#3B3028]">
      {/* Background Image with Gentle Parallax */}
      <div ref={bgRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div style={bgParallaxStyle} className="w-full h-full transition-transform duration-100 ease-out">
          <img
            src={brandStory?.bgImage || BRAND_STORY_BG}
            alt="Câu chuyện thương hiệu Vườn Tinh Dầu"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Warm Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#201A16]/95 via-[#201A16]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-transparent to-[#201A16]/70" />
      </div>

      {/* Subtle Sunbeam & Leaf Shadows */}
      <div className="leaf-shadow-ambient opacity-20" />
      <div className="sunbeam-overlay opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-3">
          <SectionEditButton sectionTab="brandStory" label="Chỉnh sửa Câu chuyện thương hiệu" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story text and CTA */}
          <div className="lg:col-span-7 space-y-4 max-w-xl">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[38px] font-bold text-white tracking-tight leading-[1.2]">
              {brandStory.title}
            </h2>

            <div className="space-y-2.5 text-[#E0D5C5] text-xs sm:text-sm md:text-base leading-relaxed font-light">
              <p className="italic text-[#F0D5A8] font-serif">
                "{brandStory.quote}"
              </p>
              <p>
                {brandStory.p1}
              </p>
              <p>
                {brandStory.p2}
              </p>
            </div>

            {/* Key stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2.5 border-t border-[#6A5742]/60">
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#E6C285]">
                  {brandStory.stat1Number}
                </div>
                <div className="text-[11px] text-[#C9BAA5]">
                  {brandStory.stat1Label}
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#E6C285]">
                  {brandStory.stat2Number}
                </div>
                <div className="text-[11px] text-[#C9BAA5]">
                  {brandStory.stat2Label}
                </div>
              </div>
              <div>
                <div className="font-serif text-xl sm:text-2xl font-bold text-[#E6C285]">
                  {brandStory.stat3Number}
                </div>
                <div className="text-[11px] text-[#C9BAA5]">
                  {brandStory.stat3Label}
                </div>
              </div>
            </div>

            <div className="pt-1.5">
              <button
                id="brand-story-cta-btn"
                onClick={onExploreJourney}
                className="group inline-flex items-center gap-2.5 px-6 py-2.5 sm:py-3 rounded-full border border-[#D9C8AC] bg-[#8C521E] hover:bg-[#724116] text-white text-xs sm:text-sm md:text-base font-medium transition-all shadow-lg hover:shadow-black/30 cursor-pointer active:scale-[0.98]"
              >
                <span>Khám phá hành trình của chúng tôi</span>
                <ArrowRight className="w-4 h-4 text-[#F5EDE1] transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: Floating cursive calligraphy */}
          <div className="lg:col-span-5 flex justify-end">
            <div className="text-right max-w-sm pointer-events-none select-none">
              <p className="font-['Dancing_Script',cursive] text-2xl sm:text-3xl lg:text-4xl text-amber-200/90 font-bold italic leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]">
                Tự hào Việt Nam <br />
                <span className="text-xl sm:text-2xl lg:text-3xl text-stone-100 font-normal">
                  những hương thơm tự nhiên
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
