import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../types/seo';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onNavigateHome?: () => void;
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  onNavigateHome,
  className = '',
}) => {
  if (!items || items.length <= 1) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-3 text-xs text-[#7A6B5A] flex items-center flex-wrap gap-1.5 ${className}`}
    >
      <ol
        className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li
              key={idx}
              className="flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {idx === 0 ? (
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="flex items-center gap-1 hover:text-[#8C521E] transition-colors cursor-pointer"
                  itemProp="item"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span itemProp="name">{item.name}</span>
                </button>
              ) : isLast ? (
                <span
                  className="font-medium text-[#241D17] truncate max-w-[240px] sm:max-w-md"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.name}
                </span>
              ) : (
                <a
                  href={item.url}
                  className="hover:text-[#8C521E] transition-colors hover:underline"
                  itemProp="item"
                >
                  <span itemProp="name">{item.name}</span>
                </a>
              )}
              <meta itemProp="position" content={String(idx + 1)} />

              {!isLast && (
                <ChevronRight className="w-3 h-3 text-[#B8A894] shrink-0" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
