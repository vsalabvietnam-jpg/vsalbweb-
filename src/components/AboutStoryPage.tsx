import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Heart,
  Users,
  Globe2,
  CheckCircle2,
  Trees,
  FlaskConical,
  Eye,
  Phone,
  Share2,
  ArrowRight,
  ShieldCheck,
  Leaf
} from 'lucide-react';
import { FARMER_IMAGE, BRAND_STORY_BG } from '../data/mockData';

interface AboutStoryPageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const AboutStoryPage: React.FC<AboutStoryPageProps> = ({
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
        title: 'Câu Chuyện Của Chúng Tôi | Vườn Tinh Dầu & VSA LAB',
        text: 'Giữ nguyên bản – Đánh thức mọi giác quan. Khám phá câu chuyện của Vườn Tinh Dầu.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết câu chuyện vào bộ nhớ tạm');
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
              Vườn Tinh Dầu
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Về Chúng Tôi
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
            src={BRAND_STORY_BG}
            alt="Câu chuyện của chúng tôi - Vườn Tinh Dầu & VSA LAB"
            className="w-full h-full object-cover opacity-30 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vườn Tinh Dầu & VSA LAB</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.2] mb-3">
            Câu Chuyện Của Chúng Tôi
          </h1>

          <p className="font-serif text-xl sm:text-2xl text-[#E6C285] font-medium italic mb-4">
            Giữ nguyên bản – Đánh thức mọi giác quan
          </p>

          <p className="text-xs sm:text-sm text-[#DDD0BC] font-sans max-w-xl mx-auto">
            Hành trình kết nối tri thức bản địa, canh tác hữu cơ bền vững và khoa học nghiên cứu hiện đại của Trung tâm Khoa học VSA LAB.
          </p>
        </div>
      </section>

      {/* Main Editorial Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-14">
        {/* Welcome Section */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#8C521E] text-xs font-bold uppercase tracking-wider">
            <Leaf className="w-4 h-4" />
            <span>Vườn Tinh Dầu & VSA LAB</span>
          </div>
          <p className="font-serif text-lg sm:text-xl text-[#241D17] leading-relaxed">
            Chào mừng bạn đến với <strong>Vườn Tinh Dầu</strong> – nơi mỗi giọt tinh dầu là kết tinh của thiên nhiên, thời gian và tâm huyết của những con người yêu giá trị nguyên bản.
          </p>
          <div className="h-px w-16 bg-[#8C521E]" />
          <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
            Đồng hành cùng <strong>VSA LAB – Tinh hoa thiên nhiên</strong>, chúng tôi không chỉ tạo ra những sản phẩm chăm sóc sức khỏe từ thiên nhiên mà còn theo đuổi một sứ mệnh lớn hơn: <strong>gìn giữ, nghiên cứu và lan tỏa những giá trị tinh túy của thảo mộc Việt Nam</strong>, để mỗi sản phẩm không chỉ mang hương thơm mà còn chứa đựng câu chuyện của vùng đất nơi nó được sinh ra.
          </p>
        </div>

        {/* Section 1: Khởi nguồn từ những cánh rừng đại ngàn */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Khởi nguồn từ những cánh rừng đại ngàn
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Hành trình của chúng tôi bắt đầu từ những chuyến đi đến vùng núi Tây Giang (Quảng Nam) – nơi những cánh rừng nguyên sinh vẫn lưu giữ hệ sinh thái phong phú cùng hàng trăm loài cây dược liệu quý.
            </p>
            <p>
              Giữa mây núi hùng vĩ và những bản làng bình yên, chúng tôi gặp những người nông dân, những người gìn giữ tri thức bản địa về cây thuốc qua nhiều thế hệ. Họ sở hữu những nguồn nguyên liệu quý giá, nhưng vẫn còn thiếu điều kiện để đưa giá trị ấy đến với nhiều người hơn.
            </p>
          </div>

          {/* Photo illustration */}
          <div className="relative rounded-2xl overflow-hidden shadow-md my-6 border border-[#DDD0BC]">
            <img
              src={FARMER_IMAGE}
              alt="Người nông dân vùng cao cùng nguồn dược liệu quý"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-6 text-white text-xs sm:text-sm">
              <span className="italic">
                Đồng bào bản địa thu hái dược liệu tự nhiên dưới sự hỗ trợ kỹ thuật của các nhà khoa học VSA.
              </span>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] space-y-2">
            <p className="font-serif font-bold text-[#8C521E] text-base">
              Chính từ đó, ý tưởng xây dựng Vườn Tinh Dầu ra đời.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Chúng tôi mong muốn trở thành cầu nối giữa <strong>tri thức bản địa</strong>, <strong>nông nghiệp bền vững</strong> và <strong>khoa học hiện đại</strong>, để những giá trị thiên nhiên không chỉ được bảo tồn mà còn được phát triển một cách bền vững.
            </p>
          </div>
        </section>

        {/* Section 2: VSA LAB – Khi khoa học đồng hành cùng thiên nhiên */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              VSA LAB – Khi khoa học đồng hành cùng thiên nhiên
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Nếu thiên nhiên tạo nên nguồn nguyên liệu quý, thì <strong>VSA LAB</strong> chính là nơi những giá trị ấy được nghiên cứu, kiểm nghiệm và hoàn thiện.
          </p>

          <p className="text-stone-700 text-base leading-relaxed">
            Chúng tôi ứng dụng các quy trình chiết xuất hiện đại với tiêu chí <strong>tôn trọng tối đa đặc tính tự nhiên của từng loại thảo mộc</strong>. Mỗi công đoạn, từ lựa chọn vùng nguyên liệu, thu hái đúng mùa vụ, chưng cất, kiểm định đến đóng gói, đều được thực hiện theo quy trình nghiêm ngặt nhằm giữ trọn những hoạt chất và hương thơm vốn có của cây cỏ.
          </p>

          <blockquote className="my-5 pl-5 border-l-4 border-[#8C521E] py-3 bg-[#F6EFE3] rounded-r-xl pr-4">
            <p className="text-xs uppercase tracking-wider font-bold text-[#8C521E] mb-1">
              Niềm tin cốt lõi
            </p>
            <p className="font-serif text-lg sm:text-xl font-bold text-[#241D17] italic">
              "Công nghệ không thay thế thiên nhiên, mà giúp thiên nhiên được gìn giữ trọn vẹn hơn."
            </p>
          </blockquote>
        </section>

        {/* Section 3: "Tinh Hoa Thiên Nhiên" – Giá trị cốt lõi */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              "Tinh Hoa Thiên Nhiên" – Giá trị cốt lõi của chúng tôi
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Đối với chúng tôi, <strong>"Tinh hoa thiên nhiên"</strong> không chỉ là một khẩu hiệu, mà là cam kết xuyên suốt trong mọi sản phẩm:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#241D17] mb-2">
                Tinh khiết
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Chúng tôi ưu tiên nguồn nguyên liệu tự nhiên, hạn chế tối đa các thành phần tổng hợp, hương liệu nhân tạo và các chất pha tạp, nhằm giữ gìn sự thuần khiết vốn có của từng loại tinh dầu.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center mb-3">
                <Trees className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#241D17] mb-2">
                Nguyên bản
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Mỗi vùng đất đều tạo nên một dấu ấn riêng. Chúng tôi trân trọng sự khác biệt ấy và gìn giữ mùi hương chân thật, đặc trưng của từng loài cây, từng mùa vụ và từng vùng nguyên liệu.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] shadow-xs">
              <div className="w-10 h-10 rounded-lg bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center mb-3">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#241D17] mb-2">
                Khoa học
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Mỗi sản phẩm đều được phát triển trên nền tảng nghiên cứu, kiểm soát chất lượng và cải tiến liên tục, để mang đến sự an tâm và trải nghiệm tốt nhất cho người sử dụng.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Sứ mệnh của Vườn Tinh Dầu & VSA LAB */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              04
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Sứ mệnh của Vườn Tinh Dầu & VSA LAB
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Chúng tôi phát triển thương hiệu dựa trên ba giá trị bền vững:
          </p>

          <div className="space-y-3.5">
            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#EFE5D3] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#241D17] mb-1">
                  Với khách hàng
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Mang đến những sản phẩm thiên nhiên chất lượng, giúp chăm sóc sức khỏe, nuôi dưỡng cảm xúc và tạo nên không gian sống an lành.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#EFE5D3] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#241D17] mb-1">
                  Với cộng đồng
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Đồng hành cùng người nông dân, phát triển vùng nguyên liệu bền vững, nâng cao giá trị nông sản và góp phần tạo sinh kế ổn định cho đồng bào miền núi.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white border border-[#E5DAC4] flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#EFE5D3] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base text-[#241D17] mb-1">
                  Với môi trường
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Cam kết khai thác có trách nhiệm, ưu tiên tái tạo nguồn tài nguyên, bảo vệ hệ sinh thái và gìn giữ sự đa dạng sinh học cho các thế hệ mai sau.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Tầm nhìn */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              05
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Tầm nhìn
            </h2>
          </div>

          <div className="p-6 sm:p-7 rounded-2xl bg-[#241D17] text-[#FAF5EB] shadow-md space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E6C285]">
              <Eye className="w-4 h-4" />
              <span>Định Hướng Chiến Lược VSA LAB</span>
            </div>
            <p className="font-serif text-base sm:text-lg leading-relaxed text-stone-100">
              Chúng tôi hướng đến việc xây dựng <strong>Vườn Tinh Dầu</strong> trở thành hệ sinh thái tinh dầu và dược liệu thiên nhiên hàng đầu Việt Nam, nơi kết nối giữa vùng nguyên liệu, khoa học, công nghệ và người tiêu dùng.
            </p>
            <p className="text-xs sm:text-sm text-[#DDD0BC] leading-relaxed">
              Mỗi sản phẩm không chỉ là một chai tinh dầu, mà còn là đại diện cho một vùng đất, một nền văn hóa và một hành trình gìn giữ những giá trị nguyên bản của thiên nhiên Việt Nam.
            </p>
          </div>
        </section>

        {/* Section 6: Lời kết */}
        <section className="space-y-6 pt-4 border-t border-[#DDD0BC]">
          <h2 className="font-serif text-3xl font-bold text-[#241D17]">
            Lời kết
          </h2>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              Thiên nhiên luôn ban tặng con người những điều quý giá nhất.
            </p>
            <p>
              Sứ mệnh của chúng tôi là gìn giữ những món quà ấy bằng sự trân trọng, nghiên cứu bằng khoa học và trao đến bạn bằng tất cả sự chân thành.
            </p>
            <p>
              <strong>Vườn Tinh Dầu & VSA LAB</strong> tin rằng, mỗi giọt tinh dầu nguyên bản không chỉ đánh thức các giác quan mà còn kết nối con người với thiên nhiên, với sự bình yên và những giá trị bền vững.
            </p>
          </div>

          {/* Grand Callout */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#8C521E] to-[#5C3210] text-white shadow-xl text-center space-y-4">
            <p className="text-xs uppercase tracking-widest font-semibold text-[#F5EDE1]">
              Thông điệp thương hiệu
            </p>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              Giữ nguyên bản – Đánh thức mọi giác quan.
            </h3>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-[#8C521E] hover:bg-[#FAF5EB] text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Khám phá các sản phẩm</span>
                <ArrowRight className="w-4 h-4 text-[#8C521E]" />
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-black/20 hover:bg-black/30 text-white text-sm font-semibold border border-white/20 transition-all cursor-pointer"
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
            <span>Chắt lọc tinh hoa từ đại ngàn đất Việt</span>
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
