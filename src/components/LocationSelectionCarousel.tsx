import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { LOCATION_OPTIONS } from '../data/presetData';
import { MapPin, ChevronLeft, ChevronRight, Check, Sparkles, ChevronDown } from 'lucide-react';

interface LocationSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const LOCATION_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၃၆ မျိုး)', labelEn: 'All (36 Locations)' },
  { id: 'myanmar', labelMm: '🇲🇲 မြန်မာ့ ထင်ရှားသော နေရာများ (၁၅ မျိုး)', labelEn: 'Myanmar Iconic Locations (15)' },
  { id: 'world', labelMm: '🌐 ကမ္ဘာ့ ထိပ်တန်း ဓာတ်ပုံ နေရာများ (၁၀ မျိုး)', labelEn: 'World Iconic Locations (10)' },
  { id: 'indoor_studio', labelMm: '📸 စတူဒီယို / အခန်းတွင်း (၅ မျိုး)', labelEn: 'Studio & Indoor (5)' },
  { id: 'nature_lifestyle', labelMm: '🌿 သဘာဝနှင့် မြို့ပြ အခင်းအကျင်း (၆ မျိုး)', labelEn: 'Nature & Lifestyle (6)' },
];

export const LocationSelectionCarousel: React.FC<LocationSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentLocationId = selection.location || 'skip';
  const currentLocationObj = LOCATION_OPTIONS.find((l) => l.id === currentLocationId) || LOCATION_OPTIONS[0];

  // Filter locations by category
  const filteredLocations = LOCATION_OPTIONS.filter((l) => {
    if (l.id === 'skip') return false; // Show skip button in header
    return selectedCategory === 'all' || l.category === selectedCategory;
  });

  // Horizontal scroll handler
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
          <MapPin className="h-4 w-4 text-purple-400" />
          <span>
            {isMyanmar
              ? 'Location & Background (၃၆ မျိုး)'
              : 'Select Location & Background (36 Options):'}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ location: 'skip', customLocationDetails: '' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ' : 'Skip'}
          </button>

          <span className="text-[11px] text-purple-200 font-bold bg-purple-950/90 px-2.5 py-1 rounded-lg border border-purple-700/80 shadow">
            {currentLocationObj.emoji || '📍'}{' '}
            {isMyanmar ? currentLocationObj.labelMm : currentLocationObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-purple-600/40">
        {LOCATION_CATEGORIES.map((cat) => (
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

      {/* 🌟 100% HORIZONTAL SCROLLABLE CAROUSEL (တည်နေရာ ၃၆ မျိုးလုံး ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-purple-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>
              {isMyanmar
                ? `တည်နေရာများ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Locations & Backdrops (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-purple-400/80 font-mono">
              ({filteredLocations.length} Options)
            </span>
          </span>

          {/* Scroll Navigation Buttons */}
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

        {/* Horizontal Scroll Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredLocations.map((loc) => {
            const isSelected = currentLocationId === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => onUpdateSelection({ location: loc.id })}
                className={`snap-start shrink-0 min-w-[175px] max-w-[220px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/90 border-purple-400 text-purple-100 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-purple-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {loc.emoji || '📍'}
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
                    {isMyanmar ? loc.labelMm : loc.labelEn}
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
            value={currentLocationId}
            onChange={(e) => onUpdateSelection({ location: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-400 px-3 py-2 text-xs font-semibold text-purple-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {LOCATION_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catLocations = LOCATION_OPTIONS.filter((l) => l.category === cat.id && l.id !== 'skip');
              if (catLocations.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-purple-400 font-bold"
                >
                  {catLocations.map((loc) => (
                    <option
                      key={loc.id}
                      value={loc.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {loc.emoji || '📍'} {isMyanmar ? loc.labelMm : loc.labelEn}
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

      {/* Custom Location Details Text Input */}
      <div>
        <input
          type="text"
          placeholder={
            isMyanmar
              ? 'အခြား တည်နေရာ / နောက်ခံ အသေးစိတ် ရေးပါ (ဥပမာ- ရန်ကုန်မြစ်ကမ်း အနီး)...'
              : 'Specific location details (e.g. Near Yangon riverbank sunset)...'
          }
          value={selection.customLocationDetails || ''}
          onChange={(e) => onUpdateSelection({ customLocationDetails: e.target.value })}
          className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-all"
        />
      </div>

    </div>
  );
};
