import React, { useState, useEffect, useRef } from 'react';
import {
  Leaf,
  Search,
  User,
  Menu,
  X,
  ArrowRight,
  Phone,
  ShieldCheck,
  Sliders,
  ChevronDown,
  Sparkles,
  Droplets,
  Package,
  Layers,
  Mountain,
  Trees,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { CATALOG_PRODUCTS } from '../data/catalogData';
import { Product, Region } from '../types';
import { VsaLabLogoIcon } from './VsaLabLogo';
import { TopRunningTicker } from './TopRunningTicker';

interface HeaderProps {
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
  onSelectProduct?: (product: Product) => void;
  onSelectRegion?: (region: Region) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onNavigate,
  onSelectProduct,
  onSelectRegion,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsExpanded, setMobileProductsExpanded] = useState(false);
  const [mobileOriginsExpanded, setMobileOriginsExpanded] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [isOriginsDropdownOpen, setIsOriginsDropdownOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeOriginsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { siteData, isAdmin, openLoginModal, openCms } = useContent();

  const productsList = siteData.products?.length ? siteData.products : CATALOG_PRODUCTS;

  // Categorize products for mega-menu
  const bioProducts = productsList.filter((p) => p.category === 'che-pham-thao-moc');
  const nativeProducts = productsList.filter((p) => p.category === 'tinh-dau-ban-dia');
  const floralProducts = productsList.filter((p) => p.category === 'tinh-dau-hoa');
  const herbalProducts = productsList.filter(
    (p) =>
      p.category === 'tinh-dau-thao-moc' ||
      (!['che-pham-thao-moc', 'tinh-dau-ban-dia', 'tinh-dau-hoa'].includes(p.category || ''))
  );

  const handleMouseEnterProducts = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsProductsDropdownOpen(false);
    }, 250);
  };

  const handleProductItemClick = (product: Product) => {
    setIsProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    onNavigate('products');
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  const handleMouseEnterOrigins = () => {
    if (closeOriginsTimeoutRef.current) {
      clearTimeout(closeOriginsTimeoutRef.current);
      closeOriginsTimeoutRef.current = null;
    }
    setIsOriginsDropdownOpen(true);
  };

  const handleMouseLeaveOrigins = () => {
    closeOriginsTimeoutRef.current = setTimeout(() => {
      setIsOriginsDropdownOpen(false);
    }, 250);
  };

  const handleToggleOrigins = () => {
    setIsOriginsDropdownOpen((prev) => !prev);
  };

  const handleRegionItemClick = (region: Region) => {
    setIsOriginsDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectRegion) {
      onSelectRegion(region);
    } else {
      onNavigate('origins');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Trang chủ', id: 'hero' },
    { label: 'Giới thiệu', id: 'about' },
    { label: 'Vùng nguyên liệu', id: 'origins', hasDropdown: true },
    { label: 'Sản phẩm', id: 'products', hasDropdown: true },
    { label: 'Quy trình', id: 'process' },
    { label: 'Tin tức', id: 'news' },
    { label: 'Liên hệ', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsProductsDropdownOpen(false);
    setIsOriginsDropdownOpen(false);
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 left-0 right-0 z-50 flex flex-col"
    >
      {/* 0. Top Running Text Marquee: "Hành trình của hương thơm – Câu chuyện của thiên nhiên" */}
      <TopRunningTicker />

      {/* Main Navbar Toolbar */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F2E7]/95 backdrop-blur-md py-2.5 sm:py-3 shadow-sm shadow-[#433220]/10 border-b border-[#E5DAC4]'
            : 'bg-gradient-to-b from-black/85 via-black/45 to-transparent py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          id="brand-logo-btn"
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none cursor-pointer"
        >
          <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-sm shrink-0 ${
            isScrolled
              ? 'bg-[#FCFAF6] border border-[#D9C8AC]'
              : 'bg-white/15 border border-white/30 group-hover:bg-white/25'
          }`}>
            <VsaLabLogoIcon isLight={!isScrolled} className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>
          <div>
            <span className={`font-serif text-xl sm:text-2xl font-black tracking-tight block leading-none transition-colors ${
              isScrolled ? 'text-[#0E492A]' : 'text-white drop-shadow-sm'
            }`}>
              VSALAB
            </span>
            <span className={`text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase block mt-1 transition-colors ${
              isScrolled ? 'text-[#8C521E]' : 'text-[#F5E2B3] drop-shadow-sm'
            }`}>
              Tinh Hoa Thiên Nhiên
            </span>
          </div>
        </button>

        {/* Center: Desktop Navigation */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            if (link.id === 'origins') {
              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={handleMouseEnterOrigins}
                  onMouseLeave={handleMouseLeaveOrigins}
                >
                  <button
                    id={`nav-link-${link.id}`}
                    onClick={() => {
                      handleToggleOrigins();
                    }}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                      isOriginsDropdownOpen
                        ? 'bg-[#8C521E] text-white shadow-xs'
                        : isScrolled
                        ? 'text-[#483E34] hover:text-[#1E1712] hover:bg-[#ECE1D0]'
                        : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-sm'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOriginsDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown displaying 3 regions */}
                  {isOriginsDropdownOpen && (
                    <div
                      onMouseEnter={handleMouseEnterOrigins}
                      onMouseLeave={handleMouseLeaveOrigins}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[780px] max-w-[95vw] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
                    >
                      <div className="bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#DDD0BC] overflow-hidden text-[#241D17]">
                        {/* Header bar of dropdown */}
                        <div className="bg-[#241D17] text-white px-6 py-3 flex items-center justify-between border-b border-[#3D3025]">
                          <div className="flex items-center gap-2">
                            <Mountain className="w-4 h-4 text-[#E6C285]" />
                            <span className="font-serif font-bold text-sm text-[#F5EDE1] tracking-wide">
                              3 VÙNG NGUYÊN LIỆU ĐẶC TRƯNG VSA LAB
                            </span>
                          </div>
                          <span className="text-xs text-[#DDD0BC]/80 hidden sm:inline">
                            Nhấp vào để khám phá câu chuyện vùng đất
                          </span>
                        </div>

                        {/* 3 Columns displaying the 3 regions */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#FCFAF6]">
                          {siteData.regions.map((region) => (
                            <button
                              key={region.id}
                              id={`nav-origin-item-${region.id}`}
                              type="button"
                              onClick={() => handleRegionItemClick(region)}
                              className="group flex flex-col text-left rounded-xl overflow-hidden bg-white border border-[#E5DAC4] hover:border-[#8C521E] hover:shadow-lg transition-all duration-300 p-3.5 cursor-pointer"
                            >
                              <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-[#EFE7D8] mb-3">
                                <img
                                  src={region.image}
                                  alt={region.name}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/images/background/vung-nguyen-lieu-dai-ngan-tay-giang.jpg';
                                  }}
                                />
                                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-medium text-white">
                                  {region.province}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <h4 className="font-serif font-bold text-sm text-[#241D17] group-hover:text-[#8C521E] transition-colors">
                                  {region.name}
                                </h4>
                                <ArrowRight className="w-3.5 h-3.5 text-[#8C521E] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                              </div>

                              <p className="text-[11px] text-[#7A6B5A] mt-1 font-medium line-clamp-1">
                                {region.herbs.join(', ')}
                              </p>

                              <p className="text-[11px] text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                                {region.tagline || region.description}
                              </p>
                            </button>
                          ))}
                        </div>

                        {/* Bottom action bar */}
                        <div className="bg-[#EFE7D8] px-6 py-2.5 border-t border-[#DDD0BC] flex items-center justify-between text-xs">
                          <span className="text-[#6B5C4D]">
                            Bảo tồn đa dạng sinh học & phát triển sinh kế bền vững
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setIsOriginsDropdownOpen(false);
                              onNavigate('origins');
                            }}
                            className="font-bold text-[#8C521E] hover:text-[#5E340E] transition-colors inline-flex items-center gap-1 cursor-pointer"
                          >
                            <span>Xem toàn bộ trên trang chủ</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            if (link.id === 'products') {
              return (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={handleMouseEnterProducts}
                  onMouseLeave={handleMouseLeaveProducts}
                >
                  <button
                    id={`nav-link-${link.id}`}
                    onClick={() => handleNavClick(link.id)}
                    className={`inline-flex items-center gap-1 px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                      isProductsDropdownOpen
                        ? 'bg-[#8C521E] text-white shadow-xs'
                        : isScrolled
                        ? 'text-[#483E34] hover:text-[#1E1712] hover:bg-[#ECE1D0]'
                        : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-sm'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isProductsDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Mega Menu Dropdown on Hover */}
                  {isProductsDropdownOpen && (
                    <div
                      onMouseEnter={handleMouseEnterProducts}
                      onMouseLeave={handleMouseLeaveProducts}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[920px] max-w-[95vw] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200"
                    >
                      <div className="bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#DDD0BC] overflow-hidden text-[#241D17]">
                        {/* Header bar of dropdown */}
                        <div className="bg-[#241D17] text-white px-6 py-3 flex items-center justify-between border-b border-[#3D3025]">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#E6C285]" />
                            <span className="font-serif font-bold text-sm text-[#F5EDE1] tracking-wide">
                              DÒNG SẢN PHẨM TINH DẦU & THẢO MỘC VSA LAB
                            </span>
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#8C521E] text-white font-semibold">
                              {productsList.length} Sản phẩm
                            </span>
                          </div>
                          <span className="text-xs text-[#DDD0BC]/80 hidden sm:inline">
                            Di chuột hoặc bấm để xem chi tiết
                          </span>
                        </div>

                        {/* 4-Column Grid inside Dropdown */}
                        <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 bg-[#FCFAF6]">
                          {/* Column 1: Chế Phẩm Thảo Mộc */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#E8DEC9] text-[#8C521E]">
                              <Droplets className="w-4 h-4" />
                              <h4 className="font-bold text-xs uppercase tracking-wider">
                                Chế Phẩm Sinh Học ({bioProducts.length})
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {bioProducts.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => handleProductItemClick(p)}
                                  className="w-full text-left p-2 rounded-lg hover:bg-[#EFE5D3] transition-all group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div className="w-8 h-8 rounded-md bg-[#E8DEC9] overflow-hidden shrink-0 border border-[#DDD0BC]">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-[#241D17] group-hover:text-[#8C521E] line-clamp-1">
                                      {p.name}
                                    </p>
                                    <span className="text-[10px] text-[#7A6B5A] block line-clamp-1">
                                      {p.volume} • Liên hệ báo giá
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Column 2: Tinh Dầu Bản Địa Đại Ngàn */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#E8DEC9] text-[#8C521E]">
                              <Leaf className="w-4 h-4" />
                              <h4 className="font-bold text-xs uppercase tracking-wider">
                                Bản Địa Đại Ngàn ({nativeProducts.length})
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {nativeProducts.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => handleProductItemClick(p)}
                                  className="w-full text-left p-2 rounded-lg hover:bg-[#EFE5D3] transition-all group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div className="w-8 h-8 rounded-md bg-[#E8DEC9] overflow-hidden shrink-0 border border-[#DDD0BC]">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-[#241D17] group-hover:text-[#8C521E] line-clamp-1">
                                      {p.name}
                                    </p>
                                    <span className="text-[10px] text-[#7A6B5A] block line-clamp-1">
                                      {p.origin.split(',')[0]} • Liên hệ báo giá
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Column 3: Tinh Dầu Hoa & Hương Trầm */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#E8DEC9] text-[#8C521E]">
                              <Sparkles className="w-4 h-4" />
                              <h4 className="font-bold text-xs uppercase tracking-wider">
                                Hương Hoa & Trầm ({floralProducts.length})
                              </h4>
                            </div>
                            <div className="space-y-1">
                              {floralProducts.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => handleProductItemClick(p)}
                                  className="w-full text-left p-2 rounded-lg hover:bg-[#EFE5D3] transition-all group flex items-start gap-2.5 cursor-pointer"
                                >
                                  <div className="w-8 h-8 rounded-md bg-[#E8DEC9] overflow-hidden shrink-0 border border-[#DDD0BC]">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-[#241D17] group-hover:text-[#8C521E] line-clamp-1">
                                      {p.name}
                                    </p>
                                    <span className="text-[10px] text-[#7A6B5A] block line-clamp-1">
                                      {p.volume} • Liên hệ báo giá
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Column 4: Tinh Dầu Thảo Mộc & Trị Liệu */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 pb-1.5 border-b border-[#E8DEC9] text-[#8C521E]">
                              <Layers className="w-4 h-4" />
                              <h4 className="font-bold text-xs uppercase tracking-wider">
                                Thảo Mộc Tự Nhiên ({herbalProducts.length})
                              </h4>
                            </div>
                            <div className="space-y-1 max-h-[290px] overflow-y-auto pr-1 no-scrollbar">
                              {herbalProducts.map((p) => (
                                <button
                                  key={p.id}
                                  onClick={() => handleProductItemClick(p)}
                                  className="w-full text-left p-1.5 rounded-lg hover:bg-[#EFE5D3] transition-all group flex items-start gap-2 cursor-pointer"
                                >
                                  <div className="w-7 h-7 rounded-md bg-[#E8DEC9] overflow-hidden shrink-0 border border-[#DDD0BC]">
                                    <img
                                      src={p.image}
                                      alt={p.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                      onError={(e) => {
                                        (e.target as HTMLImageElement).src = '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <p className="text-xs font-semibold text-[#241D17] group-hover:text-[#8C521E] line-clamp-1">
                                      {p.name}
                                    </p>
                                    <span className="text-[10px] text-[#8C521E] font-medium block line-clamp-1">
                                      Liên hệ báo giá
                                    </span>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="bg-[#EFE7D8] px-6 py-3 border-t border-[#DDD0BC] flex flex-wrap items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-2 text-[#7A6B5A]">
                            <ShieldCheck className="w-4 h-4 text-[#8C521E]" />
                            <span>100% Tinh dầu chuẩn kiểm định sắc ký khí GC-MS</span>
                          </div>
                          <button
                            onClick={() => {
                              setIsProductsDropdownOpen(false);
                              onNavigate('products');
                            }}
                            className="inline-flex items-center gap-1.5 font-bold text-[#8C521E] hover:text-[#5E340E] transition-colors cursor-pointer"
                          >
                            <span>Xem toàn bộ {productsList.length} sản phẩm tại Showroom</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isScrolled
                    ? 'text-[#483E34] hover:text-[#1E1712] hover:bg-[#ECE1D0]'
                    : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-sm'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, User/Wishlist, Cart, Mobile Toggle) */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="search-open-btn"
            onClick={onOpenSearch}
            aria-label="Tìm kiếm sản phẩm và bài viết"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors duration-200 focus:outline-none cursor-pointer ${
              isScrolled
                ? 'text-[#483E34] hover:text-[#1E1712] hover:bg-[#ECE1D0]'
                : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-sm'
            }`}
            title="Tìm kiếm"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            id="user-account-btn"
            onClick={() => (isAdmin ? openCms('hero') : openLoginModal())}
            aria-label={isAdmin ? 'Mở Bảng Quản Trị CMS' : 'Đăng nhập Quản Trị Viên'}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none cursor-pointer ${
              isAdmin
                ? 'bg-[#D9A75E] text-[#1E2D22] font-bold ring-2 ring-[#B8853C]'
                : isScrolled
                  ? 'text-[#483E34] hover:text-[#1E1712] hover:bg-[#ECE1D0]'
                  : 'text-white/90 hover:text-white hover:bg-white/15 drop-shadow-sm'
            }`}
            title={isAdmin ? 'Bảng Quản Trị Viên (CMS)' : 'Đăng nhập Quản trị viên (vsalab)'}
          >
            {isAdmin ? <Sliders className="w-4 h-4" /> : <User className="w-5 h-5" />}
          </button>

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Mở bảng điều hướng"
            className={`lg:hidden w-10 h-10 rounded-lg flex items-center justify-center focus:outline-none cursor-pointer ${
              isScrolled
                ? 'text-[#483E34] hover:bg-[#ECE1D0]'
                : 'text-white hover:bg-white/15'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="lg:hidden bg-[#FAF5ED]/98 border-t border-[#E5DAC4] px-4 pt-3 pb-6 mt-3 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Quick Search on Mobile Drawer */}
          <div className="mb-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSearch();
              }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#EFE6D6] text-[#3D3328] text-sm border border-[#DDD0BD] hover:bg-[#E8DEC8] transition-colors text-left"
            >
              <Search className="w-4 h-4 text-[#8C521E]" />
              <span>Tìm kiếm sản phẩm, bài viết...</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1 mb-4">
            {navLinks.map((link) => {
              if (link.id === 'origins') {
                return (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between px-4 py-3 min-h-[44px] text-base font-medium text-[#382E25] rounded-xl hover:bg-[#ECE1D0]">
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="text-left font-medium text-[#382E25] hover:text-[#8C521E]"
                      >
                        {link.label} (3)
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileOriginsExpanded(!mobileOriginsExpanded);
                        }}
                        className="p-1 rounded-md text-[#8C521E] hover:bg-stone-200/50 cursor-pointer"
                        title="Mở rộng danh sách 3 vùng nguyên liệu"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            mobileOriginsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {mobileOriginsExpanded && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#F2EAE0] rounded-xl">
                        {siteData.regions.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => handleRegionItemClick(r)}
                            className="w-full text-left p-2 rounded-lg hover:bg-white text-xs text-[#241D17] flex items-center justify-between cursor-pointer"
                          >
                            <div>
                              <span className="font-semibold text-stone-900 block">{r.name}</span>
                              <span className="text-[10px] text-[#7A6B5A]">{r.province} • {r.herbs.slice(0, 2).join(', ')}</span>
                            </div>
                            <ArrowRight className="w-3.5 h-3.5 text-[#8C521E]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              if (link.id === 'products') {
                return (
                  <div key={link.id} className="space-y-1">
                    <div className="flex items-center justify-between px-4 py-3 min-h-[44px] text-base font-medium text-[#382E25] rounded-xl hover:bg-[#ECE1D0]">
                      <button
                        onClick={() => handleNavClick(link.id)}
                        className="text-left font-medium text-[#382E25] hover:text-[#8C521E]"
                      >
                        {link.label} (22)
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileProductsExpanded(!mobileProductsExpanded);
                        }}
                        className="p-1 rounded-md text-[#8C521E] hover:bg-stone-200/50"
                        title="Mở rộng danh sách sản phẩm"
                      >
                        <ChevronDown
                          className={`w-5 h-5 transition-transform duration-200 ${
                            mobileProductsExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {mobileProductsExpanded && (
                      <div className="pl-4 pr-2 py-2 space-y-1.5 bg-[#F2EAE0] rounded-xl max-h-60 overflow-y-auto">
                        {productsList.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProductItemClick(p)}
                            className="w-full text-left p-1.5 rounded-lg hover:bg-white text-xs text-[#241D17] flex items-center justify-between"
                          >
                            <span className="line-clamp-1 font-medium">{p.name}</span>
                            <span className="text-[10px] text-[#8C521E] font-semibold shrink-0 ml-2">
                              Liên hệ báo giá
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className="flex items-center justify-between px-4 py-3 min-h-[44px] text-base font-medium text-[#382E25] hover:text-[#8C521E] active:bg-[#ECE1D0] rounded-xl text-left transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#8C521E]/60" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#E5DAC4] space-y-3">
            <a
              href="tel:0833153388"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#8C521E] hover:bg-[#724116] text-white text-sm font-semibold shadow-md active:scale-[0.99] transition-all"
            >
              <Phone className="w-4 h-4 text-[#F5EDE1]" />
              <span>Gọi tư vấn ngay: 0833-15-3388</span>
            </a>

            <div className="flex items-center justify-between text-xs text-[#7D6B57] px-1">
              <span>Trung tâm VSA LAB</span>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (isAdmin) {
                    openCms('hero');
                  } else {
                    openLoginModal();
                  }
                }}
                className="text-[#8C521E] hover:text-[#5E340E] font-semibold underline flex items-center gap-1 cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAdmin ? 'Quản trị (CMS)' : 'Đăng nhập Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </header>
  );
};
