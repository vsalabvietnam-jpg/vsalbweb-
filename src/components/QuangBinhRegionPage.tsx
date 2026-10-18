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
  Compass
} from 'lucide-react';
import { FARMER_IMAGE } from '../data/mockData';

interface QuangBinhRegionPageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const QuangBinhRegionPage: React.FC<QuangBinhRegionPageProps> = ({
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
        title: 'Quảng Bình – Nơi Đại Ngàn Trường Sơn Gìn Giữ Những Giá Trị Nguyên Bản',
        text: 'Khám phá vùng nguyên liệu thảo mộc & tràm gió Quảng Bình cùng Vườn Tinh Dầu & VSA LAB.',
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
              Quảng Bình
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Đại ngàn Trường Sơn & Núi đá vôi
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
            src="/images/background/vung-nguyen-lieu-tram-gio-quang-binh.jpg"
            alt="Đại ngàn rừng nguyên sinh và núi đá vôi Quảng Bình"
            className="w-full h-full object-cover opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Mountain className="w-3.5 h-3.5" />
            <span>Đại Ngàn Trường Sơn • Rừng Nguyên Sinh & Núi Đá Vôi</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.2] mb-4">
            Quảng Bình – Nơi Đại Ngàn Trường Sơn Gìn Giữ Những Giá Trị Nguyên Bản
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#DDD0BC] font-sans">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E6C285]" />
              <span>Bắc Trung Bộ • Dãy Trường Sơn hùng vĩ</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-[#E6C285]" />
              <span>Hệ sinh thái rừng nguyên sinh cổ xưa</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-[#E6C285]" />
              <span>Tràm gió & Dược liệu bản địa</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Lead Introduction */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs space-y-4">
          <p className="font-serif text-lg sm:text-xl text-[#241D17] leading-relaxed italic">
            "Có những vùng đất được thiên nhiên tạo nên bằng sự kỳ vĩ, nơi núi rừng, sông suối và những cánh rừng nguyên sinh hòa quyện thành một hệ sinh thái đặc biệt. <strong>Quảng Bình</strong> là một vùng đất như thế."
          </p>
          <div className="h-px w-16 bg-[#8C521E]" />
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Được biết đến là nơi giao thoa giữa dãy Trường Sơn hùng vĩ và biển Đông rộng lớn, Quảng Bình sở hữu hệ sinh thái đa dạng với những khu rừng nguyên sinh, những vùng núi đá vôi cổ xưa cùng nguồn tài nguyên thực vật phong phú.
          </p>
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-semibold text-[#8C521E]">
            Nơi đây không chỉ là vùng đất của những kỳ quan thiên nhiên, mà còn là nơi lưu giữ những loài cây bản địa quý giá – nguồn cảm hứng cho hành trình tìm kiếm và phát triển những sản phẩm tinh dầu nguyên bản của <strong>VSA LAB</strong>.
          </p>
        </div>

        {/* Section 1: Thiên nhiên Quảng Bình – Người nghệ nhân thầm lặng */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Thiên nhiên Quảng Bình – Người nghệ nhân thầm lặng
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Qua hàng triệu năm kiến tạo, thiên nhiên Quảng Bình đã tạo nên một môi trường đặc biệt: những cánh rừng xanh trải dài, khí hậu giao hòa giữa núi và biển, nguồn nước trong lành từ các dòng suối đầu nguồn.
            </p>
            <p>
              Trong điều kiện ấy, cây cỏ không chỉ sinh trưởng mà còn tích lũy những tinh chất quý giá để thích nghi với môi trường sống.
            </p>
            <p>
              Mỗi chiếc lá, mỗi thân cây, mỗi bông hoa đều mang trong mình dấu ấn của vùng đất đã nuôi dưỡng chúng.
            </p>
            <blockquote className="p-4 rounded-xl bg-white border-l-4 border-[#8C521E] font-serif italic text-base text-[#8C521E]">
              "Đó chính là giá trị mà VSA LAB luôn tìm kiếm: sự nguyên bản được tạo nên từ chính thiên nhiên."
            </blockquote>
          </div>
        </section>

        {/* Section 2: Vùng đất của những cánh rừng dược liệu */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Vùng đất của những cánh rừng dược liệu
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Quảng Bình sở hữu nhiều vùng sinh thái đặc trưng, từ vùng núi cao Trường Sơn đến những khu vực trung du và ven biển. Sự đa dạng về địa hình tạo điều kiện thuận lợi cho nhiều loài thực vật phát triển.
            </p>
            <p>
              Từ những loài cây có hương thơm tự nhiên đến các loại thảo mộc truyền thống được người dân địa phương sử dụng qua nhiều thế hệ, mỗi nguồn nguyên liệu đều mang theo câu chuyện riêng về vùng đất và con người nơi đây.
            </p>
            <p className="p-4 rounded-xl bg-[#F7F2E7] border border-[#DDD0BC] font-medium text-stone-800">
              Với VSA LAB, việc phát triển vùng nguyên liệu không chỉ là tìm kiếm một nguồn cung cấp sản phẩm, mà là hành trình khám phá, bảo tồn và nâng cao giá trị của những món quà mà thiên nhiên đã ban tặng.
            </p>
          </div>
        </section>

        {/* Section 3: Tri thức bản địa – Kho báu được truyền lại qua thế hệ */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Tri thức bản địa – Kho báu được truyền lại qua thế hệ
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Bên cạnh sự phong phú của thiên nhiên, Quảng Bình còn là nơi lưu giữ những giá trị văn hóa lâu đời của các cộng đồng dân cư bản địa.
            </p>
            <p>
              Qua nhiều thế hệ, người dân nơi đây đã tích lũy những kinh nghiệm quý trong việc nhận biết cây cỏ, sử dụng thảo mộc và thích nghi với môi trường tự nhiên.
            </p>
            <p>
              Những hiểu biết ấy không chỉ là kinh nghiệm sản xuất, mà còn là sự kết nối giữa con người và rừng.
            </p>
          </div>

          {/* Photo Illustration */}
          <div className="relative rounded-2xl overflow-hidden shadow-md my-6 border border-[#DDD0BC]">
            <img
              src={FARMER_IMAGE}
              alt="Bà con bản địa vùng cao thu hái dược liệu"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-6 text-white text-xs sm:text-sm">
              <span className="italic">
                Sự kết hợp giữa tri thức bản địa và tiêu chuẩn kiểm nghiệm của Trung tâm VSA LAB.
              </span>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            VSA LAB trân trọng những tri thức bản địa này, xem đó là nền tảng quan trọng để kết hợp cùng khoa học hiện đại, tạo nên những sản phẩm vừa giữ được tinh thần thiên nhiên vừa đáp ứng tiêu chuẩn chất lượng.
          </p>
        </section>

        {/* Section 4: Từ vùng đất Quảng Bình đến từng giọt tinh dầu */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              04
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Từ vùng đất Quảng Bình đến từng giọt tinh dầu
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Để tạo nên một sản phẩm tinh dầu nguyên bản, hành trình bắt đầu từ việc lựa chọn vùng nguyên liệu phù hợp.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            Nguyên liệu được tuyển chọn dựa trên các tiêu chí:
          </p>

          <div className="space-y-3 pt-1">
            {[
              'Nguồn gốc rõ ràng.',
              'Phù hợp với điều kiện sinh trưởng tự nhiên.',
              'Thu hái đúng thời điểm để giữ được hàm lượng tinh dầu tốt nhất.',
              'Được xử lý và chưng cất theo quy trình kiểm soát chất lượng.',
            ].map((criterion, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-medium text-stone-800">
                  {criterion}
                </span>
              </div>
            ))}
          </div>

          <p className="text-stone-700 text-base leading-relaxed pt-2">
            Mỗi công đoạn đều là sự kết hợp giữa kinh nghiệm truyền thống và công nghệ hiện đại, nhằm giữ lại những giá trị quý giá nhất của cây cỏ.
          </p>
        </section>

        {/* Section 5: Phát triển bền vững – Gìn giữ màu xanh Quảng Bình */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              05
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Phát triển bền vững – Gìn giữ màu xanh Quảng Bình
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Với VSA LAB, một vùng nguyên liệu có giá trị không chỉ nằm ở sản lượng, mà còn ở khả năng phát triển lâu dài.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            Chúng tôi hướng đến mô hình:
          </p>

          <div className="space-y-3 pt-1">
            {[
              'Khai thác có trách nhiệm, tôn trọng chu kỳ sinh trưởng của cây.',
              'Bảo vệ hệ sinh thái tự nhiên.',
              'Đồng hành cùng người dân địa phương.',
              'Nâng cao giá trị của cây dược liệu Việt Nam.',
            ].map((model, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs"
              >
                <div className="w-7 h-7 rounded-full bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-medium text-stone-800">
                  {model}
                </span>
              </div>
            ))}
          </div>

          <blockquote className="p-4 rounded-xl bg-[#F6EFE3] border-l-4 border-[#8C521E] font-serif italic text-base text-[#241D17] mt-4">
            "Bảo vệ thiên nhiên chính là cách tốt nhất để tạo ra những sản phẩm chất lượng cho con người."
          </blockquote>
        </section>

        {/* Section 6: Quảng Bình – Câu chuyện của đất, rừng và những giọt hương nguyên bản */}
        <section className="space-y-6 pt-6 border-t border-[#DDD0BC]">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
            Quảng Bình – Câu chuyện của đất, rừng và những giọt hương nguyên bản
          </h2>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Mỗi chai tinh dầu từ vùng nguyên liệu Quảng Bình không chỉ chứa đựng hương thơm của cây cỏ.
            </p>
            <p>
              Trong đó còn có hơi thở của đại ngàn Trường Sơn, sự tinh khiết của nguồn nước, sự cần mẫn của con người và tình yêu dành cho thiên nhiên.
            </p>
            <p>
              Đó là hành trình từ một mầm cây nhỏ bé trở thành một giá trị lớn lao.
            </p>

            <div className="p-5 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] text-center">
              <span className="text-xs uppercase tracking-wider font-bold text-[#8C521E] block mb-2">
                Hành trình kết nối
              </span>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#241D17]">
                Thiên nhiên – Khoa học – Con người – Sự bền vững.
              </p>
            </div>
          </div>

          {/* Grand Callout Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#241D17] to-[#3B2C21] text-white shadow-xl text-center space-y-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-[#8C521E]/30 border border-[#E6C285]/40 flex items-center justify-center mx-auto text-[#E6C285]">
              <Mountain className="w-6 h-6" />
            </div>

            <p className="font-serif text-xl sm:text-2xl font-bold text-[#F4ECDC] leading-relaxed max-w-xl mx-auto">
              VSA LAB tin rằng, mỗi vùng đất đều có một câu chuyện để kể. Và Quảng Bình kể câu chuyện của một vùng đất kiên cường, nơi đại ngàn gìn giữ những tinh hoa nguyên bản nhất để trao tặng cho cuộc sống.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Khám phá sản phẩm</span>
                <ArrowRight className="w-4 h-4 text-[#F5EDE1]" />
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
            <span>Vùng nguyên liệu đại ngàn Quảng Bình</span>
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
