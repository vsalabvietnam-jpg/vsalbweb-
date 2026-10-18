import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User,
  FlaskConical,
  Droplets,
  ThermometerSnowflake,
  Sparkles,
  ShieldCheck,
  Leaf,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers
} from 'lucide-react';
import { getArticleRealtimeDate } from '../utils/dateHelper';

interface ExtractionTechnologyArticlePageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onExploreProcess?: () => void;
  onShowToast?: (msg: string) => void;
}

export const ExtractionTechnologyArticlePage: React.FC<ExtractionTechnologyArticlePageProps> = ({
  onBackToHome,
  onExploreProducts,
  onExploreProcess,
  onShowToast,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Công nghệ chiết xuất hơi nước: Nghệ thuật lưu giữ trọn vẹn linh hồn thảo mộc',
        text: 'Khám phá quy trình chưng cất hơi nước tinh khiết kiểm soát áp suất và nhiệt độ tại VSA LAB.',
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
              Công nghệ chiết xuất hơi nước – VSA LAB
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
      <div className="relative py-16 sm:py-20 lg:py-24 bg-[#1B1813] text-[#FAF5EB] overflow-hidden border-b border-[#3D3025]">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img
            src="https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198237/Scientific_laboratory_extracting__2K_20261005180203.jpg"
            alt="Hệ thống chiết xuất tinh dầu bằng hơi nước VSA LAB"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1813] via-[#1B1813]/85 to-transparent" />
        <div className="leaf-shadow-ambient opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8]/20 border border-[#D9C8AC]/40 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
            <FlaskConical className="w-3.5 h-3.5 text-[#E6C285]" />
            <span>Công nghệ sản xuất &amp; R&amp;D Khoa học</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.22] mb-6">
            Công nghệ chiết xuất hơi nước: Nghệ thuật lưu giữ trọn vẹn linh hồn thảo mộc
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#C9BAA5] pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#E6C285]" />
              <span>Kỹ sư trưởng Hoàng Minh &amp; Đội ngũ R&amp;D</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E6C285]" />
              <span>{getArticleRealtimeDate('cong-nghe-chiet-xuat')}</span>
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
          Tinh dầu nguyên chất không chỉ được quyết định bởi giống cây hay vùng nguyên liệu, mà còn phụ thuộc rất lớn vào <strong>công nghệ chiết xuất</strong>. Một quy trình chưng cất phù hợp có thể giữ lại gần như trọn vẹn những hợp chất thơm quý giá của thực vật, trong khi một quy trình không được kiểm soát tốt có thể làm biến đổi hoặc mất đi những thành phần tự nhiên quan trọng.
        </div>

        {/* Narrative Flow */}
        <div className="space-y-8 text-[#332A22] text-base sm:text-lg leading-[1.8] font-normal">
          <p>
            Tại <strong>VSA LAB</strong>, chúng tôi lựa chọn <strong>công nghệ chưng cất bằng hơi nước tinh khiết với quy trình kiểm soát áp suất và nhiệt độ phù hợp</strong>, nhằm tôn trọng tối đa đặc tính tự nhiên của từng loài cây và lưu giữ giá trị nguyên bản trong mỗi giọt tinh dầu.
          </p>

          {/* Section 1: How essential oil is formed */}
          <div className="pt-6 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                01
              </span>
              <span>Tinh dầu được hình thành như thế nào?</span>
            </h2>

            <p className="mb-4">
              Tinh dầu nằm trong các túi tiết nhỏ của lá, hoa, thân, vỏ hoặc rễ thực vật. Khi hơi nước đi qua lớp nguyên liệu, nhiệt giúp các túi tinh dầu giải phóng các hợp chất thơm. Hơi nước mang theo các phân tử này đi vào bộ ngưng tụ, nơi chúng được làm lạnh để chuyển thành chất lỏng.
            </p>

            <p className="mb-4 font-semibold text-[#8C521E]">
              Sau quá trình ngưng tụ, hỗn hợp tách thành hai lớp tự nhiên:
            </p>

            {/* 2 Natural Layers Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              <div className="p-5 rounded-2xl bg-[#FFFDF9] border-2 border-[#8C521E]/30 shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center mb-3">
                  <Droplets className="w-5 h-5 text-[#8C521E]" />
                </div>
                <h3 className="font-bold text-base text-[#241D17] mb-1">Lớp tinh dầu nguyên chất</h3>
                <p className="text-xs sm:text-sm text-[#6A5E51] leading-relaxed">
                  Chứa các hợp chất thơm kỵ nước (nhẹ hơn nước, nổi lên trên), lưu giữ trọn vẹn hoạt chất trị liệu tinh túy nhất.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DDD0BC] shadow-2xs">
                <div className="w-9 h-9 rounded-xl bg-[#EFE3CF] text-[#B2641E] flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-[#B2641E]" />
                </div>
                <h3 className="font-bold text-base text-[#241D17] mb-1">Lớp nước chưng cất (Hydrosol)</h3>
                <p className="text-xs sm:text-sm text-[#6A5E51] leading-relaxed">
                  Giàu các hợp chất tan trong nước và mang hương thơm dịu nhẹ thanh mát của loài thảo mộc.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F0E6D5] border border-[#DDD0BC] text-[#8C521E] font-medium text-sm sm:text-base">
              Nhờ sự khác biệt về tính chất vật lý, hai lớp được tách riêng hoàn toàn tự nhiên mà không cần sử dụng bất kỳ dung môi hóa học nào.
            </div>
          </div>

          {/* Diagram image break */}
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-[#DDD0BC] bg-stone-100">
            <img
              src="/images/blog/bai-viet-nghe-thuat-chieu-chua-mui-huong.jpg"
              alt="Hệ thống chưng cất hơi nước khép kín tại nhà xưởng"
              className="w-full h-auto max-h-[460px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#FCFAF6] border-t border-[#E5DAC4] text-xs text-[#7A6B5A] italic text-center">
              Nguyên lý chưng cất lôi cuốn hơi nước áp suất thấp khép kín – Tách lớp tinh dầu và hydrosol tự nhiên
            </div>
          </div>

          {/* Section 2: Why Steam Distillation is Highly Valued */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                02
              </span>
              <span>Vì sao chưng cất bằng hơi nước được đánh giá cao?</span>
            </h2>

            <p className="mb-4">
              Nhiều hợp chất tạo nên hương thơm của thực vật rất nhạy cảm với nhiệt độ cao.
            </p>

            <p className="mb-4">
              Nếu quá trình chiết xuất diễn ra trong điều kiện không phù hợp, một số thành phần dễ bay hơi có thể bị thất thoát hoặc biến đổi, làm ảnh hưởng đến mùi hương và chất lượng của tinh dầu.
            </p>

            <p className="mb-3 font-semibold text-[#8C521E]">
              Với phương pháp chưng cất bằng hơi nước, kết hợp kiểm soát quy trình vận hành, tinh dầu được tách ra một cách nhẹ nhàng, giúp:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
              {[
                { title: 'Hương thơm nguyên bản', desc: 'Giữ được hương thơm gần với trạng thái tự nhiên của cây lúc còn đọng sương mai.' },
                { title: 'Không dung môi hóa học', desc: 'Hạn chế tối đa và loại bỏ hoàn toàn việc sử dụng dung môi hóa học độc hại.' },
                { title: 'Độ tinh khiết cao', desc: 'Tạo ra sản phẩm đạt độ tinh khiết tối đa, vượt qua các kiểm nghiệm sắc ký khí GC-MS.' },
                { title: 'Đa dạng loài thực vật', desc: 'Phù hợp với nhiều loại thực vật chứa tinh dầu từ hoa, lá, vỏ đến thân cành thảo mộc.' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FFFDF9] border border-[#DDD0BC] shadow-2xs flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8C521E]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#251E18]">{item.title}</h4>
                    <p className="text-xs text-[#6A5E51] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Unique recipe for each botanical */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                03
              </span>
              <span>Từng loài cây đều có một quy trình riêng</span>
            </h2>

            <p className="mb-4 font-semibold text-[#8C521E]">
              Không có một công thức chung cho tất cả các loại nguyên liệu.
            </p>

            <p className="mb-4">
              Lá sả, lá tràm, bạc hà, vỏ quế hay hoa oải hương đều có cấu trúc và thành phần hóa học khác nhau. Vì vậy, mỗi loại cần được nghiên cứu để lựa chọn thời gian chưng cất, lượng hơi nước và điều kiện vận hành phù hợp.
            </p>

            <div className="p-5 rounded-2xl bg-[#F5EDE1] border border-[#DDD0BC] text-[#241D17] leading-relaxed">
              Tại <strong>VSA LAB</strong>, quy trình được xây dựng dựa trên đặc tính của từng loại thực vật, giúp tối ưu hiệu quả chiết xuất đồng thời giữ gìn bản sắc tự nhiên của nguyên liệu.
            </div>
          </div>

          {/* Section 4: Science with Nature */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                04
              </span>
              <span>Khoa học đồng hành cùng thiên nhiên</span>
            </h2>

            <p className="mb-4 font-serif text-xl italic text-[#8C521E]">
              Đối với chúng tôi, công nghệ không nhằm thay đổi thiên nhiên. Công nghệ là công cụ giúp bảo tồn những gì thiên nhiên đã tạo ra.
            </p>

            <p className="mb-4">
              Từ việc lựa chọn vùng nguyên liệu, thời điểm thu hoạch, sơ chế, đến kiểm soát quy trình chưng cất và bảo quản, mọi công đoạn đều hướng đến một mục tiêu chung: <strong>giữ trọn hương thơm và giá trị vốn có của cây cỏ.</strong>
            </p>

            <p className="p-4 rounded-xl bg-[#EFE8DC] border border-[#D9C8AC] text-[#241D17]">
              Đó cũng là lý do VSA LAB luôn đầu tư vào quy trình sản xuất và kiểm soát chất lượng, bởi chúng tôi tin rằng sự khác biệt của một chai tinh dầu không chỉ nằm ở hương thơm, mà còn ở sự tỉ mỉ trong từng bước tạo nên nó.
            </p>
          </div>

          {/* Section 5: The Journey of a Drop */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#8C521E] text-white flex items-center justify-center text-sm font-sans font-bold shrink-0">
                05
              </span>
              <span>Hành trình của một giọt tinh dầu</span>
            </h2>

            <p className="mb-5">
              Một giọt tinh dầu là kết quả của nhiều yếu tố hòa quyện:
            </p>

            {/* 5 elements list with icons */}
            <div className="space-y-3 my-6">
              {[
                { icon: '🌱', label: 'Một vùng nguyên liệu được chăm sóc bền vững.' },
                { icon: '🌿', label: 'Một mùa thu hoạch đúng thời điểm khi hàm lượng tinh dầu đỉnh cao.' },
                { icon: '💧', label: 'Một quy trình chưng cất được kiểm soát cẩn trọng từng độ C và áp suất.' },
                { icon: '🔬', label: 'Sự đồng hành của khoa học và nghiên cứu thực nghiệm tại VSA LAB.' },
                { icon: '💚', label: 'Sự trân trọng đối với những giá trị nguyên bản của thiên nhiên.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FFFDF9] border border-[#DDD0BC] shadow-2xs flex items-center gap-3.5"
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-sm sm:text-base font-medium text-[#241D17]">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-lg font-serif italic text-[#8C521E] mt-6">
              Đó không chỉ là một quy trình sản xuất.
            </p>

            <p className="leading-relaxed">
              Đó là hành trình gìn giữ "linh hồn" của từng loài thảo mộc để mỗi giọt tinh dầu khi đến tay người sử dụng vẫn mang theo trọn vẹn hương thơm, bản sắc và câu chuyện của vùng đất nơi cây đã sinh trưởng.
            </p>
          </div>

          {/* SLOGAN QUOTE */}
          <div className="text-center py-6 border-t-2 border-[#E5DAC4]">
            <blockquote className="font-serif text-2xl sm:text-3xl font-bold text-[#8C521E] italic tracking-wide">
              "VSA LAB – Giữ nguyên bản, đánh thức mọi giác quan."
            </blockquote>
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="mt-10 p-8 sm:p-10 rounded-3xl bg-[#241D17] text-[#FAF5EB] shadow-2xl border border-[#3E3125] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDC8]/20 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-3">
              <FlaskConical className="w-3.5 h-3.5 text-[#E6C285]" />
              <span>Khám phá công nghệ VSA LAB</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Trải nghiệm các sản phẩm chưng cất hơi nước tinh khiết
            </h3>
            <p className="text-[#C9BAA5] text-sm sm:text-base leading-relaxed mb-6">
              Xem toàn bộ 24 dòng tinh dầu và chế phẩm thiên nhiên được chưng cất theo quy trình chuẩn hóa từ Trung tâm VSA LAB.
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
