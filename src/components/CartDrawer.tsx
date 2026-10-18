import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { sfx } from '../utils/audio';
import { X, Trash2, Plus, Minus, CheckCircle, Package } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  const isFa = lang === 'fa';
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderCode, setOrderCode] = useState('');

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const formattedTotalFa = `${totalAmount.toLocaleString('fa-IR')} تومان`;
  const formattedTotalEn = `$${((totalAmount / 38000) || 0).toFixed(2)}`;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sfx.playReady();
    const code = `LH-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderCode(code);
    setCheckoutStep('success');
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs transition-opacity">
      <div 
        className="w-full max-w-md bg-[#0a1b14] border-l-4 sm:border-l-4 border-[#245b3a] h-full flex flex-col justify-between p-4 sm:p-6 shadow-[0_0_20px_#000] text-right dir-rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#1c482f]">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-[#4ade80]" />
            <h2 className="font-persian-pixel text-xl text-[#ffffff]">
              {isFa ? 'سبد خرید چای لاهیجان' : 'Lahijan Tea Basket'}
            </h2>
          </div>
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            aria-label="Close Basket"
            className="p-1.5 bg-[#122e20] text-[#a7f3d0] hover:text-white border border-[#2c6541]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 bg-[#0f2a1d] border-2 border-[#1e4e34] flex items-center justify-center text-3xl">
                    🍵
                  </div>
                  <p className="font-persian-pixel text-base text-[#9ec1a8]">
                    {isFa ? 'سبد خرید شما خالی است' : 'Your tea basket is empty'}
                  </p>
                  <p className="font-persian-text text-xs text-[#6e8a77]">
                    {isFa ? 'از محصولات ناب سرسبز لاهیجان انتخاب کنید.' : 'Explore fresh harvest teas from the catalog.'}
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-[#0e271c] border-2 border-[#1f4e34] p-3 flex items-center justify-between gap-3 shadow-[2px_2px_0_#05110a]"
                  >
                    <div className="flex-1">
                      <h4 className="font-persian-pixel text-sm text-[#ffffff]">
                        {isFa ? item.product.nameFa : item.product.nameEn}
                      </h4>
                      <span className="font-persian-text text-xs text-[#86efac]">
                        {item.weight}
                      </span>
                      <div className="font-persian-pixel text-xs text-[#a3e635] mt-1">
                        {isFa ? item.product.priceFormattedFa : item.product.priceFormattedEn}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-[#091a12] p-1 border border-[#214a33]">
                      <button
                        onClick={() => {
                          sfx.playClick();
                          onUpdateQty(item.product.id, -1);
                        }}
                        className="p-1 text-[#86efac] hover:text-white"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-pixel-sub text-xs px-2 text-[#ffffff]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          sfx.playClick();
                          onUpdateQty(item.product.id, 1);
                        }}
                        className="p-1 text-[#86efac] hover:text-white"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      onClick={() => {
                        sfx.playClick();
                        onRemoveItem(item.product.id);
                      }}
                      className="p-1.5 text-[#ef4444] hover:bg-[#2e1414] border border-transparent hover:border-[#7f1d1d]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div className="bg-[#0f2c1f] p-3 border border-[#255e3e] mb-2">
                <span className="font-persian-pixel text-xs text-[#86efac] block">
                  {isFa ? 'اطلاعات گیرنده جهت ارسال تازه از لاهیجان' : 'Shipping Info for Direct Delivery'}
                </span>
              </div>

              <div>
                <label className="block font-persian-pixel text-xs text-[#c4e3cb] mb-1">
                  {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                </label>
                <input
                  required
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={isFa ? 'مثال: رضا طاهری' : 'e.g. John Doe'}
                  className="w-full bg-[#081811] border-2 border-[#225035] p-2 text-sm text-[#ffffff] focus:border-[#4ade80] outline-none font-persian-text"
                />
              </div>

              <div>
                <label className="block font-persian-pixel text-xs text-[#c4e3cb] mb-1">
                  {isFa ? 'شماره تماس' : 'Phone Number'}
                </label>
                <input
                  required
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder={isFa ? '۰۹۱۲۱۲۳۴۵۶۷' : '+1 555 123 4567'}
                  className="w-full bg-[#081811] border-2 border-[#225035] p-2 text-sm text-[#ffffff] focus:border-[#4ade80] outline-none font-persian-text"
                />
              </div>

              <div>
                <label className="block font-persian-pixel text-xs text-[#c4e3cb] mb-1">
                  {isFa ? 'آدرس دقیق پستی' : 'Shipping Address'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder={isFa ? 'استان، شهر، خیابان، پلاک، واحد...' : 'Street address, city, postal code...'}
                  className="w-full bg-[#081811] border-2 border-[#225035] p-2 text-sm text-[#ffffff] focus:border-[#4ade80] outline-none font-persian-text"
                />
              </div>

              <div className="bg-[#091a12] p-3 border border-[#225035] text-xs font-persian-text text-[#86efac]">
                {isFa
                  ? 'روش پرداخت: پرداخت در محل (COD) یا کارت به کارت با فاکتور رسمی'
                  : 'Payment terms: Cash on Delivery or Card with official receipt.'}
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-[#143d28] border-3 border-[#4ade80] mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-[#4ade80]" />
              </div>
              <h3 className="font-persian-pixel text-2xl text-[#ffffff]">
                {isFa ? 'سفارش شما با موفقیت ثبت شد!' : 'Order Placed Successfully!'}
              </h3>
              <div className="bg-[#0d281c] p-3 border-2 border-[#225839] max-w-xs mx-auto">
                <span className="font-pixel-sub text-xs text-[#86efac] block">
                  {isFa ? 'کد رهگیری پستی:' : 'Tracking Code:'}
                </span>
                <span className="font-pixel-title text-base text-[#fef08a] mt-1 block">
                  {orderCode}
                </span>
              </div>
              <p className="font-persian-text text-xs text-[#b8d6bf] max-w-xs mx-auto">
                {isFa
                  ? 'بسته‌بندی چای تازه لاهیجان در بسته‌های ضد رطوبت آماده‌سازی و ارسال خواهد شد.'
                  : 'Fresh Lahijan tea will be packed in aroma-sealed tins and dispatched directly from Gilan.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer / Total & Submit */}
        <div className="pt-4 border-t-2 border-[#1c482f] space-y-3">
          {checkoutStep === 'cart' && cart.length > 0 && (
            <>
              <div className="flex justify-between items-center text-sm font-persian-pixel">
                <span className="text-[#a7f3d0]">{isFa ? 'مجموع قابل پرداخت:' : 'Order Total:'}</span>
                <span className="text-xl text-[#fef08a]">{isFa ? formattedTotalFa : formattedTotalEn}</span>
              </div>
              <button
                onClick={() => {
                  sfx.playClick();
                  setCheckoutStep('checkout');
                }}
                className="w-full pixel-btn-primary py-3 text-base"
              >
                {isFa ? 'ادامه و ثبت نهایی سفارش' : 'Proceed to Checkout'}
              </button>
            </>
          )}

          {checkoutStep === 'checkout' && (
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="pixel-btn-outline px-4 py-2 font-persian-pixel text-xs text-[#86efac]"
              >
                {isFa ? 'بازگشت' : 'Back'}
              </button>
              <button
                form="checkout-form"
                type="submit"
                className="flex-1 pixel-btn-primary py-2.5 text-sm"
              >
                {isFa ? 'تأیید سفارش' : 'Confirm Order'}
              </button>
            </div>
          )}

          {checkoutStep === 'success' && (
            <button
              onClick={() => {
                sfx.playClick();
                setCheckoutStep('cart');
                onClose();
              }}
              className="w-full pixel-btn-primary py-2.5 text-sm"
            >
              {isFa ? 'بستن' : 'Close'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
