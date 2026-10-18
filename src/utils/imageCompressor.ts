/**
 * Utility to compress and resize images on the client side
 * Converts uploaded images to efficient base64 Data URLs so they can be
 * stored safely in localStorage and rendered instantly without quota issues.
 */

export interface CompressionResult {
  dataUrl: string;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}

export async function compressImage(
  file: File,
  maxWidth: number = 1000,
  maxHeight: number = 1000,
  quality: number = 0.82
): Promise<CompressionResult> {
  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('Tệp tải lên không phải là hình ảnh hợp lệ (chỉ hỗ trợ JPG, PNG, WebP, GIF).'));
      return;
    }

    const originalSize = file.size;

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Lỗi khi đọc file từ thiết bị.'));

    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Không thể xử lý hình ảnh này.'));

      img.onload = () => {
        let width = img.naturalWidth || img.width;
        let height = img.naturalHeight || img.height;

        // Calculate aspect ratio scaling
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original data URL if canvas context unavailable
          const rawData = readerEvent.target?.result as string;
          resolve({
            dataUrl: rawData,
            originalSize,
            compressedSize: rawData.length,
            width,
            height,
          });
          return;
        }

        // Draw and smoothly resample
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Try webp first, fallback to jpeg
        let outputType = 'image/webp';
        let dataUrl = canvas.toDataURL(outputType, quality);

        // If browser doesn't support webp encoding (rare), use image/jpeg
        if (!dataUrl.startsWith('data:image/webp')) {
          outputType = 'image/jpeg';
          dataUrl = canvas.toDataURL(outputType, quality);
        }

        // Approximate size in bytes of base64
        const compressedSize = Math.round((dataUrl.length * 3) / 4);

        resolve({
          dataUrl,
          originalSize,
          compressedSize,
          width,
          height,
        });
      };

      img.src = readerEvent.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
