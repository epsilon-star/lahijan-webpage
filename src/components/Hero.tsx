import React from 'react';
import { Language } from '../types';
import { sfx } from '../utils/audio';
import { Sparkles, ArrowDown } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onExploreProducts: () => void;
  onOpenBrewBar: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExploreProducts,
  onOpenBrewBar,
}) => {
  const isFa = lang === 'fa';

  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#0a1b14] border-b-4 border-[#163825]">
      {/* Container with pixel art decorative framing */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        
        {/* Hero Artwork Box with Pixel Wooden Frame */}
        <div className="relative w-full rounded-none overflow-hidden border-4 border-[#3b2716] shadow-[0_8px_0_#06110a] bg-[#14231b]">
          {/* Outer pixel frame bevels */}
          <div className="absolute inset-0 pointer-events-none border-4 border-[#73502e] border-opacity-30 z-10" />

          {/* Background Pixel Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full max-h-[580px] overflow-hidden">
            <img
              src="/src/assets/images/hero_lahijan_pixel_landscape_1792329060995.jpg"
              alt="Lahijan Tea plantation pixel art landscape with steaming tea glass"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center select-none"
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Subtle Gradient Scrim for perfect contrast & readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#081710]/95 via-[#081710]/45 to-transparent md:bg-gradient-to-r md:from-transparent md:via-[#081710]/60 md:to-[#081710]/90" />

            {/* Steaming Pixel Steam Overlay atop the tea glass */}
            <div className="absolute bottom-[18%] left-[18%] md:bottom-[22%] md:left-[19%] pointer-events-none flex flex-col items-center">
              <span className="w-1.5 h-3 bg-[#fef3c7] opacity-60 animate-pixel-steam" />
              <span className="w-2 h-4 bg-[#fde68a] opacity-75 animate-pixel-steam delay-150" />
            </div>

            {/* Hero Copy Overlay Box matching screenshot placement */}
            <div className="absolute inset-0 flex items-center justify-end p-6 sm:p-10 md:p-14 z-20">
              <div className="max-w-xl text-right dir-rtl bg-[#0b1f16]/90 p-5 sm:p-8 border-3 border-[#2a613f] shadow-[6px_6px_0px_#040c08] backdrop-blur-sm">
                
                {/* Vintage Badge / Tag */}
                <div className="inline-flex items-center gap-2 mb-3 text-xs font-pixel-sub text-[#86efac]">
                  <span className="w-2 h-2 bg-[#4ade80] inline-block shadow-[1px_1px_0_#000]" />
                  <span>{isFa ? 'لاهیجان، پایتخت چای ایران' : 'Lahijan, Capital of Iranian Tea'}</span>
                </div>

                {/* Main Heading */}
                <h1 className="font-persian-pixel text-4xl sm:text-5xl lg:text-6xl text-[#ffffff] tracking-wide mb-3 drop-shadow-[2px_2px_0px_#05150d] text-balance">
                  {isFa ? 'چای لاهیجان' : 'Lahijan Tea'}
                </h1>

                {/* Subtitle */}
                <h2 className="font-persian-pixel text-xl sm:text-2xl text-[#bbf7d0] mb-4 drop-shadow-[1px_1px_0px_#000]">
                  {isFa ? 'عطر طبیعت، در هر فنجان' : 'The Fragrance of Nature, in Every Cup'}
                </h2>

                {/* Paragraph Description */}
                <p className="font-persian-text text-sm sm:text-base text-[#d1e7d5] leading-relaxed mb-6 font-normal">
                  {isFa
                    ? 'چای اصیل ایرانی، از دل باغ‌های سرسبز لاهیجان با طعمی ماندگار و کیفیتی بی‌نظیر. برداشتی ناب از مزارع مه‌آلود گیلان بر فراز دامنه‌های البرز.'
                    : 'Authentic Iranian tea from the heart of lush Lahijan tea plantations, offering enduring aroma, rich ruby color, and unmatched pure artisan quality.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 justify-start sm:justify-start">
                  <button
                    onClick={() => {
                      sfx.playClick();
                      onExploreProducts();
                    }}
                    className="pixel-btn-primary px-5 py-2.5 text-base sm:text-lg flex items-center gap-2"
                  >
                    <span>{isFa ? 'مشاهده محصولات' : 'View Products'}</span>
                    <span className="text-sm">🌿</span>
                  </button>

                  <button
                    onClick={() => {
                      sfx.playPour();
                      onOpenBrewBar();
                    }}
                    className="pixel-btn-outline px-4 py-2 font-persian-pixel text-sm sm:text-base flex items-center gap-2 text-[#a7f3d0]"
                  >
                    <Sparkles className="w-4 h-4 text-[#4ade80]" />
                    <span>{isFa ? 'دم‌کردن مجازی چای' : 'Virtual Tea Bar'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Quick Scroll Down Hint */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
              <span className="font-pixel-sub text-[10px] text-[#86efac] mb-1">SCROLL</span>
              <ArrowDown className="w-3.5 h-3.5 text-[#86efac] animate-bounce" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
