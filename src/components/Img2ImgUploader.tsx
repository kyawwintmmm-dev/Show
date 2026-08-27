import React, { useRef, useState } from 'react';
import { AppMode, Language, MatrixSelection } from '../types';
import { Upload, Image as ImageIcon, X, Loader2, AlertTriangle, RefreshCw, CheckCircle2, Sparkles, Wand2 } from 'lucide-react';
import { SubjectPreserveFeatureBox } from './SubjectPreserveFeatureBox';
import { CustomGarmentUploader } from './CustomGarmentUploader';

interface Img2ImgUploaderProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
  currentMode?: AppMode;
}

const SINGLE_SAMPLE_REFERENCES = [
  { id: 'sample1', name: 'Portrait Model 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
  { id: 'sample2', name: 'Traditional Model 2', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop' },
  { id: 'sample3', name: 'Fashion Male 3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
];

const COUPLE_SAMPLE_REFERENCES = [
  {
    id: 'couple_sample1',
    name: 'Romantic Couple',
    maleUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
    femaleUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop'
  }
];

// Extremely robust, fault-tolerant image processor for mobile & desktop
const processFileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }

    // Try FileReader first for base64 data URL
    const reader = new FileReader();

    reader.onerror = () => {
      console.warn('FileReader failed, attempting object URL fallback');
      try {
        const objUrl = URL.createObjectURL(file);
        resolve(objUrl);
      } catch {
        resolve('');
      }
    };

    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl) {
        try {
          resolve(URL.createObjectURL(file));
        } catch {
          resolve('');
        }
        return;
      }

      // Try image optimization via canvas if > 1600px
      const img = new Image();
      img.onerror = () => {
        // Fallback to raw data URL if canvas image decoder cannot parse
        resolve(rawDataUrl);
      };

      img.onload = () => {
        try {
          const MAX_DIM = 1600;
          if (img.width <= MAX_DIM && img.height <= MAX_DIM) {
            resolve(rawDataUrl);
            return;
          }

          let width = img.width;
          let height = img.height;
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.85);
            if (compressed && compressed.length > 200) {
              resolve(compressed);
              return;
            }
          }
        } catch (e) {
          console.warn('Canvas resize failed, returning original data URL', e);
        }
        resolve(rawDataUrl);
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
};

export const Img2ImgUploader: React.FC<Img2ImgUploaderProps> = ({
  language,
  selection,
  onUpdateSelection,
  currentMode
}) => {
  const isMyanmar = language === 'my';

  const isCouple =
    selection.subject === 'couple' ||
    selection.subject?.toLowerCase().includes('couple') ||
    selection.subject === 'စုံတွဲ';

  // Collapsible toggle state (Defaults to false in background-only mode)
  const [isExpanded, setIsExpanded] = useState<boolean>(currentMode !== 'background-only');

  // Sync state when mode changes
  React.useEffect(() => {
    if (currentMode === 'background-only') {
      setIsExpanded(false);
    }
  }, [currentMode]);

  // Processing state & error flags
  const [loadingSlot, setLoadingSlot] = useState<'single' | 'male' | 'female' | 'styleRef' | null>(null);
  const [errorSlots, setErrorSlots] = useState<{ single?: boolean; male?: boolean; female?: boolean; styleRef?: boolean }>({});

  // Refs for input reset
  const singleInputRef = useRef<HTMLInputElement>(null);
  const maleInputRef = useRef<HTMLInputElement>(null);
  const femaleInputRef = useRef<HTMLInputElement>(null);
  const styleRefInputRef = useRef<HTMLInputElement>(null);

  // File processing trigger
  const handleFileProcess = async (file: File, slot: 'single' | 'male' | 'female' | 'styleRef') => {
    setLoadingSlot(slot);
    setErrorSlots((prev) => ({ ...prev, [slot]: false }));

    try {
      const dataUrl = await processFileToDataUrl(file);
      if (!dataUrl) {
        setErrorSlots((prev) => ({ ...prev, [slot]: true }));
        setLoadingSlot(null);
        return;
      }

      if (slot === 'single') {
        onUpdateSelection({ referenceImage: dataUrl });
      } else if (slot === 'styleRef') {
        onUpdateSelection({ styleReferenceImage: dataUrl });
      } else if (slot === 'male') {
        onUpdateSelection({
          referenceImageMale: dataUrl,
          referenceImage: selection.referenceImage || dataUrl
        });
      } else if (slot === 'female') {
        onUpdateSelection({
          referenceImageFemale: dataUrl,
          referenceImage: selection.referenceImage || dataUrl
        });
      }
    } catch (err) {
      console.error(`Error processing photo for ${slot}:`, err);
      setErrorSlots((prev) => ({ ...prev, [slot]: true }));
    } finally {
      setLoadingSlot(null);
    }
  };

  // Change Handlers
  const handleSingleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file, 'single');
  };

  const handleStyleRefFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file, 'styleRef');
  };

  const handleMaleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file, 'male');
  };

  const handleFemaleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file, 'female');
  };

  // Drag and drop event handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, slot: 'single' | 'male' | 'female' | 'styleRef') => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file, slot);
  };

  // Clear Handlers
  const removeSingleImage = () => {
    onUpdateSelection({ referenceImage: null });
    setErrorSlots((prev) => ({ ...prev, single: false }));
    if (singleInputRef.current) singleInputRef.current.value = '';
  };

  const removeStyleRefImage = () => {
    onUpdateSelection({ styleReferenceImage: null });
    setErrorSlots((prev) => ({ ...prev, styleRef: false }));
    if (styleRefInputRef.current) styleRefInputRef.current.value = '';
  };

  const removeMaleImage = () => {
    onUpdateSelection({ referenceImageMale: null });
    setErrorSlots((prev) => ({ ...prev, male: false }));
    if (maleInputRef.current) maleInputRef.current.value = '';
  };

  const removeFemaleImage = () => {
    onUpdateSelection({ referenceImageFemale: null });
    setErrorSlots((prev) => ({ ...prev, female: false }));
    if (femaleInputRef.current) femaleInputRef.current.value = '';
  };

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md p-4 space-y-4 shadow-xl">
      
      {/* 🌄 Toggle Header Bar for Photo Uploads, Couple Photos, Subject Lock & Prompt Influence */}
      <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/50 shadow-lg">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🖼️</span>
          <div>
            <h4 className="text-xs font-bold text-cyan-200">
              {isCouple
                ? (isMyanmar ? 'စုံတွဲ ဓာတ်ပုံ တင်သွင်းရန် နှင့် ထိန်းသိမ်းမှု ဆက်တင်များ' : 'Couple Photo Uploads & Preserve Settings')
                : (isMyanmar ? 'ဓာတ်ပုံ တင်သွင်းရန်၊ မူလပုံသဏ္ဌာန် ထိန်းသိမ်းမှု နှင့် Prompt လွှမ်းမိုးမှု' : 'Photo Uploads, Subject Lock & Prompt Influence')}
            </h4>
            <p className="text-[10px] text-slate-400">
              {isMyanmar
                ? (isExpanded ? 'အထက်ပါ ဆက်တင်များ ဖွင့်ထားပါသည်' : 'နောက်ခံ သီးသန့်ထုတ်ရန်အတွက် ဝှက်ထားပါသည် (နှိပ်၍ ဖွင့်/ပိတ်နိုင်ပါသည်)')
                : (isExpanded ? 'Upload & weight controls expanded' : 'Hidden for clean background generation (Click to toggle)')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-sm ${
            isExpanded
              ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
              : 'bg-gradient-to-r from-cyan-600 via-teal-600 to-blue-600 text-white border-cyan-400 hover:brightness-110 shadow-cyan-950/50 scale-[1.02]'
          }`}
        >
          <span>{isExpanded ? (isMyanmar ? 'ဝှက်မည် (Hide)' : 'Hide') : (isMyanmar ? 'ပြမည် (Show)' : 'Show')}</span>
          <span>{isExpanded ? '🔼' : '🔽'}</span>
        </button>
      </div>

      {isExpanded && (
        <>
          {/* Option Switcher for Clothes Swap Mode */}
      {currentMode === 'clothes-swap' && (
        <div className="space-y-3 rounded-2xl bg-slate-950/90 border border-orange-500/60 p-3.5 shadow-xl">
          <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">👗</span>
              <span className="text-xs font-extrabold text-orange-200">
                {isMyanmar ? 'မဂ္ဂဇင်း ဖက်ရှင် ဝတ်စုံ ရွေးချယ်မှု စနစ်' : 'Fashion Outfit Selection System'}
              </span>
            </div>
            <span className="text-[10px] bg-orange-950 text-orange-300 font-bold px-2.5 py-0.5 rounded-full border border-orange-700">
              {isMyanmar ? 'မုဒ် (၂) မျိုး ပါဝင်သည်' : '2 Modes Included'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => onUpdateSelection({ clothesSwapOption: 'in_app_preset' })}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                (selection.clothesSwapOption || 'in_app_preset') === 'in_app_preset'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg ring-1 ring-amber-300 scale-[1.01]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>✨</span>
              <span>{isMyanmar ? 'Option 1: App ဝတ်စုံ (၃၂) မျိုး' : 'Option 1: In-App Presets'}</span>
            </button>

            <button
              type="button"
              onClick={() => onUpdateSelection({ clothesSwapOption: 'custom_garment_upload' })}
              className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all ${
                selection.clothesSwapOption === 'custom_garment_upload'
                  ? 'bg-gradient-to-r from-orange-500 to-rose-600 text-white shadow-lg ring-1 ring-orange-300 scale-[1.01]'
                  : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <span>👗</span>
              <span>{isMyanmar ? 'Option 2: အပြင် ဝတ်စုံပုံ တင်မည်' : 'Option 2: Upload Garment'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 🌟 3 OPTIONS FOR IMG2IMG MODE (ရည်ညွှန်းပုံထည့် ကဏ္ဍ နည်းလမ်း ၃ မျိုး) */}
      {(currentMode === 'img2img' || !currentMode) && (
        <div className="space-y-3 rounded-2xl bg-slate-950/90 border border-cyan-500/60 p-3.5 shadow-xl">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-xs font-extrabold text-cyan-200">
                {isMyanmar ? 'ရည်ညွှန်းပုံ (Img2Img) ပြောင်းလဲမှု မုဒ် (၃) မျိုး:' : 'Img2Img Transformation Options (3 Modes):'}
              </span>
            </div>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 font-bold px-2.5 py-0.5 rounded-full border border-cyan-700">
              {(selection.img2imgOption || 'app_custom') === 'app_custom'
                ? 'Option 1 Selected'
                : selection.img2imgOption === 'bg_only'
                ? 'Option 2 Selected'
                : 'Option 3 Selected'}
            </span>
          </div>

          {/* 3 Option Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {/* OPTION 1 */}
            <button
              type="button"
              onClick={() => onUpdateSelection({ img2imgOption: 'app_custom' })}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                (selection.img2imgOption || 'app_custom') === 'app_custom'
                  ? 'bg-gradient-to-b from-cyan-950/90 to-slate-900 border-cyan-400 text-cyan-100 shadow-lg ring-1 ring-cyan-400/60 scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-cyan-300">
                <span>✨</span>
                <span>{isMyanmar ? 'Option 1: App အတွင်း ရွေးချယ်မည်' : 'Option 1: Custom App'}</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {isMyanmar
                  ? 'မူရင်း လူပုံ ကို appထဲက နေ စိတ်ကြိုက် အဝတ်အစား မိတ်ကက် နောက်ခံ ရွေးချယ်ပြောင်းတာ'
                  : 'Original person face 100% matched + custom outfit, makeup, background chosen inside app.'}
              </p>
            </button>

            {/* OPTION 2 */}
            <button
              type="button"
              onClick={() => onUpdateSelection({ img2imgOption: 'bg_only', preserveSubject100Percent: true })}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                selection.img2imgOption === 'bg_only'
                  ? 'bg-gradient-to-b from-amber-950/90 to-slate-900 border-amber-400 text-amber-100 shadow-lg ring-1 ring-amber-400/60 scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-amber-300">
                <span>🖼️</span>
                <span>{isMyanmar ? 'Option 2: နောက်ခံ သီးသန့်ပြောင်းမည်' : 'Option 2: Background Only'}</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {isMyanmar
                  ? 'မူရင်းလူပုံအတိုင်း ၁၀၀%တူ အဝတ်အစား pose style မပြောင်းဘဲ နောက်ခံ ရှူခင်းပြောင်းတာ'
                  : 'Keep person, outfit & pose 100% unchanged. Exclusively replace background scenery.'}
              </p>
            </button>

            {/* OPTION 3 */}
            <button
              type="button"
              onClick={() => onUpdateSelection({ img2imgOption: 'style_transfer' })}
              className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                selection.img2imgOption === 'style_transfer'
                  ? 'bg-gradient-to-b from-purple-950/90 to-slate-900 border-purple-400 text-purple-100 shadow-lg ring-1 ring-purple-400/60 scale-[1.01]'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold text-xs text-purple-300">
                <span>📸</span>
                <span>{isMyanmar ? 'Option 3: ဒုတိယပုံအတိုင်း ပြောင်းမည်' : 'Option 3: 2nd Photo Style'}</span>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {isMyanmar
                  ? 'မူရင်း ထည့်ပေးတဲ့လူပုံ မျက်နှာ ၁၀၀℅ တူ မပြောင်း နောက်ထပ်ထည့်ပေး တဲ့ ဓါတ်ပုံက pose style အဝတ်အစား နောက်ခံ အတိုင်းအတိအကျပြောင်းတာ'
                  : '100% face match from Photo 1 + copy Pose, Outfit & Background strictly from Photo 2.'}
              </p>
            </button>
          </div>
        </div>
      )}

      {/* 🔒 100% Subject Lock & Environment Upgrade Feature Box */}
      {currentMode !== 'clothes-swap' && (
        <SubjectPreserveFeatureBox
          selection={selection}
          onUpdateSelection={onUpdateSelection}
          isMyanmar={isMyanmar}
          currentMode={currentMode}
        />
      )}

      {/* Img2Img Usage Guide Banner */}
      {currentMode !== 'clothes-swap' && (
        <div className="rounded-xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-blue-950/80 border border-cyan-500/40 p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm">
            <span>🖼️</span>
            <h4>
              {isCouple
                ? isMyanmar
                  ? 'စုံတွဲ (Couple) ဓာတ်ပုံ တင်သွင်းရန် လမ်းညွှန်'
                  : 'Couple Photos Upload Guide'
                : isMyanmar
                ? 'ပုံမှတ်တမ်းနဲ့ ထုတ်ခြင်း (Img2Img) အသုံးပြုနည်း'
                : 'Img2Img Photo Guide'}
            </h4>
          </div>

          <div className="space-y-1.5 text-slate-300 pl-1">
            <p className="font-semibold text-cyan-200">
              📌 {isMyanmar ? 'Upload စဉ်လိုက်နာရမည့် အစဉ်အတိုင်း (Strict Sequence):' : 'Strict Sequence:'}
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
              {isCouple ? (
                <>
                  <li>
                    <strong className="text-white">အမျိုးသားပုံ (Male/Husband):</strong>{' '}
                    {isMyanmar ? 'ဘယ်ဘက်ကွက်တွင် အမျိုးသား မူရင်းဓာတ်ပုံ တင်ပါ။' : 'Upload male reference photo in left box.'}
                  </li>
                  <li>
                    <strong className="text-white">အမျိုးသမီးပုံ (Female/Wife):</strong>{' '}
                    {isMyanmar ? 'ညာဘက်ကွက်တွင် အမျိုးသမီး မူရင်းဓာတ်ပုံ တင်ပါ။' : 'Upload female reference photo in right box.'}
                  </li>
                </>
              ) : (
                <li>
                  <strong className="text-white">Image 1 (မူရင်းပုံ):</strong>{' '}
                  {isMyanmar
                    ? 'ပြောင်းလဲချင်တဲ့ လူ/အရာ၏ မူရင်းဓာတ်ပုံကို တင်ပါ။ (မျက်နှာ၊ ခန္ဓာကိုယ်၊ pose အားလုံးကို ထိန်းသိမ်းထားမည်)'
                    : 'Upload original person/subject image to retain identity and body shape.'}
                </li>
              )}
            </ol>
          </div>
        </div>
      )}

      {/* Main Upload Zone Section Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <ImageIcon className="h-4 w-4 text-cyan-400" />
          <h3 className="text-xs font-bold text-slate-100">
            {isCouple
              ? isMyanmar
                ? 'စုံတွဲ ဓာတ်ပုံ တင်သွင်းရန် (Couple Reference Photos)'
                : 'Couple Reference Photos (Male & Female)'
              : isMyanmar
              ? 'အခြေခံ ကိုးကား ဓာတ်ပုံ ထည့်သွင်းရန် (Reference Photo)'
              : 'Reference Image & Structure Weights'}
          </h3>
        </div>
        {!isCouple && selection.referenceImage && (
          <button
            type="button"
            onClick={removeSingleImage}
            className="flex items-center gap-1 text-[11px] text-pink-400 hover:text-pink-300 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            <span>{isMyanmar ? 'ဓာတ်ပုံ ပယ်ဖျက်မည်' : 'Remove Image'}</span>
          </button>
        )}
      </div>

      {/* CUSTOM GARMENT PHOTO UPLOAD (OPTION 2 IN CLOTHES SWAP MODE) vs OPTION 3 (STYLE TRANSFER) vs COUPLE MODE vs SINGLE MODE */}
      {currentMode === 'clothes-swap' && selection.clothesSwapOption === 'custom_garment_upload' ? (
        <CustomGarmentUploader
          language={language}
          selection={selection}
          onUpdateSelection={onUpdateSelection}
        />
      ) : (currentMode === 'img2img' || !currentMode) && selection.img2imgOption === 'style_transfer' ? (
        /* ------------------ OPTION 3: STYLE & POSE TRANSFER (2 UPLOAD BOXES) ------------------ */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* BOX 1: PERSON PHOTO (FACE LOCKED 100%) */}
          <div className="space-y-2 rounded-xl bg-slate-950/80 border border-cyan-500/50 p-3">
            <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">👤</span>
                <span className="text-xs font-bold text-cyan-300">
                  {isMyanmar ? '၁။ မူရင်း လူဓာတ်ပုံ (မျက်နှာ ၁၀၀% မပြောင်း)' : '1. Person Photo (Face Locked 100%)'}
                </span>
              </div>
              {selection.referenceImage && (
                <button
                  type="button"
                  onClick={removeSingleImage}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{isMyanmar ? 'ဖျက်မည်' : 'Remove'}</span>
                </button>
              )}
            </div>

            {loadingSlot === 'single' ? (
              <div className="h-44 rounded-lg bg-slate-900 flex flex-col items-center justify-center space-y-2 border border-slate-800">
                <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                <span className="text-xs text-slate-300">
                  {isMyanmar ? 'ဓာတ်ပုံ ဖတ်ရှုနေပါသည်...' : 'Processing photo...'}
                </span>
              </div>
            ) : selection.referenceImage && !errorSlots.single ? (
              <div className="relative rounded-lg overflow-hidden border border-cyan-500/50 bg-slate-900 p-2 text-center group">
                <img
                  src={selection.referenceImage}
                  alt="Person reference"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-contain rounded-md bg-slate-950"
                />
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-cyan-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{isMyanmar ? 'လူဓာတ်ပုံ တင်သွင်းပြီးပါပြီ' : 'Person photo loaded'}</span>
                  </span>
                  <label
                    htmlFor="single-file-input-reupload-opt3"
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Change'}</span>
                    <input
                      id="single-file-input-reupload-opt3"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                      onChange={handleSingleFileChange}
                      onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label
                htmlFor="single-file-input-dropzone-opt3"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'single')}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 bg-slate-900/50 hover:bg-slate-900/80 p-4 text-center cursor-pointer transition-all space-y-2 group h-44"
              >
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-300 leading-snug">
                  {isMyanmar ? '၁။ လူဓာတ်ပုံ တင်ရန် နှိပ်ပါ သို့မဟုတ် ဆွဲထည့်ပါ' : '1. Upload Person Photo'}
                </p>
                <p className="text-[10px] text-cyan-400/90 font-medium">
                  {isMyanmar ? 'မျက်နှာ ၁၀၀% အတိအကျ ထိန်းသိမ်းမည်' : '100% Face & Identity Lock'}
                </p>
                <input
                  id="single-file-input-dropzone-opt3"
                  ref={singleInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                  onChange={handleSingleFileChange}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* BOX 2: STYLE / POSE / OUTFIT / BG REFERENCE PHOTO */}
          <div className="space-y-2 rounded-xl bg-slate-950/80 border border-purple-500/50 p-3">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">📸</span>
                <span className="text-xs font-bold text-purple-300">
                  {isMyanmar ? '၂။ Pose၊ ဝတ်စုံ၊ နောက်ခံ ကူးယူမည့် ဓာတ်ပုံ' : '2. Style, Pose, Garment & BG Photo'}
                </span>
              </div>
              {selection.styleReferenceImage && (
                <button
                  type="button"
                  onClick={removeStyleRefImage}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{isMyanmar ? 'ဖျက်မည်' : 'Remove'}</span>
                </button>
              )}
            </div>

            {loadingSlot === 'styleRef' ? (
              <div className="h-44 rounded-lg bg-slate-900 flex flex-col items-center justify-center space-y-2 border border-slate-800">
                <Loader2 className="h-6 w-6 text-purple-400 animate-spin" />
                <span className="text-xs text-slate-300">
                  {isMyanmar ? 'ဓာတ်ပုံ ဖတ်ရှုနေပါသည်...' : 'Processing photo...'}
                </span>
              </div>
            ) : selection.styleReferenceImage && !errorSlots.styleRef ? (
              <div className="relative rounded-lg overflow-hidden border border-purple-500/50 bg-slate-900 p-2 text-center group">
                <img
                  src={selection.styleReferenceImage}
                  alt="Style reference"
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-contain rounded-md bg-slate-950"
                />
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-purple-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-purple-400" />
                    <span>{isMyanmar ? 'စတိုင်လ် ဓာတ်ပုံ တင်သွင်းပြီးပါပြီ' : 'Style photo loaded'}</span>
                  </span>
                  <label
                    htmlFor="styleref-file-input-reupload"
                    className="text-purple-400 hover:underline flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Change'}</span>
                    <input
                      id="styleref-file-input-reupload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                      onChange={handleStyleRefFileChange}
                      onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label
                htmlFor="styleref-file-input-dropzone"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'styleRef')}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-purple-500/40 hover:border-purple-400 bg-slate-900/50 hover:bg-slate-900/80 p-4 text-center cursor-pointer transition-all space-y-2 group h-44"
              >
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover:text-purple-400 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-300 leading-snug">
                  {isMyanmar ? '၂။ စတိုင်လ်/Pose/ဝတ်စုံပုံ တင်ရန် နှိပ်ပါ သို့မဟုတ် ဆွဲထည့်ပါ' : '2. Upload Style/Pose/Garment Photo'}
                </p>
                <p className="text-[10px] text-purple-400/90 font-medium">
                  {isMyanmar ? 'ဒီပုံအတိုင်း Pose, ဝတ်စုံ, နောက်ခံ အတိအကျ ကူးယူမည်' : 'Copy Pose, Outfit & BG'}
                </p>
                <input
                  id="styleref-file-input-dropzone"
                  ref={styleRefInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                  onChange={handleStyleRefFileChange}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  className="hidden"
                />
              </label>
            )}
          </div>

        </div>
      ) : isCouple ? (
        /* ------------------ 1. COUPLE MODE (2 BOXES) ------------------ */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* LEFT BOX: MALE / HUSBAND */}
          <div className="space-y-2 rounded-xl bg-slate-950/70 border border-slate-800 p-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">👨</span>
                <span className="text-xs font-bold text-cyan-300">
                  {isMyanmar ? 'အမျိုးသား ပုံတင်ရန်' : 'Male / Husband Photo'}
                </span>
              </div>
              {selection.referenceImageMale && (
                <button
                  type="button"
                  onClick={removeMaleImage}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                  title="Remove Male Photo"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{isMyanmar ? 'ဖျက်မည်' : 'Remove'}</span>
                </button>
              )}
            </div>

            {loadingSlot === 'male' ? (
              <div className="h-44 rounded-lg bg-slate-900 flex flex-col items-center justify-center space-y-2 border border-slate-800">
                <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
                <span className="text-xs text-slate-300">
                  {isMyanmar ? 'ဓာတ်ပုံ ဖတ်ရှုနေပါသည်...' : 'Processing photo...'}
                </span>
              </div>
            ) : selection.referenceImageMale && !errorSlots.male ? (
              <div className="relative rounded-lg overflow-hidden border border-cyan-500/50 bg-slate-900 p-2 text-center group">
                <img
                  src={selection.referenceImageMale}
                  alt="Male reference preview"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    console.warn('Male reference image failed to display');
                    setErrorSlots((prev) => ({ ...prev, male: true }));
                  }}
                  className="w-full h-44 object-contain rounded-md bg-slate-950"
                />
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-cyan-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>{isMyanmar ? 'အမျိုးသား ဓာတ်ပုံ တင်ပြီးပါပြီ' : 'Male photo loaded'}</span>
                  </span>
                  <label
                    htmlFor="male-file-input-reupload"
                    className="text-cyan-400 hover:underline flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Change'}</span>
                    <input
                      id="male-file-input-reupload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                      onChange={handleMaleFileChange}
                      onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : errorSlots.male ? (
              <div className="h-44 rounded-lg bg-rose-950/30 border border-rose-500/50 p-3 flex flex-col items-center justify-center text-center space-y-2">
                <AlertTriangle className="h-6 w-6 text-rose-400" />
                <p className="text-xs text-rose-200">
                  {isMyanmar ? 'ဓာတ်ပုံ ဖတ်၍ မရပါ (ပြန်လည် တင်သွင်းပါ)' : 'Failed to load photo'}
                </p>
                <label
                  htmlFor="male-file-input-error"
                  className="px-3 py-1 rounded bg-rose-900/80 text-rose-100 hover:bg-rose-800 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{isMyanmar ? 'ပြန်လည် တင်မည်' : 'Re-upload'}</span>
                  <input
                    id="male-file-input-error"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                    onChange={handleMaleFileChange}
                    onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label
                htmlFor="male-file-input-dropzone"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'male')}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-800 hover:border-cyan-500/80 bg-slate-900/50 hover:bg-slate-900/80 p-4 text-center cursor-pointer transition-all space-y-2 group h-44"
              >
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-300 leading-snug">
                  {isMyanmar ? 'ဓာတ်ပုံ တင်ရန် နှိပ်ပါ သို့မဟုတ် Drag & Drop ဆွဲထည့်ပါ' : 'Click or Drag & Drop photo here'}
                </p>
                <p className="text-[10px] text-slate-500">PNG, JPG, WEBP, HEIC</p>
                <input
                  id="male-file-input-dropzone"
                  ref={maleInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                  onChange={handleMaleFileChange}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* RIGHT BOX: FEMALE / WIFE */}
          <div className="space-y-2 rounded-xl bg-slate-950/70 border border-slate-800 p-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-base">👩</span>
                <span className="text-xs font-bold text-pink-300">
                  {isMyanmar ? 'အမျိုးသမီး ပုံတင်ရန်' : 'Female / Wife Photo'}
                </span>
              </div>
              {selection.referenceImageFemale && (
                <button
                  type="button"
                  onClick={removeFemaleImage}
                  className="flex items-center gap-1 text-[11px] text-rose-400 hover:text-rose-300 transition-colors"
                  title="Remove Female Photo"
                >
                  <X className="h-3.5 w-3.5" />
                  <span>{isMyanmar ? 'ဖျက်မည်' : 'Remove'}</span>
                </button>
              )}
            </div>

            {loadingSlot === 'female' ? (
              <div className="h-44 rounded-lg bg-slate-900 flex flex-col items-center justify-center space-y-2 border border-slate-800">
                <Loader2 className="h-6 w-6 text-pink-400 animate-spin" />
                <span className="text-xs text-slate-300">
                  {isMyanmar ? 'ဓာတ်ပုံ ဖတ်ရှုနေပါသည်...' : 'Processing photo...'}
                </span>
              </div>
            ) : selection.referenceImageFemale && !errorSlots.female ? (
              <div className="relative rounded-lg overflow-hidden border border-pink-500/50 bg-slate-900 p-2 text-center group">
                <img
                  src={selection.referenceImageFemale}
                  alt="Female reference preview"
                  referrerPolicy="no-referrer"
                  onError={() => {
                    console.warn('Female reference image failed to display');
                    setErrorSlots((prev) => ({ ...prev, female: true }));
                  }}
                  className="w-full h-44 object-contain rounded-md bg-slate-950"
                />
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-pink-300 font-medium flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5 text-pink-400" />
                    <span>{isMyanmar ? 'အမျိုးသမီး ဓာတ်ပုံ တင်ပြီးပါပြီ' : 'Female photo loaded'}</span>
                  </span>
                  <label
                    htmlFor="female-file-input-reupload"
                    className="text-pink-400 hover:underline flex items-center gap-1 text-[10px] cursor-pointer"
                  >
                    <RefreshCw className="h-3 w-3" />
                    <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Change'}</span>
                    <input
                      id="female-file-input-reupload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                      onChange={handleFemaleFileChange}
                      onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            ) : errorSlots.female ? (
              <div className="h-44 rounded-lg bg-rose-950/30 border border-rose-500/50 p-3 flex flex-col items-center justify-center text-center space-y-2">
                <AlertTriangle className="h-6 w-6 text-rose-400" />
                <p className="text-xs text-rose-200">
                  {isMyanmar ? 'ဓာတ်ပုံ ဖတ်၍ မရပါ (ပြန်လည် တင်သွင်းပါ)' : 'Failed to load photo'}
                </p>
                <label
                  htmlFor="female-file-input-error"
                  className="px-3 py-1 rounded bg-rose-900/80 text-rose-100 hover:bg-rose-800 text-xs flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{isMyanmar ? 'ပြန်လည် တင်မည်' : 'Re-upload'}</span>
                  <input
                    id="female-file-input-error"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                    onChange={handleFemaleFileChange}
                    onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label
                htmlFor="female-file-input-dropzone"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, 'female')}
                className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-800 hover:border-pink-500/80 bg-slate-900/50 hover:bg-slate-900/80 p-4 text-center cursor-pointer transition-all space-y-2 group h-44"
              >
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-slate-400 group-hover:text-pink-400 transition-colors">
                    <Upload className="h-5 w-5" />
                  </div>
                </div>
                <p className="text-xs font-bold text-slate-300 leading-snug">
                  {isMyanmar ? 'ဓာတ်ပုံ တင်ရန် နှိပ်ပါ သို့မဟုတ် Drag & Drop ဆွဲထည့်ပါ' : 'Click or Drag & Drop photo here'}
                </p>
                <p className="text-[10px] text-slate-500">PNG, JPG, WEBP, HEIC</p>
                <input
                  id="female-file-input-dropzone"
                  ref={femaleInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                  onChange={handleFemaleFileChange}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  className="hidden"
                />
              </label>
            )}
          </div>

        </div>
      ) : (
        /* ------------------ 2. SINGLE SUBJECT MODE (1 BOX) ------------------ */
        loadingSlot === 'single' ? (
          <div className="h-48 rounded-xl bg-slate-950 flex flex-col items-center justify-center space-y-2 border border-slate-800">
            <Loader2 className="h-8 w-8 text-cyan-400 animate-spin" />
            <span className="text-xs text-slate-300">
              {isMyanmar ? 'ဓာတ်ပုံ ဖတ်ရှုနေပါသည်...' : 'Processing photo...'}
            </span>
          </div>
        ) : selection.referenceImage && !errorSlots.single ? (
          <div className="relative rounded-xl overflow-hidden border border-cyan-500/50 bg-slate-950 p-2 text-center group">
            <img
              src={selection.referenceImage}
              alt="Reference preview"
              referrerPolicy="no-referrer"
              onError={() => {
                console.warn('Single reference image failed to display');
                setErrorSlots((prev) => ({ ...prev, single: true }));
              }}
              className="w-full h-48 object-contain rounded-lg bg-slate-900"
            />
            <div className="mt-2 flex items-center justify-between px-2 text-[11px]">
              <span className="text-cyan-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                <span>{isMyanmar ? 'ကိုးကား ဓာတ်ပုံ တင်သွင်းပြီးပါပြီ' : 'Reference photo loaded'}</span>
              </span>
              <label
                htmlFor="single-file-input-reupload"
                className="text-cyan-400 hover:underline flex items-center gap-1 text-[11px] cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                <span>{isMyanmar ? 'ပုံပြောင်းမည်' : 'Change Photo'}</span>
                <input
                  id="single-file-input-reupload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                  onChange={handleSingleFileChange}
                  onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ) : errorSlots.single ? (
          <div className="h-48 rounded-xl bg-rose-950/30 border border-rose-500/50 p-4 flex flex-col items-center justify-center text-center space-y-2">
            <AlertTriangle className="h-8 w-8 text-rose-400" />
            <p className="text-xs text-rose-200">
              {isMyanmar ? 'ဓာတ်ပုံ ဖတ်၍ မရပါ (ပြန်လည် တင်သွင်းပါ)' : 'Failed to load reference image'}
            </p>
            <label
              htmlFor="single-file-input-error"
              className="px-4 py-1.5 rounded bg-rose-900/80 text-rose-100 hover:bg-rose-800 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>{isMyanmar ? 'ပြန်လည် တင်မည်' : 'Re-upload Image'}</span>
              <input
                id="single-file-input-error"
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                onChange={handleSingleFileChange}
                onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                className="hidden"
              />
            </label>
          </div>
        ) : (
          <label
            htmlFor="single-file-input-dropzone"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, 'single')}
            className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-800 hover:border-cyan-500/80 bg-slate-950/60 p-5 text-center cursor-pointer transition-all space-y-2 group h-48"
          >
            <div className="flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-slate-400 group-hover:text-cyan-400 group-hover:bg-slate-800 transition-colors">
                <Upload className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs font-bold text-slate-300">
              {isMyanmar ? 'ဓာတ်ပုံ တင်ရန် ဤနေရာတွင် နှိပ်ပါ သို့မဟုတ် Drag & Drop ဆွဲထည့်ပါ' : 'Click or Drag & Drop photo here'}
            </p>
            <p className="text-[10px] text-slate-500">PNG, JPG, WEBP, HEIC up to 20MB</p>
            <input
              id="single-file-input-dropzone"
              ref={singleInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
              onChange={handleSingleFileChange}
              onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
              className="hidden"
            />
          </label>
        )
      )}

      {/* Preset sample pictures */}
      {!isCouple && !selection.referenceImage && (
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-400">
            {isMyanmar ? 'သို့မဟုတ် နမူနာ ဓာတ်ပုံ ရွေးချယ်ပါ:' : 'Or pick a sample reference photo:'}
          </span>
          <div className="grid grid-cols-3 gap-2">
            {SINGLE_SAMPLE_REFERENCES.map((sample) => (
              <div
                key={sample.id}
                onClick={() => {
                  setErrorSlots((prev) => ({ ...prev, single: false }));
                  onUpdateSelection({ referenceImage: sample.url });
                }}
                className="relative rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-500 cursor-pointer group transition-all"
              >
                <img
                  src={sample.url}
                  alt={sample.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-16 object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Couple preset sample pictures if couple mode */}
      {isCouple && (!selection.referenceImageMale || !selection.referenceImageFemale) && (
        <div className="space-y-1.5">
          <span className="text-[11px] text-slate-400">
            {isMyanmar ? 'သို့မဟုတ် စုံတွဲ နမူနာ ဓာတ်ပုံ ရွေးချယ်ပါ:' : 'Or load sample couple photos:'}
          </span>
          <div className="flex gap-2">
            {COUPLE_SAMPLE_REFERENCES.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  setErrorSlots({ male: false, female: false });
                  onUpdateSelection({
                    referenceImageMale: sample.maleUrl,
                    referenceImageFemale: sample.femaleUrl,
                    referenceImage: sample.maleUrl
                  });
                }}
                className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/80 bg-slate-950 text-xs text-slate-300 hover:text-cyan-300 transition-all flex items-center gap-1.5"
              >
                <span>👩‍❤️‍👨</span>
                <span>{isMyanmar ? 'စုံတွဲ နမူနာ ပုံများ ထည့်မည်' : 'Load Couple Samples'}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sliders for structure strength and prompt weight */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
        
        {/* Structure Strength Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold">
              {isMyanmar ? 'မူလ ပုံသဏ္ဌာန် ထိန်းသိမ်းမှု:' : 'Structure Strength:'}
            </span>
            <span className="text-cyan-400 font-mono font-bold">
              {Math.round((selection.styleStrength || 0.75) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={selection.styleStrength || 0.75}
            onChange={(e) => onUpdateSelection({ styleStrength: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
          />
        </div>

        {/* Prompt Weight Slider */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-300 font-semibold">
              {isMyanmar ? 'Prompt စာသား လွှမ်းမိုးမှု:' : 'Prompt Influence:'}
            </span>
            <span className="text-pink-400 font-mono font-bold">
              {Math.round((selection.promptWeight || 0.8) * 100)}%
            </span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={selection.promptWeight || 0.8}
            onChange={(e) => onUpdateSelection({ promptWeight: parseFloat(e.target.value) })}
            className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-pink-500"
          />
        </div>

      </div>
        </>
      )}

    </div>
  );
};
