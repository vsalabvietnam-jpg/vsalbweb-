import React from 'react';
import {
  Sprout,
  Leaf,
  Flame,
  Microscope,
  PackageCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { DISTILLATION_BG } from '../data/mockData';
import { ProcessStep } from '../types';
import { SectionEditButton } from './SectionEditButton';
import { useParallax } from '../hooks/useParallax';
import { useContent } from '../context/ContentContext';

interface ProcessSectionProps {
  onSelectStep?: (step: ProcessStep) => void;
  onExploreMore?: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sprout,
  Leaf,
  Flame,
  Microscope,
  PackageCheck,
  Sparkles,
};

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onSelectStep, onExploreMore }) => {
  const { siteData } = useContent();
  const processSteps = siteData.processSteps?.length ? siteData.processSteps : [];

  const { ref: distillationRef, style: distillationParallaxStyle } = useParallax<HTMLDivElement>({
    speed: 0.14,
    maxOffset: 35,
    scale: 1.12,
  });

  const fallbackSteps = [
    { number: '01', title: 'Trồng trọt chọn lọc', iconName: 'Sprout' },
    { number: '02', title: 'Thu hoạch đúng mùa', iconName: 'Leaf' },
    { number: '03', title: 'Chiết xuất công nghệ hiện đại', iconName: 'Flame' },
    { number: '04', title: 'Kiểm nghiệm chất lượng', iconName: 'Microscope' },
    { number: '05', title: 'Đóng chai và bảo quản', iconName: 'PackageCheck' },
  ];

  const displaySteps = processSteps.length > 0 ? processSteps : fallbackSteps;

  return (
    <section
      id="process"
      className="relative bg-[#F7F2E7] text-[#241D17] py-20 lg:py-24 overflow-hidden border-t border-b border-[#E5DAC4]"
    >
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-50" />
      <div className="sunbeam-overlay opacity-65" />

      {/* Background Image on Right Side with Gentle Parallax */}
      <div ref={distillationRef} className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-25 overflow-hidden pointer-events-none">
        <div style={distillationParallaxStyle} className="w-full h-full transition-transform duration-100 ease-out">
          <img
            src={DISTILLATION_BG}
            alt="Quy trình chưng cất tinh dầu"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#F7F2E7] via-[#F7F2E7]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2E7] via-transparent to-[#F7F2E7]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-4">
          <SectionEditButton sectionTab="process" label="Chỉnh sửa Quy trình chưng cất" />
        </div>

        {/* Top Header Row */}
        <div className="max-w-xl mb-16 lg:mb-20">
          <span className="text-[#9E571E] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase block mb-3">
            Quy trình sản xuất
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-[#241D17] mb-4">
            Từ cây đến chai
          </h2>
          <p className="text-[#52463A] text-sm sm:text-base leading-relaxed font-normal mb-6">
            Mỗi giọt tinh dầu đều trải qua quy trình khép kín, nghiêm ngặt để giữ trọn vẹn tinh chất thiên nhiên và đảm bảo chất lượng tốt nhất.
          </p>
          <button
            id="process-view-details-btn"
            onClick={onExploreMore}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#D9C8AC] hover:border-[#B8853C] bg-[#EBDDC8] hover:bg-[#E2D0B6] text-[#241D17] text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95 btn-hover-shimmer"
          >
            <span>Xem chi tiết quy trình</span>
            <ArrowRight className="w-4 h-4 text-[#8C521E] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 5 Process Steps Row matching screenshot */}
        <div className="relative">
          {/* Connecting Line for desktop */}
          <div className="hidden lg:block absolute top-7 left-14 right-14 h-[1px] bg-[#D9C8AC] -z-0" />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-8 relative z-10">
            {displaySteps.map((item, index) => {
              const Icon = (item.iconName && iconMap[item.iconName]) || Leaf;
              const isLastOnMobile = index === displaySteps.length - 1;
              return (
                <div
                  key={item.number || index}
                  id={`process-item-${item.number || index}`}
                  onClick={() => {
                    if (onSelectStep) {
                      onSelectStep(item as any);
                    } else if (onExploreMore) {
                      onExploreMore();
                    }
                  }}
                  className={`flex flex-col items-center text-center group cursor-pointer transition-transform duration-300 hover:-translate-y-1 ${
                    isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  {/* Step Number Badge */}
                  <span className="text-[10px] font-mono tracking-widest text-[#9E571E] font-bold mb-1.5 uppercase group-hover:text-[#8C521E]">
                    Bước {item.number ? (item.number.length === 1 ? `0${item.number}` : item.number) : `0${index + 1}`}
                  </span>

                  {/* Circle Icon */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#FFFDF9] border-2 border-[#D9C8AC] group-hover:border-[#8C521E] group-hover:bg-[#FFF8EE] flex items-center justify-center text-[#8C521E] group-hover:text-[#5E340E] transition-all shadow-xs group-hover:scale-115 group-hover:shadow-md mb-2.5">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.5]" />
                  </div>

                  {/* Title */}
                  <p className="text-[#251E18] group-hover:text-[#8C521E] text-xs sm:text-sm font-medium leading-snug max-w-[140px] transition-colors">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
