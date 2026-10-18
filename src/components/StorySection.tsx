import React, { useState } from 'react';
import { Language } from '../types';
import { PixelIranMap } from './PixelIcons';
import { sfx } from '../utils/audio';
import { ArrowLeft, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface StorySectionProps {
  lang: Language;
  onOpenStoryModal: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({
  lang,
  onOpenStoryModal,
}) => {
  const isFa = lang === 'fa';
  const [showPinTip, setShowPinTip] = useState(false);

  return (
    <section id="about" className="w-full bg-[#0a1e16] border-b-2 border-[#163825] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Main Grid: Left Artwork, Center Text, Right Pixel Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d261c] border-3 border-[#1e4832] p-4 sm:p-8 shadow-[6px_6px_0px_#040d09]">
          
          {/* Left Column (5 cols): Pixel Art Brewing Scene */}
          <div className="lg:col-span-5 relative overflow-hidden border-3 border-[#2a5b40] shadow-[4px_4px_0_#05110a] group">
            <img
              src="/src/assets/images/about_tea_ceremony_pixel_1792329061180.jpg"
              alt="Pixel art traditional Persian tea ceremony with samovar, teapot and tin"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ imageRendering: 'pixelated' }}
            />
            {/* Subtle overlay border effect */}
            <div className="absolute inset-0 border-2 border-[#54a86b] opacity-20 pointer-events-none" />
            
            {/* Tag on image */}
            <div className="absolute bottom-3 right-3 bg-[#081811]/90 border border-[#3b7e54] px-2.5 py-1 text-xs font-persian-pixel text-[#86efac]">
              {isFa ? 'سنت دم‌آوری چای ایرانی' : 'Persian Tea Tradition'}
            </div>
          </div>

          {/* Middle Column (4 cols): Story Text */}
          <div className="lg:col-span-4 flex flex-col justify-center text-right dir-rtl space-y-4 px-2">
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-1.5 text-xs font-pixel-sub text-[#6be089]">
              <Sparkles className="w-3.5 h-3.5 text-[#4ade80]" />
              <span>{isFa ? 'میراث لاهیجان' : 'The Lahijan Legacy'}</span>
            </div>

            {/* Title */}
            <h2 className="font-persian-pixel text-3xl sm:text-4xl text-[#ffffff] tracking-wide drop-shadow-[2px_2px_0_#000]">
              {isFa ? 'چای لاهیجان' : 'Lahijan Heritage'}
            </h2>

            {/* Paragraph */}
            <p className="font-persian-text text-sm sm:text-base text-[#c7e2cd] leading-relaxed font-normal">
              {isFa
                ? 'چای لاهیجان، یکی از مرغوب‌ترین و مشهورترین چای‌های ایرانی است که در دل مزارع سرسبز و مهآلود لاهیجان کشت می‌شود. این چای با عطر طبیعی و طعم دلنشین، انتخابی عالی برای علاقه‌مندان به چای اصیل ایرانی است.'
                : 'Cultivated in the misty, emerald hills of Lahijan along the Caspian coast, this tea is celebrated for its natural fragrance, mild astringency, and comforting warmth. An authentic craft nurtured across generations.'}
            </p>

            {/* Read More Button */}
            <div className="pt-2">
              <button
                onClick={() => {
                  sfx.playClick();
                  onOpenStoryModal();
                }}
                className="pixel-btn-outline px-4 py-2 font-persian-pixel text-sm sm:text-base flex items-center gap-2 group text-[#a7f3d0]"
              >
                <span>{isFa ? 'بیشتر بخوانید' : 'Read Full History'}</span>
                {isFa ? (
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </button>
            </div>
          </div>

          {/* Right Column (3 cols): Pixel Map of Iran */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center p-4 bg-[#081b12] border-2 border-[#1c472f]">
            <div className="text-center mb-2">
              <span className="font-persian-pixel text-xs text-[#86efac] block">
                {isFa ? 'موقعیت جغرافیایی مزارع چای' : 'Tea Terroir Coordinates'}
              </span>
              <span className="font-pixel-sub text-[10px] text-[#64748b]">
                GILAN · 37.2070° N, 50.0035° E
              </span>
            </div>

            {/* Interactive Pixel Map */}
            <div 
              onMouseEnter={() => setShowPinTip(true)}
              onMouseLeave={() => setShowPinTip(false)}
              className="relative p-2"
            >
              <PixelIranMap 
                onPinClick={() => {
                  sfx.playCoin();
                  setShowPinTip(!showPinTip);
                }} 
              />
            </div>

            {/* Coordinates / Terroir Stats */}
            <div className="mt-3 w-full bg-[#0c2419] p-2 border border-[#1e4832] text-xs font-persian-text text-[#a8d5b4] flex justify-between items-center">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#ef4444]" />
                <span className="font-persian-pixel text-xs">{isFa ? 'لاهیجان، گیلان' : 'Lahijan, Gilan'}</span>
              </div>
              <span className="font-pixel-sub text-[11px] text-[#6ee7b7]">
                {isFa ? 'ارتفاع: ۸۵۰ متر' : 'Elev: 850m'}
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
