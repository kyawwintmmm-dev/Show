import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { LIGHTING_OPTIONS } from '../data/presetData';
import { Sun, ChevronLeft, ChevronRight, Check, Sparkles, ChevronDown } from 'lucide-react';

interface LightingSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

export const LightingSelectionCarousel: React.FC<LightingSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentLightingId = selection.timeAndLighting || 'golden_hour';
  const currentLightingObj = LIGHTING_OPTIONS.find((l) => l.id === currentLightingId) || LIGHTING_OPTIONS[1];

  const filteredLighting = LIGHTING_OPTIONS.filter((l) => l.id !== 'skip');

  // Horizontal scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-amber-500/30 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-slate-800/80">
        <label className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Sun className="h-4 w-4 text-amber-400" />
          <span>
            {isMyanmar
              ? 'အချိန်နှင့် အလင်းရောင် ရွေးပါ (၃၀ မျိုး)'
              : 'Select Time of Day & Lighting (30 Options):'}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ timeAndLighting: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ' : 'Skip'}
          </button>

          <span className="text-[11px] text-amber-200 font-bold bg-amber-950/90 px-2.5 py-1 rounded-lg border border-amber-700/80 shadow">
            {currentLightingObj.emoji || '☀️'}{' '}
            {isMyanmar ? currentLightingObj.labelMm : currentLightingObj.labelEn}
          </span>
        </div>
      </div>

      {/* 🌟 100% HORIZONTAL SCROLLABLE CAROUSEL (အလင်းရောင် ၃၀ မျိုးလုံး ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {isMyanmar
                ? `အလင်းရောင်စတိုင်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Lighting Styles (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-amber-400/80 font-mono">
              ({filteredLighting.length} Options)
            </span>
          </span>

          {/* Scroll Navigation Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-amber-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredLighting.map((lit) => {
            const isSelected = currentLightingId === lit.id;
            return (
              <button
                key={lit.id}
                type="button"
                onClick={() => onUpdateSelection({ timeAndLighting: lit.id })}
                className={`snap-start shrink-0 min-w-[175px] max-w-[220px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/90 border-amber-400 text-amber-100 font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)] ring-1 ring-amber-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-amber-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {lit.emoji || '☀️'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-amber-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-amber-400 group-hover:text-amber-400 transition-colors">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {isMyanmar ? lit.labelMm : lit.labelEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Fast Access Dropdown Menu */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ ရွေးရန်:' : 'Or Select via Dropdown Menu:'}
          </span>
        </div>
        <div className="relative">
          <select
            value={currentLightingId}
            onChange={(e) => onUpdateSelection({ timeAndLighting: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 px-3 py-2 text-xs font-semibold text-amber-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {LIGHTING_OPTIONS.map((lit) => (
              <option
                key={lit.id}
                value={lit.id}
                className="bg-slate-900 text-slate-100 py-1"
              >
                {lit.emoji || '☀️'} {isMyanmar ? lit.labelMm : lit.labelEn}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

    </div>
  );
};
