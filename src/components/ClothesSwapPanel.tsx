import React, { useRef, useState } from 'react';
import { Shirt, Sparkles, UserCheck, Upload, RefreshCw, X, Loader2, CheckCircle2 } from 'lucide-react';
import { AppMode, Language, MatrixSelection } from '../types';
import { GarmentSelectionCarousel } from './GarmentSelectionCarousel';
import { CustomGarmentUploader } from './CustomGarmentUploader';

interface ClothesSwapPanelProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
  currentMode: AppMode;
}

export const ClothesSwapPanel: React.FC<ClothesSwapPanelProps> = ({
  language,
  selection,
  onUpdateSelection,
  currentMode
}) => {
  const isMyanmar = language === 'my';
  const [loadingPerson, setLoadingPerson] = useState(false);
  const personInputRef = useRef<HTMLInputElement>(null);

  const activeOption = selection.clothesSwapOption || 'in_app_preset';

  const handlePersonFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoadingPerson(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        if (url) {
          onUpdateSelection({ referenceImage: url });
        }
        setLoadingPerson(false);
      };
      reader.onerror = () => setLoadingPerson(false);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      {/* 👗 Top Option Switcher for Clothes Swap Mode */}
      <div className="space-y-3 rounded-2xl bg-slate-950/90 border border-orange-500/60 p-3.5 shadow-xl">
        <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
          <div className="flex items-center gap-2">
            <Shirt className="h-5 w-5 text-orange-400 animate-pulse" />
            <span className="text-xs font-extrabold text-orange-200 uppercase tracking-wider">
              {isMyanmar ? 'မဂ္ဂဇင်း ဖက်ရှင် ဝတ်စုံ ရွေးချယ်မှု စနစ် (Clothes Swap Options)' : 'Fashion Clothes Swap System'}
            </span>
          </div>
          <span className="text-[10px] bg-orange-950 text-orange-300 font-bold px-2.5 py-0.5 rounded-full border border-orange-700">
            {isMyanmar ? 'မုဒ် (၂) မျိုး ပါဝင်သည်' : '2 Options Available'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onUpdateSelection({ clothesSwapOption: 'in_app_preset' })}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeOption === 'in_app_preset'
                ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white shadow-lg ring-2 ring-amber-300 scale-[1.01]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span>{isMyanmar ? 'Option 1: App ဝတ်စုံ (၃၂) မျိုး' : 'Option 1: In-App Presets (32)'}</span>
          </button>

          <button
            type="button"
            onClick={() => onUpdateSelection({ clothesSwapOption: 'custom_garment_upload' })}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              activeOption === 'custom_garment_upload'
                ? 'bg-gradient-to-r from-orange-500 via-rose-500 to-pink-600 text-white shadow-lg ring-2 ring-orange-300 scale-[1.01]'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Shirt className="h-4 w-4" />
            <span>{isMyanmar ? 'Option 2: အပြင် ဝတ်စုံပုံ တင်မည်' : 'Option 2: Upload Outfit (Image 2)'}</span>
          </button>
        </div>
      </div>

      {/* OPTION 1: IN-APP PRESETS (32 Garment Carousel + Person Upload Slot) */}
      {activeOption === 'in_app_preset' ? (
        <div className="space-y-4 pt-1">
          
          {/* Primary Subject Upload Card for Option 1 */}
          <div className="space-y-2 rounded-2xl bg-slate-950/90 border border-cyan-500/50 p-3.5 shadow-md">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-extrabold text-cyan-200 uppercase tracking-wider">
                  {isMyanmar ? '၁။ မူရင်း လူဓာတ်ပုံ တင်ပါ (Primary Subject Image 1)' : '1. Primary Subject Photo (Image 1)'}
                </span>
              </div>
              {selection.referenceImage && (
                <button
                  type="button"
                  onClick={() => onUpdateSelection({ referenceImage: null })}
                  className="text-pink-400 hover:text-pink-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{isMyanmar ? 'ဖျက်မည်' : 'Remove'}</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-cyan-300/90 font-medium">
              🔒 {isMyanmar ? 'Strict Sequence: ဤဓာတ်ပုံမှ မျက်နှာ၊ ခန္ဓာကိုယ်၊ ကိုယ်ဟန် (Pose)၊ အသားအရောင်၊ အမူအရာ ၁၀၀% ထိန်းထားပါမည်။' : 'Strict Sequence: Keeps 100% exact face, body shape, pose, skin tone & expression from this image.'}
            </p>

            {loadingPerson ? (
              <div className="h-32 rounded-xl bg-slate-900 flex flex-col items-center justify-center space-y-1.5 border border-slate-800">
                <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                <span className="text-xs text-slate-300">{isMyanmar ? 'ဖတ်ရှုနေပါသည်...' : 'Processing...'}</span>
              </div>
            ) : selection.referenceImage ? (
              <div className="relative rounded-xl overflow-hidden border border-cyan-500/50 bg-slate-900 p-2 text-center">
                <img
                  src={selection.referenceImage}
                  alt="Primary Person"
                  referrerPolicy="no-referrer"
                  className="w-full h-36 object-contain rounded bg-slate-950"
                />
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-cyan-300 font-bold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span>{isMyanmar ? 'Image 1 လူပုံ တင်ပြီးပါပြီ' : 'Image 1 Person loaded'}</span>
                  </span>
                  <label className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer font-bold">
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Change'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePersonFileChange}
                      onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 bg-slate-900/60 hover:bg-slate-900/90 p-4 text-center cursor-pointer transition-all space-y-2">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400">
                  <Upload className="h-5 w-5" />
                </div>
                <p className="text-xs font-bold text-slate-200">
                  {isMyanmar ? 'မူရင်း လူဓာတ်ပုံ တင်ရန် နှိပ်ပါ' : 'Click to Upload Person Photo (Image 1)'}
                </p>
                <p className="text-[10px] text-cyan-300 font-medium">PNG, JPG, WEBP, HEIC</p>
                <input
                  ref={personInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePersonFileChange}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <GarmentSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />

          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>🧵</span>
              <span>{isMyanmar ? 'အထည်အလိပ် အသေးစိတ် သီးသန့် ထည့်သွင်းရန်:' : 'Fabric Details & Textures:'}</span>
            </span>
            <input
              type="text"
              placeholder={isMyanmar ? "ဥပမာ- ရွှေခြည်ထိုး ချိတ်ထမီ၊ Velvet အသား၊ ရိုးရာ အထည်အလိပ်..." : "e.g. Woven Gold Thread Silk, Heavy Velvet, Intricate Embroidery..."}
              value={selection.garmentFabric || ''}
              onChange={(e) => onUpdateSelection({ garmentFabric: e.target.value })}
              className="w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none transition-all"
            />
          </div>

          {/* Magazine Fashion Clothes Swap Mode Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/90 via-orange-950/95 to-rose-950/90 border border-amber-500/60 shadow-xl space-y-2.5">
            <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
              <div className="flex items-center gap-2">
                <Shirt className="h-4 w-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
                  {isMyanmar ? '👗 မဂ္ဂဇင်း ဖန်ရှင် ဝတ်စုံလဲ ကဏ္ဍ (Magazine Fashion Clothes Swap)' : '👗 Magazine Fashion Clothes Swap'}
                </span>
              </div>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-500/40">
                {isMyanmar ? '၃၂ မျိုး ရရှိနိုင်ပါသည်' : '32 Fashion Styles'}
              </span>
            </div>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {isMyanmar
                ? '👗 မဂ္ဂဇင်းကာဗာ စတိုင်လ် ရိုးရာ/ခေတ်မီ အနုပညာ ဝတ်စုံ ၃၂ မျိုးအနက် စိတ်ကြိုက် လဲလှယ်နိုင်ပါသည်။ မူရင်းရုပ် ၁၀၀% မပြောင်းလဲစေဘဲ ဝတ်စုံနှင့် အထည်အလိပ် အသေးစိတ်များကို မဂ္ဂဇင်းဓာတ်ပုံ အရည်အသွေးဖြင့် ပေါင်းစပ်ပေးပါမည်။'
                : '👗 Swap between 32 high-fashion, traditional, and modern magazine cover outfits. Retains 100% face identity while seamlessly transferring garment textures & details.'}
            </p>
          </div>
        </div>
      ) : (
        /* OPTION 2: CUSTOM EXTERNAL GARMENT PHOTO UPLOAD */
        <CustomGarmentUploader
          language={language}
          selection={selection}
          onUpdateSelection={onUpdateSelection}
        />
      )}
    </div>
  );
};

