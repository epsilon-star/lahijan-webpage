import React, { useState } from 'react';
import { Product, Language } from '../types';
import { PixelTeaLeavesBlack, PixelTeaLeavesGreen } from './PixelIcons';
import { sfx } from '../utils/audio';
import { X, Check, ShoppingBag, Clock, Thermometer, Calendar } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, weight: string) => void;
  lang: Language;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  lang,
}) => {
  if (!isOpen || !product) return null;
  const isFa = lang === 'fa';

  const [qty, setQty] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(product.selectedWeight);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    sfx.playCoin();
    onAddToCart(product, qty, selectedWeight);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div 
        className="w-full max-w-2xl bg-[#0e271c] border-4 border-[#255e3e] shadow-[8px_8px_0_#040c08] p-6 text-right dir-rtl relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            sfx.playClick();
            onClose();
          }}
          aria-label="Close details"
          className="absolute top-4 left-4 p-1.5 bg-[#123323] text-[#a7f3d0] hover:text-white border border-[#2d6e46]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Visual Showcase */}
          <div className="aspect-square bg-[#eedebd] border-3 border-[#6b5034] p-4 flex items-center justify-center relative overflow-hidden shadow-[3px_3px_0_#05150d]">
            {product.imageType === 'leaves-black' && (
              <PixelTeaLeavesBlack className="w-36 h-36" />
            )}
            {product.imageType === 'leaves-green' && (
              <PixelTeaLeavesGreen className="w-36 h-36" />
            )}
            {product.imageType === 'image' && (
              <img
                src={product.image}
                alt={product.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
                style={{ imageRendering: 'pixelated' }}
              />
            )}
            <div className="absolute top-2 right-2 bg-[#1b432e] text-[#bbf7d0] px-2 py-0.5 text-[11px] font-pixel-sub border border-[#3b7e54]">
              {product.harvest}
            </div>
          </div>

          {/* Details & Controls */}
          <div className="space-y-4">
            <div>
              <h3 className="font-persian-pixel text-2xl sm:text-3xl text-[#ffffff]">
                {isFa ? product.nameFa : product.nameEn}
              </h3>
              <p className="font-persian-text text-xs text-[#86efac] mt-1">
                {isFa ? product.subtitleFa : product.subtitleEn}
              </p>
            </div>

            <p className="font-persian-text text-sm text-[#c5dfcb] leading-relaxed">
              {isFa ? product.descriptionFa : product.descriptionEn}
            </p>

            {/* Brewing specs */}
            <div className="grid grid-cols-2 gap-2 bg-[#091a13] p-2.5 border border-[#1b472e] text-xs font-persian-text text-[#9ec1a8]">
              <div className="flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-[#ef4444]" />
                <span>{isFa ? `دمای آب: ${product.waterTemp}` : `Water: ${product.waterTemp}`}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                <span>{isFa ? product.brewTimeFa : product.brewTimeEn}</span>
              </div>
            </div>

            {/* Weight Selection */}
            <div>
              <span className="font-persian-pixel text-xs text-[#a7f3d0] block mb-1.5">
                {isFa ? 'وزن بسته:' : 'Select Weight:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {product.weights.map((w) => (
                  <button
                    key={w}
                    onClick={() => {
                      setSelectedWeight(w);
                      sfx.playClick();
                    }}
                    className={`px-3 py-1 text-xs font-persian-pixel border transition-all ${
                      selectedWeight === w
                        ? 'bg-[#1b4e33] text-[#d1fae5] border-[#4ade80]'
                        : 'bg-[#091912] text-[#8aa392] border-[#1a3d2b] hover:border-[#3b7852]'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart button */}
            <div className="pt-2 border-t border-[#1e4832] flex items-center justify-between gap-4">
              <div className="font-persian-pixel text-lg text-[#fef08a]">
                {isFa ? product.priceFormattedFa : product.priceFormattedEn}
              </div>

              <button
                onClick={handleAdd}
                className="pixel-btn-primary px-5 py-2 text-sm flex items-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-[#4ade80]" />
                    <span>{isFa ? 'به سبد اضافه شد' : 'Added to Cart'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isFa ? 'افزودن به سبد' : 'Add to Cart'}</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
