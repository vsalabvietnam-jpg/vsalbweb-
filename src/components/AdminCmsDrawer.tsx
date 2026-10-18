import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Edit2,
  Download,
  Upload,
  Layers,
  Sparkles,
  ShoppingBag,
  MapPin,
  Flame,
  FileText,
  Phone,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Check,
  LogOut,
  Smartphone,
  RefreshCw,
  Globe,
} from 'lucide-react';
import { useContent, SiteTexts } from '../context/ContentContext';
import { Product, Region, ProcessStep, Article } from '../types';
import { ImageUploadField } from './ImageUploadField';
import { AdminSeoPanel } from './AdminSeoPanel';

interface AdminCmsDrawerProps {
  onShowToast: (message: string) => void;
}

export const AdminCmsDrawer: React.FC<AdminCmsDrawerProps> = ({ onShowToast }) => {
  const {
    isCmsOpen,
    closeCms,
    activeCmsTab,
    openCms,
    siteData,
    syncStatus,
    lastSyncedTime,
    updateTextSection,
    updateProduct,
    addProduct,
    deleteProduct,
    updateRegion,
    updateProcessStep,
    updateArticle,
    saveAllNow,
    logout,
    resetToDefault,
    exportDataJson,
    importDataJson,
  } = useContent();

  const handleSaveAndFinish = async (customMessage?: string) => {
    await saveAllNow();
    closeCms();
    onShowToast(customMessage || '✓ Đã lưu toàn bộ thay đổi lên hệ thống & đồng bộ tức thì sang điện thoại!');
  };

  const handleSaveAndLogout = async () => {
    await saveAllNow();
    closeCms();
    logout();
    onShowToast('✓ Đã lưu tất cả cài đặt và đăng xuất Quản trị viên thành công!');
  };

  const handleSaveDraft = async (customMessage?: string) => {
    await saveAllNow();
    onShowToast(customMessage || '✓ Đã lưu vào máy chủ và cập nhật trực tiếp trên điện thoại!');
  };

  const [selectedProductId, setSelectedProductId] = useState<string>(
    siteData.products[0]?.id || ''
  );
  const [selectedRegionId, setSelectedRegionId] = useState<string>(
    siteData.regions[0]?.id || ''
  );
  const [selectedStepNumber, setSelectedStepNumber] = useState<string>(
    siteData.processSteps[0]?.number || '01'
  );
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    siteData.articles[0]?.id || ''
  );

  const [jsonImportText, setJsonImportText] = useState('');
  const [jsonImportError, setJsonImportError] = useState<string | null>(null);

  if (!isCmsOpen) return null;

  const currentProduct =
    siteData.products.find((p) => p.id === selectedProductId) ||
    siteData.products[0];
  const currentRegion =
    siteData.regions.find((r) => r.id === selectedRegionId) ||
    siteData.regions[0];
  const currentStep =
    siteData.processSteps.find((s) => s.number === selectedStepNumber) ||
    siteData.processSteps[0];
  const currentArticle =
    siteData.articles.find((a) => a.id === selectedArticleId) ||
    siteData.articles[0];

  const handleExport = () => {
    const json = exportDataJson();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vuon-tinh-dau-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onShowToast('Đã tải xuống file sao lưu cấu hình website JSON.');
  };

  const handleImport = () => {
    if (!jsonImportText.trim()) {
      setJsonImportError('Vui lòng dán chuỗi JSON hợp lệ.');
      return;
    }
    const success = importDataJson(jsonImportText);
    if (success) {
      setJsonImportError(null);
      setJsonImportText('');
      onShowToast('Đã khôi phục dữ liệu website từ file JSON thành công!');
    } else {
      setJsonImportError('Cú pháp JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc file.');
    }
  };

  const handleAddNewProduct = () => {
    const newId = `product-${Date.now()}`;
    const newProd: Product = {
      id: newId,
      name: 'Tinh Dầu Thảo Mộc Mới',
      englishName: 'New Herbal Essential Oil',
      botanicalName: 'Plantae essentialis',
      origin: 'Đại ngàn Tây Giang, Quảng Nam',
      price: 250000,
      originalPrice: 290000,
      volume: '10ml',
      rating: 5.0,
      reviewsCount: 1,
      image: '/images/products/tinh-dau-hoa-nhai-sambac.jpg',
      description: 'Mô tả chi tiết về sản phẩm tinh dầu mới được chiết xuất tự nhiên 100%.',
      scentNotes: 'Hương thơm tự nhiên thanh khiết, thư thái',
      benefits: ['Thư giãn tinh thần', 'Kháng khuẩn tự nhiên', 'Thanh lọc không gian'],
      batchNo: 'VSA-NEW-01',
      facility: 'HTX Dược liệu Cách Mạng Xanh Tây Giang',
      hotline: '0833-15-3388',
    };
    addProduct(newProd);
    setSelectedProductId(newId);
    onShowToast('Đã thêm sản phẩm mới! Hãy chỉnh sửa thông tin bên dưới.');
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}"?`)) {
      deleteProduct(id);
      const remaining = siteData.products.filter((p) => p.id !== id);
      if (remaining.length > 0) {
        setSelectedProductId(remaining[0].id);
      }
      onShowToast(`Đã xóa sản phẩm "${name}".`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={closeCms}
      />

      {/* Drawer Panel Container */}
      <div className="relative w-full max-w-4xl bg-[#FAFBF9] h-full shadow-2xl flex flex-col z-10 border-l border-[#D5C6B3] overflow-hidden">
        {/* Drawer Top Header */}
        <div className="bg-[#1E3125] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#2D4B39]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E6C285]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-lg sm:text-xl font-bold">
                  Bảng Điều Khiển Nội Dung (CMS)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#E6C285]/20 text-[#E6C285] text-[10px] font-bold uppercase tracking-wider">
                  Admin v1.0
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs text-stone-300">
                <span className="flex items-center gap-1 text-emerald-300 font-medium">
                  <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Tự động lưu & cập nhật trực tiếp trên điện thoại</span>
                </span>
                <span className="hidden sm:inline text-stone-500">•</span>
                <span className="text-stone-300 text-[11px]">
                  {syncStatus === 'syncing' ? (
                    <span className="flex items-center gap-1 text-amber-300">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      <span>Đang lưu lên máy chủ...</span>
                    </span>
                  ) : (
                    <span>Đã đồng bộ ({lastSyncedTime || 'mới nhất'})</span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={() => handleSaveAndFinish()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6C285] hover:bg-[#d8b06e] text-[#1E3125] font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
              title="Lưu tất cả thay đổi và xem trang web"
            >
              <Check className="w-3.5 h-3.5 text-[#1E3125]" />
              <span className="hidden sm:inline">Hoàn Tất &</span>
              <span>Lưu Lại</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAndLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-red-200 hover:text-white font-semibold text-xs transition-all active:scale-95 cursor-pointer"
              title="Lưu tất cả cài đặt và đăng xuất khỏi quản trị viên"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lưu & Đăng Xuất</span>
            </button>

            <button
              onClick={closeCms}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
              title="Đóng CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation Strip */}
        <div className="bg-[#EDE7DD] border-b border-[#D5C6B3] px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
          {[
            { id: 'hero', label: '1. Banner & Mở Đầu', icon: Sparkles },
            { id: 'products', label: '2. Sản Phẩm', icon: ShoppingBag },
            { id: 'regions', label: '3. Vùng Nguyên Liệu', icon: MapPin },
            { id: 'about', label: '4. Về Chúng Tôi', icon: FileText },
            { id: 'process', label: '5. Quy Trình Chưng Cất', icon: Flame },
            { id: 'brandStory', label: '6. Câu Chuyện Thương Hiệu', icon: Layers },
            { id: 'contact', label: '7. Liên Hệ & Bản Quyền', icon: Phone },
            { id: 'seo', label: '8. Tối Ưu SEO', icon: Globe },
            { id: 'backup', label: '9. Sao Lưu & Khôi Phục', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCmsTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => openCms(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2D4B39] text-white shadow-xs'
                    : 'text-[#4A5D50] hover:text-[#1E3125] hover:bg-black/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Drawer Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: HERO */}
          {activeCmsTab === 'hero' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                  Chỉnh Sửa Banner Trang Chủ (Hero Section)
                </h3>
                <p className="text-xs text-stone-500">
                  Thông điệp đầu tiên đập vào mắt người xem khi truy cập website
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Nhãn định vị (Eyebrow Tag)
                </label>
                <input
                  type="text"
                  value={siteData.texts.hero.eyebrow}
                  onChange={(e) =>
                    updateTextSection('hero', { eyebrow: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#2D4B39] text-sm text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Tiêu đề chính (Main Title - hỗ trợ xuống dòng)
                </label>
                <textarea
                  rows={2}
                  value={siteData.texts.hero.title}
                  onChange={(e) =>
                    updateTextSection('hero', { title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#2D4B39] text-sm text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Đoạn mô tả ngắn (Subtitle)
                </label>
                <textarea
                  rows={3}
                  value={siteData.texts.hero.subtitle}
                  onChange={(e) =>
                    updateTextSection('hero', { subtitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#2D4B39] text-sm text-stone-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Chữ trên nút kêu gọi hành động (CTA Button)
                </label>
                <input
                  type="text"
                  value={siteData.texts.hero.ctaText}
                  onChange={(e) =>
                    updateTextSection('hero', { ctaText: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 focus:border-[#2D4B39] text-sm text-stone-900 outline-none"
                />
              </div>

              <ImageUploadField
                label="Ảnh nền Hero Banner (Tải ảnh từ máy tính/điện thoại hoặc dán link)"
                value={siteData.texts.hero.bgImage}
                onChange={(newImageUrl) =>
                  updateTextSection('hero', { bgImage: newImageUrl })
                }
                helperText="Ảnh nền đại ngàn Trường Sơn sương sớm. Tự động nén tối ưu và lưu vào hệ thống."
              />

              {/* Action bar for Hero */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-xs text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Nội dung & ảnh Hero tự động cập nhật ngay lập tức.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveAndFinish('Đã lưu thành công nội dung Banner Hero!')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4 text-[#E6C285]" />
                  <span>Hoàn Tất & Xem Web</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeCmsTab === 'products' && (
            <div className="space-y-6">
              {/* Product Selector Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#E5DACD]">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                    Chọn sản phẩm để chỉnh sửa ({siteData.products.length} sản phẩm)
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-[#FAFBF9] text-sm font-medium text-stone-900 outline-none"
                  >
                    {siteData.products.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.volume}) - {prod.price > 0 ? `${prod.price.toLocaleString('vi-VN')} đ` : 'Liên hệ báo giá'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1 sm:pt-4">
                  <button
                    onClick={handleAddNewProduct}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-[#2D4B39] text-white text-xs font-semibold hover:bg-[#1E3125] transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Thêm Sản Phẩm Mới</span>
                  </button>

                  {siteData.products.length > 1 && currentProduct && (
                    <button
                      onClick={() =>
                        handleDeleteProduct(currentProduct.id, currentProduct.name)
                      }
                      className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Edit Selected Product Form */}
              {currentProduct && (
                <div className="bg-white p-5 rounded-2xl border border-[#E5DACD] space-y-4 shadow-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Tên sản phẩm
                      </label>
                      <input
                        type="text"
                        value={currentProduct.name}
                        onChange={(e) =>
                          updateProduct({ ...currentProduct, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Tên tiếng Anh (English Name)
                      </label>
                      <input
                        type="text"
                        value={currentProduct.englishName || ''}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            englishName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Tên khoa học (Botanical Name)
                      </label>
                      <input
                        type="text"
                        value={currentProduct.botanicalName}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            botanicalName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Vùng xuất xứ
                      </label>
                      <input
                        type="text"
                        value={currentProduct.origin}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            origin: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Giá bán niêm yết (VNĐ)
                      </label>
                      <input
                        type="number"
                        value={currentProduct.price}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            price: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Giá gốc tham khảo trước giảm (VNĐ)
                      </label>
                      <input
                        type="number"
                        value={currentProduct.originalPrice || 0}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            originalPrice: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Dung tích đóng chai
                      </label>
                      <input
                        type="text"
                        value={currentProduct.volume}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            volume: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Số lượt đánh giá (Reviews Count)
                      </label>
                      <input
                        type="number"
                        value={currentProduct.reviewsCount}
                        onChange={(e) =>
                          updateProduct({
                            ...currentProduct,
                            reviewsCount: Number(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <ImageUploadField
                    label="Hình ảnh sản phẩm (Tải ảnh từ máy tính/điện thoại hoặc dán link URL)"
                    value={currentProduct.image}
                    onChange={(newImageUrl) =>
                      updateProduct({
                        ...currentProduct,
                        image: newImageUrl,
                      })
                    }
                    helperText="Hệ thống tự động nén tối ưu, gắn vào sản phẩm và tự động lưu lại vào hệ thống."
                  />

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Tầng hương đặc trưng (Scent Notes)
                    </label>
                    <input
                      type="text"
                      value={currentProduct.scentNotes}
                      onChange={(e) =>
                        updateProduct({
                          ...currentProduct,
                          scentNotes: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Mô tả chi tiết sản phẩm
                    </label>
                    <textarea
                      rows={3}
                      value={currentProduct.description}
                      onChange={(e) =>
                        updateProduct({
                          ...currentProduct,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Danh sách công dụng chính (cách nhau bởi dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={currentProduct.benefits.join(', ')}
                      onChange={(e) =>
                        updateProduct({
                          ...currentProduct,
                          benefits: e.target.value
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  {/* Action Bar for this product */}
                  <div className="pt-4 mt-2 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 text-xs text-emerald-900">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div>
                        <span className="font-bold">Đã tự động lưu sản phẩm:</span> {currentProduct.name} ({currentProduct.volume})
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => handleSaveDraft(`Đã lưu dữ liệu sản phẩm "${currentProduct.name}"!`)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-semibold shadow-2xs transition-all cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Lưu Bản Nháp</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSaveAndFinish(`Đã lưu thành công và cập nhật sản phẩm "${currentProduct.name}" lên website!`)}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                      >
                        <Check className="w-4 h-4 text-[#E6C285]" />
                        <span>Hoàn Tất & Xem Web</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSaveAndLogout}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-900 hover:bg-red-950 text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                        title="Lưu sản phẩm và đăng xuất Quản trị viên"
                      >
                        <LogOut className="w-3.5 h-3.5 text-red-200" />
                        <span>Lưu & Đăng Xuất</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REGIONS */}
          {activeCmsTab === 'regions' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                    Vùng Nguyên Liệu Bản Địa
                  </h3>
                  <p className="text-xs text-stone-500">
                    Chỉnh sửa thông tin 3 vùng dược liệu Tây Giang, Quảng Ngãi, Ninh Bình
                  </p>
                </div>

                <select
                  value={selectedRegionId}
                  onChange={(e) => setSelectedRegionId(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-[#FAFBF9] text-xs font-semibold outline-none"
                >
                  {siteData.regions.map((reg) => (
                    <option key={reg.id} value={reg.id}>
                      {reg.name}
                    </option>
                  ))}
                </select>
              </div>

              {currentRegion && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Tên vùng
                      </label>
                      <input
                        type="text"
                        value={currentRegion.name}
                        onChange={(e) =>
                          updateRegion({ ...currentRegion, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Tỉnh / Khu vực
                      </label>
                      <input
                        type="text"
                        value={currentRegion.province}
                        onChange={(e) =>
                          updateRegion({ ...currentRegion, province: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Độ cao (Altitude)
                      </label>
                      <input
                        type="text"
                        value={currentRegion.altitude}
                        onChange={(e) =>
                          updateRegion({ ...currentRegion, altitude: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Khí hậu đặc trưng
                      </label>
                      <input
                        type="text"
                        value={currentRegion.climate}
                        onChange={(e) =>
                          updateRegion({ ...currentRegion, climate: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Khẩu hiệu vùng (Tagline)
                    </label>
                    <input
                      type="text"
                      value={currentRegion.tagline}
                      onChange={(e) =>
                        updateRegion({ ...currentRegion, tagline: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Thảo dược chính (cách nhau bởi dấu phẩy)
                    </label>
                    <input
                      type="text"
                      value={currentRegion.herbs.join(', ')}
                      onChange={(e) =>
                        updateRegion({
                          ...currentRegion,
                          herbs: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Mô tả tóm tắt
                    </label>
                    <textarea
                      rows={2}
                      value={currentRegion.description}
                      onChange={(e) =>
                        updateRegion({ ...currentRegion, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Câu chuyện chi tiết (Full Story khi bấm Khám phá)
                    </label>
                    <textarea
                      rows={4}
                      value={currentRegion.fullStory}
                      onChange={(e) =>
                        updateRegion({ ...currentRegion, fullStory: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <ImageUploadField
                    label="Hình ảnh vùng nguyên liệu (Tải ảnh từ máy hoặc dán link)"
                    value={currentRegion.image}
                    onChange={(newImageUrl) =>
                      updateRegion({ ...currentRegion, image: newImageUrl })
                    }
                    helperText="Ảnh cánh rừng, sương mù hoặc bản làng nguyên liệu. Tự động lưu khi chọn."
                  />

                  {/* Action bar for Region */}
                  <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 text-xs text-emerald-900">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Đã tự động lưu thông tin vùng {currentRegion.name}.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveAndFinish(`Đã lưu thông tin vùng ${currentRegion.name} thành công!`)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      <Check className="w-4 h-4 text-[#E6C285]" />
                      <span>Hoàn Tất & Xem Web</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ABOUT */}
          {activeCmsTab === 'about' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                  Phần Giới Thiệu (About Section • VSA LAB)
                </h3>
                <p className="text-xs text-stone-500">
                  Câu chuyện liên kết bà con nông dân và đơn vị bảo trợ nghiên cứu
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Nhãn định vị (Eyebrow)
                </label>
                <input
                  type="text"
                  value={siteData.texts.about.eyebrow}
                  onChange={(e) =>
                    updateTextSection('about', { eyebrow: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Tiêu đề chính
                </label>
                <textarea
                  rows={2}
                  value={siteData.texts.about.title}
                  onChange={(e) =>
                    updateTextSection('about', { title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Nội dung đoạn văn mô tả
                </label>
                <textarea
                  rows={4}
                  value={siteData.texts.about.description}
                  onChange={(e) =>
                    updateTextSection('about', { description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Chữ trích dẫn trên ảnh người nông dân (Quote)
                </label>
                <textarea
                  rows={3}
                  value={siteData.texts.about.quote}
                  onChange={(e) =>
                    updateTextSection('about', { quote: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <ImageUploadField
                label="Ảnh người nông dân thu hoạch (Tải ảnh từ máy hoặc dán link)"
                value={siteData.texts.about.farmerImage}
                onChange={(newImageUrl) =>
                  updateTextSection('about', { farmerImage: newImageUrl })
                }
                helperText="Hình ảnh người nông dân Cơ Tu thu hái thảo dược trên nương rẫy. Tự động lưu khi chọn."
              />

              {/* Action bar for About */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-xs text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã tự động lưu nội dung Giới thiệu (VSA LAB).</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveAndFinish('Đã lưu nội dung Giới thiệu thành công!')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4 text-[#E6C285]" />
                  <span>Hoàn Tất & Xem Web</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: PROCESS */}
          {activeCmsTab === 'process' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                    Quy Trình Sản Xuất 5 Bước
                  </h3>
                  <p className="text-xs text-stone-500">
                    Chỉnh sửa từng bước chưng cất và chiết xuất tinh dầu
                  </p>
                </div>

                <select
                  value={selectedStepNumber}
                  onChange={(e) => setSelectedStepNumber(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-stone-300 bg-[#FAFBF9] text-xs font-semibold outline-none"
                >
                  {siteData.processSteps.map((s) => (
                    <option key={s.number} value={s.number}>
                      {s.step}: {s.title}
                    </option>
                  ))}
                </select>
              </div>

              {currentStep && (
                <div className="space-y-4 pt-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Tên bước
                      </label>
                      <input
                        type="text"
                        value={currentStep.title}
                        onChange={(e) =>
                          updateProcessStep({ ...currentStep, title: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                        Phụ đề (Subtitle)
                      </label>
                      <input
                        type="text"
                        value={currentStep.subtitle}
                        onChange={(e) =>
                          updateProcessStep({ ...currentStep, subtitle: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                      Mô tả quy trình
                    </label>
                    <textarea
                      rows={3}
                      value={currentStep.description}
                      onChange={(e) =>
                        updateProcessStep({ ...currentStep, description: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                    />
                  </div>

                  <ImageUploadField
                    label="Hình ảnh minh họa bước này (Tải ảnh từ máy hoặc dán link)"
                    value={currentStep.image}
                    onChange={(newImageUrl) =>
                      updateProcessStep({ ...currentStep, image: newImageUrl })
                    }
                    helperText="Hình ảnh công đoạn sản xuất, chưng cất hoặc kiểm nghiệm. Tự động lưu khi chọn."
                  />

                  {/* Action bar for Process Step */}
                  <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                    <div className="flex items-center gap-2 text-xs text-emerald-900">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Đã tự động lưu thông tin {currentStep.step}.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSaveAndFinish(`Đã lưu ${currentStep.step} thành công!`)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                    >
                      <Check className="w-4 h-4 text-[#E6C285]" />
                      <span>Hoàn Tất & Xem Web</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: BRAND STORY */}
          {activeCmsTab === 'brandStory' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                  Câu Chuyện Thương Hiệu (Brand Story)
                </h3>
                <p className="text-xs text-stone-500">
                  Triết lý bảo tồn và các chỉ số thống kê ấn tượng
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Tiêu đề câu chuyện
                </label>
                <input
                  type="text"
                  value={siteData.texts.brandStory.title}
                  onChange={(e) =>
                    updateTextSection('brandStory', { title: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Đoạn trích dẫn triết lý (Quote)
                </label>
                <textarea
                  rows={2}
                  value={siteData.texts.brandStory.quote}
                  onChange={(e) =>
                    updateTextSection('brandStory', { quote: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Đoạn văn 1
                </label>
                <textarea
                  rows={3}
                  value={siteData.texts.brandStory.p1}
                  onChange={(e) =>
                    updateTextSection('brandStory', { p1: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Đoạn văn 2
                </label>
                <textarea
                  rows={3}
                  value={siteData.texts.brandStory.p2}
                  onChange={(e) =>
                    updateTextSection('brandStory', { p2: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                    Chỉ số 1
                  </label>
                  <input
                    type="text"
                    value={siteData.texts.brandStory.stat1Number}
                    onChange={(e) =>
                      updateTextSection('brandStory', { stat1Number: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                  />
                  <input
                    type="text"
                    value={siteData.texts.brandStory.stat1Label}
                    onChange={(e) =>
                      updateTextSection('brandStory', { stat1Label: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                    Chỉ số 2
                  </label>
                  <input
                    type="text"
                    value={siteData.texts.brandStory.stat2Number}
                    onChange={(e) =>
                      updateTextSection('brandStory', { stat2Number: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                  />
                  <input
                    type="text"
                    value={siteData.texts.brandStory.stat2Label}
                    onChange={(e) =>
                      updateTextSection('brandStory', { stat2Label: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs mt-1"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                    Chỉ số 3
                  </label>
                  <input
                    type="text"
                    value={siteData.texts.brandStory.stat3Number}
                    onChange={(e) =>
                      updateTextSection('brandStory', { stat3Number: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-sm"
                  />
                  <input
                    type="text"
                    value={siteData.texts.brandStory.stat3Label}
                    onChange={(e) =>
                      updateTextSection('brandStory', { stat3Label: e.target.value })
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-stone-300 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Action bar for Brand Story */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-xs text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã tự động lưu Câu chuyện thương hiệu.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveAndFinish('Đã lưu Câu chuyện thương hiệu thành công!')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4 text-[#E6C285]" />
                  <span>Hoàn Tất & Xem Web</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: CONTACT & FOOTER */}
          {activeCmsTab === 'contact' && (
            <div className="space-y-5 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                  Thông Tin Liên Hệ & Đơn Vị Pháp Lý
                </h3>
                <p className="text-xs text-stone-500">
                  Hiển thị tại Header, Footer và các kênh hỗ trợ khách hàng
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                    Hotline tư vấn & đặt hàng
                  </label>
                  <input
                    type="text"
                    value={siteData.texts.contact.hotline}
                    onChange={(e) =>
                      updateTextSection('contact', { hotline: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                    Email liên hệ
                  </label>
                  <input
                    type="email"
                    value={siteData.texts.contact.email}
                    onChange={(e) =>
                      updateTextSection('contact', { email: e.target.value })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Địa chỉ văn phòng / Nhà phân phối
                </label>
                <input
                  type="text"
                  value={siteData.texts.contact.address}
                  onChange={(e) =>
                    updateTextSection('contact', { address: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Đơn vị nghiên cứu & bảo trợ chuyên môn
                </label>
                <textarea
                  rows={2}
                  value={siteData.texts.contact.researchUnit}
                  onChange={(e) =>
                    updateTextSection('contact', { researchUnit: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Hợp tác xã sản xuất chưng cất
                </label>
                <input
                  type="text"
                  value={siteData.texts.contact.facilityName}
                  onChange={(e) =>
                    updateTextSection('contact', { facilityName: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#2D4B39] mb-1">
                  Công ty phân phối thương mại
                </label>
                <input
                  type="text"
                  value={siteData.texts.contact.distributor}
                  onChange={(e) =>
                    updateTextSection('contact', { distributor: e.target.value })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-sm outline-none"
                />
              </div>

              {/* Action bar for Contact */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                <div className="flex items-center gap-2 text-xs text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã tự động lưu thông tin liên hệ và pháp lý.</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSaveAndFinish('Đã lưu thông tin liên hệ thành công!')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold shadow-md transition-all cursor-pointer active:scale-95"
                >
                  <Check className="w-4 h-4 text-[#E6C285]" />
                  <span>Hoàn Tất & Xem Web</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 8: BACKUP & RESTORE */}
          {activeCmsTab === 'backup' && (
            <div className="space-y-6 bg-white p-5 rounded-2xl border border-[#E5DACD] shadow-xs">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1E3125]">
                  Sao Lưu & Khôi Phục Dữ Liệu Website
                </h3>
                <p className="text-xs text-stone-500">
                  Dễ dàng xuất toàn bộ cấu hình ra file JSON để lưu trữ hoặc chuyển sang máy khác
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Export Card */}
                <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E5DACD] space-y-3">
                  <div className="flex items-center gap-2 text-[#2D4B39] font-bold text-sm">
                    <Download className="w-4 h-4 text-[#C87018]" />
                    <span>Xuất File Cấu Hình (Backup)</span>
                  </div>
                  <p className="text-xs text-[#5C6E61]">
                    Tải về toàn bộ nội dung hiện tại gồm văn bản, sản phẩm, vùng đất, hình ảnh thành file JSON.
                  </p>
                  <button
                    onClick={handleExport}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải File Sao Lưu JSON</span>
                  </button>
                </div>

                {/* Reset to factory defaults */}
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200 space-y-3">
                  <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    <span>Khôi Phục Dữ Liệu Gốc</span>
                  </div>
                  <p className="text-xs text-red-700/80">
                    Xóa các chỉnh sửa tạm thời trong trình duyệt và quay về nội dung chuẩn ban đầu của VSA LAB.
                  </p>
                  <button
                    onClick={() => {
                      if (
                        window.confirm(
                          'Cảnh báo: Thao tác này sẽ xóa tất cả dữ liệu bạn đã chỉnh sửa và quay lại bản gốc. Bạn có chắc chắn?'
                        )
                      ) {
                        resetToDefault();
                        onShowToast('Đã khôi phục toàn bộ website về dữ liệu gốc.');
                      }
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-red-800 hover:bg-red-900 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Khôi Phục Bản Gốc</span>
                  </button>
                </div>
              </div>

              {/* Import from JSON string */}
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                <div className="flex items-center gap-2 text-stone-800 font-bold text-sm">
                  <Upload className="w-4 h-4 text-emerald-700" />
                  <span>Nhập Dữ Liệu Từ JSON</span>
                </div>

                {jsonImportError && (
                  <div className="p-2.5 rounded-lg bg-red-100 text-red-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{jsonImportError}</span>
                  </div>
                )}

                <textarea
                  rows={4}
                  value={jsonImportText}
                  onChange={(e) => setJsonImportText(e.target.value)}
                  placeholder="Dán nội dung JSON đã sao lưu vào đây..."
                  className="w-full p-3 rounded-xl border border-stone-300 font-mono text-xs text-stone-800 outline-none"
                />

                <button
                  onClick={handleImport}
                  className="py-2.5 px-4 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Áp Dụng Dữ Liệu JSON Mới</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 9: SEO OPTIMIZATION */}
          {activeCmsTab === 'seo' && (
            <AdminSeoPanel onShowToast={onShowToast} />
          )}
        </div>

        {/* Drawer Bottom Bar */}
        <div className="bg-[#FAF6F0] px-6 py-3.5 border-t border-[#D5C6B3] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#5C6E61] flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Hệ thống tự động lưu toàn bộ trên máy chủ và cập nhật tức thì trên điện thoại.</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => handleSaveDraft('✓ Đã lưu tất cả thay đổi vào hệ thống!')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5 text-emerald-700" />
              <span>Lưu Bản Nháp</span>
            </button>

            <button
              type="button"
              onClick={() => handleSaveAndFinish()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#E6C285]" />
              <span>Hoàn Tất & Xem Web</span>
            </button>

            <button
              type="button"
              onClick={handleSaveAndLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-900 hover:bg-red-950 border border-red-800 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              title="Lưu tất cả cài đặt và đăng xuất khỏi Quản trị viên"
            >
              <LogOut className="w-4 h-4 text-red-200" />
              <span>Lưu & Đăng Xuất</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
