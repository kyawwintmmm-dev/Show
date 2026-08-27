import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { CAMERA_ANGLE_OPTIONS } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Sliders } from 'lucide-react';

interface CameraAngleSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const CAMERA_ANGLE_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၁၅ မျိုး)', labelEn: 'All Angles (15)' },
  { id: 'elevation_perspective', labelMm: '📐 ကင်မရာဒေါင့်နှင့် အမြင် (၅ မျိုး)', labelEn: 'Elevation & Perspective' },
  { id: 'portrait_framing', labelMm: '🔍 အနီးကပ်နှင့် ပေါ်ထရိတ် ရိုက်ချက် (၅ မျိုး)', labelEn: 'Portrait & Close-up' },
  { id: 'distance_body', labelMm: '🧍 အကွာအဝေးနှင့် တစ်ကိုယ်လုံး (၅ မျိုး)', labelEn: 'Distance & Body Length' },
];

export const CameraAngleSelectionCarousel: React.FC<CameraAngleSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentAngleId = selection.cameraAngle || 'eye_level';
  const currentAngleObj = CAMERA_ANGLE_OPTIONS.find((a) => a.id === currentAngleId) || CAMERA_ANGLE_OPTIONS[1];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['eye_level', 'low_angle', 'high_angle', 'dutch_angle', 'birds_eye_view'].includes(id)) {
      return 'elevation_perspective';
    }
    if (['close_up', 'extreme_close_up', 'macro_detail_framing', 'profile_side_view', 'three_quarter_portrait'].includes(id)) {
      return 'portrait_framing';
    }
    return 'distance_body'; // medium_shot, cowboy_shot, full_body, wide_angle_environmental, over_the_shoulder
  };

  // Filter options
  const filteredOptions = CAMERA_ANGLE_OPTIONS.filter((a) => {
    if (a.id === 'skip') return false; // Shown in header skip button
    if (selectedCategory === 'all') return true;
    return getCategory(a.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-purple-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-purple-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider">
          <Sliders className="h-4 w-4 text-purple-400" />
          <span>
            {isMyanmar
              ? `ရိုက်ချက် / ကင်မရာဒေါင့် (Camera Angle & Framing - ၁၅ မျိုး)`
              : `Select Camera Angle & Framing (15 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ cameraAngle: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ (Auto)' : 'Skip / Auto'}
          </button>

          <span className="text-[11px] text-purple-200 font-bold bg-purple-950/90 px-2.5 py-1 rounded-lg border border-purple-700/80 shadow max-w-[200px] truncate">
            {currentAngleObj.emoji || '📐'}{' '}
            {isMyanmar ? currentAngleObj.labelMm : currentAngleObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-purple-600/40">
        {CAMERA_ANGLE_CATEGORIES.map((cat) => (
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

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (ကင်မရာဒေါင့်များ ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-purple-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>
              {isMyanmar
                ? `ကင်မရာဒေါင့်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Camera Angle Options (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-purple-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left / Right Scroll Controls */}
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
          {filteredOptions.map((ang) => {
            const isSelected = currentAngleId === ang.id;
            return (
              <button
                key={ang.id}
                type="button"
                onClick={() => onUpdateSelection({ cameraAngle: ang.id })}
                className={`snap-start shrink-0 min-w-[200px] max-w-[250px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-purple-950/90 border-purple-400 text-purple-100 font-bold shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-purple-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {ang.emoji || '📐'}
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
                    {isMyanmar ? ang.labelMm : ang.labelEn}
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
            value={currentAngleId}
            onChange={(e) => onUpdateSelection({ cameraAngle: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-purple-500/40 hover:border-purple-400 px-3 py-2 text-xs font-semibold text-purple-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {CAMERA_ANGLE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = CAMERA_ANGLE_OPTIONS.filter((ang) => getCategory(ang.id) === cat.id && ang.id !== 'skip');
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-purple-400 font-bold"
                >
                  {catOptions.map((ang) => (
                    <option
                      key={ang.id}
                      value={ang.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {ang.emoji || '📐'} {isMyanmar ? ang.labelMm : ang.labelEn}
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
