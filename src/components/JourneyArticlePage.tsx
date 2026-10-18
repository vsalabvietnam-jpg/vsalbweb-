import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Sparkles,
  MapPin,
  Clock,
  Share2,
  Phone,
  Droplets,
  Trees,
  CheckCircle2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { BRAND_STORY_BG, FARMER_IMAGE } from '../data/mockData';

interface JourneyArticlePageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const JourneyArticlePage: React.FC<JourneyArticlePageProps> = ({
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
        title: 'Mỗi Miền Đất – Một Sứ Mệnh: Hành Trình Từ Cây Cỏ Đến Tìm Tinh Dầu Nguyên Bản',
        text: 'Khám phá hành trình gìn giữ tinh hoa đại ngàn của VSA LAB.',
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
            <span>Trở về trang chủ</span>
          </button>

          <div className="flex items-center gap-2 text-center">
            <span className="font-serif text-base sm:text-lg font-bold text-[#241D17] tracking-tight">
              Vườn Tinh Dầu
            </span>
            <span className="text-[10px] sm:text-xs text-[#7A6B5A] hidden sm:inline">
              • Chuyên trang Câu chuyện Thương hiệu
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

      {/* Hero Banner Header */}
      <section className="relative bg-[#201A16] text-[#FAF5EB] py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#3B3028]">
        <div className="absolute inset-0 z-0">
          <img
            src={BRAND_STORY_BG}
            alt="Hành trình từ cây cỏ đến tinh dầu nguyên bản"
            className="w-full h-full object-cover opacity-35 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#201A16] via-[#201A16]/80 to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hành Trình Tinh Dầu Nguyên Bản • VSA LAB</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.2] mb-6">
            Mỗi Miền Đất – Một Sứ Mệnh: Hành Trình Từ Cây Cỏ Đến Tìm Tinh Dầu Nguyên Bản
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#DDD0BC] font-sans">
            <span className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#E6C285]" />
              <span>Trung tâm Khoa học VSA</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E6C285]" />
              <span>Chuyên đề nghiên cứu • 6 phút đọc</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#E6C285]" />
              <span>Tây Giang - Quảng Ngãi - Ninh Bình</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Container */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        {/* Lead Quote Paragraphs */}
        <div className="p-6 sm:p-8 rounded-2xl bg-[#F4ECDC] border border-[#DDD0BC] shadow-xs space-y-4">
          <p className="font-serif text-lg sm:text-xl text-[#3D3024] leading-relaxed italic">
            "Có những mùi hương chỉ đơn thuần là hương thơm. Nhưng cũng có những mùi hương mang theo cả một vùng đất, một câu chuyện và một hành trình dài của thiên nhiên."
          </p>
          <div className="h-px w-16 bg-[#8C521E]" />
          <p className="text-[#4E3F31] text-sm sm:text-base leading-relaxed">
            Mỗi chai tinh dầu nguyên bản không chỉ được tạo nên từ cây cỏ. Đó là kết tinh của khí hậu, thổ nhưỡng, nguồn nước, ánh nắng, bàn tay người nông dân và sự kiên trì của những người luôn theo đuổi giá trị tự nhiên. Vì thế, phía sau từng giọt tinh dầu là một miền đất với một sứ mệnh riêng.
          </p>
        </div>

        {/* Section 1: Khi thiên nhiên quyết định chất lượng */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              01
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Khi thiên nhiên quyết định chất lượng
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Không phải nơi nào cũng có thể tạo ra tinh dầu đạt chất lượng cao. Cùng một loài cây nhưng khi sinh trưởng ở những vùng đất khác nhau sẽ tạo nên thành phần hóa học, mùi hương và hiệu quả trị liệu khác nhau.
          </p>

          {/* Botanical comparison cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
            <div className="p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C521E] block mb-1">
                Vùng đất nắng gió
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Cây Sả Xứ Nắng</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Cho lượng tinh dầu và hàm lượng Citral đậm đặc, cay nồng khác biệt hoàn toàn với sả đất ẩm.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C521E] block mb-1">
                Cao nguyên trong lành
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Oải Hương Cao Nguyên</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Mang nét thanh mát, dịu êm đặc trưng khác biệt so với vùng khí hậu ôn hòa thấp.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DAC4] shadow-2xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C521E] block mb-1">
                Đại ngàn nguyên sinh
              </span>
              <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">Tràm Tự Nhiên</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Sinh trưởng trong điều kiện tự nhiên đặc thù tạo nên mùi hương mạnh mẽ và giàu hoạt chất cineol.
              </p>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Đó là lý do những người theo đuổi tinh dầu nguyên bản luôn bắt đầu bằng câu hỏi trăn trở:
          </p>

          <blockquote className="my-4 pl-5 border-l-4 border-[#8C521E] py-2 bg-[#F6EFE3] rounded-r-xl pr-4">
            <p className="font-serif text-lg sm:text-xl font-bold text-[#8C521E] italic">
              "Vùng đất nào là nơi cây phát huy được giá trị tốt nhất?"
            </p>
          </blockquote>
        </section>

        {/* Section 2: Mỗi vùng đất mang một câu chuyện */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              02
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Mỗi vùng đất mang một câu chuyện
            </h2>
          </div>

          <div className="space-y-4 text-stone-700 text-base leading-relaxed">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E5DAC4]">
              <Trees className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
              <p>
                <strong>Vùng núi cao quanh năm mây phủ:</strong> Nơi cây thảo dược hấp thụ trọn vẹn tinh hoa của đất trời qua từng chu kỳ bốn mùa luân chuyển.
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E5DAC4]">
              <Droplets className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
              <p>
                <strong>Cánh rừng bạt ngàn:</strong> Nơi cây lớn lên hoàn toàn tự nhiên, vươn mình giữa thảm thực vật phong phú mà không bao giờ cần sự can thiệp của hóa chất hay phân bón nhân tạo.
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-[#E5DAC4]">
              <MapPin className="w-5 h-5 text-[#8C521E] shrink-0 mt-0.5" />
              <p>
                <strong>Vùng ven biển đầy nắng gió:</strong> Nơi từng loài thảo mộc tích lũy lượng tinh dầu đậm đặc nhất để tự thích nghi và kiên cường vượt qua điều kiện khí hậu khắc nghiệt.
              </p>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed pt-2">
            Mỗi vùng đất đều góp phần tạo nên một dấu ấn riêng trong từng giọt tinh dầu.
          </p>

          <div className="p-5 rounded-xl bg-[#2B231D] text-[#FAF5EB] font-serif italic text-base sm:text-lg leading-relaxed shadow-md">
            "Khi mở nắp chai, điều chúng ta cảm nhận không chỉ là mùi hương, mà còn là hơi thở của thiên nhiên từ nơi cây đã lớn lên."
          </div>
        </section>

        {/* Section 3: Hành trình tìm kiếm sự nguyên bản */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              03
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Hành trình tìm kiếm sự nguyên bản
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Để có được một chai tinh dầu nguyên chất, hành trình không bắt đầu ở nhà máy mà bắt đầu từ việc tìm kiếm vùng nguyên liệu phù hợp.
          </p>

          <p className="text-stone-700 text-base leading-relaxed">
            Đó là quá trình khảo sát khí hậu, đất đai, giống cây, thời điểm thu hoạch và phương pháp chăm sóc.
          </p>

          {/* Photo Illustration */}
          <div className="relative rounded-2xl overflow-hidden shadow-md my-6 border border-[#DDD0BC]">
            <img
              src={FARMER_IMAGE}
              alt="Người nông dân bản địa thu hoạch thảo mộc"
              className="w-full h-72 sm:h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex items-end p-5 sm:p-6 text-white text-xs sm:text-sm">
              <span className="italic">
                Thu hái đúng thời điểm bình minh khi túi tinh dầu trên cánh lá đạt độ no tròn nhất.
              </span>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Sau khi thu hoạch, cây phải được chưng cất trong thời gian thích hợp để giữ lại tối đa các hợp chất thơm tự nhiên. Chỉ cần thu hoạch quá sớm, quá muộn hoặc chưng cất không đúng kỹ thuật, chất lượng tinh dầu sẽ thay đổi đáng kể.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-medium text-[#4E3F31]">
            Tinh dầu nguyên bản vì thế không phải là sản phẩm được tạo ra nhanh chóng. Nó là kết quả của sự kiên nhẫn, tỉ mỉ và tôn trọng quy luật của thiên nhiên.
          </p>
        </section>

        {/* Section 4: Giá trị không nằm ở số lượng */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              04
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Giá trị không nằm ở số lượng
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E5DAC4] shadow-xs flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-left shrink-0">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-[#8C521E] block">
                1.000 kg
              </span>
              <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                Thảo mộc tươi nguyên
              </span>
            </div>
            <div className="h-px sm:h-16 w-full sm:w-px bg-stone-200" />
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
              Để thu được chỉ một lít tinh dầu, người ta có thể cần đến hàng chục, hàng trăm, thậm chí hàng nghìn kilôgam nguyên liệu tươi, tùy từng loại cây.
            </p>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Điều đó giải thích vì sao tinh dầu nguyên chất luôn được xem là món quà quý giá mà thiên nhiên ban tặng.
          </p>

          <p className="text-stone-700 text-base leading-relaxed font-semibold text-[#8C521E]">
            Giá trị của nó không nằm ở dung tích nhỏ bé của chai tinh dầu, mà nằm ở lượng thời gian, công sức và tài nguyên thiên nhiên đã được chắt lọc để tạo nên từng giọt.
          </p>
        </section>

        {/* Section 5: Một chai tinh dầu – Một đại diện của vùng đất */}
        <section className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#EBDDC8] text-[#8C521E] font-serif font-bold text-sm flex items-center justify-center shrink-0">
              05
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
              Một chai tinh dầu – Một đại diện của vùng đất
            </h2>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Khi lựa chọn tinh dầu nguyên bản, chúng ta không chỉ chọn một sản phẩm chăm sóc sức khỏe hay thư giãn.
          </p>

          <p className="text-stone-700 text-base leading-relaxed">
            Chúng ta đang lựa chọn sự minh bạch về nguồn gốc, sự tôn trọng thiên nhiên và niềm tin vào những giá trị bền vững.
          </p>

          <div className="space-y-2.5 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F7F2E7] text-[#241D17] text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0" />
              <span>Mỗi chai tinh dầu là một đại diện cho vùng đất đã nuôi dưỡng cây cỏ.</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F7F2E7] text-[#241D17] text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0" />
              <span>Mỗi mùi hương là một câu chuyện về khí hậu, con người và thiên nhiên.</span>
            </div>
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F7F2E7] text-[#241D17] text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#8C521E] shrink-0" />
              <span>Mỗi giọt tinh dầu là minh chứng rằng những điều tinh túy nhất luôn cần thời gian để hình thành.</span>
            </div>
          </div>
        </section>

        {/* Section 6: Kết */}
        <section className="space-y-6 pt-4 border-t border-[#DDD0BC]">
          <h2 className="font-serif text-3xl font-bold text-[#241D17]">
            Kết
          </h2>

          <p className="text-stone-700 text-base leading-relaxed">
            Có thể chúng ta không đặt chân đến mọi miền đất, nhưng thông qua từng giọt tinh dầu, chúng ta vẫn có thể cảm nhận được linh hồn của nơi ấy.
          </p>

          <p className="text-[#8C521E] font-serif font-bold text-lg">
            Bởi mỗi miền đất đều mang một sứ mệnh:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-stone-800 text-sm font-medium">
            <div className="p-4 rounded-xl bg-[#FAF0E1] border border-[#E8DEC9] text-center">
              <Trees className="w-6 h-6 text-[#8C521E] mx-auto mb-2" />
              <span>Sứ mệnh nuôi dưỡng cây cỏ.</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF0E1] border border-[#E8DEC9] text-center">
              <Droplets className="w-6 h-6 text-[#8C521E] mx-auto mb-2" />
              <span>Sứ mệnh gìn giữ giá trị nguyên bản.</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF0E1] border border-[#E8DEC9] text-center">
              <Sparkles className="w-6 h-6 text-[#8C521E] mx-auto mb-2" />
              <span>Sứ mệnh trao tặng tinh hoa thuần khiết nhất.</span>
            </div>
          </div>

          <p className="text-stone-700 text-base leading-relaxed">
            Và sứ mệnh trao tặng con người những tinh hoa thuần khiết nhất mà thiên nhiên đã âm thầm vun đắp qua năm tháng.
          </p>

          {/* Grand Closing Banner */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#241D17] to-[#3B2C21] text-white shadow-xl text-center space-y-4 mt-8">
            <div className="w-12 h-12 rounded-full bg-[#8C521E]/30 border border-[#E6C285]/40 flex items-center justify-center mx-auto text-[#E6C285]">
              <Droplets className="w-6 h-6" />
            </div>

            <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F4ECDC] leading-snug max-w-xl mx-auto">
              Mỗi sản phẩm tinh dầu là một câu chuyện. Và mỗi câu chuyện đều bắt đầu từ một miền đất.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onExploreProducts}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all shadow-md cursor-pointer"
              >
                <span>Khám phá các dòng sản phẩm</span>
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
