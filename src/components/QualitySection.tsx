import React from 'react';
import { Leaf, Users, Award, Shield, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { CERTIFICATIONS } from '../data/mockData';
import { SectionEditButton } from './SectionEditButton';

export const QualitySection: React.FC = () => {
  const coreValues = [
    {
      id: 'value-nature',
      title: 'Thiên nhiên',
      subtitle: 'Là nền tảng khởi nguồn',
      desc: 'Chọn lọc từ những vùng dược liệu bản địa nguyên sinh, tôn trọng chu kỳ sinh trưởng tự nhiên và không can thiệp hóa chất biến đổi gen.',
      icon: Leaf,
      badge: '100% Organic',
    },
    {
      id: 'value-human',
      title: 'Con người',
      subtitle: 'Là trung tâm phụng sự',
      desc: 'Tạo sinh kế bền vững, thu nhập ổn định cho bà con nông dân và đồng bào thiểu số Cơ Tu tại các vùng nguyên liệu liên kết.',
      icon: Users,
      badge: 'Thương mại công bằng',
    },
    {
      id: 'value-quality',
      title: 'Chất lượng',
      subtitle: 'Là cam kết trọn vẹn',
      desc: 'Mỗi giọt tinh dầu đều được kiểm nghiệm phân tích quang phổ khối GC-MS định kỳ tại phòng lab độc lập, minh bạch và an toàn tuyệt đối.',
      icon: Award,
      badge: 'Kiểm nghiệm độc lập',
    },
  ];

  return (
    <section id="quality" className="py-20 lg:py-28 bg-[#FAFBF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-6">
          <SectionEditButton sectionTab="hero" label="Chỉnh sửa Nội dung" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] text-xs font-semibold tracking-wider uppercase mb-3">
            <Shield className="w-3.5 h-3.5 text-[#B2641E]" />
            <span>Giá trị cốt lõi & Cam kết</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold text-[#241D17] tracking-normal sm:tracking-tight mb-4 leading-tight">
            Không chỉ là sản phẩm — <span className="text-[#8C521E] italic">Đó là giá trị sống</span>
          </h2>
          <p className="text-[#55493D] text-base sm:text-lg leading-relaxed font-light max-w-3xl mx-auto">
            Chúng tôi tin rằng vẻ đẹp và sức khỏe bền vững phải bắt nguồn từ sự hòa hợp giữa con người, thiên nhiên và quy chuẩn khoa học chuẩn mực.
          </p>
        </div>

        {/* 3 Columns Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coreValues.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={item.id}
                className="bg-white rounded-2xl p-8 border border-[#DDD0BC] hover:border-[#8C521E] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5EDE1] border border-[#DDD0BC] flex items-center justify-center text-[#8C521E] group-hover:bg-[#8C521E] group-hover:text-white transition-all duration-300">
                      <Icon className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#8C521E] uppercase tracking-wider bg-[#EBDDC8] px-2.5 py-1 rounded-full border border-[#D9C8AC]">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#241D17] mb-1 group-hover:text-[#8C521E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9E571E] mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-[#55493D] text-sm sm:text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5DAC4] flex items-center gap-2 text-xs font-medium text-[#8C521E]">
                  <CheckCircle2 className="w-4 h-4 text-[#8C521E]" />
                  <span>Cam kết chuẩn mực VSA LAB</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Certification & Partner Strip */}
        <div className="bg-white rounded-2xl p-8 sm:p-10 border border-stone-200/90 shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Chứng nhận quốc tế & Tiêu chuẩn chất lượng
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 mt-1">
              Đáp ứng các tiêu chuẩn khắt khe nhất của ngành dược phẩm và mỹ phẩm thiên nhiên
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.code}
                id={`cert-${cert.code.toLowerCase()}`}
                className="p-4 sm:p-5 rounded-xl bg-[#FAFBF9] border border-[#DDD0BC] flex flex-col items-center text-center group hover:border-[#8C521E] hover:bg-white hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-[#F5EDE1] border border-[#DDD0BC] flex items-center justify-center text-[#8C521E] mb-2.5 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
                </div>
                <span className="font-bold text-sm text-[#241D17] tracking-tight">
                  {cert.name}
                </span>
                <span className="text-[11px] text-[#6E6153] mt-0.5 leading-snug">
                  {cert.subtitle}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#E5DAC4] flex flex-wrap items-center justify-center gap-6 text-xs text-[#6E6153]">
            <span className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#8C521E]" />
              COA (Certificate of Analysis) kèm theo từng đơn hàng
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Mã QR quét thông tin mẻ cất trên nắp chai</span>
            <span className="hidden sm:inline">•</span>
            <span>Đổi trả miễn phí trong 15 ngày</span>
          </div>
        </div>
      </div>
    </section>
  );
};
