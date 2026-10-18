/**
 * Utility to calculate dynamic real-time publication dates
 * Ensures articles always reflect real-time current dates without becoming stale
 */

export function getRealtimeDateString(offsetDays: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

export function getArticleRealtimeDate(articleId: string, fallbackDate?: string): string {
  if (articleId === 'tay-giang-truong-son' || articleId === 'cau-chuyen-tay-giang') {
    return getRealtimeDateString(0); // Hôm nay
  }
  if (articleId === 'quang-ngai-huong-thom-dat-gio') {
    return getRealtimeDateString(1); // 1 ngày trước
  }
  if (articleId === 'ninh-binh-di-san-xanh') {
    return getRealtimeDateString(2); // 2 ngày trước
  }
  if (articleId === 'tri-thuc-ban-dia-gia-tri-vo-hinh') {
    return getRealtimeDateString(3); // 3 ngày trước
  }
  if (articleId === 'tu-vung-nguyen-lieu-den-phong-thi-nghiem') {
    return getRealtimeDateString(4); // 4 ngày trước
  }
  if (articleId === 'vung-nguyen-lieu-ben-vung') {
    return getRealtimeDateString(5); // 5 ngày trước
  }
  if (articleId === '5-loi-ich-tinh-dau') {
    return getRealtimeDateString(6); // 6 ngày trước
  }
  if (articleId === 'cong-nghe-chiet-xuat') {
    return getRealtimeDateString(7); // 7 ngày trước
  }

  // If a recent date (year >= 2026) was passed, use it, otherwise return today
  if (fallbackDate && fallbackDate.includes('2026')) {
    return fallbackDate;
  }

  return getRealtimeDateString(0);
}
