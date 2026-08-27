import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { RETOUCH_OPTIONS } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Sliders } from 'lucide-react';

interface SkinRetouchSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const SKIN_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (All Skin Styles)', labelEn: 'All Skin Styles' },
  { id: 'beauty_glow', labelMm: '👑 High-End Beauty & Glow', labelEn: '👑 High-End Beauty & Glow' },
  { id: 'natural_raw', labelMm: '🌿 သဘာဝ မွေးညှင်းပေါက် / RAW', labelEn: '🌿 Natural & RAW Texture' },
  { id: 'special_style', labelMm: '✨ ဖက်ရှင် / သနပ်ခါး / ဖလင် စတိုင်', labelEn: '✨ Special & Fashion Styles' },
];

export const SkinRetouchSelectionCarousel: React.FC<SkinRetouchSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentRetouchId = selection.retouching || 'natural';
  const currentRetouchObj = RETOUCH_OPTIONS.find((r) => r.id === currentRetouchId) || RETOUCH_OPTIONS[1];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['high_end_beauty_retouch', 'dreamy_soft_look', 'vietnamese_aesthetic_look', 'romantic_ethereal_glow', 'royal_commercial_sculpt', 'hydrating_dewy_glass_skin', 'golden_bronze_glow', 'porcelain_porcelain_fair'].includes(id)) {
      return 'beauty_glow';
    }
    if (['natural', 'flawless_blemish_free', 'raw_unretouched', 'soft_matte', 'warm_olive_radiance'].includes(id)) {
      return 'natural_raw';
    }
    return 'special_style';
  };

  // Filter retouching options
  const filteredOptions = RETOUCH_OPTIONS.filter((r) => {
    if (r.id === 'skip') return false; // Shown in header skip button
    if (selectedCategory === 'all') return true;
    return getCategory(r.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-slate-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-slate-800/80">
        <label className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
          <Sliders className="h-4 w-4 text-purple-400" />
          <span>
            {isMyanmar
              ? `အသားအရေ ပြင်ဆင်မှု / Skin Retouching (${RETOUCH_OPTIONS.length - 1} မျိုး):`
              : `Skin Retouching & Complexion (${RETOUCH_OPTIONS.length - 1} Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ retouching: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ (မူလအတိုင်း)' : 'Skip / Natural'}
          </button>

          <span className="text-[11px] text-purple-200 font-bold bg-purple-950/90 px-2.5 py-1 rounded-lg border border-purple-700/80 shadow">
            {currentRetouchObj.emoji || '✨'}{' '}
            {isMyanmar ? currentRetouchObj.labelMm : currentRetouchObj.labelEn}
          </span>
        </div>
      </div>

      {/* Filter Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-purple-600/40">
        {SKIN_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-purple-950/90 border-purple-400 text-purple-200 font-bold shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (အသားအရေ ပြင်ဆင်မှု ရွေးချယ်ရန် ဘေးတိုက် ဆွဲကြည့်နိုင်သည်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-purple-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>
              {isMyanmar
                ? `အသားအရေ စတိုင်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Skin Retouching Styles (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-purple-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left/Right Scroll Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-purple-500 hover:text-slate-950 text-purple-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-purple-500 hover:text-slate-950 text-purple-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredOptions.map((ret) => {
            const isSelected = currentRetouchId === ret.id;
            return (
              <button
                key={ret.id}
                type="button"
                onClick={() => onUpdateSelection({ retouching: ret.id })}
                className={`snap-start shrink-0 min-w-[200px] max-w-[240px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/90 border-purple-400 text-purple-100 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-purple-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {ret.emoji || '✨'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-purple-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-purple-400 group-hover:text-purple-400 transition-colors">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {isMyanmar ? ret.labelMm : ret.labelEn}
                  </p>
                  {ret.details && (
                    <p className="text-[10px] text-slate-400/90 font-normal mt-1 line-clamp-2">
                      {ret.details}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌟 FAST ACCESS DROPDOWN MENU */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ တိုက်ရိုက် ရွေးချယ်ရန်:' : 'Or Fast Select via Dropdown Menu:'}
          </span>
        </div>
        <div className="relative">
          <select
            value={currentRetouchId}
            onChange={(e) => onUpdateSelection({ retouching: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-400 px-3 py-2 text-xs font-semibold text-purple-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {SKIN_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = RETOUCH_OPTIONS.filter((r) => getCategory(r.id) === cat.id && r.id !== 'skip');
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-purple-400 font-bold"
                >
                  {catOptions.map((ret) => (
                    <option
                      key={ret.id}
                      value={ret.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {ret.emoji || '✨'} {isMyanmar ? ret.labelMm : ret.labelEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-purple-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

    </div>
  );
};
