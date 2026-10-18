import React, { useEffect } from 'react';
import {
  ArrowLeft,
  Share2,
  Phone,
  Sprout,
  Leaf,
  Flame,
  Microscope,
  PackageCheck,
  CheckCircle2,
  Droplets,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Mountain,
  Heart,
  Thermometer,
  Clock,
  FlaskConical,
  Trees,
} from 'lucide-react';
import { DISTILLATION_BG, FARMER_IMAGE, BRAND_STORY_BG } from '../data/mockData';

interface ProductionProcessPageProps {
  onBackToHome: () => void;
  onExploreProducts: () => void;
  onExploreRegions?: () => void;
  onShowToast?: (msg: string) => void;
}

export const ProductionProcessPage: React.FC<ProductionProcessPageProps> = ({
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
        title: 'Quy trình sản xuất • Từ cây đến chai | VSA LAB',
        text: 'Hành trình dưỡng tinh hoa thiên nhiên – Khám phá 5 bước sản xuất tinh dầu nguyên bản của VSA LAB.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết vào bộ nhớ tạm');
    }
  };

  const scrollToStep = (stepId: string) => {
    const el = document.getElementById(stepId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const stepsNavigation = [
    { id: 'buoc-01', number: '01', title: 'Xông khói & Chăm sóc' },
    { id: 'buoc-02', number: '02', title: 'Thu Hái & Sơ Chế' },
    { id: 'buoc-03', number: '03', title: 'Chiết Xuất Hiện Đại' },
    { id: 'buoc-04', number: '04', title: 'Kiểm Tra Chất Lượng' },
    { id: 'buoc-05', number: '05', title: 'Đóng Chai Thành Phẩm' },
  ];

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
              • Quy trình sản xuất Từ cây đến chai
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
      <section className="relative bg-[#1A251D] text-[#FAF5EB] py-16 sm:py-24 lg:py-28 overflow-hidden border-b border-[#2C3D30]">
        <div className="absolute inset-0 z-0">
          <img
            src={DISTILLATION_BG}
            alt="Quy trình sản xuất tinh dầu VSA LAB"
            className="w-full h-full object-cover opacity-35 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A251D] via-[#1A251D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A251D] via-transparent to-[#1A251D]/60" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A45]/20 border border-[#C99A45]/35 text-[#F3D798] text-xs font-semibold mb-6">
            <Droplets className="w-3.5 h-3.5 text-[#E6C285]" />
            <span className="tracking-wide uppercase text-[11px]">Quy trình sản xuất • VSA LAB</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-bold text-white tracking-tight leading-[1.2] mb-6">
            Từ cây đến chai – Hành trình dưỡng tinh hoa thiên nhiên
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-[#E3D9C8] font-sans leading-relaxed max-w-2xl mx-auto mb-5 font-light">
            Mỗi giọt tinh dầu không chỉ là kết tinh của cây cỏ mà còn là kết quả của một quy trình sản xuất nghiêm ngặt, nơi thiên nhiên, con người và khoa học cùng đồng hành.
          </p>

          <p className="text-xs sm:text-sm text-[#DDD0BC]/90 font-sans max-w-2xl mx-auto mb-8 leading-relaxed">
            Tại <span className="font-bold text-[#F3D798]">VSA LAB – Vườn Tinh Dầu</span>, chúng tôi kiểm soát từng giai đoạn từ vùng nguyên liệu đến sản phẩm cuối cùng nhằm đảm bảo giữ hoàn hảo đặc tính tự nhiên, hương thơm nguyên bản và chất lượng ổn định trong từng chai tinh dầu.
          </p>

          {/* Quick jump navigation badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto pt-2">
            {stepsNavigation.map((st) => (
              <button
                key={st.id}
                onClick={() => scrollToStep(st.id)}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#8C521E]/70 border border-white/20 hover:border-[#E6C285]/50 text-white/90 hover:text-white text-xs font-medium transition-all backdrop-blur-xs cursor-pointer flex items-center gap-1.5"
              >
                <span className="text-[#E6C285] font-mono text-[11px] font-semibold">{st.number}</span>
                <span>{st.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Article Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 sm:space-y-20">
        
        {/* ==================== BƯỚC 01 ==================== */}
        <section
          id="buoc-01"
          className="scroll-mt-24 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E5DAC4] shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-[#EBE0CD]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header step pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#2D4B39] text-[#E6C285] font-mono font-bold text-sm shadow-xs">
              01
            </span>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#9E571E] uppercase block">
                Bước 01
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2922]">
                Xông khói & Chăm sóc
              </h2>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-md bg-[#F2EAE0] text-[#784618] text-xs font-semibold mb-6">
            🌱 Xây dựng nền tảng từ cơ sở dữ liệu vững chắc
          </div>

          <div className="space-y-4 text-[#3E332A] text-sm sm:text-base leading-relaxed">
            <p>
              Chất lượng của tinh dầu bắt đầu từ chính vùng đất nơi cây được sinh trưởng.
            </p>
            <p>
              <strong className="text-[#241D17]">VSA LAB</strong> là đơn vị lựa chọn các vùng nguyên liệu phù hợp với đặc tính của từng loài thực vật, ưu tiên những khu vực có điều kiện tự nhiên thuận lợi như:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 pb-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F4EC] border border-[#E8DFC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241D] font-medium">Thổ nhưỡng giàu dinh dưỡng, đất thịt tơi xốp tự nhiên.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F4EC] border border-[#E8DFC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241D] font-medium">Nguồn nước tự nhiên trong lành từ khe suối và mạch ngầm.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F4EC] border border-[#E8DFC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241D] font-medium">Khí hậu phù hợp với từng loài cây bản địa tương thích.</span>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F8F4EC] border border-[#E8DFC9]">
                <CheckCircle2 className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#2D241D] font-medium">Hệ sinh thái được bảo tồn và phát triển bền vững lâu dài.</span>
              </div>
            </div>

            <p>
              Trong quá trình canh tác, cây được chăm sóc theo hướng thân thiện với môi trường, hạn chế tối đa các hoạt động tiêu cực tác động đến đất và hệ sinh thái bản địa.
            </p>

            {/* Quote block */}
            <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#243B2E] to-[#1C2C23] text-white border-l-4 border-[#C99A45] shadow-sm">
              <p className="font-serif italic text-base sm:text-lg text-[#F5EAD4] leading-relaxed">
                “Chúng tôi tin rằng: Một vùng nguyên liệu khỏe mạnh sẽ tạo ra những giọt tinh dầu chất lượng đỉnh cao.”
              </p>
            </div>

            <p>
              Từ việc lựa chọn giống cây, chăm sóc, theo dõi quá trình sinh trưởng đến bảo vệ vùng trồng, tất cả đều được thực hiện với sự tôn trọng tuyệt đối chu kỳ sinh học tự nhiên của cây cỏ.
            </p>
          </div>
        </section>

        {/* ==================== BƯỚC 02 ==================== */}
        <section
          id="buoc-02"
          className="scroll-mt-24 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E5DAC4] shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-[#EBE0CD]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header step pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#9E571E] text-[#F9EAD2] font-mono font-bold text-sm shadow-xs">
              02
            </span>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#9E571E] uppercase block">
                Bước 02
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2922]">
                Thu Hái & Sơ Chế
              </h2>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-md bg-[#F2EAE0] text-[#784618] text-xs font-semibold mb-6">
            🌿 Thu hái đúng thời điểm – Giữ trọn giá trị tự nhiên
          </div>

          <div className="space-y-4 text-[#3E332A] text-sm sm:text-base leading-relaxed">
            <p>
              Mỗi loại cây đều có thời điểm thu hoạch tối ưu trong năm và trong ngày để đạt được hàm lượng hoạt chất và tinh dầu cao nhất.
            </p>
            <p>
              Đội ngũ chuyên gia <strong className="text-[#241D17]">VSA LAB</strong> phối hợp chặt chẽ cùng người trồng lựa chọn thời điểm phù hợp dựa trên các tiêu chí khoa học:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-3">
              <li className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF6EE] border border-[#EADBCC] text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-[#9E571E]" />
                <span className="font-medium text-[#292018]">Thành phần hoạt chất chính của cây</span>
              </li>
              <li className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF6EE] border border-[#EADBCC] text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-[#9E571E]" />
                <span className="font-medium text-[#292018]">Hàm lượng dầu tích tụ trong nguyên liệu</span>
              </li>
              <li className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF6EE] border border-[#EADBCC] text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-[#9E571E]" />
                <span className="font-medium text-[#292018]">Điều kiện thời tiết, nhiệt độ & sương sớm</span>
              </li>
              <li className="flex items-center gap-2.5 p-3 rounded-lg bg-[#FAF6EE] border border-[#EADBCC] text-xs sm:text-sm">
                <span className="w-2 h-2 rounded-full bg-[#9E571E]" />
                <span className="font-medium text-[#292018]">Đặc tính riêng biệt của từng loại thực vật</span>
              </li>
            </ul>

            <p className="pt-2">
              Sau khi thu hái, nguyên liệu được cẩn thận sơ chế:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-2">
              <div className="p-4 rounded-xl bg-[#F6EFE3] border border-[#E3D4C0]">
                <h4 className="font-semibold text-xs sm:text-sm text-[#6C3C15] mb-1">1. Loại bỏ tạp chất</h4>
                <p className="text-xs text-[#524436]">Loại bỏ cành mục, lá héo úa hoặc dị vật để đảm bảo nguồn nguyên liệu thuần túy nhất.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F6EFE3] border border-[#E3D4C0]">
                <h4 className="font-semibold text-xs sm:text-sm text-[#6C3C15] mb-1">2. Giữ độ tươi tự nhiên</h4>
                <p className="text-xs text-[#524436]">Bảo quản ở nhiệt độ mát mẻ, tránh ánh nắng gắt trực tiếp làm bay hơi tinh dầu quý.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F6EFE3] border border-[#E3D4C0]">
                <h4 className="font-semibold text-xs sm:text-sm text-[#6C3C15] mb-1">3. Bảo vệ cấu trúc tế bào</h4>
                <p className="text-xs text-[#524436]">Bảo vệ túi tiết tinh dầu của lá, vỏ và quả không bị dập nát trước khi vào lò chưng.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F6EFE3] border border-[#E3D4C0]">
                <h4 className="font-semibold text-xs sm:text-sm text-[#6C3C15] mb-1">4. Chuẩn bị tốt nhất</h4>
                <p className="text-xs text-[#524436]">Sắp xếp đồng đều trong khoang chưng cất để hơi nước đối lưu thẩm thấu triệt để.</p>
              </div>
            </div>

            <p className="text-xs sm:text-sm italic text-[#635345]">
              Mỗi giai đoạn đều được thực hiện nhanh chóng và khoa học để hạn chế tối đa sự biến tính và giữ nguyên phẩm chất tươi non của cây cỏ.
            </p>
          </div>
        </section>

        {/* ==================== BƯỚC 03 ==================== */}
        <section
          id="buoc-03"
          className="scroll-mt-24 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E5DAC4] shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-[#EBE0CD]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header step pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#593922] text-[#F7DEB4] font-mono font-bold text-sm shadow-xs">
              03
            </span>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#9E571E] uppercase block">
                Bước 03
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2922]">
                Chiết Xuất Hiện Đại
              </h2>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-md bg-[#F2EAE0] text-[#784618] text-xs font-semibold mb-6">
            🔬 Kết tinh công nghệ và tôn vinh thiên nhiên
          </div>

          <div className="space-y-4 text-[#3E332A] text-sm sm:text-base leading-relaxed">
            <p>
              Đây là giai đoạn cốt lõi giúp chuyển hóa tinh chất ẩn giấu trong cây thành những giọt tinh dầu nguyên chất, thanh khiết và đậm đặc hương sắc.
            </p>
            <p>
              <strong className="text-[#241D17]">VSA LAB</strong> ứng dụng các phương pháp chiết xuất phù hợp với từng loài nguyên liệu (lôi cuốn hơi nước áp suất thấp, ép lạnh cơ học cao cấp), hướng tới khả năng lưu giữ tối ưu:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
              <div className="p-3.5 rounded-xl bg-[#F7F3EB] border border-[#E6DBC6] text-center">
                <Sparkles className="w-5 h-5 text-[#9E571E] mx-auto mb-1.5" />
                <p className="font-bold text-xs sm:text-sm text-[#261E18]">Hương thơm đặc biệt</p>
                <p className="text-[11px] text-[#5A4D40] mt-1">Giữ vẹn nguyên tầng hương đầu, giữa và cuối tự nhiên.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F3EB] border border-[#E6DBC6] text-center">
                <FlaskConical className="w-5 h-5 text-[#2D4B39] mx-auto mb-1.5" />
                <p className="font-bold text-xs sm:text-sm text-[#261E18]">Hợp chất tự nhiên</p>
                <p className="text-[11px] text-[#5A4D40] mt-1">Bảo toàn monoterpene, sesquiterpenes có giá trị trị liệu.</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F3EB] border border-[#E6DBC6] text-center">
                <Leaf className="w-5 h-5 text-[#734A1B] mx-auto mb-1.5" />
                <p className="font-bold text-xs sm:text-sm text-[#261E18]">Đặc tính riêng loài cây</p>
                <p className="text-[11px] text-[#5A4D40] mt-1">Tôn trọng thổ nhưỡng và dấu ấn sinh học bản địa.</p>
              </div>
            </div>

            <p className="pt-2 font-medium text-[#241D17]">
              Quá trình chiết xuất tại VSA LAB được kiểm soát chuẩn xác:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-lg bg-[#FAF4EA] border border-[#E6DAC7]">
                <Thermometer className="w-4 h-4 text-[#9E571E] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#2B2117] block">Nhiệt độ</span>
                <span className="text-[11px] text-[#695847]">Kiểm soát từng °C</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF4EA] border border-[#E6DAC7]">
                <Clock className="w-4 h-4 text-[#9E571E] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#2B2117] block">Thời gian</span>
                <span className="text-[11px] text-[#695847]">Tối ưu theo mẻ</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF4EA] border border-[#E6DAC7]">
                <Flame className="w-4 h-4 text-[#9E571E] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#2B2117] block">Vận hành</span>
                <span className="text-[11px] text-[#695847]">Buồng kín áp suất</span>
              </div>
              <div className="p-3 rounded-lg bg-[#FAF4EA] border border-[#E6DAC7]">
                <ShieldCheck className="w-4 h-4 text-[#9E571E] mx-auto mb-1" />
                <span className="text-xs font-semibold text-[#2B2117] block">Tiêu chuẩn</span>
                <span className="text-[11px] text-[#695847]">Vô trùng nghiêm ngặt</span>
              </div>
            </div>

            <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#F4ECDE] border border-[#DFCEB3] text-[#4A3927]">
              <p className="font-serif italic text-base sm:text-lg text-[#372614] leading-relaxed">
                “Chúng tôi không cố gắng thay đổi thiên nhiên mà sử dụng khoa học để bảo tồn những gì tinh túy nhất mà cây cỏ đã tạo ra.”
              </p>
            </div>
          </div>
        </section>

        {/* ==================== BƯỚC 04 ==================== */}
        <section
          id="buoc-04"
          className="scroll-mt-24 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E5DAC4] shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-[#EBE0CD]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header step pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#1C412F] text-[#F3DBA5] font-mono font-bold text-sm shadow-xs">
              04
            </span>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#9E571E] uppercase block">
                Bước 04
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2922]">
                Kiểm Tra Chất Lượng
              </h2>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-md bg-[#F2EAE0] text-[#784618] text-xs font-semibold mb-6">
            🔍 Minh bạch để tạo dựng niềm tin bền bỉ
          </div>

          <div className="space-y-4 text-[#3E332A] text-sm sm:text-base leading-relaxed">
            <p>
              Trước khi đến với khách hàng, mỗi sản phẩm đều trải qua quá trình kiểm tra chất lượng nỗ lực và bài bản nhằm đảm bảo độ ổn định và an toàn tuyệt đối.
            </p>
            <p>
              Các tiêu chí được kiểm soát chặt chẽ bao gồm:
            </p>

            <div className="space-y-2.5 my-3">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF5EB] border border-[#E6DAC7]">
                <Microscope className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#271E17]">Độ tinh khiết của tinh dầu</h4>
                  <p className="text-xs text-[#5C4F41]">100% nguyên chất, không pha trộn dầu khoáng, dung môi hữu cơ hay cồn công nghiệp.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF5EB] border border-[#E6DAC7]">
                <Sparkles className="w-5 h-5 text-[#9E571E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#271E17]">Hương thơm đặc biệt</h4>
                  <p className="text-xs text-[#5C4F41]">Hương tự nhiên đa tầng sâu lắng, không gắt nhân tạo như hương liệu tổng hợp.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF5EB] border border-[#E6DAC7]">
                <Droplets className="w-5 h-5 text-[#C98A33] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#271E17]">Màu sắc tự nhiên</h4>
                  <p className="text-xs text-[#5C4F41]">Sắc màu chuẩn xác từ tinh hoa thực vật, không sử dụng bất kỳ phẩm màu nhân tạo nào.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF5EB] border border-[#E6DAC7]">
                <ShieldCheck className="w-5 h-5 text-[#2D4B39] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#271E17]">Độ ổn định của sản phẩm</h4>
                  <p className="text-xs text-[#5C4F41]">Đảm bảo thành phần hoạt chất ổn định qua thời gian và thích nghi tốt trong khí hậu nhiệt đới.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF5EB] border border-[#E6DAC7]">
                <Trees className="w-5 h-5 text-[#9E571E] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs sm:text-sm text-[#271E17]">Nguồn gốc nguyên liệu</h4>
                  <p className="text-xs text-[#5C4F41]">Hồ sơ truy xuất nguồn gốc đến từng hợp tác xã, từng vạt đồi bản địa và vụ thu hái.</p>
                </div>
              </div>
            </div>

            <p className="pt-2">
              Quy trình kiểm tra giúp đảm bảo mỗi chai tinh dầu đều đáp ứng những tiêu chuẩn vàng mà VSA LAB đặt ra:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-3">
              <div className="p-3 rounded-xl bg-[#203126] text-white">
                <span className="text-xs font-bold text-[#E6C285] block">Nguyên Bản</span>
                <span className="text-[10px] text-[#D5CAB9]">100% tự nhiên</span>
              </div>
              <div className="p-3 rounded-xl bg-[#203126] text-white">
                <span className="text-xs font-bold text-[#E6C285] block">An Toàn</span>
                <span className="text-[10px] text-[#D5CAB9]">Lành tính cho sức khỏe</span>
              </div>
              <div className="p-3 rounded-xl bg-[#203126] text-white">
                <span className="text-xs font-bold text-[#E6C285] block">Minh Bạch</span>
                <span className="text-[10px] text-[#D5CAB9]">Rõ ràng thông số</span>
              </div>
              <div className="p-3 rounded-xl bg-[#203126] text-white">
                <span className="text-xs font-bold text-[#E6C285] block">Bền Vững</span>
                <span className="text-[10px] text-[#D5CAB9]">Gắn liền sinh thái</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== BƯỚC 05 ==================== */}
        <section
          id="buoc-05"
          className="scroll-mt-24 bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 border border-[#E5DAC4] shadow-xs relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-36 h-36 bg-[#EBE0CD]/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header step pill */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-[#613A1C] text-[#FDE3B8] font-mono font-bold text-sm shadow-xs">
              05
            </span>
            <div>
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#9E571E] uppercase block">
                Bước 05
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2922]">
                Đóng Chai Thành Phẩm
              </h2>
            </div>
          </div>

          <div className="inline-block px-3 py-1 rounded-md bg-[#F2EAE0] text-[#784618] text-xs font-semibold mb-6">
            📦 Hoàn thiện quá trình hành trình từ thiên nhiên đến với người dùng
          </div>

          <div className="space-y-4 text-[#3E332A] text-sm sm:text-base leading-relaxed">
            <p>
              Sau khi hoàn thành các bước kiểm tra khắt khe, tinh dầu được chiết rót và đóng chai trong điều kiện phòng sạch tiêu chuẩn nhằm bảo vệ chất lượng sản phẩm bền lâu nhất.
            </p>
            <p className="font-medium text-[#241D17]">Mỗi chai tinh dầu được:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5EB] border border-[#E4D7C3]">
                <PackageCheck className="w-5 h-5 text-[#9E571E] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#261E18]">Đóng gói cẩn thận trong chai thủy tinh sẫm màu</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5EB] border border-[#E4D7C3]">
                <ShieldCheck className="w-5 h-5 text-[#2D4B39] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#261E18]">Kiểm tra thông tin nhãn mác & chỉ dẫn an toàn</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5EB] border border-[#E4D7C3]">
                <Trees className="w-5 h-5 text-[#9E571E] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#261E18]">Tích hợp tem truy xuất nguồn gốc nguyên liệu</span>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF5EB] border border-[#E4D7C3]">
                <CheckCircle2 className="w-5 h-5 text-[#2D4B39] shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-[#261E18]">Hoàn thiện tinh tế trước khi trao đến tay khách hàng</span>
              </div>
            </div>

            <p className="pt-2 text-[#46392D]">
              Từ một mầm cây nhỏ bé trong lòng đất, trải qua hành trình chăm sóc, thu hoạch, nghiên cứu và kiểm nghiệm, tinh chất thiên nhiên được lưu giữ trọn vẹn trong từng chai tinh dầu.
            </p>
          </div>
        </section>

        {/* ==================== HÀNH TRÌNH CỦA MỘT GIỌT TINH DẦU ==================== */}
        <section className="bg-gradient-to-br from-[#1C2C22] via-[#243B2E] to-[#17231B] text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-[#3A5243] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C99A45]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="inline-block text-[#E6C285] text-xs font-mono font-bold tracking-widest uppercase">
              Triết lý & Tâm huyết
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Hành trình của một giọt tinh dầu
            </h3>
            <p className="text-sm sm:text-base text-[#DDD0BD] leading-relaxed">
              Một giọt tinh dầu không chỉ là sản phẩm đơn thuần của công nghệ chiết xuất hiện đại.
            </p>

            <div className="text-left bg-black/25 backdrop-blur-xs rounded-2xl p-6 border border-white/10 space-y-3.5">
              <p className="font-medium text-xs sm:text-sm text-[#F0E4D0] mb-2">Đó là câu chuyện chân thành của:</p>
              <div className="flex items-center gap-3 text-sm sm:text-base text-[#F7F2E7]">
                <span className="text-lg">🌱</span>
                <span>Một vùng đất được chăm sóc và trân quý.</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-[#F7F2E7]">
                <span className="text-lg">🌿</span>
                <span>Một loài cây được coi trọng và nâng niu từng chiếc lá.</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-[#F7F2E7]">
                <span className="text-lg">👩‍🌾</span>
                <span>Một người nông dân cần mẫn, chịu thương chịu khó sớm hôm.</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-[#F7F2E7]">
                <span className="text-lg">🔬</span>
                <span>Một quy trình khoa học chuẩn mực, chuẩn xác và nghiêm ngặt.</span>
              </div>
              <div className="flex items-center gap-3 text-sm sm:text-base text-[#F7F2E7]">
                <span className="text-lg">💚</span>
                <span>Một cam kết trọn vẹn với mẹ thiên nhiên và thế hệ mai sau.</span>
              </div>
            </div>

            {/* Final Slogan */}
            <div className="pt-4 border-t border-white/15">
              <p className="font-serif text-lg sm:text-xl font-bold text-[#F3D798] tracking-wide">
                VSA LAB – Từ cây đến chai, giữ tinh hoa thiên nhiên trong từng giọt tinh dầu.
              </p>
            </div>
          </div>
        </section>

        {/* Bottom Navigation & CTA Buttons */}
        <section className="pt-6 border-t border-[#E5DAC4] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#CDBCA2] hover:border-[#8C521E] bg-[#EFE4D2] hover:bg-[#E5D7C2] text-[#292017] text-sm font-semibold transition-all cursor-pointer shadow-xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#8C521E]" />
            <span>Trở về trang chủ</span>
          </button>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            {onExploreRegions && (
              <button
                type="button"
                onClick={onExploreRegions}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#2D4B39] text-[#2D4B39] hover:bg-[#2D4B39] hover:text-white text-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                <Trees className="w-4 h-4" />
                <span>Khám phá 3 vùng nguyên liệu</span>
              </button>
            )}

            <button
              type="button"
              onClick={onExploreProducts}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all cursor-pointer shadow-md"
            >
              <span>Xem các sản phẩm tinh dầu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </main>

      {/* Editorial Footer */}
      <footer className="bg-[#1C1713] text-[#A69785] py-10 border-t border-[#2C231C]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <p className="font-serif text-lg text-[#F5EDE1] font-semibold">
            VSA LAB – Vườn Tinh Dầu
          </p>
          <p className="text-xs text-[#8A7968] max-w-md mx-auto">
            Chắt lọc 100% tinh chất thiên nhiên từ vùng đại ngàn Tây Giang, Quảng Ngãi và Quảng Bình.
          </p>
          <p className="text-[11px] text-[#695B4C] pt-2">
            © {new Date().getFullYear()} VSALAB. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </footer>
    </article>
  );
};
