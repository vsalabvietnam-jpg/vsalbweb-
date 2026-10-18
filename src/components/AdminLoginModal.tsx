import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AdminLoginModalProps {
  onShowToast: (message: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onShowToast }) => {
  const { isLoginModalOpen, closeLoginModal, login } = useContent();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const result = login(username, password);
      setIsSubmitting(false);

      if (result.success) {
        onShowToast('Đăng nhập Quản trị viên thành công! Bạn có thể chỉnh sửa toàn bộ nội dung web.');
        setPassword('');
      } else {
        setErrorMsg(result.message || 'Sai tên đăng nhập hoặc mật khẩu.');
      }
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeLoginModal}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden z-10 border border-[#D5C6B3] my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Dark Green Tone */}
        <div className="bg-[#1E3125] text-white p-6 relative">
          <button
            onClick={closeLoginModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#E6C285] text-xs font-semibold uppercase tracking-wider mb-2.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Hệ Thống Quản Trị VSA LAB</span>
          </div>

          <h3 className="font-serif text-2xl font-bold tracking-tight">
            Đăng Nhập Quản Trị
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm mt-1">
            Chỉnh sửa văn bản, hình ảnh, sản phẩm và giá cả trực tiếp trên website.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1.5">
              Tên tài khoản quản trị
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="vsalab"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#2D4B39] focus:ring-2 focus:ring-[#2D4B39]/20 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-[#2D4B39] mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone-300 focus:border-[#2D4B39] focus:ring-2 focus:ring-[#2D4B39]/20 text-sm text-stone-900 placeholder-stone-400 outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white font-semibold text-sm transition-all shadow-md active:scale-[0.98] cursor-pointer disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-[#E6C285]" />
            <span>{isSubmitting ? 'Đang xác thực...' : 'Đăng Nhập Quản Trị'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
