import React from 'react';
import { Language } from '../types';
import { PixelLeafLogo } from './PixelIcons';
import { sfx } from '../utils/audio';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  return (
    <footer id="contact" className="w-full bg-[#05110c] text-[#bbdcbe] border-t-4 border-[#163825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Info matching reference bottom left */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-right">
            <div className="p-1.5 bg-[#0a1e15] border-2 border-[#1c482f]">
              <PixelLeafLogo className="w-6 h-6 text-[#58b46a]" />
            </div>
            <div>
              <span className="font-pixel-sub text-base font-bold text-[#ffffff] block">
                Lahijan Tea
              </span>
              <p className="font-persian-text text-xs text-[#82a58b] mt-0.5">
                {isFa
                  ? 'چای لاهیجان، انتخابی برای لحظه‌های خوب'
                  : 'Lahijan Tea, chosen for life\'s cherished moments.'}
              </p>
            </div>
          </div>

          {/* Social Icons & Copyright matching reference bottom right */}
          <div className="flex flex-col items-center sm:items-end gap-3 text-center sm:text-left">
            {/* 8-bit Pixel Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  sfx.playClick();
                }}
                title="Instagram"
                className="w-8 h-8 bg-[#0d261a] border border-[#235839] flex items-center justify-center text-xs hover:border-[#4ade80] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" style={{ imageRendering: 'pixelated' }}>
                  <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="18" y="5" width="2" height="2" fill="currentColor" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="#telegram"
                onClick={(e) => {
                  e.preventDefault();
                  sfx.playClick();
                }}
                title="Telegram"
                className="w-8 h-8 bg-[#0d261a] border border-[#235839] flex items-center justify-center text-xs hover:border-[#4ade80] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" style={{ imageRendering: 'pixelated' }}>
                  <polygon points="3,11 20,4 16,21 11,16 7,17" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="20" y1="4" x2="11" y2="16" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>

              {/* Video / YouTube */}
              <a
                href="#video"
                onClick={(e) => {
                  e.preventDefault();
                  sfx.playClick();
                }}
                title="Aparat / Video"
                className="w-8 h-8 bg-[#0d261a] border border-[#235839] flex items-center justify-center text-xs hover:border-[#4ade80] hover:text-white transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" style={{ imageRendering: 'pixelated' }}>
                  <rect x="2" y="4" width="20" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="2" />
                  <polygon points="10,8 16,12 10,16" fill="currentColor" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <span className="font-pixel-sub text-[11px] text-[#6b8974]">
              © 2025 Lahijan Tea. All rights reserved.
            </span>
          </div>

        </div>
      </div>

      {/* Decorative Bottom Pixel Ribbon Banner */}
      <div className="w-full h-3 pixel-ribbon border-t border-[#123020]" />
    </footer>
  );
};
