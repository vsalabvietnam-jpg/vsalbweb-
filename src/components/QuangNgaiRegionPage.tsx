import React, { useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Trees,
  Sun,
  Waves,
  Phone,
  Share2,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Users,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { FARMER_IMAGE } from '../data/mockData';

interface QuangNgaiRegionPageProps {
  onBackToHome: () => void;
  onExplorePomeloProduct: () => void;
  onExploreAllProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const QuangNgaiRegionPage: React.FC<QuangNgaiRegionPageProps> = ({
  onBackToHome,
  onExplorePomeloProduct,
  onExploreAllProducts,
  onShowToast,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Quảng Ngãi – Nơi Gió Biển Gặp Núi Rừng, Nuôi Dưỡng Những Giọt Tinh Dầu Thuần Khiết',
        text: 'Khám phá vùng nguyên liệu thảo mộc nắng gió Quảng Ngãi cùng Vườn Tinh Dầu & VSA LAB.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết vào bộ nhớ tạm');
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white">
      {/* Sticky Editorial Top Bar */}
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
              Quảng Ngãi
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Vùng nguyên liệu thảo mộc & bưởi
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

      {/* Hero Header Banner */}
      <section className="relative bg-[#201A16] text-[#FAF5EB] py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#3B3028]">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/background/vung-nguyen-lieu-thao-moc-quang-ngai.jpg"
            alt="Quảng Ngãi - Nơi gió biển gặp núi rừng"
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Sun className="w-3.5 h-3.5" />
            <span>Duyên Hải Nam Trung Bộ • Nắng Gió Hội Tụ Tinh Hoa</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.2] mb-4">
            Quảng Ngãi – Nơi Gió Biển Gặp Núi Rừng, Nuôi Dưỡng Những Giọt Tinh Dầu Thuần Khiết
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#DDD0BC] font-sans">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E6C285]" />
              <span>Duyên hải Nam Trung Bộ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Waves className="w-4 h-4 text-[#E6C285]" />
              <span>Giao hòa gió biển & đồng bằng màu mỡ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#E6C285]" />
              <span>Vùng Bưởi, Gừng, Nghệ, Sả bản địa</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Lead Introduction */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs space-y-4">
          <p className="font-serif text-lg sm:text-xl text-[#241D17] leading-relaxed italic">
            "Có những vùng đất khiến người ta nhớ bởi biển xanh và những bãi cát dài. Nhưng sâu hơn vẻ đẹp ấy, <strong>Quảng Ngãi</strong> còn là vùng đất của núi rừng, của những cánh đồng thảo mộc và những khu vực sinh thái đa dạng, nơi thiên nhiên đã bền bỉ nuôi dưỡng nhiều loài cây dược liệu quý qua nhiều thế hệ."
          </p>
          <div className="h-px w-16 bg-[#8C521E]" />
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Chính sự giao hòa giữa biển, đồng bằng và miền núi đã tạo nên một điều kiện tự nhiên đặc biệt, giúp cây cỏ tích lũy những tinh chất quý giá trong từng chiếc lá, cành non và thân cây. Với VSA LAB, Quảng Ngãi không chỉ là một vùng nguyên liệu, mà còn là một người bạn đồng hành trên hành trình gìn giữ những giá trị nguyên bản của thiên nhiên Việt Nam.
          </p>
        </div>

        {/* Section 1: Thiên nhiên kiến tạo giá trị */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Thiên nhiên kiến tạo giá trị
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Mỗi vùng đất đều mang một dấu ấn riêng, và Quảng Ngãi cũng vậy.
            </p>
            <p>
              Khí hậu nhiệt đới, những mùa nắng kéo dài, nguồn nước từ các con sông và vùng đồi núi đã tạo điều kiện để nhiều loài thực vật thơm và cây dược liệu phát triển khỏe mạnh.
            </p>
            <p>
              Ở đây, cây không lớn lên trong sự thúc ép của sản xuất công nghiệp, mà phát triển theo nhịp điệu của tự nhiên. Chính sự cân bằng ấy giúp nguyên liệu giữ được mùi hương đặc trưng và hàm lượng tinh dầu tự nhiên vốn có.
            </p>
            <blockquote className="p-4 rounded-xl bg-white border-l-4 border-[#8C521E] font-serif italic text-base text-[#8C521E]">
              "Chúng tôi tin rằng, một vùng đất khỏe mạnh sẽ tạo nên những sản phẩm chất lượng."
            </blockquote>
          </div>
        </section>

        {/* Section 2: Gắn kết với người trồng */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Gắn kết với người trồng
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Phía sau mỗi cánh đồng nguyên liệu là những con người cần mẫn.
            </p>
            <p>
              Họ là những người hiểu mùa mưa, mùa nắng; biết khi nào cây đạt độ trưởng thành tốt nhất để thu hái và luôn trân trọng từng món quà mà thiên nhiên ban tặng.
            </p>
          </div>

          {/* Photo Illustration */}
          <div className="relative rounded-2xl overflow-hidden shadow-md my-6 border border-[#DDD0BC]">
            <img
              src={FARMER_IMAGE}
              alt="Người nông dân thu hoạch thảo mộc tại Quảng Ngãi"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-6 text-white text-xs sm:text-sm">
              <span className="italic">
                Nông dân bản địa gắn kết cùng VSA LAB trong quy trình canh tác sạch, không hóa chất.
              </span>
            </div>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              VSA LAB lựa chọn đồng hành cùng các hộ nông dân và đối tác địa phương để xây dựng vùng nguyên liệu theo hướng bền vững, từng bước nâng cao giá trị cây dược liệu, đồng thời tạo thêm cơ hội phát triển kinh tế cho cộng đồng.
            </p>
            <p className="font-medium text-[#4E3F31]">
              Chúng tôi tin rằng, khi người nông dân có thu nhập ổn định từ những cánh đồng xanh, họ sẽ tiếp tục gìn giữ và chăm sóc đất đai như chính ngôi nhà của mình.
            </p>
          </div>
        </section>

        {/* Section 3: Hành trình từ cánh đồng đến từng giọt tinh dầu */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Hành trình từ cánh đồng đến từng giọt tinh dầu
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Mỗi giọt tinh dầu bắt đầu từ sự lựa chọn kỹ lưỡng.
            </p>
            <p>
              Nguyên liệu được thu hoạch đúng thời điểm để đạt chất lượng tốt nhất, sau đó nhanh chóng đưa vào quy trình chưng cất nhằm lưu giữ tối đa hương thơm và các hợp chất tự nhiên.
            </p>
            <p className="p-4 rounded-xl bg-[#F7F2E7] border border-[#DDD0BC] font-medium text-stone-800">
              Trong từng công đoạn, chúng tôi luôn đặt sự cẩn trọng lên hàng đầu, bởi chỉ khi tôn trọng thiên nhiên, thiên nhiên mới trao lại những giá trị tinh túy nhất.
            </p>
          </div>
        </section>

        {/* Section 4: Phát triển bền vững cùng thiên nhiên */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              04
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Phát triển bền vững cùng thiên nhiên
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Đối với VSA LAB, phát triển vùng nguyên liệu không chỉ là tạo ra sản phẩm chất lượng mà còn là góp phần bảo vệ môi trường và sử dụng tài nguyên một cách có trách nhiệm.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            Chúng tôi hướng đến:
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Phát triển vùng nguyên liệu ổn định và minh bạch.',
              'Khuyến khích phương thức canh tác thân thiện với môi trường.',
              'Bảo vệ đất, nguồn nước và hệ sinh thái địa phương.',
              'Đồng hành cùng cộng đồng trong việc nâng cao giá trị cây dược liệu bản địa.',
            ].map((goal, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-medium text-stone-800">
                  {goal}
                </span>
              </div>
            ))}
          </div>

          <p className="text-stone-700 text-base leading-relaxed pt-2">
            Đó là nền tảng để mỗi sản phẩm không chỉ mang chất lượng cao mà còn chứa đựng trách nhiệm với thiên nhiên và xã hội.
          </p>
        </section>

        {/* Section 5: Mỗi giọt tinh dầu – Một phần của Quảng Ngãi */}
        <section className="space-y-6 pt-6 border-t border-[#DDD0BC]">
          <h2 className="font-serif text-3xl font-bold text-[#241D17]">
            Mỗi giọt tinh dầu – Một phần của Quảng Ngãi
          </h2>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Khi mở nắp một chai tinh dầu, bạn không chỉ cảm nhận được mùi hương của cây cỏ.
            </p>
            <p>
              Bạn đang cảm nhận nắng gió miền Trung, sự màu mỡ của đất, sự chăm chút của người trồng và hành trình gìn giữ những giá trị tự nhiên của một vùng đất giàu bản sắc.
            </p>
            <p>
              Đối với VSA LAB, Quảng Ngãi không chỉ là nơi cung cấp nguyên liệu.
            </p>
            <p>
              Đó là nơi những giá trị của thiên nhiên được nuôi dưỡng bằng thời gian, được gìn giữ bằng trách nhiệm và được trao đến mỗi gia đình bằng sự trân trọng.
            </p>
          </div>

          {/* Grand Callout Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#241D17] to-[#3B2C21] text-white shadow-xl text-center space-y-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-[#8C521E]/30 border border-[#E6C285]/40 flex items-center justify-center mx-auto text-[#E6C285]">
              <Sun className="w-6 h-6" />
            </div>

            <p className="font-serif text-xl sm:text-2xl font-bold text-[#F4ECDC] leading-snug max-w-xl mx-auto">
              Mỗi giọt tinh dầu từ Quảng Ngãi là lời kể về một vùng đất giàu sức sống, nơi thiên nhiên và con người cùng tạo nên những giá trị bền vững cho hôm nay và mai sau.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExplorePomeloProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Xem Tinh Dầu Bưởi Quảng Ngãi</span>
                <ArrowRight className="w-4 h-4 text-[#F5EDE1]" />
              </button>

              <button
                type="button"
                onClick={onExploreAllProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                <Droplets className="w-4 h-4" />
                <span>Tất cả sản phẩm</span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Trở về trang chủ</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-[#201A16] text-[#A69785] py-10 border-t border-[#3B3028] text-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-serif text-white font-bold text-sm block">Vườn Tinh Dầu - VSA LAB</span>
            <span>Vùng nguyên liệu thảo mộc & bưởi Quảng Ngãi</span>
          </div>
          <button
            type="button"
            onClick={onBackToHome}
            className="text-[#E6C285] hover:underline cursor-pointer"
          >
            ← Về đầu trang chủ
          </button>
        </div>
      </footer>
    </article>
  );
};
