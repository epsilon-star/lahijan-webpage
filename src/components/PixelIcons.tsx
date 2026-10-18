import React from 'react';

// Pixel Art Tea Sprout Logo (Matches header logo in reference)
export const PixelLeafLogo: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 16 16" className={className} style={{ imageRendering: 'pixelated' }} fill="currentColor">
    {/* Central Stem */}
    <rect x="7" y="11" width="2" height="4" fill="#3d8b4c" />
    <rect x="7" y="8" width="2" height="3" fill="#58b46a" />
    
    {/* Left Leaf */}
    <rect x="5" y="8" width="2" height="2" fill="#58b46a" />
    <rect x="3" y="6" width="3" height="3" fill="#71cb84" />
    <rect x="2" y="4" width="3" height="3" fill="#8ced9f" />
    <rect x="3" y="3" width="2" height="1" fill="#a4f8b4" />
    <rect x="4" y="2" width="2" height="1" fill="#71cb84" />
    <rect x="5" y="4" width="2" height="3" fill="#58b46a" />

    {/* Right Leaf */}
    <rect x="9" y="8" width="2" height="2" fill="#58b46a" />
    <rect x="10" y="6" width="3" height="3" fill="#71cb84" />
    <rect x="11" y="4" width="3" height="3" fill="#8ced9f" />
    <rect x="11" y="3" width="2" height="1" fill="#a4f8b4" />
    <rect x="10" y="2" width="2" height="1" fill="#71cb84" />
    <rect x="9" y="4" width="2" height="3" fill="#58b46a" />

    {/* Center Top Bud */}
    <rect x="7" y="3" width="2" height="4" fill="#9df5b1" />
    <rect x="7" y="1" width="2" height="2" fill="#c3ffd1" />
  </svg>
);

// 1. "100% Natural" Feature Icon
export const PixelNaturalIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ imageRendering: 'pixelated' }}>
    <rect x="10" y="16" width="4" height="6" fill="#3b7d4c" />
    <rect x="10" y="12" width="4" height="4" fill="#54a86b" />
    {/* Big Leaf */}
    <rect x="6" y="8" width="5" height="4" fill="#74cb8c" />
    <rect x="4" y="5" width="5" height="4" fill="#95e6ab" />
    <rect x="6" y="3" width="4" height="2" fill="#b9f8cb" />
    <rect x="11" y="4" width="4" height="4" fill="#74cb8c" />
    {/* Small Leaf right */}
    <rect x="14" y="9" width="4" height="4" fill="#74cb8c" />
    <rect x="17" y="7" width="3" height="3" fill="#95e6ab" />
    <rect x="15" y="6" width="3" height="2" fill="#b9f8cb" />
    {/* Vein Highlights */}
    <rect x="6" y="7" width="2" height="1" fill="#d9ffe2" />
    <rect x="9" y="5" width="2" height="1" fill="#d9ffe2" />
  </svg>
);

// 2. "Lahijan Authenticity" Mountain & Terraces Icon
export const PixelMountainIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Snowy Peak Center */}
    <rect x="10" y="4" width="4" height="3" fill="#eef7ff" />
    <rect x="8" y="7" width="8" height="3" fill="#d0e5f5" />
    <rect x="9" y="10" width="6" height="2" fill="#729cb9" />
    
    {/* Mountain Body */}
    <rect x="6" y="10" width="3" height="3" fill="#356d49" />
    <rect x="15" y="10" width="3" height="3" fill="#2d5e3e" />
    
    {/* Terraced Tea Fields Below */}
    <rect x="4" y="13" width="16" height="3" fill="#4ea568" />
    <rect x="2" y="16" width="20" height="3" fill="#3a8a53" />
    <rect x="1" y="19" width="22" height="4" fill="#246339" />
    
    {/* Terrace Highlight Lines */}
    <rect x="5" y="13" width="6" height="1" fill="#80e09e" />
    <rect x="14" y="13" width="4" height="1" fill="#80e09e" />
    <rect x="3" y="16" width="8" height="1" fill="#69c786" />
    <rect x="13" y="16" width="7" height="1" fill="#69c786" />
  </svg>
);

// 3. "Unrivaled Taste" Teapot with Steam Icon
export const PixelTeapotIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Rising Steam */}
    <rect x="10" y="1" width="2" height="2" fill="#b9f8cb" opacity="0.8" />
    <rect x="12" y="2" width="2" height="2" fill="#b9f8cb" opacity="0.6" />
    
    {/* Lid Knob */}
    <rect x="11" y="4" width="2" height="2" fill="#a4e47a" />
    {/* Lid */}
    <rect x="9" y="6" width="6" height="2" fill="#58b46a" />
    <rect x="8" y="7" width="8" height="1" fill="#71cb84" />
    
    {/* Main Pot Body */}
    <rect x="7" y="8" width="10" height="2" fill="#4ea568" />
    <rect x="6" y="10" width="12" height="7" fill="#3a8a53" />
    <rect x="7" y="17" width="10" height="2" fill="#2d6e42" />
    <rect x="8" y="19" width="8" height="2" fill="#1c482b" />
    
    {/* Handle on Left */}
    <rect x="3" y="9" width="3" height="2" fill="#3a8a53" />
    <rect x="2" y="11" width="2" height="4" fill="#3a8a53" />
    <rect x="4" y="15" width="2" height="2" fill="#3a8a53" />
    
    {/* Spout on Right */}
    <rect x="18" y="13" width="2" height="3" fill="#3a8a53" />
    <rect x="20" y="10" width="2" height="3" fill="#4ea568" />
    <rect x="21" y="9" width="2" height="2" fill="#71cb84" />
    
    {/* Ceramic Ornament Badge on Pot */}
    <rect x="10" y="12" width="4" height="3" fill="#8ced9f" />
    <rect x="11" y="13" width="2" height="1" fill="#ffffff" />
  </svg>
);

// 4. "Fast & Reliable Delivery" Shield Icon
export const PixelShieldIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg viewBox="0 0 24 24" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Outer Shield Outline */}
    <rect x="4" y="4" width="16" height="2" fill="#58b46a" />
    <rect x="3" y="6" width="18" height="7" fill="#3a8a53" />
    <rect x="4" y="13" width="16" height="4" fill="#2d6e42" />
    <rect x="6" y="17" width="12" height="3" fill="#1c482b" />
    <rect x="8" y="20" width="8" height="2" fill="#1c482b" />
    <rect x="10" y="22" width="4" height="1" fill="#1c482b" />
    
    {/* Inner Shield Lighter Green */}
    <rect x="6" y="6" width="12" height="6" fill="#4ea568" />
    <rect x="7" y="12" width="10" height="4" fill="#3a8a53" />
    
    {/* Pixel Checkmark in Gold / Mint */}
    <rect x="8" y="11" width="2" height="2" fill="#fef08a" />
    <rect x="10" y="13" width="2" height="2" fill="#fef08a" />
    <rect x="12" y="11" width="2" height="2" fill="#fef08a" />
    <rect x="14" y="9" width="2" height="2" fill="#fef08a" />
    <rect x="16" y="7" width="2" height="2" fill="#fef08a" />
  </svg>
);

// Pixel Art Iran Map with Lahijan Pin (Gilan province by the Caspian Sea)
export const PixelIranMap: React.FC<{ 
  onPinClick?: () => void;
  className?: string;
}> = ({ onPinClick, className = 'w-64 h-56' }) => (
  <div className={`relative inline-block ${className}`} style={{ imageRendering: 'pixelated' }}>
    <svg viewBox="0 0 100 90" className="w-full h-full">
      {/* Background Sea Waters (Caspian Sea top, Persian Gulf bottom) */}
      {/* Caspian Sea shoreline wavelets */}
      <rect x="32" y="6" width="4" height="2" fill="#3b82f6" opacity="0.4" />
      <rect x="42" y="8" width="6" height="2" fill="#3b82f6" opacity="0.4" />
      
      {/* Persian Gulf waves */}
      <rect x="25" y="78" width="8" height="2" fill="#0284c7" opacity="0.4" />
      <rect x="45" y="82" width="10" height="2" fill="#0284c7" opacity="0.4" />
      <rect x="70" y="84" width="8" height="2" fill="#0284c7" opacity="0.4" />

      {/* Iran Landmass Pixel Matrix (Green shades matching the image) */}
      {/* North-West (Azerbaijan / Ardebil) */}
      <rect x="12" y="14" width="10" height="12" fill="#448858" />
      <rect x="8" y="18" width="8" height="10" fill="#3b7a4e" />
      <rect x="16" y="24" width="10" height="14" fill="#4e9964" />
      
      {/* Gilan & Lahijan (Caspian coast) */}
      <rect x="26" y="20" width="14" height="10" fill="#2d6e43" />
      <rect x="28" y="16" width="10" height="6" fill="#3b8c55" />
      
      {/* Mazandaran & Golestan */}
      <rect x="38" y="18" width="20" height="8" fill="#448858" />
      <rect x="56" y="16" width="10" height="10" fill="#4e9964" />
      
      {/* Central Plateau (Tehran, Isfahan, Yazd, Fars) */}
      <rect x="28" y="28" width="26" height="20" fill="#52a16a" />
      <rect x="34" y="46" width="24" height="20" fill="#48915e" />
      <rect x="22" y="36" width="14" height="22" fill="#3b7a4e" />
      <rect x="26" y="56" width="18" height="18" fill="#346f46" />
      
      {/* North-East (Khorasan) */}
      <rect x="64" y="18" width="22" height="24" fill="#52a16a" />
      <rect x="70" y="40" width="18" height="18" fill="#448858" />
      
      {/* South-East (Kerman, Sistan & Baluchestan, Hormozgan) */}
      <rect x="56" y="52" width="28" height="18" fill="#4e9964" />
      <rect x="62" y="68" width="24" height="14" fill="#3b7a4e" />
      <rect x="42" y="66" width="22" height="14" fill="#346f46" />

      {/* Persian Pixel Clouds hovering in the sky */}
      <g className="animate-pixel-bob">
        <rect x="68" y="6" width="12" height="3" fill="#cbd5e1" opacity="0.8" />
        <rect x="70" y="4" width="8" height="3" fill="#f1f5f9" />
        <rect x="74" y="2" width="4" height="2" fill="#ffffff" />
      </g>
      <g style={{ animation: 'pixel-bob 3s steps(4) infinite 1s' }}>
        <rect x="80" y="11" width="10" height="3" fill="#cbd5e1" opacity="0.8" />
        <rect x="82" y="9" width="6" height="2" fill="#f1f5f9" />
      </g>

      {/* Floating Pixel Cloud near Caspian */}
      <g style={{ animation: 'pixel-bob 2.8s steps(4) infinite 0.5s' }}>
        <rect x="8" y="6" width="10" height="2" fill="#94a3b8" opacity="0.7" />
        <rect x="10" y="4" width="6" height="2" fill="#e2e8f0" />
      </g>

      {/* LAHIJAN PIN (At Gilan, x=34, y=22) */}
      {/* Red Pixel Pin */}
      <g className="cursor-pointer" onClick={onPinClick}>
        <rect x="33" y="14" width="6" height="6" fill="#ef4444" />
        <rect x="34" y="15" width="4" height="4" fill="#f87171" />
        <rect x="35" y="16" width="2" height="2" fill="#ffffff" />
        <rect x="35" y="20" width="2" height="4" fill="#dc2626" />
        <rect x="35" y="24" width="2" height="1" fill="#991b1b" />
      </g>
    </svg>

    {/* Lahijan Label Overlay */}
    <div 
      onClick={onPinClick}
      className="absolute top-[28%] left-[26%] bg-[#081b12]/90 border border-[#54a86b] px-2 py-0.5 text-xs text-[#a7f3d0] font-persian-pixel shadow-[2px_2px_0px_#000] cursor-pointer hover:bg-[#143d2a] transition-colors"
    >
      لاهیجان 🌿
    </div>
  </div>
);

// Pixel Art Dried Black Tea Leaves Pile (Matches "چای سیاه" card)
export const PixelTeaLeavesBlack: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Base shadow */}
    <ellipse cx="16" cy="22" rx="13" ry="5" fill="#17120a" opacity="0.7" />
    
    {/* Dark Twisted Orthodox Black Leaves Heap */}
    <rect x="8" y="18" width="16" height="6" fill="#1e1812" />
    <rect x="6" y="20" width="20" height="4" fill="#292017" />
    <rect x="10" y="14" width="12" height="6" fill="#2d2218" />
    <rect x="12" y="11" width="8" height="4" fill="#3a2c1f" />
    <rect x="14" y="9" width="4" height="3" fill="#443425" />
    
    {/* Curled leaf tips & golden tip highlights (سرگل) */}
    <rect x="9" y="19" width="3" height="1" fill="#785938" />
    <rect x="14" y="17" width="2" height="1" fill="#936d44" />
    <rect x="17" y="19" width="3" height="1" fill="#b08352" />
    <rect x="11" y="14" width="2" height="1" fill="#936d44" />
    <rect x="19" y="15" width="2" height="1" fill="#785938" />
    <rect x="15" y="12" width="2" height="1" fill="#d49b60" />
    <rect x="7" y="21" width="2" height="1" fill="#140f0b" />
    <rect x="22" y="21" width="2" height="1" fill="#140f0b" />
    <rect x="13" y="22" width="4" height="1" fill="#0f0c08" />
  </svg>
);

// Pixel Art Dried Green Tea Leaves Pile with Sprouts (Matches "چای سبز" card)
export const PixelTeaLeavesGreen: React.FC<{ className?: string }> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 32 32" className={className} style={{ imageRendering: 'pixelated' }}>
    {/* Base shadow */}
    <ellipse cx="16" cy="22" rx="13" ry="5" fill="#1a2e1d" opacity="0.6" />
    
    {/* Green dried leaf pile */}
    <rect x="8" y="18" width="16" height="6" fill="#1f4426" />
    <rect x="6" y="20" width="20" height="4" fill="#2a5a32" />
    <rect x="10" y="14" width="12" height="6" fill="#35713f" />
    <rect x="12" y="12" width="8" height="4" fill="#438c4e" />
    
    {/* Fresh Two Leaves and a Bud sprouting from center */}
    <rect x="15" y="7" width="2" height="6" fill="#69c77c" />
    {/* Left sprout */}
    <rect x="12" y="7" width="3" height="2" fill="#88e09a" />
    <rect x="11" y="6" width="3" height="2" fill="#acf2bc" />
    <rect x="13" y="5" width="2" height="1" fill="#d3ffd9" />
    {/* Right sprout */}
    <rect x="17" y="7" width="3" height="2" fill="#88e09a" />
    <rect x="18" y="6" width="3" height="2" fill="#acf2bc" />
    <rect x="17" y="5" width="2" height="1" fill="#d3ffd9" />
    {/* Center bud tip */}
    <rect x="15" y="4" width="2" height="3" fill="#d3ffd9" />

    {/* Flecks and texture */}
    <rect x="8" y="19" width="3" height="1" fill="#58a666" />
    <rect x="19" y="18" width="3" height="1" fill="#58a666" />
    <rect x="13" y="17" width="2" height="1" fill="#75cb84" />
    <rect x="22" y="21" width="2" height="1" fill="#16311b" />
  </svg>
);
