import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { BRAND_FAQS } from '../utils/seoHelper';
import { FaqItem } from '../types/seo';

interface FaqSectionProps {
  items?: FaqItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  items = BRAND_FAQS,
  title = 'Câu Hỏi Thường Gặp Về Tinh Dầu VSA LAB',
  subtitle = 'Giải đáp thắc mắc chuyên sâu về nguồn gốc nguyên bản, quy trình chưng cất và cách sử dụng',
  className = '',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      aria-label="Câu hỏi thường gặp"
      className={`rounded-2xl p-6 sm:p-8 bg-[#F5EDE1] border border-[#DDD0BC] shadow-xs ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBDDC8] text-[#8C521E] text-xs font-semibold tracking-wider uppercase mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#8C521E]" />
          <span>Kiến thức &amp; Hỏi đáp</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#241D17]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-xs sm:text-sm text-[#7A6B5A]">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-3 max-w-3xl mx-auto">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl overflow-hidden border border-[#DDD0BC] bg-[#FFFDF9] transition-all shadow-2xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-serif font-bold text-sm sm:text-base text-[#241D17] hover:text-[#8C521E] transition-colors cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#8C521E] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#55493D] leading-relaxed border-t border-[#EFE5D3] pt-3 animate-in fade-in duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
