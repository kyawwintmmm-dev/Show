import React from 'react';
import { AppMode, Language, PresetTemplate } from '../types';
import { PRESET_TEMPLATES } from '../data/presetData';
import { Sparkles, Flame } from 'lucide-react';

interface PresetGalleryProps {
  language: Language;
  onSelectPreset: (preset: PresetTemplate) => void;
  activePresetId?: string;
}

const getModeBadge = (mode: AppMode) => {
  switch (mode) {
    case 'img2img':
      return { mm: '၁။ ရည်ညွှန်းပုံ', en: '1. Ref Image', tag: 'IMG2IMG', color: 'border-pink-500/60 text-pink-300' };
    case 'txt2img':
      return { mm: '၂။ ဖန်တီးမှု', en: '2. Creation', tag: 'TXT2IMG', color: 'border-purple-500/60 text-purple-300' };
    case 'clothes-swap':
      return { mm: '၃။ ဝတ်စုံလဲ', en: '3. Clothes Swap', tag: 'CLOTHES-SWAP', color: 'border-amber-500/60 text-amber-300' };
    case 'background-only':
      return { mm: '၄။ နောက်ခံထုတ်', en: '4. BG Only', tag: 'BG-ONLY', color: 'border-teal-500/60 text-teal-300' };
    default:
      return { mm: 'ဖန်တီးမှု', en: 'Preset', tag: 'PROMPT', color: 'border-slate-700 text-slate-300' };
  }
};

export const PresetGallery: React.FC<PresetGalleryProps> = ({
  language,
  onSelectPreset,
  activePresetId
}) => {
  const isMyanmar = language === 'my';

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Flame className="h-4 w-4 text-orange-400" />
        <h3 className="text-xs font-bold text-slate-200">
          {isMyanmar ? 'လူကြိုက်များသော ရေပန်းစား Preset များ' : 'Featured Studio Inspiration Presets'}
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PRESET_TEMPLATES.map((preset) => {
          const isSelected = activePresetId === preset.id;
          const badge = getModeBadge(preset.mode);

          return (
            <div
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`group relative rounded-2xl overflow-hidden border cursor-pointer transition-all duration-300 ${
                isSelected
                  ? 'border-pink-500 shadow-[0_0_20px_rgba(255,42,133,0.45)] ring-2 ring-pink-500/60 scale-[1.02]'
                  : 'border-slate-800 hover:border-slate-700 bg-slate-950/70 hover:scale-[1.02]'
              }`}
            >
              <div className="relative h-28 w-full overflow-hidden bg-slate-950">
                <img
                  src={preset.previewUrl}
                  alt={preset.titleEn}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <span className="absolute top-2 left-2 text-lg drop-shadow-md">
                  {preset.emoji}
                </span>

                {/* Overlaid Mode Label Badge */}
                <div className={`absolute top-2 right-2 flex items-center gap-1 rounded-lg bg-slate-950/90 px-2 py-0.5 text-[10px] font-black tracking-tight border shadow-md backdrop-blur-md ${badge.color}`}>
                  <span>{isMyanmar ? badge.mm : badge.en}</span>
                </div>
              </div>

              <div className="p-2.5 space-y-1">
                <h4 className="text-xs font-bold text-slate-100 group-hover:text-pink-300 transition-colors line-clamp-1">
                  {isMyanmar ? preset.titleMm : preset.titleEn}
                </h4>
                <div className="flex items-center gap-1 text-[10px] text-slate-400">
                  <Sparkles className="h-3 w-3 text-cyan-400 animate-pulse" />
                  <span>{isMyanmar ? '၁-ချက်နှိပ် ပုံဖော်မည်' : '1-Click Auto Load'}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
