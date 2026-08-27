import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { COLOR_GRADE_OPTIONS } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Palette } from 'lucide-react';

interface FilmColorSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const FILM_COLOR_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၁၉ မျိုး)', labelEn: 'All (19 Options)' },
  { id: 'kodak', labelMm: '🎞️ ကိုဒက် ဖလင်တိုနင် (Kodak Film)', labelEn: 'Kodak Film Tones' },
  { id: 'fuji', labelMm: '🌸 ဖူဂျီ ဖလင်တိုနင် (Fujifilm Tones)', labelEn: 'Fuji Film Tones' },
  { id: 'cinema_bw', labelMm: '🎬 စီနီမာနှင့် အနက်ဖြူ (Cinema & B&W)', labelEn: 'Cinema & B&W' },
  { id: 'vintage_creative', labelMm: '🎨 ဗင်းတေ့ချ်နှင့် အနုပညာ (Vintage & Creative)', labelEn: 'Vintage & Creative' },
];

export const FilmColorSelectionCarousel: React.FC<FilmColorSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentColorGradeId = selection.colorGrade || 'skip';
  const currentColorGradeObj = COLOR_GRADE_OPTIONS.find((cg) => cg.id === currentColorGradeId) || COLOR_GRADE_OPTIONS[0];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['kodak_portra_400', 'kodak_gold_200', 'kodak_ultramax_400'].includes(id)) {
      return 'kodak';
    }
    if (['fuji_pro_400h', 'fuji_eterna_cool', 'fuji_velvia_50', 'fuji_superia_400'].includes(id)) {
      return 'fuji';
    }
    if (['cinestill_800t', 'ilford_hp5_plus', 'kodak_tri_x_400', 'teal_orange', 'cinematic_bleach_bypass'].includes(id)) {
      return 'cinema_bw';
    }
    return 'vintage_creative';
  };

  // Filter options
  const filteredOptions = COLOR_GRADE_OPTIONS.filter((cg) => {
    if (cg.id === 'skip') return false; // Shown in header skip button
    if (selectedCategory === 'all') return true;
    return getCategory(cg.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-amber-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-amber-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Palette className="h-4 w-4 text-amber-400" />
          <span>
            {isMyanmar
              ? `ဖလင် အရောင် တိုနင် (Film Color Grading - ၁၉ မျိုး)`
              : `Select Film Color Grading (19 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ colorGrade: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ (မူလအတိုင်း)' : 'Skip / Default'}
          </button>

          <span className="text-[11px] text-amber-200 font-bold bg-amber-950/90 px-2.5 py-1 rounded-lg border border-amber-700/80 shadow">
            {currentColorGradeObj.emoji || '🎨'}{' '}
            {isMyanmar ? currentColorGradeObj.labelMm : currentColorGradeObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-600/40">
        {FILM_COLOR_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-amber-950/90 border-amber-400 text-amber-200 font-bold shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (ဖလင်အရောင် ၁၉ မျိုးလုံး ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span>
              {isMyanmar
                ? `ဖလင်အရောင်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Film Color Profiles (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-amber-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Scroll Buttons */}
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
          {filteredOptions.map((cg) => {
            const isSelected = currentColorGradeId === cg.id;
            return (
              <button
                key={cg.id}
                type="button"
                onClick={() => onUpdateSelection({ colorGrade: cg.id })}
                className={`snap-start shrink-0 min-w-[185px] max-w-[230px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-amber-950/90 border-amber-400 text-amber-100 font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] ring-1 ring-amber-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-amber-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {cg.emoji || '🎨'}
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
                    {isMyanmar ? cg.labelMm : cg.labelEn}
                  </p>
                  {cg.filmStock && (
                    <p className="text-[9px] text-amber-300/80 font-mono mt-1 line-clamp-1">
                      {cg.filmStock}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fast Dropdown Menu */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span className="font-semibold text-slate-300">
            {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ တိုက်ရိုက် ရွေးချယ်ရန်:' : 'Or Fast Select via Dropdown Menu:'}
          </span>
        </div>
        <div className="relative">
          <select
            value={currentColorGradeId}
            onChange={(e) => onUpdateSelection({ colorGrade: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 px-3 py-2 text-xs font-semibold text-amber-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {FILM_COLOR_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = COLOR_GRADE_OPTIONS.filter((cg) => getCategory(cg.id) === cat.id && cg.id !== 'skip');
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-amber-400 font-bold"
                >
                  {catOptions.map((cg) => (
                    <option
                      key={cg.id}
                      value={cg.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {cg.emoji || '🎨'} {isMyanmar ? cg.labelMm : cg.labelEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Selected Film Stock Detail Callout */}
      {currentColorGradeId !== 'skip' && (
        <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-between text-xs text-amber-200/90 flex-wrap gap-1">
          <span className="flex items-center gap-1.5">
            <span>🎞️</span>
            <span>{isMyanmar ? 'ဖလင်တိုနင် စတိုင် (Film Stock Profile):' : 'Film Stock Profile:'}</span>
          </span>
          <span className="font-semibold text-amber-300 font-mono text-[11px] bg-slate-900 px-2 py-0.5 rounded border border-amber-800/60">
            {currentColorGradeObj.filmStock}
          </span>
        </div>
      )}

    </div>
  );
};
