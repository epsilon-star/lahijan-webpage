import React from 'react';
import { Language } from '../types';
import { PixelLeafLogo } from './PixelIcons';
import { sfx } from '../utils/audio';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isFa = lang === 'fa';

  const navLinks = [
    { href: '#hero', labelFa: 'خانه', labelEn: 'Home' },
    { href: '#products', labelFa: 'محصولات', labelEn: 'Products' },
    { href: '#brew-bar', labelFa: 'دم‌آوری مجازی', labelEn: 'Virtual Brew Bar' },
    { href: '#about', labelFa: 'درباره ما', labelEn: 'About Us' },
    { href: '#contact', labelFa: 'تماس با ما', labelEn: 'Contact Us' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-start bg-black/80 backdrop-blur-xs">
      <div 
        className="w-4/5 max-w-xs bg-[#091b13] border-r-4 border-[#245b3a] h-full p-6 text-right dir-rtl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#1c482f] mb-6">
            <div className="flex items-center gap-2">
              <PixelLeafLogo className="w-5 h-5 text-[#58b46a]" />
              <span className="font-pixel-sub text-sm font-bold text-white">Lahijan Tea</span>
            </div>
            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="p-1 bg-[#122e20] text-[#a7f3d0] border border-[#275a3a]"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  sfx.playClick();
                  onClose();
                }}
                className="font-persian-pixel text-lg text-[#bbdcbe] hover:text-[#4ade80] py-2 border-b border-[#153423] transition-colors"
              >
                {isFa ? link.labelFa : link.labelEn}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#173826] text-xs font-pixel-sub text-[#5f7d69]">
          16-BIT PIXEL ART EDITION
        </div>
      </div>
    </div>
  );
};
