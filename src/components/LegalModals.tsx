import React from 'react';
import { X as CloseIcon, ShieldCheck, FileText, Building2, Phone, Mail, MapPin } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | 'company' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#FAF6F0] rounded-2xl shadow-2xl border border-[#DDD0BC] p-6 sm:p-8 text-[#241D17] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-[#EFE5D3] transition-colors cursor-pointer"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {type === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#8C521E]">
              <ShieldCheck className="w-6 h-6" />
              <h2 className="font-serif text-2xl font-bold">Chính Sách Bảo Mật Thông Tin</h2>
            </div>
            <p className="text-xs text-[#7A6B5A]">Cập nhật lần cuối: Tháng 03/2025</p>

            <div className="space-y-3 text-xs sm:text-sm text-[#44382D] leading-relaxed">
              <h3 className="font-bold text-[#241D17] pt-2">1. Mục đích thu thập thông tin</h3>
              <p>
                VSA LAB (Vườn Tinh Dầu) cam kết bảo mật tuyệt đối thông tin cá nhân của quý khách hàng. Chúng tôi chỉ thu thập các thông tin cần thiết như họ tên, số điện thoại, địa chỉ nhận hàng nhằm phục vụ việc tư vấn sản phẩm, giao hàng và hỗ trợ hậu mãi.
              </p>

              <h3 className="font-bold text-[#241D17] pt-2">2. Phạm vi sử dụng thông tin</h3>
              <p>
                Thông tin của quý khách chỉ được sử dụng nội bộ để xác nhận đơn hàng, gửi thông báo cập nhật về tình trạng giao hàng hoặc cung cấp tài liệu hướng dẫn sử dụng tinh dầu đúng cách. Chúng tôi cam đoan không bán, chia sẻ hoặc chuyển giao thông tin cá nhân cho bên thứ ba vì bất kỳ mục đích thương mại nào.
              </p>

              <h3 className="font-bold text-[#241D17] pt-2">3. Thời gian lưu trữ &amp; Quyền của khách hàng</h3>
              <p>
                Thông tin cá nhân được lưu trữ an toàn trên hệ thống quản lý của chúng tôi cho đến khi quý khách có yêu cầu hủy bỏ qua hotline 0833-15-3388 hoặc email info@vuontinhdau.vn.
              </p>
            </div>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#8C521E]">
              <FileText className="w-6 h-6" />
              <h2 className="font-serif text-2xl font-bold">Điều Khoản Sử Dụng</h2>
            </div>
            <p className="text-xs text-[#7A6B5A]">Cập nhật lần cuối: Tháng 03/2025</p>

            <div className="space-y-3 text-xs sm:text-sm text-[#44382D] leading-relaxed">
              <h3 className="font-bold text-[#241D17] pt-2">1. Cam kết chất lượng sản phẩm</h3>
              <p>
                Các sản phẩm tinh dầu do VSA LAB phân phối đều được chưng cất 100% từ nguyên liệu thảo mộc bản địa, trải qua kiểm định sắc ký khí GC-MS nghiêm ngặt. Thông tin về dung tích, nốt hương, thành phần thực vật được công bố minh bạch trên website.
              </p>

              <h3 className="font-bold text-[#241D17] pt-2">2. Hướng dẫn sử dụng &amp; Cảnh báo y tế</h3>
              <p>
                Tinh dầu nguyên chất là sản phẩm hỗ trợ tạo không gian thư giãn, chăm sóc lối sống lành mạnh và liệu pháp hương thơm tự nhiên; không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Phụ nữ mang thai, trẻ sơ sinh và người có tiền sử dị ứng nên tham khảo ý kiến chuyên gia trước khi dùng.
              </p>

              <h3 className="font-bold text-[#241D17] pt-2">3. Chính sách đổi trả &amp; Khiếu nại</h3>
              <p>
                Khách hàng được quyền kiểm tra hàng khi nhận và đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi rò rỉ, vỡ hỏng do vận chuyển hoặc không đúng mô tả xuất xứ từ nhà sản xuất.
              </p>
            </div>
          </div>
        )}

        {type === 'company' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-[#8C521E]">
              <Building2 className="w-6 h-6" />
              <h2 className="font-serif text-2xl font-bold">Thông Tin Doanh Nghiệp &amp; Nghiên Cứu</h2>
            </div>
            <p className="text-xs text-[#7A6B5A]">Hồ sơ năng lực pháp lý &amp; Đơn vị liên kết E-E-A-T</p>

            <div className="space-y-3 text-xs sm:text-sm text-[#44382D] leading-relaxed bg-[#FFFDF9] p-4 rounded-xl border border-[#DDD0BC]">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#241D17]">Đơn vị bảo trợ khoa học &amp; R&amp;D:</strong>
                  <span>Trung tâm Khoa học và Chuyển giao Công Nghệ Nông nghiệp VSA (Chi nhánh Công ty TNHH Ville De Faifo Việt Nam)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-[#EFE5D3]">
                <Building2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#241D17]">Cơ sở sản xuất &amp; Hợp tác xã liên kết:</strong>
                  <span>HTX Dược liệu và Nông sản sạch Cách Mạng Xanh (Thôn Tr'Hy, Hùng Sơn, Tây Giang, Quảng Nam)</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-[#EFE5D3]">
                <Building2 className="w-4 h-4 text-[#8C521E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#241D17]">Đơn vị phân phối độc quyền:</strong>
                  <span>Công ty TNHH M-MADE Việt Nam</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-[#EFE5D3]">
                <MapPin className="w-4 h-4 text-[#8C521E] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#241D17]">Địa chỉ văn phòng điều hành:</strong>
                  <span>Số 08, Đường Trung Lương 3, P. Hòa Xuân, Q. Cẩm Lệ, TP. Đà Nẵng</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[#EFE5D3]">
                <Phone className="w-4 h-4 text-[#8C521E] shrink-0" />
                <span>Hotline: 0833-15-3388 (Zalo / Call)</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8C521E] shrink-0" />
                <span>Email: info@vuontinhdau.vn</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#E5DAC4] text-right">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#8C521E] text-white text-xs font-semibold hover:bg-[#724116] transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
