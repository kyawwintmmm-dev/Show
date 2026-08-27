import React, { useState, useEffect } from 'react';
import { Language, PromptResult } from '../types';
import { StorageService } from '../utils/storageService';
import { Copy, Check, Sparkles, Download, Eye, Zap, Home, Bot, ExternalLink, RefreshCw, Languages, Edit3, ArrowDown, Star } from 'lucide-react';

interface PromptOutputCardProps {
  language: Language;
  promptResult: PromptResult | null;
  isGeneratingPrompt: boolean;
  onGenerateImage: () => void;
  isGeneratingImage: boolean;
  onResetAll?: () => void;
}

export const PromptOutputCard: React.FC<PromptOutputCardProps> = ({
  language,
  promptResult,
  isGeneratingPrompt,
  onGenerateImage,
  isGeneratingImage,
}) => {
  const isMyanmar = language === 'my';
  const [selectedTool, setSelectedTool] = useState<'gemini' | 'chatgpt' | 'photoshop'>('gemini');
  const [activeFormat, setActiveFormat] = useState<'midjourney' | 'flux' | 'sdxl' | 'master'>('midjourney');
  
  // Translation & Interactive Editing States
  const [originalPromptText, setOriginalPromptText] = useState<string>('');
  const [myanmarText, setMyanmarText] = useState<string>('');
  const [finalEnglishPrompt, setFinalEnglishPrompt] = useState<string>('');
  const [isTranslatingToMm, setIsTranslatingToMm] = useState<boolean>(false);
  const [isConvertingToEn, setIsConvertingToEn] = useState<boolean>(false);
  
  // Copy states
  const [copiedOriginal, setCopiedOriginal] = useState<boolean>(false);
  const [copiedPositive, setCopiedPositive] = useState<boolean>(false);
  const [copiedFinal, setCopiedFinal] = useState<boolean>(false);
  const [copiedNegative, setCopiedNegative] = useState<boolean>(false);
  const [copiedCamera, setCopiedCamera] = useState<boolean>(false);
  const [copiedFullPackage, setCopiedFullPackage] = useState<boolean>(false);
  const [copiedPlatform, setCopiedPlatform] = useState<'gemini' | 'chatgpt' | 'combined' | null>(null);
  const [includeBundleDetails, setIncludeBundleDetails] = useState<boolean>(true);
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);

  // Helper to dynamically resolve the latest prompt text
  const getLatestFinalPrompt = () => {
    if (finalEnglishPrompt && finalEnglishPrompt.trim().length > 0) {
      return finalEnglishPrompt.trim();
    }
    if (originalPromptText && originalPromptText.trim().length > 0) {
      return originalPromptText.trim();
    }
    return formattedPrompt || promptResult?.masterPrompt || '';
  };

  // Helper to format full complete prompt package (Master Prompt + Negative Prompt + Camera Specifications)
  const buildCompletePromptPackage = (mainText: string) => {
    const parts: string[] = [];
    parts.push(`[MASTER PROMPT]\n${mainText.trim()}`);

    if (promptResult?.negativePrompt) {
      parts.push(`[NEGATIVE PROMPT (ရှောင်ရှားရမည့်အချက်များ)]\n${promptResult.negativePrompt.trim()}`);
    }

    if (promptResult?.cameraNotes) {
      parts.push(`[CAMERA & OPTICS SPECIFICATIONS (ကင်မရာနှင့် မှန်ဘီလူး ဆက်တင်များ)]\n${promptResult.cameraNotes.trim()}`);
    }

    return parts.join('\n\n');
  };

  const getPromptTextToCopy = (baseText: string) => {
    if (includeBundleDetails) {
      return buildCompletePromptPackage(baseText);
    }
    return baseText;
  };

  // Helper to build formatted base prompt with guaranteed Aspect Ratio
  const getFormattedPromptText = () => {
    if (!promptResult) return '';
    const ratio = promptResult.aspectRatio || '9:16';
    const arTag = `--ar ${ratio}`;

    // Select base text according to activeFormat
    let rawPrompt = promptResult.masterPrompt;
    if (activeFormat === 'midjourney' && promptResult.midjourneyFormat) {
      rawPrompt = promptResult.midjourneyFormat;
    } else if (activeFormat === 'flux' && promptResult.fluxFormat) {
      rawPrompt = promptResult.fluxFormat;
    } else if (activeFormat === 'sdxl' && promptResult.sdxlFormat) {
      rawPrompt = promptResult.sdxlFormat;
    }

    // Guarantee aspect ratio is in rawPrompt
    if (rawPrompt && !rawPrompt.includes('--ar') && !rawPrompt.includes('aspect ratio')) {
      rawPrompt = `${rawPrompt.trim()} ${arTag}`;
    }

    switch (selectedTool) {
      case 'gemini':
        return `[Google Gemini 3.6 / Imagen 3 Optimized - Aspect Ratio: ${ratio}]
${rawPrompt}
--quality ultra_detailed --lighting studio_volumetric --skin_texture 8k_pores`;

      case 'chatgpt':
        return `[ChatGPT & DALL-E 3 Optimized - Aspect Ratio: ${ratio}]
A photorealistic 8K cinematic portrait featuring: ${rawPrompt}. Please render in aspect ratio ${ratio} with rich authentic skin pores, volumetric ambient lighting, realistic optical depth of field, and natural film color grading.`;

      case 'photoshop':
        return `[Adobe Photoshop Generative Fill & Firefly - Aspect Ratio: ${ratio}]
${rawPrompt}, aspect ratio ${ratio}, ultra-high resolution photography layer, natural lighting blending, professional retouching finish, matching environment background.`;

      default:
        return rawPrompt;
    }
  };

  const formattedPrompt = getFormattedPromptText();

  // Sync states when promptResult, selected tool or active format changes
  useEffect(() => {
    if (promptResult) {
      const currentFormatted = getFormattedPromptText();
      setOriginalPromptText(currentFormatted);
      setFinalEnglishPrompt(currentFormatted);
      if (promptResult.descriptionMm) {
        setMyanmarText(promptResult.descriptionMm);
      }
    }
  }, [promptResult, selectedTool, activeFormat]);

  // Translate Original English Prompt -> Myanmar
  const handleTranslateToMyanmar = async () => {
    const textToTranslate = originalPromptText || formattedPrompt || promptResult?.masterPrompt;
    if (!textToTranslate) return;

    setIsTranslatingToMm(true);
    try {
      const response = await fetch('/api/translate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'to_myanmar',
          text: textToTranslate,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }
      const data = await response.json();
      if (data && data.success && data.translatedText) {
        setMyanmarText(data.translatedText);
      } else if (promptResult?.descriptionMm) {
        setMyanmarText(promptResult.descriptionMm);
      }
    } catch (err) {
      console.warn('Error translating to Myanmar:', err);
      if (promptResult?.descriptionMm) {
        setMyanmarText(promptResult.descriptionMm);
      }
    } finally {
      setIsTranslatingToMm(false);
    }
  };

  // Convert Edited Myanmar Text -> High Quality English Prompt
  const handleConvertToEnglish = async () => {
    if (!myanmarText.trim()) return;

    setIsConvertingToEn(true);
    try {
      const response = await fetch('/api/translate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'to_english',
          text: myanmarText,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }
      const data = await response.json();
      if (data && data.success && data.translatedText) {
        setFinalEnglishPrompt(data.translatedText);
      }
    } catch (err) {
      console.warn('Error converting to English:', err);
    } finally {
      setIsConvertingToEn(false);
    }
  };

  // Copy Original English Prompt
  const handleCopyOriginal = () => {
    const textToCopy = getPromptTextToCopy(originalPromptText || formattedPrompt);
    navigator.clipboard.writeText(textToCopy);
    setCopiedOriginal(true);
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  // Copy Positive Prompt Only
  const handleCopyPositiveOnly = () => {
    const latestText = getLatestFinalPrompt();
    navigator.clipboard.writeText(latestText);
    setCopiedPositive(true);
    setTimeout(() => setCopiedPositive(false), 2000);
  };

  // Copy Final English Prompt (Button 1: Copy)
  const handleCopyFinal = () => {
    const latestText = getLatestFinalPrompt();
    const textToCopy = getPromptTextToCopy(latestText);
    navigator.clipboard.writeText(textToCopy);
    setCopiedFinal(true);
    setTimeout(() => setCopiedFinal(false), 2000);
  };

  // Copy Complete Package (Master Prompt + Negative Prompt + Camera Specifications)
  const handleCopyCompleteBundle = () => {
    const latestText = getLatestFinalPrompt();
    const fullPackageText = buildCompletePromptPackage(latestText);
    navigator.clipboard.writeText(fullPackageText);
    setCopiedFullPackage(true);
    setTimeout(() => setCopiedFullPackage(false), 2000);
  };

  // Copy Final Prompt and launch Gemini / ChatGPT (Button 2: Gemini / ChatGPT)
  const handleCopyForPlatform = (platform: 'gemini' | 'chatgpt' | 'combined') => {
    if (platform !== 'combined') {
      setSelectedTool(platform);
    }
    const latestText = getLatestFinalPrompt();
    const textToCopy = getPromptTextToCopy(latestText);

    navigator.clipboard.writeText(textToCopy);
    setCopiedPlatform(platform);

    if (platform === 'gemini') {
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
    } else if (platform === 'chatgpt') {
      window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
    } else if (platform === 'combined') {
      window.open('https://gemini.google.com/app', '_blank', 'noopener,noreferrer');
      setTimeout(() => {
        window.open('https://chatgpt.com/', '_blank', 'noopener,noreferrer');
      }, 300);
    }

    setTimeout(() => setCopiedPlatform(null), 2000);
  };

  const handleCopyNegative = () => {
    if (promptResult?.negativePrompt) {
      navigator.clipboard.writeText(promptResult.negativePrompt);
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
    }
  };

  const handleCopyCamera = () => {
    if (promptResult?.cameraNotes) {
      navigator.clipboard.writeText(promptResult.cameraNotes);
      setCopiedCamera(true);
      setTimeout(() => setCopiedCamera(false), 2000);
    }
  };

  const handleGoMain = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isGeneratingPrompt) {
    return (
      <div className="rounded-2xl bg-slate-900/90 border border-pink-500/30 p-8 text-center space-y-4 shadow-2xl animate-pulse">
        <div className="flex justify-center">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-cyan-400 p-[2px]">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950">
              <Sparkles className="h-8 w-8 text-cyan-400 animate-spin" />
            </div>
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-100">
            {isMyanmar ? 'AI ဖလင်စတူဒီယိုမှ PROMPT ရေးဆွဲနေပါသည်...' : 'AI Prompt Engineer At Work...'}
          </h3>
          <p className="text-xs text-slate-400">
            {isMyanmar ? 'အလင်းအမှောင်၊ ကင်မရာမှန်ဘီလူးနှင့် အသားအရေ အသေးစိတ်များကို တွက်ချက်နေပါသည်' : 'Calculating Hasselblad optics, skin texture, volumetric lighting and color LUTs'}
          </p>
        </div>
      </div>
    );
  }

  if (!promptResult) {
    return (
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 p-8 text-center space-y-4 shadow-2xl">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 border border-slate-800 text-pink-400">
            <Sparkles className="h-7 w-7" />
          </div>
        </div>
        <div className="max-w-md mx-auto space-y-2">
          <h3 className="text-base font-bold text-slate-200">
            {isMyanmar ? 'အဆင့်မြင့် Prompt ထုတ်ယူရန် အဆင်သင့်ဖြစ်ပါပြီ' : 'Ready to Craft Professional Prompt'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isMyanmar
              ? 'ဘယ်ဘက်မှ ဇာတ်ကောင်၊ ပွဲတော်နှင့် စတူဒီယို ဆက်တင်များကို ရွေးချယ်ပြီး "PROMPT စာသားထုတ်မည်" ခလုတ်ကို နှိပ်ပါ'
              : 'Configure your subject, event, and camera matrix controls on the left, then click Generate Prompt to create masterpiece photography code.'}
          </p>
        </div>
      </div>
    );
  }

  const activeEnglishPrompt = finalEnglishPrompt || formattedPrompt;
  const wordCount = activeEnglishPrompt ? activeEnglishPrompt.trim().split(/\s+/).length : 0;
  const charCount = activeEnglishPrompt ? activeEnglishPrompt.length : 0;

  return (
    <div className="rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-md p-5 shadow-2xl space-y-5">
      
      {/* Platform Selection Header & Format Selector */}
      <div className="space-y-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-pink-400" />
            <span>{isMyanmar ? 'Platform ရွေးချယ်ရန်' : 'Select Platform'}</span>
          </h3>
          {/* Format Selector Tabs */}
          <div className="flex items-center gap-1 rounded-lg bg-slate-950 p-1 border border-slate-800">
            {(['midjourney', 'flux', 'sdxl', 'master'] as const).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setActiveFormat(fmt)}
                className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-md transition-all ${
                  activeFormat === fmt
                    ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {fmt === 'midjourney' ? 'MJ v6' : fmt === 'flux' ? 'Flux' : fmt === 'sdxl' ? 'SDXL' : 'Plain'}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Horizontal Equal Width Tools Grid */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {/* Tool 1: Gemini (Blue Selected State) */}
          <button
            type="button"
            onClick={() => setSelectedTool('gemini')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
              selectedTool === 'gemini'
                ? 'bg-blue-950/90 border-blue-400 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.35)] ring-1 ring-blue-400 font-bold'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              <span className="text-blue-400">✨</span>
              <span>Gemini</span>
            </div>
            <span className="text-[10px] text-blue-300/80 mt-0.5 hidden sm:inline">Google AI</span>
          </button>

          {/* Tool 2: ChatGPT */}
          <button
            type="button"
            onClick={() => setSelectedTool('chatgpt')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
              selectedTool === 'chatgpt'
                ? 'bg-purple-950/90 border-purple-400 text-purple-100 shadow-[0_0_15px_rgba(168,85,247,0.35)] ring-1 ring-purple-400 font-bold'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              <Bot className="h-3.5 w-3.5 text-purple-400" />
              <span>ChatGPT</span>
            </div>
            <span className="text-[10px] text-purple-300/80 mt-0.5 hidden sm:inline">OpenAI</span>
          </button>

          {/* Tool 3: Photoshop */}
          <button
            type="button"
            onClick={() => setSelectedTool('photoshop')}
            className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
              selectedTool === 'photoshop'
                ? 'bg-cyan-950/90 border-cyan-400 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.35)] ring-1 ring-cyan-400 font-bold'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-extrabold text-xs">
              <span className="text-cyan-400">🎨</span>
              <span>Photoshop</span>
            </div>
            <span className="text-[10px] text-cyan-300/80 mt-0.5 hidden sm:inline">Firefly</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          UI STEP 1: မူရင်း English Prompt Box
      ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <label className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
              <Languages className="h-4 w-4 text-cyan-400" />
              <span>{isMyanmar ? '၁။ မူရင်း English Prompt (ဖိ၍ Copy/Paste/Select All ရပါသည်)' : '1. Original English Prompt (Select All / Copy / Paste)'}</span>
            </label>
            {promptResult?.aspectRatio && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-bold">
                <span>📐 Aspect Ratio:</span>
                <span className="text-amber-200">--ar {promptResult.aspectRatio}</span>
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (promptResult) {
                  const isFav = StorageService.isFavorite(promptResult.masterPrompt);
                  if (isFav) {
                    const allFavs = StorageService.getFavorites();
                    const target = allFavs.find(f => f.masterPrompt.trim() === promptResult.masterPrompt.trim());
                    if (target) StorageService.removeFavorite(target.id);
                  } else {
                    StorageService.addFavorite({
                      promptId: promptResult.id,
                      title: promptResult.optionsSummary?.event || promptResult.optionsSummary?.subject || 'AI Masterpiece',
                      masterPrompt: promptResult.masterPrompt,
                      mode: promptResult.mode,
                      aspectRatio: promptResult.aspectRatio,
                      previewImage: promptResult.generatedImageUrl
                    });
                  }
                }
              }}
              className="flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/80 hover:bg-amber-900/80 px-2.5 py-1 rounded-lg border border-amber-600/50 transition-colors cursor-pointer"
              title="Add to Favorites"
            >
              <Star className={`h-3.5 w-3.5 ${promptResult && StorageService.isFavorite(promptResult.masterPrompt) ? 'fill-amber-400 text-amber-400' : 'text-amber-300'}`} />
              <span>{isMyanmar ? 'အကြိုက်ဆုံး' : 'Favorite'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('original-prompt-input') as HTMLTextAreaElement;
                if (el) {
                  el.focus();
                  el.select();
                  el.setSelectionRange(0, 99999);
                }
              }}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-cyan-300 bg-slate-800/80 hover:bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              <span>{isMyanmar ? 'Select All ရွေးမည်' : 'Select All'}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyOriginal}
              className="flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-cyan-300 bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              {copiedOriginal ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-cyan-400" />}
              <span>{copiedOriginal ? (isMyanmar ? 'ကူးပြီးပြီ!' : 'Copied!') : (isMyanmar ? 'Copy မူရင်း' : 'Copy Original')}</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="original-prompt-input"
            value={originalPromptText || formattedPrompt}
            onChange={(e) => setOriginalPromptText(e.target.value)}
            rows={5}
            className="w-full rounded-xl bg-slate-950 p-3.5 border border-slate-800 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 select-text cursor-text selection:bg-cyan-900 selection:text-cyan-100 shadow-inner"
            placeholder="Original English Prompt..."
          />
        </div>
      </div>

      {/* =========================================================================
          UI STEP 2: [မြန်မာလို ပြန်ဆိုမည်] ခလုတ်
      ========================================================================= */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleTranslateToMyanmar}
          disabled={isTranslatingToMm}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 p-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-cyan-900/30 border border-cyan-400/30 transition-all hover:scale-[1.005] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isTranslatingToMm ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-cyan-200" />
              <span>{isMyanmar ? 'မြန်မာဘာသာသို့ ပြန်ဆိုပေးနေပါသည်...' : 'Translating to Myanmar...'}</span>
            </>
          ) : (
            <>
              <Languages className="h-4 w-4 text-cyan-200" />
              <span>{isMyanmar ? '၂။ မြန်မာလို ပြန်ဆိုမည်' : '2. Translate to Myanmar'}</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          UI STEP 3: မြန်မာစာ Edit Box (editable)
      ========================================================================= */}
      <div className="space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5">
            <Edit3 className="h-4 w-4 text-amber-400" />
            <span>{isMyanmar ? '၃။ မြန်မာစာ ပြင်ဆင်ရန် Box (ဖိ၍ Copy/Paste/Select All ရပါသည်)' : '3. Myanmar Editable Box'}</span>
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('myanmar-prompt-input') as HTMLTextAreaElement;
                if (el) {
                  el.focus();
                  el.select();
                  el.setSelectionRange(0, 99999);
                }
              }}
              className="flex items-center gap-1 text-[10px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/80 hover:bg-amber-900/80 px-2 py-1 rounded-lg border border-amber-600/50 transition-colors cursor-pointer"
            >
              <span>{isMyanmar ? 'Select All ရွေးမည်' : 'Select All'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(myanmarText);
              }}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-300 hover:text-amber-300 bg-slate-800/80 hover:bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
            >
              <Copy className="h-3 w-3 text-amber-400" />
              <span>{isMyanmar ? 'Copy မြန်မာစာ' : 'Copy MM'}</span>
            </button>
            <span className="text-[10px] text-slate-400 font-mono">
              {myanmarText.length} {isMyanmar ? 'စာလုံး' : 'chars'}
            </span>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="myanmar-prompt-input"
            value={myanmarText}
            onChange={(e) => setMyanmarText(e.target.value)}
            placeholder={
              isMyanmar
                ? 'မြန်မာလို ပြန်ဆိုထားသော စာသားကို ဤနေရာတွင် လိုသလို ပြင်ဆင်/ဖြည့်စွက်/နှုတ်ပယ်နိုင်ပါသည်...'
                : 'Edit, add, or customize the translated Myanmar prompt text here...'
            }
            rows={5}
            className="w-full rounded-xl bg-slate-950/90 p-3.5 border border-amber-500/40 text-xs text-amber-100 placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 font-sans leading-relaxed shadow-inner select-text cursor-text selection:bg-amber-900 selection:text-amber-100"
          />
        </div>
        <p className="text-[11px] text-slate-400 italic">
          💡 {isMyanmar ? 'မြန်မာစာသားကို စိတ်ကြိုက် ပြင်ဆင် (တိုး/လျှော့) ပြီးပါက အောက်ပါခလုတ်ကို နှိပ်ပါ' : 'Feel free to modify the Myanmar text above, then click convert below.'}
        </p>
      </div>

      {/* =========================================================================
          UI STEP 4: [English သို့ ပြန်ပြောင်းမည်] ခလုတ်
      ========================================================================= */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleConvertToEnglish}
          disabled={isConvertingToEn || !myanmarText.trim()}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-pink-600 hover:from-amber-500 hover:to-pink-500 p-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-orange-900/30 border border-orange-400/30 transition-all hover:scale-[1.005] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
        >
          {isConvertingToEn ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin text-amber-200" />
              <span>{isMyanmar ? 'အဆင့်မြင့် English Prompt သို့ ပြောင်းလဲနေပါသည်...' : 'Converting to Professional English Prompt...'}</span>
            </>
          ) : (
            <>
              <ArrowDown className="h-4 w-4 text-amber-200" />
              <span>{isMyanmar ? '၄။ English သို့ ပြန်ပြောင်းမည်' : '4. Convert back to English'}</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          UI STEP 5: နောက်ဆုံး English Prompt Box
      ========================================================================= */}
      <div className="space-y-2 pt-1 border-t border-slate-800/80">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span>{isMyanmar ? '၅။ နောက်ဆုံး English Prompt (ဖိ၍ Copy/Paste/Select All ရပါသည်)' : '5. Final English Prompt (Select All / Copy / Paste)'}</span>
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('final-prompt-input') as HTMLTextAreaElement;
                if (el) {
                  el.focus();
                  el.select();
                  el.setSelectionRange(0, 99999);
                }
              }}
              className="flex items-center gap-1 text-[10px] font-bold text-emerald-300 hover:text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900/80 px-2 py-1 rounded-lg border border-emerald-600/50 transition-colors cursor-pointer"
            >
              <span>{isMyanmar ? 'Select All ရွေးမည်' : 'Select All'}</span>
            </button>
            <button
              type="button"
              onClick={handleCopyPositiveOnly}
              className="flex items-center gap-1 text-[10px] font-bold text-slate-200 hover:text-emerald-300 bg-slate-800 hover:bg-slate-700 px-2 py-1 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              title="Copy Positive Prompt Only"
            >
              {copiedPositive ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-emerald-400" />}
              <span>{copiedPositive ? (isMyanmar ? 'ကူးပြီးပြီ!' : 'Copied!') : (isMyanmar ? 'Copy Positive' : 'Copy Positive')}</span>
            </button>
            <div className="text-slate-300 font-mono text-[10px]">
              {wordCount} {isMyanmar ? 'လုံး' : 'Words'} • {charCount} {isMyanmar ? 'စာလုံး' : 'Chars'}
            </div>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="final-prompt-input"
            value={activeEnglishPrompt}
            onChange={(e) => setFinalEnglishPrompt(e.target.value)}
            rows={6}
            className="w-full rounded-xl bg-slate-950 p-4 border border-emerald-500/40 text-xs text-emerald-100 font-mono leading-relaxed focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 select-text cursor-text selection:bg-emerald-900 selection:text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
            placeholder="Final English Prompt..."
          />
        </div>
      </div>

      {/* Green Instruction Banner & Bundle Toggle */}
      <div className="rounded-xl bg-emerald-950/80 border border-emerald-500/50 p-3 shadow-[0_0_12px_rgba(16,185,129,0.25)] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
          <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse shrink-0" />
          <span>{isMyanmar ? '၆။ အောက်ပါခလုတ်များဖြင့် Copy ယူပြီး AI ဖန်တီးပါ' : '6. Copy using buttons below for AI Generation'}</span>
        </div>

        {/* Bundle Toggle Checkbox */}
        <label className="flex items-center gap-2 text-[11px] text-emerald-200/90 font-medium cursor-pointer pt-1 border-t border-emerald-500/20 select-none">
          <input
            type="checkbox"
            checked={includeBundleDetails}
            onChange={(e) => setIncludeBundleDetails(e.target.checked)}
            className="h-3.5 w-3.5 rounded border-emerald-500 text-emerald-500 focus:ring-emerald-400 accent-emerald-500 cursor-pointer"
          />
          <span>
            {isMyanmar
              ? 'Copy ယူရာတွင် Negative Prompt နှင့် Camera Specs (ကင်မရာအမှတ်အသားများ) ပါဝင်စေမည်'
              : 'Include Negative Prompt & Camera Specifications when copying'}
          </span>
        </label>
      </div>

      {/* Primary Full Bundle Copy Button */}
      <button
        type="button"
        onClick={handleCopyCompleteBundle}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 p-3 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-emerald-900/40 border border-emerald-400/40 transition-all hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
      >
        {copiedFullPackage ? (
          <>
            <Check className="h-4 w-4 text-emerald-200" />
            <span className="text-emerald-100">
              {isMyanmar ? 'Prompt + Negative + Camera Specs အားလုံး Copy ပြီးပါပြီ!' : 'Full Package Copied Successfully!'}
            </span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-emerald-200" />
            <span>
              {isMyanmar
                ? '📦 Copy အစုံအလင် (Prompt + Negative + Camera Specs အစုံအလင်)'
                : '📦 Copy Complete Package (Prompt + Negative + Camera)'}
            </span>
          </>
        )}
      </button>

      {/* =========================================================================
          UI STEP 6: [ခလုတ် ၁: Copy (အစိမ်းရောင်)] + [ခလုတ် ၂: Gemini / ChatGPT]
      ========================================================================= */}
      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Button 1: Copy Final Prompt (Bright Emerald Green) */}
          <button
            type="button"
            onClick={handleCopyFinal}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 p-3 text-xs font-black text-white shadow-lg shadow-emerald-900/50 border border-emerald-300/50 transition-all hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
          >
            {copiedFinal ? (
              <>
                <Check className="h-4 w-4 text-white" />
                <span className="text-white uppercase tracking-wider">{isMyanmar ? 'ကူးပြီးပြီ!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-white" />
                <span className="uppercase tracking-wider">{isMyanmar ? 'ခလုတ် ၁: Copy (အစိမ်းရောင်)' : 'Button 1: Copy'}</span>
              </>
            )}
          </button>

          {/* Button 2a: Gemini (Blue) */}
          <button
            type="button"
            onClick={() => handleCopyForPlatform('gemini')}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 p-3 text-xs font-black text-white shadow-lg shadow-blue-900/40 border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
            title="Copy Prompt & Open Gemini AI"
          >
            {copiedPlatform === 'gemini' ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-200">{isMyanmar ? 'Copied & Opened!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 text-cyan-200" />
                <span>ခလုတ် ၂: Gemini</span>
                <ExternalLink className="h-3.5 w-3.5 text-blue-200 opacity-80" />
              </>
            )}
          </button>

          {/* Button 2b: ChatGPT (Purple) */}
          <button
            type="button"
            onClick={() => handleCopyForPlatform('chatgpt')}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:from-purple-500 hover:to-pink-500 p-3 text-xs font-black text-white shadow-lg shadow-purple-900/40 border border-purple-400/40 transition-all hover:scale-[1.02] active:scale-[0.97] cursor-pointer"
            title="Copy Prompt & Open ChatGPT"
          >
            {copiedPlatform === 'chatgpt' ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span className="text-emerald-200">{isMyanmar ? 'Copied & Opened!' : 'Copied!'}</span>
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 text-pink-200" />
                <span>ခလုတ် ၂: ChatGPT</span>
                <ExternalLink className="h-3.5 w-3.5 text-purple-200 opacity-80" />
              </>
            )}
          </button>
        </div>

        {/* Combined Gemini + ChatGPT Joint Trigger Button */}
        <button
          type="button"
          onClick={() => handleCopyForPlatform('combined')}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 hover:from-blue-600 hover:to-pink-600 p-2.5 text-xs font-extrabold text-white shadow-md border border-purple-400/30 transition-all hover:scale-[1.005] active:scale-[0.98] cursor-pointer"
          title="Copy Prompt & Launch Gemini + ChatGPT together"
        >
          {copiedPlatform === 'combined' ? (
            <>
              <Check className="h-4 w-4 text-emerald-300 animate-bounce" />
              <span className="text-emerald-200 font-bold">
                {isMyanmar ? 'နောက်ဆုံး Prompt ကို ကူးယူပြီး Gemini + ChatGPT ဝဘ်ဆိုက် (၂) ခုလုံး ဖွင့်လိုက်ပါပြီ!' : 'Prompt Copied & Opened Both Gemini + ChatGPT!'}
              </span>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1 text-cyan-200">
                <Sparkles className="h-3.5 w-3.5" />
                <Bot className="h-3.5 w-3.5" />
              </div>
              <span>
                {isMyanmar
                  ? '⚡ ခလုတ် ၂ (Gemini + ChatGPT) ပူးတွဲ ကူးယူ၍ ဝဘ်ဆိုက် (၂) ခုလုံး ဖွင့်မည်'
                  : '⚡ Button 2: Copy Prompt & Open Both Gemini + ChatGPT'}
              </span>
              <ExternalLink className="h-3.5 w-3.5 text-pink-200 opacity-80" />
            </>
          )}
        </button>
      </div>

      {/* Go Main Button */}
      <div className="pt-1">
        <button
          type="button"
          onClick={handleGoMain}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 p-2 text-xs font-bold text-amber-300 transition-all hover:scale-[1.005] active:scale-[0.98] shadow-md cursor-pointer"
        >
          <Home className="h-3.5 w-3.5 text-amber-400" />
          <span>{isMyanmar ? 'ပင်မ စာမျက်နှာ ထိပ်ဆုံးသို့ ပြန်သွားမည်' : 'Back to Top'}</span>
        </button>
      </div>

      {/* Negative Prompt Box */}
      <div className="space-y-1.5 pt-3 border-t border-slate-800/80">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-bold text-amber-400">
            {isMyanmar ? 'Negative Prompt (ရှောင်ရှားရမည့် အချက်များ):' : 'Negative Prompt:'}
          </label>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('negative-prompt-input') as HTMLTextAreaElement;
                if (el) {
                  el.focus();
                  el.select();
                  el.setSelectionRange(0, 99999);
                }
              }}
              className="flex items-center gap-1 text-[10px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/80 hover:bg-amber-900/80 px-2 py-0.5 rounded-lg border border-amber-600/50 transition-colors cursor-pointer"
            >
              <span>{isMyanmar ? 'Select All' : 'Select All'}</span>
            </button>
            <button
              onClick={handleCopyNegative}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              {copiedNegative ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span>{copiedNegative ? 'Copied' : 'Copy Negative'}</span>
            </button>
          </div>
        </div>
        <textarea
          id="negative-prompt-input"
          readOnly
          value={promptResult.negativePrompt}
          rows={3}
          className="w-full rounded-xl bg-slate-950/80 p-3 border border-slate-800 text-[11px] font-mono text-slate-400 leading-normal focus:outline-none focus:border-amber-500/50 select-text cursor-text selection:bg-amber-950 selection:text-amber-200"
        />
      </div>

      {/* Technical Notes & Bilingual Description */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <span>📷</span>
              <span>{isMyanmar ? 'ကင်မရာ အမှတ်အသား' : 'Camera Notes'}</span>
            </div>
            <button
              onClick={handleCopyCamera}
              className="flex items-center gap-1 text-[10px] font-bold text-cyan-300 hover:text-cyan-200 bg-cyan-950/80 hover:bg-cyan-900/80 px-2 py-0.5 rounded-lg border border-cyan-600/50 transition-colors cursor-pointer"
            >
              {copiedCamera ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-cyan-400" />}
              <span>{copiedCamera ? 'Copied' : 'Copy Camera'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
            {promptResult.cameraNotes}
          </p>
        </div>

        <div className="rounded-xl bg-slate-950/60 p-3 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-purple-400">
            <Eye className="h-3.5 w-3.5" />
            <span>{isMyanmar ? 'AI Prompt သုံးသပ်ချက်' : 'Prompt Breakdown'}</span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {isMyanmar ? promptResult.descriptionMm : promptResult.descriptionEn}
          </p>
        </div>
      </div>

      {/* Generate AI Image & Preview Section */}
      <div className="border-t border-slate-800 pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-200">
            {isMyanmar ? 'ဓာတ်ပုံ တိုက်ရိုက် ထုတ်ယူခြင်း (AI Image Synthesis):' : 'AI Image Preview Synthesis:'}
          </span>
          <button
            onClick={onGenerateImage}
            disabled={isGeneratingImage}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isGeneratingImage ? (
              <>
                <Zap className="h-4 w-4 animate-bounce text-yellow-300" />
                <span>{isMyanmar ? 'ဓာတ်ပုံ ဖန်တီးနေပါသည်...' : 'Rendering Photo...'}</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 text-yellow-300" />
                <span>{isMyanmar ? 'ဓာတ်ပုံ ထုတ်ယူမည် (GENERATE IMAGE)' : 'GENERATE AI IMAGE'}</span>
              </>
            )}
          </button>
        </div>

        {/* Rendered Image Display */}
        {promptResult.generatedImageUrl && (
          <div className="relative rounded-2xl bg-slate-950 p-2 border border-slate-800 overflow-hidden group">
            <img
              src={promptResult.generatedImageUrl}
              alt="Generated AI Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
              <div className="text-xs text-white">
                <p className="font-bold">{promptResult.optionsSummary.event}</p>
                <p className="text-[10px] text-slate-300">{promptResult.optionsSummary.location}</p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={promptResult.generatedImageUrl}
                  download="infinity_prompt_portrait.png"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900/90 border border-slate-700 text-white hover:bg-slate-800 transition-all cursor-pointer"
                  title="Download Image"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setImageModalOpen(true)}
                  className="p-2 rounded-lg bg-pink-600 text-white hover:bg-pink-500 transition-all shadow-md cursor-pointer"
                  title="Enlarge Preview"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Image Modal Preview */}
      {imageModalOpen && promptResult.generatedImageUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4"
          onClick={() => setImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden p-2 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-1">
              <h4 className="text-xs font-bold text-slate-200">
                Show Ai Studio High-Res Preview
              </h4>
              <button
                onClick={() => setImageModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1 bg-slate-800 rounded-lg cursor-pointer"
              >
                ✕ Close
              </button>
            </div>
            <img
              src={promptResult.generatedImageUrl}
              alt="High Res AI Generated Portrait"
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}

    </div>
  );
};
