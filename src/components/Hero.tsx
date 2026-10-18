import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SectionEditButton } from './SectionEditButton';
import { useParallax } from '../hooks/useParallax';

interface HeroProps {
  onExploreStory: () => void;
  onExploreProducts?: () => void;
}

export const HERO_SLIDES = [
  {
    url: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198236/Farmers_harvesting_medicinal_pla__2K_20261005175834.jpg',
    title: 'Thu hoạch dược liệu sạch Tây Giang',
    alt: 'Người nông dân thu hoạch dược liệu sạch vùng cao',
  },
  {
    url: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198236/Luxury_wellness_lifestyle_banner__2K_20261005180248.jpg',
    title: 'Liệu pháp thư giãn & Chữa lành tự nhiên',
    alt: 'Không gian sống xanh và tinh dầu thư giãn cao cấp',
  },
  {
    url: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198237/Farmers_harvesting_medicinal_pla__2K_20261005180307.jpg',
    title: 'Bàn tay cần mẫn của bà con bản địa',
    alt: 'Bà con nông dân vùng cao chăm sóc dược liệu',
  },
  {
    url: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198237/Scientific_laboratory_extracting__2K_20261005180203.jpg',
    title: 'Nghiên cứu & Chiết xuất chuẩn VSA LAB',
    alt: 'Phòng thí nghiệm chiết xuất tinh dầu công nghệ cao VSA LAB',
  },
  {
    url: 'https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198293/Farmers_harvesting_medicinal_for__2K_20261005180415.jpg',
    title: 'Hành trình gìn giữ hệ sinh thái rừng',
    alt: 'Đại ngàn Trường Sơn và rừng dược liệu tự nhiên',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreStory }) => {
  const { siteData } = useContent();
  const { hero } = siteData.texts;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const { ref: heroBgRef, style: heroBgStyle } = useParallax<HTMLDivElement>({
    speed: 0.16,
    maxOffset: 45,
    scale: 1.12,
  });

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  return (
    <section
      id="hero"
      className="relative min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden bg-stone-950"
    >
      {/* Background Slideshow with Parallax & Ken Burns effect */}
      <div ref={heroBgRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div style={heroBgStyle} className="w-full h-full relative transition-transform duration-100 ease-out">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentSlide;
            return (
              <div
                key={slide.url}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <img
                  src={slide.url}
                  alt={slide.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  className={`w-full h-full object-cover object-center sm:object-right transition-transform duration-6000 ease-out ${
                    isActive ? 'scale-105' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
              </div>
            );
          })}
        </div>

        {/* Cinematic Gradient Overlays to keep typography crystal clear while revealing scenery */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-stone-950/92 via-stone-950/65 to-stone-950/25 pointer-events-none" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-stone-950/70 via-transparent to-stone-950/40 pointer-events-none" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:py-24 w-full">
        {/* Admin Quick Edit Button */}
        <div className="mb-3">
          <SectionEditButton sectionTab="hero" label="Chỉnh sửa Banner Hero" />
        </div>

        {/* Hero Text Content */}
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow Label */}
          <p className="text-amber-200/95 text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-2 sm:mb-3 drop-shadow-sm flex items-center gap-2">
            <span className="w-6 h-[1.5px] bg-amber-400/80 inline-block" />
            <span>{hero.eyebrow}</span>
          </p>

          {/* Main Title */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.18] mb-3 sm:mb-4 drop-shadow-md whitespace-pre-line">
            {hero.title}
          </h1>

          {/* Subtitle Description */}
          <p className="text-stone-100/95 text-xs sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8 max-w-xl drop-shadow-sm whitespace-pre-line">
            {hero.subtitle}
          </p>

          {/* Primary Action Button (Pill style matching screenshot) */}
          <div className="w-full sm:w-auto">
            <button
              id="hero-explore-story-btn"
              onClick={onExploreStory}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#8C521E]/95 hover:bg-[#724116] text-[#FAF5EB] font-medium text-xs sm:text-sm md:text-base shadow-2xl hover:shadow-black/50 transition-all duration-300 border border-[#E8DEC8]/60 backdrop-blur-md cursor-pointer drop-shadow-md active:scale-[0.98] btn-hover-shimmer"
            >
              <span>{hero.ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#F5EDE1] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Slideshow Controller Toolbar at Bottom */}
        <div className="mt-8 sm:mt-12 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
          {/* Active slide title & indicator */}
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-mono text-xs sm:text-sm font-bold tracking-wider">
              0{currentSlide + 1} <span className="text-white/40 font-normal">/ 0{HERO_SLIDES.length}</span>
            </span>
            <div className="hidden sm:block h-3.5 w-px bg-white/20" />
            <span className="hidden sm:inline-block text-white/80 text-xs tracking-wide italic">
              {HERO_SLIDES[currentSlide].title}
            </span>
          </div>

          {/* Interactive Navigation Dots & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2 mr-2">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide
                      ? 'w-7 sm:w-9 bg-[#E6C285] shadow-[0_0_10px_rgba(230,194,133,0.7)]'
                      : 'w-2 bg-white/35 hover:bg-white/60'
                  }`}
                  aria-label={`Chuyển đến ảnh ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Arrows */}
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20 p-0.5">
              <button
                onClick={prevSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer active:scale-90"
                aria-label="Ảnh trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer active:scale-90"
                aria-label={isPlaying ? 'Tạm dừng slideshow' : 'Tiếp tục slideshow'}
                title={isPlaying ? 'Tạm dừng' : 'Tiếp tục'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={nextSlide}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer active:scale-90"
                aria-label="Ảnh kế tiếp"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

