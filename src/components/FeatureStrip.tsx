import React from 'react';
import { Language } from '../types';
import {
  PixelNaturalIcon,
  PixelMountainIcon,
  PixelTeapotIcon,
  PixelShieldIcon,
} from './PixelIcons';
import { sfx } from '../utils/audio';

interface FeatureStripProps {
  lang: Language;
}

export const FeatureStrip: React.FC<FeatureStripProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const features = [
    {
      id: 'natural',
      icon: <PixelNaturalIcon className="w-10 h-10 sm:w-12 sm:h-12" />,
      titleFa: '۱۰۰٪ طبیعی',
      titleEn: '100% Natural',
      descFa: 'بدون مواد افزودنی، فقط برگ‌های خالص چای',
      descEn: 'Zero artificial flavorings or dyes, pure handpicked leaves',
    },
    {
      id: 'origin',
      icon: <PixelMountainIcon className="w-10 h-10 sm:w-12 sm:h-12" />,
      titleFa: 'اصالت لاهیجان',
      titleEn: 'Lahijan Origin',
      descFa: 'مستقیم از باغ‌های سرسبز شمال ایران',
      descEn: 'Direct from terraced mountainsides of Gilan, Iran',
    },
    {
      id: 'taste',
      icon: <PixelTeapotIcon className="w-10 h-10 sm:w-12 sm:h-12" />,
      titleFa: 'طعم بی‌نظیر',
      titleEn: 'Unrivaled Taste',
      descFa: 'عطر و طعم اصیل چای ایرانی',
      descEn: 'Authentic ruby clarity and soothing herbal fragrance',
    },
    {
      id: 'delivery',
      icon: <PixelShieldIcon className="w-10 h-10 sm:w-12 sm:h-12" />,
      titleFa: 'ارسال سریع و مطمئن',
      titleEn: 'Fast & Secure Delivery',
      descFa: 'به سراسر کشور در بسته‌بندی نفوذناپذیر',
      descEn: 'Nationwide & worldwide dispatch in airtight aroma-lock tins',
    },
  ];

  return (
    <section className="w-full bg-[#071710] border-b-2 border-[#163825] py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y sm:divide-y-0 lg:divide-x lg:divide-x-reverse divide-[#1a3d2b]">
          {features.map((feat) => (
            <div
              key={feat.id}
              onClick={() => sfx.playClick()}
              className="flex flex-col items-center text-center p-4 rounded-none hover:bg-[#0c2419] transition-colors group cursor-default"
            >
              {/* Pixel Art Icon Container */}
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-150">
                {feat.icon}
              </div>

              {/* Title */}
              <h3 className="font-persian-pixel text-lg sm:text-xl text-[#ffffff] mb-2 group-hover:text-[#86efac] transition-colors">
                {isFa ? feat.titleFa : feat.titleEn}
              </h3>

              {/* Description */}
              <p className="font-persian-text text-xs sm:text-sm text-[#9ec1a8] max-w-xs leading-relaxed">
                {isFa ? feat.descFa : feat.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
