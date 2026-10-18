import React from 'react';
import { Product, Language } from '../types';
import { TEA_PRODUCTS } from '../data/teaProducts';
import { PixelTeaLeavesBlack, PixelTeaLeavesGreen, PixelLeafLogo } from './PixelIcons';
import { sfx } from '../utils/audio';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';

interface ProductsSectionProps {
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  lang,
  onSelectProduct,
  onAddToCart,
}) => {
  const isFa = lang === 'fa';

  return (
    <section id="products" className="relative w-full bg-[#e8dcbd] text-[#2c1d11] py-14 sm:py-20 border-b-4 border-[#3b2716] overflow-hidden">
      {/* Pixel Parchment Dot Pattern */}
      <div className="absolute inset-0 pixel-parchment-pattern opacity-40 pointer-events-none" />

      {/* Decorative Pixel Tea Leaves on the Left Margin (Matching reference image) */}
      <div className="absolute left-2 top-8 pointer-events-none hidden xl:block opacity-75">
        <div className="space-y-4">
          <PixelLeafLogo className="w-10 h-10 text-[#3b7440] rotate-[-25deg]" />
          <PixelLeafLogo className="w-8 h-8 text-[#4a8f50] rotate-[-45deg] translate-x-3" />
          <PixelLeafLogo className="w-12 h-12 text-[#2c5a31] rotate-[-15deg]" />
          <PixelLeafLogo className="w-9 h-9 text-[#417d47] rotate-[-35deg] translate-x-2" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading: "🌿 محصولات ما 🌿" */}
        <div className="flex items-center justify-center gap-3 mb-10 sm:mb-14">
          <PixelLeafLogo className="w-6 h-6 text-[#2d6e42] rotate-[-30deg]" />
          <h2 className="font-persian-pixel text-3xl sm:text-4xl text-[#21160a] tracking-wide text-center">
            {isFa ? 'محصولات ما' : 'Our Artisan Teas'}
          </h2>
          <PixelLeafLogo className="w-6 h-6 text-[#2d6e42] rotate-[30deg]" />
        </div>

        {/* Layout: Products Grid (Left) + Postcard Banner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Products Grid (8 cols on large screens, 4 products) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TEA_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="pixel-box-card p-4 flex flex-col justify-between items-center text-center group hover:-translate-y-1 transition-transform cursor-pointer relative"
                onClick={() => {
                  sfx.playClick();
                  onSelectProduct(prod);
                }}
              >
                {/* Product Image / Pixel Mound Container */}
                <div className="w-full aspect-square flex items-center justify-center mb-4 bg-[#f4ebe1]/80 border-2 border-[#b89a74] overflow-hidden p-2">
                  {prod.imageType === 'leaves-black' && (
                    <div className="group-hover:scale-110 transition-transform">
                      <PixelTeaLeavesBlack className="w-24 h-24" />
                    </div>
                  )}
                  {prod.imageType === 'leaves-green' && (
                    <div className="group-hover:scale-110 transition-transform">
                      <PixelTeaLeavesGreen className="w-24 h-24" />
                    </div>
                  )}
                  {prod.imageType === 'image' && (
                    <img
                      src={prod.image}
                      alt={prod.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  )}
                </div>

                {/* Product Title */}
                <h3 className="font-persian-pixel text-xl text-[#281c10] mb-1">
                  {isFa ? prod.nameFa : prod.nameEn}
                </h3>

                {/* Muted Subtitle */}
                <p className="font-persian-text text-xs text-[#6e5338] mb-3 line-clamp-1">
                  {isFa ? prod.subtitleFa : prod.subtitleEn}
                </p>

                {/* Price */}
                <div className="font-persian-pixel text-sm text-[#194c2e] font-bold mb-3">
                  {isFa ? prod.priceFormattedFa : prod.priceFormattedEn}
                </div>

                {/* Arrow Button & Quick Add matching screenshot */}
                <div className="w-full flex items-center justify-between pt-2 border-t border-[#cbb393]">
                  <span className="font-persian-pixel text-xs text-[#523e2a] flex items-center gap-1 group-hover:text-[#1e5c35]">
                    {isFa ? 'مشاهده' : 'Details'}
                    {isFa ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sfx.playCoin();
                      onAddToCart(prod);
                    }}
                    title={isFa ? 'افزودن به سبد' : 'Add to Cart'}
                    className="p-1 bg-[#1e482f] text-[#c9efba] hover:bg-[#285f3e] border border-[#0d2618] active:translate-y-0.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Right Postcard Banner: "از لاهیجان تا خانه شما" (4 cols on lg screens) */}
          <div className="lg:col-span-4 flex flex-col justify-between pixel-box-card p-4 relative overflow-hidden bg-[#e0d3b6] border-3 border-[#6b5034]">
            
            {/* Header Text matching reference */}
            <div className="mb-3 text-center sm:text-right dir-rtl">
              <span className="font-persian-pixel text-2xl sm:text-3xl text-[#26190e] block">
                {isFa ? 'از لاهیجان تا خانه شما' : 'From Lahijan to Your Home'}
              </span>
              <p className="font-persian-text text-xs text-[#5c442c] mt-1">
                {isFa
                  ? 'بسته‌بندی در مبدا، حفظ تازگی و ارسال بدون واسطه از باغ‌های چای گیلان'
                  : 'Sealed at the source, direct delivery from northern tea gardens to your doorstep.'}
              </p>
            </div>

            {/* Postcard Image */}
            <div className="relative aspect-[4/3] w-full border-2 border-[#82613f] overflow-hidden shadow-[2px_2px_0_#382414] group">
              <img
                src="/src/assets/images/postcard_lahijan_pixel_1792329061619.jpg"
                alt="Lahijan vintage pixel art postcard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ imageRendering: 'pixelated' }}
              />

              {/* Heart pin icon on postcard */}
              <div className="absolute top-3 left-3 bg-[#be123c] text-white p-1 text-xs border border-[#4c0519] shadow-[1px_1px_0_#000]">
                ♥
              </div>

              {/* Postcard Stamp Badge */}
              <div className="absolute bottom-2 right-2 bg-[#fefce8]/90 border border-[#78350f] px-2 py-0.5 text-[10px] font-pixel-sub text-[#78350f]">
                LAHIJAN · 1900
              </div>
            </div>

            {/* Postcard Footer note */}
            <div className="mt-3 bg-[#cfbe9b] p-2.5 border border-[#8a6845] text-xs font-persian-text text-[#2c1e13] flex items-center justify-between">
              <span>{isFa ? 'ضمانت بازگشت و کیفیت ۱۰۰٪' : '100% Quality & Freshness Guarantee'}</span>
              <span className="font-pixel-sub text-[11px] text-[#1e5c35] font-bold">EST. 1900</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
