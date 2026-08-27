import React, { useState, useRef } from 'react';
import {
  AppMode,
  Language,
  MatrixSelection
} from '../types';
import {
  SUBJECT_OPTIONS,
  PET_OPTIONS,
  PRODUCT_OPTIONS,
  FASHION_OPTIONS,
  WEDDING_COUPLE_OPTIONS,
  LOVERS_COUPLE_OPTIONS,
  ALL_COUPLE_OPTIONS,
  EVENT_OPTIONS,
  LOCATION_OPTIONS,
  LIGHTING_OPTIONS,
  TIME_OF_DAY_OPTIONS,
  MOOD_OPTIONS,
  CAMERA_OPTIONS,
  CAMERA_ANGLE_OPTIONS,
  PHOTO_STYLE_OPTIONS,
  RETOUCH_OPTIONS,
  MAKEUP_OPTIONS,
  COLOR_GRADE_OPTIONS,
  ASPECT_RATIOS,
  QUALITY_PROFILES,
  GARMENT_OPTIONS,
  IDENTITY_LOCK_OPTIONS,
  ETHNICITY_OPTIONS,
  CULTURAL_PROP_PRESETS,
  POSE_EXPRESSION_OPTIONS,
  AGE_RANGE_OPTIONS,
  CHILD_AGE_OPTIONS,
  HEIGHT_OPTIONS,
  WEIGHT_OPTIONS,
  COUPLE_POSES_OPTIONS,
  GROOM_OUTFIT_OPTIONS,
  GROOM_TOP_OPTIONS,
  GROOM_BOTTOM_OPTIONS,
  GROOM_EXPRESSION_OPTIONS,
  GROOM_HAIR_OPTIONS,
  GROOM_ACCESSORY_PRESETS,
  BRIDE_OUTFIT_OPTIONS,
  BRIDE_TOP_OPTIONS,
  BRIDE_BOTTOM_OPTIONS,
  BRIDE_EXPRESSION_OPTIONS,
  BRIDE_HAIR_OPTIONS,
  BRIDE_ACCESSORY_PRESETS
} from '../data/presetData';
import { CoupleDetailsCustomizer } from './CoupleDetailsCustomizer';
import { WeddingPropsPanel } from './WeddingPropsPanel';
import { SubjectPreserveFeatureBox } from './SubjectPreserveFeatureBox';
import { CulturalPropsDropdown } from './CulturalPropsDropdown';
import { GarmentSelectionCarousel } from './GarmentSelectionCarousel';
import { CustomGarmentUploader } from './CustomGarmentUploader';
import { ClothesSwapPanel } from './ClothesSwapPanel';
import { EventSelectionCarousel } from './EventSelectionCarousel';
import { LocationSelectionCarousel } from './LocationSelectionCarousel';
import { LightingSelectionCarousel } from './LightingSelectionCarousel';
import { SkinRetouchSelectionCarousel } from './SkinRetouchSelectionCarousel';
import { PoseSelectionCarousel } from './PoseSelectionCarousel';
import { FilmColorSelectionCarousel } from './FilmColorSelectionCarousel';
import { MakeupSelectionCarousel } from './MakeupSelectionCarousel';
import { MoodSelectionCarousel } from './MoodSelectionCarousel';
import { CameraSelectionCarousel } from './CameraSelectionCarousel';
import { PhotoStyleSelectionCarousel } from './PhotoStyleSelectionCarousel';
import { CameraAngleSelectionCarousel } from './CameraAngleSelectionCarousel';
import { QualityEngineSelectionCarousel } from './QualityEngineSelectionCarousel';
import { Sparkles, MessageSquare, ArrowRight, RefreshCcw, User, Calendar, MapPin, Sun, Shirt, Sliders, Lock, Globe, Package, Smile, Clock, Mountain, Heart, UserCheck, Ruler, Scale, ChevronLeft, ChevronRight } from 'lucide-react';

interface InteractiveChatPanelProps {
  currentMode: AppMode;
  onModeChange?: (mode: AppMode) => void;
  language: Language;
  selection: MatrixSelection;
  onUpdateSelection: (updates: Partial<MatrixSelection>) => void;
  onGeneratePrompt?: () => void;
  isGenerating?: boolean;
}

export const InteractiveChatPanel: React.FC<InteractiveChatPanelProps> = ({
  currentMode,
  onModeChange,
  language,
  selection,
  onUpdateSelection,
  onGeneratePrompt,
  isGenerating
}) => {
  const isMyanmar = language === 'my';
  const [activeTab, setActiveTab] = useState<'wizard' | 'custom'>('wizard');
  const [customText, setCustomText] = useState(selection.customInstruction || '');

  // Keep customText synced if selection.customInstruction is modified externally
  React.useEffect(() => {
    if (selection.customInstruction !== undefined && selection.customInstruction !== customText) {
      setCustomText(selection.customInstruction);
    }
  }, [selection.customInstruction]);
  const [assistantInputValue, setAssistantInputValue] = useState('');
  const [userAgeMode, setUserAgeMode] = useState<'child' | 'adult' | null>(null);

  // Toggle state to show/hide human/character options in Background Only mode
  const [showPersonBoxesInBackgroundMode, setShowPersonBoxesInBackgroundMode] = useState<boolean>(false);

  // Helper boolean: Hide person/character specific boxes when in Background Only mode unless user toggles the option key on
  const shouldHidePersonBoxes = currentMode === 'background-only' && !showPersonBoxesInBackgroundMode;

  const [activeSubTab, setActiveSubTab] = useState<'pet' | 'product' | 'fashion' | 'couple_wedding' | 'couple_lovers'>(
    selection.subject === 'product' ? 'product' : selection.subject === 'fashion' ? 'fashion' : selection.subject === 'couple' ? 'couple_wedding' : 'pet'
  );
  const [locationCategoryFilter, setLocationCategoryFilter] = useState<'all' | 'studio' | 'outdoor' | 'indoor' | 'fantasy'>('all');

  const currentSubOptionsList = activeSubTab === 'pet' ? PET_OPTIONS 
    : activeSubTab === 'product' ? PRODUCT_OPTIONS 
    : activeSubTab === 'fashion' ? FASHION_OPTIONS
    : activeSubTab === 'couple_wedding' ? WEDDING_COUPLE_OPTIONS
    : activeSubTab === 'couple_lovers' ? LOVERS_COUPLE_OPTIONS
    : ALL_COUPLE_OPTIONS;

  const effectiveAgeMode = userAgeMode || (selection.subject === 'child' ? 'child' : 'adult');
  const allAgeOptions = [...CHILD_AGE_OPTIONS, ...AGE_RANGE_OPTIONS];
  const displayAgeOptions = effectiveAgeMode === 'child' ? CHILD_AGE_OPTIONS : AGE_RANGE_OPTIONS;

  const heightScrollRef = useRef<HTMLDivElement>(null);
  const weightScrollRef = useRef<HTMLDivElement>(null);

  const handleHeightScroll = (direction: 'left' | 'right') => {
    if (heightScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      heightScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleWeightScroll = (direction: 'left' | 'right') => {
    if (weightScrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      weightScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleAssistantSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = assistantInputValue.trim().toLowerCase();
    if (!val) return;

    // Check Mode selection
    if (val === '1' && onModeChange) {
      // If user typed 1 in mode context or wants Img2Img
      onModeChange('img2img');
      setAssistantInputValue('');
      return;
    } else if (val === '2' && onModeChange) {
      onModeChange('txt2img');
      setAssistantInputValue('');
      return;
    } else if (val === '3' && onModeChange) {
      onModeChange('clothes-swap');
      setAssistantInputValue('');
      return;
    } else if (val === '4' && onModeChange) {
      onModeChange('background-only');
      setAssistantInputValue('');
      return;
    } else if (val.includes('img2img') || val.includes('ဓာတ်ပုံ')) {
      if (onModeChange) onModeChange('img2img');
      setAssistantInputValue('');
      return;
    } else if (val.includes('txt2img') || val.includes('စာသား')) {
      if (onModeChange) onModeChange('txt2img');
      setAssistantInputValue('');
      return;
    } else if (val.includes('clothes') || val.includes('swap') || val.includes('အဝတ်အစား')) {
      if (onModeChange) onModeChange('clothes-swap');
      setAssistantInputValue('');
      return;
    } else if (val.includes('background') || val.includes('နောက်ခံ')) {
      if (onModeChange) onModeChange('background-only');
      setAssistantInputValue('');
      return;
    }

    // Identity Lock selections
    if (val.includes('face lock 100') || val.includes('face lock') || val.includes('တစ်ထပ်တည်း')) {
      onUpdateSelection({ identityLock: 'face_100' });
    } else if (val.includes('face + body') || val.includes('face body')) {
      onUpdateSelection({ identityLock: 'face_body_lock' });
    } else if (val.includes('soft reference')) {
      onUpdateSelection({ identityLock: 'soft_ref' });
    } else if (val.includes('no lock')) {
      onUpdateSelection({ identityLock: 'no_lock' });
    }

    // Ethnicity recognition
    if (val.includes('burmese') || val.includes('မြန်မာ')) {
      onUpdateSelection({ ethnicity: 'burmese' });
    } else if (val.includes('thai') || val.includes('ထိုင်း')) {
      onUpdateSelection({ ethnicity: 'thai' });
    } else if (val.includes('korean') || val.includes('ကိုရီးယား')) {
      onUpdateSelection({ ethnicity: 'korean' });
    } else if (val.includes('japanese') || val.includes('ဂျပန်')) {
      onUpdateSelection({ ethnicity: 'japanese' });
    } else if (val.includes('chinese') || val.includes('တရုတ်')) {
      onUpdateSelection({ ethnicity: 'chinese' });
    } else if (val.includes('indian') || val.includes('အိန္ဒိယ')) {
      onUpdateSelection({ ethnicity: 'indian' });
    } else if (val.includes('western') || val.includes('caucasian') || val.includes('အနောက်တိုင်း')) {
      onUpdateSelection({ ethnicity: 'western' });
    } else if (val.includes('african') || val.includes('အာဖရိက')) {
      onUpdateSelection({ ethnicity: 'african' });
    }

    // Cultural Props recognition
    if (val.includes('thanaka') || val.includes('သနပ်ခါး')) {
      onUpdateSelection({ includeCulturalProps: true, culturalPropsDetails: 'Thanaka Bark Paste Marks on Cheeks' });
    } else if (val.includes('garland') || val.includes('ပန်းကုံး') || val.includes('စပယ်')) {
      onUpdateSelection({ includeCulturalProps: true, culturalPropsDetails: 'Fragrant Jasmine Flower Garland' });
    } else if (val.includes('umbrella') || val.includes('ထီး') || val.includes('ပုသိမ်')) {
      onUpdateSelection({ includeCulturalProps: true, culturalPropsDetails: 'Pathein Hand-painted Oil-paper Umbrella' });
    } else if (val.includes('no props') || val.includes('မလိုပါ')) {
      onUpdateSelection({ includeCulturalProps: false, culturalPropsDetails: '' });
    }

    // Camera / Art Style
    if (val.includes('default photo') || val.includes('default') || val.includes('ရိုးရိုး')) {
      onUpdateSelection({ camera: 'default_photo' });
    } else if (val.includes('cinematic') || val.includes('ရုပ်ရှင်')) {
      onUpdateSelection({ camera: 'cinematic' });
    } else if (val.includes('fashion editorial') || val.includes('editorial') || val.includes('ဖက်ရှင်')) {
      onUpdateSelection({ camera: 'fashion_editorial' });
    }
    // Retouching
    else if (val.includes('natural skin') || val.includes('natural') || val.includes('သဘာဝ')) {
      onUpdateSelection({ retouching: 'natural' });
    } else if (val.includes('commercial') || val.includes('ကြော်ငြာ')) {
      onUpdateSelection({ retouching: 'high_end_commercial' });
    } else if (val.includes('beauty') || val.includes('အလှအပ')) {
      onUpdateSelection({ retouching: 'beauty' });
    }
    // Makeup
    else if (val.includes('skip') || val.includes('no makeup')) {
      onUpdateSelection({ makeup: 'skip' });
    } else if (val.includes('glam')) {
      onUpdateSelection({ makeup: 'glam' });
    }
    // Color Grading
    else if (val.includes('teal-orange') || val.includes('teal orange')) {
      onUpdateSelection({ colorGrade: 'teal_orange' });
    } else if (val.includes('warm film')) {
      onUpdateSelection({ colorGrade: 'warm_film' });
    } else if (val.includes('cool cinematic')) {
      onUpdateSelection({ colorGrade: 'cool_cinematic' });
    }
    // Aspect Ratio
    else if (val.includes('4:5')) {
      onUpdateSelection({ aspectRatio: '4:5' });
    } else if (val.includes('3:4')) {
      onUpdateSelection({ aspectRatio: '3:4' });
    } else if (val.includes('16:9')) {
      onUpdateSelection({ aspectRatio: '16:9' });
    } else if (val.includes('1:1')) {
      onUpdateSelection({ aspectRatio: '1:1' });
    }
    // Lighting / Time of Day selection keywords
    else if (val.includes('golden hour') || val.includes('ရွှေရောင်')) {
      onUpdateSelection({ timeAndLighting: 'golden_hour' });
    } else if (val.includes('blue hour') || val.includes('ဆည်းဆာ')) {
      onUpdateSelection({ timeAndLighting: 'blue_hour' });
    } else if (val.includes('midday') || val.includes('မွန်းတည့်')) {
      onUpdateSelection({ timeAndLighting: 'midday_sun' });
    } else if (val.includes('overcast') || val.includes('တိမ်အုပ်')) {
      onUpdateSelection({ timeAndLighting: 'soft_overcast' });
    } else if (val.includes('night') || val.includes('ညမီးရောင်')) {
      onUpdateSelection({ timeAndLighting: 'night_lighting' });
    } else if (val.includes('natural') || val.includes('သဘာဝအလင်း')) {
      onUpdateSelection({ timeAndLighting: 'soft_natural' });
    } else if (val.includes('rembrandt') || val.includes('ရမ်ဘရန့်')) {
      onUpdateSelection({ timeAndLighting: 'studio_rembrandt' });
    } else if (val.includes('rim light') || val.includes('အနားသတ်')) {
      onUpdateSelection({ timeAndLighting: 'rim_light' });
    } else if (val.includes('neon') || val.includes('မီးရောင်')) {
      onUpdateSelection({ timeAndLighting: 'neon_practical' });
    } else if (val.includes('candle') || val.includes('ဖယောင်းတိုင်')) {
      onUpdateSelection({ timeAndLighting: 'warm_candlelight' });
    } else if (val.includes('dramatic') || val.includes('ရုပ်ရှင်ဆန်')) {
      onUpdateSelection({ timeAndLighting: 'cinematic_dramatic' });
    } else if (val.includes('modern studio') || val.includes('စတူဒီယို')) {
      onUpdateSelection({ location: 'modern_studio' });
    } else if (val.includes('golden hour') || val.includes('ကွင်းပြင်')) {
      onUpdateSelection({ location: 'outdoor_golden_hour' });
    } else if (val.includes('hotel') || val.includes('lobby') || val.includes('ဟိုတယ်')) {
      onUpdateSelection({ location: 'luxury_hotel_lobby' });
    } else if (val.includes('street') || val.includes('yangon') || val.includes('bangkok') || val.includes('လမ်းမ')) {
      onUpdateSelection({ location: 'street_yangon_bangkok' });
    } else if (val.includes('beach') || val.includes('sunset') || val.includes('ကမ်းခြေ')) {
      onUpdateSelection({ location: 'beach_sunset' });
    } else if (val.includes('mountain') || val.includes('viewpoint') || val.includes('တောင်တန်း')) {
      onUpdateSelection({ location: 'mountain_viewpoint' });
    } else if (val.includes('cafe') || val.includes('café') || val.includes('ကဖေး')) {
      onUpdateSelection({ location: 'cozy_cafe' });
    } else if (val.includes('neon') || val.includes('night') || val.includes('နီယွန်')) {
      onUpdateSelection({ location: 'neon_city_night' });
    } else if (val.includes('myanmar house') || val.includes('အိမ်တော်') || val.includes('ရိုးရာအိမ်')) {
      onUpdateSelection({ location: 'traditional_myanmar_house' });
    } else if (val.includes('thingyan') || val.includes('သင်္ကြန်')) {
      onUpdateSelection({ event: 'thingyan' });
    } else if (val.includes('thadingyut') || val.includes('သီတင်းကျွတ်')) {
      onUpdateSelection({ event: 'thadingyut' });
    } else if (val.includes('wedding') || val.includes('engagement') || val.includes('မင်္ဂလာ')) {
      onUpdateSelection({ event: 'wedding' });
    } else if (val.includes('birthday') || val.includes('မွေးနေ့')) {
      onUpdateSelection({ event: 'birthday' });
    } else if (val.includes('fashion') || val.includes('editorial') || val.includes('ဖက်ရှင်')) {
      onUpdateSelection({ event: 'fashion_editorial' });
    } else if (val.includes('beach') || val.includes('vacation') || val.includes('ကမ်းခြေ')) {
      onUpdateSelection({ event: 'beach_vacation' });
    } else if (val.includes('party') || val.includes('ပါတီ')) {
      onUpdateSelection({ event: 'night_party' });
    } else if (val.includes('corporate') || val.includes('ရုံး') || val.includes('စီးပွားရေး')) {
      onUpdateSelection({ event: 'corporate' });
    } else if (val.includes('maternity') || val.includes('ကိုယ်ဝန်ဆောင်')) {
      onUpdateSelection({ event: 'maternity' });
    } else if (val.includes('cultural') || val.includes('ceremony') || val.includes('ယဉ်ကျေးမှု')) {
      onUpdateSelection({ event: 'cultural_ceremony' });
    } else if (val === '1' || val.includes('အမျိုးသမီး') || val.includes('woman')) {
      onUpdateSelection({ subject: 'woman' });
    } else if (val === '2' || val.includes('အမျိုးသား') || val.includes('man')) {
      onUpdateSelection({ subject: 'man' });
    } else if (val === '3' || val.includes('စုံတွဲ') || val.includes('couple')) {
      onUpdateSelection({ subject: 'couple' });
    } else if (val === '4' || val.includes('ကလေး') || val.includes('child')) {
      onUpdateSelection({ subject: 'child' });
    } else if (val === '5' || val.includes('မိသားစု') || val.includes('family')) {
      onUpdateSelection({ subject: 'family' });
    } else if (val === '6' || val.includes('တိရစ္ဆာန်') || val.includes('pet')) {
      onUpdateSelection({ subject: 'pet' });
    } else if (val === '7' || val.includes('product') || val.includes('object') || val.includes('ကုန်ပစ္စည်း')) {
      onUpdateSelection({ subject: 'product' });
    } else {
      // Set as custom subject detail
      onUpdateSelection({ customSubjectDetails: assistantInputValue });
    }

    setAssistantInputValue('');
  };

  // Helpers to get current active labels
  const currentSubjectObj = SUBJECT_OPTIONS.find(s => s.id === selection.subject) || SUBJECT_OPTIONS[0];
  const currentEventObj = EVENT_OPTIONS.find(e => e.id === selection.event) || EVENT_OPTIONS[0];
  const currentLocationObj = LOCATION_OPTIONS.find(l => l.id === selection.location) || LOCATION_OPTIONS[0];
  const currentLightingObj = LIGHTING_OPTIONS.find(l => l.id === selection.timeAndLighting) || LIGHTING_OPTIONS[0];
  const currentGarmentObj = GARMENT_OPTIONS.find(g => g.id === selection.garmentStyle) || GARMENT_OPTIONS[0];

  return (
    <div className="flex flex-col h-full rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md overflow-hidden shadow-2xl">
      
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-pink-400" />
          <h2 className="text-sm font-bold text-slate-100">
            {isMyanmar ? 'Show Studio AI Assistant' : 'Show Studio AI Assistant'}
          </h2>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-slate-900 p-0.5 border border-slate-800">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              activeTab === 'wizard' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isMyanmar ? 'အဆင့်ဆင့်' : 'Wizard'}
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
              activeTab === 'custom' ? 'bg-pink-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {isMyanmar ? 'စိတ်ကြိုက်စာ' : 'Text Input'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar">

        {/* Background Only Mode Option Key Banner */}
        {currentMode === 'background-only' && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-950/90 via-slate-900/95 to-emerald-950/90 border border-teal-500/60 shadow-xl space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-teal-500/30 pb-2">
              <div className="flex items-center gap-2">
                <Mountain className="h-4 w-4 text-teal-400 animate-pulse" />
                <span className="text-xs font-extrabold text-teal-300 uppercase tracking-wider">
                  {isMyanmar ? '🏞️ နောက်ခံ သီးသန့် မုဒ် (Background Only Mode)' : '🏞️ Background Only Mode'}
                </span>
              </div>

              {/* Option Key Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPersonBoxesInBackgroundMode(!showPersonBoxesInBackgroundMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95 ${
                  showPersonBoxesInBackgroundMode
                    ? 'bg-amber-600 hover:bg-amber-500 text-white border border-amber-300 shadow-[0_0_12px_rgba(217,119,6,0.5)]'
                    : 'bg-teal-700 hover:bg-teal-600 text-white border border-teal-300 shadow-[0_0_12px_rgba(20,184,166,0.5)]'
                }`}
              >
                <Sliders className="h-3.5 w-3.5 text-cyan-200" />
                <span>
                  {isMyanmar
                    ? (showPersonBoxesInBackgroundMode
                        ? '🚫 လူပုဂ္ဂိုလ် ဆက်တင်များ ပြန်ဝှက်ရန်'
                        : '⚙️ လူပုဂ္ဂိုလ်/ဇာတ်ကောင် ဆက်တင်များ ပြသရန် Option Key')
                    : (showPersonBoxesInBackgroundMode
                        ? 'Hide Person Details'
                        : 'Show Person Details Option Key')}
                </span>
              </button>
            </div>

            <p className="text-xs text-teal-200/90 leading-relaxed">
              {isMyanmar
                ? '🏞️ ဤမုဒ်တွင် သဘာဝရှုခင်း၊ ရှေးဟောင်းဘုရားကျောင်း၊ စတူဒီယိုနောက်ခံများကို သီးသန့် ထုတ်လုပ်ရန်အတွက် လူပုဂ္ဂိုလ် ဆက်တင် ၉ မျိုး (ဇာတ်ကောင်၊ ဟန်ပန်၊ အသက်၊ လူမျိုး၊ အသုံးအဆောင်၊ ဝတ်စုံ၊ ခံစားချက်၊ အသားအရေ၊ မိတ်ကပ်) ကို အလိုအလျောက် Hide ပေးထားပါသည်။ လိုအပ်ပါက အထက်ပါ Option Key ဖြင့် ပြန်လည် ဖွင့်/ပိတ် ပြုလုပ်နိုင်ပါသည်။'
                : '🏞️ Human/character settings (Subject, Pose, Age, Ethnicity, Accessories, Garment, Mood, Skin Retouch, Makeup) are hidden by default in Background Only mode. Use the Option Key above to show/hide them anytime.'}
            </p>
          </div>
        )}

        {/* Step 1: Subject Selection with Numbered Items */}
        {!shouldHidePersonBoxes && (
        <div className="space-y-2 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-3.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-wider">
              <User className="h-3.5 w-3.5" />
              <span>{isMyanmar ? 'Subject (ဇာတ်ကောင်) ကို ရွေးပါ:' : 'Select Subject:'}</span>
            </label>
            <span className="text-[11px] text-pink-300 font-bold bg-pink-950/80 px-2 py-0.5 rounded-md border border-pink-800/50">
              {currentSubjectObj.emoji} {isMyanmar ? currentSubjectObj.labelMm : currentSubjectObj.labelEn}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 pt-1">
            {SUBJECT_OPTIONS.map((sub, idx) => {
              const isSelected = selection.subject === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => {
                    if (sub.id === 'pet') {
                      setActiveSubTab('pet');
                      onUpdateSelection({
                        subject: 'pet',
                        customSubjectDetails: selection.customSubjectDetails || PET_OPTIONS[0].promptText
                      });
                    } else if (sub.id === 'product') {
                      setActiveSubTab('product');
                      onUpdateSelection({
                        subject: 'product',
                        customSubjectDetails: selection.customSubjectDetails || PRODUCT_OPTIONS[0].promptText
                      });
                    } else if (sub.id === 'fashion') {
                      setActiveSubTab('fashion');
                      onUpdateSelection({
                        subject: 'fashion',
                        customSubjectDetails: selection.customSubjectDetails || FASHION_OPTIONS[0].promptText,
                        garmentStyle: FASHION_OPTIONS[0].promptText
                      });
                    } else if (sub.id === 'couple') {
                      setActiveSubTab('couple_wedding');
                      onUpdateSelection({
                        subject: 'couple',
                        customSubjectDetails: selection.customSubjectDetails || WEDDING_COUPLE_OPTIONS[0].promptText
                      });
                    } else if (sub.id === 'child') {
                      setUserAgeMode('child');
                      onUpdateSelection({
                        subject: 'child',
                        ageRange: selection.ageRange?.includes('years') ? selection.ageRange : '7_years'
                      });
                    } else {
                      setUserAgeMode('adult');
                      onUpdateSelection({
                        subject: sub.id,
                        ageRange: selection.ageRange?.includes('years') ? '18_25' : selection.ageRange
                      });
                    }
                  }}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 min-h-[44px] text-left text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-pink-950/80 border-pink-500/90 text-pink-100 shadow-[0_0_14px_rgba(255,42,133,0.3)]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`flex h-4 w-4 items-center justify-center rounded-md text-[10px] font-bold ${
                      isSelected ? 'bg-pink-600 text-white' : 'bg-slate-800 border border-slate-700 text-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <span className="text-base">{sub.emoji}</span>
                    <span className="font-semibold">{isMyanmar ? sub.labelMm : sub.labelEn}</span>
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-pink-400 animate-ping"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* 1. Dedicated Couple Sub-Section (Shown ONLY when Couple subject is active) */}
          {selection.subject === 'couple' && (
            <div className="mt-3 space-y-3 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-rose-950/40 border border-rose-500/40 p-3.5 shadow-xl">
              {/* Couple Header & Sub Tabs (မင်္ဂလာဆောင် & ချစ်သူရည်စား ONLY) */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-500/20 pb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-300">
                  <Heart className="h-4 w-4 text-rose-400 fill-rose-400/30 animate-pulse" />
                  <span>
                    {isMyanmar ? '👩‍❤️‍👨 စုံတွဲ ပုံစံ ရွေးချယ်မှု:' : '👩‍❤️‍👨 Select Couple Style:'}
                  </span>
                </div>

                {/* Sub Tabs: ONLY Wedding & Lovers Couple */}
                <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-rose-900/40">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('couple_wedding');
                      onUpdateSelection({ subject: 'couple', coupleOutfitType: 'wedding', customSubjectDetails: WEDDING_COUPLE_OPTIONS[0].promptText });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeSubTab === 'couple_wedding' || selection.coupleOutfitType === 'wedding'
                        ? 'bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md border border-rose-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>💍</span>
                    <span>{isMyanmar ? 'မင်္ဂလာဆောင်' : 'Wedding'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('couple_lovers');
                      onUpdateSelection({ subject: 'couple', coupleOutfitType: 'casual', customSubjectDetails: LOVERS_COUPLE_OPTIONS[0].promptText });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeSubTab === 'couple_lovers' || selection.coupleOutfitType === 'casual'
                        ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md border border-pink-400'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span>👩‍❤️‍👨</span>
                    <span>{isMyanmar ? 'ချစ်သူရည်စား' : 'Lovers'}</span>
                  </button>
                </div>
              </div>

              {/* Sub options list (10 Wedding options or 10 Lovers options) */}
              <div>
                <div className="mb-2 text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-pink-400 animate-pulse" />
                  <span>
                    {activeSubTab === 'couple_wedding' || selection.coupleOutfitType === 'wedding'
                      ? (isMyanmar ? '💍 မင်္ဂလာဆောင် စုံတွဲ Option ၁၀ ခုမှ ရွေးချယ်ပါ:' : '💍 Select from 10 Wedding Couple Presets:')
                      : (isMyanmar ? '👩‍❤️‍👨 ချစ်သူရည်စား စုံတွဲ Option ၁၀ ခုမှ ရွေးချယ်ပါ:' : '👩‍❤️‍👨 Select from 10 Lovers Couple Presets:')}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5">
                  {(activeSubTab === 'couple_lovers' || selection.coupleOutfitType === 'casual' ? LOVERS_COUPLE_OPTIONS : WEDDING_COUPLE_OPTIONS).map((opt) => {
                    const isSelected = selection.customSubjectDetails === opt.promptText || selection.customSubjectDetails?.includes(opt.labelEn);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          onUpdateSelection({
                            subject: 'couple',
                            customSubjectDetails: opt.promptText
                          });
                        }}
                        className={`group flex items-center gap-1.5 rounded-xl px-2 py-1.5 min-h-[38px] text-left text-[11px] font-medium border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                          isSelected
                            ? 'bg-gradient-to-r from-rose-900/90 via-pink-900/90 to-purple-900/90 border-rose-400/90 text-rose-100 shadow-[0_0_12px_rgba(225,29,72,0.35)]'
                            : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                        }`}
                      >
                        <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform">{opt.emoji}</span>
                        <span className="truncate leading-tight font-medium text-[10px] sm:text-[11px]">
                          {isMyanmar ? opt.labelMm : opt.labelEn}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 2. Dedicated Pet / Product / Fashion Sub-Section (Shown ONLY when Pet, Product or Fashion is active) */}
          {(selection.subject === 'pet' || selection.subject === 'product' || selection.subject === 'fashion') && (
            <div className="mt-3 space-y-2.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 p-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>
                    {selection.subject === 'pet'
                      ? (isMyanmar ? '🐶 အိမ်မွေးတိရစ္ဆာန် Option ၂၀ မှ ရွေးချယ်ပါ:' : '🐶 Select from 20 Pet Options:')
                      : selection.subject === 'product'
                      ? (isMyanmar ? '📦 ကုန်ပစ္စည်း Option ၂၀ မှ ရွေးချယ်ပါ:' : '📦 Select from 20 Product Options:')
                      : (isMyanmar ? '👗 ဖက်ရှင်/အဝတ်အစား Option ၂၅ မှ ရွေးချယ်ပါ:' : '👗 Select from 25 Fashion Options:')}
                  </span>
                </div>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1.5 pt-1">
                {(selection.subject === 'pet' ? PET_OPTIONS : selection.subject === 'product' ? PRODUCT_OPTIONS : FASHION_OPTIONS).map((opt) => {
                  const isSelected = selection.customSubjectDetails === opt.promptText || selection.garmentStyle === opt.promptText;

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        if (selection.subject === 'pet') {
                          onUpdateSelection({ subject: 'pet', customSubjectDetails: opt.promptText });
                        } else if (selection.subject === 'product') {
                          onUpdateSelection({ subject: 'product', customSubjectDetails: opt.promptText });
                        } else if (selection.subject === 'fashion') {
                          onUpdateSelection({ subject: 'fashion', customSubjectDetails: opt.promptText, garmentStyle: opt.promptText });
                        }
                      }}
                      className={`group flex items-center gap-1.5 rounded-xl px-2 py-1.5 min-h-[38px] text-left text-[11px] font-medium border transition-all hover:scale-[1.02] active:scale-[0.98] ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-950/90 via-blue-900/90 to-indigo-900/90 border-cyan-400/90 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.35)]'
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform">{opt.emoji}</span>
                      <span className="truncate leading-tight font-medium text-[10px] sm:text-[11px]">
                        {isMyanmar ? opt.labelMm : opt.labelEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Optional detail input for subject */}
          <div className="pt-1">
            <input
              type="text"
              placeholder={isMyanmar ? "ဇာတ်ကောင်အသေးစိတ် (ဥပမာ- အသက် ၂၀ အရွယ် မျက်မှန်နှင့် အမျိုးသမီး)..." : "Specific subject detail (e.g. 24yo asian model with glasses)..."}
              value={selection.customSubjectDetails || ''}
              onChange={(e) => onUpdateSelection({ customSubjectDetails: e.target.value })}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-pink-500 focus:outline-none"
            />
          </div>

          {/* Couple Granular Customization Block (Groom & Bride details with Horizontal Carousels & Dropdowns) */}
          {selection.subject === 'couple' && (
            <>
              <CoupleDetailsCustomizer
                selection={selection}
                onUpdateSelection={onUpdateSelection}
                isMyanmar={isMyanmar}
              />

              {/* 💍 WEDDING PROPS, STUDIO BACKDROPS & ETHNIC GROUPS (3 ERAS) */}
              <WeddingPropsPanel
                selection={selection}
                onUpdateSelection={onUpdateSelection}
                isMyanmar={isMyanmar}
              />
            </>
          )}
        </div>
        )}

        {/* Pose & Expression Selection (ဟန်ပန် နှင့် အမူအရာ - ၂၅ မျိုး ဘေးတိုက် Carousel) */}
        {!shouldHidePersonBoxes && (
          <PoseSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />
        )}

        {/* Age Range Selection (အသက်အရွယ် အပိုင်းအခြား) */}
        {!shouldHidePersonBoxes && (
          <div className="space-y-2 rounded-2xl bg-slate-950/60 border border-amber-800/80 p-3.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <label className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Clock className="h-3.5 w-3.5" />
              <span>
                {isMyanmar
                  ? effectiveAgeMode === 'child'
                    ? 'ကလေး အသက် ရွေးပါ (၃ နှစ် မှ ၁၂ နှစ် အထိ):'
                    : 'အသက်အရွယ် အပိုင်းအခြား ရွေးပါ (Age Range):'
                  : effectiveAgeMode === 'child'
                  ? 'Select Child Age (3 to 12 Years):'
                  : 'Select Age Range:'}
              </span>
            </label>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setUserAgeMode('child')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                    effectiveAgeMode === 'child' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isMyanmar ? 'ကလေး (၃–၁၂)' : 'Child (3–12)'}
                </button>
                <button
                  type="button"
                  onClick={() => setUserAgeMode('adult')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded transition-all ${
                    effectiveAgeMode === 'adult' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isMyanmar ? 'လူကြီး' : 'Adult'}
                </button>
              </div>

              <span className="text-[11px] text-amber-300 font-bold bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-800/50">
                {allAgeOptions.find(a => a.id === (selection.ageRange || (effectiveAgeMode === 'child' ? '7_years' : '18_25')))?.emoji || '🧒'}{' '}
                {isMyanmar
                  ? allAgeOptions.find(a => a.id === (selection.ageRange || (effectiveAgeMode === 'child' ? '7_years' : '18_25')))?.labelMm
                  : allAgeOptions.find(a => a.id === (selection.ageRange || (effectiveAgeMode === 'child' ? '7_years' : '18_25')))?.labelEn}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5 pt-1">
            {displayAgeOptions.map((age) => {
              const currentAge = selection.ageRange || (effectiveAgeMode === 'child' ? '7_years' : '18_25');
              const isSelected = currentAge === age.id;
              return (
                <button
                  key={age.id}
                  type="button"
                  onClick={() => {
                    if (effectiveAgeMode === 'child') {
                      onUpdateSelection({ ageRange: age.id, subject: 'child' });
                    } else {
                      onUpdateSelection({ ageRange: age.id });
                    }
                  }}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-2 min-h-[40px] text-left text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-amber-950/90 border-amber-400 text-amber-100 shadow-[0_0_12px_rgba(245,158,11,0.3)] font-bold'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-base">{age.emoji}</span>
                    <span className="truncate">{isMyanmar ? age.labelMm : age.labelEn}</span>
                  </span>
                  {isSelected && (
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping shrink-0"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        )}

        {/* Height / Stature Selection (အရပ်အမြင့် ရွေးချယ်မှု ကဏ္ဍ - Dropdown + Horizontally Scrollable) */}
        {!shouldHidePersonBoxes && (
          <div className="space-y-2.5 rounded-2xl bg-slate-950/60 border border-sky-800/60 p-3.5 shadow-md">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label className="flex items-center gap-1.5 text-xs font-bold text-sky-400 uppercase tracking-wider">
                <Ruler className="h-3.5 w-3.5" />
                <span>{isMyanmar ? 'အရပ်အမြင့် ရွေးပါ (Height / Stature):' : 'Select Height / Stature:'}</span>
              </label>

              <div className="flex items-center gap-2">
                {selection.heightRange && selection.heightRange !== 'skip' && (
                  <span className="text-[11px] text-sky-300 font-bold bg-sky-950/80 px-2.5 py-0.5 rounded-md border border-sky-700/60 shadow-sm flex items-center gap-1">
                    <span>{HEIGHT_OPTIONS.find(h => h.id === selection.heightRange)?.emoji || '📏'}</span>
                    <span>
                      {isMyanmar
                        ? HEIGHT_OPTIONS.find(h => h.id === selection.heightRange)?.labelMm
                        : HEIGHT_OPTIONS.find(h => h.id === selection.heightRange)?.labelEn}
                    </span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onUpdateSelection({ heightRange: 'skip' })}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-bold px-2 py-0.5 rounded border border-slate-700/80 transition-all flex items-center gap-1"
                >
                  🚫 {isMyanmar ? 'မူလအတိုင်း ထားပါ' : 'Reset Height'}
                </button>
              </div>
            </div>

            {/* Dropdown Menu for Height */}
            <div className="space-y-1">
              <select
                value={selection.heightRange || ''}
                onChange={(e) => onUpdateSelection({ heightRange: e.target.value })}
                className="w-full rounded-xl bg-slate-900/90 border border-sky-800/80 px-3 py-2 text-xs text-sky-100 font-semibold focus:border-sky-400 focus:outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="">{isMyanmar ? '-- ရွေးပါ --' : '-- Select Height --'}</option>
                {HEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-950 text-slate-200">
                    • {isMyanmar ? opt.labelMm : opt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Horizontally Scrollable Carousel for Height (ဘေးတိုက်ဆွဲလို့ရအောင်) */}
            <div className="relative group/hscroll pt-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1 pb-1">
                <span>{isMyanmar ? '👉 ဘေးသို့ဆွဲ၍ ရွေးချယ်နိုင်ပါသည် (Swipe / Scroll)' : '👉 Swipe / Scroll horizontally to select:'}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleHeightScroll('left')}
                    className="p-1 rounded-lg bg-slate-900/90 hover:bg-sky-900/80 text-sky-300 border border-slate-700/80 hover:border-sky-600 transition-all"
                    title="Previous"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHeightScroll('right')}
                    className="p-1 rounded-lg bg-slate-900/90 hover:bg-sky-900/80 text-sky-300 border border-slate-700/80 hover:border-sky-600 transition-all"
                    title="Next"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div
                ref={heightScrollRef}
                className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar scroll-smooth snap-x touch-pan-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {HEIGHT_OPTIONS.map((opt) => {
                  const isSelected = selection.heightRange === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onUpdateSelection({ heightRange: '' });
                        } else {
                          onUpdateSelection({ heightRange: opt.id });
                        }
                      }}
                      className={`snap-start shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 min-h-[38px] text-xs whitespace-nowrap font-medium border transition-all ${
                        isSelected
                          ? 'bg-sky-950/90 border-sky-400 text-sky-100 shadow-[0_0_14px_rgba(56,189,248,0.35)] font-bold ring-1 ring-sky-400'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-sky-800/80 hover:bg-slate-800/80 hover:text-slate-100'
                      }`}
                    >
                      <span className="text-sm">{opt.emoji}</span>
                      <span>{isMyanmar ? opt.labelMm : opt.labelEn}</span>
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-ping ml-0.5"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Weight / Body Build Selection (အလေးချိန် ရွေးချယ်မှု ကဏ္ဍ - Dropdown + Horizontally Scrollable) */}
        {!shouldHidePersonBoxes && (
          <div className="space-y-2.5 rounded-2xl bg-slate-950/60 border border-teal-800/60 p-3.5 shadow-md">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label className="flex items-center gap-1.5 text-xs font-bold text-teal-400 uppercase tracking-wider">
                <Scale className="h-3.5 w-3.5" />
                <span>{isMyanmar ? 'အလေးချိန် ရွေးပါ (Weight / Build):' : 'Select Weight / Build:'}</span>
              </label>

              <div className="flex items-center gap-2">
                {selection.weightRange && selection.weightRange !== 'skip' && (
                  <span className="text-[11px] text-teal-300 font-bold bg-teal-950/80 px-2.5 py-0.5 rounded-md border border-teal-700/60 shadow-sm flex items-center gap-1">
                    <span>{WEIGHT_OPTIONS.find(w => w.id === selection.weightRange)?.emoji || '⚖️'}</span>
                    <span>
                      {isMyanmar
                        ? WEIGHT_OPTIONS.find(w => w.id === selection.weightRange)?.labelMm
                        : WEIGHT_OPTIONS.find(w => w.id === selection.weightRange)?.labelEn}
                    </span>
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onUpdateSelection({ weightRange: 'skip' })}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-bold px-2 py-0.5 rounded border border-slate-700/80 transition-all flex items-center gap-1"
                >
                  🚫 {isMyanmar ? 'မူလအတိုင်း ထားပါ' : 'Reset Weight'}
                </button>
              </div>
            </div>

            {/* Dropdown Menu for Weight */}
            <div className="space-y-1">
              <select
                value={selection.weightRange || ''}
                onChange={(e) => onUpdateSelection({ weightRange: e.target.value })}
                className="w-full rounded-xl bg-slate-900/90 border border-teal-800/80 px-3 py-2 text-xs text-teal-100 font-semibold focus:border-teal-400 focus:outline-none transition-all cursor-pointer shadow-inner"
              >
                <option value="">{isMyanmar ? '-- ရွေးပါ --' : '-- Select Weight --'}</option>
                {WEIGHT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id} className="bg-slate-950 text-slate-200">
                    • {isMyanmar ? opt.labelMm : opt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Horizontally Scrollable Carousel for Weight (ဘေးတိုက်ဆွဲလို့ရအောင်) */}
            <div className="relative group/wscroll pt-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium px-1 pb-1">
                <span>{isMyanmar ? '👉 ဘေးသို့ဆွဲ၍ ရွေးချယ်နိုင်ပါသည် (Swipe / Scroll)' : '👉 Swipe / Scroll horizontally to select:'}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleWeightScroll('left')}
                    className="p-1 rounded-lg bg-slate-900/90 hover:bg-teal-900/80 text-teal-300 border border-slate-700/80 hover:border-teal-600 transition-all"
                    title="Previous"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWeightScroll('right')}
                    className="p-1 rounded-lg bg-slate-900/90 hover:bg-teal-900/80 text-teal-300 border border-slate-700/80 hover:border-teal-600 transition-all"
                    title="Next"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div
                ref={weightScrollRef}
                className="flex items-center gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar scroll-smooth snap-x touch-pan-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {WEIGHT_OPTIONS.map((opt) => {
                  const isSelected = selection.weightRange === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          onUpdateSelection({ weightRange: '' });
                        } else {
                          onUpdateSelection({ weightRange: opt.id });
                        }
                      }}
                      className={`snap-start shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 min-h-[38px] text-xs whitespace-nowrap font-medium border transition-all ${
                        isSelected
                          ? 'bg-teal-950/90 border-teal-400 text-teal-100 shadow-[0_0_14px_rgba(45,212,191,0.35)] font-bold ring-1 ring-teal-400'
                          : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-teal-800/80 hover:bg-slate-800/80 hover:text-slate-100'
                      }`}
                    >
                      <span className="text-sm">{opt.emoji}</span>
                      <span>{isMyanmar ? opt.labelMm : opt.labelEn}</span>
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-ping ml-0.5"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Ethnicity & Culture Selection (လူမျိုး နှင့် ယဉ်ကျေးမှု) */}
        {!shouldHidePersonBoxes && (
          <div className="space-y-2.5 rounded-2xl bg-slate-950/60 border border-emerald-800/60 p-3.5">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <label className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                <Globe className="h-3.5 w-3.5" />
                <span>{isMyanmar ? 'လူမျိုး နှင့် ယဉ်ကျေးမှု ရွေးပါ:' : 'Select Ethnicity & Culture:'}</span>
              </label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onUpdateSelection({ ethnicity: 'skip', customEthnicityDetails: '' })}
                  className="text-[10px] bg-slate-800/80 hover:bg-slate-700/80 text-amber-300 font-bold px-2 py-0.5 rounded border border-slate-700/80 transition-all flex items-center gap-1"
                >
                  🚫 {isMyanmar ? 'ကျော်သွားပါ' : 'Skip'}
                </button>
                <span className="text-[11px] text-emerald-300 font-bold bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800/50">
                  {ETHNICITY_OPTIONS.find(e => e.id === (selection.ethnicity || 'burmese'))?.emoji} {isMyanmar ? ETHNICITY_OPTIONS.find(e => e.id === (selection.ethnicity || 'burmese'))?.labelMm : ETHNICITY_OPTIONS.find(e => e.id === (selection.ethnicity || 'burmese'))?.labelEn}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 pt-1">
              {ETHNICITY_OPTIONS.map((eth) => {
                const currentEth = selection.ethnicity || 'burmese';
                const isSelected = currentEth === eth.id;
                return (
                  <button
                    key={eth.id}
                    onClick={() => onUpdateSelection({ ethnicity: eth.id })}
                    className={`flex items-center justify-between rounded-xl px-2.5 py-2 min-h-[40px] text-left text-xs font-medium border transition-all ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 shadow-[0_0_12px_rgba(16,185,129,0.3)] font-bold'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <span className="text-sm">{eth.emoji}</span>
                      <span className="truncate">{isMyanmar ? eth.labelMm : eth.labelEn}</span>
                    </span>
                    {isSelected && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {(selection.ethnicity === 'custom' || selection.customEthnicityDetails) && (
              <div className="pt-1">
                <input
                  type="text"
                  placeholder={isMyanmar ? "အခြား လူမျိုး / ယဉ်ကျေးမှု အသေးစိတ် ရေးပါ (ဥပမာ- ရှမ်း၊ ကရင်၊ သက္ကရာဇ် ရိုးရာ)..." : "Specific custom ethnicity details..."}
                  value={selection.customEthnicityDetails || ''}
                  onChange={(e) => onUpdateSelection({ customEthnicityDetails: e.target.value })}
                  className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                />
              </div>
            )}
          </div>
        )}

        {/* Cultural Props / Accessories (အသုံးဆောင် / ယဉ်ကျေးမှု ပစ္စည်းများ) */}
        {!shouldHidePersonBoxes && (
          <CulturalPropsDropdown
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />
        )}

        {/* Garment / Outfit Selection (အဝတ်အစား စတိုင်လ် - ၃၂ မျိုး ဘေးတိုက် Carousel) */}
        {!shouldHidePersonBoxes && currentMode !== 'clothes-swap' && (
          <GarmentSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />
        )}

        {/* Step 2: Event & Festival Selection (ပွဲတော်များ - ၃၀ မျိုး ဘေးတိုက် Carousel) */}
        <EventSelectionCarousel
          language={language}
          selection={selection}
          onUpdateSelection={onUpdateSelection}
        />

        {/* Step 3: Location / Background / Environment (၃၆ မျိုး ဘေးတိုက် Carousel) */}
        <LocationSelectionCarousel
          language={language}
          selection={selection}
          onUpdateSelection={onUpdateSelection}
        />

        {/* Step 4: Time of Day + Lighting Ambiance (၃၀ မျိုး ဘေးတိုက် Carousel) */}
        <LightingSelectionCarousel
          language={language}
          selection={selection}
          onUpdateSelection={onUpdateSelection}
        />

          {/* Mood & Emotion Section (၁၅ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          {!shouldHidePersonBoxes && (
            <MoodSelectionCarousel
              language={language}
              selection={selection}
              onUpdateSelection={onUpdateSelection}
            />
          )}

          {/* Optional detail input for lighting */}
          <div className="pt-1">
            <input
              type="text"
              placeholder={isMyanmar ? "အခြား အလင်းအမှောင် အသေးစိတ် ရေးပါ (ဥပမာ- ရင်သပ်ရှုမောဖွယ် နီယွန်မီးရောင်)..." : "Custom lighting detail (e.g. Warm spotlight on face)..."}
              value={selection.customLightingDetails || ''}
              onChange={(e) => onUpdateSelection({ customLightingDetails: e.target.value })}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>

        {/* Identity Preservation (မူရင်းရုပ် မပြောင်းစေရန်) Settings */}
        {!shouldHidePersonBoxes && (
          <div className="space-y-2.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 p-3.5 shadow-lg">
            <div className="flex items-center justify-between border-b border-indigo-800/40 pb-2">
              <label className="flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Lock className="h-4 w-4 text-indigo-400" />
                <span>{isMyanmar ? 'Identity Preservation (မူရင်းရုပ် မပြောင်းစေရန်) ဆက်တင်:' : 'Identity Preservation Settings:'}</span>
              </label>
              <span className="text-[10px] text-indigo-300 font-semibold bg-indigo-900/80 border border-indigo-700/60 px-2 py-0.5 rounded-full">
                {isMyanmar ? 'အကြံပြုချက်: 1 သို့မဟုတ် 2' : 'Recommended: 1 or 2'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {IDENTITY_LOCK_OPTIONS.map((lock) => {
                const currentLock = selection.identityLock || (currentMode === 'txt2img' ? 'no_lock' : 'face_100');
                const isSelected = currentLock === lock.id;
                return (
                  <button
                    key={lock.id}
                    onClick={() => onUpdateSelection({ identityLock: lock.id })}
                    className={`flex flex-col text-left p-2.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-indigo-900/80 border-indigo-400 text-indigo-100 shadow-[0_0_14px_rgba(99,102,241,0.3)] ring-1 ring-indigo-400'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <span>{lock.emoji}</span>
                      <span>{isMyanmar ? lock.labelMm : lock.labelEn}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {lock.descMm}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Camera & Retouching / Production Options */}
        <div className="space-y-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-3.5">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-pink-400 uppercase tracking-wider">
              <Sliders className="h-3.5 w-3.5" />
              <span>{isMyanmar ? 'Camera & Retouching ဆက်တင်များ:' : 'Camera & Retouching Settings:'}</span>
            </label>
            <span className="text-[10px] text-slate-400 font-mono">Step 5/5</span>
          </div>

          {/* Skin Retouching Carousel & Dropdown */}
          {!shouldHidePersonBoxes && (
            <SkinRetouchSelectionCarousel
              language={language}
              selection={selection}
              onUpdateSelection={onUpdateSelection}
            />
          )}

          {/* Makeup Selection Carousel & Dropdown (၁၁ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          {!shouldHidePersonBoxes && (
            <MakeupSelectionCarousel
              language={language}
              selection={selection}
              onUpdateSelection={onUpdateSelection}
            />
          )}

          {/* Color Grading / ဖလင် အရောင် တိုနင် (၁၉ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          <FilmColorSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />

          {/* Studio Matrix Controls Banner Header */}
          <div className="mt-3 pt-3 pb-1 border-t-2 border-slate-800/90 flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-cyan-500/30">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-cyan-400" />
              <h3 className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">
                {isMyanmar ? 'ဓာတ်ပုံစတူဒီယို မက်ထရစ် ကန့်သတ်ချက်များ' : 'Studio Matrix Control Board'}
              </h3>
            </div>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              6-Axis Professional Settings
            </span>
          </div>

          {/* Camera Setup & Lens (၂၀ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          <CameraSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />

          {/* Camera Angle & Framing (၁၅ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          <CameraAngleSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />

          {/* Photo Style (၂၀ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          <PhotoStyleSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />

          {/* Aspect Ratio (ဓာတ်ပုံ အချိုးအစား) */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-300">
                {isMyanmar ? 'ဓာတ်ပုံ အချိုးအစား (Aspect Ratio):' : 'Aspect Ratio:'}
              </span>
              <span className="text-[10px] text-emerald-300 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                📐 {selection.aspectRatio || '9:16'}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5">
              {ASPECT_RATIOS.map((ar) => {
                const currentRatio = selection.aspectRatio || '9:16';
                const isSelected = currentRatio === ar.ratio || currentRatio === ar.id;
                return (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => onUpdateSelection({ aspectRatio: ar.ratio })}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                      isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 text-emerald-100 font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="font-bold text-xs">{ar.ratio}</span>
                    <span className="text-[9px] text-slate-400 truncate max-w-full">
                      {ar.width}×{ar.height}
                    </span>
                    <span className="text-[8px] text-emerald-400/90 truncate max-w-full mt-0.5 font-semibold">
                      {ar.ratio === '9:16' ? 'TikTok/Reels' : ar.ratio === '4:5' ? 'Instagram' : ar.ratio === '3:4' ? 'Portrait' : ar.ratio === '16:9' ? 'Widescreen' : ar.ratio === '1:1' ? 'Square' : 'Photo'}
                    </span>
                  </button>
                );
              })}
            </div>
            {/* Aspect Ratio Resolution Detail Callout */}
            {(() => {
              const currentAr = ASPECT_RATIOS.find(ar => ar.ratio === (selection.aspectRatio || '9:16') || ar.id === selection.aspectRatio);
              if (!currentAr) return null;
              return (
                <div className="mt-1 p-2 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-200/90 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span>📐</span>
                    <span>{isMyanmar ? 'အသုံးပြုမည့် ရုပ်ထွက် Pixel:' : 'Target Resolution:'}</span>
                    <strong className="text-emerald-300">{currentAr.width} × {currentAr.height} pixels</strong>
                  </span>
                  <span className="text-[10px] text-emerald-400 font-sans font-medium">
                    {currentAr.label}
                  </span>
                </div>
              );
            })()}
          </div>

          {/* Quality Engine / Profile (၁၅ မျိုး ဘေးတိုက် Carousel + Dropdown) */}
          <QualityEngineSelectionCarousel
            language={language}
            selection={selection}
            onUpdateSelection={onUpdateSelection}
          />
        </div>

        {/* Background Only Mode Specific Panel */}
        {currentMode === 'background-only' && (
          <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/40 space-y-2">
            <label className="flex items-center gap-1.5 text-xs font-bold text-teal-300 uppercase tracking-wider">
              <Mountain className="h-4 w-4 text-teal-400" />
              <span>{isMyanmar ? 'နောက်ခံ သီးသန့် မုဒ် (Background Only Mode Active)' : 'Background Only Mode Active'}</span>
            </label>
            <p className="text-xs text-teal-200/90 leading-relaxed">
              {isMyanmar
                ? '🏞️ ဤမုဒ်သည် လူပုံ / ခန္ဓာကိုယ်ပုံစံများ လုံးဝမပါဘဲ သဘာဝရှုခင်း၊ ရှေးဟောင်းဘုရားကျောင်း၊ စတူဒီယိုနောက်ခံနှင့် တည်နေရာအကွက်အကွင်းများ သီးသန့် Prompt ထုတ်ပေးရန် စနစ်တကျ ပြင်ဆင်ထားပါသည်။'
                : '🏞️ This mode strictly generates clean prompts for standalone backgrounds, scenery, architecture, and studio backdrops without any human subjects or models.'}
            </p>
          </div>
        )}

        {/* Custom prompt text input tab if active */}
        {activeTab === 'custom' && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <span className="text-xs text-slate-400">
              {isMyanmar ? 'ပိုမို သီးသန့်ဆန်သော လမ်းညွှန်ချက် စာသား ထည့်သွင်းရန်:' : 'Additional custom text prompt instructions:'}
            </span>
            <textarea
              rows={3}
              value={customText}
              onChange={(e) => {
                const val = e.target.value;
                setCustomText(val);
                onUpdateSelection({ customInstruction: val });
              }}
              placeholder={isMyanmar ? "ဥပမာ- လက်ထဲတွင် ရေပက်သော ရေခွက်ကို ကိုင်ထားပြီး မျက်နှာပေါ်တွင် ရေသီးများ စိုစွတ်နေပုံ..." : "e.g. Holding a traditional water bowl with water splashes around..."}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-pink-500 focus:outline-none resize-none"
            />
          </div>
        )}

      </div>

    </div>
  );
};
