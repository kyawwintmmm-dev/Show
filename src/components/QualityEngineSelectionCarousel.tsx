import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { QUALITY_PROFILES } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Cpu } from 'lucide-react';

interface QualityEngineSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const QUALITY_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၁၅ မျိုး)', labelEn: 'All Engines (15)' },
  { id: 'pro_commercial', labelMm: '💎 ဟိုင်းအန်းနှင့် စတူဒီယို (၅ မျိုး)', labelEn: 'Commercial & Studio' },
  { id: 'cinematic_raw', labelMm: '🎬 စီနီမာနှင့် သဘာဝ ရုပ်ထွက် (၄ မျိုး)', labelEn: 'Cinematic & Natural' },
  { id: '3d_fx_artistic', labelMm: '⚡ ၃ဒီ၊ ဆိုင်ဘာပန့်ခ်နှင့် အနုပညာ (၆ မျိုး)', labelEn: '3D, FX & Artistic' },
];

export const QualityEngineSelectionCarousel: React.FC<QualityEngineSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentQpId = selection.qualityProfile || 'high_end_commercial';
  const currentQpObj = QUALITY_PROFILES.find((q) => q.id === currentQpId) || QUALITY_PROFILES[0];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['high_end_commercial', '8k_uhd', 'hasselblad_medium_format', 'vogue_magazine_cover', 'fashion_runway_studio'].includes(id)) {
      return 'pro_commercial';
    }
    if (['cinematic_imax', 'film_realism', 'national_geographic', 'black_white_dramatic'].includes(id)) {
      return 'cinematic_raw';
    }
    return '3d_fx_artistic'; // studio_unreal_engine, hyper_photorealistic_macro, soft_dreamy_bokeh, fine_art_oil_canvas, cyberpunk_neon_sci_fi, golden_hour_sunset
  };

  // Filter options
  const filteredOptions = QUALITY_PROFILES.filter((q) => {
    if (selectedCategory === 'all') return true;
    return getCategory(q.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-indigo-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-indigo-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
          <Cpu className="h-4 w-4 text-indigo-400" />
          <span>
            {isMyanmar
              ? `Quality Engine (အရည်အသွေး ဆက်တင် - ၁၅ မျိုး)`
              : `Select Quality Engine Profile (15 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-indigo-200 font-bold bg-indigo-950/90 px-2.5 py-1 rounded-lg border border-indigo-700/80 shadow max-w-[220px] truncate">
            {currentQpObj.emoji || '⚡'}{' '}
            {isMyanmar ? (currentQpObj.labelMm || currentQpObj.label) : (currentQpObj.labelEn || currentQpObj.label)}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-indigo-600/40">
        {QUALITY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-indigo-950/90 border-indigo-400 text-indigo-200 font-bold shadow-[0_0_12px_rgba(99,102,241,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (Quality Engines ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-indigo-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            <span>
              {isMyanmar
                ? `Quality Engine စတိုင်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Quality Engine Options (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-indigo-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left / Right Scroll Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-indigo-500 hover:text-slate-950 text-indigo-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-indigo-500 hover:text-slate-950 text-indigo-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-indigo-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredOptions.map((qp) => {
            const isSelected = currentQpId === qp.id;
            return (
              <button
                key={qp.id}
                type="button"
                onClick={() => onUpdateSelection({ qualityProfile: qp.id })}
                className={`snap-start shrink-0 min-w-[210px] max-w-[260px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-950/90 border-indigo-400 text-indigo-100 font-bold shadow-[0_0_15px_rgba(99,102,241,0.3)] ring-1 ring-indigo-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-indigo-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {qp.emoji || '⚡'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-indigo-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-indigo-400 group-hover:text-indigo-400 transition-colors">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {isMyanmar ? (qp.labelMm || qp.label) : (qp.labelEn || qp.label)}
                  </p>
                  {qp.engine && (
                    <p className="text-[9px] text-indigo-300/80 font-mono mt-1 line-clamp-1">
                      ⚙️ {qp.engine}
                    </p>
                  )}
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
            value={currentQpId}
            onChange={(e) => onUpdateSelection({ qualityProfile: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-indigo-500/40 hover:border-indigo-400 px-3 py-2 text-xs font-semibold text-indigo-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {QUALITY_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = QUALITY_PROFILES.filter((qp) => getCategory(qp.id) === cat.id);
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-indigo-400 font-bold"
                >
                  {catOptions.map((qp) => (
                    <option
                      key={qp.id}
                      value={qp.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {qp.emoji || '⚡'} {isMyanmar ? (qp.labelMm || qp.label) : (qp.labelEn || qp.label)}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Quality Profile Detail Callout */}
      {currentQpObj && (
        <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-1.5 text-xs text-indigo-200">
          <div className="flex items-center justify-between font-bold text-indigo-300">
            <span className="flex items-center gap-1.5">
              <span>{currentQpObj.emoji || '⚡'}</span>
              <span>{isMyanmar ? 'Engine မော်ဒယ်:' : 'Engine Model:'} <strong className="text-indigo-200">{currentQpObj.engine}</strong></span>
            </span>
          </div>
          <p className="text-[11px] text-indigo-300/90 leading-relaxed font-sans">
            ✨ <strong>{isMyanmar ? 'ရုပ်ထွက် အသေးစိတ် စွမ်းဆောင်ရည်:' : 'Render Details:'}</strong> {currentQpObj.detailLevel}
          </p>
        </div>
      )}

    </div>
  );
};
