export type AppMode = 'txt2img' | 'img2img' | 'clothes-swap' | 'background-only';

export type Language = 'my' | 'en';

export interface SubjectOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  description: string;
}

export interface SubCategoryPresetOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface EventOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  category: 'festival' | 'celebration' | 'fashion' | 'lifestyle';
}

export interface LocationOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  environmentType: 'indoor' | 'outdoor' | 'fantasy' | 'studio';
  category?: string;
}

export interface LightingOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
}

export interface CameraOption {
  id: string;
  label: string;
  lens: string;
  aperture: string;
  emoji?: string;
  labelMm?: string;
  labelEn?: string;
}

export interface RetouchOption {
  id: string;
  emoji?: string;
  labelMm: string;
  labelEn: string;
  details: string;
}

export interface MakeupOption {
  id: string;
  emoji?: string;
  labelMm: string;
  labelEn: string;
  promptText?: string;
}

export interface ColorGradeOption {
  id: string;
  emoji?: string;
  labelMm: string;
  labelEn: string;
  filmStock?: string;
}

export interface AspectRatioOption {
  id: string;
  ratio: string;
  label: string;
  width: number;
  height: number;
}

export interface QualityProfileOption {
  id: string;
  label: string;
  labelMm?: string;
  labelEn?: string;
  emoji?: string;
  engine: string;
  detailLevel: string;
}

export interface GarmentOption {
  id: string;
  emoji?: string;
  labelMm: string;
  labelEn: string;
  fabric: string;
  category: string;
}

export interface EthnicityOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface PoseOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface AgeRangeOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface HeightOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface WeightOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface TimeOfDayOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface MoodOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface CameraAngleOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface PhotoStyleOption {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface MatrixSelection {
  subject: string;
  customSubjectDetails?: string;
  coupleOutfitType?: 'casual' | 'wedding';
  couplePose?: string;
  groomOutfit?: string;
  groomTop?: string;
  groomBottom?: string;
  groomExpression?: string;
  groomHair?: string;
  groomPoseAccessory?: string;
  brideOutfit?: string;
  brideTop?: string;
  brideBottom?: string;
  brideExpression?: string;
  brideHair?: string;
  bridePoseAccessory?: string;
  ageRange?: string;
  heightRange?: string;
  weightRange?: string;
  poseExpression?: string;
  customPoseDetails?: string;
  ethnicity?: string;
  customEthnicityDetails?: string;
  includeCulturalProps?: boolean;
  culturalPropsDetails?: string;
  event: string;
  customEventDetails?: string;
  location: string;
  customLocationDetails?: string;
  timeAndLighting: string;
  timeOfDay?: string;
  moodEmotion?: string;
  customLightingDetails?: string;
  camera: string;
  cameraAngle?: string;
  photoStyle?: string;
  retouching: string;
  makeup: string;
  colorGrade: string;
  aspectRatio: string;
  qualityProfile: string;
  garmentStyle?: string;
  garmentFabric?: string;
  clothesSwapOption?: 'in_app_preset' | 'custom_garment_upload';
  customGarmentImage?: string | null;
  customGarmentDescription?: string;
  weddingEthnicGroup?: string;
  weddingEra?: string;
  weddingAccessoryProps?: string;
  weddingStudioBackdropProps?: string;
  identityLock?: 'face_100' | 'face_body_lock' | 'soft_ref' | 'no_lock' | string;
  referenceImage?: string | null;
  referenceImageMale?: string | null;
  referenceImageFemale?: string | null;
  img2imgOption?: 'app_custom' | 'bg_only' | 'style_transfer';
  styleReferenceImage?: string | null;
  styleStrength?: number;
  promptWeight?: number;
  preserveSubject100Percent?: boolean;
  customInstruction?: string;
}

export interface PromptResult {
  id: string;
  masterPrompt: string;
  negativePrompt: string;
  midjourneyFormat: string;
  fluxFormat: string;
  sdxlFormat: string;
  descriptionMm: string;
  descriptionEn: string;
  cameraNotes: string;
  aspectRatio?: string;
  generatedImageUrl?: string;
  timestamp: string;
  mode: AppMode;
  optionsSummary: {
    subject: string;
    event: string;
    location: string;
    lighting: string;
  };
}

export interface PresetTemplate {
  id: string;
  titleMm: string;
  titleEn: string;
  mode: AppMode;
  emoji: string;
  previewUrl: string;
  selection: MatrixSelection;
}

export interface ChatStep {
  id: string;
  sender: 'ai' | 'user';
  textMm: string;
  textEn: string;
  stepType?: 'subject' | 'event' | 'location' | 'lighting' | 'garment' | 'matrix' | 'confirm';
  timestamp: string;
}

export type UserRole = 'user' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  createdAt: string;
  bio?: string;
  credits?: number;
}

export interface PromptHistoryItem {
  id: string;
  masterPrompt: string;
  negativePrompt?: string;
  midjourneyFormat?: string;
  fluxFormat?: string;
  sdxlFormat?: string;
  mode: AppMode;
  aspectRatio?: string;
  generatedImageUrl?: string;
  timestamp: string;
  isFavorite?: boolean;
  optionsSummary?: {
    subject?: string;
    event?: string;
    location?: string;
    lighting?: string;
    outfit?: string;
  };
}

export interface FavoriteItem {
  id: string;
  promptId?: string;
  title: string;
  masterPrompt: string;
  mode: AppMode;
  aspectRatio?: string;
  previewImage?: string;
  savedAt: string;
  tags?: string[];
}

export interface UsageStatistics {
  totalPromptsGenerated: number;
  imagesGenerated: number;
  favoritesCount: number;
  lastActive: string;
  popularModes: { mode: string; count: number }[];
}

export interface ManagedTemplate {
  id: string;
  titleMm: string;
  titleEn: string;
  mode: AppMode;
  emoji: string;
  category: string;
  isActive: boolean;
  createdAt: string;
}

export interface ManagedCategory {
  id: string;
  nameMm: string;
  nameEn: string;
  emoji: string;
  description: string;
  itemCount: number;
  isActive: boolean;
}

export interface UserNoteEntry {
  id: string;
  title: string;
  category: string;
  mode: AppMode;
  masterPrompt: string;
  negativePrompt?: string;
  notes?: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdminAppSettings {
  siteName: string;
  systemNoticeMm: string;
  systemNoticeEn: string;
  isMaintenanceMode: boolean;
  defaultEngine: string;
  maxDailyPrompts: number;
  enableGuestAccess: boolean;
}


