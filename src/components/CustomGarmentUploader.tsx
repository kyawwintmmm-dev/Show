import React, { useRef, useState } from 'react';
import { Language, MatrixSelection } from '../types';
import { Upload, X, Loader2, RefreshCw, CheckCircle2, Shirt, UserCheck, Sparkles, Check, ListChecks } from 'lucide-react';

interface CustomGarmentUploaderProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

// Guaranteed Base64 Data URL processor (No blob URLs)
const processFileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    if (!file) {
      resolve('');
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => {
      resolve('');
    };
    reader.onload = (event) => {
      const rawDataUrl = event.target?.result as string;
      if (!rawDataUrl || !rawDataUrl.startsWith('data:image/')) {
        resolve('');
        return;
      }

      const img = new Image();
      img.onerror = () => resolve(rawDataUrl); // rawDataUrl is already base64 data URL
      img.onload = () => {
        try {
          const MAX_DIM = 1200;
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
            if (compressed && compressed.startsWith('data:image/')) {
              resolve(compressed);
              return;
            }
          }
        } catch {
          // fallback to raw base64
        }
        resolve(rawDataUrl);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
};

const FABRIC_OPTIONS = [
  { labelMm: 'ပိုးထည် (Silk)', labelEn: 'Pure Silk', val: 'pure woven silk with golden shimmer' },
  { labelMm: 'ချည်ထည် (Cotton)', labelEn: 'Fine Cotton', val: 'soft breathable fine cotton' },
  { labelMm: 'ပါတက်ဇာ (Lace)', labelEn: 'Ornate Lace', val: 'intricate delicate lace trim' },
  { labelMm: 'Velvet (ကတ္တီပါ)', labelEn: 'Heavy Velvet', val: 'luxurious heavy plush velvet' },
  { labelMm: 'Chiffon (ဇာပျော့)', labelEn: 'Flowing Chiffon', val: 'lightweight flowing chiffon fabric' },
  { labelMm: 'ချိတ်အထည် (Woven Brocade)', labelEn: 'Royal Brocade', val: 'traditional royal woven silk brocade' },
  { labelMm: 'Satin (ပြောင်လက်)', labelEn: 'Satin Silk', val: 'glossy smooth satin finish' },
];

const FIT_OPTIONS = [
  { labelMm: 'ခန္ဓာကိုယ်အချိုးကျ (Fitted / Body-Hugging)', val: 'tailored body-hugging fit' },
  { labelMm: 'ပွပွချောင်ချောင် (Loose & Flowing)', val: 'relaxed loose flowing fit' },
  { labelMm: 'ကြော့ရှင်း စတိုင်လ် (Structured Elegant)', val: 'structured elegant fit with regal posture' },
];

const LENGTH_OPTIONS = [
  { labelMm: 'တစ်ကိုယ်လုံးအရှည် (Full-Length Maxi)', val: 'full-length floor-sweeping maxi dress' },
  { labelMm: 'ဒူးအောက်အရှည် (Midi Length)', val: 'elegant midi length below knees' },
  { labelMm: 'အကျီအပု (Short Top & Longyi)', val: 'traditional short top blouse with longyi' },
];

export const CustomGarmentUploader: React.FC<CustomGarmentUploaderProps> = ({
  language,
  selection,
  onUpdateSelection
}) => {
  const isMyanmar = language === 'my';

  const [loadingSlot, setLoadingSlot] = useState<'person' | 'garment' | null>(null);
  const [errorSlots, setErrorSlots] = useState<{ person?: boolean; garment?: boolean }>({});

  const personInputRef = useRef<HTMLInputElement>(null);
  const garmentInputRef = useRef<HTMLInputElement>(null);

  const handlePersonFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoadingSlot('person');
      setErrorSlots((prev) => ({ ...prev, person: false }));
      const url = await processFileToDataUrl(file);
      if (url) {
        onUpdateSelection({ referenceImage: url });
      } else {
        setErrorSlots((prev) => ({ ...prev, person: true }));
      }
      setLoadingSlot(null);
    }
  };

  const handleGarmentFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoadingSlot('garment');
      setErrorSlots((prev) => ({ ...prev, garment: false }));
      const url = await processFileToDataUrl(file);
      if (url) {
        onUpdateSelection({ customGarmentImage: url });
      } else {
        setErrorSlots((prev) => ({ ...prev, garment: true }));
      }
      setLoadingSlot(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropPerson = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setLoadingSlot('person');
      setErrorSlots((prev) => ({ ...prev, person: false }));
      const url = await processFileToDataUrl(file);
      if (url) onUpdateSelection({ referenceImage: url });
      else setErrorSlots((prev) => ({ ...prev, person: true }));
      setLoadingSlot(null);
    }
  };

  const handleDropGarment = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setLoadingSlot('garment');
      setErrorSlots((prev) => ({ ...prev, garment: false }));
      const url = await processFileToDataUrl(file);
      if (url) onUpdateSelection({ customGarmentImage: url });
      else setErrorSlots((prev) => ({ ...prev, garment: true }));
      setLoadingSlot(null);
    }
  };

  // Helper to append detail checklist terms to customGarmentDescription
  const handleAppendDetail = (detailText: string) => {
    const current = selection.customGarmentDescription || selection.garmentFabric || '';
    if (current.includes(detailText)) return; // Avoid duplicates
    const updated = current ? `${current}, ${detailText}` : detailText;
    onUpdateSelection({
      customGarmentDescription: updated,
      garmentFabric: updated
    });
  };

  return (
    <div className="space-y-4 rounded-2xl bg-slate-950/90 border border-orange-500/50 p-4 shadow-xl">
      
      {/* Header Banner for Clothes Swap Option 2 */}
      <div className="rounded-xl bg-gradient-to-r from-orange-950/90 via-amber-950/80 to-rose-950/90 border border-orange-500/60 p-3.5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-extrabold text-amber-300">
          <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
          <span>
            {isMyanmar
              ? 'Option 2: မူရင်းလူပုံ (Image 1) + အပြင်မှ ဝတ်စုံပုံ (Image 2) ပေါင်းစပ်လဲလှယ်မှု'
              : 'Option 2: Primary Subject (Image 1) + Garment Reference (Image 2)'}
          </span>
        </div>
        <p className="text-[11px] text-amber-100/90 leading-relaxed font-medium">
          {isMyanmar
            ? '💡 Strict Sequence Logic: Image 1 မှ မျက်နှာ၊ ခန္ဓာကိုယ်၊ ကိုယ်ဟန် (Pose)၊ အသားအရောင်၊ အမူအရာ အားလုံးကို ၁၀၀% အတိအကျ ထိန်းသိမ်းပြီး Image 2 မှ ဝတ်စုံ/အထည် ဒီဇိုင်း၊ အရောင်၊ အဆင်၊ အထည်အလိပ်များကို လဲလှယ် တပ်ဆင်ပေးပါမည်။'
            : '💡 Strict Sequence Logic: Keeps Image 1 face, body shape, pose, skin tone & expression 100% locked while swapping clothing to match Image 2 outfit design, color, fabric & pattern.'}
        </p>
      </div>

      {/* Two Upload Slots Side by Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        
        {/* SLOT 1: Primary Subject (Image 1) */}
        <div className="space-y-2 rounded-xl bg-slate-900/90 border border-cyan-500/50 p-3 shadow-md">
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-2">
            <div className="flex items-center gap-1.5">
              <UserCheck className="h-4 w-4 text-cyan-400 shrink-0" />
              <span className="text-xs font-extrabold text-cyan-200">
                {isMyanmar ? '၁။ မူရင်း လူဓာတ်ပုံ (Image 1)' : '1. Primary Person (Image 1)'}
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

          <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-[10px] text-cyan-300 font-semibold leading-tight">
            <span>🔒 Face, body shape, pose, skin tone & expression locked 100%</span>
          </div>

          {loadingSlot === 'person' ? (
            <div className="h-40 rounded-lg bg-slate-950 flex flex-col items-center justify-center space-y-1.5 border border-slate-800">
              <Loader2 className="h-6 w-6 text-cyan-400 animate-spin" />
              <span className="text-[11px] text-slate-300">{isMyanmar ? 'ဖတ်ရှုနေပါသည်...' : 'Processing Image 1...'}</span>
            </div>
          ) : selection.referenceImage && !errorSlots.person ? (
            <div className="relative rounded-lg overflow-hidden border border-cyan-500/50 bg-slate-950 p-1.5 text-center">
              <img
                src={selection.referenceImage}
                alt="Primary Person Image 1"
                referrerPolicy="no-referrer"
                onError={() => setErrorSlots((prev) => ({ ...prev, person: true }))}
                className="w-full h-40 object-contain rounded bg-slate-900"
              />
              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className="text-cyan-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{isMyanmar ? 'Image 1 လူပုံ တင်ပြီးပါပြီ' : 'Image 1 Person loaded'}</span>
                </span>
                <label className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer">
                  <RefreshCw className="h-3 w-3" />
                  <span>{isMyanmar ? 'ပြောင်းမည်' : 'Change'}</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                    onChange={handlePersonFileChange}
                    onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <label
              onDragOver={handleDragOver}
              onDrop={handleDropPerson}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-cyan-500/50 hover:border-cyan-400 bg-slate-950/80 hover:bg-slate-900/90 p-3 text-center cursor-pointer transition-all space-y-1.5 h-40"
            >
              <div className="p-2 rounded-xl bg-cyan-950/80 text-cyan-400">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-slate-200">
                {isMyanmar ? ' Image 1 မူရင်း လူဓာတ်ပုံ တင်ရန်' : 'Upload Image 1 Person Photo'}
              </p>
              <p className="text-[10px] text-cyan-300 font-medium">PNG, JPG, WEBP, HEIC</p>
              <input
                ref={personInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                onChange={handlePersonFileChange}
                onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* SLOT 2: Clothing Reference (Image 2) */}
        <div className="space-y-2 rounded-xl bg-slate-900/90 border border-orange-500/50 p-3 shadow-md">
          <div className="flex items-center justify-between border-b border-orange-500/30 pb-2">
            <div className="flex items-center gap-1.5">
              <Shirt className="h-4 w-4 text-orange-400 shrink-0" />
              <span className="text-xs font-extrabold text-orange-200">
                {isMyanmar ? '၂။ ဝတ်စုံ/အထည် ဓာတ်ပုံ (Image 2)' : '2. Clothing Reference (Image 2)'}
              </span>
            </div>
            {selection.customGarmentImage && (
              <button
                type="button"
                onClick={() => onUpdateSelection({ customGarmentImage: null })}
                className="text-rose-400 hover:text-rose-300 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
                <span>{isMyanmar ? 'ဖျက်မည်' : 'Remove'}</span>
              </button>
            )}
          </div>

          <div className="p-1.5 rounded-lg bg-orange-950/60 border border-orange-500/30 text-[10px] text-orange-300 font-semibold leading-tight">
            <span>👗 Copy outfit, color, fabric, pattern & fit from Image 2</span>
          </div>

          {loadingSlot === 'garment' ? (
            <div className="h-40 rounded-lg bg-slate-950 flex flex-col items-center justify-center space-y-1.5 border border-slate-800">
              <Loader2 className="h-6 w-6 text-orange-400 animate-spin" />
              <span className="text-[11px] text-slate-300">{isMyanmar ? 'ဖတ်ရှုနေပါသည်...' : 'Processing Image 2...'}</span>
            </div>
          ) : selection.customGarmentImage && !errorSlots.garment ? (
            <div className="relative rounded-lg overflow-hidden border border-orange-500/50 bg-slate-950 p-1.5 text-center">
              <img
                src={selection.customGarmentImage}
                alt="Custom Garment Image 2"
                referrerPolicy="no-referrer"
                onError={() => setErrorSlots((prev) => ({ ...prev, garment: true }))}
                className="w-full h-40 object-contain rounded bg-slate-900"
              />
              <div className="mt-1.5 flex items-center justify-between text-[10px]">
                <span className="text-orange-300 font-bold flex items-center gap-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-400" />
                  <span>{isMyanmar ? 'Image 2 ဝတ်စုံပုံ တင်ပြီးပါပြီ' : 'Image 2 Garment loaded'}</span>
                </span>
                <label className="text-orange-400 hover:underline flex items-center gap-1 cursor-pointer">
                  <RefreshCw className="h-3 w-3" />
                  <span>{isMyanmar ? 'ပြောင်းမည်' : 'Change'}</span>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                    onChange={handleGarmentFileChange}
                    onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          ) : (
            <label
              onDragOver={handleDragOver}
              onDrop={handleDropGarment}
              className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-orange-500/50 hover:border-orange-400 bg-slate-950/80 hover:bg-slate-900/90 p-3 text-center cursor-pointer transition-all space-y-1.5 h-40"
            >
              <div className="p-2 rounded-xl bg-orange-950/80 text-orange-400">
                <Upload className="h-5 w-5" />
              </div>
              <p className="text-xs font-bold text-slate-200">
                {isMyanmar ? '👗 Image 2 အပြင် ဝတ်စုံ ဓာတ်ပုံ တင်ရန်' : 'Upload Image 2 Garment Photo'}
              </p>
              <p className="text-[10px] text-orange-300 font-medium">PNG, JPG, WEBP, HEIC</p>
              <input
                ref={garmentInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp, image/heic, image/heif, image/*"
                onChange={handleGarmentFileChange}
                onClick={(e) => { (e.target as HTMLInputElement).value = ''; }}
                className="hidden"
              />
            </label>
          )}
        </div>

      </div>

      {/* 📋 Clothing Detail Checklist & Fabric Specifier */}
      <div className="space-y-3 rounded-xl bg-slate-900/90 border border-amber-500/40 p-3.5 text-xs">
        <div className="flex items-center gap-2 text-amber-300 font-bold border-b border-amber-500/20 pb-1.5">
          <ListChecks className="h-4 w-4 text-amber-400 shrink-0" />
          <span>
            {isMyanmar
              ? 'ဝတ်စုံ အသေးစိတ် စစ်ဆေးချက် စာရင်း (Clothing Detail Checklist):'
              : 'Clothing Detail Checklist & Fabric Specs:'}
          </span>
        </div>

        {/* Quick Tag Pills for Fabric, Fit, and Length */}
        <div className="space-y-2">
          {/* Fabric Type */}
          <div className="space-y-1">
            <span className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">
              {isMyanmar ? 'အထည်အလိပ် အမျိုးအစား (Fabric Type):' : 'Fabric Type:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FABRIC_OPTIONS.map((fab) => (
                <button
                  key={fab.val}
                  type="button"
                  onClick={() => handleAppendDetail(fab.val)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-950 border border-amber-500/30 text-amber-200 hover:bg-amber-950/80 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>+</span>
                  <span>{isMyanmar ? fab.labelMm : fab.labelEn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fit & Style */}
          <div className="space-y-1">
            <span className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">
              {isMyanmar ? 'ပုံစံနှင့် ခန္ဓာကိုယ်အချိုးကျမှု (Fit & Style):' : 'Fit & Style:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {FIT_OPTIONS.map((fit) => (
                <button
                  key={fit.val}
                  type="button"
                  onClick={() => handleAppendDetail(fit.val)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-950 border border-orange-500/30 text-orange-200 hover:bg-orange-950/80 hover:border-orange-400 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>+</span>
                  <span>{fit.labelMm}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Length */}
          <div className="space-y-1">
            <span className="text-[10px] text-amber-200/80 font-bold uppercase tracking-wider">
              {isMyanmar ? 'အလျားနှင့် အတိုင်းအတာ (Length):' : 'Length:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {LENGTH_OPTIONS.map((len) => (
                <button
                  key={len.val}
                  type="button"
                  onClick={() => handleAppendDetail(len.val)}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-950 border border-rose-500/30 text-rose-200 hover:bg-rose-950/80 hover:border-rose-400 transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>+</span>
                  <span>{len.labelMm}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Text Field */}
        <div className="space-y-1 pt-1">
          <span className="text-[11px] font-bold text-amber-300">
            {isMyanmar ? 'ဝတ်စုံ/အထည် အသေးစိတ် ဖော်ပြချက် စာသား:' : 'Custom Garment Details & Description:'}
          </span>
          <input
            type="text"
            placeholder={
              isMyanmar
                ? "ဥပမာ- ရိုးရာ ရွှေချိတ် အနီရောင် ပါတက်ဇာ အကျီ၊ ပိုးထမီ၊ Velvet အနက်ရောင် ဝတ်စုံ..."
                : "e.g. Traditional Golden Silk Longyi, Red Velvet Suit, Royal Embroidery..."
            }
            value={selection.customGarmentDescription || selection.garmentFabric || ''}
            onChange={(e) =>
              onUpdateSelection({
                customGarmentDescription: e.target.value,
                garmentFabric: e.target.value
              })
            }
            className="w-full rounded-xl bg-slate-950 border border-slate-700 px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

    </div>
  );
};

