import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { POSE_EXPRESSION_OPTIONS } from '../data/presetData';
import { Smile, ChevronLeft, ChevronRight, Check, ChevronDown, Sparkles } from 'lucide-react';

interface PoseSelectionCarouselProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const POSE_CATEGORIES = [
  { id: 'all', labelMm: 'အကုန်လုံး (၂၅ မျိုး)', labelEn: 'All (25 Poses)' },
  { id: 'facial', labelMm: '😊 မျက်နှာ အမူအရာများ (၆ မျိုး)', labelEn: 'Facial Expressions' },
  { id: 'standing_action', labelMm: '🧍 မတ်တပ် / လမ်းလျှောက် / ကခုန် (၆ မျိုး)', labelEn: 'Standing & Action' },
  { id: 'seated_relax', labelMm: '🪑 ထိုင် / လဲလျောင်း / အေးဆေး (၄ မျိုး)', labelEn: 'Seated & Relaxed' },
  { id: 'gestures_props', labelMm: '🙏 လက်ဟန် / ပစ္စည်းကိုင် (၉ မျိုး)', labelEn: 'Gestures & Props' },
];

export const PoseSelectionCarousel: React.FC<PoseSelectionCarouselProps> = ({
  language,
  selection,
  onUpdateSelection,
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentPoseId = selection.poseExpression || 'soft_smile';
  const currentPoseObj = POSE_EXPRESSION_OPTIONS.find((p) => p.id === currentPoseId) || POSE_EXPRESSION_OPTIONS[1];

  // Helper to get category for each pose
  const getCategory = (id: string) => {
    if (['soft_smile', 'laughing', 'serious_calm', 'looking_at_camera', 'surprised_excited', 'shy_blushing'].includes(id)) {
      return 'facial';
    }
    if (['standing_pose', 'walking', 'dancing', 'arms_crossed', 'waving', 'looking_back'].includes(id)) {
      return 'standing_action';
    }
    if (['sitting_pose', 'lying_down', 'looking_down', 'looking_away_candid'].includes(id)) {
      return 'seated_relax';
    }
    return 'gestures_props';
  };

  // Filter options
  const filteredOptions = POSE_EXPRESSION_OPTIONS.filter((p) => {
    if (p.id === 'skip') return false; // Shown in header skip button
    if (selectedCategory === 'all') return true;
    return getCategory(p.id) === selectedCategory;
  });

  // Scroll handler
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-violet-800/80 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-violet-900/50">
        <label className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider">
          <Smile className="h-4 w-4 text-violet-400" />
          <span>
            {isMyanmar
              ? `ဟန်ပန် နှင့် အမူအရာ (၂၅ မျိုး)`
              : `Select Pose & Expression (25 Options):`}
          </span>
        </label>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateSelection({ poseExpression: 'skip', customPoseDetails: '' })}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            🚫 {isMyanmar ? 'ကျော်သွားပါ' : 'Skip'}
          </button>

          <span className="text-[11px] text-violet-200 font-bold bg-violet-950/90 px-2.5 py-1 rounded-lg border border-violet-700/80 shadow">
            {currentPoseObj.emoji || '😊'}{' '}
            {isMyanmar ? currentPoseObj.labelMm : currentPoseObj.labelEn}
          </span>
        </div>
      </div>

      {/* Quick Filter Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-violet-600/40">
        {POSE_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
              selectedCategory === cat.id
                ? 'bg-violet-950/90 border-violet-400 text-violet-200 font-bold shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMyanmar ? cat.labelMm : cat.labelEn}
          </button>
        ))}
      </div>

      {/* 🌟 100% HORIZONTAL SCROLLABLE CAROUSEL (ဟန်ပန်အမှုရာ ၂၅ မျိုးလုံး ဘေးတိုက် ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
        <div className="flex items-center justify-between text-[11px] text-violet-300 font-bold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-violet-400" />
            <span>
              {isMyanmar
                ? `ဟန်ပန်အမူအရာများ ဘေးတိုက် ဆွဲကြည့်ပါ (↔):`
                : `Poses & Expressions (Scroll Horizontally ↔):`}
            </span>
            <span className="text-[10px] text-violet-400/80 font-mono">
              ({filteredOptions.length} Options)
            </span>
          </span>

          {/* Left / Right Scroll Controls */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-violet-500 hover:text-slate-950 text-violet-300 border border-slate-700 transition-all shadow"
              title="Scroll Left"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg bg-slate-800 hover:bg-violet-500 hover:text-slate-950 text-violet-300 border border-slate-700 transition-all shadow"
              title="Scroll Right"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Strip */}
        <div
          ref={scrollContainerRef}
          className="flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin scrollbar-thumb-violet-500/50 scrollbar-track-slate-950 snap-x snap-mandatory"
          style={{ scrollBehavior: 'smooth' }}
        >
          {filteredOptions.map((pose) => {
            const isSelected = currentPoseId === pose.id;
            return (
              <button
                key={pose.id}
                type="button"
                onClick={() => onUpdateSelection({ poseExpression: pose.id })}
                className={`snap-start shrink-0 min-w-[175px] max-w-[220px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                  isSelected
                    ? 'bg-violet-950/90 border-violet-400 text-violet-100 font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)] ring-1 ring-violet-400/80'
                    : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-violet-500/60 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="text-2xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                    {pose.emoji || '😊'}
                  </span>
                  {isSelected ? (
                    <span className="p-0.5 rounded-full bg-violet-400 text-slate-950 shrink-0">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="p-0.5 rounded-full border border-slate-700 text-slate-600 group-hover:border-violet-400 group-hover:text-violet-400 transition-colors">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>

                <div>
                  <p className="text-[11px] font-semibold leading-tight line-clamp-2">
                    {isMyanmar ? pose.labelMm : pose.labelEn}
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
            {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ ရွေးချယ်ရန်:' : 'Or Fast Select via Dropdown Menu:'}
          </span>
        </div>
        <div className="relative">
          <select
            value={currentPoseId}
            onChange={(e) => onUpdateSelection({ poseExpression: e.target.value })}
            className="w-full rounded-xl bg-slate-900 border border-violet-500/40 hover:border-violet-400 px-3 py-2 text-xs font-semibold text-violet-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
          >
            {POSE_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
              const catPoses = POSE_EXPRESSION_OPTIONS.filter((p) => getCategory(p.id) === cat.id && p.id !== 'skip');
              if (catPoses.length === 0) return null;

              return (
                <optgroup
                  key={cat.id}
                  label={isMyanmar ? cat.labelMm : cat.labelEn}
                  className="bg-slate-950 text-violet-400 font-bold"
                >
                  {catPoses.map((pose) => (
                    <option
                      key={pose.id}
                      value={pose.id}
                      className="bg-slate-900 text-slate-100 py-1"
                    >
                      {pose.emoji || '😊'} {isMyanmar ? pose.labelMm : pose.labelEn}
                    </option>
                  ))}
                </optgroup>
              );
            })}
          </select>

          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-violet-400">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Custom Pose Details Input */}
      <div>
        <input
          type="text"
          placeholder={
            isMyanmar
              ? 'အခြား ဟန်ပန်/အမူအရာ အသေးစိတ် ရေးပါ (ဥပမာ- စာအုပ်ဖတ်နေဟန်၊ လက်ဝါးချင်းယှက်ထားဟန်)...'
              : 'Custom pose details (e.g. reading a book, hands folded)...'
          }
          value={selection.customPoseDetails || ''}
          onChange={(e) => onUpdateSelection({ customPoseDetails: e.target.value })}
          className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-violet-500 focus:outline-none transition-all"
        />
      </div>

    </div>
  );
};
