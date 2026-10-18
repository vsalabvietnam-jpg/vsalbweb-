import React from 'react';
import { Droplet, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

export const FeatureBar: React.FC = () => {
  const features = [
    {
      id: 'feature-pure',
      title: '100% nguyên chất',
      subtitle: 'Không pha tạp',
      icon: Droplet,
    },
    {
      id: 'feature-origin',
      title: 'Truy xuất nguồn gốc',
      subtitle: 'Rõ ràng, minh bạch',
      icon: MapPin,
    },
    {
      id: 'feature-quality',
      title: 'Kiểm định chất lượng',
      subtitle: 'Theo tiêu chuẩn quốc tế',
      icon: ShieldCheck,
    },
    {
      id: 'feature-partner',
      title: 'Đồng hành cùng bạn',
      subtitle: 'Vì một cuộc sống xanh',
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      id="feature-bar"
      className="relative z-20 bg-[#F5EFE4] border-b border-[#E5DAC4] shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5DAC4]">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className={`py-5 sm:py-6 px-4 lg:px-6 flex items-center gap-4 transition-all duration-300 hover:bg-[#FFFDF9] cursor-default group ${
                  index === 0 ? 'sm:pl-2' : ''
                } ${index === 3 ? 'sm:pr-2' : ''}`}
              >
                <div className="w-11 h-11 rounded-full bg-[#EBDDC8] group-hover:bg-[#8C521E] text-[#8C521E] group-hover:text-white flex items-center justify-center shrink-0 border border-[#D9C8AC] shadow-xs transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  <Icon className="w-5 h-5 transition-colors" />
                </div>
                <div>
                  <h2 className="text-[#251E18] group-hover:text-[#8C521E] font-bold text-sm sm:text-[15px] tracking-tight leading-snug transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[#6E6153] text-xs sm:text-[13px] mt-0.5 leading-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
