import React, { useState } from 'react';
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Building2,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowUp,
  Lock,
  Globe,
  ExternalLink,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { VsaLabLogoIcon } from './VsaLabLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onShowToast: (message: string) => void;
  onOpenLegal?: (type: 'privacy' | 'terms' | 'company') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast, onOpenLegal }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { siteData, isAdmin, openLoginModal, openCms } = useContent();
  const { contact } = siteData.texts;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Vui lòng nhập địa chỉ email hợp lệ');
      return;
    }
    setIsSubscribed(true);
    onShowToast('Cảm ơn bạn đã đăng ký nhận bản tin từ Vườn Tinh Dầu!');
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-[#EDE5D6] text-[#29221C] pt-14 pb-10 border-t border-[#DACFBC] relative overflow-hidden">
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-35" />
      <div className="sunbeam-overlay opacity-45" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Upper Part: Newsletter & Brand Banner Card */}
        <div className="rounded-2xl bg-[#FCFAF6] border border-[#DDD0BC] p-6 sm:p-8 lg:p-10 shadow-sm mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Introduction */}
            <div className="lg:col-span-6 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#B2641E]" />
                <span>Bản tin hương sắc thiên nhiên • VSA LAB</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17] tracking-tight">
                Đăng ký nhận cẩm nang & ưu đãi
              </h3>
              <p className="text-[#5E5144] text-xs sm:text-sm leading-relaxed max-w-lg">
                Nhận hướng dẫn trị liệu bằng tinh dầu tự nhiên và thông báo về các mẻ chưng cất hữu cơ mới nhất từ đại ngàn Tây Giang.
              </p>
            </div>

            {/* Right Column: Subscription Input / Success */}
            <div className="lg:col-span-6">
              {isSubscribed ? (
                <div className="flex items-center gap-3 text-[#2D4537] text-sm font-medium bg-[#E8EFE9] border border-[#BBD3C0] p-4 rounded-xl shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-[#2D4537] shrink-0" />
                  <span>Đã ghi nhận email của bạn. Chúc bạn một ngày an yên & ngập tràn hương sắc!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-5 h-5 text-[#8C521E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="newsletter-email-input"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Nhập địa chỉ email của bạn..."
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#FFFDF9] border border-[#D9C8AC] text-[#241D17] placeholder-[#9A8B7A] text-sm focus:outline-none focus:ring-2 focus:ring-[#8C521E] focus:border-transparent transition-all shadow-2xs"
                      required
                    />
                  </div>
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-all shrink-0 shadow-md hover:shadow-lg cursor-pointer"
                  >
                    <span>Đăng ký ngay</span>
                    <ArrowRight className="w-4 h-4 text-[#F5EDE1]" />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Middle Part: Rebalanced 4-Column Layout (4 + 2 + 2 + 4 = 12 columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 border-b border-[#DACFBC]">
          
          {/* Column 1 (4 cols): Brand Story, Trust & Social */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#D9C8AC] bg-[#FCFAF6] flex items-center justify-center shadow-xs shrink-0">
                <VsaLabLogoIcon size={34} className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-serif text-2xl font-black text-[#0E492A] tracking-tight leading-none">
                  VSALAB
                </h4>
                <p className="text-[11px] font-semibold text-[#8C521E] tracking-wider uppercase mt-1">
                  Tinh Hoa Thiên Nhiên
                </p>
              </div>
            </div>

            <p className="text-[#5E5144] text-xs sm:text-sm leading-relaxed">
              Thương hiệu tinh dầu thiên nhiên cao cấp, kết hợp tri thức thu hái bản địa vùng cao Tây Giang cùng quy chuẩn kiểm định nghiêm ngặt từ Trung tâm VSA LAB.
            </p>

            {/* Certifications pill row */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FCFAF6] border border-[#DDD0BC] text-[#3D3328]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2D4537]" />
                <span>100% Pure & Natural</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#FCFAF6] border border-[#DDD0BC] text-[#3D3328]">
                <Award className="w-3.5 h-3.5 text-[#8C521E]" />
                <span>Kiểm định VSA LAB</span>
              </span>
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <p className="text-xs text-[#7A6B5A] uppercase tracking-wider font-semibold mb-2.5">
                Kênh kết nối
              </p>
              <div className="flex items-center gap-2.5">
                <a
                  href={`tel:0833153388`}
                  aria-label="Gọi điện thoại hotline: 0833153388"
                  title="Gọi ngay: 0833 153 388"
                  className="w-9 h-9 rounded-lg bg-[#FCFAF6] border border-[#DDD0BC] flex items-center justify-center text-[#5E5144] hover:text-[#241D17] hover:bg-[#EBDDC8] transition-all duration-200 group"
                >
                  <Phone className="w-4 h-4 text-[#8C521E] group-hover:text-[#241D17] transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/share/192hEhEYeV/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Vườn Tinh Dầu"
                  title="Facebook Vườn Tinh Dầu"
                  className="w-9 h-9 rounded-lg bg-[#FCFAF6] border border-[#DDD0BC] flex items-center justify-center text-[#5E5144] hover:text-[#241D17] hover:bg-[#EBDDC8] transition-all duration-200 group"
                >
                  <Facebook className="w-4 h-4 text-[#8C521E] group-hover:text-[#241D17] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2 (2 cols): Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-semibold text-sm text-[#8C521E] uppercase tracking-wider flex items-center gap-1.5">
              <span>Liên kết</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5E5144]">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#241D17] transition-colors text-left cursor-pointer"
                >
                  Trang chủ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#241D17] transition-colors text-left cursor-pointer"
                >
                  Về chúng tôi
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('origins')}
                  className="hover:text-[#241D17] transition-colors text-left cursor-pointer"
                >
                  Vùng nguyên liệu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-[#241D17] transition-colors text-left cursor-pointer"
                >
                  Sản phẩm tinh dầu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('process')}
                  className="hover:text-[#241D17] transition-colors text-left cursor-pointer"
                >
                  Quy trình chiết xuất
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('news')}
                  className="hover:text-[#241D17] transition-colors text-left cursor-pointer"
                >
                  Tin tức & Kiến thức
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (2 cols): Customer Support & Policies */}
          <div className="lg:col-span-2 space-y-3.5">
            <h4 className="font-semibold text-sm text-[#8C521E] uppercase tracking-wider">
              Chính sách
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5E5144]">
              <li>
                <a href="#policy" className="hover:text-[#241D17] transition-colors block">
                  Tiêu chuẩn kiểm nghiệm COA
                </a>
              </li>
              <li>
                <a href="#shipping" className="hover:text-[#241D17] transition-colors block">
                  Giao hàng toàn quốc
                </a>
              </li>
              <li>
                <a href="#returns" className="hover:text-[#241D17] transition-colors block">
                  Đổi trả & hoàn tiền 15 ngày
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#241D17] transition-colors block">
                  Hướng dẫn bảo quản tinh dầu
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#241D17] transition-colors block">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (4 cols): Legal, Production & Exclusive Distribution */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="font-semibold text-sm text-[#8C521E] uppercase tracking-wider">
              Đơn vị sở hữu & Phân phối
            </h4>
            
            <div className="space-y-2.5">
              {/* Card 1: Owner */}
              <div className="bg-[#FCFAF6] p-3.5 rounded-xl border border-[#DDD0BC] text-xs text-[#5E5144] space-y-1">
                <div className="flex items-center gap-1.5 text-[#8C521E] font-bold text-[12px]">
                  <Building2 className="w-3.5 h-3.5 text-[#8C521E] shrink-0" />
                  <span>Đơn vị sở hữu & Chịu trách nhiệm:</span>
                </div>
                <p className="font-semibold text-[#241D17]">
                  {contact.researchUnit}
                </p>
                <p className="text-[#6A5A4A] text-[11px] flex items-start gap-1 pt-0.5">
                  <MapPin className="w-3 h-3 text-[#8C521E] shrink-0 mt-0.5" />
                  <span>22 Nguyễn Thức Tự, P. Ngũ Hành Sơn, TP. Đà Nẵng</span>
                </p>
              </div>

              {/* Card 2: Production Facility */}
              <div className="bg-[#FCFAF6] p-3 rounded-xl border border-[#DDD0BC] text-xs text-[#5E5144] space-y-1">
                <span className="text-[#8C521E] font-bold text-[11px] block">
                  Sản xuất tại:
                </span>
                <p className="font-semibold text-[#241D17] text-[12px]">
                  {contact.facilityName}
                </p>
                <p className="text-[#6A5A4A] text-[11px] flex items-start gap-1">
                  <MapPin className="w-3 h-3 text-[#8C521E] shrink-0 mt-0.5" />
                  <span>Thôn Tr'Hy, xã Hùng Sơn, Tây Giang, Quảng Nam</span>
                </p>
              </div>

              {/* Card 3: Exclusive Distributor & Hotline */}
              <div className="bg-[#FCFAF6] p-3 rounded-xl border border-[#DDD0BC] text-xs text-[#5E5144] space-y-1.5">
                <span className="text-[#8C521E] font-bold text-[11px] block">
                  Phân phối độc quyền:
                </span>
                <p className="font-semibold text-[#241D17] text-[12px]">
                  {contact.distributor}
                </p>
                <p className="text-[#6A5A4A] text-[11px] flex items-start gap-1">
                  <MapPin className="w-3 h-3 text-[#8C521E] shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </p>

                <div className="pt-2 border-t border-[#DDD0BC] flex flex-col gap-1.5">
                  <a
                    href={`tel:${contact.hotline.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] hover:bg-[#E2D0B6] transition-all font-bold text-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#8C521E]" />
                    <span>Hotline tư vấn & đặt hàng: {contact.hotline}</span>
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-[#6A5A4A] px-1 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-[#8C521E]" />
                      <span>Website chính thức:</span>
                    </span>
                    <a
                      href="https://vsalab.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-[#8C521E] hover:underline flex items-center gap-1"
                    >
                      <span>vsalab.vn</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Part: Legal Copyright, Admin Button & Back to Top */}
        <div className="pt-8 border-t border-[#DDD0BC]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A6B5A]">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p>© 2026 Vườn Tinh Dầu - VSA LAB (<a href="https://vsalab.vn" className="hover:underline font-semibold text-[#8C521E]">vsalab.vn</a>). All rights reserved.</p>
            <span className="hidden sm:inline">•</span>
            <div className="flex flex-wrap items-center justify-center gap-3 text-stone-600">
              <button
                type="button"
                onClick={() => onOpenLegal && onOpenLegal('privacy')}
                className="hover:text-[#8C521E] hover:underline cursor-pointer"
              >
                Chính sách bảo mật
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenLegal && onOpenLegal('terms')}
                className="hover:text-[#8C521E] hover:underline cursor-pointer"
              >
                Điều khoản sử dụng
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onOpenLegal && onOpenLegal('company')}
                className="hover:text-[#8C521E] hover:underline cursor-pointer"
              >
                Hồ sơ doanh nghiệp &amp; R&amp;D
              </button>
              <span>•</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#8C521E] hover:underline"
              >
                Sitemap
              </a>
              <span>•</span>
              <a
                href="/llms.txt"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#8C521E] hover:underline"
              >
                AI Search (llms.txt)
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-[#5E5144] hover:text-[#241D17] hover:underline transition-colors cursor-pointer group"
            >
              <span>Về đầu trang</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

