import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { PHOTO_STYLE_OPTIONS } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Camera } from 'lucide-react';

interface PhotoStyleSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const PHOTO_STYLE_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၂၀ မျိုး)', labelEn: 'All Photo Styles (20)' },
  { id: 'studio_fashion', labelMm: '🖼️ စတူဒီယိုနှင့် ဖက်ရှင် (၅ မျိုး)', labelEn: 'Studio & Fashion' },
  { id: 'cinematic_documentary', labelMm: '🎬 စီနီမာနှင့် မှတ်တမ်းတင် (၄ မျိုး)', labelEn: 'Cinematic & Documentary' },
  { id: 'vintage_analog', labelMm: '🎞️ ဖလင်နှင့် ဗင်းတေ့ချ် (၄ မျိုး)', labelEn: 'Analog Film & Retro' },
  { id: 'ethereal_vibrant', labelMm: '🌅 အိပ်မက်ဆန်နှင့် အနုပညာ (၇ မျိုး)', labelEn: 'Dreamy & Artistic' },
];

export const PhotoStyleSelectionCarousel: React.FC<PhotoStyleSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentStyleId = selection.photoStyle || 'default_style';
  const currentStyleObj = PHOTO_STYLE_OPTIONS.find((s) => s.id === currentStyleId) || PHOTO_STYLE_OPTIONS[1];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['photorealistic_studio', 'fashion_editorial', 'fine_art_portrait', 'high_fashion_glamour', 'commercial_advertising'].includes(id)) {
      return 'studio_fashion';
    }
    if (['cinematic', 'documentary_style', 'street_photography', 'low_key_dramatic_noir'].includes(id)) {
      return 'cinematic_documentary';
    }
    if (['film_photography_look', 'monochrome_black_white', 'vintage_retro_70s', 'polaroid_instant'].includes(id)) {
      return 'vintage_analog';
    }
    return 'ethereal_vibrant'; // soft_dreamy, cyberpunk_neon, golden_hour_sunset, high_key_minimalist, surreal_artistic, hdr_vibrant_detail, soft_pastel_aesthetic
  };

  // Filter options
  const filteredOptions = PHOTO_STYLE_OPTIONS.filter((s) => {
    if (s.id === 'skip') return false; // Shown in header skip button
    if (selectedCategory === 'all') return true;
    return getCategory(s.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-cyan-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-cyan-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
          <Camera className="h-4 w-4 text-cyan-400" />
          <span>
            {isMyanmar
              ? `ဓာတ်ပုံ စတိုင် (Photo Style - ၂၀ မျိုး)`
              : `Select Photo Style (20 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ photoStyle: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ (Auto)' : 'Skip / Auto'}
          </button>

          <span className="text-[11px] text-cyan-200 font-bold bg-cyan-950/90 px-2.5 py-1 rounded-lg border border-cyan-700/80 shadow max-w-[200px] truncate">
            {currentStyleObj.emoji || '📸'}{' '}
            {isMyanmar ? currentStyleObj.labelMm : currentStyleObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-cyan-600/40">
        {PHOTO_STYLE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (ဓာတ်ပုံစတိုင်များ ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-cyan-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              {isMyanmar
                ? `ဓာတ်ပုံ စတိုင်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Photo Style Options (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-cyan-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left / Right Scroll Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredOptions.map((sty) => {
            const isSelected = currentStyleId === sty.id;
            return (
              <button
                key={sty.id}
                type="button"
                onClick={() => onUpdateSelection({ photoStyle: sty.id })}
                className={`snap-start shrink-0 min-w-[200px] max-w-[250px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/90 border-cyan-400 text-cyan-100 font-bold shadow-[0_0_15px_rgba(6,182,212,0.3)] ring-1 ring-cyan-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-cyan-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {sty.emoji || '📸'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-cyan-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {isMyanmar ? sty.labelMm : sty.labelEn}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fast Dropdown Menu Access */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ တိုက်ရိုက် ရွေးချယ်ရန်:' : 'Or Fast Select via Dropdown Menu:'}
          </span>
        </div>
        <div className="relative">
          <select
            value={currentStyleId}
            onChange={(e) => onUpdateSelection({ photoStyle: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-cyan-500/40 hover:border-cyan-400 px-3 py-2 text-xs font-semibold text-cyan-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {PHOTO_STYLE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = PHOTO_STYLE_OPTIONS.filter((sty) => getCategory(sty.id) === cat.id && sty.id !== 'skip');
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-cyan-400 font-bold"
                >
                  {catOptions.map((sty) => (
                    <option
                      key={sty.id}
                      value={sty.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {sty.emoji || '📸'} {isMyanmar ? sty.labelMm : sty.labelEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

    </div>
  );
};
