import React, { useState, useRef } from 'react';
import { Language, MatrixSelection } from '../types';
import { CULTURAL_PROP_PRESETS } from '../data/presetData';
import { Package, X, ChevronDown, Trash2, Check, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CulturalPropsDropdownProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

const CATEGORIES = [
  { id: 'all', labelMm: `အကုန်လုံး (${CULTURAL_PROP_PRESETS.length} မျိုး)`, labelEn: `All (${CULTURAL_PROP_PRESETS.length} Props)`, emoji: '✨' },
  { id: 'beauty', labelMm: '🌿 အလှအပ/သနပ်ခါး', labelEn: 'Beauty & Thanaka', emoji: '🌿' },
  { id: 'jewelry', labelMm: '👑 ရတနာ/ရွှေထည်', labelEn: 'Jewelry & Gems', emoji: '👑' },
  { id: 'accessories', labelMm: '☂️ အသုံးအဆောင်/ထီး/ယာဉ်', labelEn: 'Accessories, Vehicles & Parasols', emoji: '☂️' },
  { id: 'attire', labelMm: '🇲🇲 အဝတ်အစား/အိတ်', labelEn: 'Attire & Bags', emoji: '🇲🇲' },
  { id: 'music', labelMm: '🎵 တူရိယာ/အနုပညာ', labelEn: 'Instruments & Arts', emoji: '🎵' },
  { id: 'household', labelMm: '🏺 ယွန်းထည်/အိမ်သုံး', labelEn: 'Lacquerware & Household', emoji: '🏺' },
  { id: 'modern', labelMm: '🕶️ ခေတ်ပေါ်/ရိုးရာစပ်', labelEn: 'Modern & Fusion', emoji: '🕶️' },
];

export const CulturalPropsDropdown: React.FC<CulturalPropsDropdownProps> = ({
  language,
  selection,
  onUpdateSelection
}) => {
  const isMyanmar = language === 'my';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activePropsDetails = selection.culturalPropsDetails || '';

  // Filter props based on category
  const filteredProps = CULTURAL_PROP_PRESETS.filter((prop) => {
    return selectedCategory === 'all' || prop.category === selectedCategory;
  });

  // Scroll left/right helper
  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Check if a prop is currently selected
  const isPropSelected = (prop: typeof CULTURAL_PROP_PRESETS[0]) => {
    if (!activePropsDetails) return false;
    return (
      activePropsDetails.toLowerCase().includes(prop.id) ||
      activePropsDetails.includes(prop.labelMm) ||
      activePropsDetails.toLowerCase().includes(prop.promptText.toLowerCase())
    );
  };

  // Add/Remove prop
  const handleSelectProp = (prop: typeof CULTURAL_PROP_PRESETS[0]) => {
    let newDetails = activePropsDetails;
    if (isPropSelected(prop)) {
      // Remove it
      newDetails = newDetails
        .replace(prop.labelMm, '')
        .replace(prop.promptText, '')
        .replace(/,\s*,/g, ',')
        .replace(/^,\s*|\s*,\s*$/g, '')
        .trim();
    } else {
      // Add it
      newDetails = newDetails ? `${newDetails}, ${prop.labelMm}` : prop.labelMm;
    }
    onUpdateSelection({ culturalPropsDetails: newDetails, includeCulturalProps: true });
  };

  // Remove individual prop by label or text segment
  const handleRemoveChip = (labelToRemove: string) => {
    const parts = activePropsDetails
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p && p !== labelToRemove && !labelToRemove.includes(p));
    const newDetails = parts.join(', ');
    onUpdateSelection({
      culturalPropsDetails: newDetails,
      includeCulturalProps: newDetails.length > 0
    });
  };

  // Clear all props
  const handleClearAll = () => {
    onUpdateSelection({ culturalPropsDetails: '', includeCulturalProps: false });
  };

  // Get list of selected chips to show nicely
  const getSelectedChips = () => {
    if (!activePropsDetails.trim()) return { matchedPresets: [], customChips: [] };
    
    const matchedPresets = CULTURAL_PROP_PRESETS.filter((p) => isPropSelected(p));
    
    let customTextRemaining = activePropsDetails;
    matchedPresets.forEach((p) => {
      customTextRemaining = customTextRemaining.replace(p.labelMm, '').replace(p.promptText, '');
    });
    
    const customChips = customTextRemaining
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && s !== ',');

    return { matchedPresets, customChips };
  };

  const { matchedPresets = [], customChips = [] } = getSelectedChips();
  const totalSelectedCount = matchedPresets.length + customChips.length;

  return (
    <div className="space-y-3.5 rounded-2xl bg-slate-950/90 border border-amber-800/70 p-4 backdrop-blur-md shadow-xl">
      
      {/* Header Row */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-slate-800/80">
        <label className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
          <Package className="h-4 w-4 text-amber-400" />
          <span>
            {isMyanmar
              ? `အသုံးဆောင် / ယဉ်ကျေးမှု ပစ္စည်းများ (${CULTURAL_PROP_PRESETS.length} မျိုးလုံး)`
              : `Cultural Props & Accessories (${CULTURAL_PROP_PRESETS.length} Options)`}
          </span>
          {totalSelectedCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-[11px] font-mono font-bold">
              {totalSelectedCount}
            </span>
          )}
        </label>

        <div className="flex items-center gap-2">
          {totalSelectedCount > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="text-[10px] bg-rose-950/80 hover:bg-rose-900/80 text-rose-300 font-semibold px-2 py-1 rounded-lg border border-rose-800/80 transition-all flex items-center gap-1"
              title={isMyanmar ? 'အားလုံး ပယ်ဖျက်မည်' : 'Clear All'}
            >
              <Trash2 className="h-3 w-3" />
              <span>{isMyanmar ? 'ဖျက်မည်' : 'Clear'}</span>
            </button>
          )}

          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => onUpdateSelection({ includeCulturalProps: true })}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                selection.includeCulturalProps !== false
                  ? 'bg-amber-500 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isMyanmar ? 'ထည့်မည်' : 'Yes'}
            </button>
            <button
              type="button"
              onClick={() => onUpdateSelection({ includeCulturalProps: false, culturalPropsDetails: '' })}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-md transition-all ${
                selection.includeCulturalProps === false
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isMyanmar ? 'မလိုပါ' : 'No'}
            </button>
          </div>
        </div>
      </div>

      {selection.includeCulturalProps !== false && (
        <div className="space-y-3.5">
          
          {/* Quick Category Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-600/40">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] whitespace-nowrap rounded-lg border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-950/90 border-amber-400 text-amber-200 font-bold shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {isMyanmar ? cat.labelMm : cat.labelEn}
              </button>
            ))}
          </div>

          {/* 🌟 100% HORIZONTAL SCROLLABLE CAROUSEL FOR ALL 32 PROPS (ဘေးတိုက် ဆွဲကြည့်နိုင်သော ၃၂ မျိုးလုံး) */}
          <div className="space-y-1.5 bg-slate-900/60 border border-slate-800 rounded-xl p-2.5 relative">
            <div className="flex items-center justify-between text-[11px] text-amber-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>
                  {isMyanmar
                    ? `အသုံးအဆောင် ${CULTURAL_PROP_PRESETS.length} မျိုးလုံး (ဘေးတိုက် ဆွဲကြည့်ပါ ↔):`
                    : `All ${CULTURAL_PROP_PRESETS.length} Accessories (Scroll Horizontally ↔):`}
                </span>
                <span className="text-[10px] text-amber-400/80 font-mono">
                  ({filteredProps.length} Items)
                </span>
              </span>

              {/* Scroll Controls */}
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
              {filteredProps.map((prop) => {
                const selected = isPropSelected(prop);
                return (
                  <button
                    key={prop.id}
                    type="button"
                    onClick={() => handleSelectProp(prop)}
                    className={`snap-start shrink-0 min-w-[170px] max-w-[210px] p-2.5 rounded-xl border text-left transition-all relative flex flex-col justify-between gap-1.5 group cursor-pointer ${
                      selected
                        ? 'bg-amber-950/90 border-amber-400 text-amber-100 font-bold shadow-[0_0_15px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/80'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-amber-500/60 hover:bg-slate-900/90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <span className="text-xl p-1 rounded-lg bg-slate-900/90 border border-slate-800 group-hover:scale-110 transition-transform">
                        {prop.emoji}
                      </span>
                      {selected ? (
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
                        {isMyanmar ? prop.labelMm : prop.labelEn}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dropout Select Dropdown (Secondary Fast Access) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">
                {isMyanmar ? 'သို့မဟုတ် Dropdown မနူးမှ ရွေးရန်:' : 'Or Select via Dropdown Menu:'}
              </span>
            </div>
            <div className="relative">
              <select
                value=""
                onChange={(e) => {
                  const propId = e.target.value;
                  if (!propId) return;
                  const prop = CULTURAL_PROP_PRESETS.find((p) => p.id === propId);
                  if (prop) {
                    handleSelectProp(prop);
                  }
                  e.target.value = '';
                }}
                className="w-full rounded-xl bg-slate-900 border border-amber-500/40 hover:border-amber-400 px-3 py-2 text-xs font-semibold text-amber-200 focus:outline-none appearance-none cursor-pointer pr-10 shadow-inner"
              >
                <option value="" disabled className="bg-slate-950 text-slate-400">
                  {isMyanmar
                    ? `▼ ဤနေရာတွင် Dropdown ဖွင့်၍ အသုံးအဆောင် ${CULTURAL_PROP_PRESETS.length} ခုမှ ရွေးပါ...`
                    : `▼ Open Dropdown menu to pick from ${CULTURAL_PROP_PRESETS.length} props...`}
                </option>

                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
                  const categoryProps = CULTURAL_PROP_PRESETS.filter((p) => p.category === cat.id);
                  if (categoryProps.length === 0) return null;

                  return (
                    <optgroup
                      key={cat.id}
                      label={isMyanmar ? cat.labelMm : cat.labelEn}
                      className="bg-slate-950 text-amber-400 font-bold"
                    >
                      {categoryProps.map((prop) => {
                        const selected = isPropSelected(prop);
                        return (
                          <option
                            key={prop.id}
                            value={prop.id}
                            className={`bg-slate-900 text-slate-100 py-1 ${
                              selected ? 'text-amber-300 font-bold bg-amber-950/40' : ''
                            }`}
                          >
                            {selected ? '✓ ' : ''}
                            {prop.emoji} {isMyanmar ? prop.labelMm : prop.labelEn}
                          </option>
                        );
                      })}
                    </optgroup>
                  );
                })}
              </select>

              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-amber-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* SELECTED ITEMS BADGES / CHIPS DISPLAY */}
          {totalSelectedCount > 0 && (
            <div className="space-y-1.5 p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/40 shadow-inner">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                {isMyanmar ? 'ရွေးချယ်ထားသော အသုံးအဆောင်များ:' : 'Selected Accessories:'}
              </span>

              <div className="flex flex-wrap gap-1.5">
                {matchedPresets.map((prop) => (
                  <span
                    key={prop.id}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/90 border border-amber-400/80 text-amber-200 text-xs font-semibold shadow-sm animate-fadeIn"
                  >
                    <span>{prop.emoji}</span>
                    <span>{isMyanmar ? prop.labelMm : prop.labelEn}</span>
                    <button
                      type="button"
                      onClick={() => handleSelectProp(prop)}
                      className="ml-1 text-amber-400 hover:text-rose-300 transition-colors p-0.5 rounded-full hover:bg-amber-900/50"
                      title="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}

                {customChips.map((chipText, index) => (
                  <span
                    key={`custom-${index}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium shadow-sm"
                  >
                    <span>✨ {chipText}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveChip(chipText)}
                      className="ml-1 text-slate-400 hover:text-rose-300 transition-colors p-0.5 rounded-full hover:bg-slate-700"
                      title="Remove"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CUSTOM TEXT INPUT */}
          <div>
            <input
              type="text"
              placeholder={
                isMyanmar
                  ? "အခြား သီးသန့် ပါဝင်စေချင်သော အသုံးအဆောင်များ (ဥပမာ- ရွှေရောင်ဆွဲကြိုး၊ ပုသိမ်ထီး၊ စပယ်ပန်းကုံး)..."
                  : "Additional custom props or notes (e.g. golden necklace, jasmine flowers)..."
              }
              value={selection.culturalPropsDetails || ''}
              onChange={(e) =>
                onUpdateSelection({
                  culturalPropsDetails: e.target.value,
                  includeCulturalProps: true
                })
              }
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none transition-all"
            />
          </div>

        </div>
      )}
    </div>
  );
};
