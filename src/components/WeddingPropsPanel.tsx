import React, { useState, useRef } from 'react';
import { MatrixSelection } from '../types';
import { WEDDING_ETHNIC_CATEGORIES, WeddingPropItem } from '../data/weddingPresetData';
import {
  Sparkles,
  Crown,
  CheckCircle2,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkle,
  X,
  Layers,
} from 'lucide-react';

interface WeddingPropsPanelProps {
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
  isMyanmar: boolean;
}

interface PropItemCarouselProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  items: WeddingPropItem[];
  currentSelection: string;
  onToggle: (promptText: string) => void;
  onClear: () => void;
  isMyanmar: boolean;
  themeColor: 'amber' | 'rose';
  dropdownPlaceholder: string;
}

const PropItemCarouselAndDropdown: React.FC<PropItemCarouselProps> = ({
  title,
  subtitle,
  icon,
  items,
  currentSelection,
  onToggle,
  onClear,
  isMyanmar,
  themeColor,
  dropdownPlaceholder,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const isItemSelected = (promptText: string) => currentSelection.includes(promptText);

  const selectedCount = items.filter((item) => isItemSelected(item.promptText)).length;

  const colorStyles =
    themeColor === 'amber'
      ? {
          cardSelected:
            'bg-amber-950/90 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.4)] ring-1 ring-amber-400/40 scale-[1.02]',
          cardUnselected:
            'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900',
          titleText: 'text-amber-300',
          badgeSelected: 'bg-amber-500 text-slate-950 font-black',
          btnHover: 'hover:bg-amber-500 hover:text-slate-950 text-amber-300',
          scrollbar: 'scrollbar-thumb-amber-500/40',
          borderFocus: 'focus:border-amber-400',
          chipBg: 'bg-amber-950/80 border-amber-500/50 text-amber-200',
        }
      : {
          cardSelected:
            'bg-rose-950/90 border-rose-400 text-rose-100 shadow-[0_0_12px_rgba(244,63,94,0.4)] ring-1 ring-rose-400/40 scale-[1.02]',
          cardUnselected:
            'bg-slate-950/75 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900',
          titleText: 'text-rose-300',
          badgeSelected: 'bg-rose-500 text-slate-950 font-black',
          btnHover: 'hover:bg-rose-500 hover:text-slate-950 text-rose-300',
          scrollbar: 'scrollbar-thumb-rose-500/40',
          borderFocus: 'focus:border-rose-400',
          chipBg: 'bg-rose-950/80 border-rose-500/50 text-rose-200',
        };

  return (
    <div className="space-y-2.5 rounded-xl bg-slate-950/90 border border-slate-800/90 p-3 shadow-md">
      {/* Title & Stats */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5">
          {icon}
          <div>
            <label className={`text-[11px] font-extrabold ${colorStyles.titleText} flex items-center gap-1`}>
              <span>{title}</span>
            </label>
            {subtitle && <p className="text-[9px] text-slate-400">{subtitle}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {selectedCount > 0 && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 font-bold border border-emerald-500/50 flex items-center gap-1">
              <Check className="h-2.5 w-2.5" />
              <span>
                {selectedCount} {isMyanmar ? 'ခု ရွေးထား' : 'Selected'}
              </span>
            </span>
          )}
          {currentSelection && (
            <button
              type="button"
              onClick={onClear}
              className="text-[10px] text-amber-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-700 transition-colors"
            >
              {isMyanmar ? 'အားလုံး ရှင်းမည်' : 'Clear All'}
            </button>
          )}
        </div>
      </div>

      {/* 🌟 1. HORIZONTAL CAROUSEL (ဘေးတိုက်ဆွဲကြည့်၍ ရွေးရန်) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold px-0.5">
          <span className="flex items-center gap-1">
            <Sparkle className="h-3 w-3 text-amber-400" />
            <span>{isMyanmar ? 'ဘေးတိုက် ဆွဲကြည့်ပါ (↔ Swipe Carousel):' : 'Scroll Horizontally (↔ Swipe Carousel):'}</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scroll('left')}
              className={`p-1 rounded-md bg-slate-900 border border-slate-700 transition-all ${colorStyles.btnHover}`}
              title="Scroll Left"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className={`p-1 rounded-md bg-slate-900 border border-slate-700 transition-all ${colorStyles.btnHover}`}
              title="Scroll Right"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Scrollable track */}
        <div
          ref={scrollRef}
          className={`flex gap-2 overflow-x-auto py-1.5 px-0.5 scrollbar-thin ${colorStyles.scrollbar} scrollbar-track-slate-950 snap-x snap-mandatory`}
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.map((item) => {
            const isSelected = isItemSelected(item.promptText);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onToggle(item.promptText)}
                className={`group shrink-0 w-[185px] sm:w-[210px] snap-start rounded-xl p-2.5 text-left transition-all border flex flex-col justify-between cursor-pointer ${
                  isSelected ? colorStyles.cardSelected : colorStyles.cardUnselected
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-xl leading-none drop-shadow">{item.emoji}</span>
                    {isSelected ? (
                      <span className="flex items-center gap-0.5 text-[9px] font-black text-emerald-300 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/50">
                        <Check className="h-2.5 w-2.5" />
                        <span>ရွေးထား</span>
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-500 group-hover:text-slate-300">
                        {isMyanmar ? '+ ရွေးမည်' : '+ Pick'}
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-[11px] font-bold leading-tight line-clamp-2 ${
                      isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {isMyanmar ? item.labelMm : item.labelEn}
                  </p>
                </div>

                <div className="mt-2 border-t border-slate-800/80 pt-1.5">
                  <p className="text-[9px] text-slate-400 line-clamp-2 italic leading-tight">
                    {item.promptText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 🌟 2. DROPDOWN SELECTOR (Dropdown Menu ဖွင့်ကြည့်ရန်) */}
      <div className="pt-1">
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              onToggle(e.target.value);
            }
          }}
          className={`w-full rounded-lg bg-slate-950 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 ${colorStyles.borderFocus} focus:outline-none transition-all`}
        >
          <option value="" className="bg-slate-950 text-slate-400">
            {dropdownPlaceholder}
          </option>
          {items.map((item) => {
            const isSelected = isItemSelected(item.promptText);
            return (
              <option key={item.id} value={item.promptText} className="bg-slate-950 text-slate-200 py-1">
                {isSelected ? '✓ [ရွေးထားပြီး] ' : '+ '} {item.emoji} {isMyanmar ? item.labelMm : item.labelEn}
              </option>
            );
          })}
        </select>
      </div>

      {/* Selected Items Tag Chips */}
      {selectedCount > 0 && (
        <div className="flex flex-wrap gap-1 pt-1.5 border-t border-slate-800/70">
          {items
            .filter((item) => isItemSelected(item.promptText))
            .map((item) => (
              <span
                key={item.id}
                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${colorStyles.chipBg}`}
              >
                <span>{item.emoji}</span>
                <span className="truncate max-w-[150px]">{isMyanmar ? item.labelMm : item.labelEn}</span>
                <button
                  type="button"
                  onClick={() => onToggle(item.promptText)}
                  className="hover:text-red-300 text-slate-400 transition-colors ml-0.5"
                  title="Remove"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            ))}
        </div>
      )}
    </div>
  );
};

export const WeddingPropsPanel: React.FC<WeddingPropsPanelProps> = ({
  selection,
  onUpdateSelection,
  isMyanmar,
}) => {
  const [activeEthnicId, setActiveEthnicId] = useState<string>('bamar');
  const [activeEraId, setActiveEraId] = useState<'ancient' | 'colonial' | 'modern'>('ancient');

  // Find active ethnic group data
  const currentEthnic =
    WEDDING_ETHNIC_CATEGORIES.find((e) => e.id === activeEthnicId) || WEDDING_ETHNIC_CATEGORIES[0];

  // Find active era data
  const currentEra = currentEthnic.eras.find((era) => era.id === activeEraId) || currentEthnic.eras[0];

  // Helper toggle function for accessory props
  const toggleAccessory = (promptText: string) => {
    const current = selection.weddingAccessoryProps || '';
    let updated = '';
    if (current.includes(promptText)) {
      updated = current
        .replace(promptText, '')
        .replace(/,\s*,/g, ',')
        .replace(/^,\s*/, '')
        .replace(/,\s*$/, '')
        .trim();
    } else {
      updated = current ? `${current}, ${promptText}` : promptText;
    }
    onUpdateSelection({ weddingAccessoryProps: updated });
  };

  // Helper toggle function for studio backdrop props
  const toggleStudioProp = (promptText: string) => {
    const current = selection.weddingStudioBackdropProps || '';
    let updated = '';
    if (current.includes(promptText)) {
      updated = current
        .replace(promptText, '')
        .replace(/,\s*,/g, ',')
        .replace(/^,\s*/, '')
        .replace(/,\s*$/, '')
        .trim();
    } else {
      updated = current ? `${current}, ${promptText}` : promptText;
    }
    onUpdateSelection({ weddingStudioBackdropProps: updated });
  };

  const handleClearAccessories = () => {
    onUpdateSelection({ weddingAccessoryProps: '' });
  };

  const handleClearStudioProps = () => {
    onUpdateSelection({ weddingStudioBackdropProps: '' });
  };

  const handleReset = () => {
    onUpdateSelection({
      weddingAccessoryProps: '',
      weddingStudioBackdropProps: '',
    });
  };

  const hasSelections = Boolean(selection.weddingAccessoryProps || selection.weddingStudioBackdropProps);

  return (
    <div className="mt-4 space-y-4 rounded-2xl bg-slate-900/95 border border-amber-500/40 p-4 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-amber-500/30 pb-3 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>💍</span>
              <span>
                {isMyanmar
                  ? 'မင်္ဂလာ အသုံးဆောင်များ၊ ခန်းဝင်ပစ္စည်းများနှင့် တိုင်းရင်းသား ကဏ္ဍ'
                  : 'Wedding Accessories, Studio Backdrops & Ethnic Categories'}
              </span>
            </h3>
            <p className="text-[10px] text-slate-400">
              {isMyanmar
                ? 'ခေတ် ၃ ခေတ်နှင့် တိုင်းရင်းသားများ၏ ရိုးရာ မင်္ဂလာအသုံးဆောင်များနှင့် ခန်းဝင်ပစ္စည်းများကို Carousel & Dropdown ဖြင့် ရွေးချယ်ပါ'
                : 'Browse wedding accessories & studio backdrops across 3 eras via horizontal swipe carousels & dropdown menus'}
            </p>
          </div>
        </div>

        {hasSelections && (
          <button
            type="button"
            onClick={handleReset}
            className="text-[10px] bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-slate-700 transition-all flex items-center gap-1"
          >
            <RotateCcw className="h-3 w-3" />
            {isMyanmar ? 'အားလုံး ရှင်းမည်' : 'Clear Props'}
          </button>
        )}
      </div>

      {/* 1. Ethnic Group Selector (တိုင်းရင်းသားများ ကဏ္ဍ) */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-amber-200 flex items-center gap-1">
          <span>🏛️</span>
          <span>{isMyanmar ? '၁။ တိုင်းရင်းသား ကဏ္ဍ ရွေးရန် (Ethnic Group):' : '1. Select Ethnic Group:'}</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
          {WEDDING_ETHNIC_CATEGORIES.map((ethnic) => {
            const isActive = activeEthnicId === ethnic.id;
            return (
              <button
                key={ethnic.id}
                type="button"
                onClick={() => {
                  setActiveEthnicId(ethnic.id);
                  onUpdateSelection({ weddingEthnicGroup: ethnic.id });
                }}
                className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 border cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)] scale-[1.02]'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <span className="text-base">{ethnic.emoji}</span>
                <span className="text-[10px] truncate max-w-full">
                  {isMyanmar ? ethnic.nameMm.replace(/^[၀-၉၁-၆\d]+\။\s*/, '') : ethnic.nameEn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Era Selector (ခေတ် ၃ ခေတ်) */}
      <div className="space-y-1.5 pt-1 border-t border-slate-800">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-amber-200 flex items-center gap-1">
            <span>⏳</span>
            <span>{isMyanmar ? '၂။ ခေတ် ၃ ခေတ် ရွေးရန် (Select Era):' : '2. Select Era:'}</span>
          </label>
          <span className="text-[9px] text-amber-400/80">
            {isMyanmar ? 'ခေတ်ပြောင်းလျှင် အောက်ပါ ပစ္စည်းစာရင်းများ အလိုအလျောက် ပြောင်းလဲပါမည်' : 'Switching era updates props list below'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {currentEthnic.eras.map((era) => {
            const isActive = activeEraId === era.id;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => {
                  setActiveEraId(era.id);
                  onUpdateSelection({ weddingEra: era.id });
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left border flex items-center justify-between gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-400 shadow-[0_0_10px_rgba(217,119,6,0.4)]'
                    : 'bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span>{era.id === 'ancient' ? '🏛️' : era.id === 'colonial' ? '📜' : '💖'}</span>
                  <span className="truncate">{isMyanmar ? era.eraMm : era.eraEn}</span>
                </div>
                {isActive && <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-200" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Sub-Category A: မင်္ဂလာ အသုံးဆောင်များ (Wedding Accessories) - Horizontal Carousel + Dropdown */}
      <PropItemCarouselAndDropdown
        title={
          isMyanmar
            ? `A. မင်္ဂလာ အသုံးဆောင်များ (${currentEthnic.nameMm.replace(/^[၀-၉၁-၆\d]+\။\s*/, '')} - ${
                currentEra.id === 'ancient' ? 'ခေတ်ဟောင်း' : currentEra.id === 'colonial' ? 'ခေတ်လယ်' : 'ခေတ်သစ်'
              })`
            : `A. Wedding Accessories (${currentEthnic.nameEn} - ${currentEra.eraEn})`
        }
        subtitle={
          isMyanmar
            ? 'မင်္ဂလာအခမ်းအနားသုံး ရတနာ၊ ပန်းကုံး၊ သပြေခက်၊ လက်ထပ်ကွင်း နှင့် အသုံးအဆောင်များ'
            : 'Traditional wedding jewellery, garlands, blessing bowls, and ceremonial accessories'
        }
        icon={<Sparkles className="h-4 w-4 text-amber-400" />}
        items={currentEra.accessories}
        currentSelection={selection.weddingAccessoryProps || ''}
        onToggle={toggleAccessory}
        onClear={handleClearAccessories}
        isMyanmar={isMyanmar}
        themeColor="amber"
        dropdownPlaceholder={
          isMyanmar
            ? `▼ Dropdown ဖွင့်၍ မင်္ဂလာအသုံးအဆောင် (${currentEra.accessories.length} မျိုး) မှ ရွေးရန်...`
            : `▼ Pick from Dropdown (${currentEra.accessories.length} Accessories)...`
        }
      />

      {/* 4. Sub-Category B: Studio ခန်းဝင် ပစ္စည်းများနှင့် နောက်ခံ (Studio Backdrop & Props) - Horizontal Carousel + Dropdown */}
      <PropItemCarouselAndDropdown
        title={
          isMyanmar
            ? `B. Studio ခန်းဝင် ပစ္စည်းများနှင့် နောက်ခံ (${currentEthnic.nameMm.replace(/^[၀-၉၁-၆\d]+\။\s*/, '')} - ${
                currentEra.id === 'ancient' ? 'ခေတ်ဟောင်း' : currentEra.id === 'colonial' ? 'ခေတ်လယ်' : 'ခေတ်သစ်'
              })`
            : `B. Studio Backdrops & Props (${currentEthnic.nameEn} - ${currentEra.eraEn})`
        }
        subtitle={
          isMyanmar
            ? 'မင်္ဂလာခန်းဆီး၊ ပလ္လင်တော်၊ ကနုတ်ရွှေဇာ၊ ထီးဖြူ နှင့် စတူဒီယို ခန်းဝင်ပစ္စည်းများ'
            : 'Studio backdrops, royal thrones, carved wood panels, and ceremonial room props'
        }
        icon={<Layers className="h-4 w-4 text-rose-400" />}
        items={currentEra.studioProps}
        currentSelection={selection.weddingStudioBackdropProps || ''}
        onToggle={toggleStudioProp}
        onClear={handleClearStudioProps}
        isMyanmar={isMyanmar}
        themeColor="rose"
        dropdownPlaceholder={
          isMyanmar
            ? `▼ Dropdown ဖွင့်၍ Studio ခန်းဝင်ပစ္စည်း (${currentEra.studioProps.length} မျိုး) မှ ရွေးရန်...`
            : `▼ Pick from Dropdown (${currentEra.studioProps.length} Studio Props)...`
        }
      />

      {/* Active Selections Summary Footer */}
      {hasSelections && (
        <div className="pt-2 border-t border-amber-500/20 text-[10px] space-y-1">
          {selection.weddingAccessoryProps && (
            <p className="text-amber-300/90 truncate">
              <span className="font-bold">✨ ရွေးချယ်ထားသော မင်္ဂလာ အသုံးဆောင်များ: </span>
              {selection.weddingAccessoryProps}
            </p>
          )}
          {selection.weddingStudioBackdropProps && (
            <p className="text-rose-300/90 truncate">
              <span className="font-bold">🛋️ ရွေးချယ်ထားသော Studio ခန်းဝင် ပစ္စည်းများ: </span>
              {selection.weddingStudioBackdropProps}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

