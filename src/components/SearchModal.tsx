import React, { useState, useMemo } from 'react';
import { Search, X, Droplet, MapPin, BookOpen, ArrowRight } from 'lucide-react';
import { Product, Region, Article } from '../types';
import { useContent } from '../context/ContentContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
  onSelectRegion: (r: Region) => void;
  onSelectArticle: (a: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectRegion,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const { siteData } = useContent();
  const { products, regions, articles } = siteData;

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], regions: [], articles: [] };
    const q = query.toLowerCase().trim();

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.botanicalName.toLowerCase().includes(q) ||
        p.origin.toLowerCase().includes(q) ||
        p.scentNotes.toLowerCase().includes(q)
    );

    const matchedRegions = regions.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.province.toLowerCase().includes(q) ||
        r.herbs.some((h) => h.toLowerCase().includes(q))
    );

    const matchedArticles = articles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q)
    );

    return { products: matchedProducts, regions: matchedRegions, articles: matchedArticles };
  }, [query, products, regions, articles]);

  if (!isOpen) return null;

  const totalResults =
    searchResults.products.length +
    searchResults.regions.length +
    searchResults.articles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-24 px-2 sm:px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-5 border-b border-stone-200 flex items-center gap-2.5 sm:gap-3 bg-[#FAFBF9]">
          <Search className="w-5 h-5 text-emerald-800 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm tinh dầu, vùng nguyên liệu, cẩm nang..."
            autoFocus
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm sm:text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-stone-400 hover:text-stone-600 p-1.5"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-1.5 min-h-[36px] rounded-lg bg-stone-200/70 hover:bg-stone-300/70 text-stone-700 text-xs font-semibold cursor-pointer shrink-0"
          >
            Đóng
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[70vh] sm:max-h-[60vh] overflow-y-auto p-3.5 sm:p-6 divide-y divide-stone-100">
          {!query ? (
            <div className="py-8 text-center text-stone-500">
              <p className="text-xs uppercase tracking-wider font-semibold text-emerald-800 mb-3">
                Gợi ý tìm kiếm phổ biến
              </p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                {['Trầm hương', 'Sả chanh', 'Tràm gió', 'Tây Giang', 'Quảng Ngãi', 'Ninh Bình', 'Chiết xuất hơi nước'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-50 hover:text-emerald-900 text-stone-700 text-xs transition-colors border border-stone-200/60"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-12 text-center text-stone-500">
              <p className="text-sm">Không tìm thấy kết quả phù hợp cho "{query}"</p>
              <p className="text-xs text-stone-400 mt-1">
                Hãy thử tìm với các từ khóa như: Sả, Quế, Tràm, Bưởi, Quảng Nam...
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Products Section */}
              {searchResults.products.length > 0 && (
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-3">
                    <Droplet className="w-3.5 h-3.5" />
                    <span>Sản phẩm tinh dầu ({searchResults.products.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-stone-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h5 className="font-semibold text-sm text-stone-900">
                              {product.name}
                            </h5>
                            <p className="text-xs text-stone-500">
                              {product.volume} • {product.origin}
                            </p>
                          </div>
                        </div>
                        <span className="text-[11px] font-medium text-[#2D4B39] bg-[#EBF3ED] px-2 py-0.5 rounded">
                          Xem chi tiết
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regions Section */}
              {searchResults.regions.length > 0 && (
                <div className="pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Vùng nguyên liệu ({searchResults.regions.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.regions.map((region) => (
                      <div
                        key={region.id}
                        onClick={() => {
                          onSelectRegion(region);
                          onClose();
                        }}
                        className="p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <h5 className="font-semibold text-sm text-stone-900">
                            {region.name} ({region.province})
                          </h5>
                          <p className="text-xs text-stone-500">
                            Dược liệu: {region.herbs.join(', ')}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-700" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Section */}
              {searchResults.articles.length > 0 && (
                <div className="pt-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Bài viết & Kiến thức ({searchResults.articles.length})</span>
                  </div>
                  <div className="space-y-2">
                    {searchResults.articles.map((article) => (
                      <div
                        key={article.id}
                        onClick={() => {
                          onSelectArticle(article);
                          onClose();
                        }}
                        className="p-3 rounded-xl hover:bg-stone-50 border border-transparent hover:border-stone-200 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <h5 className="font-semibold text-sm text-stone-900 line-clamp-1">
                            {article.title}
                          </h5>
                          <p className="text-xs text-stone-500">
                            {article.category} • {article.date}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-700" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
