import React from 'react';
import { Edit3 } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface SectionEditButtonProps {
  sectionTab: string;
  label?: string;
  className?: string;
}

export const SectionEditButton: React.FC<SectionEditButtonProps> = ({
  sectionTab,
  label = 'Sửa mục này',
  className = '',
}) => {
  const { isAdmin, openCms } = useContent();

  if (!isAdmin) return null;

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        openCms(sectionTab);
      }}
      title={`Chỉnh sửa nội dung: ${label}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 hover:bg-amber-600 text-stone-900 font-bold text-xs shadow-md border border-amber-300 transition-transform active:scale-95 cursor-pointer z-20 ${className}`}
    >
      <Edit3 className="w-3.5 h-3.5 text-stone-900" />
      <span>{label}</span>
    </button>
  );
};
