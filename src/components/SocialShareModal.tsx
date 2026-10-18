import React from 'react';
import {
  X as CloseIcon,
  Facebook,
  Linkedin,
  Twitter,
  Send,
  Link2,
  Share2,
  Check
} from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
  onShowToast?: (msg: string) => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url,
  onShowToast,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen) return null;

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://vsalab.vn');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);

  const sharePlatforms = [
    {
      name: 'Facebook',
      color: 'bg-[#1877F2] text-white hover:bg-[#166fe5]',
      icon: <Facebook className="w-5 h-5 fill-current" />,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          '_blank',
          'width=600,height=400'
        );
      },
    },
    {
      name: 'Zalo',
      color: 'bg-[#0068FF] text-white hover:bg-[#0058dd]',
      icon: <span className="font-bold text-sm tracking-tighter">Zalo</span>,
      action: () => {
        window.open(
          `https://sp.zalo.me/plugins/share?url=${encodedUrl}`,
          '_blank',
          'width=600,height=450'
        );
      },
    },
    {
      name: 'LinkedIn',
      color: 'bg-[#0A66C2] text-white hover:bg-[#095196]',
      icon: <Linkedin className="w-5 h-5 fill-current" />,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
          '_blank',
          'width=600,height=450'
        );
      },
    },
    {
      name: 'X (Twitter)',
      color: 'bg-[#000000] text-white hover:bg-neutral-800',
      icon: <Twitter className="w-5 h-5 fill-current" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
          '_blank',
          'width=600,height=400'
        );
      },
    },
    {
      name: 'Telegram',
      color: 'bg-[#229ED9] text-white hover:bg-[#1d8bc0]',
      icon: <Send className="w-5 h-5" />,
      action: () => {
        window.open(
          `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
          '_blank',
          'width=600,height=400'
        );
      },
    },
    {
      name: 'Pinterest',
      color: 'bg-[#E60023] text-white hover:bg-[#c9001f]',
      icon: <span className="font-bold text-sm">P</span>,
      action: () => {
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
          '_blank',
          'width=600,height=450'
        );
      },
    },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    if (onShowToast) onShowToast('✓ Đã sao chép liên kết vào bộ nhớ tạm');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#DDD0BC] p-6 text-[#241D17] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DAC4]">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#8C521E]" />
            <h3 className="font-serif text-lg font-bold">Chia sẻ bài viết &amp; sản phẩm</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-[#EFE5D3] transition-colors cursor-pointer"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-3 text-xs text-[#7A6B5A] line-clamp-2 italic font-serif">
          "{title}"
        </p>

        {/* Social Buttons Grid */}
        <div className="grid grid-cols-3 gap-3 my-5">
          {sharePlatforms.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={p.action}
              className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl ${p.color} transition-all shadow-xs cursor-pointer hover:scale-102`}
            >
              {p.icon}
              <span className="text-xs font-semibold">{p.name}</span>
            </button>
          ))}
        </div>

        {/* Copy Link Input */}
        <div className="pt-3 border-t border-[#E5DAC4]">
          <label className="block text-xs font-semibold text-[#55493D] mb-1.5">
            Hoặc sao chép liên kết trực tiếp:
          </label>
          <div className="flex items-center gap-2 bg-[#FFFDF9] border border-[#DDD0BC] rounded-xl p-1.5">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 bg-transparent px-2 text-xs text-[#241D17] outline-hidden truncate"
            />
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#8C521E] text-white text-xs font-semibold hover:bg-[#724116] transition-colors cursor-pointer shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Đã chép' : 'Sao chép'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
