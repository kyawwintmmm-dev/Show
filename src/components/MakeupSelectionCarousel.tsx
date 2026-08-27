import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { MAKEUP_OPTIONS } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Heart } from 'lucide-react';

interface MakeupSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const MAKEUP_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၁၁ မျိုး)', labelEn: 'All (11 Options)' },
  { id: 'asian_traditional', labelMm: '🇲🇲 မြန်မာ၊ ကိုရီးယားနှင့် အာရှ (၄ မျိုး)', labelEn: 'Asian & Traditional' },
  { id: 'fashion_glam', labelMm: '✨ ဖက်ရှင်၊ ညနေခင်းနှင့် ဗင်းတေ့ချ် (၄ မျိုး)', labelEn: 'Fashion & Glam' },
  { id: 'natural_bare', labelMm: '🌿 သဘာဝ မိတ်ကပ်နှင့် မိတ်ကပ်မပါ (၃ မျိုး)', labelEn: 'Natural & Bare' },
];

export const MakeupSelectionCarousel: React.FC<MakeupSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentMakeupId = selection.makeup || 'skip';
  const currentMakeupObj = MAKEUP_OPTIONS.find((m) => m.id === currentMakeupId) || MAKEUP_OPTIONS[0];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['traditional_myanmar_makeup', 'thanaka_natural_makeup', 'korean_makeup', 'thai_aesthetic_makeup'].includes(id)) {
      return 'asian_traditional';
    }
    if (['editorial_makeup', 'glam_makeup', 'western_makeup', 'retro_vintage_red_lip'].includes(id)) {
      return 'fashion_glam';
    }
    return 'natural_bare';
  };

  // Filter options
  const filteredOptions = MAKEUP_OPTIONS.filter((m) => {
    if (m.id === 'skip') return false; // Shown in header skip button
    if (selectedCategory === 'all') return true;
    return getCategory(m.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-pink-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-pink-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider">
          <Heart className="h-4 w-4 text-pink-400" />
          <span>
            {isMyanmar
              ? `မိတ်ကပ် ရွေးချယ်မှု (Makeup Styles - ၁၁ မျိုး)`
              : `Select Makeup Style (11 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ makeup: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-pink-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ (မူလအတိုင်း)' : 'Skip / Natural'}
          </button>

          <span className="text-[11px] text-pink-200 font-bold bg-pink-950/90 px-2.5 py-1 rounded-lg border border-pink-700/80 shadow">
            {currentMakeupObj.emoji || '💄'}{' '}
            {isMyanmar ? currentMakeupObj.labelMm : currentMakeupObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-pink-600/40">
        {MAKEUP_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-pink-950/90 border-pink-400 text-pink-200 font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (မိတ်ကပ်စတိုင်များ ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-pink-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            <span>
              {isMyanmar
                ? `မိတ်ကပ်စတိုင်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Makeup Options (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-pink-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left / Right Scroll Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-pink-500 hover:text-slate-950 text-pink-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-pink-500 hover:text-slate-950 text-pink-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-pink-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredOptions.map((m) => {
            const isSelected = currentMakeupId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onUpdateSelection({ makeup: m.id })}
                className={`snap-start shrink-0 min-w-[185px] max-w-[230px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-pink-950/90 border-pink-400 text-pink-100 font-bold shadow-[0_0_15px_rgba(236,72,153,0.3)] ring-1 ring-pink-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-pink-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {m.emoji || '💄'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-pink-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-pink-400 group-hover:text-pink-400 transition-colors">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {isMyanmar ? m.labelMm : m.labelEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fast Access Dropdown Menu */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ တိုက်ရိုက် ရွေးချယ်ရန်:' : 'Or Fast Select via Dropdown Menu:'}
          </span>
        </div>
        <div className="relative">
          <select
            value={currentMakeupId}
            onChange={(e) => onUpdateSelection({ makeup: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-pink-500/40 hover:border-pink-400 px-3 py-2 text-xs font-semibold text-pink-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {MAKEUP_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = MAKEUP_OPTIONS.filter((m) => getCategory(m.id) === cat.id && m.id !== 'skip');
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-pink-400 font-bold"
                >
                  {catOptions.map((m) => (
                    <option
                      key={m.id}
                      value={m.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {m.emoji || '💄'} {isMyanmar ? m.labelMm : m.labelEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-pink-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

    </div>
  );
};
