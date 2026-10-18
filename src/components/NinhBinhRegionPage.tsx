import React, { useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Trees,
  Mountain,
  Phone,
  Share2,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Users,
  ShieldCheck,
  Compass,
  Sparkles,
  Heart,
  Leaf,
  Layers
} from 'lucide-react';
import { FARMER_IMAGE } from '../data/mockData';

interface NinhBinhRegionPageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const NinhBinhRegionPage: React.FC<NinhBinhRegionPageProps> = ({
  onBackToHome,
  onExploreProducts,
  onShowToast,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Câu Chuyện Vùng Nguyên Liệu Ninh Bình – Nơi Thiên Nhiên Kết Tinh Thành Hương',
        text: 'Khám phá vùng nguyên liệu thảo mộc & tràm gió Ninh Bình cùng Vườn Tinh Dầu & VSA LAB.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết vào bộ nhớ tạm');
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white">
      {/* 1. Sticky Editorial Top Bar */}
      <header className="sticky top-0 z-50 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#E5DAC4] shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8C521E] hover:text-[#5E320E] transition-colors py-2 px-3 rounded-lg hover:bg-[#EFE5D3] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở về trang chủ</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <span className="font-serif text-base sm:text-lg font-bold text-[#241D17] tracking-tight">
              Ninh Bình
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Nơi Thiên Nhiên Kết Tinh Thành Hương
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-xs text-[#5E5144] hover:text-[#241D17] p-2 rounded-lg hover:bg-[#EFE5D3] transition-colors cursor-pointer"
              title="Chia sẻ bài viết"
            >
              <Share2 className="w-4 h-4 text-[#8C521E]" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
            <a
              href="tel:0833153388"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">0833 153 388</span>
            </a>
          </div>
        </div>
      </header>

      {/* 2. Hero Header Banner */}
      <section className="relative bg-[#201A16] text-[#FAF5EB] py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#3B3028]">
        <div className="absolute inset-0 z-0">
          <img
            src="/ninh-binh.jpg"
            alt="Quần thể núi đá vôi và thung lũng xanh Ninh Bình"
            className="w-full h-full object-cover opacity-45 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#C8B89E] mb-6">
            <button onClick={onBackToHome} className="hover:text-white transition-colors cursor-pointer">Trang chủ</button>
            <span>/</span>
            <span className="text-[#E0CDAF]">Vùng nguyên liệu</span>
            <span>/</span>
            <span className="text-white font-medium">Ninh Bình</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8C521E]/80 backdrop-blur-md border border-[#C28246]/40 text-[#F5EDE1] text-xs font-semibold uppercase tracking-wider mb-6">
            <Mountain className="w-3.5 h-3.5 text-[#E6AF68]" />
            <span>Vùng đất di sản & Rừng Quốc gia Cúc Phương</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white tracking-tight leading-[1.2] mb-6">
            Câu Chuyện Vùng Nguyên Liệu Ninh Bình – Nơi Thiên Nhiên Kết Tinh Thành Hương
          </h1>

          <p className="text-[#E5DAC4] text-base sm:text-lg lg:text-xl font-light leading-relaxed max-w-3xl mb-8">
            Giữa những dãy núi đá vôi hàng triệu năm tuổi, những dòng sông hiền hòa và những cánh rừng xanh trải dài, Ninh Bình mang trong mình vẻ đẹp giao hòa giữa thiên nhiên và lịch sử, chắt lọc tinh hoa thảo mộc bản địa.
          </p>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15 text-xs sm:text-sm">
            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="text-[#AFA18E] block text-[11px] uppercase tracking-wider mb-0.5">Địa hình đặc trưng</span>
              <span className="font-semibold text-white">Karst núi đá vôi</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="text-[#AFA18E] block text-[11px] uppercase tracking-wider mb-0.5">Hệ sinh thái</span>
              <span className="font-semibold text-white">Rừng Cúc Phương</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="text-[#AFA18E] block text-[11px] uppercase tracking-wider mb-0.5">Cây trồng tiêu biểu</span>
              <span className="font-semibold text-white">Tràm gió, Thảo mộc</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs rounded-xl p-3 border border-white/10">
              <span className="text-[#AFA18E] block text-[11px] uppercase tracking-wider mb-0.5">Tiêu chuẩn canh tác</span>
              <span className="font-semibold text-white">Thu hái bền vững</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Editorial Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#E5DAC4] shadow-xs space-y-12">
          
          {/* Section 0: Giới thiệu */}
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-[#3E332A] leading-relaxed font-light">
              Giữa những dãy núi đá vôi hàng triệu năm tuổi, những dòng sông hiền hòa và những cánh rừng xanh trải dài, <strong className="font-semibold text-[#8C521E]">Ninh Bình</strong> mang trong mình vẻ đẹp giao hòa giữa thiên nhiên và lịch sử. Không chỉ nổi tiếng với quần thể danh thắng Tràng An hay Cúc Phương, vùng đất này còn sở hữu hệ sinh thái phong phú, là nơi nhiều loài cây dược liệu và thực vật hương thơm sinh trưởng mạnh mẽ.
            </p>
            <p className="text-base sm:text-lg text-[#3E332A] leading-relaxed font-light">
              Đối với <strong className="font-semibold text-[#241D17]">VSA LAB</strong>, Ninh Bình không chỉ là một vùng nguyên liệu. Đó là nơi thiên nhiên kể câu chuyện về sự cân bằng, nơi mỗi loài cây lớn lên trong sự nuôi dưỡng của đất trời để tạo nên những giọt tinh dầu mang hương thơm thuần khiết và đậm dấu ấn bản địa.
            </p>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 1: Nơi núi, rừng và sông nước cùng nuôi dưỡng cây cỏ */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <Trees className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Nơi núi, rừng và sông nước cùng nuôi dưỡng cây cỏ
              </h2>
            </div>
            
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Ninh Bình là vùng đất hiếm hoi hội tụ nhiều hệ sinh thái trong một không gian: rừng nguyên sinh, núi đá vôi, đầm ngập nước và đồng bằng ven sông.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Sự đa dạng ấy tạo nên điều kiện lý tưởng cho nhiều loài cây bản địa phát triển. Mỗi mùa trong năm mang đến một sắc thái riêng, giúp cây cỏ hấp thụ trọn vẹn ánh nắng, nguồn nước và dưỡng chất từ thiên nhiên.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed font-medium text-[#8C521E]">
              Chính sự giao thoa giữa khí hậu, thổ nhưỡng và địa hình đã tạo nên những nguyên liệu có hương thơm thanh khiết, tự nhiên và giàu giá trị.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4]">
                <h3 className="font-semibold text-sm text-[#241D17] mb-1 flex items-center gap-1.5">
                  <Mountain className="w-4 h-4 text-[#8C521E]" />
                  Núi đá vôi triệu năm
                </h3>
                <p className="text-xs text-[#6A5A4A] leading-relaxed">
                  Đất trầm tích giàu khoáng vi lượng cung cấp nền tảng dinh dưỡng dồi dào cho rễ cây bám sâu.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4]">
                <h3 className="font-semibold text-sm text-[#241D17] mb-1 flex items-center gap-1.5">
                  <Droplets className="w-4 h-4 text-[#8C521E]" />
                  Sông nước trong lành
                </h3>
                <p className="text-xs text-[#6A5A4A] leading-relaxed">
                  Mạch nước ngầm karst tự nhiên lọc sạch tạp chất, nuôi dưỡng thảm thực vật quanh năm xanh tốt.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4]">
                <h3 className="font-semibold text-sm text-[#241D17] mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-[#8C521E]" />
                  Khí hậu bốn mùa
                </h3>
                <p className="text-xs text-[#6A5A4A] leading-relaxed">
                  Nhịp giao mùa rõ rệt kích hoạt cây cỏ tổng hợp các hợp chất hữu cơ thơm và tinh dầu đậm đặc.
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 2: Rừng Cúc Phương – Nơi lưu giữ nguồn sống của thiên nhiên */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <Leaf className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Rừng Cúc Phương – Nơi lưu giữ nguồn sống của thiên nhiên
              </h2>
            </div>

            <p className="text-base text-[#4A3E34] leading-relaxed">
              Nhắc đến Ninh Bình, không thể không nhắc đến <strong className="font-semibold text-[#241D17]">Vườn Quốc gia Cúc Phương</strong> – khu rừng quốc gia đầu tiên của Việt Nam.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Nơi đây là mái nhà của hàng nghìn loài động thực vật, trong đó có nhiều loài cây dược liệu quý được thiên nhiên gìn giữ qua nhiều thế hệ.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Không chỉ là "lá phổi xanh" của miền Bắc, Cúc Phương còn là biểu tượng của sự đa dạng sinh học và tinh thần bảo tồn thiên nhiên.
            </p>

            <div className="p-6 rounded-2xl bg-[#2D4B39]/5 border border-[#2D4B39]/20 relative overflow-hidden">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-[#243328] font-medium leading-relaxed italic">
                  "VSA LAB luôn xem những giá trị ấy là nguồn cảm hứng để phát triển vùng nguyên liệu theo hướng bền vững, tôn trọng hệ sinh thái và gìn giữ những gì thiên nhiên đã tạo nên."
                </p>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 3: Mỗi vùng đất đều có một mùi hương riêng */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Mỗi vùng đất đều có một mùi hương riêng
              </h2>
            </div>

            <p className="text-base text-[#4A3E34] leading-relaxed">
              Không có hai vùng nguyên liệu nào hoàn toàn giống nhau.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Thảo mộc sinh trưởng giữa núi đá vôi Ninh Bình mang một sắc thái hương thơm rất khác với cây được trồng ở vùng đồng bằng hay ven biển.
            </p>

            <div className="p-6 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4] space-y-3">
              <p className="text-sm font-semibold text-[#8C521E] uppercase tracking-wider">
                Đó là dấu ấn độc bản của:
              </p>
              <ul className="space-y-2.5 text-sm sm:text-base text-[#3E332A]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-1" />
                  <span><strong>Đất đá giàu khoáng chất:</strong> Nuôi dưỡng hương thơm trầm sâu, bền lâu.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-1" />
                  <span><strong>Khí hậu giao mùa đặc trưng miền Bắc:</strong> Mang lại nốt hương mát lành, thanh tịnh.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-1" />
                  <span><strong>Nguồn nước tự nhiên:</strong> Tinh khiết không vướng tạp chất công nghiệp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-1" />
                  <span><strong>Chu kỳ sinh trưởng theo mùa:</strong> Giúp tích lũy dồi dào tinh hoa dược tính.</span>
                </li>
              </ul>
              <p className="pt-2 text-sm font-medium text-[#241D17] italic">
                Những yếu tố ấy tạo nên bản sắc riêng không thể trộn lẫn trong từng giọt tinh dầu.
              </p>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 4: Con người – Người bạn đồng hành của thiên nhiên */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Con người – Người bạn đồng hành của thiên nhiên
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8 space-y-4">
                <p className="text-base text-[#4A3E34] leading-relaxed">
                  Sau mỗi vùng nguyên liệu là những người nông dân dành cả năm chăm sóc cây cỏ.
                </p>
                <p className="text-base text-[#4A3E34] leading-relaxed">
                  Họ hiểu từng mùa vụ, biết khi nào cây đạt chất lượng tốt nhất để thu hoạch và luôn trân trọng từng món quà mà thiên nhiên ban tặng.
                </p>
                <p className="text-base text-[#4A3E34] leading-relaxed">
                  VSA LAB lựa chọn đồng hành cùng người dân địa phương để xây dựng vùng nguyên liệu ổn định, chia sẻ kiến thức về canh tác bền vững và cùng nhau tạo nên những sản phẩm có nguồn gốc minh bạch.
                </p>
                <p className="text-base text-[#8C521E] font-medium leading-relaxed">
                  Chúng tôi tin rằng, khi cộng đồng cùng phát triển với thiên nhiên, những giá trị ấy sẽ được gìn giữ lâu dài.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="rounded-2xl overflow-hidden border border-[#E5DAC4] shadow-xs bg-[#EFE7D8]">
                  <img
                    src={FARMER_IMAGE}
                    alt="Người nông dân chăm sóc thảo mộc Ninh Bình"
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <div className="p-3 bg-[#FCFAF6] text-center text-xs text-[#6A5A4A]">
                    Bà con nông dân liên kết thu hái có trách nhiệm
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 5: Từ vùng nguyên liệu đến từng giọt tinh dầu */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <Droplets className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Từ vùng nguyên liệu đến từng giọt tinh dầu
              </h2>
            </div>

            <p className="text-base text-[#4A3E34] leading-relaxed">
              Hành trình của một chai tinh dầu bắt đầu từ những cánh đồng và khu rừng xanh của Ninh Bình.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Nguyên liệu được thu hoạch đúng thời điểm, sơ chế cẩn trọng và đưa vào quy trình chiết xuất nhằm lưu giữ tối đa hương thơm cùng các hợp chất tự nhiên.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed font-medium text-[#241D17]">
              Mỗi công đoạn đều được kiểm soát chặt chẽ, không chỉ để tạo nên một sản phẩm chất lượng mà còn để giữ trọn "linh hồn" của cây cỏ trong từng giọt tinh dầu.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DAC4] text-center">
                <span className="text-xs font-bold text-[#8C521E] uppercase block mb-1">Giai đoạn 1</span>
                <h4 className="font-semibold text-sm text-[#241D17] mb-1">Thu hái đúng vụ</h4>
                <p className="text-xs text-[#6A5A4A]">Lựa chọn thời điểm hàm lượng tinh dầu tích tụ đỉnh cao.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DAC4] text-center">
                <span className="text-xs font-bold text-[#8C521E] uppercase block mb-1">Giai đoạn 2</span>
                <h4 className="font-semibold text-sm text-[#241D17] mb-1">Chưng cất hơi nước</h4>
                <p className="text-xs text-[#6A5A4A]">Áp suất thấp khép kín, giữ trọn vẹn dải hương thơm tinh khiết.</p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E5DAC4] text-center">
                <span className="text-xs font-bold text-[#8C521E] uppercase block mb-1">Giai đoạn 3</span>
                <h4 className="font-semibold text-sm text-[#241D17] mb-1">Kiểm nghiệm GC-MS</h4>
                <p className="text-xs text-[#6A5A4A]">Phân tích thành phần độc lập, cam kết 100% nguyên bản.</p>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 6: Phát triển bền vững – Cam kết của VSA LAB */}
          <section className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Phát triển bền vững – Cam kết của VSA LAB
              </h2>
            </div>

            <p className="text-base text-[#4A3E34] leading-relaxed">
              Đối với chúng tôi, phát triển vùng nguyên liệu không chỉ là tạo ra sản phẩm mà còn là trách nhiệm đối với thiên nhiên và cộng đồng.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
                <span className="text-sm text-[#3E332A] font-medium">
                  Phát triển vùng nguyên liệu có nguồn gốc minh bạch.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
                <span className="text-sm text-[#3E332A] font-medium">
                  Đồng hành cùng người dân địa phương trong sản xuất bền vững.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
                <span className="text-sm text-[#3E332A] font-medium">
                  Khuyến khích bảo tồn đa dạng sinh học hệ sinh thái Cúc Phương.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4] flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
                <span className="text-sm text-[#3E332A] font-medium">
                  Hạn chế tối đa tác động đến môi trường tự nhiên.
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#F8F4EB] border border-[#E5DAC4] flex items-start gap-3 sm:col-span-2">
                <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
                <span className="text-sm text-[#3E332A] font-medium">
                  Gìn giữ những giá trị thảo mộc bản địa cho các thế hệ mai sau.
                </span>
              </div>
            </div>
          </section>

          <div className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />

          {/* Section 7: Ninh Bình – Hương thơm của đất trời Việt Nam */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E]">
                <Heart className="w-4 h-4" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                Ninh Bình – Hương thơm của đất trời Việt Nam
              </h2>
            </div>

            <p className="text-base text-[#4A3E34] leading-relaxed">
              Mỗi giọt tinh dầu từ vùng nguyên liệu Ninh Bình là sự kết tinh của thiên nhiên, thời gian và bàn tay chăm sóc của con người.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Đó không chỉ là hương thơm của cây cỏ. Đó là hương của núi đá vôi trầm mặc, của những cánh rừng xanh, của dòng nước trong lành và của một vùng đất luôn biết trân trọng thiên nhiên.
            </p>
            <p className="text-base text-[#4A3E34] leading-relaxed">
              Đối với <strong className="font-semibold text-[#8C521E]">VSA LAB</strong>, Ninh Bình không chỉ là nơi cung cấp nguyên liệu. Đó là nơi khởi nguồn của những giá trị bền vững, nơi mỗi loài cây kể một câu chuyện và mỗi giọt tinh dầu mang theo tinh hoa của đất trời Việt Nam.
            </p>

            {/* Slogan Quote Callout */}
            <blockquote className="my-8 p-6 sm:p-8 rounded-2xl bg-[#F5EDE1] border-l-4 border-[#8C521E] shadow-2xs">
              <p className="font-serif text-lg sm:text-xl text-[#241D17] italic leading-relaxed">
                "Từ vùng đất di sản đến từng giọt tinh dầu nguyên chất – VSA LAB gìn giữ hương thơm của thiên nhiên, lan tỏa giá trị bền vững đến mọi không gian sống."
              </p>
            </blockquote>
          </section>

          {/* Action Box: Khám phá sản phẩm tinh dầu */}
          <div className="pt-8 border-t border-[#E5DAC4] flex flex-col sm:flex-row items-center justify-between gap-6 bg-[#FAF6F0] -mx-6 sm:-mx-10 lg:-mx-14 -mb-6 sm:-mb-10 lg:-mb-14 p-6 sm:p-10 rounded-b-3xl">
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-[#241D17]">
                Khám phá sản phẩm tinh dầu từ Ninh Bình
              </h4>
              <p className="text-xs sm:text-sm text-[#6A5A4A] mt-1">
                Tinh dầu Tràm Gió Cúc Phương 100% nguyên chất, kiểm nghiệm GC-MS độc lập.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBackToHome}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-[#D9C8AC] hover:bg-white text-[#241D17] text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Về trang chủ
              </button>
              <button
                type="button"
                onClick={onExploreProducts}
                className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <span>Xem sản phẩm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </article>
  );
};
