import React from 'react';
import { Language } from '../types';
import { sfx } from '../utils/audio';
import { X, Sparkles, BookOpen } from 'lucide-react';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const isFa = lang === 'fa';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4">
      <div 
        className="w-full max-w-2xl bg-[#0c2419] border-4 border-[#255e3e] shadow-[8px_8px_0_#030a07] p-6 text-right dir-rtl relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            sfx.playClick();
            onClose();
          }}
          aria-label="Close story"
          className="absolute top-4 left-4 p-1.5 bg-[#123323] text-[#a7f3d0] hover:text-white border border-[#2d6e46]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-[#1c482f]">
          <BookOpen className="w-5 h-5 text-[#4ade80]" />
          <h2 className="font-persian-pixel text-2xl text-[#ffffff]">
            {isFa ? 'داستان چای لاهیجان؛ از هندوستان تا گیلان' : 'The Story of Lahijan Tea'}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 font-persian-text text-sm sm:text-base text-[#c7e2cd] leading-relaxed">
          <p>
            {isFa
              ? 'در سال ۱۲۷۹ هجری خورشیدی (۱۹۰۰ میلادی)، شاهزاده محمد میرزا ملقب به «کاشف‌السلطنه» با سختی بسیار چند هزار بوته چای و مقداری بذر را در چمدان‌های خود از هند به ایران آورد و در تپه‌های خوش آب‌وهوای لاهیجان کاشت.'
              : 'In 1900 AD, Prince Mohammad Mirza (known as Kashef Al-Saltaneh), Iran\'s consul in India, introduced tea cultivation to Iran. After carefully studying tea agrarian techniques, he brought thousands of tea saplings to Lahijan in northern Iran.'}
          </p>

          <div className="bg-[#081811] p-4 border-2 border-[#1d4a31] my-3">
            <span className="font-persian-pixel text-sm text-[#86efac] block mb-1">
              {isFa ? 'اقلیم بی‌همتای لاهیجان' : 'The Unique Lahijan Microclimate'}
            </span>
            <p className="text-xs sm:text-sm text-[#a8d5b4]">
              {isFa
                ? 'رطوبت معتدل دریای خزر، مه‌های بامدادی و شیب‌های کوهپایه‌ای دامنه‌های شمالی البرز، خاکی بسیار غنی و بدون نیاز به آفت‌کش‌های شیمیایی ایجاد کرده است. به همین دلیل چای لاهیجان یکی از پاک‌ترین و سالم‌ترین چای‌های جهان به شمار می‌رود.'
                : 'Nestled between the humid Caspian Sea and steep Alborz mountain slopes, Lahijan enjoys heavy morning mists and acidic soils where tea bushes thrive organically without chemical pesticides.'}
            </p>
          </div>

          <p>
            {isFa
              ? 'چای اصل ایرانی برخلاف چای‌های صنعتی زوددم، رنگ مصنوعی ندارد و نیازمند ۱۵ تا ۲۰ دقیقه دم‌آوری آرام بر روی سماور یا کتری با حرارت غیرمستقیم است تا عصاره یاقوتی و عطر گس آن در فضای خانه طنین‌انداز شود.'
              : 'Unlike fast-brewing mass market CTC tea with artificial colorings, orthodox Iranian black tea takes 15 to 20 minutes to slowly release its natural ruby clarity, brisk aroma, and sweet vegetative finish.'}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-[#1e4832] flex justify-end">
          <button
            onClick={() => {
              sfx.playClick();
              onClose();
            }}
            className="pixel-btn-primary px-5 py-2 text-sm"
          >
            {isFa ? 'متوجه شدم' : 'Understood'}
          </button>
        </div>

      </div>
    </div>
  );
};
