import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Region } from '../types';
import { useContent } from '../context/ContentContext';
import { SectionEditButton } from './SectionEditButton';
import { ParallaxImage } from './ParallaxImage';

interface RegionsSectionProps {
  onSelectRegion: (region: Region) => void;
  onExploreAll: () => void;
}

export const RegionsSection: React.FC<RegionsSectionProps> = ({
  onSelectRegion,
  onExploreAll,
}) => {
  const { siteData } = useContent();
  const regions = siteData.regions;

  return (
    <section id="origins" className="py-20 lg:py-24 bg-[#F8F4EB] border-t border-[#E5DAC4] relative overflow-hidden">
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-50" />
      <div className="sunbeam-overlay opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-4">
          <SectionEditButton sectionTab="regions" label="Chỉnh sửa Vùng nguyên liệu" />
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-[#9E571E] text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase block mb-3">
              Vùng nguyên liệu
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#241D17] tracking-tight">
              Ba vùng đất – Một sứ mệnh
            </h2>
            <p className="mt-3 text-[#55493D] text-sm sm:text-base leading-relaxed">
              Chúng tôi sở hữu và hợp tác với các vùng trồng dược liệu sạch tại Việt Nam, đảm bảo nguồn nguyên liệu chất lượng, bền vững và thân thiện với môi trường.
            </p>
          </div>

          <button
            id="regions-explore-all-btn"
            onClick={onExploreAll}
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D9C8AC] hover:border-[#8C521E] bg-[#FFFDF9] hover:bg-[#EBDDC8] text-[#241D17] font-medium text-sm transition-all self-start md:self-end cursor-pointer shadow-xs active:scale-95 btn-hover-shimmer"
          >
            <span>Khám phá các vùng nguyên liệu</span>
            <ArrowRight className="w-4 h-4 text-[#8C521E] transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 3-Column Grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {regions.map((region) => (
            <div
              key={region.id}
              id={`region-card-${region.id}`}
              onClick={() => onSelectRegion(region)}
              className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-[#DDD0BC] shadow-xs hover-card-lift hover:border-[#8C521E]/60 cursor-pointer flex flex-col"
            >
              {/* Image Container with Gentle Parallax */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#EFE7D8]">
                <ParallaxImage
                  src={region.image}
                  alt={region.name}
                  speed={0.14}
                  maxOffset={22}
                  scale={1.08}
                  containerClassName="w-full h-full"
                  className="group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle Hover Pill */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241D17]/85 backdrop-blur-sm text-white text-xs font-medium shadow-md">
                    <span>Xem câu chuyện</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E6AF68]" />
                  </span>
                </div>
              </div>

              {/* Bottom Card Info: Title + herbs list + 'Xem' button */}
              <div className="p-5 sm:p-6 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-lg text-[#241D17] group-hover:text-[#8C521E] transition-colors truncate">
                    {region.name}
                  </h3>
                  <p className="text-[#6D5E50] text-sm mt-0.5 line-clamp-1">
                    {region.herbs.join(', ')}
                  </p>
                </div>

                {/* Nút Xem */}
                <button
                  type="button"
                  id={`btn-view-region-${region.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRegion(region);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EBDDC8] group-hover:bg-[#8C521E] text-[#8C521E] group-hover:text-white font-semibold text-xs sm:text-sm transition-all duration-300 shadow-2xs hover:shadow-xs shrink-0 cursor-pointer active:scale-95"
                  aria-label={`Xem vùng nguyên liệu ${region.name}`}
                >
                  <span>Xem</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
