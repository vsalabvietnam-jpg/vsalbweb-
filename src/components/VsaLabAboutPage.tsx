import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Trees,
  FlaskConical,
  HeartHandshake,
  Compass,
  Phone,
  Share2,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Layers
} from 'lucide-react';
import { FARMER_IMAGE, BRAND_STORY_BG } from '../data/mockData';

interface VsaLabAboutPageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onExploreRegions: () => void;
  onShowToast?: (msg: string) => void;
}

export const VsaLabAboutPage: React.FC<VsaLabAboutPageProps> = ({
  onBackToHome,
  onExploreProducts,
  onExploreRegions,
  onShowToast,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Về chúng tôi • VSA LAB | Từ sự trân quý thiên nhiên đến giá trị bền vững',
        text: 'Hành trình đồng hành cùng Trung tâm Khoa học VSA và bà con bản địa Tây Giang.',
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
              VSA LAB
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Về chúng tôi & Đối tác chuyên môn
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
            alt="Về chúng tôi - VSA LAB"
            className="w-full h-full object-cover opacity-35 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Compass className="w-3.5 h-3.5" />
            <span>Về chúng tôi • VSA LAB</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.2] mb-4">
            Từ sự trân quý thiên nhiên đến giá trị bền vững
          </h1>

          <p className="text-xs sm:text-sm text-[#DDD0BC] font-sans max-w-xl mx-auto">
            Hợp tác khoa học công nghệ, bảo tồn đa dạng sinh học và phát triển sinh kế cùng người nông dân đại ngàn.
          </p>
        </div>
      </section>

      {/* Main Editorial Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Opening Journey Paragraph */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs space-y-4">
          <p className="font-serif text-lg sm:text-xl text-[#241D17] leading-relaxed italic">
            "Mỗi giọt tinh dầu là kết quả của một hành trình dài – bắt đầu từ những cánh rừng nguyên sinh, được nuôi dưỡng bởi đất, nước và khí hậu bản địa, rồi được chắt lọc bằng khoa học để giữ trọn tinh hoa mà thiên nhiên ban tặng."
          </p>
        </div>

        {/* Section 1: Đồng hành & Bảo trợ chuyên môn */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Bảo trợ chuyên môn & Hệ sinh thái VSA
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <p>
              <strong>Vườn Tinh Dầu</strong> được đồng hành và bảo trợ chuyên môn bởi <strong>Trung tâm Khoa học và Chuyển giao Công nghệ Nông nghiệp VSA (Chi nhánh Ville De Faifo Việt Nam)</strong>. Với định hướng kết hợp giữa nghiên cứu khoa học, nông nghiệp bền vững và phát triển cộng đồng, chúng tôi xây dựng một hệ sinh thái nơi thiên nhiên, con người và công nghệ cùng phát triển hài hòa.
            </p>

            <p>
              Thông qua sự hợp tác với <strong>HTX Cách Mạng Xanh (Tây Giang)</strong> và mạng lưới những người nông dân bản địa, VSA LAB phát triển các vùng nguyên liệu theo hướng tự nhiên, ưu tiên bảo tồn đa dạng sinh học, gìn giữ hệ sinh thái rừng và nâng cao giá trị của các loài cây dược liệu bản địa.
            </p>
          </div>

          {/* Photo illustration */}
          <div className="relative rounded-2xl overflow-hidden shadow-md my-6 border border-[#DDD0BC]">
            <img
              src={FARMER_IMAGE}
              alt="Hợp tác cùng HTX Cách Mạng Xanh Tây Giang"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-6 text-white text-xs sm:text-sm">
              <span className="italic">
                Đồng bào Cơ Tu tại vùng cao Tây Giang đồng hành bảo tồn rừng cam tự nhiên cùng Trung tâm VSA.
              </span>
            </div>
          </div>
        </section>

        {/* Section 2: Tỉ mỉ và tôn trọng tự nhiên */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Tôn trọng tự nhiên trong từng khâu sản xuất
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Đối với chúng tôi, mỗi vùng đất đều mang một câu chuyện, mỗi loài cây đều chứa đựng những giá trị riêng và mỗi mùa thu hoạch đều là món quà của thiên nhiên. Vì vậy, từ khâu lựa chọn giống, chăm sóc, thu hái đến chưng cất và kiểm định chất lượng, mọi quy trình đều được thực hiện với sự tỉ mỉ và tinh thần tôn trọng tự nhiên.
          </p>

          <p className="text-stone-700 text-base leading-relaxed">
            Chúng tôi tin rằng, một sản phẩm chất lượng không chỉ được đánh giá bởi hương thơm hay độ tinh khiết, mà còn bởi nguồn gốc minh bạch, quy trình sản xuất có trách nhiệm và những giá trị tích cực mà nó mang lại cho cộng đồng cũng như môi trường.
          </p>
        </section>

        {/* Section 3: Ba giá trị cốt lõi */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Ba giá trị cốt lõi VSA LAB theo đuổi
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Đó là lý do VSA LAB luôn theo đuổi ba giá trị cốt lõi xuyên suốt mọi hoạt động:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-[#E5DAC4] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                <Trees className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#241D17]">
                  Nguyên bản
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Giữ gìn trọn vẹn hương thơm và hoạt chất tự nhiên của từng loài thực vật. Không pha tạp, không sử dụng chất định hương nhân tạo.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5DAC4] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                <FlaskConical className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#241D17]">
                  Khoa học
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Ứng dụng nghiên cứu và công nghệ hiện đại để chuẩn hóa chất lượng, đồng thời bảo tồn tối đa giá trị vốn có của thiên nhiên qua các xét nghiệm phân tích chuyên sâu.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-[#E5DAC4] shadow-xs flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF0E1] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#241D17]">
                  Bền vững
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  Đồng hành cùng người nông dân, phát triển vùng nguyên liệu có trách nhiệm và góp phần bảo vệ những cánh rừng cho các thế hệ tương lai.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Cầu nối & Lời cam kết */}
        <section className="space-y-6 pt-4 border-t border-[#DDD0BC]">
          <p className="text-stone-700 text-base leading-relaxed">
            Mỗi chai tinh dầu Vườn Tinh Dầu không chỉ là một sản phẩm chăm sóc sức khỏe và không gian sống, mà còn là cầu nối giữa thiên nhiên và con người, giữa tri thức bản địa và khoa học hiện đại, giữa giá trị truyền thống và khát vọng phát triển bền vững.
          </p>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#241D17] to-[#3B2C21] text-white shadow-xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#8C521E]/30 border border-[#E6C285]/40 flex items-center justify-center mx-auto text-[#E6C285]">
              <Sparkles className="w-6 h-6" />
            </div>

            <p className="font-serif text-lg sm:text-xl lg:text-2xl text-[#FAF5EB] leading-relaxed max-w-2xl mx-auto">
              <strong>VSA LAB</strong> tin rằng, khi con người biết trân trọng thiên nhiên, thiên nhiên sẽ trao lại những điều tinh túy nhất.
            </p>

            <div className="inline-block p-4 rounded-xl bg-white/10 border border-white/20 text-[#E6C285] font-serif font-bold text-sm sm:text-base">
              Cam kết 100% nguyên chất, minh bạch về nguồn gốc và bền vững trong từng hành trình phát triển.
            </div>

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
                onClick={onExploreRegions}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white text-sm font-semibold transition-all cursor-pointer"
              >
                <Trees className="w-4 h-4" />
                <span>Xem vùng nguyên liệu</span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-semibold border border-white/20 transition-all cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Trang chủ</span>
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
            <span>Trung tâm Khoa học và Chuyển giao Công nghệ Nông nghiệp VSA</span>
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
