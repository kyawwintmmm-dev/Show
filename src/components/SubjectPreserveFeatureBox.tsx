import React from 'react';
import { Key } from 'lucide-react';
import { AppMode, MatrixSelection } from '../types';

interface SubjectPreserveFeatureBoxProps {
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
  isMyanmar?: boolean;
  className?: string;
  currentMode?: AppMode;
}

export const SubjectPreserveFeatureBox: React.FC<SubjectPreserveFeatureBoxProps> = ({
  selection,
  onUpdateSelection,
  isMyanmar = true,
  className = '',
  currentMode
}) => {
  const isChecked = selection.preserveSubject100Percent ?? true;
  const isClothesSwap = currentMode === 'clothes-swap';

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateSelection({ preserveSubject100Percent: e.target.checked });
  };

  return (
    <div className={`rounded-xl border-2 border-sky-400/90 bg-slate-950/90 hover:bg-slate-900/90 transition-all p-3.5 shadow-lg shadow-sky-950/30 ${className}`}>
      <div className="flex items-start gap-3">
        {/* Left Orange Key Icon */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/20 border border-orange-500/50 text-orange-400 shrink-0 mt-0.5 shadow-sm">
          <Key className="h-5 w-5 text-orange-400 animate-pulse" />
        </div>

        {/* Content & Checkbox */}
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <label htmlFor="preserve-subject-checkbox" className="text-xs font-bold text-sky-200 cursor-pointer leading-snug hover:text-white transition-colors">
              {isClothesSwap
                ? (isMyanmar
                    ? 'လူ ပုံစံမပြောင်း ထည့်ပေးလိုက်သော ဓါတ်ပုံထဲက မှီငြမ်း ပုံ၏ ဝတ်စုံသို့ပြောင်းမည်'
                    : 'Keep person unchanged & swap outfit to the reference photo garment')
                : (isMyanmar
                    ? 'မူရင်းပုံမှာပါတဲ့ လူ၊ အဝတ်အစား၊ ကိုယ်ဟန် လုံးဝ ၁၀၀% အတိအကျ မပြောင်းဘဲ နောက်ခံပြောင်းရန်အတွက်'
                    : 'Keep original person, outfit & pose 100% unchanged & exclusively replace background')}
            </label>

            {/* Checkbox (default checked) */}
            <div className="flex items-center shrink-0 pt-0.5">
              <input
                id="preserve-subject-checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={handleToggle}
                className="h-5 w-5 rounded border-sky-400 bg-slate-900 text-sky-400 focus:ring-2 focus:ring-sky-400 focus:ring-offset-0 cursor-pointer accent-sky-400 transition-all"
              />
            </div>
          </div>

          {/* Functional Indicator Badge / Description */}
          <div className={`text-[11px] p-2 rounded-lg border leading-relaxed transition-all ${
            isChecked
              ? 'bg-sky-950/70 border-sky-500/40 text-sky-200'
              : 'bg-slate-900/80 border-slate-800 text-slate-400'
          }`}>
            {isChecked ? (
              <div className="space-y-1">
                <p className="font-semibold text-amber-300 flex items-center gap-1">
                  <span>🔒</span>
                  <span>
                    {isClothesSwap
                      ? (isMyanmar ? '၁၀၀% လူ ပုံစံ မပြောင်းဘဲ ဝတ်စုံ လဲလှယ်မှု (Active):' : '100% Person Retained & Garment Swap Active:')
                      : (isMyanmar ? '၁၀၀% Subject ထိန်းသိမ်းမှု ဖွင့်ထားသည် (Active):' : '100% Subject Lock Active:')}
                  </span>
                </p>
                <ul className="list-disc list-inside space-y-0.5 pl-1 text-[10.5px]">
                  {isClothesSwap ? (
                    <>
                      <li>
                        {isMyanmar
                          ? 'လူ ပုံစံမပြောင်း (မျက်နှာ၊ အသားအရောင်၊ ခန္ဓာကိုယ် ၁၀၀% ထိန်းသိမ်းမည်)'
                          : 'Person identity, face, skin tone, and body shape preserved 100%.'}
                      </li>
                      <li>
                        {isMyanmar
                          ? 'ထည့်ပေးလိုက်သော ဓါတ်ပုံထဲက မှီငြမ်း ပုံ၏ ဝတ်စုံသို့ ပြောင်းမည်။'
                          : 'Swap outfit to match the reference photo garment style & texture.'}
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        {isMyanmar
                          ? 'မူရင်းပုံထဲမှ လူ၊ မျက်နှာ၊ အဝတ်အစား နှင့် ကိုယ်ဟန် (Pose) တို့ကို ၁၀၀% အတိအကျ ထိန်းသိမ်းမည်။'
                          : 'Original person, face, clothing, and posture preserved 100% exactly.'}
                      </li>
                      <li>
                        {isMyanmar
                          ? 'နောက်ခံ Background နှင့် ရှုခင်း ပတ်ဝန်းကျင်ကိုသာ သီးသန့် ပြောင်းလဲမည်။'
                          : 'Exclusively replace and transform the background & environment.'}
                      </li>
                    </>
                  )}
                </ul>
              </div>
            ) : (
              <div className="space-y-0.5">
                <p className="font-semibold text-amber-200 flex items-center gap-1">
                  <span>🔓</span>
                  <span>
                    {isMyanmar
                      ? 'ပုံစံ ပြောင်းလဲရန် အမှန်ခြစ်ဖြုတ်ထားသည် (Unchecked):'
                      : 'Modifications Allowed (Unchecked):'}
                  </span>
                </p>
                <p className="text-[10.5px] text-slate-300 pl-1 leading-relaxed">
                  {isMyanmar
                    ? 'မူရင်းထည့်ပုံစံထဲမှ လူ၊ အဝတ်အစား၊ ကိုယ်ဟန် နှင့် နောက်ခံအားလုံးကို လွတ်လပ်စွာ ပြောင်းလဲပြင်ဆင်ပေးမည်။'
                    : 'Unchecked: Allows modifying original person details, clothing, pose, and background freely.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

