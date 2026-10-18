import React, { useEffect, useState, useMemo } from 'react';
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User,
  Leaf,
  ArrowRight,
  BookOpen,
  Image as ImageIcon,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Mountain,
  Droplets,
  Heart
} from 'lucide-react';
import { Article } from '../types';
import { getArticleRealtimeDate } from '../utils/dateHelper';
import { FULL_ARTICLES } from '../data/articlesData';
import { useContent } from '../context/ContentContext';

interface ArticleDetailPageProps {
  article: Article;
  onBackToHome: () => void;
  onSelectArticle: (article: Article) => void;
  onExploreProducts: () => void;
  onShowToast?: (msg: string) => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article: propArticle,
  onBackToHome,
  onSelectArticle,
  onExploreProducts,
  onShowToast,
}) => {
  const { siteData, updateArticle } = useContent();
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<string | null>(null);

  // Sync with live siteData if available
  const article = useMemo(() => {
    return siteData.articles?.find((a) => a.id === propArticle.id) || propArticle;
  }, [siteData.articles, propArticle]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [article.id]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      if (onShowToast) onShowToast('✓ Đã sao chép liên kết bài viết vào bộ nhớ tạm');
    }
  };

  // Find related articles (excluding current)
  const relatedArticles = useMemo(() => {
    const list = siteData.articles?.length ? siteData.articles : FULL_ARTICLES;
    return list.filter((a) => a.id !== article.id).slice(0, 3);
  }, [siteData.articles, article.id]);

  const imagesList = article.gallery && article.gallery.length > 0 ? article.gallery : [article.image];

  // Render markdown content blocks
  const markdownBlocks = useMemo(() => {
    const raw = article.markdown || article.content.join('\n\n');
    const lines = raw.split('\n');
    const blocks: Array<{
      type: 'h1' | 'h2' | 'h3' | 'p' | 'ul' | 'quote' | 'hr' | 'img';
      text?: string;
      items?: string[];
      url?: string;
      caption?: string;
    }> = [];

    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        blocks.push({ type: 'ul', items: [...currentList] });
        currentList = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        return;
      }

      // Check if horizontal rule
      if (trimmed === '---') {
        flushList();
        blocks.push({ type: 'hr' });
        return;
      }

      // Check if image markdown ![...](...)
      const imgMatch = trimmed.match(/^!\[(.*?)\]\((.*?)\)$/);
      if (imgMatch) {
        flushList();
        blocks.push({
          type: 'img',
          caption: imgMatch[1] || 'Ảnh tư liệu VSA LAB',
          url: imgMatch[2],
        });
        return;
      }

      // Check if list item
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemText = trimmed.replace(/^(\*|-)\s+/, '');
        currentList.push(itemText);
        return;
      }

      flushList();

      // Check if H1 / Title #
      if (trimmed.startsWith('# ')) {
        const hText = trimmed.replace(/^#\s+/, '').replace(/^\*\*|\*\*$/g, '');
        // Ignore duplicate main title at top
        if (hText.toLowerCase() === article.title.toLowerCase()) return;
        blocks.push({ type: 'h1', text: hText });
        return;
      }

      // Check if H2 ##
      if (trimmed.startsWith('## ')) {
        const hText = trimmed.replace(/^##\s+/, '').replace(/^\*\*|\*\*$/g, '');
        blocks.push({ type: 'h2', text: hText });
        return;
      }

      // Check if H3 ###
      if (trimmed.startsWith('### ')) {
        const hText = trimmed.replace(/^###\s+/, '').replace(/^\*\*|\*\*$/g, '');
        blocks.push({ type: 'h3', text: hText });
        return;
      }

      // Check if blockquote >
      if (trimmed.startsWith('> ')) {
        const qText = trimmed.replace(/^>\s+/, '').replace(/^\*\*|\*\*$/g, '');
        blocks.push({ type: 'quote', text: qText });
        return;
      }

      // Regular paragraph
      blocks.push({ type: 'p', text: trimmed });
    });

    flushList();
    return blocks;
  }, [article]);

  // Helper to format inline bold **text**
  const renderInlineFormatted = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-[#241D17]">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <article className="min-h-screen bg-[#FAF6F0] text-[#241D17] antialiased selection:bg-[#8C521E] selection:text-white">
      {/* 1. Sticky Editorial Top Bar */}
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

          <div className="hidden md:flex items-center gap-2 text-center">
            <span className="font-serif text-sm font-bold text-[#241D17] truncate max-w-md">
              {article.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D9C8AC] hover:border-[#8C521E] bg-[#FFFDF9] hover:bg-[#EFE5D3] text-xs font-semibold text-[#241D17] transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <Share2 className="w-3.5 h-3.5 text-[#8C521E]" />
              <span className="hidden sm:inline">Chia sẻ bài viết</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Header Banner */}
      <section className="relative py-14 sm:py-20 lg:py-24 bg-[#231A14] text-[#FAF5EB] overflow-hidden border-b border-[#3D3025]">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover object-center scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#231A14] via-[#231A14]/85 to-[#231A14]/55" />
        <div className="leaf-shadow-ambient opacity-35" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#C8B89E] mb-6">
            <button onClick={onBackToHome} className="hover:text-white transition-colors cursor-pointer">
              Trang chủ
            </button>
            <span>/</span>
            <span className="text-[#E0CDAF]">Tin tức & Kiến thức</span>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-[200px] sm:max-w-xs">{article.category}</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8]/20 border border-[#D9C8AC]/40 text-[#E6C285] text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-xs">
            <BookOpen className="w-3.5 h-3.5 text-[#E6C285]" />
            <span>{article.category}</span>
          </div>

          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.25] mb-6">
            {article.title}
          </h1>

          {/* Meta Info Bar */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#DDD0BC] pt-4 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#E6AF68]" />
              <span>{getArticleRealtimeDate(article.id, article.date)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#E6AF68]" />
              <span>Tác giả: {article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E6AF68]" />
              <span>{article.readTime}</span>
            </div>
            {imagesList.length > 1 && (
              <div className="flex items-center gap-1.5 text-[#E6AF68]">
                <ImageIcon className="w-4 h-4" />
                <span>{imagesList.length} ảnh tư liệu thực tế</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Main Editorial Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="bg-[#FFFDF9] rounded-3xl p-6 sm:p-10 lg:p-14 border border-[#E5DAC4] shadow-xs space-y-8">
          
          {/* Excerpt Lead Quote Box */}
          <div className="p-6 sm:p-7 rounded-2xl bg-[#F5EDE1] border-l-4 border-[#8C521E] text-[#33271D]">
            <p className="font-serif text-lg sm:text-xl italic leading-relaxed text-[#2C2117]">
              "{article.excerpt}"
            </p>
          </div>

          {/* Featured Hero Photo */}
          <div className="relative rounded-2xl overflow-hidden border border-[#E5DAC4] shadow-xs aspect-[16/10] bg-[#EFE7D8]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover object-center cursor-pointer hover:scale-102 transition-transform duration-500"
              onClick={() => setSelectedGalleryImage(article.image)}
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-[#241D17]/85 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs">
              Ảnh tư liệu vùng nguyên liệu & dược liệu VSA LAB
            </div>
          </div>

          {/* Markdown Content Blocks */}
          <div className="space-y-6 text-[#3E332A] text-base sm:text-lg leading-relaxed font-light">
            {markdownBlocks.map((block, idx) => {
              if (block.type === 'h1') {
                return (
                  <div key={idx} className="pt-8 pb-2 border-t border-[#E8DDCC]">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E] shrink-0 font-serif font-bold text-sm">
                        ✦
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                        {block.text}
                      </h2>
                    </div>
                  </div>
                );
              }

              if (block.type === 'h2') {
                return (
                  <div key={idx} className="pt-4 pb-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3B2E24] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C521E]" />
                      <span>{block.text}</span>
                    </h3>
                  </div>
                );
              }

              if (block.type === 'h3') {
                return (
                  <div key={idx} className="pt-2">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-[#8C521E]">
                      {block.text}
                    </h4>
                  </div>
                );
              }

              if (block.type === 'ul') {
                return (
                  <ul key={idx} className="space-y-2.5 my-3 pl-2 sm:pl-4">
                    {block.items?.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2.5 text-base sm:text-lg text-[#3E332A]">
                        <CheckCircle2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-1" />
                        <span className="leading-relaxed">{renderInlineFormatted(item)}</span>
                      </li>
                    ))}
                  </ul>
                );
              }

              if (block.type === 'quote') {
                return (
                  <div key={idx} className="my-6 p-6 rounded-2xl bg-[#2D4B39]/5 border-l-4 border-[#2D4B39] text-[#243328] font-serif italic text-lg sm:text-xl leading-relaxed">
                    "{renderInlineFormatted(block.text || '')}"
                  </div>
                );
              }

              if (block.type === 'hr') {
                return <div key={idx} className="h-px bg-gradient-to-r from-transparent via-[#D9C8AC] to-transparent my-8" />;
              }

              if (block.type === 'img' && block.url) {
                return (
                  <div
                    key={idx}
                    className="my-6 rounded-2xl overflow-hidden border border-[#E5DAC4] shadow-xs cursor-pointer group"
                    onClick={() => setSelectedGalleryImage(block.url || null)}
                  >
                    <div className="aspect-[16/10] bg-[#EFE7D8] overflow-hidden">
                      <img
                        src={block.url}
                        alt={block.caption || 'Ảnh tư liệu'}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    {block.caption && (
                      <div className="p-3 bg-[#FCFAF6] text-xs text-[#7A6B5A] italic text-center border-t border-[#E5DAC4]">
                        {block.caption}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <p key={idx} className="leading-relaxed">
                  {renderInlineFormatted(block.text || '')}
                </p>
              );
            })}
          </div>

          {/* Full Gallery Section */}
          {imagesList.length > 1 && (
            <div className="pt-10 border-t border-[#E8DDCC] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[#8C521E] text-xs font-semibold uppercase tracking-wider block mb-1">
                    Bộ sưu tập ảnh tư liệu ({imagesList.length} ảnh)
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                    Góc nhìn chân thực từ vùng nguyên liệu
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
                {imagesList.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedGalleryImage(imgUrl)}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5DAC4] bg-[#EFE7D8] cursor-pointer shadow-2xs hover:shadow-md transition-all hover:scale-[1.02]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${article.title} - ảnh ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/95 text-xs font-semibold text-[#241D17] shadow-sm">
                        Xem phóng to
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sustainable Mission Callout */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F4EB] border border-[#DDD0BC] space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#EBDDC8] flex items-center justify-center text-[#8C521E] shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#241D17]">
                  Cam kết phát triển bền vững từ VSA LAB
                </h4>
                <p className="text-xs text-[#6A5A4A]">
                  Tôn trọng thiên nhiên • Đồng hành cùng bà con nông dân • Kiểm định khoa học
                </p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-[#4E4135] leading-relaxed">
              Mỗi sản phẩm tinh dầu và thảo mộc của VSA LAB đều được phát triển dựa trên sự thấu hiểu sâu sắc đối với hệ sinh thái bản địa và tri thức dân gian. Chúng tôi không ngừng nỗ lực để gìn giữ hương thơm nguyên bản và lan tỏa giá trị xanh bền vững đến mọi gia đình.
            </p>
          </div>

          {/* Social Share & Action Bar */}
          <div className="pt-6 border-t border-[#E5DAC4] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-[#6A5A4A]">Chia sẻ bài viết:</span>
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#EBDDC8] hover:bg-[#8C521E] text-[#8C521E] hover:text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Sao chép liên kết</span>
              </button>
            </div>

            <button
              type="button"
              onClick={onExploreProducts}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8C521E] hover:bg-[#724116] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <span>Khám phá sản phẩm VSA LAB</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4. Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#8C521E] text-xs font-semibold uppercase tracking-wider block mb-1">
                  Khám phá thêm
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
                  Bài viết cùng chuyên mục
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-[#DDD0BC] hover:border-[#8C521E] shadow-2xs hover-card-lift flex flex-col justify-between cursor-pointer"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE7D8]">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#241D17]/85 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold">
                      {rel.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-[#7A6B5A] mb-2">
                        <span>{getArticleRealtimeDate(rel.id, rel.date)}</span>
                        <span>•</span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </div>

                    <div className="pt-4 mt-4 border-t border-[#E5DAC4] flex items-center justify-between text-xs font-semibold text-[#8C521E]">
                      <span>Đọc bài viết</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Lightbox Modal for Gallery Images */}
      {selectedGalleryImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-transparent flex flex-col items-center">
            <img
              src={selectedGalleryImage}
              alt="Ảnh phóng to"
              className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="mt-4 px-5 py-2 rounded-full bg-white text-[#241D17] text-xs font-semibold shadow-md hover:bg-[#EFE5D3] cursor-pointer"
            >
              Đóng xem ảnh
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
