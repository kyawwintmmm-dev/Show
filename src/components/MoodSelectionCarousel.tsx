import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { MOOD_OPTIONS } from '../data/presetData';
import { Sparkles, ChevronLeft, ChevronRight, Check, ChevronDown, Smile } from 'lucide-react';

interface MoodSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const MOOD_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၁၅ မျိုး)', labelEn: 'All Moods (15)' },
  { id: 'calm_peaceful', labelMm: '🕊️ အေးချမ်းနှင့် တည်ငြိမ် (၄ မျိုး)', labelEn: 'Calm & Peaceful' },
  { id: 'joyful_romantic', labelMm: '😄 ပျော်ရွှင်နှင့် ရင်ခုန်ဖွယ် (၄ မျိုး)', labelEn: 'Joyful & Romantic' },
  { id: 'powerful_cool', labelMm: '👑 စွမ်းအားနှင့် စတိုင်ကျ (၃ မျိုး)', labelEn: 'Powerful & Cool' },
  { id: 'deep_mysterious', labelMm: '🌑 နက်နဲနှင့် ဆန်းကြယ် (၄ မျိုး)', labelEn: 'Deep & Mysterious' },
];

export const MoodSelectionCarousel: React.FC<MoodSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentMoodId = selection.moodEmotion || 'calm_serene';
  const currentMoodObj = MOOD_OPTIONS.find((m) => m.id === currentMoodId) || MOOD_OPTIONS[1];

  // Helper to categorize options
  const getCategory = (id: string) => {
    if (['calm_serene', 'warm_welcoming', 'peaceful_zen', 'elegant_graceful'].includes(id)) {
      return 'calm_peaceful';
    }
    if (['joyful_cheerful', 'romantic_tender', 'playful_mischievous', 'nostalgic_vintage'].includes(id)) {
      return 'joyful_romantic';
    }
    if (['powerful_confident', 'cool_rebellious', 'passionate_intense'].includes(id)) {
      return 'powerful_cool';
    }
    return 'deep_mysterious'; // dreamy_ethereal, dark_moody, melancholic_thoughtful, mysterious_enigmatic
  };

  // Filter options
  const filteredOptions = MOOD_OPTIONS.filter((m) => {
    if (m.id === 'select_mood' || m.id === 'skip') return false; // Shown in header skip button
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
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-emerald-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-emerald-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
          <Smile className="h-4 w-4 text-emerald-400" />
          <span>
            {isMyanmar
              ? `ခံစားချက်နှင့် Mood (Emotion & Mood - ၁၅ မျိုး)`
              : `Select Mood & Emotion (15 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ moodEmotion: 'skip' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'မရွေးပါ (မူလအတိုင်း)' : 'Skip / Default'}
          </button>

          <span className="text-[11px] text-emerald-200 font-bold bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-700/80 shadow">
            {currentMoodObj.emoji || '🎭'}{' '}
            {isMyanmar ? currentMoodObj.labelMm : currentMoodObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-emerald-600/40">
        {MOOD_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 HORIZONTAL SCROLLABLE CAROUSEL (ခံစားချက်နှင့် Mood ၁၅ မျိုးလုံး ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-emerald-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>
              {isMyanmar
                ? `Mood ခံစားချက်များ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Emotion & Mood Options (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left / Right Scroll Buttons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredOptions.map((m) => {
            const isSelected = currentMoodId === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onUpdateSelection({ moodEmotion: m.id })}
                className={`snap-start shrink-0 min-w-[195px] max-w-[240px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] ring-1 ring-emerald-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-emerald-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {m.emoji || '🎭'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-emerald-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-colors">
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
            value={currentMoodId}
            onChange={(e) => onUpdateSelection({ moodEmotion: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-emerald-500/40 hover:border-emerald-400 px-3 py-2 text-xs font-semibold text-emerald-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {MOOD_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catOptions = MOOD_OPTIONS.filter((m) => getCategory(m.id) === cat.id && m.id !== 'select_mood' && m.id !== 'skip');
              if (catOptions.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-emerald-400 font-bold"
                >
                  {catOptions.map((m) => (
                    <option
                      key={m.id}
                      value={m.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {m.emoji || '🎭'} {isMyanmar ? m.labelMm : m.labelEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

    </div>
  );
};
