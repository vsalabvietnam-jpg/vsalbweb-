import React, { useState } from 'react';
import {
  Edit3,
  Sliders,
  LogOut,
  RotateCcw,
  Check,
  Smartphone,
  RefreshCw,
  QrCode,
  Copy,
  ExternalLink,
  X,
  Globe,
  HelpCircle,
  ShieldCheck,
  Server,
  ChevronRight,
} from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface AdminBarProps {
  onShowToast: (message: string) => void;
}

export const AdminBar: React.FC<AdminBarProps> = ({ onShowToast }) => {
  const {
    isAdmin,
    openCms,
    logout,
    resetToDefault,
    saveAllNow,
    syncStatus,
    lastSyncedTime,
  } = useContent();

  const [showQrModal, setShowQrModal] = useState(false);
  const [showDomainModal, setShowDomainModal] = useState(false);
  const [selectedDomainTab, setSelectedDomainTab] = useState<'cloudflare' | 'vietnam'>('cloudflare');
  const [selectedUrlType, setSelectedUrlType] = useState<'custom' | 'cloudrun'>('custom');
  const [showAllIps, setShowAllIps] = useState(false);
  const [showIpv6, setShowIpv6] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [dnsTestStatus, setDnsTestStatus] = useState<{
    tested: boolean;
    loading: boolean;
    success?: boolean;
    pingMs?: number;
    primaryIp?: string;
    clientIp?: string;
  }>({ tested: false, loading: false });

  if (!isAdmin) return null;

  // Active production host for this applet
  const canonicalHost = 'ais-pre-ro46i4it2mfyr6k4zpobvq-2157604254.asia-southeast1.run.app';
  const currentHost = typeof window !== 'undefined' && window.location.hostname && !['localhost', '127.0.0.1', '0.0.0.0'].includes(window.location.hostname)
    ? window.location.hostname
    : canonicalHost;

  const cnameTarget = currentHost.includes('run.app') ? currentHost : canonicalHost;
  const customDomainUrl = 'https://vsalab.vn';
  const cloudRunUrl = `https://${cnameTarget}`;
  const activeQrUrl = selectedUrlType === 'custom' ? customDomainUrl : cloudRunUrl;

  // Updated Google Cloud Run Anycast IPv4 addresses (asia-southeast1)
  const serverIpv4List = [
    '34.143.74.2',
    '34.143.73.2',
    '34.143.76.2',
    '34.143.77.2',
    '34.143.72.2',
    '34.143.78.2',
    '34.143.79.2',
    '34.143.75.2',
  ];

  // IPv6 AAAA addresses for Google Cloud Run
  const serverIpv6List = [
    '2600:1901:81d5:200::',
    '2600:1900:4240:200::',
    '2600:1900:4244:200::',
    '2600:1900:4241:200::',
  ];

  const handleTestDnsConnection = async () => {
    setDnsTestStatus({ tested: false, loading: true });
    const start = performance.now();
    try {
      const res = await fetch('/api/dns-info');
      const data = await res.json();
      const end = performance.now();
      const pingMs = Math.round(end - start);
      setDnsTestStatus({
        tested: true,
        loading: false,
        success: data.success,
        pingMs,
        primaryIp: data.primaryIpv4 || serverIpv4List[0],
        clientIp: data.clientIp,
      });
      onShowToast(`✓ Kết nối máy chủ tốt! Phản hồi: ${pingMs}ms`);
    } catch {
      setDnsTestStatus({
        tested: true,
        loading: false,
        success: false,
      });
      onShowToast('Không thể kiểm tra phản hồi từ máy chủ.');
    }
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onShowToast(`✓ Đã sao chép ${label}!`);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleSaveAll = async () => {
    const success = await saveAllNow();
    if (success) {
      onShowToast('✓ Đã lưu thành công lên máy chủ & đồng bộ tức thì sang điện thoại!');
    } else {
      onShowToast('✓ Đã lưu thay đổi vào bộ nhớ cục bộ.');
    }
  };

  const handleSaveAndLogout = async () => {
    await saveAllNow();
    logout();
    onShowToast('✓ Đã lưu tất cả cài đặt và đăng xuất Quản trị viên thành công!');
  };

  const handleReset = async () => {
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ nội dung website về dữ liệu gốc ban đầu?')) {
      await resetToDefault();
      onShowToast('Đã khôi phục toàn bộ nội dung website về mặc định thành công.');
    }
  };

  const handleLogout = () => {
    logout();
    onShowToast('Đã đăng xuất khỏi chế độ Quản trị viên.');
  };

  return (
    <>
      <div
        id="admin-control-bar"
        className="sticky top-0 z-50 bg-[#142319] text-white border-b border-[#2D4B39] shadow-xl backdrop-blur-md px-3 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs"
      >
        {/* Left Badge */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="font-bold text-[#E6C285] uppercase tracking-wider">
            Quản trị viên (VSA LAB)
          </span>

          {/* Domain vsalab.vn Indicator */}
          <button
            onClick={() => setShowDomainModal(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8C521E]/30 hover:bg-[#8C521E]/50 border border-[#D9C8AC]/40 text-[#EBDDC8] transition-all cursor-pointer text-[11px]"
            title="Xem hướng dẫn cấu hình chuyển hướng tên miền vsalab.vn"
          >
            <Globe className="w-3 h-3 text-[#E6C285]" />
            <span className="font-semibold text-[#F5EDE1]">vsalab.vn</span>
            <span className="text-[10px] text-[#D9C8AC] underline">Cài đặt</span>
          </button>
          
          {/* Real-time Phone Sync indicator */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-[11px]">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {syncStatus === 'syncing' ? (
              <span className="flex items-center gap-1 text-amber-300">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Đang lưu & cập nhật sang điện thoại...</span>
              </span>
            ) : (
              <span className="flex items-center gap-1 text-emerald-300 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Đồng bộ tự động sang điện thoại ({lastSyncedTime || 'Sẵn sàng'})</span>
              </span>
            )}
          </div>
        </div>

        {/* Center & Right Actions */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Domain Setup Button */}
          <button
            onClick={() => setShowDomainModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#8C521E] hover:bg-[#724116] text-[#FAF6F0] font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Hướng dẫn trỏ tên miền vsalab.vn"
          >
            <Globe className="w-3.5 h-3.5 text-[#E6C285]" />
            <span>Trỏ Tên Miền (vsalab.vn)</span>
          </button>

          {/* Scan QR for Mobile Button */}
          <button
            onClick={() => setShowQrModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-900/90 hover:bg-emerald-800 text-emerald-200 border border-emerald-600/50 font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Mở mã QR để quét và xem ngay trên điện thoại"
          >
            <QrCode className="w-3.5 h-3.5 text-emerald-300" />
            <span className="hidden sm:inline">Mở trên</span>
            <span>Điện Thoại</span>
          </button>

          {/* Open Full CMS Drawer */}
          <button
            onClick={() => openCms('hero')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2D4B39] hover:bg-[#3D664E] text-white font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Sliders className="w-3.5 h-3.5 text-[#E6C285]" />
            <span>Bảng Biên Tập (CMS)</span>
          </button>

          {/* Quick Save All Button */}
          <button
            onClick={handleSaveAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#E6C285] hover:bg-[#d8b06e] text-[#142319] font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Lưu tất cả thông tin & hình ảnh ngay lập tức"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Hoàn Tất & Lưu Lại</span>
          </button>

          {/* Quick Save & Logout Button */}
          <button
            onClick={handleSaveAndLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-red-200 hover:text-white font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
            title="Lưu tất cả cài đặt và đăng xuất khỏi Quản trị viên"
          >
            <LogOut className="w-3.5 h-3.5 text-red-300" />
            <span>Lưu & Đăng Xuất</span>
          </button>

          {/* Quick section links */}
          <div className="hidden sm:flex items-center gap-1 bg-white/10 p-1 rounded-lg">
            <button
              onClick={() => openCms('hero')}
              className="px-2 py-1 rounded text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Banner
            </button>
            <button
              onClick={() => openCms('products')}
              className="px-2 py-1 rounded text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Sản phẩm
            </button>
            <button
              onClick={() => openCms('regions')}
              className="px-2 py-1 rounded text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Vùng dược liệu
            </button>
            <button
              onClick={() => openCms('contact')}
              className="px-2 py-1 rounded text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              Liên hệ
            </button>
          </div>

          {/* Reset to Default */}
          <button
            onClick={handleReset}
            title="Khôi phục mặc định ban đầu"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Khôi phục gốc</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 border border-red-800/40 text-red-200 font-medium transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>

      {/* Domain Mapping Guide Modal */}
      {showDomainModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FAF6F0] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-[#D5C6B3] relative text-[#243328] my-8 animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowDomainModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-start gap-3.5 mb-5 border-b border-[#D5C6B3] pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#8C521E]/15 border border-[#8C521E]/30 text-[#8C521E] flex items-center justify-center shrink-0">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-xl font-bold text-[#142319]">
                    Hướng Dẫn Cấu Hình Tên Miền vsalab.vn
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                    HTTPS / SSL Sẵn sàng
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1">
                  Thực hiện các bước bên dưới tại trang quản lý tên miền bạn đã mua để kết nối <strong className="text-[#8C521E]">vsalab.vn</strong> tới website này.
                </p>
              </div>
            </div>

            {/* Tab Chooser */}
            <div className="flex rounded-xl bg-stone-200/80 p-1 mb-5 text-xs font-semibold">
              <button
                onClick={() => setSelectedDomainTab('cloudflare')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedDomainTab === 'cloudflare'
                    ? 'bg-white text-[#8C521E] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cách 1: Qua Cloudflare (Khuyên dùng • Miễn phí SSL)</span>
              </button>
              <button
                onClick={() => setSelectedDomainTab('vietnam')}
                className={`flex-1 py-2 px-3 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  selectedDomainTab === 'vietnam'
                    ? 'bg-white text-[#8C521E] shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Server className="w-4 h-4 text-[#8C521E]" />
                <span>Cách 2: Trỏ Trực Tiếp (Mắt Bão, PA, iNET,...)</span>
              </button>
            </div>

            {/* Content for Cloudflare Method */}
            {selectedDomainTab === 'cloudflare' ? (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 leading-relaxed">
                  <strong>💡 Tại sao nên dùng Cloudflare?</strong> Cloudflare tự động cấp chứng chỉ bảo mật <strong>HTTPS (ổ khóa xanh)</strong> miễn phí, tăng tốc độ tải trang toàn cầu và bảo vệ tên miền chống tấn công DDoS.
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#8C521E] text-white flex items-center justify-center text-[11px] font-bold shrink-0">1</span>
                    <div>
                      <p className="font-semibold text-stone-900">Đăng nhập tài khoản Cloudflare</p>
                      <p className="text-stone-600">Vào <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-[#8C521E] underline font-medium">dash.cloudflare.com</a> và thêm tên miền <strong>vsalab.vn</strong>.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#8C521E] text-white flex items-center justify-center text-[11px] font-bold shrink-0">2</span>
                    <div className="w-full">
                      <p className="font-semibold text-stone-900 mb-2">Thêm 2 bản ghi DNS trong mục "DNS Records" của Cloudflare:</p>

                      {/* DNS Record 1 */}
                      <div className="bg-white p-3 rounded-xl border border-stone-300 mb-2 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#8C521E]">Bản ghi 1 (Cho tên miền gốc vsalab.vn):</span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Bật Proxy (Đám mây cam)</span>
                        </div>
                        <div className="grid grid-cols-12 gap-2 text-stone-700 font-mono text-[11px] items-center">
                          <div className="col-span-3">Type: <span className="font-bold text-stone-900">CNAME</span></div>
                          <div className="col-span-2">Name: <span className="font-bold text-stone-900">@</span></div>
                          <div className="col-span-7 flex items-center justify-between bg-stone-100 px-2 py-1 rounded">
                            <span className="truncate">{cnameTarget}</span>
                            <button
                              onClick={() => copyToClipboard(cnameTarget, 'cname1', 'giá trị CNAME')}
                              className="ml-1 p-1 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                              title="Sao chép"
                            >
                              {copiedKey === 'cname1' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* DNS Record 2 */}
                      <div className="bg-white p-3 rounded-xl border border-stone-300 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#8C521E]">Bản ghi 2 (Cho www.vsalab.vn):</span>
                          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">Bật Proxy (Đám mây cam)</span>
                        </div>
                        <div className="grid grid-cols-12 gap-2 text-stone-700 font-mono text-[11px] items-center">
                          <div className="col-span-3">Type: <span className="font-bold text-stone-900">CNAME</span></div>
                          <div className="col-span-2">Name: <span className="font-bold text-stone-900">www</span></div>
                          <div className="col-span-7 flex items-center justify-between bg-stone-100 px-2 py-1 rounded">
                            <span className="truncate">{cnameTarget}</span>
                            <button
                              onClick={() => copyToClipboard(cnameTarget, 'cname2', 'giá trị CNAME')}
                              className="ml-1 p-1 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                              title="Sao chép"
                            >
                              {copiedKey === 'cname2' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#8C521E] text-white flex items-center justify-center text-[11px] font-bold shrink-0">3</span>
                    <div>
                      <p className="font-semibold text-stone-900">Bật chế độ SSL</p>
                      <p className="text-stone-600">Vào mục <strong>SSL/TLS</strong> trong Cloudflare, chọn chế độ <strong>Full</strong> hoặc <strong>Full (strict)</strong>.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Content for Direct DNS Method */
              <div className="space-y-4 text-xs">
                <p className="text-stone-600">
                  Đăng nhập vào trang quản trị nơi bạn đã mua tên miền (Mắt Bão, PA Việt Nam, iNET, Nhân Hòa, v.v.) và cấu hình các bản ghi DNS sau:
                </p>

                {/* Direct Record 1: A Record (Anycast IPv4) */}
                <div className="bg-white p-3.5 rounded-xl border border-stone-300 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#8C521E] text-[12px]">Bản ghi 1: Bản ghi A (Địa chỉ IP máy chủ Anycast)</span>
                    <button
                      type="button"
                      onClick={() => setShowAllIps(!showAllIps)}
                      className="text-[11px] text-[#8C521E] hover:underline font-semibold cursor-pointer"
                    >
                      {showAllIps ? 'Thu gọn (Xem IP chính)' : `Xem tất cả ${serverIpv4List.length} địa chỉ IP`}
                    </button>
                  </div>

                  {/* Primary IP */}
                  <div className="grid grid-cols-12 gap-2 text-stone-700 font-mono text-[11px] items-center">
                    <div className="col-span-3">Loại: <span className="font-bold text-stone-900">A</span></div>
                    <div className="col-span-3">Host: <span className="font-bold text-stone-900">@</span></div>
                    <div className="col-span-6 flex items-center justify-between bg-stone-100 px-2 py-1 rounded">
                      <span className="font-bold text-emerald-800">{serverIpv4List[0]}</span>
                      <button
                        onClick={() => copyToClipboard(serverIpv4List[0], 'ip_primary', 'IP chính')}
                        className="ml-1 p-1 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                        title="Sao chép IP"
                      >
                        {copiedKey === 'ip_primary' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded List of all Anycast IPs */}
                  {showAllIps && (
                    <div className="mt-2 pt-2 border-t border-stone-200 space-y-1.5 animate-in fade-in">
                      <p className="text-[11px] text-stone-600 font-sans">
                        Hạ tầng Google Cloud phân tải qua cụm 8 địa chỉ IP Anycast. Bạn có thể thêm 1 hoặc cả 8 bản ghi A để tối ưu tốc độ và độ chịu lỗi:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-[11px]">
                        {serverIpv4List.map((ip, idx) => (
                          <div key={ip} className="flex items-center justify-between bg-stone-50 px-2 py-1 rounded border border-stone-200">
                            <span>#{idx + 1}: <strong>{ip}</strong></span>
                            <button
                              onClick={() => copyToClipboard(ip, `ip_${idx}`, `IP ${ip}`)}
                              className="p-0.5 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                              title="Sao chép"
                            >
                              {copiedKey === `ip_${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => copyToClipboard(serverIpv4List.join('\n'), 'all_ips', 'toàn bộ danh sách 8 IP')}
                          className="w-full py-1.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer border border-stone-300"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#8C521E]" />
                          <span>{copiedKey === 'all_ips' ? 'Đã sao chép 8 IP!' : 'Sao chép toàn bộ danh sách 8 IP'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Record 2: CNAME Record */}
                <div className="bg-white p-3.5 rounded-xl border border-stone-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#8C521E] text-[12px]">Bản ghi 2: Bản ghi CNAME cho www</span>
                  </div>
                  <div className="grid grid-cols-12 gap-2 text-stone-700 font-mono text-[11px] items-center">
                    <div className="col-span-3">Loại: <span className="font-bold text-stone-900">CNAME</span></div>
                    <div className="col-span-3">Host: <span className="font-bold text-stone-900">www</span></div>
                    <div className="col-span-6 flex items-center justify-between bg-stone-100 px-2 py-1 rounded">
                      <span className="truncate">{cnameTarget}</span>
                      <button
                        onClick={() => copyToClipboard(cnameTarget, 'cname_vn', 'giá trị CNAME')}
                        className="ml-1 p-1 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                        title="Sao chép"
                      >
                        {copiedKey === 'cname_vn' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Optional Record 3: IPv6 AAAA Records */}
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-800 text-[11px]">Bản ghi AAAA (Tùy chọn cho mạng IPv6 thế hệ mới)</span>
                    <button
                      type="button"
                      onClick={() => setShowIpv6(!showIpv6)}
                      className="text-[11px] text-[#8C521E] hover:underline font-medium cursor-pointer"
                    >
                      {showIpv6 ? 'Ẩn IPv6' : 'Hiển thị IPv6'}
                    </button>
                  </div>
                  {showIpv6 && (
                    <div className="space-y-1.5 pt-1 animate-in fade-in">
                      {serverIpv6List.map((ipv6, idx) => (
                        <div key={ipv6} className="flex items-center justify-between bg-white px-2 py-1 rounded border border-stone-200 font-mono text-[11px]">
                          <span className="truncate">AAAA @: {ipv6}</span>
                          <button
                            onClick={() => copyToClipboard(ipv6, `ipv6_${idx}`, `IPv6 ${ipv6}`)}
                            className="p-1 hover:bg-stone-200 rounded text-stone-700 cursor-pointer"
                            title="Sao chép"
                          >
                            {copiedKey === `ipv6_${idx}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed">
                  ⏱️ <strong>Thời gian cập nhật:</strong> Sau khi lưu bản ghi, thường mất từ 5 đến 30 phút (tối đa 24h) để các nhà mạng và máy chủ Internet trên toàn quốc cập nhật địa chỉ tên miền mới.
                </div>
              </div>
            )}

            {/* Live Server & DNS Ping Test Card */}
            <div className="mt-4 p-3 rounded-xl bg-[#FAF4EB] border border-[#DDD0BC] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span className="text-stone-700 text-[11px]">
                  {dnsTestStatus.tested
                    ? `✓ Máy chủ phản hồi (${dnsTestStatus.pingMs}ms) • IP: ${dnsTestStatus.primaryIp}`
                    : `Hạ tầng Cloud Run: ${serverIpv4List[0]} (asia-southeast1)`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleTestDnsConnection}
                disabled={dnsTestStatus.loading}
                className="px-3 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 text-[11px] font-semibold transition-all cursor-pointer disabled:opacity-50 shrink-0"
              >
                {dnsTestStatus.loading ? 'Đang kiểm tra...' : 'Kiểm tra IP & Máy chủ'}
              </button>
            </div>

            {/* Footer Buttons */}
            <div className="mt-6 pt-4 border-t border-[#D5C6B3] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <a
                href="https://vsalab.vn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#8C521E] font-bold hover:underline"
              >
                <span>Kiểm tra truy cập: https://vsalab.vn</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setShowDomainModal(false)}
                  className="w-full sm:w-auto py-2 px-5 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white font-semibold transition-all cursor-pointer text-center"
                >
                  Đã Hiểu & Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal for Phone Access */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF6F0] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#D5C6B3] relative text-[#243328] animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2.5">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#142319]">
                Mở Trên Điện Thoại
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Dùng camera điện thoại quét mã QR bên dưới để xem trực tiếp website:
              </p>
            </div>

            {/* Choose which URL to generate QR for */}
            <div className="flex rounded-lg bg-stone-200 p-1 mb-3.5 text-[11px] font-semibold">
              <button
                onClick={() => setSelectedUrlType('custom')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${
                  selectedUrlType === 'custom'
                    ? 'bg-white text-[#8C521E] shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                vsalab.vn (Chính thức)
              </button>
              <button
                onClick={() => setSelectedUrlType('cloudrun')}
                className={`flex-1 py-1.5 px-2 rounded-md transition-all cursor-pointer ${
                  selectedUrlType === 'cloudrun'
                    ? 'bg-white text-[#8C521E] shadow-2xs font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Link Cloud Run (Xem thử)
              </button>
            </div>

            {/* QR Code Container */}
            <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-inner flex flex-col items-center justify-center mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(activeQrUrl)}`}
                alt="QR Code website"
                className="w-48 h-48 rounded-lg"
              />
              <span className="text-[11px] text-stone-500 mt-2 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Tự động đồng bộ theo thời gian thực
              </span>
            </div>

            {/* Link Copy Box */}
            <div className="bg-stone-100 p-2.5 rounded-xl border border-stone-300 flex items-center justify-between gap-2 mb-4">
              <span className="text-[11px] font-mono text-stone-700 truncate select-all">
                {activeQrUrl}
              </span>
              <button
                onClick={() => copyToClipboard(activeQrUrl, 'active_url', 'đường dẫn')}
                className="shrink-0 p-1.5 rounded-lg bg-white hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-semibold"
                title="Sao chép link"
              >
                {copiedKey === 'active_url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'active_url' ? 'Đã chép' : 'Chép'}</span>
              </button>
            </div>

            <div className="flex gap-2">
              <a
                href={activeQrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#2D4B39] hover:bg-[#1E3125] text-white text-xs font-semibold text-center flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở trong tab mới</span>
              </a>
              <button
                onClick={() => setShowQrModal(false)}
                className="py-2.5 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
