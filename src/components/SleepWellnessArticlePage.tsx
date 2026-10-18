import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User,
  Sparkles,
  Heart,
  Moon,
  Leaf,
  Wind,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Smile,
  BookOpen
} from 'lucide-react';
import { getArticleRealtimeDate } from '../utils/dateHelper';

interface SleepWellnessArticlePageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const SleepWellnessArticlePage: React.FC<SleepWellnessArticlePageProps> = ({
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
        title: '5 lợi ích tuyệt vời của tinh dầu nguyên chất đối với giấc ngủ & thư giãn',
        text: 'Khám phá liệu pháp hương thơm tự nhiên giúp xoa dịu tâm trí và cải thiện chất lượng giấc ngủ sâu cùng VSA LAB.',
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
              5 Lợi ích của tinh dầu đối với giấc ngủ &amp; thư giãn
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
      <div className="relative py-16 sm:py-20 lg:py-24 bg-[#1E1712] text-[#FAF5EB] overflow-hidden border-b border-[#3D3025]">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <img
            src="https://res.cloudinary.com/q6vqmtq4/image/upload/v1791198236/Luxury_wellness_lifestyle_banner__2K_20261005180248.jpg"
            alt="Tinh dầu thư giãn và giấc ngủ tự nhiên"
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1712] via-[#1E1712]/85 to-transparent" />
        <div className="leaf-shadow-ambient opacity-30" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8]/20 border border-[#D9C8AC]/40 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
            <Moon className="w-3.5 h-3.5 text-[#E6C285]" />
            <span>Khoa học Aromatherapy &amp; Lối sống xanh</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-bold text-white tracking-tight leading-[1.22] mb-6">
            5 lợi ích tuyệt vời của tinh dầu nguyên chất đối với giấc ngủ &amp; thư giãn
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#C9BAA5] pt-4 border-t border-white/15">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#E6C285]" />
              <span>Chuyên gia R&amp;D VSA LAB</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E6C285]" />
              <span>{getArticleRealtimeDate('5-loi-ich-tinh-dau')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E6C285]" />
              <span>5 phút đọc</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Article Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Lead Summary Callout */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F5EDE1] border-l-4 border-[#8C521E] shadow-xs mb-10 text-[#3D3126] font-serif text-base sm:text-lg italic leading-relaxed">
          Trong nhịp sống hiện đại, căng thẳng, áp lực công việc và việc tiếp xúc liên tục với các thiết bị điện tử khiến nhiều người gặp khó khăn trong việc thư giãn và có một giấc ngủ chất lượng. Giữa những bộn bề ấy, hương thơm từ tinh dầu nguyên chất đang trở thành một liệu pháp tự nhiên được nhiều người lựa chọn để chăm sóc sức khỏe tinh thần.
        </div>

        {/* Narrative & Scientific Mechanism */}
        <div className="space-y-8 text-[#332A22] text-base sm:text-lg leading-[1.8] font-normal">
          <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFDF9] border border-[#DDD0BC] shadow-2xs">
            <div className="flex items-center gap-2 text-[#8C521E] font-bold text-sm uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-[#B2641E]" />
              <span>Cơ chế sinh học thần kinh</span>
            </div>
            <p className="text-[#3E3226]">
              Các phân tử hương thơm trong tinh dầu khi được khuếch tán vào không khí sẽ đi qua hệ khứu giác và tác động đến hệ viền (<strong>Limbic System</strong>) – vùng não liên quan đến cảm xúc, trí nhớ và phản ứng với căng thẳng. Chính cơ chế này giúp hương thơm mang lại cảm giác thư thái, dễ chịu và hỗ trợ cải thiện chất lượng giấc ngủ.
            </p>
          </div>

          <p className="font-semibold text-lg sm:text-xl text-[#241D17] pt-2">
            Dưới đây là 5 lợi ích nổi bật của tinh dầu nguyên chất đối với giấc ngủ và sự thư giãn:
          </p>

          {/* BENEFIT 1 */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                01
              </span>
              <span>Giúp cơ thể và tinh thần thư giãn sau một ngày dài</span>
            </h2>

            <p className="mb-4">
              Sau nhiều giờ làm việc và học tập, cơ thể thường rơi vào trạng thái mệt mỏi, căng cứng và khó thả lỏng.
            </p>

            <p className="mb-4">
              Những hương thơm dịu nhẹ từ các loại tinh dầu như oải hương, cam ngọt, gỗ đàn hương hay ngọc lan tây có thể tạo nên một không gian yên bình, giúp bạn giảm cảm giác căng thẳng và chuẩn bị cho thời gian nghỉ ngơi.
            </p>

            <div className="p-4 rounded-xl bg-[#F0E6D5] border border-[#DDD0BC] text-[#8C521E] font-medium text-sm sm:text-base">
              Chỉ cần khuếch tán tinh dầu khoảng 20–30 phút trước khi đi ngủ, căn phòng sẽ trở nên dễ chịu hơn và giúp cơ thể chuyển sang trạng thái thư giãn tự nhiên.
            </div>
          </div>

          {/* Image Break 1 */}
          <div className="my-8 rounded-2xl overflow-hidden shadow-lg border border-[#DDD0BC] bg-stone-100">
            <img
              src="https://res.cloudinary.com/q6vqmtq4/image/upload/v1791195804/Essential_oil_bottle_on_table_20261005172251.jpg"
              alt="Khuếch tán tinh dầu tự nhiên cho phòng ngủ"
              className="w-full h-auto max-h-[480px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-3 bg-[#FCFAF6] border-t border-[#E5DAC4] text-xs text-[#7A6B5A] italic text-center">
              Khuếch tán tinh dầu tự nhiên 20–30 phút trước khi ngủ tạo không gian yên bình và giấc ngủ sâu
            </div>
          </div>

          {/* BENEFIT 2 */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                02
              </span>
              <span>Hỗ trợ cải thiện chất lượng giấc ngủ</span>
            </h2>

            <p className="mb-4">
              Một giấc ngủ ngon không chỉ phụ thuộc vào thời lượng mà còn phụ thuộc vào <strong>chất lượng giấc ngủ</strong>.
            </p>

            <p className="mb-4">
              Không gian với hương thơm nhẹ nhàng giúp cơ thể dễ đi vào trạng thái nghỉ ngơi, giảm cảm giác bồn chồn trước khi ngủ và tạo điều kiện để bạn có một giấc ngủ sâu hơn.
            </p>

            <p className="p-4 rounded-xl bg-[#FFFDF9] border border-[#E5DAC4] text-[#332A22]">
              Việc duy trì thói quen sử dụng tinh dầu vào buổi tối kết hợp với lối sống lành mạnh có thể góp phần xây dựng một chu trình ngủ đều đặn.
            </p>
          </div>

          {/* BENEFIT 3 */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                03
              </span>
              <span>Tạo không gian sống dễ chịu và cân bằng cảm xúc</span>
            </h2>

            <p className="mb-4">
              Hương thơm có khả năng gợi nhớ ký ức và tác động đến cảm xúc một cách rất tự nhiên.
            </p>

            <p className="mb-4">
              Một vài giọt tinh dầu trong phòng ngủ, phòng làm việc hoặc góc đọc sách sẽ giúp không gian trở nên ấm áp, thư thái và gần gũi hơn với thiên nhiên.
            </p>

            <div className="p-5 rounded-2xl bg-[#F5EDE1] border border-[#DDD0BC] text-[#241D17] font-serif italic text-base sm:text-lg">
              Đó cũng là cách nhiều người lựa chọn để tạo nên những khoảng lặng trong ngày, giúp cân bằng cảm xúc và tái tạo năng lượng.
            </div>
          </div>

          {/* BENEFIT 4 */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center text-sm font-sans font-bold shrink-0">
                04
              </span>
              <span>Hỗ trợ xây dựng thói quen chăm sóc bản thân</span>
            </h2>

            <p className="mb-4">
              Sử dụng tinh dầu không chỉ là tạo hương thơm mà còn là một <strong>nghi thức chăm sóc bản thân</strong> (Self-care ritual).
            </p>

            <p className="mb-3 font-semibold text-[#8C521E]">
              Bạn có thể kết hợp tinh dầu với các hoạt động thư giãn như:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-5">
              {[
                { title: 'Thiền hoặc hít thở sâu', desc: 'Giúp nhịp tim đều và giải tỏa lo âu tức thì' },
                { title: 'Đọc sách trước khi ngủ', desc: 'Thay thế màn hình ánh sáng xanh bằng trang sách thư thái' },
                { title: 'Ngâm chân bằng nước ấm', desc: 'Thêm 2-3 giọt tinh dầu gừng hoặc sả chanh kích hoạt tuần hoàn' },
                { title: 'Massage nhẹ với tinh dầu', desc: 'Đã được pha loãng với dầu dẫn đúng tỷ lệ chuẩn' },
                { title: 'Tắm nước ấm thảo mộc', desc: 'Kết hợp hương thơm tự nhiên gột rửa mệt nhọc cả ngày' }
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

            <p className="text-sm sm:text-base italic text-[#554739]">
              Những thói quen nhỏ này góp phần tạo nên một lối sống cân bằng và thư thái hơn.
            </p>
          </div>

          {/* BENEFIT 5 */}
          <div className="pt-4 border-t border-[#E5DAC4]">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight mb-4 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#8C521E] text-white flex items-center justify-center text-sm font-sans font-bold shrink-0">
                05
              </span>
              <span>Mang thiên nhiên vào không gian sống</span>
            </h2>

            <p className="mb-4">
              Tinh dầu nguyên chất không chỉ mang theo hương thơm của cây cỏ mà còn gợi nhắc con người về sự kết nối với thiên nhiên.
            </p>

            <p className="mb-4">
              Mỗi mùi hương đều chứa đựng dấu ấn của vùng đất, khí hậu và loài cây nơi nó được tạo nên.
            </p>

            <div className="p-5 rounded-2xl bg-[#EFE8DC] border border-[#D9C8AC] text-[#241D17] font-medium leading-relaxed">
              Khi khuếch tán tinh dầu trong ngôi nhà, bạn đang mang một phần hơi thở của núi rừng, cánh đồng và những vùng nguyên liệu thiên nhiên vào chính không gian sống của mình.
            </div>
          </div>

          {/* VSA LAB COMMITMENT SECTION */}
          <div className="pt-8 border-t-2 border-[#E5DAC4]">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFDF9] border border-[#D9C8AC] shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#8C521E]">
                <ShieldCheck className="w-5 h-5 text-[#8C521E]" />
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D17]">
                  Lựa chọn tinh dầu nguyên chất – Lựa chọn sự an tâm
                </h3>
              </div>

              <p className="text-sm sm:text-base leading-relaxed">
                Để đạt được trải nghiệm tốt nhất, hãy ưu tiên các sản phẩm có nguồn gốc rõ ràng, được sản xuất từ vùng nguyên liệu được kiểm soát và trải qua quy trình chiết xuất, kiểm nghiệm chất lượng nghiêm ngặt.
              </p>

              <p className="text-sm sm:text-base leading-relaxed">
                Tại <strong>VSA LAB</strong>, mỗi giọt tinh dầu được tạo nên từ sự kết hợp giữa vùng nguyên liệu bền vững, quy trình nghiên cứu khoa học và sự trân trọng đối với những giá trị nguyên bản của thiên nhiên.
              </p>

              <p className="font-serif italic text-base sm:text-lg text-[#8C521E] pt-2 border-t border-[#E5DAC4]">
                Chúng tôi tin rằng, một giấc ngủ ngon không chỉ bắt đầu từ chiếc gối êm hay căn phòng yên tĩnh, mà còn đến từ cảm giác thư thái trong tâm hồn.
              </p>
            </div>
          </div>

          {/* HEALTH DISCLAIMER */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#F4EBE0] border border-[#D9C8AC] flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-[#B2641E] shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-[#5C4D3E] leading-relaxed">
              <strong>Lưu ý:</strong> Tinh dầu nguyên chất là sản phẩm hỗ trợ tạo không gian thư giãn và chăm sóc sức khỏe theo hướng tự nhiên, không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Nếu bạn gặp tình trạng mất ngủ kéo dài hoặc có vấn đề về sức khỏe, hãy tham khảo ý kiến của bác sĩ hoặc chuyên gia y tế.
            </div>
          </div>

          {/* SLOGAN */}
          <div className="text-center py-6">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#8C521E] italic tracking-wide">
              VSA LAB – Giữ nguyên bản, đánh thức mọi giác quan.
            </span>
          </div>
        </div>

        {/* Action Callout Box */}
        <div className="mt-10 p-8 sm:p-10 rounded-3xl bg-[#241D17] text-[#FAF5EB] shadow-2xl border border-[#3E3125] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDC8]/20 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-3">
              <Moon className="w-3.5 h-3.5 text-[#E6C285]" />
              <span>Liệu pháp thư giãn VSA LAB</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
              Trải nghiệm tinh dầu nguyên chất cho giấc ngủ sâu
            </h3>
            <p className="text-[#C9BAA5] text-sm sm:text-base leading-relaxed mb-6">
              Khám phá các dòng tinh dầu Cam Rừng, Oải Hương, Tràm Trà, Bạc Hà nguyên chất 100% được nghiên cứu bởi VSA LAB.
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
