import React, { useState } from 'react';
import {
  Globe,
  Search,
  CheckCircle,
  ExternalLink,
  Send,
  Zap,
  ShieldCheck,
  FileText,
  BarChart2,
  Copy,
  Info
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { SiteSeoData, PageSeoConfig } from '../types/seo';

interface AdminSeoPanelProps {
  onShowToast: (msg: string) => void;
}

export const AdminSeoPanel: React.FC<AdminSeoPanelProps> = ({ onShowToast }) => {
  const { siteData, updateSeoConfig, updatePageSeo, pingIndexNow } = useContent();
  const seo = siteData.seo || ({} as SiteSeoData);

  const [selectedPageId, setSelectedPageId] = useState<string>('home');
  const [isPinging, setIsPinging] = useState(false);

  const pagesList = [
    { id: 'home', name: 'Trang chủ (Homepage)' },
    { id: 'about', name: 'Về chúng tôi (#ve-chung-toi)' },
    { id: 'vsa-about', name: 'Trung tâm VSA LAB (#ve-vsa-lab)' },
    { id: 'tay-giang', name: 'Vùng nguyên liệu Tây Giang (#tay-giang)' },
    { id: 'quang-ngai', name: 'Vùng nguyên liệu Quảng Ngãi (#quang-ngai)' },
    { id: 'quang-binh', name: 'Vùng nguyên liệu Quảng Bình (#quang-binh)' },
    { id: 'process', name: 'Quy trình sản xuất (#quy-trinh-san-xuat)' },
    { id: 'journey', name: 'Hành trình nguyên bản (#hanh-trinh-nguyen-ban)' },
    { id: 'tay-giang-news', name: 'Bài viết: Rừng nguyên liệu Tây Giang' },
    { id: 'sleep-wellness-news', name: 'Bài viết: 5 Lợi ích giấc ngủ & thư giãn' },
    { id: 'extraction-tech-news', name: 'Bài viết: Công nghệ chiết xuất hơi nước' },
  ];

  const currentPageConfig: PageSeoConfig = seo.pages?.[selectedPageId] || {};

  const handleIndexNowPing = async () => {
    setIsPinging(true);
    const success = await pingIndexNow();
    setIsPinging(false);
    if (success) {
      onShowToast('✓ Đã gửi thông báo IndexNow đến Bing & các công cụ tìm kiếm thành công!');
    } else {
      onShowToast('Không thể kết nối đến máy chủ IndexNow. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#1E3125] to-[#2D4B39] text-white p-5 rounded-2xl shadow-sm border border-[#2D4B39]/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>Chuẩn SEO Quốc Tế &amp; AI Search Engine</span>
            </div>
            <h3 className="font-serif text-xl font-bold">Quản Trị SEO &amp; Lập Chỉ Mục Tự Động</h3>
            <p className="text-xs text-stone-300">
              Cấu hình thẻ Meta, Schema JSON-LD, Sitemap XML, Google Search Console và giao thức IndexNow
            </p>
          </div>

          <button
            type="button"
            disabled={isPinging}
            onClick={handleIndexNowPing}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-stone-900 font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Zap className={`w-4 h-4 ${isPinging ? 'animate-spin' : ''}`} />
            <span>{isPinging ? 'Đang gửi...' : 'Gửi IndexNow ngay (Bing & Search)'}</span>
          </button>
        </div>
      </div>

      {/* 2. Global SEO Settings */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3 flex items-center justify-between">
          <div>
            <h4 className="font-serif text-base font-bold text-[#1E3125]">
              1. Cấu Hình SEO Mặc Định Toàn Website
            </h4>
            <p className="text-xs text-stone-500">
              Áp dụng cho tên miền chính <span className="font-mono text-emerald-800">https://vsalab.vn</span>
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold">
            Tự động đồng bộ
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Tiêu đề SEO mặc định (Default Meta Title)
            </label>
            <input
              type="text"
              value={seo.defaultTitle || ''}
              onChange={(e) => updateSeoConfig({ defaultTitle: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:border-emerald-600 outline-none"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              Độ dài tối ưu 50 - 60 ký tự. Hiện tại: {seo.defaultTitle?.length || 0} ký tự.
            </span>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Mô tả tìm kiếm mặc định (Default Meta Description)
            </label>
            <textarea
              rows={3}
              value={seo.defaultDescription || ''}
              onChange={(e) => updateSeoConfig({ defaultDescription: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:border-emerald-600 outline-none"
            />
            <span className="text-[11px] text-stone-400 mt-1 block">
              Độ dài tối ưu 120 - 160 ký tự. Hiện tại: {seo.defaultDescription?.length || 0} ký tự.
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Từ khóa chính (Meta Keywords)
            </label>
            <input
              type="text"
              value={seo.defaultKeywords || ''}
              onChange={(e) => updateSeoConfig({ defaultKeywords: e.target.value })}
              placeholder="tinh dầu thiên nhiên, tinh dầu vsalab..."
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Tên miền gốc (Canonical Base URL)
            </label>
            <input
              type="text"
              value={seo.canonicalBase || 'https://vsalab.vn'}
              onChange={(e) => updateSeoConfig({ canonicalBase: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 font-mono focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Ảnh chia sẻ mạng xã hội mặc định (Default OG Image)
            </label>
            <input
              type="text"
              value={seo.defaultOgImage || ''}
              onChange={(e) => updateSeoConfig({ defaultOgImage: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:border-emerald-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Tác giả &amp; Đơn vị nghiên cứu (Author Credit)
            </label>
            <input
              type="text"
              value={seo.author || ''}
              onChange={(e) => updateSeoConfig({ author: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 focus:border-emerald-600 outline-none"
            />
          </div>
        </div>
      </div>

      {/* 3. Per-Page SEO Overrides */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-serif text-base font-bold text-[#1E3125]">
              2. Tối Ưu SEO Cho Từng Trang Cụ Thể (Per-Page SEO)
            </h4>
            <p className="text-xs text-stone-500">
              Tùy biến tiêu đề, mô tả và chỉ thị robots độc lập cho từng mục bài viết &amp; vùng nguyên liệu
            </p>
          </div>

          <select
            value={selectedPageId}
            onChange={(e) => setSelectedPageId(e.target.value)}
            className="p-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-800 bg-stone-50 outline-none focus:border-emerald-600"
          >
            {pagesList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4 bg-stone-50/70 p-4 rounded-xl border border-stone-200">
          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Tiêu đề trang (SEO Title)
            </label>
            <input
              type="text"
              value={currentPageConfig.title || ''}
              placeholder="Nhập tiêu đề SEO riêng cho trang này..."
              onChange={(e) =>
                updatePageSeo(selectedPageId, { title: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Mô tả ngắn trang (Meta Description)
            </label>
            <textarea
              rows={2}
              value={currentPageConfig.description || ''}
              placeholder="Nhập mô tả tóm tắt cho trang này..."
              onChange={(e) =>
                updatePageSeo(selectedPageId, { description: e.target.value })
              }
              className="w-full p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={currentPageConfig.canonical || ''}
                placeholder="https://vsalab.vn/..."
                onChange={(e) =>
                  updatePageSeo(selectedPageId, { canonical: e.target.value })
                }
                className="w-full p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 font-mono outline-none focus:border-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                Chỉ thị Robots (Index / Follow)
              </label>
              <select
                value={currentPageConfig.robots || 'index, follow'}
                onChange={(e) =>
                  updatePageSeo(selectedPageId, { robots: e.target.value })
                }
                className="w-full p-2.5 rounded-xl bg-white border border-stone-200 text-xs text-stone-900 outline-none focus:border-emerald-600"
              >
                <option value="index, follow">Cho phép lập chỉ mục (index, follow)</option>
                <option value="noindex, follow">Không lập chỉ mục nhưng theo dõi link (noindex, follow)</option>
                <option value="noindex, nofollow">Chặn hoàn toàn (noindex, nofollow)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Google & Bing Webmaster Verification IDs */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs space-y-4">
        <div className="border-b border-stone-100 pb-3">
          <h4 className="font-serif text-base font-bold text-[#1E3125]">
            3. Mã Theo Dõi &amp; Xác Minh Công Cụ Tìm Kiếm
          </h4>
          <p className="text-xs text-stone-500">
            Dán mã ID vào đây để hệ thống tự động chèn vào thẻ &lt;head&gt; mà không cần sửa mã nguồn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Google Search Console Verification Code
            </label>
            <input
              type="text"
              value={seo.googleSearchConsoleCode || ''}
              placeholder="VD: google-site-verification=xxxx..."
              onChange={(e) => updateSeoConfig({ googleSearchConsoleCode: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 font-mono outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Google Analytics 4 (GA4 Measurement ID)
            </label>
            <input
              type="text"
              value={seo.googleAnalyticsId || ''}
              placeholder="VD: G-XXXXXXXXXX"
              onChange={(e) => updateSeoConfig({ googleAnalyticsId: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 font-mono outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Google Tag Manager (GTM ID)
            </label>
            <input
              type="text"
              value={seo.googleTagManagerId || ''}
              placeholder="VD: GTM-XXXXXXX"
              onChange={(e) => updateSeoConfig({ googleTagManagerId: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 font-mono outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
              Bing Webmaster Tools Verification Code
            </label>
            <input
              type="text"
              value={seo.bingVerificationCode || ''}
              placeholder="VD: msvalidate.01=xxxx..."
              onChange={(e) => updateSeoConfig({ bingVerificationCode: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-stone-200 text-xs text-stone-900 font-mono outline-none focus:border-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* 5. Sitemaps & AI Crawlers Links */}
      <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#DDD0BC] space-y-3">
        <h5 className="font-bold text-xs text-[#241D17] uppercase tracking-wider flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-[#8C521E]" />
          <span>Liên kết Sitemaps &amp; Tệp dữ liệu AI Search trực tiếp:</span>
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {[
            { label: 'Sitemap Index:', url: '/sitemap.xml' },
            { label: 'Sitemap Trang Chính:', url: '/sitemap-pages.xml' },
            { label: 'Sitemap Bài Viết & Blog:', url: '/sitemap-blog.xml' },
            { label: 'Sitemap Hình Ảnh:', url: '/sitemap-images.xml' },
            { label: 'Tệp robots.txt:', url: '/robots.txt' },
            { label: 'Tệp AI Discovery:', url: '/llms.txt' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#E5DAC4]">
              <span className="text-stone-600">{item.label}</span>
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-emerald-800 hover:text-emerald-950 hover:underline flex items-center gap-1"
              >
                <span>{item.url}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
