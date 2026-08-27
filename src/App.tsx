import React, { useState } from 'react';
import {
  AppMode,
  Language,
  MatrixSelection,
  PromptResult,
  PresetTemplate,
  UserProfile
} from './types';
import { Header } from './components/Header';
import { InteractiveChatPanel } from './components/InteractiveChatPanel';
import { PromptOutputCard } from './components/PromptOutputCard';
import { Img2ImgUploader } from './components/Img2ImgUploader';
import { PresetGallery } from './components/PresetGallery';
import { ClothesSwapPanel } from './components/ClothesSwapPanel';
import { UserDashboardModal } from './components/dashboard/UserDashboardModal';
import { AdminDashboardModal } from './components/dashboard/AdminDashboardModal';
import { StorageService } from './utils/storageService';
import { PRESET_TEMPLATES } from './data/presetData';
import { buildComprehensiveMasterPrompt } from './utils/promptBuilder';
import { Sparkles, Wand2, RefreshCcw, RotateCcw } from 'lucide-react';

const DEFAULT_SELECTION: MatrixSelection = {
  subject: 'woman',
  customSubjectDetails: '',
  event: 'thingyan',
  location: 'cyber_yangon',
  timeAndLighting: 'neon_midnight',
  camera: 'sony_a7rv',
  retouching: 'ultra_realism',
  makeup: 'traditional_myanmar',
  colorGrade: 'cyber_neon',
  aspectRatio: '9:16',
  qualityProfile: '8k_uhd',
  garmentStyle: 'silk_longyi',
  garmentFabric: 'Woven Silk with Water Droplets',
  styleStrength: 0.75,
  promptWeight: 0.8
};

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('img2img');
  const [language, setLanguage] = useState<Language>('my');
  const [selection, setSelection] = useState<MatrixSelection>(DEFAULT_SELECTION);
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState<boolean>(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [promptResult, setPromptResult] = useState<PromptResult | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | undefined>('thingyan_cyber_queen');

  // User & Dashboard States
  const [currentUser, setCurrentUser] = useState<UserProfile>(StorageService.getCurrentUser());
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState<boolean>(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState<boolean>(false);

  const handleUpdateSelection = (updates: Partial<MatrixSelection>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  const handleModeChange = (mode: AppMode) => {
    setCurrentMode(mode);
    setSelection((prev) => ({
      ...prev,
      // Default appropriate options per mode
      garmentStyle: mode === 'clothes-swap' ? 'evening_gown' : prev.garmentStyle
    }));
  };

  // Local prompt builder fallback in case of network issue or server restart
  const createLocalFallbackPrompt = (sel: MatrixSelection, mode: AppMode): PromptResult => {
    const built = buildComprehensiveMasterPrompt(sel, mode);

    return {
      id: Date.now().toString(),
      ...built,
      aspectRatio: sel.aspectRatio || '9:16',
      mode: mode,
      timestamp: new Date().toLocaleTimeString(),
      optionsSummary: {
        subject: sel.subject,
        event: sel.event,
        location: sel.location,
        lighting: sel.timeAndLighting
      }
    };
  };

  const handleGeneratePrompt = async () => {
    setIsGeneratingPrompt(true);

    try {
      const response = await fetch('/api/generate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selection,
          mode: currentMode,
          language,
          customInstruction: selection.customInstruction
        })
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();

      if (data && data.success && data.promptData) {
        const result: PromptResult = {
          id: Date.now().toString(),
          masterPrompt: data.promptData.masterPrompt || '',
          negativePrompt: data.promptData.negativePrompt || '',
          midjourneyFormat: data.promptData.midjourneyFormat || '',
          fluxFormat: data.promptData.fluxFormat || '',
          sdxlFormat: data.promptData.sdxlFormat || '',
          descriptionMm: data.promptData.descriptionMm || '',
          descriptionEn: data.promptData.descriptionEn || '',
          cameraNotes: data.promptData.cameraNotes || '',
          aspectRatio: data.promptData.aspectRatio || selection.aspectRatio || '9:16',
          mode: currentMode,
          timestamp: new Date().toLocaleTimeString(),
          optionsSummary: {
            subject: selection.subject,
            event: selection.event,
            location: selection.location,
            lighting: selection.timeAndLighting
          }
        };

        setPromptResult(result);
        // Save to User History
        StorageService.saveToHistory({
          masterPrompt: result.masterPrompt,
          negativePrompt: result.negativePrompt,
          midjourneyFormat: result.midjourneyFormat,
          fluxFormat: result.fluxFormat,
          sdxlFormat: result.sdxlFormat,
          mode: currentMode,
          aspectRatio: result.aspectRatio,
          optionsSummary: result.optionsSummary
        });
      } else {
        const fallback = createLocalFallbackPrompt(selection, currentMode);
        setPromptResult(fallback);
        StorageService.saveToHistory({
          masterPrompt: fallback.masterPrompt,
          negativePrompt: fallback.negativePrompt,
          midjourneyFormat: fallback.midjourneyFormat,
          fluxFormat: fallback.fluxFormat,
          sdxlFormat: fallback.sdxlFormat,
          mode: currentMode,
          aspectRatio: fallback.aspectRatio,
          optionsSummary: fallback.optionsSummary
        });
      }
    } catch (err) {
      console.warn('API connection or response issue, using local prompt fallback:', err);
      const fallback = createLocalFallbackPrompt(selection, currentMode);
      setPromptResult(fallback);
      StorageService.saveToHistory({
        masterPrompt: fallback.masterPrompt,
        negativePrompt: fallback.negativePrompt,
        midjourneyFormat: fallback.midjourneyFormat,
        fluxFormat: fallback.fluxFormat,
        sdxlFormat: fallback.sdxlFormat,
        mode: currentMode,
        aspectRatio: fallback.aspectRatio,
        optionsSummary: fallback.optionsSummary
      });
    } finally {
      setIsGeneratingPrompt(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!promptResult) return;

    setIsGeneratingImage(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptResult.masterPrompt,
          aspectRatio: selection.aspectRatio,
          referenceImage: selection.referenceImage
        })
      });

      if (!response.ok) {
        throw new Error(`Server status ${response.status}`);
      }

      const data = await response.json();

      if (data && data.success && data.imageUrl) {
        setPromptResult((prev) =>
          prev ? { ...prev, generatedImageUrl: data.imageUrl } : null
        );
      } else {
        const seed = Math.floor(Math.random() * 100000);
        setPromptResult((prev) =>
          prev ? { ...prev, generatedImageUrl: `https://picsum.photos/seed/infinity_${seed}/1024/1024` } : null
        );
      }
    } catch (err) {
      console.warn('Image Gen API issue, using visual placeholder fallback:', err);
      const seed = Math.floor(Math.random() * 100000);
      setPromptResult((prev) =>
        prev ? { ...prev, generatedImageUrl: `https://picsum.photos/seed/infinity_${seed}/1024/1024` } : null
      );
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSelectPreset = (preset: PresetTemplate) => {
    setActivePresetId(preset.id);
    setCurrentMode(preset.mode);
    setSelection({
      ...DEFAULT_SELECTION,
      ...preset.selection
    });
  };

  const handleResetAll = () => {
    setSelection(DEFAULT_SELECTION);
    setActivePresetId(undefined);
    setPromptResult(null);
  };

  const handleUsePromptFromHistory = (promptText: string) => {
    setPromptResult({
      id: Date.now().toString(),
      masterPrompt: promptText,
      negativePrompt: 'low quality, blurry, deformed, bad anatomy, bad lighting, watermark, oversaturated',
      midjourneyFormat: `/imagine prompt: ${promptText} --ar 9:16 --v 6.0 --style raw`,
      fluxFormat: `${promptText}, photorealistic 8k Hasselblad`,
      sdxlFormat: `${promptText}, masterpiece, best quality`,
      descriptionMm: 'History မှ ရွေးချယ်ထားသော Prompt ဖြစ်ပါသည်',
      descriptionEn: 'Selected prompt from History / Favorites',
      cameraNotes: 'Hasselblad H6D-100c, 85mm f/1.4 lens, natural lighting',
      aspectRatio: '9:16',
      mode: currentMode,
      timestamp: new Date().toLocaleTimeString(),
      optionsSummary: {
        subject: 'Custom History Prompt',
        event: 'Custom Prompt',
        location: 'Custom Location',
        lighting: 'Natural / Studio'
      }
    });
  };

  const isMyanmar = language === 'my';

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-pink-900 selection:text-pink-200">
      
      {/* Top Fixed Header */}
      <Header
        currentMode={currentMode}
        onModeChange={handleModeChange}
        language={language}
        onLanguageChange={setLanguage}
        currentUser={currentUser}
        onOpenUserDashboard={() => setIsUserDashboardOpen(true)}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Main Workspace Body */}
      <main className="flex-1 mx-auto max-w-7xl w-full p-4 sm:p-6 space-y-6 pb-24 sm:pb-28">
        
        {/* Preset Inspiration Gallery */}
        <PresetGallery
          language={language}
          onSelectPreset={handleSelectPreset}
          activePresetId={activePresetId}
        />

        {/* 👗 Magazine Fashion Clothes Swap Selection System (Positioned directly under Preset Gallery) */}
        {currentMode === 'clothes-swap' && (
          <div className="w-full">
            <ClothesSwapPanel
              language={language}
              selection={selection}
              onUpdateSelection={handleUpdateSelection}
              currentMode={currentMode}
            />
          </div>
        )}

        {/* Show Image Uploader prominently FIRST when in Img2Img, Background Mode or when Couple is selected */}
        {(currentMode === 'img2img' ||
          currentMode === 'background-only' ||
          selection.subject === 'couple' ||
          selection.subject?.toLowerCase().includes('couple') ||
          selection.subject === 'စုံတွဲ') && (
          <div className="w-full">
            <Img2ImgUploader
              language={language}
              selection={selection}
              onUpdateSelection={handleUpdateSelection}
              currentMode={currentMode}
            />
          </div>
        )}

        {/* Studio Grid: Left Panel + Right Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Step Wizard */}
          <div className="lg:col-span-5 h-[580px] sm:h-[640px] lg:h-[680px]">
            <InteractiveChatPanel
              currentMode={currentMode}
              onModeChange={handleModeChange}
              language={language}
              selection={selection}
              onUpdateSelection={handleUpdateSelection}
            />
          </div>

          {/* Right Column: Output Card */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Generated Master Prompt Display & AI Image Renderer */}
            <PromptOutputCard
              language={language}
              promptResult={promptResult}
              isGeneratingPrompt={isGeneratingPrompt}
              onGenerateImage={handleGenerateImage}
              isGeneratingImage={isGeneratingImage}
              onResetAll={handleResetAll}
            />

          </div>

        </div>

      </main>

      {/* User Dashboard Modal */}
      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        currentUser={currentUser}
        onUserUpdate={setCurrentUser}
        language={language}
        onSelectPromptToUse={handleUsePromptFromHistory}
        onOpenAdminDashboard={() => setIsAdminDashboardOpen(true)}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        currentUser={currentUser}
        language={language}
        onUserUpdate={setCurrentUser}
      />

      {/* Compact Sticky Bottom Bar */}
      <div className="sticky bottom-0 z-50 w-full border-t border-slate-800/80 bg-[#070B14]/95 backdrop-blur-md px-3 py-2 shadow-[0_-5px_20px_rgba(0,0,0,0.8)]">
        <div className="mx-auto max-w-xl flex items-center justify-center gap-2.5">
          {/* 1. PROMPT စာသားထုတ်မည် (Compact Pink -> Blue Gradient) */}
          <button
            type="button"
            onClick={handleGeneratePrompt}
            disabled={isGeneratingPrompt}
            className="flex-1 max-w-xs group relative flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
          >
            {isGeneratingPrompt ? (
              <div className="flex items-center gap-1.5">
                <RefreshCcw className="h-3.5 w-3.5 animate-spin text-cyan-300" />
                <span>{isMyanmar ? 'ရေးဆွဲနေပါသည်...' : 'Generating...'}</span>
              </div>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5 text-cyan-300 transition-transform group-hover:rotate-12 animate-pulse shrink-0" />
                <span className="truncate">
                  {isMyanmar ? 'PROMPT စာသားထုတ်မည်' : 'PROMPT စာသားထုတ်မည်'}
                </span>
              </>
            )}
          </button>

          {/* 2. RESET ALL (Compact Dark Red Button) */}
          <button
            type="button"
            onClick={handleResetAll}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-rose-950/90 hover:bg-rose-900 border border-rose-800/80 px-3 py-2 text-xs font-bold text-rose-200 transition-all hover:scale-[1.01] active:scale-[0.98] shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 text-rose-300 transition-transform hover:-rotate-180 duration-500" />
            <span>RESET ALL</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer id="app-footer" className="border-t border-slate-800/80 bg-slate-950/95 py-6 px-6 text-center text-xs text-slate-400 pb-24 sm:pb-20">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-slate-400 text-xs">
            © 2026 AI Studio Myanmar. • Powered by Gemini AI
          </div>
          <div className="flex items-center justify-center gap-1.5 font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1 rounded-full text-xs shadow-sm">
            <span>Created By Kyaw Win</span>
          </div>
          <span className="text-slate-500 text-[11px]">
            {isMyanmar ? 'အဆင့်မြင့် ဓာတ်ပုံ Prompt ဖန်တီးနည်းပညာ' : 'Masterpiece AI Photography Prompt Engineering'}
          </span>
        </div>
      </footer>

    </div>
  );
}

