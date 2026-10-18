import React, { useState, useMemo } from 'react';
import { ArrowRight, Calendar, BookOpen, Clock, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES } from '../data/mockData';
import { useContent } from '../context/ContentContext';
import { SectionEditButton } from './SectionEditButton';
import { ParallaxImage } from './ParallaxImage';
import { getArticleRealtimeDate } from '../utils/dateHelper';

interface NewsSectionProps {
  onSelectArticle: (article: Article) => void;
}

type ArticleCategoryTab = 'all' | 'vung-nguyen-lieu' | 'tri-thuc' | 'quy-trinh' | 'kien-thuc';

export const NewsSection: React.FC<NewsSectionProps> = ({ onSelectArticle }) => {
  const { siteData } = useContent();
  const [activeTab, setActiveTab] = useState<ArticleCategoryTab>('all');
  const [visibleCount, setVisibleCount] = useState<number>(6);

  const rawArticles = siteData.articles?.length ? siteData.articles : ARTICLES;
  const articles = useMemo(() => {
    // Filter out removed articles
    return rawArticles.filter((a) => a.id !== 'moi-mien-dat-mot-su-menh');
  }, [rawArticles]);

  const filteredArticles = useMemo(() => {
    if (activeTab === 'all') return articles;
    if (activeTab === 'vung-nguyen-lieu') {
      return articles.filter(
        (a) =>
          a.category.includes('Vùng nguyên liệu') ||
          a.id.includes('tay-giang') ||
          a.id.includes('quang-ngai') ||
          a.id.includes('ninh-binh')
      );
    }
    if (activeTab === 'tri-thuc') {
      return articles.filter(
        (a) =>
          a.category.includes('Tri thức') ||
          a.category.includes('Văn hóa') ||
          a.id.includes('tri-thuc')
      );
    }
    if (activeTab === 'quy-trinh') {
      return articles.filter(
        (a) =>
          a.category.includes('Quy trình') ||
          a.category.includes('Công nghệ') ||
          a.category.includes('Nghiên cứu') ||
          a.id.includes('chiet-xuat') ||
          a.id.includes('phong-thi-nghiem')
      );
    }
    if (activeTab === 'kien-thuc') {
      return articles.filter(
        (a) =>
          a.category.includes('Kiến thức') ||
          a.category.includes('Thư giãn') ||
          a.category.includes('bền vững') ||
          a.id.includes('loi-ich') ||
          a.id.includes('ben-vung')
      );
    }
    return articles;
  }, [articles, activeTab]);

  const displayedArticles = filteredArticles.slice(0, visibleCount);

  return (
    <section id="news" className="py-20 lg:py-28 bg-[#F8F4EB] border-t border-[#E5DAC4] relative overflow-hidden">
      {/* Subtle Ambient Leaf Shadow & Sunbeam */}
      <div className="leaf-shadow-ambient opacity-50" />
      <div className="sunbeam-overlay opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center mb-6">
          <SectionEditButton sectionTab="news" label="Chỉnh sửa Tin tức & Bài viết" />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBDDC8] border border-[#D9C8AC] text-[#8C521E] text-xs font-semibold tracking-wider uppercase mb-3 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-[#B2641E]" />
              <span>Góc chia sẻ & Trải nghiệm</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#241D17] tracking-tight">
              Tin tức & <span className="text-[#8C521E] italic">Kiến thức</span>
            </h2>
            <p className="mt-4 text-[#55493D] text-base sm:text-lg leading-relaxed">
              Cập nhật những chia sẻ chuyên sâu về tinh dầu nguyên chất, lối sống xanh và những câu chuyện mộc mạc từ các vùng nguyên liệu đại ngàn Việt Nam.
            </p>
          </div>

          <div className="hidden md:block">
            <span className="text-xs text-[#7A6B5A] uppercase tracking-wider font-semibold">
              Tổng cộng {articles.length} bài viết tư liệu
            </span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 border-b border-[#E2D5BE]">
          <button
            onClick={() => {
              setActiveTab('all');
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#8C521E] text-white shadow-xs'
                : 'bg-[#FCFAF6] text-[#55493D] hover:bg-[#EBDDC8] border border-[#DDD0BC]'
            }`}
          >
            Tất cả ({articles.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('vung-nguyen-lieu');
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'vung-nguyen-lieu'
                ? 'bg-[#8C521E] text-white shadow-xs'
                : 'bg-[#FCFAF6] text-[#55493D] hover:bg-[#EBDDC8] border border-[#DDD0BC]'
            }`}
          >
            Vùng nguyên liệu ({articles.filter((a) => a.category.includes('Vùng nguyên liệu') || a.id.includes('tay-giang') || a.id.includes('quang-ngai') || a.id.includes('ninh-binh')).length})
          </button>
          <button
            onClick={() => {
              setActiveTab('tri-thuc');
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'tri-thuc'
                ? 'bg-[#8C521E] text-white shadow-xs'
                : 'bg-[#FCFAF6] text-[#55493D] hover:bg-[#EBDDC8] border border-[#DDD0BC]'
            }`}
          >
            Tri thức bản địa ({articles.filter((a) => a.category.includes('Tri thức') || a.category.includes('Văn hóa') || a.id.includes('tri-thuc')).length})
          </button>
          <button
            onClick={() => {
              setActiveTab('quy-trinh');
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'quy-trinh'
                ? 'bg-[#8C521E] text-white shadow-xs'
                : 'bg-[#FCFAF6] text-[#55493D] hover:bg-[#EBDDC8] border border-[#DDD0BC]'
            }`}
          >
            Quy trình & Nghiên cứu ({articles.filter((a) => a.category.includes('Quy trình') || a.category.includes('Công nghệ') || a.id.includes('chiet-xuat') || a.id.includes('phong-thi-nghiem')).length})
          </button>
          <button
            onClick={() => {
              setActiveTab('kien-thuc');
              setVisibleCount(6);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'kien-thuc'
                ? 'bg-[#8C521E] text-white shadow-xs'
                : 'bg-[#FCFAF6] text-[#55493D] hover:bg-[#EBDDC8] border border-[#DDD0BC]'
            }`}
          >
            Kiến thức & Sinh thái ({articles.filter((a) => a.category.includes('Kiến thức') || a.category.includes('Thư giãn') || a.category.includes('bền vững') || a.id.includes('ben-vung')).length})
          </button>
        </div>

        {/* 3-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
          {displayedArticles.map((article) => {
            const hasGallery = article.gallery && article.gallery.length > 1;

            return (
              <article
                key={article.id}
                id={`article-card-${article.id}`}
                onClick={() => onSelectArticle(article)}
                className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-[#DDD0BC] hover:border-[#8C521E] shadow-2xs hover-card-lift flex flex-col justify-between cursor-pointer"
              >
                {/* Image with Gentle Parallax */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#EFE7D8]">
                  <ParallaxImage
                    src={article.image}
                    alt={article.title}
                    speed={0.12}
                    maxOffset={20}
                    scale={1.08}
                    containerClassName="w-full h-full"
                    className="group-hover:scale-106 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#241D17]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-[11px] font-semibold z-10">
                    {article.category}
                  </div>

                  {hasGallery && (
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 z-10">
                      <ImageIcon className="w-3 h-3 text-[#E6AF68]" />
                      <span>{article.gallery?.length} ảnh</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 text-xs text-[#7A6B5A] mb-3">
                      <span className="flex items-center gap-1 font-medium text-[#8C521E]">
                        <Calendar className="w-3.5 h-3.5 text-[#8C521E]" />
                        <span>{getArticleRealtimeDate(article.id, article.date)}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#7A6B5A]" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#241D17] group-hover:text-[#8C521E] transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="mt-3 text-[#55493D] text-sm leading-relaxed line-clamp-3 font-light">
                      {article.excerpt}
                    </p>
                  </div>

                  {/* Footer read more */}
                  <div
                    id={`btn-read-article-${article.id}`}
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(article);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelectArticle(article);
                      }
                    }}
                    className="pt-4 mt-5 border-t border-[#E5DAC4] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#8C521E] hover:text-[#5E340E] group-hover:text-[#5E340E] transition-all cursor-pointer rounded-xl hover:bg-[#F2E8D8]/60 p-2 -mx-2 active:scale-[0.98]"
                    aria-label={`Đọc bài viết đầy đủ: ${article.title}`}
                  >
                    <span className="font-bold underline-offset-4 group-hover:underline">
                      Đọc bài viết đầy đủ
                    </span>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EBDDC8] group-hover:bg-[#8C521E] text-[#8C521E] group-hover:text-white transition-all shadow-2xs group-hover:shadow-xs shrink-0">
                      <span className="text-xs font-semibold">Xem</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Load More Button if remaining */}
        {filteredArticles.length > visibleCount && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCFAF6] hover:bg-[#8C521E] text-[#8C521E] hover:text-white border border-[#8C521E] font-semibold text-sm transition-all duration-300 shadow-xs cursor-pointer active:scale-95"
            >
              <span>Xem thêm các bài viết khác ({filteredArticles.length - visibleCount} bài)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
