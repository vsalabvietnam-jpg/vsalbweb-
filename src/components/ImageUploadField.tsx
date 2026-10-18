import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, RefreshCw, AlertCircle, Trash2 } from 'lucide-react';
import { compressImage, formatBytes } from '../utils/imageCompressor';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (newImageUrl: string) => void;
  helperText?: string;
  defaultFallback?: string;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  defaultFallback,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stats, setStats] = useState<{ original: number; compressed: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setErrorMsg(null);
    setIsProcessing(true);
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('Vui lòng chọn file hình ảnh (JPG, PNG, WebP).');
      }

      // Compress and convert to base64 Data URL (max 1000x1000, 82% quality)
      const res = await compressImage(file, 1000, 1000, 0.82);
      setStats({ original: res.originalSize, compressed: res.compressedSize });
      onChange(res.dataUrl);
    } catch (err: any) {
      setErrorMsg(err.message || 'Không thể xử lý hình ảnh này.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-2.5">
      {/* Header with Label and Mode Switcher */}
      <div className="flex items-center justify-between gap-2">
        <label className="block text-xs font-semibold text-[#2D4B39]">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-[11px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer font-medium flex items-center gap-1 ${
              mode === 'upload'
                ? 'bg-white text-[#2D4B39] font-bold shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Tải ảnh từ máy</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer font-medium flex items-center gap-1 ${
              mode === 'url'
                ? 'bg-white text-[#2D4B39] font-bold shadow-xs'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <LinkIcon className="w-3 h-3" />
            <span>Dán link URL</span>
          </button>
        </div>
      </div>

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp, image/gif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Mode 1: Upload from device */}
      {mode === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-emerald-600 bg-emerald-50 scale-[1.01]'
              : 'border-stone-300 hover:border-[#2D4B39] bg-stone-50/70 hover:bg-stone-50'
          }`}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center py-3 gap-2">
              <RefreshCw className="w-6 h-6 text-emerald-600 animate-spin" />
              <span className="text-xs font-semibold text-[#2D4B39]">Đang tối ưu và xử lý hình ảnh...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-[#2D4B39]">
                <Upload className="w-5 h-5" />
              </div>
              <div className="text-xs text-stone-700">
                <span className="font-bold text-[#2D4B39] underline">Bấm để tải ảnh lên</span> hoặc kéo thả file vào đây
              </div>
              <p className="text-[10px] text-stone-500">
                Hỗ trợ PNG, JPG, WebP. Tự động nén tối ưu để lưu trữ nhanh và mượt.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Direct URL Input */}
      {mode === 'url' && (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setErrorMsg(null);
              setStats(null);
              onChange(e.target.value);
            }}
            placeholder="/images/products/tinh-dau-cam-rung-tay-giang.webp"
            className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white text-xs text-stone-900 outline-none focus:border-[#2D4B39]"
          />
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-2 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-1.5 border border-red-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Image Preview & Optimization Info */}
      {value && (
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-stone-200">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 shrink-0 relative group">
            <img
              src={value}
              alt="Xem trước ảnh"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  '/images/products/tinh-dau-cam-rung-chai-30ml.jpg';
              }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ảnh đã được gắn cho sản phẩm</span>
            </div>

            {stats ? (
              <p className="text-[11px] text-stone-600 mt-0.5">
                Đã nén tối ưu: <span className="line-through text-stone-400">{formatBytes(stats.original)}</span> → <strong className="text-emerald-700">{formatBytes(stats.compressed)}</strong>
              </p>
            ) : value.startsWith('data:') ? (
              <p className="text-[11px] text-emerald-700 mt-0.5">
                Đã lưu trữ từ tệp tải lên (Dung lượng: ~{formatBytes(Math.round((value.length * 3) / 4))})
              </p>
            ) : (
              <p className="text-[11px] text-stone-500 mt-0.5 truncate">
                Đường dẫn liên kết trực tuyến
              </p>
            )}

            <div className="flex items-center gap-2 mt-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-semibold text-[#2D4B39] hover:underline cursor-pointer flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Thay ảnh khác</span>
              </button>

              {defaultFallback && value !== defaultFallback && (
                <button
                  type="button"
                  onClick={() => {
                    onChange(defaultFallback);
                    setStats(null);
                  }}
                  className="text-[11px] text-stone-500 hover:text-red-700 transition-colors cursor-pointer"
                >
                  Khôi phục ảnh mẫu
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {helperText && (
        <p className="text-[11px] text-stone-500 italic">{helperText}</p>
      )}
    </div>
  );
};
