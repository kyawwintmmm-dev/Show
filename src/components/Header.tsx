import React from 'react';
import { AppMode, Language, UserProfile } from '../types';
import { Sparkles, Image, Shirt, Wand2, Globe, Mountain, User, Shield } from 'lucide-react';

interface HeaderProps {
  currentMode: AppMode;
  onModeChange: (mode: AppMode) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  currentUser?: UserProfile;
  onOpenUserDashboard?: () => void;
  onOpenAdminDashboard?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onModeChange,
  language,
  onLanguageChange,
  currentUser,
  onOpenUserDashboard,
  onOpenAdminDashboard
}) => {
  const isMyanmar = language === 'my';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl px-3 py-2.5 sm:px-6">
      <div className="mx-auto flex flex-wrap max-w-7xl items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 via-pink-500 to-cyan-400 p-[2px] shadow-[0_0_20px_rgba(255,42,133,0.4)]">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="bg-gradient-to-r from-pink-400 via-purple-300 to-cyan-400 bg-clip-text text-base sm:text-xl font-black tracking-tight text-transparent whitespace-nowrap">
                Show Ai Studio.
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 hidden md:block">
              {isMyanmar
                ? 'အဆင့်မြင့် AI ဖလင်နှင့် ဓာတ်ပုံ Prompt ဖန်တီးစတူဒီယို'
                : 'Pro AI Photography & Creative Prompt Studio'}
            </p>
          </div>
        </div>

        {/* Mode Selector Tabs (Mobile Scrollable) */}
        <div className="order-3 sm:order-2 w-full sm:w-auto overflow-x-auto custom-scrollbar py-1 sm:py-0">
          <div className="flex items-center gap-1.5 rounded-2xl bg-slate-900/90 p-1.5 border border-slate-800/80 shadow-inner min-w-max">
            {/* 1st: ရည်ညွှန်းပုံ (Img2Img) */}
            <button
              onClick={() => onModeChange('img2img')}
              className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                currentMode === 'img2img'
                  ? 'bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 text-white border-2 border-pink-400 ring-2 ring-pink-500/50 shadow-[0_0_20px_rgba(255,42,133,0.5)] scale-105 z-10'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <Image className={`h-4 w-4 ${currentMode === 'img2img' ? 'text-white animate-pulse' : 'text-cyan-400'}`} />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight">
                  {isMyanmar ? 'ရည်ညွှန်းပုံ' : 'Ref Image'}
                </span>
                <span className="text-[9px] font-normal opacity-70 mt-0.5">Img2Img</span>
              </div>
            </button>

            {/* 2nd: ဖန်တီးမှု (Txt2Img) */}
            <button
              onClick={() => onModeChange('txt2img')}
              className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                currentMode === 'txt2img'
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-2 border-purple-400 ring-2 ring-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.5)] scale-105 z-10'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <Wand2 className={`h-4 w-4 ${currentMode === 'txt2img' ? 'text-white animate-pulse' : 'text-pink-400'}`} />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight">
                  {isMyanmar ? 'ဖန်တီးမှု' : 'Creation'}
                </span>
                <span className="text-[9px] font-normal opacity-70 mt-0.5">Txt2Img</span>
              </div>
            </button>

            {/* 3rd: မဂ္ဂဇင်း ဖန်ရှင် ဝတ်စုံလဲ (Magazine Fashion Clothes Swap) */}
            <button
              onClick={() => onModeChange('clothes-swap')}
              className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                currentMode === 'clothes-swap'
                  ? 'bg-gradient-to-r from-amber-500 via-orange-600 to-red-500 text-white border-2 border-amber-400 ring-2 ring-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-105 z-10'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <Shirt className={`h-4 w-4 ${currentMode === 'clothes-swap' ? 'text-white animate-pulse' : 'text-amber-400'}`} />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight">
                  {isMyanmar ? 'မဂ္ဂဇင်း ဝတ်စုံလဲ' : 'Magazine Swap'}
                </span>
                <span className="text-[9px] font-normal opacity-70 mt-0.5">Fashion</span>
              </div>
            </button>

            {/* 4th: နောက်ခံထုတ် (Background Only) */}
            <button
              onClick={() => onModeChange('background-only')}
              className={`relative flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all duration-300 min-h-[38px] ${
                currentMode === 'background-only'
                  ? 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white border-2 border-teal-400 ring-2 ring-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.5)] scale-105 z-10'
                  : 'bg-slate-950/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              <Mountain className={`h-4 w-4 ${currentMode === 'background-only' ? 'text-white animate-pulse' : 'text-emerald-400'}`} />
              <div className="flex flex-col text-left leading-none">
                <span className="text-[11px] sm:text-xs font-bold tracking-tight">
                  {isMyanmar ? 'နောက်ခံထုတ်' : 'BG Only'}
                </span>
                <span className="text-[9px] font-normal opacity-70 mt-0.5">Background</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right Action Controls: Admin Dashboard, User Profile & Language Toggle */}
        <div className="order-2 sm:order-3 flex items-center gap-1.5 sm:gap-2">
          
          {/* Admin Dashboard Button */}
          {onOpenAdminDashboard && (
            <button
              type="button"
              onClick={onOpenAdminDashboard}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all shadow-sm ${
                currentUser?.role === 'admin'
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/50 hover:bg-amber-500/30 ring-1 ring-amber-500/20'
                  : 'bg-slate-900/90 text-amber-400/90 border border-amber-600/30 hover:bg-amber-950/40 hover:text-amber-300'
              }`}
              title="Admin Dashboard (စီမံခန့်ခွဲသူ ဒက်ရှ်ဘုတ်)"
            >
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span className="font-bold text-[11px] sm:text-xs">
                {isMyanmar ? 'Admin' : 'Admin'}
              </span>
            </button>
          )}

          {/* User Dashboard Button */}
          {onOpenUserDashboard && (
            <button
              type="button"
              onClick={onOpenUserDashboard}
              className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 px-2.5 py-1.5 text-xs text-slate-200 hover:text-white transition-all shadow-sm"
              title="User Dashboard & Profile (အသုံးပြုသူ ဒက်ရှ်ဘုတ်)"
            >
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-4 w-4 rounded-full object-cover border border-cyan-500/50 shadow-sm"
                />
              ) : (
                <User className="h-3.5 w-3.5 text-cyan-400" />
              )}
              <span className="max-w-[70px] sm:max-w-[90px] truncate font-medium text-[11px] sm:text-xs">
                {currentUser?.name || (isMyanmar ? 'Profile' : 'Profile')}
              </span>
            </button>
          )}

          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(isMyanmar ? 'en' : 'my')}
            className="flex items-center gap-1 rounded-xl bg-slate-900/90 border border-slate-800 px-2.5 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
            title="Toggle Language / ဘာသာစကား ပြောင်းရန်"
          >
            <Globe className="h-3.5 w-3.5 text-cyan-400" />
            <span className="font-medium text-[11px] sm:text-xs">{isMyanmar ? '🇲🇲' : '🇬🇧'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};

