import React from 'react';
import { PixelLeafLogo } from './PixelIcons';
import { Language } from '../types';
import { sfx } from '../utils/audio';
import { Search, ShoppingBag, Volume2, VolumeX, Menu, Globe } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  cartCount,
  onOpenCart,
  onOpenSearch,
  soundEnabled,
  onToggleSound,
  onOpenMobileMenu,
}) => {
  const isFa = lang === 'fa';

  return (
    <header className="sticky top-0 z-40 bg-[#091a13]/95 backdrop-blur-md border-b-2 border-[#1c482f] px-4 md:px-8 py-3 transition-colors shadow-[0_4px_0_#050e0a]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Pixel Art Leaf + Title) */}
        <a 
          href="#"
          onClick={() => sfx.playClick()}
          className="flex items-center gap-2.5 text-[#e2f7dd] hover:text-[#9df5b1] transition-colors whitespace-nowrap shrink-0 group"
        >
          <div className="p-1 bg-[#102d1f] border-2 border-[#397a51] group-hover:border-[#5ec080] transition-colors">
            <PixelLeafLogo className="w-5 h-5 text-[#6ae087]" />
          </div>
          <span className="font-pixel-sub text-sm sm:text-base tracking-tight font-bold text-[#f0fbf0]">
            Lahijan Tea
          </span>
        </a>

        {/* Zone 2: 4 Navigation Links matching reference */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-persian-pixel text-[#bbdcbe]">
          <a
            href="#hero"
            onClick={() => sfx.playClick()}
            className="relative py-1 hover:text-[#64d883] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#54a86b]"
          >
            {isFa ? 'خانه' : 'Home'}
          </a>
          <a
            href="#products"
            onClick={() => sfx.playClick()}
            className="relative py-1 hover:text-[#64d883] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#54a86b]"
          >
            {isFa ? 'محصولات' : 'Products'}
          </a>
          <a
            href="#brew-bar"
            onClick={() => sfx.playClick()}
            className="relative py-1 hover:text-[#64d883] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#54a86b]"
          >
            {isFa ? 'دم‌آوری چای' : 'Brew Bar'}
          </a>
          <a
            href="#about"
            onClick={() => sfx.playClick()}
            className="relative py-1 hover:text-[#64d883] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#54a86b]"
          >
            {isFa ? 'درباره ما' : 'About Us'}
          </a>
          <a
            href="#contact"
            onClick={() => sfx.playClick()}
            className="relative py-1 hover:text-[#64d883] transition-colors whitespace-nowrap shrink-0 border-b-2 border-transparent hover:border-[#54a86b]"
          >
            {isFa ? 'تماس با ما' : 'Contact Us'}
          </a>
        </nav>

        {/* Zone 3: Actions (Search, Sound, Lang, Cart Button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Sound Toggle (8-bit Synthesizer) */}
          <button
            onClick={() => {
              onToggleSound();
              sfx.playClick();
            }}
            title={soundEnabled ? 'Mute 8-bit Sound' : 'Enable 8-bit Sound'}
            aria-label="Toggle Sound"
            className="p-1.5 bg-[#122e20] text-[#a1d6a6] hover:text-[#c4f8ca] border-2 border-[#2b5e3e] active:translate-y-0.5 transition-all"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-[#8a9f8f]" />}
          </button>

          {/* Language Switch */}
          <button
            onClick={() => {
              onToggleLang();
              sfx.playClick();
            }}
            title={isFa ? 'Switch to English' : 'تغییر به زبان فارسی'}
            aria-label="Language Toggle"
            className="px-2 py-1 bg-[#122e20] text-xs font-pixel-sub text-[#a1d6a6] hover:text-[#c4f8ca] border-2 border-[#2b5e3e] active:translate-y-0.5 transition-all flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-[#5ebd79]" />
            <span>{isFa ? 'EN' : 'فا'}</span>
          </button>

          {/* Search Button */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenSearch();
            }}
            title={isFa ? 'جستجوی چای' : 'Search Tea'}
            aria-label="Search"
            className="p-1.5 bg-[#122e20] text-[#a1d6a6] hover:text-[#c4f8ca] border-2 border-[#2b5e3e] active:translate-y-0.5 transition-all"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Cart Button with Pixel Count Badge */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenCart();
            }}
            aria-label="Shopping Cart"
            className="relative p-1.5 bg-[#1b432e] text-[#bdf5c4] hover:bg-[#255d3f] border-2 border-[#489961] shadow-[2px_2px_0_#05110a] active:translate-y-0.5 transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="font-pixel-title text-[10px] bg-[#d97706] text-black font-bold px-1.5 py-0.2 border border-[#78350f]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => {
              sfx.playClick();
              onOpenMobileMenu();
            }}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-1.5 bg-[#122e20] text-[#a1d6a6] border-2 border-[#2b5e3e]"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
