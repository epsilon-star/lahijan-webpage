import React, { useState, useEffect } from 'react';
import { lofiEngine, TRACK_LIST, TrackInfo } from '../utils/lofiMusic';
import { Language } from '../types';
import { sfx } from '../utils/audio';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Radio,
  ChevronUp,
  ChevronDown,
  CloudRain,
  Disc,
} from 'lucide-react';

interface PixelMusicPlayerProps {
  lang: Language;
}

export const PixelMusicPlayer: React.FC<PixelMusicPlayerProps> = ({ lang }) => {
  const isFa = lang === 'fa';

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [crackleOn, setCrackleOn] = useState(true);
  const [bars, setBars] = useState([2, 4, 3, 5, 2, 6, 4, 3]);

  // Subscribe to engine state
  useEffect(() => {
    const unsubscribe = lofiEngine.subscribe((playing, trackIdx) => {
      setIsPlaying(playing);
      setCurrentTrackIdx(trackIdx);
    });

    // Equalizer animation timer
    const eqInterval = setInterval(() => {
      if (lofiEngine.getIsPlaying()) {
        setBars(lofiEngine.getVisualizerData());
      } else {
        setBars([1, 1, 1, 1, 1, 1, 1, 1]);
      }
    }, 140);

    return () => {
      unsubscribe();
      clearInterval(eqInterval);
    };
  }, []);

  const currentTrack: TrackInfo = TRACK_LIST[currentTrackIdx] || TRACK_LIST[0];

  const handleTogglePlay = () => {
    sfx.playClick();
    lofiEngine.toggle();
  };

  const handleNext = () => {
    sfx.playClick();
    lofiEngine.nextTrack();
  };

  const handlePrev = () => {
    sfx.playClick();
    lofiEngine.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    lofiEngine.setVolume(val);
  };

  const handleToggleCrackle = () => {
    sfx.playClick();
    const nextState = lofiEngine.toggleCrackle();
    setCrackleOn(nextState);
  };

  return (
    <div
      className={`fixed bottom-4 z-40 transition-all duration-150 select-none ${
        isFa ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
      }`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* 1. EXPANDED CASSETTE DECK / PLAYER MODAL */}
      {isExpanded && (
        <div className="mb-2 w-80 sm:w-96 bg-[#0b1f16] border-4 border-[#245b3a] shadow-[6px_6px_0px_#030a06] p-4 text-right dir-rtl relative">
          {/* Header bar */}
          <div className="flex items-center justify-between pb-2 border-b-2 border-[#1c482f] mb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-[#4ade80] animate-pulse" />
              <span className="font-pixel-sub text-xs text-[#86efac] font-bold tracking-tight">
                {isFa ? 'رادیو لو-فای لاهیجان' : 'Lahijan Lo-Fi Radio'}
              </span>
            </div>

            <button
              onClick={() => {
                sfx.playClick();
                setIsExpanded(false);
              }}
              title={isFa ? 'کوچک‌کردن' : 'Minimize'}
              className="p-1 bg-[#133523] text-[#a7f3d0] hover:text-white border border-[#2b6a44] active:translate-y-0.5"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Pixel Cassette Tape Artwork */}
          <div className="bg-[#122e20] border-3 border-[#2a6842] p-3 mb-3 relative overflow-hidden shadow-[inset_2px_2px_0_#06140d]">
            {/* Cassette Shell Screws */}
            <div className="flex justify-between items-center text-[8px] text-[#4d7f5d] font-mono px-1 mb-1">
              <span>●</span>
              <span className="font-pixel-sub text-[9px] text-[#fef08a] bg-[#0c2419] px-2 py-0.5 border border-[#1f5033]">
                TYPE I · PERSIA LO-FI
              </span>
              <span>●</span>
            </div>

            {/* Cassette Center Window with Dual Rotating Spools */}
            <div className="bg-[#081710] border-2 border-[#1f4a31] p-2 flex items-center justify-between gap-2 my-1">
              {/* Left Spool */}
              <div
                className={`w-10 h-10 rounded-full border-2 border-[#489961] bg-[#102d1d] flex items-center justify-center relative ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              >
                <div className="w-4 h-4 bg-[#081811] border border-[#2a663f] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#4ade80]" />
                </div>
                {/* 3 Spool Spokes */}
                <div className="absolute w-8 h-0.5 bg-[#255737] rotate-0" />
                <div className="absolute w-8 h-0.5 bg-[#255737] rotate-60" />
                <div className="absolute w-8 h-0.5 bg-[#255737] rotate-120" />
              </div>

              {/* Tape Center Ribbon Display */}
              <div className="flex-1 text-center px-1">
                <span className="font-persian-pixel text-sm text-[#fef08a] block truncate">
                  {isFa ? currentTrack.titleFa : currentTrack.titleEn}
                </span>
                <span className="font-persian-text text-[11px] text-[#86efac] block truncate">
                  {isFa ? currentTrack.moodFa : currentTrack.moodEn}
                </span>
              </div>

              {/* Right Spool */}
              <div
                className={`w-10 h-10 rounded-full border-2 border-[#489961] bg-[#102d1d] flex items-center justify-center relative ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '3s' }}
              >
                <div className="w-4 h-4 bg-[#081811] border border-[#2a663f] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#4ade80]" />
                </div>
                {/* 3 Spool Spokes */}
                <div className="absolute w-8 h-0.5 bg-[#255737] rotate-0" />
                <div className="absolute w-8 h-0.5 bg-[#255737] rotate-60" />
                <div className="absolute w-8 h-0.5 bg-[#255737] rotate-120" />
              </div>
            </div>

            {/* Stepped Pixel Visualizer Equalizer Bar */}
            <div className="flex items-end justify-center gap-1.5 h-7 pt-1 px-4 bg-[#06120c] border border-[#1b432c]">
              {bars.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end h-full">
                  <div
                    className="w-full bg-gradient-to-t from-[#166534] via-[#22c55e] to-[#86efac] transition-all duration-100"
                    style={{ height: `${(height / 6) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Track Selector List */}
          <div className="space-y-1.5 mb-3 max-h-28 overflow-y-auto pr-1">
            {TRACK_LIST.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => {
                  sfx.playClick();
                  lofiEngine.selectTrack(idx);
                }}
                className={`w-full text-right p-1.5 text-xs font-persian-pixel flex items-center justify-between border transition-all ${
                  currentTrackIdx === idx
                    ? 'bg-[#1b4e33] text-[#fef08a] border-[#4ade80]'
                    : 'bg-[#091a13] text-[#9fc7ab] border-[#183927] hover:border-[#2f6645]'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="font-pixel-sub text-[10px] text-[#4ade80]">0{idx + 1}.</span>
                  <span className="truncate">{isFa ? t.titleFa : t.titleEn}</span>
                </div>
                {currentTrackIdx === idx && isPlaying && (
                  <span className="text-[10px] text-[#4ade80] font-pixel-sub">PLAYING</span>
                )}
              </button>
            ))}
          </div>

          {/* Controls Strip (Prev, Play/Pause, Next, Rain toggle) */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t-2 border-[#1c482f]">
            {/* Playback buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                title={isFa ? 'ترانه قبلی' : 'Previous Track'}
                className="p-2 bg-[#122e20] text-[#a7f3d0] hover:text-white border border-[#2b6843] active:translate-y-0.5"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handleTogglePlay}
                title={isPlaying ? (isFa ? 'توقف' : 'Pause') : (isFa ? 'پخش' : 'Play')}
                className="pixel-btn-primary px-3 py-1.5 text-xs flex items-center gap-1.5"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span className="font-persian-pixel text-xs">{isPlaying ? (isFa ? 'توقف' : 'Pause') : (isFa ? 'پخش' : 'Play')}</span>
              </button>

              <button
                onClick={handleNext}
                title={isFa ? 'ترانه بعدی' : 'Next Track'}
                className="p-2 bg-[#122e20] text-[#a7f3d0] hover:text-white border border-[#2b6843] active:translate-y-0.5"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Vinyl Rain / Crackle Toggle */}
            <button
              onClick={handleToggleCrackle}
              title={isFa ? 'صدای باران و خش گرامافون' : 'Vinyl Crackle & Rain'}
              className={`p-2 border transition-colors flex items-center gap-1 text-xs font-persian-pixel ${
                crackleOn
                  ? 'bg-[#194b31] text-[#86efac] border-[#4ade80]'
                  : 'bg-[#091a13] text-[#6b8974] border-[#1d432e]'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px]">{isFa ? 'باران' : 'Rain'}</span>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-[#163a26]">
            {volume === 0 ? (
              <VolumeX className="w-4 h-4 text-[#ef4444]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#86efac]" />
            )}
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#4ade80] h-1.5 bg-[#081811] rounded-none cursor-pointer"
            />
            <span className="font-pixel-sub text-[10px] text-[#86efac] w-7 text-left">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* 2. PERSISTENT FLOATING TOGGLE BUTTON (Always visible at bottom) */}
      <div className="flex items-center gap-1.5 bg-[#0b1f16] border-3 border-[#245b3a] shadow-[4px_4px_0px_#030a06] p-1.5">
        
        {/* Play/Pause Button */}
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? 'Pause Lo-Fi Music' : 'Play Lo-Fi Music'}
          className="p-2 bg-[#1b4830] text-[#bbf7d0] hover:bg-[#256140] border-2 border-[#489961] shadow-[2px_2px_0_#05110a] active:translate-y-0.5 transition-all flex items-center justify-center"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 fill-current text-[#4ade80]" />
          )}
        </button>

        {/* Track Title Info & Dancing Equalizer (Clicking opens/collapses expanded view) */}
        <button
          onClick={() => {
            sfx.playClick();
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-2.5 px-2 py-1 bg-[#081710] border border-[#1f4e34] hover:bg-[#102b1d] transition-colors text-right dir-rtl max-w-[210px] sm:max-w-[260px]"
        >
          {/* Animated 8-bit Vinyl Disc or Note Icon */}
          <div className="relative w-5 h-5 flex items-center justify-center shrink-0">
            <Disc
              className={`w-4 h-4 text-[#4ade80] ${isPlaying ? 'animate-spin' : ''}`}
              style={{ animationDuration: '3s' }}
            />
          </div>

          {/* Title and mood */}
          <div className="flex flex-col truncate">
            <span className="font-persian-pixel text-xs text-[#ffffff] truncate">
              {isFa ? currentTrack.titleFa : currentTrack.titleEn}
            </span>
            <span className="font-pixel-sub text-[9px] text-[#86efac] truncate">
              {isPlaying
                ? isFa
                  ? 'در حال پخش لو-فای'
                  : 'LO-FI PLAYING'
                : isFa
                ? 'موسیقی سنتی لو-فای'
                : 'LO-FI MUSIC'}
            </span>
          </div>

          {/* Mini 4-bar equalizer */}
          <div className="flex items-end gap-0.5 h-3.5 shrink-0 px-1">
            {bars.slice(0, 4).map((h, i) => (
              <div
                key={i}
                className="w-1 bg-[#4ade80] transition-all duration-100"
                style={{ height: `${(h / 6) * 100}%` }}
              />
            ))}
          </div>

          {/* Chevron */}
          <div className="text-[#86efac] shrink-0">
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </div>
        </button>

      </div>
    </div>
  );
};
