import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { sfx } from '../utils/audio';
import { Flame, Play, RotateCcw, Check, Sparkles } from 'lucide-react';

interface BrewingSimulatorProps {
  lang: Language;
}

export const BrewingSimulator: React.FC<BrewingSimulatorProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const [selectedTea, setSelectedTea] = useState<'black' | 'green' | 'ghalam'>('black');
  const [condiment, setCondiment] = useState<'none' | 'nabat' | 'cardamom' | 'rose'>('nabat');
  const [brewing, setBrewing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [sips, setSips] = useState(0);

  // Steeping timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (brewing && progress < 100) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) {
            setBrewing(false);
            setIsReady(true);
            sfx.playReady();
            return 100;
          }
          return prev + 2;
        });
      }, 70);
    }
    return () => clearInterval(timer);
  }, [brewing, progress]);

  const handleStartBrew = () => {
    setProgress(0);
    setIsReady(false);
    setBrewing(true);
    setSips(0);
    sfx.playPour();
  };

  const handleReset = () => {
    setBrewing(false);
    setProgress(0);
    setIsReady(false);
    setSips(0);
    sfx.playClick();
  };

  const handleDrinkSip = () => {
    if (!isReady) return;
    sfx.playClick();
    setSips((prev) => prev + 1);
  };

  // Color of brewed tea inside the glass
  const getTeaColor = () => {
    if (selectedTea === 'green') {
      return progress > 50 ? '#65a30d' : '#84cc16';
    }
    if (selectedTea === 'ghalam') {
      return progress > 60 ? '#b45309' : '#d97706';
    }
    // Black tea ruby amber
    return progress > 70 ? '#7f1d1d' : progress > 35 ? '#991b1b' : '#b45309';
  };

  return (
    <section id="brew-bar" className="w-full bg-[#081710] py-14 sm:py-20 border-b-2 border-[#163825]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-2 text-xs font-pixel-sub text-[#86efac]">
            <Flame className="w-4 h-4 text-[#ef4444]" />
            <span>{isFa ? 'ایستگاه مجازی دم‌آوری چای' : 'Virtual Pixel Tea Bar'}</span>
          </div>
          <h2 className="font-persian-pixel text-3xl sm:text-4xl text-[#ffffff] tracking-wide mb-3">
            {isFa ? 'چای را به شیوه گیلانی دم کنید' : 'Brew Like a Gilan Local'}
          </h2>
          <p className="font-persian-text text-sm text-[#9ec1a8] max-w-xl mx-auto">
            {isFa
              ? 'چای لاهیجان برای آزاد کردن عطر ناب خود به دم‌آوری آرام بر روی بخار سماور نیاز دارد. امتحان کنید!'
              : 'True Lahijan tea needs patient steam infusion over a simmering samovar. Select your blend and condiments!'}
          </p>
        </div>

        {/* Brewing Console Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#0d271c] border-4 border-[#1e4832] p-6 sm:p-8 shadow-[8px_8px_0_#030a07]">
          
          {/* Left / Controls Panel (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right dir-rtl">
            
            {/* Step 1: Choose Tea Type */}
            <div>
              <span className="font-persian-pixel text-sm text-[#86efac] block mb-2">
                {isFa ? '۱. نوع چای را انتخاب کنید:' : '1. Choose Tea Type:'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'black', labelFa: 'سیاه سرگل', labelEn: 'Black Sargol' },
                  { id: 'green', labelFa: 'سبز بهاره', labelEn: 'Spring Green' },
                  { id: 'ghalam', labelFa: 'قلم سنتی', labelEn: 'Ghalam Stem' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTea(t.id as 'black' | 'green' | 'ghalam');
                      sfx.playClick();
                    }}
                    className={`p-2.5 text-xs sm:text-sm font-persian-pixel border-2 transition-all ${
                      selectedTea === t.id
                        ? 'bg-[#1b4e33] text-[#cbf5cd] border-[#55b277] shadow-[2px_2px_0_#000]'
                        : 'bg-[#091a13] text-[#869b8d] border-[#183727] hover:border-[#2f6645]'
                    }`}
                  >
                    {isFa ? t.labelFa : t.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Condiment */}
            <div>
              <span className="font-persian-pixel text-sm text-[#86efac] block mb-2">
                {isFa ? '۲. چاشنی سنتی:' : '2. Traditional Condiment:'}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'nabat', labelFa: 'نبات زعفرانی', labelEn: 'Saffron Candy' },
                  { id: 'cardamom', labelFa: 'دانه هل', labelEn: 'Cardamom' },
                  { id: 'rose', labelFa: 'غنچه گل‌محمدی', labelEn: 'Rose Petals' },
                  { id: 'none', labelFa: 'ساده و خالص', labelEn: 'Pure / Naked' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setCondiment(c.id as 'none' | 'nabat' | 'cardamom' | 'rose');
                      sfx.playClick();
                    }}
                    className={`p-2 text-xs font-persian-pixel border-2 transition-all ${
                      condiment === c.id
                        ? 'bg-[#1b4e33] text-[#cbf5cd] border-[#55b277] shadow-[2px_2px_0_#000]'
                        : 'bg-[#091a13] text-[#869b8d] border-[#183727] hover:border-[#2f6645]'
                    }`}
                  >
                    {isFa ? c.labelFa : c.labelEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Steeping Progress Bar */}
            <div className="bg-[#081710] p-4 border-2 border-[#1c472f]">
              <div className="flex justify-between items-center text-xs font-pixel-sub text-[#86efac] mb-2">
                <span>{brewing ? (isFa ? 'در حال دم‌آوری آرام...' : 'Slowly steeping...') : isReady ? (isFa ? 'چای دم کشید!' : 'Tea is ready!') : (isFa ? 'آماده دم‌آوری' : 'Ready to brew')}</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-4 bg-[#050e0a] border border-[#2b5e3e] p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-[#166534] via-[#22c55e] to-[#4ade80] transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Brew Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                disabled={brewing}
                onClick={handleStartBrew}
                className={`flex-1 pixel-btn-primary py-3 px-4 text-base flex items-center justify-center gap-2 ${
                  brewing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{brewing ? (isFa ? 'صبر کنید...' : 'Steeping...') : (isFa ? 'شروع دم‌آوری چای' : 'Start Steeping')}</span>
              </button>

              <button
                onClick={handleReset}
                className="pixel-btn-outline p-3 text-[#a7f3d0]"
                title={isFa ? 'شروع دوباره' : 'Reset'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right / Visual Pixel Tea Glass (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-[#091b13] border-3 border-[#1e4832] relative overflow-hidden min-h-[320px]">
            
            {/* Animated Pixel Steam */}
            {(brewing || isReady) && (
              <div className="absolute top-8 flex gap-2 pointer-events-none z-20">
                <span className="w-2 h-6 bg-[#fef08a] opacity-80 animate-pixel-steam" />
                <span className="w-2 h-8 bg-[#fef08a] opacity-90 animate-pixel-steam delay-100" />
                <span className="w-2 h-5 bg-[#fef08a] opacity-70 animate-pixel-steam delay-200" />
              </div>
            )}

            {/* The Persian Glass (Estekan Kamar-Barik) in Pixel Art SVG */}
            <div className="relative w-36 h-48 flex items-center justify-center">
              <svg viewBox="0 0 40 60" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
                {/* Saucer (نعلبکی) */}
                <ellipse cx="20" cy="54" rx="18" ry="4" fill="#cbd5e1" />
                <ellipse cx="20" cy="54" rx="16" ry="3" fill="#ffffff" />
                <ellipse cx="20" cy="54" rx="14" ry="2" fill="#94a3b8" />
                {/* Traditional blue ornament dots on saucer */}
                <rect x="7" y="53" width="2" height="1" fill="#1d4ed8" />
                <rect x="12" y="54" width="2" height="1" fill="#1d4ed8" />
                <rect x="26" y="54" width="2" height="1" fill="#1d4ed8" />
                <rect x="31" y="53" width="2" height="1" fill="#1d4ed8" />

                {/* Estekan Glass Outline (Curved waist / کمر باریک) */}
                {/* Top rim */}
                <rect x="10" y="8" width="20" height="2" fill="#e2e8f0" opacity="0.9" />
                
                {/* Glass walls (flaring at top and bottom, slim in center) */}
                <polygon points="10,10 11,26 13,32 11,46 12,52 28,52 29,46 27,32 29,26 30,10" fill="#f8fafc" opacity="0.15" />
                <polygon points="10,10 11,26 13,32 11,46 12,52 28,52 29,46 27,32 29,26 30,10" stroke="#94a3b8" strokeWidth="1" fill="none" opacity="0.6" />

                {/* Tea Liquid Fill Level */}
                {progress > 5 && (
                  <path
                    d={`M 12,${50 - (progress / 100) * 36} 
                       Q 20,${49 - (progress / 100) * 36} 28,${50 - (progress / 100) * 36} 
                       L 28,50 
                       L 12,50 Z`}
                    fill={getTeaColor()}
                    opacity="0.88"
                  />
                )}

                {/* Glass Reflection Highlight */}
                <path d="M 12,12 L 13,26 L 14,32 L 13,46" stroke="#ffffff" strokeWidth="1" opacity="0.7" fill="none" />

                {/* Saffron Rock Candy Stick (نبات زعفرانی) if selected */}
                {condiment === 'nabat' && (
                  <g>
                    <line x1="26" y1="6" x2="16" y2="44" stroke="#fef08a" strokeWidth="2.5" />
                    <rect x="18" y="30" width="4" height="6" fill="#fde047" />
                    <rect x="21" y="24" width="3" height="4" fill="#eab308" />
                  </g>
                )}

                {/* Rose petal floating if selected */}
                {condiment === 'rose' && progress > 20 && (
                  <rect x="18" y="22" width="4" height="2" fill="#f43f5e" />
                )}

                {/* Cardamom pod if selected */}
                {condiment === 'cardamom' && progress > 20 && (
                  <rect x="22" y="28" width="3" height="4" fill="#4d7c0f" />
                )}
              </svg>
            </div>

            {/* Drinking interaction */}
            {isReady && (
              <div className="mt-4 text-center z-20">
                <button
                  onClick={handleDrinkSip}
                  className="pixel-btn-primary px-4 py-1.5 text-sm flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fde047]" />
                  <span>{isFa ? `نوشیدن جرعه (${sips})` : `Take a Sip (${sips})`}</span>
                </button>
                <p className="font-persian-text text-xs text-[#a7f3d0] mt-2">
                  {isFa ? 'نوش جان! عطر هل و چای اصیل لاهیجان' : 'Enjoy! Pure, comforting Lahijan tea.'}
                </p>
              </div>
            )}

            {!isReady && !brewing && (
              <span className="font-pixel-sub text-[11px] text-[#558b68] mt-3">
                {isFa ? 'دکمه شروع را بزنید' : 'Press start to steep'}
              </span>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
