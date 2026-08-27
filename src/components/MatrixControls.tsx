import React from 'react';
import { Language, MatrixSelection } from '../types';
import {
  CAMERA_OPTIONS,
  COLOR_GRADE_OPTIONS,
  QUALITY_PROFILES,
  ASPECT_RATIOS
} from '../data/presetData';
import { Camera, Film, Award, Sliders, Maximize2 } from 'lucide-react';
import { SubjectPreserveFeatureBox } from './SubjectPreserveFeatureBox';

interface MatrixControlsProps {
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
}

export const MatrixControls: React.FC<MatrixControlsProps> = ({
  language,
  selection,
  onUpdateSelection
}) => {
  const isMyanmar = language === 'my';

  return (
    <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md p-4 sm:p-5 shadow-2xl space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-bold text-slate-100">
            {isMyanmar ? 'ဓာတ်ပုံစတူဒီယို မက်ထရစ် ကန့်သတ်ချက်များ' : 'Studio Matrix Control Board'}
          </h2>
        </div>
        <span className="text-[11px] font-semibold text-slate-400">
          6-Axis Professional Settings
        </span>
      </div>

      {/* 🔒 100% Subject Lock & Environment Upgrade Feature Box */}
      <SubjectPreserveFeatureBox
        selection={selection}
        onUpdateSelection={onUpdateSelection}
        isMyanmar={isMyanmar}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        {/* 1. Camera & Lens */}
        <div className="rounded-xl bg-slate-950/70 p-3.5 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-cyan-400">
              <Camera className="h-3.5 w-3.5" />
              <span>1. Camera & Lens</span>
            </label>
            <select
              value={selection.camera || 'default_photo'}
              onChange={(e) => onUpdateSelection({ camera: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {CAMERA_OPTIONS.map((cam) => (
                <option key={cam.id} value={cam.id} className="bg-slate-900 text-slate-200">
                  {isMyanmar ? (cam.labelMm || cam.label) : (cam.labelEn || cam.label)}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-1.5 border-t border-slate-800/60 text-[10px] text-cyan-300/90 leading-tight space-y-0.5">
            <p className="font-semibold truncate">📸 {CAMERA_OPTIONS.find(c => c.id === (selection.camera || 'default_photo'))?.lens || '50mm Natural Prime'}</p>
            <p className="text-[9px] text-slate-400">Aperture: {CAMERA_OPTIONS.find(c => c.id === (selection.camera || 'default_photo'))?.aperture || 'f/1.8'}</p>
          </div>
        </div>

        {/* 2. Color Grade & Film Stock */}
        <div className="rounded-xl bg-slate-950/70 p-3.5 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Film className="h-3.5 w-3.5" />
              <span>2. {isMyanmar ? 'ဖလင် အရောင်တိုနင်' : 'Color Grade & Film'}</span>
            </label>

            <select
              value={selection.colorGrade || 'skip'}
              onChange={(e) => onUpdateSelection({ colorGrade: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs text-slate-200 focus:border-amber-500 focus:outline-none cursor-pointer"
            >
              {COLOR_GRADE_OPTIONS.map((col) => (
                <option key={col.id} value={col.id} className="bg-slate-900 text-slate-200">
                  {isMyanmar ? col.labelMm : col.labelEn}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-1.5 border-t border-slate-800/60 text-[10px] text-amber-300/90 leading-tight">
            <p className="font-semibold truncate">🎞️ {COLOR_GRADE_OPTIONS.find(col => col.id === (selection.colorGrade || 'skip'))?.filmStock || 'Standard Profile'}</p>
          </div>
        </div>

        {/* 3. Aspect Ratio */}
        <div className="rounded-xl bg-slate-950/70 p-3.5 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <Maximize2 className="h-3.5 w-3.5" />
              <span>3. {isMyanmar ? 'ဓာတ်ပုံ အချိုးအစား' : 'Aspect Ratio'}</span>
            </label>

            <select
              value={selection.aspectRatio || '9:16'}
              onChange={(e) => onUpdateSelection({ aspectRatio: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs text-slate-200 focus:border-emerald-500 focus:outline-none cursor-pointer"
            >
              {ASPECT_RATIOS.map((ar) => (
                <option key={ar.id} value={ar.ratio} className="bg-slate-900 text-slate-200">
                  {ar.ratio} - {ar.label}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-1.5 border-t border-slate-800/60 text-[10px] text-emerald-300/90 leading-tight">
            {(() => {
              const currentAr = ASPECT_RATIOS.find(ar => ar.ratio === (selection.aspectRatio || '9:16') || ar.id === selection.aspectRatio);
              return (
                <p className="font-semibold font-mono">📐 Resolution: {currentAr?.width || 768} × {currentAr?.height || 1344} px</p>
              );
            })()}
          </div>
        </div>

        {/* 4. Quality Profile */}
        <div className="rounded-xl bg-slate-950/70 p-3.5 border border-slate-800 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-400">
              <Award className="h-3.5 w-3.5" />
              <span>4. {isMyanmar ? 'Quality Engine ဆက်တင်' : 'Quality Engine'}</span>
            </label>

            <select
              value={selection.qualityProfile || 'high_end_commercial'}
              onChange={(e) => onUpdateSelection({ qualityProfile: e.target.value })}
              className="w-full rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none cursor-pointer"
            >
              {QUALITY_PROFILES.map((qp) => (
                <option key={qp.id} value={qp.id} className="bg-slate-900 text-slate-200">
                  {isMyanmar ? (qp.labelMm || qp.label) : (qp.labelEn || qp.label)}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-1.5 border-t border-slate-800/60 text-[10px] text-indigo-300/90 leading-tight space-y-0.5">
            {(() => {
              const currentQp = QUALITY_PROFILES.find(qp => qp.id === (selection.qualityProfile || 'high_end_commercial'));
              return (
                <>
                  <p className="font-semibold truncate">⚡ {currentQp?.engine || 'Flux.1 Pro Engine'}</p>
                  <p className="text-[9px] text-slate-400 truncate" title={currentQp?.detailLevel}>
                    {currentQp?.detailLevel}
                  </p>
                </>
              );
            })()}
          </div>
        </div>

      </div>

    </div>
  );
};
