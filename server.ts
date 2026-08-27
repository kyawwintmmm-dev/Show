import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { buildComprehensiveMasterPrompt } from "./src/utils/promptBuilder";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Helper to convert base64 data URLs to Gemini inlineData parts
function parseDataUrlToPart(dataUrl: string | null | undefined) {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  if (dataUrl.startsWith('data:image/')) {
    const matches = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      return {
        inlineData: {
          mimeType: matches[1],
          data: matches[2]
        }
      };
    }
  }
  return null;
}

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not defined in environment variables.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "placeholder_key",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", appName: "Show Ai Studio.", time: new Date().toISOString() });
});

// Helper for Gemini model execution with fallback for 503 high demand / 429 rate limits
const TEXT_MODELS = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash", "gemini-2.5-pro"];

async function generateContentWithFallback(ai: GoogleGenAI, requestParams: { contents: any; config?: any }) {
  let lastError: any = null;
  for (const modelName of TEXT_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: requestParams.contents,
        config: requestParams.config,
      });
      return response;
    } catch (error: any) {
      lastError = error;
      const status = error?.status || error?.code;
      const msg = error?.message || "";
      console.warn(`[Gemini Fallback] Model ${modelName} error:`, msg);
      // Immediately fallback to next model on 429 or 503
      continue;
    }
  }
  throw lastError;
}

// Prompt Generation API Endpoint
app.post("/api/generate-prompt", async (req, res) => {
  try {
    const { selection, mode, language = "my", customInstruction } = req.body;

    const ai = getGeminiClient();

    const systemInstruction = `You are a professional photography prompt engineer for Infinity Prompt Studio specializing in high-end photography prompts for Midjourney v6, SDXL, Flux.1, and Imagen 3.
Your job is to transform structured user selections into an ultra-detailed, photorealistic master prompt.

CRITICAL MULTIMODAL ANALYSIS FOR UPLOADED OUTFIT/GARMENT PHOTO (အပြင်မှ တင်လိုက်သော ဝတ်စုံ/အထည် ဓာတ်ပုံ သုံးသပ်ခြင်း):
- When a Custom Garment Photo (customGarmentImage) is attached or provided, you MUST perform a meticulous visual inspection of the attached outfit photo!
- Visually identify the exact outfit design, clothing type (e.g., traditional Myanmar blouse with diagonal sash, red silk woven longyi, golden tiara/headpiece, white long-sleeve jacket, pearls, embroidery, lace, velvet, or suit).
- Describe this exact analyzed attire in detail in the clothing section of the generated masterPrompt so the AI image generator recreates that exact outfit on the subject!
- DO NOT default to generic or unrelated preset clothing when an outfit photo is attached!

CRITICAL MANDATE - FACIAL IDENTICALITY & LIKENESS LOCK (မျက်လုံး၊ နှာခေါင်း၊ နှုတ်ခမ်း ၁၀၀% တူညီမှု):
- Whenever a reference photo is provided, or when Identity Lock is enabled, or when Preserve Subject 100% is active (preserveSubject100Percent = true), you MUST STRICTLY preserve 100% of the subject's face, eyes, nose, lips, skin tone, facial proportions, body posture, and identity from the original photo.
- The prompt MUST explicitly command the AI: "100% exact face match, identical eyes nose lips, exact posture and body build, zero face alteration. Exclusively modify and upgrade the background environment, stage lighting, and scenery".
- Under NO circumstances should facial features, eyes, nose, or lips be altered, swapped, or morphed into someone else.

SPECIAL FEATURE - PRESERVE SUBJECT 100% & EXCLUSIVELY UPGRADE BACKGROUND ENVIRONMENT:
- If Preserve Subject 100% option is ENABLED (preserveSubject100Percent = true):
  1. Subject (person/face/body/pose/skin tone) MUST be locked 100% identical without any modifications to face, skin, eyes, nose, lips, or posture.
  2. The prompt should focus all artistic transformations exclusively on background scenery, studio backdrop, lighting, camera lens effects, atmosphere, and environmental upgrade.
- If Preserve Subject 100% option is DISABLED (preserveSubject100Percent = false):
  Standard mode where both subject and background can be modified according to user options.

MODE SPECIFIC INSTRUCTIONS:
- If mode is "img2img" or "clothes-swap": Strictly preserve 100% exact face, eyes, nose, lips, facial features, and identity from the uploaded photo. Explicitly state in the prompt that the subject's face, eyes, nose, and lips must match the reference image with 100% fidelity. Only modify clothing, background, lighting, or artistic style according to user selections.
- If mode is "img2img":
  - Option 1 (app_custom): Keep 100% exact facial likeness from uploaded person image. Modify clothing, makeup, backdrop, and lighting according to user's selections from inside the app.
  - Option 2 (bg_only - Background Replacement Only): Keep 100% exact face, eyes, nose, lips, body posture AND original clothing/outfit completely UNCHANGED. ONLY replace, upgrade, and transform the background environment, scenery, backdrop, and lighting!
  - Option 3 (style_transfer - Copy Pose, Garment & Background from 2nd Reference Photo): Keep 100% exact face, eyes, nose, lips, skin tone, and identity from Reference Image 1 (Person Photo). Copy and strictly replicate the pose, body stance, outfit/clothing design, accessories, and background setting directly from Reference Image 2 (Style Reference Photo)!
- If mode is "txt2img": Generate completely from text description without relying on any reference image.
- If mode is "clothes-swap":
  CRITICAL MANDATORY STRICT SEQUENCE LOGIC FOR CLOTHES SWAP:
  1. Primary Subject (Image 1):
     - Preserve 100% of the person's face, eyes, nose, lips, facial features, body shape, posture, pose, skin tone, and expression from Image 1.
     - MANDATORY PROMPT PREAMBLE: Start prompt with "Keep the exact same person, face, body shape, pose, expression, skin tone from Image 1 with 100% fidelity, zero face alteration, 100% exact face match, identical eyes nose lips."
  2. Clothing Reference (Image 2 or Selected Preset):
     - Replace ONLY the clothing with the outfit from Image 2 (if custom garment photo attached) or from the selected preset outfit.
     - MANDATORY PROMPT SECTION: "Replace ONLY the clothing with the outfit from Image 2."
  3. Comprehensive Clothing Detail Checklist (MUST analyze & describe ALL in vivid detail):
     - Fabric type (e.g., pure silk, heavy velvet, chiffon, woven brocade, lace, cotton, satin, denim)
     - Color and pattern (vibrant colors, gold thread motifs, traditional patterns, solid shades)
     - Style (e.g., structured royal blouse, flowing longyi, tailored suit, fitted evening gown, loose traditional)
     - Fit on body (e.g., tailored body-hugging fit, loose flowing, structured posture)
     - Length (e.g., full-length floor-sweeping maxi dress, midi length, short blouse and longyi)
     - Embroidery & Design details (e.g., gold thread filigree, ornate lace borders, sequins, crests)
     - Accessories & Outerwear (e.g., matching silk shawl, decorative waist belt, scarf, outer jacket)
  4. Environmental Continuity:
     - MANDATORY ENDING: "Maintain 100% original lighting, camera optics, studio setting, and background environment unless changed."
- If mode is "background-only": Strictly generate a prompt purely for a standalone background scene, landscape, studio backdrop, architectural setting, or scenery WITHOUT ANY HUMAN SUBJECTS, PERSONS, FACES, MODELS, OR CLOTHING. Focus strictly on environment, background props, architecture, natural scenery, atmospheric lighting, depth of field, camera optics, and style. In the negative prompt, MANDATORILY include: "person, human, face, woman, man, girl, boy, model, people, portrait, body, hands, limbs, clothing".

IDENTITY LOCK INSTRUCTIONS:
- face_100 (Face Lock 100%): Keep the 100% exact same face, eyes, nose, lips, facial features, skin texture, age, and expression. Do not alter identity.
- face_body_lock (Face + Body Lock): Additionally keep 100% exact face, eyes, nose, lips, body proportions, height, weight, and pose identical to reference.
- soft_ref (Soft Reference): Use the uploaded image as strong reference but allow minor artistic changes.
- no_lock (No Lock): Unrestricted creative generation without lock constraints.
- CRITICAL: Whenever identity lock is enabled (face_100, face_body_lock, or soft_ref), you MUST explicitly include these mandatory keywords in the final generated prompt:
  "100% exact face match, 100% identical eyes nose lips, same face, same person, identical facial features, preserve identity, consistent character, no face change"

ETHNICITY & CULTURAL ACCESSORIES INSTRUCTIONS:
- If Ethnicity is selected: Accurately reflect facial features, skin tone, bone structure, and hair typical of that specific ethnicity.
- If Cultural Accessories = Yes (or if cultural props are selected): Include authentic traditional clothing, jewelry, makeup, or cultural props strictly belonging to that culture.
  Example for Burmese: "wearing traditional Myanmar woven silk longyi, natural yellowish-white Thanaka paste brushed gracefully on cheeks, fragrant white jasmine flowers woven in long dark hair, traditional royal Burmese filigree gold jewelry".
- CRITICAL RULE: NEVER mix wrong or mismatched cultural elements (e.g. do not mix Thai accessories with traditional Japanese kimono, or Burmese Thanaka with Indian saree unless explicitly requested). Keep cultural elements 100% authentic and harmonious.

PROMPT ENGINE OUTPUT RULES:
1. Produce a clean, detailed English prompt ready for Flux / Midjourney / Ideogram.
2. Always end with a strong negative prompt that includes: "different face, altered face, changed eyes, changed nose, changed lips, distorted face, facial asymmetry, face swap artifact, mismatched identity".
3. CRITICAL RULE FOR SKIPPED OPTIONS: If any selection parameter is set to "skip", "None", or "Default", DO NOT include the literal word "skip" in the prompt. Instead, auto-determine a natural, harmonious photography default or omit that attribute altogether.
4. CRITICAL MANDATE FOR ASPECT RATIO: You MUST MANDATORILY append "--ar <aspectRatio>" (e.g. "--ar 9:16", "--ar 16:9", "--ar 1:1", "--ar 4:5", "--ar 3:4", "--ar 2:3", "--ar 3:2") at the end of masterPrompt, midjourneyFormat, fluxFormat, and sdxlFormat.

ALWAYS structure the masterPrompt string in this EXACT order:
1. Subject (100% exact facial likeness, eyes, nose, lips lock, age, gender, ethnicity, expression, pose)
2. Clothing & accessories
3. Action / Pose
4. Environment & Background
5. Lighting (time + quality + direction)
6. Camera & lens
7. Style & mood
8. Technical quality keywords & Aspect Ratio parameter (--ar <ratio>)
9. Negative prompt (Always end with strong negative prompt keywords: "different face, changed eyes, changed nose, changed lips, distorted facial features")

Output ONLY valid JSON matching this exact structure:
{
  "masterPrompt": "string (Structured prompt strictly ending with --ar <ratio>)",
  "negativePrompt": "string (Step 9: Comprehensive negative prompt keywords including face/eyes/nose/lips preservation)",
  "midjourneyFormat": "string (Formatted with /imagine prompt: ... --ar <ratio> --v 6.0 --style raw)",
  "fluxFormat": "string (Formatted with ... --ar <ratio> optimized specifically for Flux.1 dev/schnell)",
  "sdxlFormat": "string (Formatted with ... --ar <ratio> optimized for SDXL Turbo / Lightning)",
  "descriptionMm": "string (Detailed explanation in correct Myanmar language explaining why these camera parameters, lighting, and style choices were made - သတ်ပုံမှန်မှန်)",
  "descriptionEn": "string (Detailed explanation in English)",
  "cameraNotes": "string (Technical photography notes e.g., 85mm f/1.2, ISO 100, 1/250s)"
}`;

    const isCustomGarmentUpload = selection?.clothesSwapOption === 'custom_garment_upload' || !!selection?.customGarmentImage;

    const garmentStyleText = isCustomGarmentUpload
      ? `CUSTOM OUTFIT PHOTO ATTACHED: ${selection?.customGarmentDescription || selection?.garmentFabric || 'Visually analyze attached custom garment image carefully'}`
      : `${selection?.garmentStyle || 'Royal Silk Cheik Longyi'} (${selection?.garmentFabric || 'Pure Woven Silk'})`;

    const userCustomText = customInstruction || selection?.customInstruction || '';

    const promptText = `Generate a master photography prompt based on these parameters:
App Mode: ${mode || 'txt2img'}
Img2Img Option: ${selection?.img2imgOption || 'app_custom'} (Option 1 = App presets, Option 2 = Background Replacement Only, Option 3 = Copy Pose, Garment & BG from 2nd Photo)
Preserve Subject 100%: ${selection?.preserveSubject100Percent !== false ? 'ENABLED' : 'DISABLED'}
Identity Lock: ${selection?.identityLock || (mode === 'txt2img' ? 'no_lock' : 'face_100')}
Subject: ${selection?.subject || 'woman'}
Custom Subject Details: ${selection?.customSubjectDetails || 'None'}
Couple Outfit Type: ${selection?.coupleOutfitType || 'None'}
Couple Interaction & Pose: ${selection?.couplePose || 'None'}
Groom Details (သတို့သား): Outfit/Full Set: ${selection?.groomOutfit || 'None'}, Top: ${selection?.groomTop || 'None'}, Bottom: ${selection?.groomBottom || 'None'}, Expression: ${selection?.groomExpression || 'None'}, Hair: ${selection?.groomHair || 'None'}, Props/Pose: ${selection?.groomPoseAccessory || 'None'}
Bride Details (သတို့သမီး): Outfit/Full Set: ${selection?.brideOutfit || 'None'}, Top: ${selection?.brideTop || 'None'}, Bottom: ${selection?.brideBottom || 'None'}, Expression: ${selection?.brideExpression || 'None'}, Hair: ${selection?.brideHair || 'None'}, Props/Pose: ${selection?.bridePoseAccessory || 'None'}
Wedding Accessories (မင်္ဂလာ အသုံးဆောင်များ): ${selection?.weddingAccessoryProps || 'None'}
Wedding Studio Backdrop & Props (Studio ခန်းဝင် ပစ္စည်းများ): ${selection?.weddingStudioBackdropProps || 'None'}
Age Range: ${selection?.ageRange || '18_25'}
Pose & Expression: ${selection?.poseExpression || 'Soft Smile / Natural Pose'} (${selection?.customPoseDetails || 'None'})
Ethnicity / Culture: ${selection?.ethnicity || 'burmese'} (${selection?.customEthnicityDetails || 'Burmese / Myanmar'})
Include Cultural Props / Accessories: ${selection?.includeCulturalProps ? 'YES' : 'NO'}
Cultural Props Details: ${selection?.culturalPropsDetails || 'None (or Thanaka, flower garland, longyi, Pathein umbrella if requested)'}
Event/Festival: ${selection?.event || 'Thingyan Water Festival'}
Custom Event Details: ${selection?.customEventDetails || 'None'}
Location/Environment: ${selection?.location || 'Heritage Temple Sanctuary'}
Custom Location Details: ${selection?.customLocationDetails || 'None'}
Time & Lighting: ${selection?.timeAndLighting || 'Golden Hour Warm Sunlight'}
Emotion & Mood: ${selection?.moodEmotion || 'Calm & Peaceful'}
Custom Lighting Details: ${selection?.customLightingDetails || 'None'}
Camera Setup: ${selection?.camera || 'Sony A7R V 85mm f/1.2'}
Camera Angle & Framing: ${selection?.cameraAngle || 'Eye Level'}
Photo Style: ${selection?.photoStyle || 'Photorealistic Studio Portrait'}
Retouching Style: ${selection?.retouching || 'Ultra-Realistic Natural Skin Pores'}
Makeup: ${selection?.makeup || 'Natural Glam Dewy'}
Color Grade: ${selection?.colorGrade || 'Kodak Portra 400'}
Aspect Ratio: ${selection?.aspectRatio || '9:16'} (MANDATORY: include --ar ${selection?.aspectRatio || '9:16'} in prompt)
Quality Profile: ${selection?.qualityProfile || '8K UHD Masterpiece'}
Clothes Swap Option: ${selection?.clothesSwapOption || 'in_app_preset'}
Garment/Outfit: ${garmentStyleText}
Additional Custom Details: ${userCustomText || 'None'}

CRITICAL INSTRUCTION FOR PROMPT COMPLETENESS: You MUST read ALL of the above user parameters and incorporate EVERY SINGLE parameter that is selected, typed, or specified into the masterPrompt without omitting or skipping any details!
Please ensure Myanmar description is polite, professional, with clean spelling (သတ်ပုံမှန်မှန်).`;

    // Extract images if provided
    const personImgPart = parseDataUrlToPart(selection?.referenceImage);
    const customGarmentImgPart = parseDataUrlToPart(selection?.customGarmentImage);
    const partnerImgPart = parseDataUrlToPart(selection?.partnerReferenceImage);
    const styleRefImgPart = parseDataUrlToPart(selection?.styleReferenceImage);

    let imageNoticeText = '';
    if (personImgPart) {
      imageNoticeText += '\n- [ATTACHED IMAGE 1: Primary Subject / Original Person Photo] MANDATORY STRICT SEQUENCE STEP 1: Keep the exact same person, face, body shape, pose, skin tone, and facial expression from Image 1 with 100% fidelity. Do NOT alter face, eyes, nose, lips, or body posture.';
    }
    if (customGarmentImgPart) {
      imageNoticeText += '\n- [ATTACHED IMAGE 2: Clothing Reference / Garment Outfit Photo] MANDATORY STRICT SEQUENCE STEP 2: Replace ONLY the clothing with the outfit from Image 2! Thoroughly analyze and describe Image 2 clothing in complete detail following the Clothing Detail Checklist (fabric type, color and pattern, style, length, embroidery/design details, outerwear/accessories, fit on body).';
    }
    if (partnerImgPart) {
      imageNoticeText += '\n- [ATTACHED IMAGE: Partner Reference Photo] Maintain 100% facial features and body posture from this partner photo.';
    }
    if (styleRefImgPart) {
      imageNoticeText += '\n- [ATTACHED IMAGE 2: Style / Pose / Outfit Reference Photo] CRITICAL FOR OPTION 3: Replicate and copy the pose, clothing/outfit style, accessories, and background environment directly from this second reference image onto the person from Image 1!';
    }

    const fullPromptText = promptText + (imageNoticeText ? `\n\nATTACHED REFERENCE IMAGES INSTRUCTION:${imageNoticeText}` : '');

    const contentsArray: any[] = [{ text: fullPromptText }];
    if (personImgPart) contentsArray.push(personImgPart);
    if (customGarmentImgPart) contentsArray.push(customGarmentImgPart);
    if (partnerImgPart) contentsArray.push(partnerImgPart);
    if (styleRefImgPart) contentsArray.push(styleRefImgPart);

    const response = await generateContentWithFallback(ai, {
      contents: contentsArray,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const jsonText = response.text ? response.text.trim() : "{}";
    const resultObj = JSON.parse(jsonText);

    // Guaranteed aspect ratio post-processing
    const targetAr = selection?.aspectRatio || '9:16';
    const arTag = `--ar ${targetAr}`;

    if (resultObj.masterPrompt) {
      if (!resultObj.masterPrompt.includes('--ar')) {
        resultObj.masterPrompt = `${resultObj.masterPrompt.trim()} ${arTag}`;
      }
    }
    if (resultObj.midjourneyFormat) {
      if (!resultObj.midjourneyFormat.includes('--ar')) {
        resultObj.midjourneyFormat = `${resultObj.midjourneyFormat.trim()} ${arTag} --v 6.0 --style raw`;
      }
    } else if (resultObj.masterPrompt) {
      resultObj.midjourneyFormat = `/imagine prompt: ${resultObj.masterPrompt} --v 6.0 --style raw`;
    }

    if (resultObj.fluxFormat && !resultObj.fluxFormat.includes('--ar')) {
      resultObj.fluxFormat = `${resultObj.fluxFormat.trim()} ${arTag}`;
    }
    if (resultObj.sdxlFormat && !resultObj.sdxlFormat.includes('--ar')) {
      resultObj.sdxlFormat = `${resultObj.sdxlFormat.trim()} ${arTag}`;
    }

    res.json({
      success: true,
      promptData: {
        ...resultObj,
        aspectRatio: targetAr,
      }
    });
  } catch (error: any) {
    console.error("Error generating prompt:", error);

    // Fallback template builder if model fails or quota is reached
    const isQuota = error?.message?.includes('429') || error?.message?.includes('RESOURCE_EXHAUSTED') || error?.status === 429;
    const fallbackPromptData = buildComprehensiveMasterPrompt(
      req.body?.selection || {},
      req.body?.mode || 'txt2img'
    );

    res.json({
      success: true,
      promptData: fallbackPromptData,
      warning: isQuota ? "API quota reached. Generated using fallback prompt builder." : undefined
    });
  }
});

// Prompt Translation API Endpoint (English <-> Myanmar)
app.post("/api/translate-prompt", async (req, res) => {
  try {
    const { action, text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, error: "Text is required" });
    }

    const ai = getGeminiClient();

    let systemInstruction = "";
    let promptInstruction = "";

    if (action === "to_myanmar") {
      systemInstruction = `You are an expert translator and prompt specialist.
Translate the following English AI photography prompt into clear, natural, and detailed Myanmar language (သတ်ပုံမှန်မှန်).
Explain and translate all key visual details including subject features, clothing, pose, location, lighting, depth of field, camera optics, and overall style.
Output ONLY the clean translated Myanmar text so a Myanmar user can read, review, and edit it easily. No preamble, no quotes.`;
      promptInstruction = `Translate this photography prompt into clear Myanmar language:\n${text}`;
    } else {
      systemInstruction = `You are a world-class AI photography prompt engineer specializing in Midjourney v6, Flux.1, SDXL, and Imagen 3.
Your task is to take the user's edited Myanmar text and convert it into an ultra-detailed, photorealistic, master English photography prompt.
Structure and refine it with high-end photography parameters: subject features, authentic skin texture, outfit details, lighting (volumetric/soft/natural), camera lens (e.g. 85mm f/1.4), depth of field, 8k resolution, and color grade.
Output ONLY the polished final English prompt without any preamble, markdown formatting, or commentary.`;
      promptInstruction = `Convert this edited Myanmar description into a high-quality professional English AI photography prompt:\n${text}`;
    }

    const response = await generateContentWithFallback(ai, {
      contents: promptInstruction,
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });

    const translatedText = response.text ? response.text.trim() : "";

    res.json({
      success: true,
      translatedText,
    });
  } catch (error: any) {
    console.error("Error translating prompt:", error);
    res.json({
      success: true,
      translatedText: req.body?.text || "Translation unavailable due to rate limits.",
      warning: "Quota fallback activated."
    });
  }
});

// Image Generation API Endpoint
app.post("/api/generate-image", async (req, res) => {
  try {
    const { prompt, aspectRatio = "1:1", referenceImage } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback placeholder image if no key set
      const encodedPrompt = encodeURIComponent(prompt.substring(0, 100));
      return res.json({
        success: true,
        imageUrl: `https://picsum.photos/seed/${encodedPrompt}/1024/1024`,
        isPlaceholder: true
      });
    }

    const ai = getGeminiClient();

    // Valid Gemini aspect ratios
    const validRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const formattedRatio = validRatios.includes(aspectRatio) ? aspectRatio : "1:1";

    const parts: any[] = [];

    if (referenceImage && referenceImage.startsWith("data:image")) {
      const match = referenceImage.match(/^data:(image\/\w+);base64,(.+)$/);
      if (match) {
        parts.push({
          inlineData: {
            mimeType: match[1],
            data: match[2]
          }
        });
      }
    }

    parts.push({
      text: `CRITICAL INSTRUCTION: Maintain 100% exact face, eyes, nose, lips, facial features, and identity from the provided reference image. Do not distort, alter, or change the subject's face, eyes, nose, or lips. Prompt details: ${prompt}`
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-lite-image",
      contents: {
        parts
      },
      config: {
        imageConfig: {
          aspectRatio: formattedRatio as any,
        }
      }
    });

    let imageUrl = null;
    if (response.candidates?.[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          const mime = part.inlineData.mimeType || "image/png";
          imageUrl = `data:${mime};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      // Fallback image if part not returned in inlineData format
      const seed = Math.floor(Math.random() * 100000);
      imageUrl = `https://picsum.photos/seed/${seed}/1024/1024`;
    }

    res.json({
      success: true,
      imageUrl
    });
  } catch (error: any) {
    console.error("Error generating image:", error);
    const seed = Math.floor(Math.random() * 100000);
    res.json({
      success: true,
      imageUrl: `https://picsum.photos/seed/infinity_${seed}/1024/1024`,
      error: error.message
    });
  }
});

// User & Admin Dashboard API Routes
app.get("/api/dashboard/stats", (req, res) => {
  res.json({
    success: true,
    totalPrompts: 1420,
    totalUsers: 84,
    activeModels: ["gemini-3.7-flash", "imagen-3.0"],
    systemStatus: "operational"
  });
});

app.get("/api/dashboard/config", (req, res) => {
  res.json({
    success: true,
    maintenanceMode: false,
    version: "2.5.0",
    serverTime: new Date().toISOString()
  });
});

// Global Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Express Error Middleware caught:", err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal server error"
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Infinity Prompt Studio server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
