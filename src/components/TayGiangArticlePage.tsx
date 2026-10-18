import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User,
  MapPin,
  Leaf,
  Sparkles,
  Heart,
  Droplets,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Breadcrumbs } from './Breadcrumbs';
import { SocialShareModal } from './SocialShareModal';
import { FaqSection } from './FaqSection';
import { getArticleRealtimeDate } from '../utils/dateHelper';

interface TayGiangArticlePageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onExploreTayGiangRegion?: () => void;
  onShowToast?: (msg: string) => void;
}

export const TayGiangArticlePage: React.FC<TayGiangArticlePageProps> = ({
  onBackToHome,
  onExploreProducts,
  onExploreTayGiangRegion,
  onShowToast,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Câu chuyện rừng nguyên liệu Tây Giang – Hồn thiêng đại ngàn Quảng Nam',
        text: 'Ẩn mình giữa những dãy núi hùng vĩ của Trường Sơn, Tây Giang là nơi thiên nhiên gìn giữ những loài cây dược liệu quý giá.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết bài viết vào bộ nhớ tạm');
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
            <span>Trang chủ</span>
          </button>

          <div className="hidden md:flex items-center gap-2 text-center">
            <span className="font-serif text-sm font-bold text-[#241D17] truncate max-w-md">
              Câu chuyện rừng nguyên liệu Tây Giang
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D9C8AC] hover:border-[#8C521E] bg-[#FFFDF9] hover:bg-[#EFE5D3] text-xs font-medium text-[#241D17] transition-all cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8C521E]" />
              <span className="hidden sm:inline">Chia sẻ</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Banner Article Header */}
      <div className="relative py-16 sm:py-20 lg:py-24 bg-[#231A14] text-[#FAF5EB] overflow-hidden border-b border-[#3D3025]">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <img
            src="https://res.cloudinary.com/q6vqmtq4/image/upload/v1791195712/Farmer_harvesting_medicinal_herbs_20261005171809.jpg"
            alt="Đại ngàn rừng nguyên liệu Tây Giang"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#231A14] via-[#231A14]/80 to-transparent" />
        <div className="leaf-shadow-ambient opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8]/20 border border-[#D9C8AC]/40 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-[#E6C285]" />
            <span>Vùng nguyên liệu & Tri thức bản địa</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.2] mb-6">
            Câu chuyện rừng nguyên liệu Tây Giang – Hồn thiêng đại ngàn Quảng Nam
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#C9BAA5] pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#E6C285]" />
              <span>VSA LAB &amp; HTX Cách Mạng Xanh</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E6C285]" />
              <span>{getArticleRealtimeDate('cau-chuyen-tay-giang')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E6C285]" />
              <span>6 phút đọc</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Article Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Lead Summary Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EDE1] border-l-4 border-[#8C521E] shadow-xs mb-10 text-[#3D3126] font-serif text-base sm:text-lg italic leading-relaxed">
          Ẩn mình giữa những dãy núi hùng vĩ của Trường Sơn, Tây Giang không chỉ là vùng đất của mây ngàn và rừng già, mà còn là nơi thiên nhiên gìn giữ những loài cây dược liệu quý giá qua hàng trăm năm. Đây là vùng nguyên liệu đặc biệt mà VSA LAB lựa chọn đồng hành, bởi chúng tôi tin rằng một sản phẩm chất lượng luôn bắt đầu từ một vùng đất nguyên bản.
        </div>

        {/* Narrative Flow */}
        <div className="space-y-8 text-[#332A22] text-base sm:text-lg leading-[1.8] font-normal">
          <p>
            Hành trình đến Tây Giang không đơn thuần là vượt qua những cung đường đèo quanh co. Đó là hành trình tìm về cội nguồn của thiên nhiên, nơi mỗi cánh rừng, mỗi dòng suối và mỗi loài cây đều mang trong mình câu chuyện của thời gian.
          </p>

          {/* Section 1 */}
          <div className="pt-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                01
              </span>
              <span>Nơi thiên nhiên lưu giữ những giá trị nguyên bản</span>
            </h2>

            <p className="mb-4">
              Ở độ cao hàng nghìn mét so với mực nước biển, khí hậu mát mẻ quanh năm cùng hệ sinh thái rừng nguyên sinh đã tạo điều kiện lý tưởng để nhiều loài thực vật thơm và cây dược liệu phát triển mạnh mẽ.
            </p>

            <p className="mb-4">
              Những rặng quế Trà My, những bụi sả rừng, gừng gió, màng tang, hương nhu, cùng nhiều loài thảo mộc bản địa hấp thụ tinh hoa của đất, nước và khí hậu đại ngàn để tích lũy những hoạt chất quý giá trong từng chiếc lá, thân cây và lớp vỏ.
            </p>

            <p className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E5DAC4] text-[#8C521E] font-medium text-sm sm:text-base">
              Chính điều kiện tự nhiên đặc biệt ấy đã tạo nên hương thơm đậm đà, tinh khiết và giàu bản sắc mà không vùng đất nào có thể sao chép.
            </p>
          </div>

          {/* Image break 1 */}
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-[#DDD0BC] bg-stone-100">
            <img
              src="https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198236/Farmers_harvesting_medicinal_pla__2K_20261005175834.jpg"
              alt="Bà con nông dân Tây Giang thu hoạch dược liệu sạch"
              className="w-full h-auto max-h-[480px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#FCFAF6] border-t border-[#E5DAC4] text-xs text-[#7A6B5A] italic text-center">
              Đồng bào Cơ Tu tại Tây Giang gìn giữ rừng già và thu hái thảo mộc theo nhịp sinh trưởng tự nhiên
            </div>
          </div>

          {/* Section 2 */}
          <div className="pt-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                02
              </span>
              <span>Tri thức bản địa được gìn giữ qua nhiều thế hệ</span>
            </h2>

            <p className="mb-4 font-semibold text-[#8C521E]">
              Điều làm nên giá trị của Tây Giang không chỉ nằm ở thiên nhiên, mà còn ở con người.
            </p>

            <p className="mb-4">
              Đồng bào Cơ Tu từ bao đời nay đã sống hài hòa với núi rừng, gìn giữ những kinh nghiệm quý trong việc nhận biết cây thuốc, chăm sóc rừng và thu hái thảo dược đúng mùa vụ. Với họ, rừng không chỉ là nguồn sống mà còn là một phần của văn hóa và bản sắc dân tộc.
            </p>

            <p>
              VSA LAB luôn trân trọng những tri thức bản địa ấy. Chúng tôi kết hợp kinh nghiệm truyền thống với quy trình nghiên cứu khoa học hiện đại để phát triển vùng nguyên liệu theo hướng bền vững, bảo đảm chất lượng nhưng vẫn giữ được tinh thần nguyên bản của thiên nhiên.
            </p>
          </div>

          {/* Section 3 */}
          <div className="pt-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                03
              </span>
              <span>Hành trình từ đại ngàn đến từng giọt tinh dầu</span>
            </h2>

            <p className="mb-4">
              Mỗi mùa thu hoạch đều được thực hiện cẩn trọng, lựa chọn đúng thời điểm cây đạt hàm lượng tinh dầu cao nhất.
            </p>

            <p className="mb-4">
              Nguyên liệu sau khi thu hái được vận chuyển và sơ chế nhanh chóng nhằm giữ trọn độ tươi, sau đó đưa vào quy trình chưng cất hiện đại để lưu giữ tối đa hương thơm và các hoạt chất tự nhiên.
            </p>

            <div className="p-5 rounded-2xl bg-[#F0E6D5] border border-[#DDD0BC] text-[#2D231A] font-serif italic text-base sm:text-lg">
              Đó là hành trình mà mỗi giọt tinh dầu đều mang theo hơi thở của đại ngàn, sự cần mẫn của người nông dân và tâm huyết của những người làm nghề.
            </div>
          </div>

          {/* Image break 2 */}
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-[#DDD0BC] bg-stone-100">
            <img
              src="https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198237/Scientific_laboratory_extracting__2K_20261005180203.jpg"
              alt="Quy trình chưng cất và nghiên cứu khoa học tại VSA LAB"
              className="w-full h-auto max-h-[460px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#FCFAF6] border-t border-[#E5DAC4] text-xs text-[#7A6B5A] italic text-center">
              Trung tâm Khoa học &amp; Chuyển giao Công nghệ VSA nghiên cứu và kiểm định chất lượng GC-MS
            </div>
          </div>

          {/* Section 4 */}
          <div className="pt-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                04
              </span>
              <span>Đồng hành cùng cộng đồng – Gìn giữ màu xanh Tây Giang</span>
            </h2>

            <p className="mb-4">
              VSA LAB không chỉ hướng đến việc tạo ra những sản phẩm tinh dầu nguyên chất, mà còn mong muốn góp phần xây dựng một mô hình phát triển bền vững.
            </p>

            <p className="mb-4">
              Chúng tôi đồng hành cùng các hợp tác xã, hộ dân và cộng đồng địa phương trong việc phát triển vùng nguyên liệu, tạo sinh kế ổn định, nâng cao giá trị cây dược liệu và khuyến khích khai thác có trách nhiệm.
            </p>

            <p className="p-4 rounded-xl bg-[#EFE8DC] border border-[#D9C8AC] text-[#241D17] font-medium">
              Khi người dân có thể sống từ những giá trị mà rừng mang lại, những cánh rừng sẽ được bảo vệ bằng chính tình yêu và trách nhiệm của cộng đồng.
            </p>
          </div>

          {/* Section 5: Conclusion */}
          <div className="pt-4 pb-4">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#8C521E] text-white flex items-center justify-center text-sm font-sans font-bold shrink-0">
                05
              </span>
              <span>Tây Giang – Khởi nguồn của những giọt hương nguyên bản</span>
            </h2>

            <p className="mb-4 font-serif text-xl sm:text-2xl text-[#8C521E] italic">
              Đối với VSA LAB, Tây Giang không chỉ là một vùng nguyên liệu.
            </p>

            <p className="mb-4">
              Đó là nơi thiên nhiên, văn hóa và con người cùng tạo nên những giá trị bền vững. Mỗi chai tinh dầu được chưng cất từ những loài cây nơi đây không chỉ mang hương thơm thuần khiết, mà còn chứa đựng câu chuyện của đại ngàn, của những cánh rừng xanh được gìn giữ qua bao thế hệ.
            </p>

            <p className="font-semibold text-stone-900 border-l-2 border-[#8C521E] pl-4 italic">
              Từ Tây Giang, chúng tôi mang đến không chỉ những giọt tinh dầu nguyên chất, mà còn là tinh hoa của đất trời Quảng Nam – kết tinh từ thiên nhiên, khoa học và khát vọng phát triển bền vững.
            </p>
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#241D17] text-[#FAF5EB] shadow-2xl border border-[#3E3125] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDC8]/20 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E6C285]" />
              <span>Sản phẩm bản địa Tây Giang</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Trải nghiệm tinh túy từ rừng đại ngàn Tây Giang
            </h3>
            <p className="text-[#C9BAA5] text-sm sm:text-base leading-relaxed mb-6">
              Khám phá các sản phẩm Tinh Dầu Cam Rừng, Sả Rừng, Gừng Gió chưng cất nguyên chất từ vùng thổ nhưỡng Tây Giang.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreProducts}
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all shadow-md cursor-pointer btn-hover-shimmer"
              >
                <span>Xem danh mục sản phẩm</span>
                <ArrowRight className="w-4 h-4 text-[#F5EDE1] transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/40 text-white/90 text-sm font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </article>
  );
};
