import React from 'react';
import { X, MapPin, Mountain, Wind, CheckCircle2, Phone, Star, Share2, ShieldCheck, ArrowRight, Edit3 } from 'lucide-react';
import { Region, Article, Product } from '../types';
import { useContent } from '../context/ContentContext';
import { getArticleRealtimeDate } from '../utils/dateHelper';

interface DetailModalProps {
  type: 'region' | 'article' | 'product' | null;
  data: any;
  onClose: () => void;
  onShowToast?: (msg: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  type,
  data,
  onClose,
  onShowToast,
}) => {
  const { isAdmin, openCms } = useContent();

  if (!type || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 my-auto sm:my-8 max-h-[92vh] flex flex-col">
        {/* Top bar with close button */}
        <div className="px-4 py-3 sm:p-4 border-b border-stone-100 flex items-center justify-between bg-[#FAFBF9] shrink-0">
          <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider line-clamp-1">
            {type === 'region' && 'Khám phá vùng nguyên liệu'}
            {type === 'article' && 'Bài viết kiến thức & Cẩm nang VSA LAB'}
            {type === 'product' && 'Thông tin sản phẩm chi tiết'}
          </span>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 sm:space-y-6">
          {/* Region Modal */}
          {type === 'region' && (
            <div className="space-y-6">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-inner bg-stone-100">
                <img
                  src={(data as Region).image}
                  alt={(data as Region).name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{(data as Region).province}</span>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {(data as Region).name}
                </h3>
                <p className="text-xs font-semibold uppercase text-emerald-800 tracking-wider mt-1">
                  {(data as Region).tagline}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-stone-50 border border-stone-200/60 text-xs">
                <div className="flex items-center gap-2 text-stone-700">
                  <Mountain className="w-4 h-4 text-emerald-700" />
                  <span>Độ cao: <strong>{(data as Region).altitude}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-stone-700">
                  <Wind className="w-4 h-4 text-emerald-700" />
                  <span>Khí hậu: <strong>{(data as Region).climate}</strong></span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">Các loài dược liệu chính:</h4>
                <div className="flex flex-wrap gap-2">
                  {(data as Region).herbs.map((herb, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-medium"
                    >
                      {herb}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
                <h4 className="text-sm font-bold text-stone-900">Câu chuyện vùng đất:</h4>
                <p>{(data as Region).fullStory}</p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  Vùng trồng liên kết hữu cơ đạt chuẩn
                </span>
                <div className="flex items-center gap-3">
                  {(data as Region).id === 'ninh-binh' && (
                    <button
                      onClick={() => {
                        onClose();
                        window.location.hash = '#ninh-binh';
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C521E] text-white font-medium hover:bg-[#724116] transition-colors cursor-pointer"
                    >
                      <span>Xem toàn trang</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast('Đã sao chép liên kết vùng nguyên liệu');
                    }}
                    className="inline-flex items-center gap-1 text-stone-600 hover:text-emerald-800 cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Modal */}
          {type === 'product' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={(data as Product).image}
                    alt={(data as Product).name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-semibold text-stone-800">
                    {(data as Product).volume}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-stone-500">({(data as Product).reviewsCount} đánh giá)</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-900">
                    {(data as Product).name}
                  </h3>
                  <p className="text-xs text-stone-500 font-serif italic">
                    {(data as Product).botanicalName} • Nguồn gốc: {(data as Product).origin}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F5EDE1] text-[#8C521E] font-bold text-xs sm:text-sm border border-[#D9C8AC] shadow-2xs">
                      Liên hệ báo giá &amp; tư vấn theo số lượng
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Chính hãng VSA LAB
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-stone-50 border border-stone-200/70 text-xs text-stone-600">
                    <strong className="text-stone-800 block mb-0.5">Nốt hương đặc trưng:</strong>
                    {(data as Product).scentNotes}
                  </div>

                  <div className="pt-2 space-y-2">
                    <a
                      href="tel:0833153388"
                      className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#8C521E] text-white text-sm font-semibold hover:bg-[#724116] transition-colors shadow-md"
                    >
                      <Phone className="w-4 h-4 text-[#F5EDE1]" />
                      <span>Liên hệ tư vấn: 0833-15-3388</span>
                    </a>

                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          openCms('products');
                        }}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-[#FAF6F0] border border-[#8C521E]/40 text-[#8C521E] text-xs font-bold hover:bg-[#8C521E] hover:text-white transition-all cursor-pointer shadow-2xs"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#C87018]" />
                        <span>Thay ảnh & Chỉnh sửa sản phẩm này (CMS)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">Mô tả sản phẩm:</h4>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {(data as Product).description}
                </p>
              </div>

              {/* Ingredients & Usage if available */}
              {((data as Product).ingredients || (data as Product).usage) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#FAF6F0] border border-[#E3DACD] text-xs">
                  {(data as Product).ingredients && (
                    <div>
                      <span className="font-bold text-[#1E3125] block mb-0.5">Thành phần:</span>
                      <p className="text-[#4E5D52]">{(data as Product).ingredients}</p>
                    </div>
                  )}
                  {(data as Product).usage && (
                    <div>
                      <span className="font-bold text-[#1E3125] block mb-0.5">Cách dùng:</span>
                      <p className="text-[#4E5D52]">{(data as Product).usage}</p>
                    </div>
                  )}
                  {(data as Product).storage && (
                    <div>
                      <span className="font-bold text-[#1E3125] block mb-0.5">Bảo quản:</span>
                      <p className="text-[#4E5D52]">{(data as Product).storage}</p>
                    </div>
                  )}
                  {(data as Product).caution && (
                    <div>
                      <span className="font-bold text-[#C87018] block mb-0.5">Lưu ý:</span>
                      <p className="text-[#4E5D52]">{(data as Product).caution}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Legal & Production Specifications */}
              {(data as Product).batchNo && (
                <div className="p-4 rounded-xl bg-white border border-[#D8CEBF] space-y-2 text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#EAE0D2]">
                    <span className="font-bold text-[#1E3125]">Thông số xuất xưởng & Kiểm nghiệm:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#EAE0D2] text-[#8C531E] font-bold text-[11px]">
                      Lô: {(data as Product).batchNo}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[#55695B] text-[11px]">
                    <div>
                      <span className="text-stone-400 block">Ngày sản xuất:</span>
                      <span className="font-medium text-[#1E3125]">{(data as Product).mfgDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Hạn sử dụng:</span>
                      <span className="font-medium text-[#1E3125]">{(data as Product).expDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block">Hotline tư vấn:</span>
                      <span className="font-bold text-[#C87018]">{(data as Product).hotline}</span>
                    </div>
                  </div>
                  {(data as Product).producer && (
                    <div className="pt-1 text-[11px] text-[#55695B]">
                      <strong>Đơn vị sở hữu:</strong> {(data as Product).producer}
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="text-sm font-bold text-stone-900 mb-2">Công dụng nổi bật:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(data as Product).benefits.map((b: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-[#8C521E] shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Article Modal */}
          {type === 'article' && (
            <div className="space-y-6">
              <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={(data as Article).image}
                  alt={(data as Article).title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#241D17]/85 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-semibold">
                  {(data as Article).category}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                  <span>{getArticleRealtimeDate((data as Article).id, (data as Article).date)}</span>
                  <span>•</span>
                  <span>Tác giả: {(data as Article).author}</span>
                  <span>•</span>
                  <span>{(data as Article).readTime}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-snug">
                  {(data as Article).title}
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-[#F5EDE1] border border-[#DDD0BC] text-[#241D17] font-serif italic text-sm leading-relaxed">
                {(data as Article).excerpt}
              </div>

              <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
                {(data as Article).content.map((p: string, idx: number) => {
                  const isNumbered = /^[0-9]+\.\s/.test(p);
                  if (isNumbered) {
                    const parts = p.split(': ');
                    return (
                      <div key={idx} className="pt-2">
                        <strong className="text-stone-900 block font-serif text-base mb-1">{parts[0]}</strong>
                        {parts.slice(1).join(': ') && <p>{parts.slice(1).join(': ')}</p>}
                      </div>
                    );
                  }
                  return <p key={idx}>{p}</p>;
                })}
              </div>

              {/* Gallery Grid inside modal if available */}
              {(data as Article).gallery && ((data as Article).gallery?.length || 0) > 1 && (
                <div className="pt-4 border-t border-stone-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                    Hình ảnh tư liệu ({((data as Article).gallery?.length || 0)} ảnh):
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {((data as Article).gallery || []).slice(0, 6).map((imgUrl: string, gIdx: number) => (
                      <div key={gIdx} className="aspect-4/3 rounded-lg overflow-hidden bg-stone-100 border border-stone-200">
                        <img
                          src={imgUrl}
                          alt={`Tư liệu ${gIdx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Chuyên mục: {(data as Article).category}</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      window.location.hash = `#bai-viet-${(data as Article).id}`;
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#8C521E] text-white font-medium hover:bg-[#724116] transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Xem toàn trang</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (onShowToast) onShowToast('Đã lưu bài viết vào mục yêu thích');
                    }}
                    className="text-[#8C521E] font-semibold hover:underline cursor-pointer"
                  >
                    Lưu bài viết
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
