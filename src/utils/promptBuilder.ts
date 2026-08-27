import { MatrixSelection, AppMode } from '../types';
import { HEIGHT_OPTIONS, WEIGHT_OPTIONS } from '../data/presetData';

export function buildComprehensiveMasterPrompt(
  selection: MatrixSelection,
  mode: AppMode
): {
  masterPrompt: string;
  negativePrompt: string;
  midjourneyFormat: string;
  fluxFormat: string;
  sdxlFormat: string;
  descriptionMm: string;
  descriptionEn: string;
  cameraNotes: string;
} {
  const targetAr = selection?.aspectRatio || '9:16';

  // 0. Standalone Background-Only Mode Handling
  if (mode === 'background-only') {
    const loc = selection?.location || 'historic Bagan pagoda sanctuary';
    const locCustom = selection?.customLocationDetails ? `, ${selection.customLocationDetails.trim()}` : '';
    const lighting = selection?.timeAndLighting || 'golden hour warm sunlight';
    const lightCustom = selection?.customLightingDetails ? `, ${selection.customLightingDetails.trim()}` : '';
    const mood = selection?.moodEmotion && selection.moodEmotion !== 'skip' ? `, ${selection.moodEmotion} atmosphere` : '';
    const event = selection?.event && selection.event !== 'skip' ? `, inspired by ${selection.event}` : '';
    const camera = selection?.camera || 'Sony A7R V 85mm f/1.2';
    const angle = selection?.cameraAngle && selection.cameraAngle !== 'skip' ? `, ${selection.cameraAngle}` : '';
    const style = selection?.photoStyle || 'Photorealistic Architectural Scenery';
    const quality = selection?.qualityProfile || '8K UHD resolution, sharp focus, masterwork';
    const color = selection?.colorGrade && selection.colorGrade !== 'skip' ? `, ${selection.colorGrade} color grading` : '';
    const customText = selection?.customInstruction ? `, ${selection.customInstruction.trim()}` : '';

    const masterPrompt = `A stunning standalone background scenery of ${loc}${locCustom}${event}, ${lighting}${lightCustom}${mood}${angle}, ${style}, shot on ${camera}${color}, ${quality}${customText} --ar ${targetAr}`;
    const negativePrompt = `person, human, face, woman, man, girl, boy, model, people, portrait, body, hands, limbs, clothing, crowd, blurry, low quality, distorted architecture`;

    return {
      masterPrompt,
      negativePrompt,
      midjourneyFormat: `/imagine prompt: ${masterPrompt} --v 6.0 --style raw`,
      fluxFormat: `${masterPrompt}, flux dev quality`,
      sdxlFormat: `${masterPrompt}, SDXL ultra-realistic`,
      descriptionMm: `[Background Only Engine] လူပုံ/မော်ဒယ် လုံးဝမပါဘဲ သန့်ရှင်းသော ${loc} နောက်ခံရှုခင်း၊ တည်နေရာအကွက်အကွင်းနှင့် စတူဒီယိုဝန်းကျင်အတွက် Prompt ကို အပြည့်အစုံ ထုတ်ပေးထားပါသည်။ (Aspect Ratio: ${targetAr})`,
      descriptionEn: `Standalone architectural and environmental background scenery prompt for ${loc} without human subjects (Aspect Ratio: ${targetAr}).`,
      cameraNotes: `${camera}, ISO 100, f/1.2 - f/8.0, 1/250s`,
    };
  }

  // 0.1 Strict Sequence Clothes-Swap Mode Handling
  if (mode === 'clothes-swap') {
    const isCustomGarment = selection?.clothesSwapOption === 'custom_garment_upload' || !!selection?.customGarmentImage;
    const gDesc = selection?.customGarmentDescription || selection?.garmentFabric || '';

    let garmentChecklist = '';
    if (isCustomGarment) {
      garmentChecklist = `custom garment from Image 2: ${gDesc || 'intricate traditional Myanmar silk woven attire, golden filigree embroidery, tailored body-hugging fit, full-length maxi longyi, matching silk shawl'}`;
    } else {
      const gStyle = selection?.garmentStyle || 'Royal Silk Cheik Longyi';
      const gFab = selection?.garmentFabric ? `, fabric material: ${selection.garmentFabric}` : '';
      garmentChecklist = `selected preset outfit: ${gStyle}${gFab}, royal woven silk, intricate gold thread embroidery, tailored fit, full-length dress`;
    }

    const locBase = selection?.location || 'heritage Myanmar temple backdrop';
    const locCustom = selection?.customLocationDetails ? `, ${selection.customLocationDetails.trim()}` : '';
    const lightBase = selection?.timeAndLighting || 'golden hour warm sunlight';
    const camera = selection?.camera || 'Sony A7R V 85mm f/1.2';
    const angle = selection?.cameraAngle && selection.cameraAngle !== 'skip' ? `, ${selection.cameraAngle}` : '';
    const style = selection?.photoStyle || 'Photorealistic Studio Portrait';
    const quality = selection?.qualityProfile || '8K UHD resolution, sharp focus, masterwork';
    const customText = selection?.customInstruction ? `, ${selection.customInstruction.trim()}` : '';

    const masterPrompt = `Keep exact same person, face, body shape, pose, skin tone, expression from Image 1 (100% exact face match, identical eyes nose lips, zero face alteration, preserved identity). Replace ONLY the clothing with the outfit from Image 2. Clothing Detail Checklist: ${garmentChecklist}. Maintain 100% original lighting and background environment set against ${locBase}${locCustom}, illuminated by ${lightBase}${angle}, ${style}, shot on ${camera}, ${quality}${customText} --ar ${targetAr}`;
    
    const negativePrompt = `different face, altered face, changed eyes, changed nose, changed lips, distorted face, facial asymmetry, face swap artifact, mismatched identity, wrong clothing, low quality, blurry`;

    return {
      masterPrompt,
      negativePrompt,
      midjourneyFormat: `/imagine prompt: ${masterPrompt} --v 6.0 --style raw`,
      fluxFormat: `${masterPrompt}, flux dev quality`,
      sdxlFormat: `${masterPrompt}, SDXL ultra-realistic`,
      descriptionMm: `[Clothes Swap Strict Sequence Engine] Image 1 မှ မူရင်းလူ၏ မျက်နှာ၊ ခန္ဓာကိုယ်၊ ကိုယ်ဟန် (Pose)၊ အသားအရောင်နှင့် အမူအရာများကို ၁၀၀% အတိအကျ ထိန်းသိမ်းပြီး Image 2 (သို့မဟုတ် မနူး Preset) မှ ဝတ်စုံ၊ အထည်၊ အရောင်၊ ဒီဇိုင်း၊ အဆင်နှင့် အချိုးအစားများကို သီးသန့် အသေးစိတ် လဲလှယ် တပ်ဆင်ပေးထားပါသည်။ (Aspect Ratio: ${targetAr})`,
      descriptionEn: `Strict Sequence Clothes Swap Prompt: Keeps Image 1 subject (face, body, pose, skin tone) 100% locked while swapping ONLY the clothing with Image 2 garment details (Aspect Ratio: ${targetAr}).`,
      cameraNotes: `${camera}, ISO 100, f/1.2, 1/250s`,
    };
  }

  // 1. Subject & Character Identification
  let subjectText = '';
  const sub = selection?.subject || 'woman';

  if (sub === 'man') {
    subjectText = 'A handsome Burmese man';
  } else if (sub === 'couple') {
    subjectText = 'An elegant Myanmar couple (a handsome groom and a gorgeous bride)';
  } else if (sub === 'monk') {
    subjectText = 'A serene Burmese Buddhist monk in traditional saffron robes';
  } else if (sub === 'elderly') {
    subjectText = 'A graceful elderly Burmese elder with a warm gentle smile';
  } else if (sub === 'child') {
    subjectText = 'A cute Burmese child in traditional cultural attire';
  } else if (sub === 'pet') {
    subjectText = 'A cute pet accompanied by an elegant Burmese owner';
  } else if (sub === 'product') {
    subjectText = 'A luxury product display showcase presented by an elegant Burmese model';
  } else {
    subjectText = 'A gorgeous Burmese woman';
  }

  if (selection?.customSubjectDetails && selection.customSubjectDetails.trim()) {
    subjectText += `, ${selection.customSubjectDetails.trim()}`;
  }

  // Age Range
  if (selection?.ageRange && selection.ageRange !== 'skip') {
    subjectText += `, age ${selection.ageRange.replace('_', '-')}`;
  }

  // Height Range
  if (selection?.heightRange && selection.heightRange !== 'skip') {
    const heightOpt = HEIGHT_OPTIONS.find((h) => h.id === selection.heightRange);
    if (heightOpt) {
      subjectText += `, ${heightOpt.promptText}`;
    } else {
      subjectText += `, height ${selection.heightRange}`;
    }
  }

  // Weight / Body Build
  if (selection?.weightRange && selection.weightRange !== 'skip') {
    const weightOpt = WEIGHT_OPTIONS.find((w) => w.id === selection.weightRange);
    if (weightOpt) {
      subjectText += `, ${weightOpt.promptText}`;
    } else {
      subjectText += `, weight ${selection.weightRange}`;
    }
  }

  // Ethnicity & Cultural Features
  if (selection?.customEthnicityDetails && selection.customEthnicityDetails.trim()) {
    subjectText += `, ${selection.customEthnicityDetails.trim()}`;
  } else if (selection?.ethnicity && selection.ethnicity !== 'skip') {
    subjectText += `, authentic ${selection.ethnicity} facial bone structure and warm golden skin tone`;
  }

  // 2. Identity Lock & Facial Likeness Preservation
  let identityText = '';
  const isImg2ImgOrSwap = (mode as string) === 'img2img' || (mode as string) === 'clothes-swap';
  const isLockEnabled = selection?.preserveSubject100Percent !== false || (selection?.identityLock && selection.identityLock !== 'no_lock');

  if (isImg2ImgOrSwap || isLockEnabled) {
    identityText = ', 100% exact facial likeness, identical eyes nose lips, preserved facial identity, zero face alteration, same person, identical facial bone structure';
  }

  // 3. Pose, Body Stance & Expression
  let poseText = '';
  if (selection?.poseExpression && selection.poseExpression !== 'skip') {
    poseText = `, posing with ${selection.poseExpression}`;
  }
  if (selection?.customPoseDetails && selection.customPoseDetails.trim()) {
    poseText += `, ${selection.customPoseDetails.trim()}`;
  }

  // 4. Couple & Wedding Details (if couple selected)
  let coupleText = '';
  if (sub === 'couple' || selection?.coupleOutfitType) {
    const groomParts: string[] = [];
    if (selection?.groomOutfit) groomParts.push(`groom wearing ${selection.groomOutfit}`);
    if (selection?.groomTop) groomParts.push(selection.groomTop);
    if (selection?.groomBottom) groomParts.push(selection.groomBottom);
    if (selection?.groomHair) groomParts.push(`groom hairstyle: ${selection.groomHair}`);
    if (selection?.groomExpression) groomParts.push(`groom expression: ${selection.groomExpression}`);
    if (selection?.groomPoseAccessory) groomParts.push(`groom pose/accessory: ${selection.groomPoseAccessory}`);

    const brideParts: string[] = [];
    if (selection?.brideOutfit) brideParts.push(`bride wearing ${selection.brideOutfit}`);
    if (selection?.brideTop) brideParts.push(selection.brideTop);
    if (selection?.brideBottom) brideParts.push(selection.brideBottom);
    if (selection?.brideHair) brideParts.push(`bride hairstyle: ${selection.brideHair}`);
    if (selection?.brideExpression) brideParts.push(`bride expression: ${selection.brideExpression}`);
    if (selection?.bridePoseAccessory) brideParts.push(`bride pose/accessory: ${selection.bridePoseAccessory}`);

    if (groomParts.length > 0) coupleText += `, ${groomParts.join(', ')}`;
    if (brideParts.length > 0) coupleText += `, ${brideParts.join(', ')}`;

    if (selection?.couplePose) coupleText += `, couple interaction: ${selection.couplePose}`;
    if (selection?.weddingEthnicGroup) coupleText += `, ${selection.weddingEthnicGroup} traditional wedding theme`;
    if (selection?.weddingEra) coupleText += `, ${selection.weddingEra} era historic styling`;
    if (selection?.weddingAccessoryProps) coupleText += `, wedding accessories: ${selection.weddingAccessoryProps}`;
  }

  // 5. Outfit / Clothing / Garment
  let outfitText = '';
  const isCustomGarment = selection?.clothesSwapOption === 'custom_garment_upload' || !!selection?.customGarmentImage;

  if (isCustomGarment) {
    const gDesc = selection?.customGarmentDescription || selection?.garmentFabric || 'custom uploaded reference attire with intricate traditional silk embroidery';
    outfitText = `, wearing custom reference attire: ${gDesc}`;
  } else if (selection?.garmentStyle && selection.garmentStyle !== 'skip') {
    const fabric = selection?.garmentFabric ? ` made of ${selection.garmentFabric}` : '';
    outfitText = `, wearing traditional ${selection.garmentStyle}${fabric}`;
  } else {
    outfitText = `, wearing elegant royal Burmese silk woven attire`;
  }

  // 6. Cultural Props & Accessories
  let culturalPropsText = '';
  if (selection?.culturalPropsDetails && selection.culturalPropsDetails.trim()) {
    culturalPropsText = `, adorned with cultural accessories: ${selection.culturalPropsDetails.trim()}`;
  } else if (selection?.includeCulturalProps) {
    culturalPropsText = `, adorned with natural yellowish-white Thanaka paste brushed gracefully on cheeks, fresh white jasmine flower garland woven in dark hair, and royal gold filigree jewelry`;
  }

  // 7. Event, Festival & Atmosphere
  let eventText = '';
  if (selection?.customEventDetails && selection.customEventDetails.trim()) {
    eventText = `, during ${selection.customEventDetails.trim()}`;
  } else if (selection?.event && selection.event !== 'skip') {
    eventText = `, celebrating ${selection.event}`;
  }

  // 8. Location & Scenery Backdrop
  let locationText = '';
  const locBase = selection?.location || 'heritage Myanmar temple backdrop';
  locationText = `, set against ${locBase}`;
  if (selection?.customLocationDetails && selection.customLocationDetails.trim()) {
    locationText += `, ${selection.customLocationDetails.trim()}`;
  }
  if (selection?.weddingStudioBackdropProps && selection.weddingStudioBackdropProps.trim()) {
    locationText += `, backdrop setting: ${selection.weddingStudioBackdropProps.trim()}`;
  }

  // 9. Time, Lighting & Emotional Mood
  let lightingText = '';
  const lightBase = selection?.timeAndLighting || 'golden hour warm sunlight';
  lightingText = `, illuminated by ${lightBase}`;
  if (selection?.customLightingDetails && selection.customLightingDetails.trim()) {
    lightingText += `, ${selection.customLightingDetails.trim()}`;
  }
  if (selection?.moodEmotion && selection.moodEmotion !== 'skip') {
    lightingText += `, conveying a ${selection.moodEmotion} atmosphere`;
  }

  // 10. Makeup & Retouching Style
  let makeupText = '';
  if (selection?.makeup && selection.makeup !== 'skip') {
    makeupText = `, ${selection.makeup} makeup styling`;
  }

  let retouchText = '';
  if (selection?.retouching && selection.retouching !== 'skip') {
    retouchText = `, ${selection.retouching}`;
  }

  // 11. Optics, Camera Gear, Angle & Color Grade
  const cameraBase = selection?.camera || 'Sony A7R V with 85mm f/1.2 lens';
  let photoStyleText = `, shot on ${cameraBase}`;

  if (selection?.cameraAngle && selection.cameraAngle !== 'skip') {
    photoStyleText += `, ${selection.cameraAngle} camera framing`;
  }
  if (selection?.photoStyle && selection.photoStyle !== 'skip') {
    photoStyleText += `, ${selection.photoStyle}`;
  }
  if (selection?.colorGrade && selection.colorGrade !== 'skip') {
    photoStyleText += `, ${selection.colorGrade} color grading`;
  }

  // 12. Quality Profile & Render Specifications
  const qualityText = selection?.qualityProfile || '8k UHD resolution, masterpiece quality, fine skin pores texture, sharp focus, professional editorial photography';

  // 13. Additional Custom Instructions (User Prompt Text)
  let userInstructionText = '';
  if (selection?.customInstruction && selection.customInstruction.trim()) {
    userInstructionText = `, custom details: ${selection.customInstruction.trim()}`;
  }

  // Assemble Complete Master Prompt
  const masterPrompt = `${subjectText}${identityText}${poseText}${coupleText}${outfitText}${culturalPropsText}${eventText}${locationText}${lightingText}${makeupText}${retouchText}${photoStyleText}, ${qualityText}${userInstructionText} --ar ${targetAr}`;

  const negativePrompt = `different face, altered face, swapped face, distorted facial features, facial asymmetry, blurry, low resolution, bad eyes, bad hands, extra fingers, unnatural skin texture, overexposed, underexposed, bad anatomy, deformed limbs, floating artifacts, ugly, draft, watermark`;

  // Build Comprehensive Camera Specifications Note
  const angleNote = selection?.cameraAngle && selection.cameraAngle !== 'skip' ? `, Framing: ${selection.cameraAngle}` : '';
  const styleNote = selection?.photoStyle && selection.photoStyle !== 'skip' ? `, Style: ${selection.photoStyle}` : '';
  const colorNote = selection?.colorGrade && selection.colorGrade !== 'skip' ? `, Color Grade: ${selection.colorGrade}` : '';
  const cameraNotes = `Camera & Lens Specs: ${cameraBase}${angleNote}${styleNote}${colorNote}, ISO 100, f/1.2 aperture, 1/250s shutter speed, 85mm portrait focal length, sharp optics`;

  // Build Detailed Myanmar Explanation
  const mmSubName = sub === 'man' ? 'အမျိုးသား' : sub === 'couple' ? 'စုံတွဲ' : sub === 'monk' ? 'ရဟန်းတော်' : 'အမျိုးသမီး';
  const descriptionMm = `[Infinity Prompt Studio Engine] ${mmSubName}အတွက် ရွေးချယ်ပြင်ဆင်ထားသော အောက်ပါ အသေးစိတ်အချက်အလက်အားလုံးကို ၁၀၀% အပြည့်အဝ ပေါင်းစပ်ထုတ်လုပ်ထားသော Photorealistic Master Prompt ဖြစ်ပါသည်:\n` +
    `• ပုဂ္ဂိုလ်/မော်ဒယ်: ${subjectText}\n` +
    `• ဝတ်စုံ/အထည်: ${outfitText.replace(/^, wearing /, '')}\n` +
    `• ဘုရား/တည်နေရာ: ${locationText.replace(/^, set against /, '')}\n` +
    `• အလင်း/အချိန်: ${lightingText.replace(/^, illuminated by /, '')}\n` +
    `• ကင်မရာ/စတိုင်: ${photoStyleText.replace(/^, shot on /, '')}\n` +
    `• တိုင်းတာပုံစံ (Ratio): --ar ${targetAr}` +
    (selection?.customInstruction ? `\n• ထပ်ဆောင်း ညွှန်ကြားချက်: ${selection.customInstruction.trim()}` : '');

  const descriptionEn = `Comprehensive master portrait prompt combining all selected parameters:\n` +
    `• Subject: ${subjectText}\n` +
    `• Outfit: ${outfitText.replace(/^, wearing /, '')}\n` +
    `• Environment: ${locationText.replace(/^, set against /, '')}\n` +
    `• Lighting & Mood: ${lightingText.replace(/^, illuminated by /, '')}\n` +
    `• Camera & Optics: ${photoStyleText.replace(/^, shot on /, '')}\n` +
    `• Aspect Ratio: --ar ${targetAr}` +
    (selection?.customInstruction ? `\n• Custom Note: ${selection.customInstruction.trim()}` : '');

  return {
    masterPrompt,
    negativePrompt,
    midjourneyFormat: `/imagine prompt: ${masterPrompt} --v 6.0 --style raw --no ${negativePrompt}`,
    fluxFormat: `${masterPrompt}, camera specs: ${cameraNotes}, negative prompt: ${negativePrompt}`,
    sdxlFormat: `${masterPrompt} | Camera: ${cameraNotes} | Negative: ${negativePrompt}`,
    descriptionMm,
    descriptionEn,
    cameraNotes,
  };
}
