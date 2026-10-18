import React from 'react';
import {
  Leaf,
  Droplet,
  Sun,
  AlertTriangle,
  Phone,
  Info,
  Sparkles,
  Award,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types';
import { SectionEditButton } from './SectionEditButton';
import { ParallaxImage } from './ParallaxImage';

interface WildOrangeShowcaseProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onShowToast?: (message: string) => void;
}

export const WildOrangeShowcase: React.FC<WildOrangeShowcaseProps> = ({
  product,
  onSelectProduct,
}) => {
  return (
    <section
      id="cam-rung-tay-giang"
      className="py-16 lg:py-24 bg-[#F6F0E3] border-t border-b border-[#E5DAC4] text-[#251E18] relative overflow-hidden"
    >
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-45" />
      <div className="sunbeam-overlay opacity-55" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-4">
          <SectionEditButton sectionTab="products" label="Chỉnh sửa thông tin Cam Rừng" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EADDC7] border border-[#D8C7AD] text-[#8C521E] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B2641E]" />
            <span>Sản phẩm chứng nhận tiêu chuẩn VSA LAB</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#241D17]">
            Tinh Dầu Cam Rừng Tây Giang
          </h2>
          <p className="text-[#685A4C] text-base sm:text-lg mt-2 font-normal">
            Tay Giang Wild Orange Essential Oil • 100% Pure & Natural
          </p>
          <p className="text-xs text-[#9E571E] tracking-widest uppercase mt-1">
            Chính hãng nghiên cứu bởi Trung tâm KH&CG Công nghệ Nông nghiệp VSA
          </p>
        </div>

        {/* The Packaging Box Component matching uploaded image */}
        <div className="bg-[#FCFAF6] rounded-2xl shadow-xl border border-[#DDD0BC] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#DDD0BC]">
            
            {/* PANEL 1 (LEFT): Thành phần, Công dụng, Cách dùng, Bảo quản, Lưu ý */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-[#FDFBF7]">
              <div className="space-y-5">
                {/* 1. Thành phần */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#8C521E] flex items-center justify-center text-[#8C521E] shrink-0 mt-0.5 bg-[#F5EDE1]">
                    <Leaf className="w-4 h-4 text-[#8C521E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#241D17]">Thành phần</h3>
                    <p className="text-xs sm:text-[13px] text-[#5E5144] leading-relaxed mt-0.5">
                      100% tinh dầu vỏ cam rừng <br />
                      <span className="italic">(Citrus reticulata Peel Oil)</span>.
                    </p>
                  </div>
                </div>

                {/* 2. Công dụng */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#8C521E] flex items-center justify-center text-[#8C521E] shrink-0 mt-0.5 bg-[#F5EDE1]">
                    <Droplet className="w-4 h-4 text-[#8C521E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#241D17]">Công dụng</h3>
                    <p className="text-xs sm:text-[13px] text-[#5E5144] leading-relaxed mt-0.5">
                      Tạo hương thơm tự nhiên, giúp thư giãn, khử mùi, thanh lọc không khí.
                    </p>
                  </div>
                </div>

                {/* 3. Cách dùng */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#8C521E] flex items-center justify-center text-[#8C521E] shrink-0 mt-0.5 bg-[#F5EDE1]">
                    <Sparkles className="w-4 h-4 text-[#8C521E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#241D17]">Cách dùng</h3>
                    <p className="text-xs sm:text-[13px] text-[#5E5144] leading-relaxed mt-0.5">
                      Xông hương, khuếch tán, pha loãng với dầu nền để massage hoặc chăm sóc. Chỉ dùng ngoài da.
                    </p>
                  </div>
                </div>

                {/* Horizontal divider */}
                <div className="w-full h-px bg-[#D8CEBF] my-4" />

                {/* 4. Bảo quản */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#8C521E] flex items-center justify-center text-[#8C521E] shrink-0 mt-0.5 bg-[#F5EDE1]">
                    <Sun className="w-4 h-4 text-[#8C521E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#241D17]">Bảo quản</h3>
                    <p className="text-xs sm:text-[13px] text-[#5E5144] leading-relaxed mt-0.5">
                      Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Đậy kín nắp sau khi sử dụng.
                    </p>
                  </div>
                </div>

                {/* 5. Lưu ý */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#C87018] flex items-center justify-center text-[#C87018] shrink-0 mt-0.5 bg-[#FBF0E4]">
                    <AlertTriangle className="w-4 h-4 text-[#C87018]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#1F2E23]">Lưu ý</h3>
                    <p className="text-xs sm:text-[13px] text-[#4F5E52] leading-relaxed mt-0.5">
                      Tránh tiếp xúc trực tiếp với mắt. Để xa tầm tay trẻ em. Không được uống.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Cursive Script & Geometric Motif */}
              <div className="pt-4 border-t border-[#E5DACD] text-center sm:text-left flex items-center justify-between">
                <div>
                  <p className="font-serif italic text-base sm:text-lg text-[#3E5C46] font-medium">
                    From Vietnam's Highlands
                  </p>
                  <p className="font-serif italic text-base sm:text-lg text-[#C87018] font-medium">
                    With Pure Botanicals
                  </p>
                </div>

                {/* Traditional diamond motif */}
                <div className="w-7 h-7 rotate-45 border-2 border-[#D4A373] bg-[#EFE3D3] flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 bg-[#C87018]" />
                </div>
              </div>
            </div>

            {/* PANEL 2 (RIGHT): VSA LAB Logo, Product Name, Artwork & Spec */}
            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between items-center text-center relative bg-[#F7F2EA]">
              {/* Earth brown block accent on top right matching packaging */}
              <div className="absolute top-0 right-0 w-16 h-20 bg-[#8C521E] rounded-bl-xl hidden lg:block" />

              {/* Brand Logo & Name */}
              <div className="space-y-3 pt-2">
                {/* VSA Circular Emblem */}
                <div className="w-14 h-14 mx-auto rounded-full border-2 border-[#8C521E] flex flex-col items-center justify-center bg-white shadow-sm relative">
                  {/* Golden droplet */}
                  <div className="w-3 h-4 bg-[#D9822B] rounded-t-full rounded-b-md shadow-xs mb-0.5" />
                  <Leaf className="w-4 h-4 text-[#8C521E]" />
                </div>

                <div>
                  <h3 className="text-2xl font-serif font-black tracking-wider text-[#241D17]">
                    VSA
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-[#7A6B5A] uppercase">
                    <span className="w-4 h-px bg-[#CFC0AC]" />
                    <span>LAB</span>
                    <span className="w-4 h-px bg-[#CFC0AC]" />
                  </div>
                </div>

                <div className="pt-1">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#241D17] uppercase tracking-wide">
                    TINH DẦU CAM RỪNG TÂY GIANG
                  </h4>
                  <p className="text-sm font-semibold text-[#6E5A48] italic tracking-tight">
                    Tay Giang Wild Orange
                  </p>
                  <p className="font-serif italic text-sm text-[#8C521E]">
                    Essential Oil
                  </p>
                </div>

                {/* 100% Pure Pill Badge */}
                <div className="inline-block px-4 py-1 rounded-full bg-[#EAE0D2] border border-[#CFC0AC] text-[#8C531E] font-serif font-bold text-xs tracking-wider shadow-xs">
                  100% Pure
                </div>
              </div>

              {/* Artwork Illustration from Image with Gentle Parallax */}
              <div className="my-5 w-full max-w-[280px] rounded-xl overflow-hidden shadow-md border border-[#D8CEBF] bg-white relative aspect-[16/10]">
                <ParallaxImage
                  src="/images/banner/banner-thu-hoach-cam-rung-tay-giang.jpg"
                  alt="Cô gái vùng cao thu hoạch cam rừng Tây Giang"
                  speed={0.12}
                  maxOffset={18}
                  scale={1.1}
                  containerClassName="w-full h-full"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F7F2EA] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] text-[#241D17] font-semibold bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded border border-[#D8CEBF] z-10">
                  <span>Đại ngàn Trường Sơn</span>
                  <span>Đồng bào bản địa</span>
                </div>
              </div>

              {/* Product Info Action */}
              <div className="w-full">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold shadow-md border border-[#D9C8AC] transition-all cursor-pointer group active:scale-95 btn-hover-shimmer"
                >
                  <span>Xem thêm các sản phẩm</span>
                  <ArrowRight className="w-4 h-4 text-[#F5EDE1] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>



          </div>
        </div>

        {/* Feature Highlights beneath the box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-4 rounded-xl bg-[#FCFAF6] border border-[#E5DAC4] shadow-2xs hover-card-lift flex items-center gap-3 cursor-default">
            <div className="w-10 h-10 rounded-lg bg-[#EBDDC8] flex items-center justify-center text-[#8C521E] shrink-0 border border-[#D9C8AC] transition-transform duration-300 hover:scale-110">
              <Award className="w-5 h-5 text-[#8C521E]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#251E18]">Nghiên cứu khoa học</h5>
              <p className="text-xs text-[#6A5D4F]">Bởi Trung tâm KH&CG Công nghệ Nông nghiệp VSA</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FCFAF6] border border-[#E5DAC4] shadow-2xs hover-card-lift flex items-center gap-3 cursor-default">
            <div className="w-10 h-10 rounded-lg bg-[#EFE3CF] flex items-center justify-center text-[#B2641E] shrink-0 border border-[#DFCBB0] transition-transform duration-300 hover:scale-110">
              <Leaf className="w-5 h-5 text-[#B2641E]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#251E18]">Bản địa bền vững</h5>
              <p className="text-xs text-[#6A5D4F]">HTX Cách Mạng Xanh - Thôn Tr'Hy, Tây Giang</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#FCFAF6] border border-[#E5DAC4] shadow-2xs hover-card-lift flex items-center gap-3 cursor-default">
            <div className="w-10 h-10 rounded-lg bg-[#EBDDC8] flex items-center justify-center text-[#8C521E] shrink-0 border border-[#D9C8AC] transition-transform duration-300 hover:scale-110">
              <Phone className="w-5 h-5 text-[#8C521E]" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-[#251E18]">Hỗ trợ & Đặt hàng</h5>
              <p className="text-xs text-[#6A5D4F]">Hotline M-MADE: 0833-15-3388 (Toàn quốc)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
