import React, { useRef } from 'react';
import { MatrixSelection } from '../types';
import {
  COUPLE_POSES_OPTIONS,
  GROOM_OUTFIT_OPTIONS,
  GROOM_TOP_OPTIONS,
  GROOM_BOTTOM_OPTIONS,
  GROOM_EXPRESSION_OPTIONS,
  GROOM_HAIR_OPTIONS,
  GROOM_ACCESSORY_PRESETS,
  BRIDE_OUTFIT_OPTIONS,
  BRIDE_TOP_OPTIONS,
  BRIDE_BOTTOM_OPTIONS,
  BRIDE_EXPRESSION_OPTIONS,
  BRIDE_HAIR_OPTIONS,
  BRIDE_ACCESSORY_PRESETS,
} from '../data/presetData';
import {
  Heart,
  UserCheck,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Check,
  RotateCcw,
  Shirt,
  Scissors,
  Smile,
  Crown,
  Sparkle,
} from 'lucide-react';

interface CoupleOptionItem {
  id?: string;
  emoji?: string;
  labelMm: string;
  labelEn?: string;
  promptText: string;
}

interface DualControlFieldProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  options: CoupleOptionItem[];
  selectedValue: string;
  onSelect: (val: string) => void;
  isMyanmar: boolean;
  themeColor: 'rose' | 'blue' | 'pink';
  placeholder?: string;
}

/**
 * Dual Control Component: Provides BOTH a Horizontal Carousel (ဘေးတိုက်ဆွဲကြည့်ရန်)
 * AND a Dropdown Menu (Dropdown ဖွင့်ကြည့်ရန်) with 100% two-way synchronization.
 */
const DualControlField: React.FC<DualControlFieldProps> = ({
  title,
  subtitle,
  icon,
  options,
  selectedValue,
  onSelect,
  isMyanmar,
  themeColor,
  placeholder,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Color classes map
  const colorMap = {
    rose: {
      border: 'border-rose-500/40',
      borderSelected: 'border-rose-400',
      bgSelected: 'bg-rose-950/80',
      textSelected: 'text-rose-200',
      textLabel: 'text-rose-300',
      shadowSelected: 'shadow-[0_0_12px_rgba(244,63,94,0.35)]',
      btnHover: 'hover:bg-rose-500 hover:text-slate-950 text-rose-300',
      badgeBg: 'bg-rose-950/90 border-rose-600/60 text-rose-200',
      selectFocus: 'focus:border-rose-400 focus:ring-rose-400/20',
      scrollbar: 'scrollbar-thumb-rose-500/40',
    },
    blue: {
      border: 'border-blue-500/40',
      borderSelected: 'border-blue-400',
      bgSelected: 'bg-blue-950/80',
      textSelected: 'text-blue-200',
      textLabel: 'text-blue-300',
      shadowSelected: 'shadow-[0_0_12px_rgba(59,130,246,0.35)]',
      btnHover: 'hover:bg-blue-500 hover:text-slate-950 text-blue-300',
      badgeBg: 'bg-blue-950/90 border-blue-600/60 text-blue-200',
      selectFocus: 'focus:border-blue-400 focus:ring-blue-400/20',
      scrollbar: 'scrollbar-thumb-blue-500/40',
    },
    pink: {
      border: 'border-pink-500/40',
      borderSelected: 'border-pink-400',
      bgSelected: 'bg-pink-950/80',
      textSelected: 'text-pink-200',
      textLabel: 'text-pink-300',
      shadowSelected: 'shadow-[0_0_12px_rgba(236,72,153,0.35)]',
      btnHover: 'hover:bg-pink-500 hover:text-slate-950 text-pink-300',
      badgeBg: 'bg-pink-950/90 border-pink-600/60 text-pink-200',
      selectFocus: 'focus:border-pink-400 focus:ring-pink-400/20',
      scrollbar: 'scrollbar-thumb-pink-500/40',
    },
  };

  const theme = colorMap[themeColor];
  const selectedItem = options.find((opt) => opt.promptText === selectedValue);

  return (
    <div className="space-y-2 rounded-xl bg-slate-900/80 border border-slate-800/90 p-2.5">
      {/* Title & Info Bar */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className={`text-[11px] font-extrabold ${theme.textLabel} flex items-center gap-1.5`}>
          {icon}
          <span>{title}</span>
          {subtitle && <span className="text-[9px] text-slate-400 font-normal">({subtitle})</span>}
        </label>

        {/* Selected preview badge or reset */}
        <div className="flex items-center gap-1.5">
          {selectedValue ? (
            <>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${theme.badgeBg} truncate max-w-[150px] sm:max-w-[200px]`}>
                {selectedItem?.emoji || '✨'} {isMyanmar ? selectedItem?.labelMm : selectedItem?.labelEn || selectedItem?.labelMm}
              </span>
              <button
                type="button"
                onClick={() => onSelect('')}
                className="text-[10px] text-slate-400 hover:text-rose-300 bg-slate-800 hover:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-700 transition-colors"
                title="Clear"
              >
                ✕
              </button>
            </>
          ) : (
            <span className="text-[10px] text-slate-400 font-mono">
              ({options.length} {isMyanmar ? 'မျိုး ရွေးနိုင်' : 'Options'})
            </span>
          )}
        </div>
      </div>

      {/* 🌟 1. HORIZONTAL CAROUSEL (ဘေးတိုက်ဆွဲကြည့်ရန်) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold px-0.5">
          <span className="flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-amber-400" />
            <span>{isMyanmar ? 'ဘေးတိုက် ဆွဲကြည့်ပါ (↔):' : 'Scroll Horizontally (↔):'}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              className={`p-1 rounded-md bg-slate-800 border border-slate-700 transition-all ${theme.btnHover}`}
              title="Scroll Left"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className={`p-1 rounded-md bg-slate-800 border border-slate-700 transition-all ${theme.btnHover}`}
              title="Scroll Right"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className={`flex gap-2 overflow-x-auto py-1 px-0.5 scrollbar-thin ${theme.scrollbar} scrollbar-track-slate-950 snap-x snap-mandatory`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {options.map((opt, idx) => {
            const isSelected = selectedValue === opt.promptText;
            return (
              <button
                key={opt.id || idx}
                type="button"
                onClick={() => onSelect(isSelected ? '' : opt.promptText)}
                className={`group shrink-0 w-[145px] sm:w-[160px] snap-start rounded-xl p-2 text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? `${theme.bgSelected} ${theme.borderSelected} ${theme.shadowSelected} ring-1 ring-white/30 scale-[1.02]`
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-base leading-none drop-shadow">{opt.emoji || '✨'}</span>
                    {isSelected && (
                      <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-400 bg-emerald-950/80 px-1 py-0.5 rounded border border-emerald-500/40">
                        <Check className="h-2.5 w-2.5" />
                        <span>ရွေးထား</span>
                      </span>
                    )}
                  </div>
                  <div className={`text-[11px] font-bold line-clamp-2 leading-tight ${isSelected ? theme.textSelected : 'text-slate-200 group-hover:text-white'}`}>
                    {isMyanmar ? opt.labelMm : opt.labelEn || opt.labelMm}
                  </div>
                </div>

                {opt.labelEn && isMyanmar && (
                  <div className="text-[9px] text-slate-400 truncate mt-1 border-t border-slate-800/60 pt-0.5">
                    {opt.labelEn}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌟 2. DROPDOWN SELECTOR (Dropdown Menu ဖွင့်ကြည့်ရန်) */}
      <div className="pt-1">
        <select
          value={selectedValue || ''}
          onChange={(e) => onSelect(e.target.value)}
          className={`w-full rounded-lg bg-slate-950 border ${selectedValue ? theme.borderSelected : 'border-slate-700'} px-2.5 py-1.5 text-xs text-slate-200 font-medium ${theme.selectFocus} focus:outline-none transition-all`}
        >
          <option value="" className="bg-slate-950 text-slate-400">
            {placeholder || (isMyanmar ? '-- Dropdown ဖွင့်၍ ရွေးချယ်ပါ --' : '-- Open Dropdown to Select --')}
          </option>
          {options.map((opt, idx) => (
            <option key={opt.id || idx} value={opt.promptText} className="bg-slate-950 text-slate-200 py-1">
              {opt.emoji ? `${opt.emoji} ` : ''}
              {isMyanmar ? opt.labelMm : opt.labelEn || opt.labelMm}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

/**
 * Dual Control Component for Multi-Select Accessories & Pose Presets
 */
interface DualControlMultiSelectProps {
  title: string;
  icon?: React.ReactNode;
  presets: { labelMm: string; promptText: string }[];
  currentValue: string;
  onUpdate: (val: string) => void;
  isMyanmar: boolean;
  themeColor: 'blue' | 'pink';
}

const DualControlMultiSelect: React.FC<DualControlMultiSelectProps> = ({
  title,
  icon,
  presets,
  currentValue,
  onUpdate,
  isMyanmar,
  themeColor,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isSelected = (text: string) => currentValue.includes(text);

  const toggleItem = (text: string) => {
    let updated = currentValue || '';
    if (isSelected(text)) {
      updated = updated
        .replace(text, '')
        .replace(/,\s*,/g, ',')
        .replace(/^,\s*/, '')
        .replace(/,\s*$/, '')
        .trim();
    } else {
      updated = updated ? `${updated}, ${text}` : text;
    }
    onUpdate(updated);
  };

  const themeClasses =
    themeColor === 'blue'
      ? {
          activeBg: 'bg-blue-600 text-white font-bold shadow-[0_0_8px_rgba(37,99,235,0.4)] border-blue-400',
          btnHover: 'hover:bg-blue-500 hover:text-slate-950 text-blue-300',
          scrollbar: 'scrollbar-thumb-blue-500/40',
          border: 'border-blue-500/40',
        }
      : {
          activeBg: 'bg-pink-600 text-white font-bold shadow-[0_0_8px_rgba(236,72,153,0.4)] border-pink-400',
          btnHover: 'hover:bg-pink-500 hover:text-slate-950 text-pink-300',
          scrollbar: 'scrollbar-thumb-pink-500/40',
          border: 'border-pink-500/40',
        };

  const selectedCount = presets.filter((p) => isSelected(p.promptText)).length;

  return (
    <div className="space-y-2 rounded-xl bg-slate-900/80 border border-slate-800/90 p-2.5">
      {/* Title */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label className="text-[11px] font-extrabold text-slate-200 flex items-center gap-1.5">
          {icon}
          <span>{title}</span>
        </label>
        <div className="flex items-center gap-1.5">
          {selectedCount > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 font-bold border border-emerald-500/40">
              {selectedCount} {isMyanmar ? 'ခု ရွေးထား' : 'Selected'}
            </span>
          )}
          {currentValue && (
            <button
              type="button"
              onClick={() => onUpdate('')}
              className="text-[10px] text-amber-300 hover:text-amber-200 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 transition-colors"
            >
              {isMyanmar ? 'အားလုံး ရှင်းမည်' : 'Clear All'}
            </button>
          )}
        </div>
      </div>

      {/* 🌟 1. Horizontal Scroll Carousel Chips */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold px-0.5">
          <span className="flex items-center gap-1">
            <Sparkle className="h-3 w-3 text-amber-400" />
            <span>{isMyanmar ? 'ဘေးတိုက် ဆွဲ၍ နှိပ်ရွေးပါ (↔):' : 'Scroll & Click to Pick (↔):'}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              className={`p-1 rounded-md bg-slate-800 border border-slate-700 transition-all ${themeClasses.btnHover}`}
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className={`p-1 rounded-md bg-slate-800 border border-slate-700 transition-all ${themeClasses.btnHover}`}
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className={`flex gap-1.5 overflow-x-auto py-1 px-0.5 scrollbar-thin ${themeClasses.scrollbar} scrollbar-track-slate-950 snap-x`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {presets.map((preset, idx) => {
            const active = isSelected(preset.promptText);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => toggleItem(preset.promptText)}
                className={`shrink-0 px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all border flex items-center gap-1 cursor-pointer snap-start ${
                  active
                    ? themeClasses.activeBg
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                {active && <Check className="h-2.5 w-2.5 text-white" />}
                <span>{preset.labelMm}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌟 2. Dropdown Menu Selector for Multi-pick */}
      <div className="pt-1">
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              toggleItem(e.target.value);
            }
          }}
          className="w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 focus:border-amber-400 focus:outline-none"
        >
          <option value="" className="bg-slate-950 text-slate-400">
            {isMyanmar ? '▼ Dropdown မှ အသုံးအဆောင် ထပ်မံ ရွေးထည့်ရန် / ဖယ်ထုတ်ရန်...' : '▼ Pick / Toggle items from Dropdown menu...'}
          </option>
          {presets.map((preset, idx) => {
            const active = isSelected(preset.promptText);
            return (
              <option key={idx} value={preset.promptText} className="bg-slate-950 text-slate-200">
                {active ? '✓ [ရွေးထား] ' : '+ '} {preset.labelMm}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

interface CoupleDetailsCustomizerProps {
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
  isMyanmar: boolean;
}

export const CoupleDetailsCustomizer: React.FC<CoupleDetailsCustomizerProps> = ({
  selection,
  onUpdateSelection,
  isMyanmar,
}) => {
  const handleResetAll = () => {
    onUpdateSelection({
      couplePose: '',
      groomOutfit: '',
      groomTop: '',
      groomBottom: '',
      groomExpression: '',
      groomHair: '',
      groomPoseAccessory: '',
      brideOutfit: '',
      brideTop: '',
      brideBottom: '',
      brideExpression: '',
      brideHair: '',
      bridePoseAccessory: '',
    });
  };

  const hasAnySelection = Boolean(
    selection.couplePose ||
      selection.groomOutfit ||
      selection.groomTop ||
      selection.groomBottom ||
      selection.groomExpression ||
      selection.groomHair ||
      selection.groomPoseAccessory ||
      selection.brideOutfit ||
      selection.brideTop ||
      selection.brideBottom ||
      selection.brideExpression ||
      selection.brideHair ||
      selection.bridePoseAccessory
  );

  return (
    <div className="mt-4 space-y-4 rounded-2xl bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-rose-950/40 border border-rose-500/50 p-4 shadow-2xl">
      {/* Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/30 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <Heart className="h-5 w-5 fill-rose-400/30 animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-black text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>👩‍❤️‍👨</span>
              <span>{isMyanmar ? 'သတို့သားသတို့သမီး အချက်အလက်များ (Couple Customizer)' : 'Groom & Bride Detailed Customization'}</span>
            </h4>
            <p className="text-[10px] text-slate-400">
              {isMyanmar
                ? 'ရွေးချယ်စရာများ အားလုံးကို ဘေးတိုက်ဆွဲကြည့်၍လည်းကောင်း၊ Dropdown မှလည်းကောင်း စိတ်ကြိုက် ရွေးချယ်နိုင်ပါသည်'
                : 'Browse all options via horizontal scrollable carousels & dropdown menus'}
            </p>
          </div>
        </div>

        {hasAnySelection && (
          <button
            type="button"
            onClick={handleResetAll}
            className="text-[10px] bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1 shadow"
          >
            <RotateCcw className="h-3 w-3" />
            <span>{isMyanmar ? 'မူလအတိုင်း အကုန်ရှင်းမည်' : 'Reset All Details'}</span>
          </button>
        )}
      </div>

      {/* 1. COUPLE POSE & INTERACTION (စုံတွဲ ကိုယ်ဟန်အမူယာ ပို့စ်များ) */}
      <div className="space-y-2">
        <DualControlField
          title={isMyanmar ? '👩‍❤️‍👨 စုံတွဲ ကိုယ်ဟန်အမူယာ / ပို့စ်များ (Couple Pose & Interaction)' : 'Couple Pose & Interaction:'}
          options={COUPLE_POSES_OPTIONS}
          selectedValue={selection.couplePose || ''}
          onSelect={(val) => onUpdateSelection({ couplePose: val })}
          isMyanmar={isMyanmar}
          themeColor="rose"
          placeholder={isMyanmar ? '-- စုံတွဲ ကိုယ်ဟန်အမူယာ ရွေးရန် --' : '-- Select Couple Pose --'}
        />
      </div>

      {/* 2. GROOM & BRIDE TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        
        {/* 👔 2A. GROOM SECTION (သတို့သား အချက်အလက်များ) */}
        <div className="space-y-3.5 rounded-xl bg-slate-950/90 border border-blue-500/40 p-3.5 shadow-lg">
          <div className="flex items-center justify-between border-b border-blue-500/30 pb-2">
            <div className="flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-black text-blue-300 uppercase tracking-wider">
                {isMyanmar ? '👔 သတို့သား အချက်အလက်များ (Groom Details)' : '👔 Groom Details'}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 border border-blue-500/40 text-blue-300 font-mono">
              Groom
            </span>
          </div>

          {/* Groom Full Outfit */}
          <DualControlField
            title={isMyanmar ? 'သတို့သား ဝတ်စုံအပြည့် (Full Set)' : 'Groom Full Outfit'}
            subtitle={isMyanmar ? 'မင်္ဂလာ/ရိုးရာ/တက်ဆီးဒို့' : 'Wedding/Formal/Tuxedo'}
            icon={<Crown className="h-3.5 w-3.5 text-blue-400" />}
            options={GROOM_OUTFIT_OPTIONS}
            selectedValue={selection.groomOutfit || ''}
            onSelect={(val) => onUpdateSelection({ groomOutfit: val })}
            isMyanmar={isMyanmar}
            themeColor="blue"
            placeholder={isMyanmar ? '-- သတို့သား ဝတ်စုံအပြည့် ရွေးရန် --' : '-- Select Full Outfit --'}
          />

          {/* Groom Top */}
          <DualControlField
            title={isMyanmar ? 'အထက်အင်္ကျီ (Top Shirt / Jacket)' : 'Groom Top:'}
            icon={<Shirt className="h-3.5 w-3.5 text-blue-400" />}
            options={GROOM_TOP_OPTIONS}
            selectedValue={selection.groomTop || ''}
            onSelect={(val) => onUpdateSelection({ groomTop: val })}
            isMyanmar={isMyanmar}
            themeColor="blue"
            placeholder={isMyanmar ? '-- သတို့သား အင်္ကျီ ရွေးရန် --' : '-- Select Top --'}
          />

          {/* Groom Bottom */}
          <DualControlField
            title={isMyanmar ? 'အောက်အထည် (Bottom / Trousers / Longyi)' : 'Groom Bottom:'}
            icon={<Shirt className="h-3.5 w-3.5 text-blue-400" />}
            options={GROOM_BOTTOM_OPTIONS}
            selectedValue={selection.groomBottom || ''}
            onSelect={(val) => onUpdateSelection({ groomBottom: val })}
            isMyanmar={isMyanmar}
            themeColor="blue"
            placeholder={isMyanmar ? '-- ဘောင်းဘီ / ပုဆိုး ရွေးရန် --' : '-- Select Bottom --'}
          />

          {/* Groom Expression */}
          <DualControlField
            title={isMyanmar ? 'မျက်နှာအမူအရာ / အကြည့် (Expression)' : 'Groom Expression:'}
            icon={<Smile className="h-3.5 w-3.5 text-blue-400" />}
            options={GROOM_EXPRESSION_OPTIONS}
            selectedValue={selection.groomExpression || ''}
            onSelect={(val) => onUpdateSelection({ groomExpression: val })}
            isMyanmar={isMyanmar}
            themeColor="blue"
            placeholder={isMyanmar ? '-- မျက်နှာအမူအရာ ရွေးရန် --' : '-- Select Expression --'}
          />

          {/* Groom Hair */}
          <DualControlField
            title={isMyanmar ? 'ဆံပင်စတိုင် (Hair Style)' : 'Groom Hair Style:'}
            icon={<Scissors className="h-3.5 w-3.5 text-blue-400" />}
            options={GROOM_HAIR_OPTIONS}
            selectedValue={selection.groomHair || ''}
            onSelect={(val) => onUpdateSelection({ groomHair: val })}
            isMyanmar={isMyanmar}
            themeColor="blue"
            placeholder={isMyanmar ? '-- ဆံပင်စတိုင် ရွေးရန် --' : '-- Select Hair Style --'}
          />

          {/* Groom Accessories / Pose Presets */}
          <DualControlMultiSelect
            title={isMyanmar ? '✨ အသုံးအဆောင် / ဟန်ပန် ပရိုဆက်များ (Accessories)' : 'Groom Accessories & Poses:'}
            icon={<Sparkles className="h-3.5 w-3.5 text-blue-400" />}
            presets={GROOM_ACCESSORY_PRESETS}
            currentValue={selection.groomPoseAccessory || ''}
            onUpdate={(val) => onUpdateSelection({ groomPoseAccessory: val })}
            isMyanmar={isMyanmar}
            themeColor="blue"
          />
        </div>

        {/* 👰 2B. BRIDE SECTION (သတို့သမီး အချက်အလက်များ) */}
        <div className="space-y-3.5 rounded-xl bg-slate-950/90 border border-pink-500/40 p-3.5 shadow-lg">
          <div className="flex items-center justify-between border-b border-pink-500/30 pb-2">
            <div className="flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-pink-400" />
              <span className="text-xs font-black text-pink-300 uppercase tracking-wider">
                {isMyanmar ? '👰 သတို့သမီး အချက်အလက်များ (Bride Details)' : '👰 Bride Details'}
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-950 border border-pink-500/40 text-pink-300 font-mono">
              Bride
            </span>
          </div>

          {/* Bride Full Outfit */}
          <DualControlField
            title={isMyanmar ? 'သတို့သမီး ဝတ်စုံအပြည့် (Full Set)' : 'Bride Full Outfit'}
            subtitle={isMyanmar ? 'ထိုင်မသိမ်း/ဂါဝန်/တော်ဝင်' : 'Bridal Gown/Traditional'}
            icon={<Crown className="h-3.5 w-3.5 text-pink-400" />}
            options={BRIDE_OUTFIT_OPTIONS}
            selectedValue={selection.brideOutfit || ''}
            onSelect={(val) => onUpdateSelection({ brideOutfit: val })}
            isMyanmar={isMyanmar}
            themeColor="pink"
            placeholder={isMyanmar ? '-- သတို့သမီး ဝတ်စုံအပြည့် ရွေးရန် --' : '-- Select Full Outfit --'}
          />

          {/* Bride Top */}
          <DualControlField
            title={isMyanmar ? 'အထက်အင်္ကျီ (Top Blouse)' : 'Bride Top Blouse:'}
            icon={<Shirt className="h-3.5 w-3.5 text-pink-400" />}
            options={BRIDE_TOP_OPTIONS}
            selectedValue={selection.brideTop || ''}
            onSelect={(val) => onUpdateSelection({ brideTop: val })}
            isMyanmar={isMyanmar}
            themeColor="pink"
            placeholder={isMyanmar ? '-- သတို့သမီး အင်္ကျီ ရွေးရန် --' : '-- Select Top Blouse --'}
          />

          {/* Bride Bottom */}
          <DualControlField
            title={isMyanmar ? 'အောက်အထည် (Bottom / Skirt / Longyi)' : 'Bride Bottom:'}
            icon={<Shirt className="h-3.5 w-3.5 text-pink-400" />}
            options={BRIDE_BOTTOM_OPTIONS}
            selectedValue={selection.brideBottom || ''}
            onSelect={(val) => onUpdateSelection({ brideBottom: val })}
            isMyanmar={isMyanmar}
            themeColor="pink"
            placeholder={isMyanmar ? '-- ထမီ / စကတ် ရွေးရန် --' : '-- Select Bottom --'}
          />

          {/* Bride Expression */}
          <DualControlField
            title={isMyanmar ? 'မျက်နှာအမူအရာ / အကြည့် (Expression)' : 'Bride Expression:'}
            icon={<Smile className="h-3.5 w-3.5 text-pink-400" />}
            options={BRIDE_EXPRESSION_OPTIONS}
            selectedValue={selection.brideExpression || ''}
            onSelect={(val) => onUpdateSelection({ brideExpression: val })}
            isMyanmar={isMyanmar}
            themeColor="pink"
            placeholder={isMyanmar ? '-- မျက်နှာအမူအရာ ရွေးရန် --' : '-- Select Expression --'}
          />

          {/* Bride Hair */}
          <DualControlField
            title={isMyanmar ? 'ဆံပင်စတိုင် (Hair Style)' : 'Bride Hair Style:'}
            icon={<Scissors className="h-3.5 w-3.5 text-pink-400" />}
            options={BRIDE_HAIR_OPTIONS}
            selectedValue={selection.brideHair || ''}
            onSelect={(val) => onUpdateSelection({ brideHair: val })}
            isMyanmar={isMyanmar}
            themeColor="pink"
            placeholder={isMyanmar ? '-- ဆံပင်စတိုင် ရွေးရန် --' : '-- Select Hair Style --'}
          />

          {/* Bride Accessories / Pose Presets */}
          <DualControlMultiSelect
            title={isMyanmar ? '✨ အသုံးအဆောင် / ဟန်ပန် ပရိုဆက်များ (Accessories)' : 'Bride Accessories & Poses:'}
            icon={<Sparkles className="h-3.5 w-3.5 text-pink-400" />}
            presets={BRIDE_ACCESSORY_PRESETS}
            currentValue={selection.bridePoseAccessory || ''}
            onUpdate={(val) => onUpdateSelection({ bridePoseAccessory: val })}
            isMyanmar={isMyanmar}
            themeColor="pink"
          />
        </div>

      </div>
    </div>
  );
};
