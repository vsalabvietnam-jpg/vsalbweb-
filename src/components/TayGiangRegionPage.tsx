import React, { useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Trees,
  Compass,
  Phone,
  Share2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Droplets,
  Users,
  Sun,
  Mountain
} from 'lucide-react';
import { FARMER_IMAGE } from '../data/mockData';

interface TayGiangRegionPageProps {
  onBackToHome: () => void;
  onExploreOrangeProduct: () => void;
  onExploreAllProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const TayGiangRegionPage: React.FC<TayGiangRegionPageProps> = ({
  onBackToHome,
  onExploreOrangeProduct,
  onExploreAllProducts,
  onShowToast,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Tây Giang – Nơi Khởi Nguồn Những Giọt Tinh Dầu Nguyên Bản',
        text: 'Khám phá vùng nguyên liệu đại ngàn Tây Giang cùng Vườn Tinh Dầu & VSA LAB.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết vào bộ nhớ tạm');
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white">
      {/* Sticky Top Bar */}
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
              Tây Giang (Quảng Nam)
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Vùng nguyên liệu đặc trưng
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
            src="/images/background/vung-nguyen-lieu-dai-ngan-tay-giang.jpg"
            alt="Đại ngàn rừng nguyên sinh Tây Giang Quảng Nam"
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Mountain className="w-3.5 h-3.5" />
            <span>Vùng Nguyên Liệu Rừng Già • Độ Cao 1.200m - 1.500m</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.2] mb-4">
            Tây Giang – Nơi Khởi Nguồn Những Giọt Tinh Dầu Nguyên Bản
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#DDD0BC] font-sans">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E6C285]" />
              <span>Miền núi phía tây tỉnh Quảng Nam</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-[#E6C285]" />
              <span>Rừng nguyên sinh Trường Sơn</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#E6C285]" />
              <span>HTX Cách Mạng Xanh & Đồng bào Cơ Tu</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Lead Introduction */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs space-y-4">
          <p className="font-serif text-lg sm:text-xl text-[#241D17] leading-relaxed italic">
            "Có những vùng đất được thiên nhiên ưu ái không chỉ bởi vẻ đẹp hùng vĩ, mà còn bởi sự đa dạng sinh học hiếm có. <strong>Tây Giang</strong>, miền núi phía tây tỉnh Quảng Nam, là một trong những vùng đất như thế."
          </p>
          <div className="h-px w-16 bg-[#8C521E]" />
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Nằm giữa đại ngàn Trường Sơn, Tây Giang quanh năm được bao bọc bởi những cánh rừng nguyên sinh, khí hậu mát mẻ, nguồn nước đầu nguồn trong lành và lớp đất giàu dinh dưỡng. Chính điều kiện tự nhiên ấy đã nuôi dưỡng hàng trăm loài cây dược liệu và thực vật bản địa, tạo nên một "kho báu xanh" mà thiên nhiên đã gìn giữ qua nhiều thế hệ.
          </p>
        </div>

        {/* Section 1: Thiên nhiên là người nghệ nhân đầu tiên */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Thiên nhiên là người nghệ nhân đầu tiên
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Mỗi loài cây tại Tây Giang đều lớn lên theo nhịp điệu của tự nhiên.
            </p>
            <p>
              Không tăng trưởng bằng phân bón hóa học hay những quy trình canh tác công nghiệp, cây hấp thụ tinh hoa từ đất, nước, ánh nắng và khí hậu vùng cao để tích lũy những hợp chất thơm quý giá trong từng chiếc lá, thân cây và bông hoa.
            </p>
            <p className="font-medium text-[#4E3F31]">
              Chính vì vậy, tinh dầu được chưng cất từ nguồn nguyên liệu nơi đây luôn mang hương thơm đậm đà, đặc trưng và phản ánh rõ bản sắc của vùng đất đã nuôi dưỡng chúng.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
            <div className="p-4 rounded-xl bg-white border border-[#E5DAC4]">
              <span className="text-xs uppercase font-bold text-[#8C521E] tracking-wider block mb-1">
                Khí hậu á nhiệt đới
              </span>
              <p className="text-sm text-stone-600">
                Sương mù quanh năm, độ ẩm lý tưởng giữ túi tinh dầu trên lá luôn mọng nước.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#E5DAC4]">
              <span className="text-xs uppercase font-bold text-[#8C521E] tracking-wider block mb-1">
                Thổ nhưỡng rừng già
              </span>
              <p className="text-sm text-stone-600">
                Lớp mùn hữu cơ dày hàng trăm năm không một vết tích của hóa chất nhân tạo.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Tri thức của đại ngàn */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Tri thức của đại ngàn
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Tây Giang không chỉ có rừng.
          </p>

          <p className="text-stone-700 text-base leading-relaxed">
            Nơi đây còn là quê hương của đồng bào <strong>Cơ Tu</strong>, những người đã gắn bó với núi rừng từ bao đời. Qua nhiều thế hệ, họ lưu giữ những kinh nghiệm quý về nhận biết cây dược liệu, thời điểm thu hái thích hợp và cách sử dụng thảo mộc trong đời sống hằng ngày.
          </p>

          <div className="relative rounded-2xl overflow-hidden shadow-md my-6 border border-[#DDD0BC]">
            <img
              src={FARMER_IMAGE}
              alt="Bà con đồng bào Cơ Tu Tây Giang thu hái thảo dược"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-6 text-white text-xs sm:text-sm">
              <span className="italic">
                Đồng bào Cơ Tu tại thôn Tr'Hy, xã Hùng Sơn gắn bó bền chặt với từng cánh rừng dược liệu.
              </span>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Đó là những tri thức được hình thành từ sự quan sát thiên nhiên và được truyền lại như một phần của bản sắc văn hóa.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            VSA LAB luôn trân trọng những giá trị ấy và xem đó là nền tảng quan trọng trong hành trình phát triển vùng nguyên liệu bền vững.
          </p>
        </section>

        {/* Section 3: Từ rừng già đến từng giọt tinh dầu */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Từ rừng già đến từng giọt tinh dầu
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Để tạo nên một chai tinh dầu nguyên chất, hành trình bắt đầu từ việc lựa chọn đúng vùng nguyên liệu.
            </p>
            <p>
              Các loài cây được thu hái đúng mùa, đúng thời điểm để đạt hàm lượng tinh dầu tối ưu. Sau đó, nguyên liệu được đưa vào quy trình chưng cất nhằm lưu giữ tối đa hương thơm và các hoạt chất tự nhiên.
            </p>
            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] font-serif italic text-base text-[#4E3F31]">
              "Mỗi công đoạn đều được thực hiện với sự cẩn trọng, bởi chúng tôi tin rằng chất lượng không đến từ sự vội vàng, mà từ sự tôn trọng thiên nhiên."
            </div>
          </div>
        </section>

        {/* Section 4: Phát triển cùng cộng đồng */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              04
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Phát triển cùng cộng đồng
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              VSA LAB không chỉ tìm kiếm nguồn nguyên liệu chất lượng mà còn mong muốn tạo ra giá trị lâu dài cho địa phương.
            </p>
            <p>
              Thông qua việc hợp tác với <strong>HTX Cách Mạng Xanh</strong> và người dân Tây Giang, chúng tôi hướng tới xây dựng vùng nguyên liệu ổn định, tạo thêm sinh kế, nâng cao giá trị cây dược liệu bản địa và khuyến khích mô hình khai thác gắn với bảo tồn.
            </p>
            <p className="p-4 rounded-xl bg-[#F6EFE3] border-l-4 border-[#8C521E] text-stone-800 font-medium">
              Khi rừng mang lại giá trị bền vững, người dân sẽ có thêm động lực để gìn giữ những cánh rừng quý thay vì khai thác cạn kiệt.
            </p>
          </div>
        </section>

        {/* Section 5: Bảo tồn để phát triển */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              05
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Bảo tồn để phát triển
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Chúng tôi tin rằng một chai tinh dầu chất lượng không chỉ được tạo nên từ công nghệ hiện đại mà còn từ trách nhiệm đối với thiên nhiên.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            Vì vậy, VSA LAB luôn ưu tiên các nguyên tắc phát triển bền vững:
          </p>

          <div className="space-y-3 pt-2">
            {[
              'Bảo tồn đa dạng sinh học và hệ sinh thái rừng.',
              'Phát triển vùng nguyên liệu có trách nhiệm.',
              'Đồng hành cùng cộng đồng địa phương.',
              'Tôn trọng chu kỳ sinh trưởng tự nhiên của cây.',
              'Gìn giữ nguồn tài nguyên cho các thế hệ mai sau.',
            ].map((principle, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-medium text-stone-800">
                  {principle}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Mỗi giọt tinh dầu là một câu chuyện */}
        <section className="space-y-6 pt-6 border-t border-[#DDD0BC]">
          <h2 className="font-serif text-3xl font-bold text-[#241D17]">
            Mỗi giọt tinh dầu là một câu chuyện
          </h2>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Khi cầm trên tay một chai tinh dầu từ Vườn Tinh Dầu, bạn không chỉ cảm nhận được mùi hương của cây cỏ.
            </p>
            <p>
              Bạn đang cảm nhận hơi thở của đại ngàn Trường Sơn, sự trong lành của những dòng suối đầu nguồn, bàn tay cần mẫn của người nông dân và tâm huyết của những người theo đuổi giá trị nguyên bản.
            </p>

            <div className="p-6 rounded-2xl bg-[#F7F2E7] border border-[#DDD0BC] space-y-2">
              <p className="font-serif text-base sm:text-lg text-[#8C521E] font-bold">
                Đó không chỉ là sản phẩm của thiên nhiên.
              </p>
              <ul className="space-y-1.5 text-stone-700 text-sm sm:text-base">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C521E]" />
                  <span>Đó là câu chuyện của một vùng đất.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C521E]" />
                  <span>Là hành trình gìn giữ những cánh rừng.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8C521E]" />
                  <span>Là sự kết nối giữa con người và thiên nhiên bằng tất cả sự trân trọng.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Grand Callout Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#241D17] to-[#3B2C21] text-white shadow-xl text-center space-y-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-[#8C521E]/30 border border-[#E6C285]/40 flex items-center justify-center mx-auto text-[#E6C285]">
              <Mountain className="w-6 h-6" />
            </div>

            <p className="font-serif text-xl sm:text-2xl font-bold text-[#F4ECDC] leading-snug max-w-xl mx-auto">
              Tây Giang – nơi mỗi giọt tinh dầu bắt đầu từ một cánh rừng, và mỗi cánh rừng là một lời hứa về tương lai bền vững.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExploreOrangeProduct}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Xem Tinh Dầu Cam Rừng Tây Giang</span>
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
            <span>Vùng nguyên liệu đại ngàn Tây Giang, tỉnh Quảng Nam</span>
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
