import React, { useState, useMemo, useRef } from 'react';
import {
  Info,
  Star,
  Sparkles,
  Droplets,
  MapPin,
  Check,
  ShieldCheck,
  Filter,
  Camera,
  Upload,
  Image as ImageIcon,
  X,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  Search,
  SlidersHorizontal,
  ChevronDown,
} from 'lucide-react';
import { Product } from '../types';
import { useContent } from '../context/ContentContext';
import { SectionEditButton } from './SectionEditButton';
import { compressImage } from '../utils/imageCompressor';
import { CATALOG_PRODUCTS } from '../data/catalogData';

interface ProductsSectionProps {
  onSelectProduct: (product: Product) => void;
}

type CategoryTab = 'all' | 'ban-dia' | 'thao-moc' | 'hoa' | 'che-pham';

// Pre-uploaded curated images for essential oils
const UPLOADED_ASSETS_GALLERY = [
  {
    name: 'Tinh Dầu Cam Rừng Tây Giang (Ảnh đã tải lên)',
    url: '/images/products/tinh-dau-cam-rung-tay-giang.webp',
    tag: 'Chai 30ml chuẩn VSA LAB',
  },
  {
    name: 'Tinh Dầu Trầm Hương Rừng (Ảnh đã tải lên)',
    url: '/images/products/tinh-dau-tram-huong-quang-nam.webp',
    tag: 'Chai 10ml chuẩn VSA LAB',
  },
  {
    name: 'Tinh Dầu Sả Chanh Tây Giang (Ảnh đã tải lên)',
    url: '/images/products/tinh-dau-sa-chanh-tay-giang.webp',
    tag: 'Chai 15ml chuẩn VSA LAB',
  },
  {
    name: 'Tinh Dầu Vỏ Bưởi Duyên Hải (Ảnh đã tải lên)',
    url: '/images/products/tinh-dau-buoi-quang-ngai.webp',
    tag: 'Chai 15ml chuẩn VSA LAB',
  },
  {
    name: 'Tinh Dầu Tràm Gió Cố Đô (Ảnh đã tải lên)',
    url: '/images/products/tinh-dau-tram-gio-quang-binh.webp',
    tag: 'Chai 30ml chuẩn VSA LAB',
  },
  {
    name: 'Chai Tinh Dầu Cam Rừng Thực Tế',
    url: '/images/products/tinh-dau-cam-rung-chai-30ml.jpg',
    tag: 'Ảnh chai thực tế',
  },
  {
    name: 'Tranh Nghệ Thuật Nương Rẫy Tây Giang',
    url: '/images/banner/banner-thu-hoach-cam-rung-tay-giang.jpg',
    tag: 'Nghệ thuật bản địa',
  },
  {
    name: 'Rừng Cam Cổ Thụ Sương Sớm',
    url: '/images/banner/banner-hero-cam-rung-tay-giang.jpg',
    tag: 'Cảnh quan nguyên liệu',
  },
  {
    name: 'Đại Ngàn Trường Sơn Tây Giang',
    url: '/images/background/vung-nguyen-lieu-dai-ngan-tay-giang.jpg',
    tag: 'Vùng trồng nguyên sinh',
  },
];

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>('all');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogModalCategory, setCatalogModalCategory] = useState<string>('all');

  const { siteData, updateProduct, isAdmin, saveAllNow } = useContent();
  const products = siteData.products?.length ? siteData.products : CATALOG_PRODUCTS;

  // Image update modal state
  const [editingProductImage, setEditingProductImage] = useState<Product | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showLocalToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  const handleApplyImage = async (product: Product, newImageUrl: string) => {
    updateProduct({
      ...product,
      image: newImageUrl,
    });
    setEditingProductImage(null);
    showLocalToast(`✓ Đã cập nhật ảnh mới cho ${product.name}!`);
    await saveAllNow();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editingProductImage) return;

    setIsProcessingUpload(true);
    try {
      const res = await compressImage(file, 1000, 1000, 0.85);
      await handleApplyImage(editingProductImage, res.dataUrl);
    } catch (err: any) {
      alert(err.message || 'Không thể xử lý hình ảnh tải lên.');
    } finally {
      setIsProcessingUpload(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const filteredProducts = useMemo(() => {
    if (activeTab === 'ban-dia') {
      return products.filter((p) => p.category === 'tinh-dau-ban-dia');
    }
    if (activeTab === 'thao-moc') {
      return products.filter((p) => p.category === 'tinh-dau-thao-moc');
    }
    if (activeTab === 'hoa') {
      return products.filter((p) => p.category === 'tinh-dau-hoa');
    }
    if (activeTab === 'che-pham') {
      return products.filter((p) => p.category === 'che-pham-thao-moc');
    }
    return products;
  }, [activeTab, products]);

  const displayedProducts = useMemo(() => {
    if (activeTab === 'all' && !isExpanded) {
      return filteredProducts.slice(0, 5);
    }
    return filteredProducts;
  }, [activeTab, isExpanded, filteredProducts]);

  // Modal catalog filtered list
  const modalCatalogFiltered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        catalogModalCategory === 'all' || p.category === catalogModalCategory;
      const q = catalogSearch.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.botanicalName.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [products, catalogModalCategory, catalogSearch]);

  return (
    <section id="products" className="py-20 lg:py-28 bg-[#F7F2E8] border-t border-[#E5DAC4] relative overflow-hidden">
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-50" />
      <div className="sunbeam-overlay opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-6">
          <SectionEditButton sectionTab="products" label="Quản lý & Sửa sản phẩm" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-4xl lg:max-w-5xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] text-xs font-semibold tracking-wider uppercase mb-3.5 shadow-2xs">
            <Droplets className="w-3.5 h-3.5 text-[#B2641E]" />
            <span>Bộ sưu tập tinh dầu bản địa</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[46px] font-bold text-[#241D17] tracking-normal sm:tracking-tight leading-tight">
            Tinh Dầu Nguyên Chất — <span className="text-[#8C521E] italic">Chắt chiu từng giọt</span>
          </h2>

          <p className="mt-4 text-[#55493D] text-sm sm:text-base lg:text-[17px] leading-relaxed font-sans max-w-3xl mx-auto">
            100% chiết xuất từ các loài dược liệu bản địa thuần chủng Việt Nam. Tiêu chuẩn kiểm nghiệm VSA LAB, hoàn toàn không cồn công nghiệp, không dầu khoáng hay phụ gia tạo mùi.
          </p>
        </div>

        {/* Filter Bar & Quality Highlights */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 sm:pb-8 mb-8 sm:mb-10 border-b border-[#E5DAC4]">
          {/* Category Tabs with horizontal scroll on mobile */}
          <div className="w-full md:w-auto overflow-x-auto no-scrollbar py-1">
            <div className="inline-flex items-center p-1 sm:p-1.5 rounded-xl bg-[#EFE7D8] border border-[#DDD0BC] shadow-inner text-xs font-semibold whitespace-nowrap min-w-max">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer min-h-[38px] ${
                  activeTab === 'all'
                    ? 'bg-[#8C521E] text-white shadow-xs'
                    : 'text-[#55493D] hover:text-[#241D17]'
                }`}
              >
                Tất cả sản phẩm ({products.length})
              </button>
              <button
                onClick={() => setActiveTab('ban-dia')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer min-h-[38px] ${
                  activeTab === 'ban-dia'
                    ? 'bg-[#8C521E] text-white shadow-xs'
                    : 'text-[#55493D] hover:text-[#241D17]'
                }`}
              >
                Bản địa đại ngàn ({products.filter((p) => p.category === 'tinh-dau-ban-dia').length})
              </button>
              <button
                onClick={() => setActiveTab('thao-moc')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer min-h-[38px] ${
                  activeTab === 'thao-moc'
                    ? 'bg-[#8C521E] text-white shadow-xs'
                    : 'text-[#55493D] hover:text-[#241D17]'
                }`}
              >
                Thảo mộc tự nhiên ({products.filter((p) => p.category === 'tinh-dau-thao-moc').length})
              </button>
              <button
                onClick={() => setActiveTab('hoa')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer min-h-[38px] ${
                  activeTab === 'hoa'
                    ? 'bg-[#8C521E] text-white shadow-xs'
                    : 'text-[#55493D] hover:text-[#241D17]'
                }`}
              >
                Hương hoa cao cấp ({products.filter((p) => p.category === 'tinh-dau-hoa').length})
              </button>
              <button
                onClick={() => setActiveTab('che-pham')}
                className={`px-3.5 sm:px-4 py-2 rounded-lg transition-all cursor-pointer min-h-[38px] ${
                  activeTab === 'che-pham'
                    ? 'bg-[#8C521E] text-white shadow-xs'
                    : 'text-[#55493D] hover:text-[#241D17]'
                }`}
              >
                Chế phẩm sinh học ({products.filter((p) => p.category === 'che-pham-thao-moc').length})
              </button>
            </div>
          </div>

          {/* Quality Assurance Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-medium text-[#251E18]">
            <div className="flex items-center gap-1.5 bg-[#FCFAF6] border border-[#DDD0BC] px-3 py-1.5 rounded-lg shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-[#8C521E] shrink-0" />
              <span>Kiểm định GC-MS độc lập</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#FCFAF6] border border-[#DDD0BC] px-3 py-1.5 rounded-lg shadow-2xs">
              <Sparkles className="w-4 h-4 text-[#B2641E] shrink-0" />
              <span>100% Tinh khiết tự nhiên</span>
            </div>
          </div>
        </div>

        {/* Balanced Reorganized Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {displayedProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-[#DDD0BC] hover:border-[#8C521E] shadow-2xs hover-card-lift flex flex-col justify-between"
            >
              {/* Image Container with Badges */}
              <div
                className="relative aspect-4/3 overflow-hidden bg-[#F2ECE2] cursor-pointer"
                onClick={() => onSelectProduct(product)}
              >
                <img
                  src={product.image || '/images/products/tinh-dau-cam-rung-chai-30ml.jpg'}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 group-hover:from-black/60 transition-colors pointer-events-none" />

                {/* Bottom Overlay Origin Tag */}
                <div className="absolute bottom-3 left-3.5 flex items-center gap-1.5 text-white/95 text-xs drop-shadow-sm font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#E6C285]" />
                  <span>{product.origin}</span>
                </div>
              </div>

              {/* Product Content Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between bg-[#FCFAF6]">
                <div>
                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs text-[#B2641E]">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#B2641E] text-[#B2641E]" />
                        ))}
                      </div>
                      <span className="text-[#6D5E50] text-[11px] font-medium">({product.reviewsCount} đánh giá)</span>
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold text-[#8C521E] uppercase tracking-wider bg-[#EBDDC8] px-2 py-0.5 rounded">
                      Chính hãng VSA
                    </span>
                  </div>

                  {/* Title & Scientific Nomenclature */}
                  <h3
                    className="font-serif text-lg sm:text-xl font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors cursor-pointer leading-snug"
                    onClick={() => onSelectProduct(product)}
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#7A6B5A] italic font-serif mt-1">
                    {product.botanicalName}
                  </p>

                  {/* Aroma Profile Notes */}
                  <div className="mt-3 p-2.5 rounded-lg bg-[#F5EFE4] border border-[#E2D6C3] text-xs text-[#4E4236] leading-relaxed">
                    <span className="font-semibold text-[#8C521E] block mb-0.5">Tầng hương:</span>
                    {product.scentNotes}
                  </div>

                  {/* Key Benefits Tags */}
                  {product.benefits && product.benefits.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {product.benefits.slice(0, 2).map((benefit, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-[#EFE7D8] text-[#3D3228] text-[10px] sm:text-[11px] font-medium leading-tight"
                        >
                          <Check className="w-3 h-3 text-[#8C521E] shrink-0" />
                          <span className="line-clamp-1">{benefit}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Section */}
                <div className="pt-3 sm:pt-4 mt-4 sm:mt-5 border-t border-[#E5DAC4]">
                  <button
                    id={`btn-product-info-${product.id}`}
                    onClick={() => onSelectProduct(product)}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[42px] py-2.5 px-4 rounded-lg bg-[#8C521E] text-white text-xs sm:text-sm font-semibold hover:bg-[#724116] transition-all shadow-sm active:scale-[0.98] cursor-pointer btn-hover-shimmer"
                  >
                    <span>Xem thêm các sản phẩm</span>
                    <ArrowRight className="w-4 h-4 text-[#F5EDE1] transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Complementary Advisory Card when viewing all products and not expanded */}
          {activeTab === 'all' && !isExpanded && (
            <div className="bg-[#2B231D] text-[#FAF5EB] rounded-2xl p-7 border border-[#483B32] shadow-lg flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#E6C285]/10 blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Dự án bảo tồn dược liệu</span>
                </div>

                <h3 className="font-serif text-2xl font-bold leading-snug mb-3 text-white">
                  Cần tư vấn phối hương hoặc đặt mẫu thử nghiệm?
                </h3>

                <p className="text-[#DDD0BC] text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  Trung tâm Khoa học VSA và các Hợp tác xã dược liệu luôn sẵn sàng cung cấp thông số kỹ thuật (COA, GC-MS), tư vấn ứng dụng liệu pháp mùi hương cho gia đình và cơ sở trị liệu.
                </p>

                <div className="space-y-2.5 text-xs text-[#EFE7D8]">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#E6C285]" />
                    <span>Truy xuất nguồn gốc theo từng lô chưng cất</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#E6C285]" />
                    <span>Chiết xuất bằng nồi inox 304 áp suất thấp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#E6C285]" />
                    <span>Hợp tác xã bản địa trực tiếp thu hái bền vững</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/15 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(true);
                    setIsCatalogModalOpen(true);
                    showLocalToast('✓ Đang hiển thị toàn bộ 22 dòng sản phẩm VSA LAB!');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold transition-colors shadow-md cursor-pointer"
                >
                  <span>Xem thêm các sản phẩm</span>
                  <ArrowRight className="w-4 h-4 text-[#F5EDE1]" />
                </button>
                <a
                  href="tel:0833153388"
                  className="inline-flex items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors border border-white/20"
                >
                  <span>Hotline: 0833-15-3388</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Expanded Banner when showing all 22 products */}
        {isExpanded && activeTab === 'all' && (
          <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-[#EFE7D8] border border-[#DDD0BC] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8C521E]/15 border border-[#8C521E]/30 text-[#8C521E] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#8C521E]" />
              </div>
              <div>
                <p className="font-serif font-bold text-sm text-[#241D17]">
                  Đang hiển thị toàn bộ {products.length} sản phẩm thảo mộc & tinh dầu VSA LAB
                </p>
                <p className="text-xs text-[#7A6B5A]">
                  Tất cả sản phẩm đều được chiết xuất tự nhiên, chuẩn hóa dược liệu theo tiêu chuẩn VSA LAB
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setIsCatalogModalOpen(true)}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#DDD0BC] hover:border-[#8C521E] text-[#8C521E] text-xs font-bold shadow-2xs hover:bg-[#FAF6F0] transition-all cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Mở bảng tra cứu {products.length} sản phẩm</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  const el = document.getElementById('products');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <span>Thu gọn hiển thị</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full Catalog Modal for browsing all products */}
      {isCatalogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-[#FAF6F0] rounded-2xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-[#D5C6B3] relative text-[#241D17] my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#DDD0BC] shrink-0">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBDDC8] text-[#8C521E] text-xs font-bold mb-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Danh Mục Toàn Diện ({products.length} Sản Phẩm)</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#241D17]">
                  Dòng Sản Phẩm Thảo Mộc & Tinh Dầu VSA LAB
                </h3>
                <p className="text-xs text-[#7A6B5A]">
                  Khám phá toàn bộ {products.length} dòng tinh dầu nguyên chất, dược liệu bản địa và chế phẩm sinh học an toàn
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCatalogModalOpen(false)}
                className="p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter and Search Bar inside Modal */}
            <div className="py-4 border-b border-[#DDD0BC] space-y-3 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  placeholder="Tìm kiếm nhanh trong 22 sản phẩm (cam rừng, sen, quế, gel rửa tay, lau sàn...)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white text-stone-900 outline-none focus:border-[#8C521E] shadow-2xs"
                />
                {catalogSearch && (
                  <button
                    onClick={() => setCatalogSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-semibold"
                  >
                    Xóa
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  { id: 'all', label: `Tất cả (${products.length})` },
                  { id: 'ban-dia', label: `Bản địa đại ngàn (${products.filter((p) => p.category === 'tinh-dau-ban-dia').length})` },
                  { id: 'thao-moc', label: `Thảo mộc tự nhiên (${products.filter((p) => p.category === 'tinh-dau-thao-moc').length})` },
                  { id: 'hoa', label: `Hương hoa cao cấp (${products.filter((p) => p.category === 'tinh-dau-hoa').length})` },
                  { id: 'che-pham-thao-moc', label: `Chế phẩm sinh học (${products.filter((p) => p.category === 'che-pham-thao-moc').length})` },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCatalogModalCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                      catalogModalCategory === cat.id
                        ? 'bg-[#8C521E] text-white shadow-xs'
                        : 'bg-[#EFE7D8] text-[#55493D] hover:bg-[#E5DAC4]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Products Catalog Grid */}
            <div className="flex-1 overflow-y-auto py-4 pr-1 space-y-3">
              {modalCatalogFiltered.length === 0 ? (
                <div className="text-center py-12 text-stone-500 text-xs">
                  Không tìm thấy sản phẩm nào khớp với từ khóa "{catalogSearch}".
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                  {modalCatalogFiltered.map((p) => (
                    <div
                      key={p.id}
                      className="p-3 bg-white rounded-xl border border-stone-200 hover:border-[#8C521E] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-stone-100 mb-2.5">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                            }}
                          />
                        </div>

                        <h4 className="font-serif font-bold text-sm text-[#241D17] group-hover:text-[#8C521E] line-clamp-1">
                          {p.name}
                        </h4>
                        <p className="text-[11px] text-[#7A6B5A] italic font-serif line-clamp-1">
                          {p.botanicalName}
                        </p>
                        <p className="text-[11px] text-[#55493D] mt-1.5 line-clamp-2 leading-relaxed">
                          {p.description}
                        </p>
                      </div>

                      <div className="pt-2.5 mt-2.5 border-t border-stone-100 flex items-center justify-between">
                        <div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C521E] bg-[#F5EDE1] px-2.5 py-1 rounded-md">
                            Liên hệ báo giá
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setIsCatalogModalOpen(false);
                            onSelectProduct(p);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-semibold shadow-xs cursor-pointer transition-all"
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#DDD0BC] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
              <span className="text-[#7A6B5A]">
                Hiển thị <strong>{modalCatalogFiltered.length}</strong> / {products.length} sản phẩm
              </span>
              <button
                type="button"
                onClick={() => setIsCatalogModalOpen(false)}
                className="py-2 px-5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold cursor-pointer transition-colors"
              >
                Đóng bảng tra cứu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input for quick direct upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Quick Image Update Modal (Admin Only) */}
      {isAdmin && editingProductImage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-[#FAF6F0] rounded-2xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-[#D5C6B3] relative text-[#243328] my-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3.5 mb-4 border-b border-[#D5C6B3]">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#8C521E]/15 border border-[#8C521E]/30 text-[#8C521E] flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#142319]">
                    Cập Nhật Ảnh Cho Sản Phẩm
                  </h3>
                  <p className="text-xs text-stone-600">
                    {editingProductImage.name}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProductImage(null)}
                className="p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Preview */}
            <div className="mb-4 p-3 bg-white rounded-xl border border-stone-200 flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-300 shrink-0">
                <img
                  src={editingProductImage.image}
                  alt={editingProductImage.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <span className="font-bold text-[#8C521E] block truncate">Ảnh hiện tại</span>
                <span className="text-stone-500 text-[11px] block truncate font-mono">
                  {editingProductImage.image}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-medium mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  Đang hiển thị trên website
                </span>
              </div>
            </div>

            {/* Option A: Direct Device Upload */}
            <div className="space-y-3 mb-5">
              <span className="text-xs font-bold text-[#241D17] uppercase tracking-wider block">
                Cách 1: Tải ảnh mới từ máy tính / điện thoại
              </span>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#8C521E]/40 hover:border-[#8C521E] bg-[#FCFAF6] hover:bg-[#F5EDE1] rounded-xl p-5 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-11 h-11 rounded-full bg-[#EBDDC8] text-[#8C521E] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isProcessingUpload ? (
                    <RefreshCw className="w-5 h-5 animate-spin" />
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                </div>
                <div className="text-xs font-semibold text-[#241D17]">
                  {isProcessingUpload ? 'Đang xử lý và nén ảnh...' : 'Bấm vào đây để chọn file ảnh'}
                </div>
                <p className="text-[11px] text-stone-500">
                  Hỗ trợ JPG, PNG, WebP. Tự động nén tối ưu hiển thị sắc nét.
                </p>
              </div>
            </div>

            {/* Option B: Pick from Pre-uploaded Gallery */}
            <div className="space-y-3 mb-5">
              <span className="text-xs font-bold text-[#241D17] uppercase tracking-wider block">
                Cách 2: Chọn từ thư viện ảnh đã tải lên
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                {UPLOADED_ASSETS_GALLERY.map((asset) => {
                  const isSelected = editingProductImage.image === asset.url;
                  return (
                    <div
                      key={asset.url}
                      onClick={() => handleApplyImage(editingProductImage, asset.url)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'border-[#8C521E] bg-[#FAF1E3] ring-2 ring-[#8C521E]/30'
                          : 'border-stone-200 bg-white hover:border-[#8C521E]/60 hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img
                          src={asset.url}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-[11px]">
                        <p className="font-semibold text-stone-900 leading-tight line-clamp-1">
                          {asset.name}
                        </p>
                        <span className="text-[10px] text-[#8C521E] font-medium block mt-0.5">
                          {asset.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Option C: Direct URL Input */}
            <div className="space-y-2 mb-4">
              <span className="text-xs font-bold text-[#241D17] uppercase tracking-wider block">
                Cách 3: Dán link ảnh trực tuyến (URL)
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="https://... hoặc /images/products/tinh-dau-cam-rung-chai-30ml.jpg"
                  className="flex-1 px-3 py-2 rounded-xl border border-stone-300 text-xs bg-white text-stone-900 outline-none focus:border-[#8C521E]"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customImageUrl.trim()) {
                      handleApplyImage(editingProductImage, customImageUrl.trim());
                      setCustomImageUrl('');
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-xs font-semibold cursor-pointer shrink-0 transition-all"
                >
                  Áp dụng
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-[#D5C6B3] flex justify-end gap-2 text-xs">
              <button
                type="button"
                onClick={() => setEditingProductImage(null)}
                className="py-2 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 font-semibold cursor-pointer transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Local Feedback Toast */}
      {feedbackToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E3125] text-white px-5 py-3 rounded-full shadow-2xl border border-[#D9C8AC]/40 text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{feedbackToast}</span>
        </div>
      )}
    </section>
  );
};
