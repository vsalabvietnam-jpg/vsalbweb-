import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between bg-[#FAFBF9]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-xl font-bold text-stone-900">
              Giỏ hàng của bạn ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <h4 className="font-serif text-lg font-bold text-stone-800 mb-1">
                Giỏ hàng còn trống
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mb-6">
                Hãy lựa chọn những giọt tinh dầu nguyên chất bản địa để chăm sóc sức khỏe cho gia đình.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-lg bg-[#0D3B2E] text-white text-xs font-semibold hover:bg-emerald-800 transition-colors"
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="pt-4 first:pt-0 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-stone-100 shrink-0 border border-stone-200"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-sm text-stone-900 leading-snug">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors ml-2"
                          title="Xóa khỏi giỏ hàng"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {item.product.volume} • {item.product.origin}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-200 rounded-md overflow-hidden bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-stone-200 text-stone-700 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line Price */}
                      <span className="text-sm font-bold text-emerald-900">
                        {(item.product.price * item.quantity).toLocaleString('vi-VN')} đ
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-200 bg-[#FAFBF9] space-y-4">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-semibold text-stone-900">
                  {totalAmount.toLocaleString('vi-VN')} đ
                </span>
              </div>
              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span className="text-emerald-700 font-medium">
                  {totalAmount >= 500000 ? 'Miễn phí giao hàng' : '30.000 đ'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Tổng thanh toán</span>
                <span className="text-base text-emerald-900 font-serif">
                  {(totalAmount >= 500000 ? totalAmount : totalAmount + 30000).toLocaleString('vi-VN')} đ
                </span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-[#0D3B2E] text-white font-semibold text-sm hover:bg-emerald-800 transition-all shadow-md active:scale-98 cursor-pointer"
            >
              <span>Tiến hành đặt hàng ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Cam kết 100% tinh dầu sạch chính hãng VSA LAB</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
