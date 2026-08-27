import {
  SubjectOption,
  SubCategoryPresetOption,
  EventOption,
  LocationOption,
  LightingOption,
  TimeOfDayOption,
  MoodOption,
  CameraOption,
  CameraAngleOption,
  PhotoStyleOption,
  RetouchOption,
  MakeupOption,
  ColorGradeOption,
  AspectRatioOption,
  QualityProfileOption,
  GarmentOption,
  EthnicityOption,
  PoseOption,
  AgeRangeOption,
  HeightOption,
  WeightOption,
  PresetTemplate
} from '../types';

export const SUBJECT_OPTIONS: SubjectOption[] = [
  { id: 'woman', emoji: '👩', labelMm: 'အမျိုးသမီး', labelEn: 'Woman', description: 'Sophisticated portrait of a woman' },
  { id: 'man', emoji: '👨', labelMm: 'အမျိုးသား', labelEn: 'Man', description: 'Charismatic portrait of a man' },
  { id: 'couple', emoji: '👩‍❤️‍👨', labelMm: 'စုံတွဲ', labelEn: 'Couple', description: 'Romantic couple in aesthetic harmony' },
  { id: 'child', emoji: '👧', labelMm: 'ကလေး', labelEn: 'Child', description: 'Innocent & cheerful child portrait' },
  { id: 'family', emoji: '👨‍👩‍👧', labelMm: 'မိသားစု', labelEn: 'Family', description: 'Warm family portrait with natural joy' },
  { id: 'pet', emoji: '🐶', labelMm: 'အိမ်မွေးတိရစ္ဆာန်', labelEn: 'Pet', description: 'Adorable high-detail pet photo' },
  { id: 'product', emoji: '📦', labelMm: 'ကုန်ပစ္စည်း', labelEn: 'Product', description: 'Commercial studio product photoshoot' },
  { id: 'fashion', emoji: '👗', labelMm: 'ဖက်ရှင်', labelEn: 'Fashion', description: 'High-end fashion & apparel photoshoot' },
];

export const PET_OPTIONS: SubCategoryPresetOption[] = [
  { id: 'dog', emoji: '🐶', labelMm: '၁။ ခွေး (Dog)', labelEn: '1. Dog', promptText: 'loyal friendly dog with glossy fur and happy expressive eyes' },
  { id: 'cat', emoji: '🐱', labelMm: '၂။ ကြောင် (Cat)', labelEn: '2. Cat', promptText: 'cute graceful cat with silky fur and bright curious eyes' },
  { id: 'bird', emoji: '🐦', labelMm: '၃။ ငှက် (Bird)', labelEn: '3. Bird', promptText: 'beautiful songbird perched gracefully with vibrant feathers' },
  { id: 'rabbit', emoji: '🐰', labelMm: '၄။ ယုန် (Rabbit)', labelEn: '4. Rabbit', promptText: 'fluffy adorable rabbit with soft fur and twitching nose' },
  { id: 'hamster', emoji: '🐹', labelMm: '၅။ ဟမ်စတာ (Hamster)', labelEn: '5. Hamster', promptText: 'tiny cute hamster holding food in tiny paws' },
  { id: 'fish', emoji: '🐠', labelMm: '၆။ ငါး (Fish)', labelEn: '6. Fish', promptText: 'vibrant colorful ornamental aquarium fish swimming gracefully in clear water' },
  { id: 'turtle', emoji: '🐢', labelMm: '၇။ လိပ် (Turtle)', labelEn: '7. Turtle', promptText: 'cute small pet turtle with detailed shell patterns' },
  { id: 'chicken', emoji: '🐓', labelMm: '၈။ ကြက် (Chicken)', labelEn: '8. Chicken', promptText: 'proud rooster and fluffy farm hen with detailed feathers' },
  { id: 'duck', emoji: '🦆', labelMm: '၉။ ဘဲ (Duck)', labelEn: '9. Duck', promptText: 'adorable duckling with soft yellow down swimming on peaceful water' },
  { id: 'parrot', emoji: '🦜', labelMm: '၁၀။ ကြက်တူရွေး (Parrot)', labelEn: '10. Parrot', promptText: 'vibrant scarlet parrot with brilliant multicolored tropical plumage' },
  { id: 'puppy', emoji: '🐕', labelMm: '၁၁။ ချစ်စရာ ခွေးကလေး (Puppy)', labelEn: '11. Puppy', promptText: 'playful innocent tiny puppy with big adorable eyes' },
  { id: 'kitten', emoji: '🐈', labelMm: '၁၂။ ချစ်စရာ ကြောင်ကလေး (Kitten)', labelEn: '12. Kitten', promptText: 'tiny fluffy playful kitten with sweet curious expression' },
  { id: 'long_haired_cat', emoji: '🦁', labelMm: '၁၃။ အမွှေးရှည် ကြောင် (Long-haired Cat)', labelEn: '13. Long-haired Cat', promptText: 'luxurious long-haired Persian cat with fluffy silky fur' },
  { id: 'small_breed_dog', emoji: '🐩', labelMm: '၁၄။ အရွယ်သေး ခွေး (Small Breed Dog)', labelEn: '14. Small Breed Dog', promptText: 'cute small toy poodle Pomeranian dog with fluffy coat' },
  { id: 'large_breed_dog', emoji: '🐕‍🦺', labelMm: '၁၅။ အရွယ်ကြီး ခွေး (Large Breed Dog)', labelEn: '15. Large Breed Dog', promptText: 'majestic large Golden Retriever Husky dog with thick coat and noble posture' },
  { id: 'colorful_bird', emoji: '🦚', labelMm: '၁၆။ ရောင်စုံ ငှက် (Colorful Bird)', labelEn: '16. Colorful Bird', promptText: 'exotic bird with brilliant iridescent peacock feathers' },
  { id: 'aquatic_pet', emoji: '🐙', labelMm: '၁၇။ ရေနေသတ္တဝါ (Aquatic Pet)', labelEn: '17. Aquatic Pet', promptText: 'exotic aquatic pet in crystal clear illuminated aquarium' },
  { id: 'pet_couple', emoji: '🐶🐱', labelMm: '၁၈။ စုံတွဲ တိရစ္ဆာန် (Pet Couple)', labelEn: '18. Pet Couple', promptText: 'pair of adorable pet friends sitting together affectionately' },
  { id: 'child_with_pet', emoji: '👧🐶', labelMm: '၁၉။ ကလေးနှင့် တိရစ္ဆာန် (Child with Pet)', labelEn: '19. Child with Pet', promptText: 'heartwarming portrait of a child hugging an adorable friendly pet' },
  { id: 'family_with_pet', emoji: '👨‍👩‍👧🐶', labelMm: '၂၀။ မိသားစုနှင့် တိရစ္ဆာန် (Family with Pet)', labelEn: '20. Family with Pet', promptText: 'warm happy family portrait posing together with their beloved pet dog' },
];

export const PRODUCT_OPTIONS: SubCategoryPresetOption[] = [
  { id: 'skincare_product', emoji: '🧴', labelMm: '၁။ အသားအရေ ထိန်းသိမ်းမှု (Skincare Product)', labelEn: '1. Skincare Product', promptText: 'minimalist luxury skincare serum dropper glass bottle on smooth marble with soft water droplets' },
  { id: 'makeup_product', emoji: '💄', labelMm: '၂။ အလှကုန် (Makeup Product)', labelEn: '2. Makeup Product', promptText: 'elegant velvet matte lipstick and compact powder makeup set in sleek gold magnetic packaging' },
  { id: 'watch_product', emoji: '⌚', labelMm: '၃။ နာရီ (Watch)', labelEn: '3. Watch', promptText: 'premium mechanical chronograph wristwatch with metallic sheen and genuine leather strap' },
  { id: 'smartphone_product', emoji: '📱', labelMm: '၄။ ဖုန်း (Smartphone)', labelEn: '4. Smartphone', promptText: 'sleek flagship glass smartphone with glowing borderless display on modern architectural podium' },
  { id: 'headphones_product', emoji: '🎧', labelMm: '၅။ နားကြပ် (Headphones / Earbuds)', labelEn: '5. Headphones / Earbuds', promptText: 'high-fidelity wireless noise-canceling headphones with brushed metallic ear cups and minimalist headband' },
  { id: 'bag_product', emoji: '👜', labelMm: '၆။ အိတ် (Handbag / Bag)', labelEn: '6. Handbag / Bag', promptText: 'luxurious quilted leather designer handbag with gold chain hardware on clean studio pedestal' },
  { id: 'shoes_product', emoji: '👟', labelMm: '၇။ ဖိနပ် (Shoes)', labelEn: '7. Shoes', promptText: 'limited edition premium footwear sneakers with vibrant modern design and detailed textures' },
  { id: 'sunglasses_product', emoji: '🕶️', labelMm: '၈။ နေကာမျက်မှန် (Sunglasses)', labelEn: '8. Sunglasses', promptText: 'stylish designer aviator sunglasses with gradient lenses resting on luxury stone podium' },
  { id: 'perfume_product', emoji: '🌸', labelMm: '၉။ ရေမွှေး (Perfume)', labelEn: '9. Perfume', promptText: 'crystal clear glass luxury perfume bottle with golden nozzle and subtle soft floral reflections' },
  { id: 'jewelry_product', emoji: '💎', labelMm: '၁၀။ လက်ဝတ်ရတနာ (Jewelry)', labelEn: '10. Jewelry', promptText: 'exquisite diamond engagement ring and gold necklace sparkling under focused studio lighting' },
  { id: 'coffeetea_product', emoji: '☕', labelMm: '၁၁။ ကော်ဖီ / လက်ဖက်ရည် (Coffee / Tea Product)', labelEn: '11. Coffee / Tea Product', promptText: 'artisanal ceramic coffee cup with latte art surrounded by fresh roasted coffee beans and organic tea tin' },
  { id: 'food_product', emoji: '🍱', labelMm: '၁၂။ အစားအစာ (Food Product)', labelEn: '12. Food Product', promptText: 'gourmet artisanal food product dish elegantly presented with fresh garnish on slate board' },
  { id: 'homedecor_product', emoji: '🕯️', labelMm: '၁၃။ အလှဆင်ပစ္စည်း (Home Decor)', labelEn: '13. Home Decor', promptText: 'Nordic minimalist home decor set with scented candle jar, ceramic ornament, and warm ambient light' },
  { id: 'vase_product', emoji: '🏺', labelMm: '၁၄။ ပန်းအိုး (Vase)', labelEn: '14. Vase', promptText: 'handcrafted ceramic floral vase with graceful curves holding dried pampas grass and fresh blooms' },
  { id: 'book_product', emoji: '📚', labelMm: '၁၅။ စာအုပ် (Book)', labelEn: '15. Book', promptText: 'aesthetic hardbound book with gold foil embossed title and crisp textured paper pages' },
  { id: 'techgadget_product', emoji: '⚡', labelMm: '၁၆။ နည်းပညာ ပစ္စည်း (Tech Gadget)', labelEn: '16. Tech Gadget', promptText: 'futuristic smart home IoT tech gadget with LED status ring and matte finish' },
  { id: 'sports_product', emoji: '⚽', labelMm: '၁၇။ အားကစားပစ္စည်း (Sports Product)', labelEn: '17. Sports Product', promptText: 'pro-level sports equipment set with textured basketball, gym water bottle, and athletic gear' },
  { id: 'baby_product', emoji: '🍼', labelMm: '၁၈။ ကလေးထိန်း ပစ္စည်း (Baby Product)', labelEn: '18. Baby Product', promptText: 'gentle organic baby skincare lotion bottle and soft cotton plush toy in pastel tones' },
  { id: 'myanmar_product', emoji: '🇲🇲', labelMm: '၁၉။ မြန်မာ့ရိုးရာ ပစ္စည်း (Traditional Myanmar Product)', labelEn: '19. Traditional Myanmar Product', promptText: 'authentic traditional Myanmar lacquerware box and gold gilded teakwood craft' },
  { id: 'handcraft_product', emoji: '🧶', labelMm: '၂၀။ လက်မှုပစ္စည်း (Handcraft Product)', labelEn: '20. Handcraft Product', promptText: 'intricate handcrafted woven bamboo basket and artisanal pottery craft with natural textures' },
];

export const FASHION_OPTIONS: SubCategoryPresetOption[] = [
  { id: 'pagoda_temple_attire', emoji: '🛕', labelMm: '၁။ ဘုရားကျောင်း/စေတီတော် အဝတ်အစား (Pagoda & Temple Traditional Attire)', labelEn: '1. Pagoda & Temple Attire', promptText: 'modest elegant Myanmar traditional white lace blouse and silk longyi sarong suitable for visiting Shwedagon Pagoda' },
  { id: 'traditional_acheik', emoji: '🇲🇲', labelMm: '၂။ မြန်မာ့ရိုးရာ ချိတ်လုံချည် / တိုက်ပုံ (Traditional Acheik Longyi & Taikpong)', labelEn: '2. Traditional Acheik Longyi', promptText: 'authentic hand-woven silk Myanmar acheik longyi sarong and silk Taikpong jacket with intricate royal motifs' },
  { id: 'konbaung_royal_court', emoji: '👑', labelMm: '၃။ ကုန်းဘောင်ခေတ် နန်းတွင်း ဝတ်စုံ (Konbaung Royal Court Attire)', labelEn: '3. Konbaung Royal Court Attire', promptText: 'regal Konbaung kingdom royal court outfit with heavy gold thread embroidery, peacock velvet capes, and royal jewelry' },
  { id: 'kachin_ethnic', emoji: '🗡️', labelMm: '၄။ ကချင် ရိုးရာ မနော ဝတ်စုံ (Kachin Traditional Manao Outfit)', labelEn: '4. Kachin Ethnic Attire', promptText: 'ornate traditional Kachin silk dress with black velvet jacket, silver coin ornaments, and handwoven Manao sarong' },
  { id: 'karen_ethnic', emoji: '🥁', labelMm: '၅။ ကရင် ရိုးရာ အဝတ်အစား (Karen Traditional Woven Outfit)', labelEn: '5. Karen Ethnic Outfit', promptText: 'vibrant red woven traditional Karen tunic and sarong (Htaing & Done) with silver beadwork' },
  { id: 'shan_ethnic', emoji: '🏮', labelMm: '၆။ ရှမ်း ရိုးရာ အဝတ်အစား (Shan Traditional Silk Outfit)', labelEn: '6. Shan Ethnic Attire', promptText: 'elegant traditional Shan silk tunic, wide baggy trousers, shoulder bag, and golden turban headband' },
  { id: 'chin_ethnic', emoji: '🏔️', labelMm: '၇။ ချင်း ရိုးရာ အဝတ်အစား (Chin Traditional Woven Blanket Outfit)', labelEn: '7. Chin Ethnic Attire', promptText: 'distinctive traditional Chin handwoven colorful blanket shawl (Thangnang) and patterned woven sarong' },
  { id: 'mon_ethnic', emoji: '🦚', labelMm: '၈။ မွန် ရိုးရာ အဝတ်အစား (Mon Traditional Swan Embroidery Outfit)', labelEn: '8. Mon Ethnic Attire', promptText: 'graceful traditional Mon red and white woven silk blouse and longyi with swan embroidery' },
  { id: 'rakhine_ethnic', emoji: '🚣', labelMm: '၉။ ရခိုင် ရိုးရာ အဝတ်အစား (Rakhine Traditional Woven Outfit)', labelEn: '9. Rakhine Ethnic Attire', promptText: 'noble traditional Rakhine woven silk longyi and velvet jacket with silver thread embroidery' },
  { id: 'kayah_ethnic', emoji: '🏹', labelMm: '၁၀။ ကယား/ကယန်း ရိုးရာ အဝတ်အစား (Kayah & Kayan Ethnic Attire)', labelEn: '10. Kayah & Kayan Ethnic Attire', promptText: 'authentic traditional Kayah red woven shawl dress and brass neck coil ornaments' },
  { id: 'pao_ethnic', emoji: '🚀', labelMm: '၁၁။ ပအိုဝ်း ရိုးရာ အဝတ်အစား (Pa-O Traditional Black & Orange Outfit)', labelEn: '11. Pa-O Ethnic Attire', promptText: 'distinctive traditional black indigo jacket and pants paired with bright orange turban headband' },
  { id: 'inle_dweller_attire', emoji: '🛶', labelMm: '၁၂။ အင်းလေး ရိုးရာ/ရေလုပ်သား အဝတ်အစား (Inle Lake Traditional Water Dweller Outfit)', labelEn: '12. Inle Water Dweller Outfit', promptText: 'traditional Shan-Intha woven cotton shirt and wide trousers with woven Shan hat, ideal for Inle Lake waters' },
  { id: 'wedding_fashion', emoji: '💍', labelMm: '၁၃။ မင်္ဂလာဆောင် ပွဲတက် ဝတ်စုံ (Royal Myanmar Wedding Ceremony Attire)', labelEn: '13. Royal Wedding Attire', promptText: 'luxurious royal wedding fashion attire adorned with opulent embroidery, gold threads, and pearl accents' },
  { id: 'thingyan_casual', emoji: '💦', labelMm: '၁၄။ သင်္ကြန် ရေသဘင် ဝတ်စုံ (Thingyan Water Festival Casual Outfit)', labelEn: '14. Thingyan Casual Outfit', promptText: 'festive Thingyan water festival casual yellow Padauk floral shirt and comfortable longyi with water goggles' },
  { id: 'beach_resort_wear', emoji: '🏖️', labelMm: '၁၅။ ကမ်းခြေ အပန်းဖြေ ဝတ်စုံ (Beach Resort Swim & Linen Outfit)', labelEn: '15. Beach Resort Outfit', promptText: 'breezy summer beachwear outfit with light white linen shirt, sun hat, and tropical sarong for Ngapali beach' },
  { id: 'highland_winter_coat', emoji: '❄️', labelMm: '၁၆။ တောင်ပေါ် ဆောင်းရာသီ အဝတ်အစား (Highland Winter Warm Coat & Scarf)', labelEn: '16. Highland Winter Outfit', promptText: 'cozy warm highland winter coat with handwoven woolen scarf, leather boots, for Pyin Oo Lwin or Kalaw' },
  { id: 'fusion_fashion', emoji: '🌺', labelMm: '၁၇။ ခေတ်ပေါ် ရိုးရာ စပိတ်/ဖက်ရှင် (Modern Acheik Silk Fashion Fusion)', labelEn: '17. Modern Acheik Silk Fusion', promptText: 'innovative traditional Myanmar acheik silk fused with modern high-fashion cuts and edgy avant-garde styling' },
  { id: 'streetwear', emoji: '🧥', labelMm: '၁၈။ မြို့ပြ လမ်းမ/စထရီးဝဲ ဖက်ရှင် (Urban Streetwear Fashion Outfit)', labelEn: '18. Urban Streetwear Outfit', promptText: 'trendy streetwear oversized denim jacket, urban hoodie, and stylish casual pants for Yangon city streets' },
  { id: 'western_suits', emoji: '🤵', labelMm: '၁၉။ အနောက်တိုင်း တိုက်ပုံ / တုက်စီဒို ဝတ်စုံ (Formal Western Suit & Tuxedo)', labelEn: '19. Formal Western Suit & Tuxedo', promptText: 'sharp bespoke Western tuxedo suit with silk lapels, pocket square, bow tie, and polished oxford shoes' },
  { id: 'evening_gown', emoji: '💃', labelMm: '၂၀။ ညနေခင်း ပွဲတက် ဂါဝန် ဝတ်စုံ (Glamorous Evening Party Gown)', labelEn: '20. Evening Party Gown', promptText: 'glamorous high-fashion evening gown and formal attire with silky luster and elegant flowing drape' },
  { id: 'cafe_aesthetic_wear', emoji: '☕', labelMm: '၂၁။ ကော်ဖီဆိုင်/လမ်းလျှောက် ဝတ်စုံ (Aesthetic Cafe Casualwear)', labelEn: '21. Aesthetic Cafe Casualwear', promptText: 'chic minimalist casual outfit with soft pastel cardigan, linen trousers, and canvas tote bag' },
  { id: 'vintage_denim', emoji: '👖', labelMm: '၂၂။ ဂျင်း Vintage စတိုင် အဝတ်အစား (Retro Vintage Denim Outfit)', labelEn: '22. Retro Vintage Denim Outfit', promptText: 'classic retro distressed vintage denim jacket and stylish jeans outfit for street photography' },
  { id: 'kids_fashion', emoji: '👧', labelMm: '၂၃။ ကလေး ရိုးရာ/ခေတ်ပေါ် ဝတ်စုံ (Kids Traditional & Modern Fashion)', labelEn: '23. Kids Traditional & Modern Fashion', promptText: 'adorable stylish children\'s traditional silk outfit with colorful playful design and premium soft fabric' },
  { id: 'family_matching', emoji: '👨‍👩‍👧', labelMm: '၂၄။ မိသားစု လိုက်ဖက် ဝတ်စုံ (Family Matching Ethnic Fashion)', labelEn: '24. Family Matching Ethnic Fashion', promptText: 'harmonious matching family fashion apparel with elegant color palette and cohesive Burmese silk motifs' },
  { id: 'studio_couture', emoji: '🏛️', labelMm: '၂၅။ စတူဒီယို မော်ဒယ် အဝတ်အစား (High-Fashion Studio Couture)', labelEn: '25. Studio Couture Fashion', promptText: 'professional commercial studio fashion photoshoot outfit with volumetric lighting and high-fashion silhouette' },
];

export const WEDDING_COUPLE_OPTIONS: SubCategoryPresetOption[] = [
  { id: 'myanmar_royal_wedding', emoji: '💍', labelMm: '၁။ မြန်မာ့ရိုးရာ နန်းတွင်း မင်္ဂလာဆောင် ဝတ်စုံ (Royal Myanmar Traditional Wedding)', labelEn: '1. Royal Myanmar Traditional Wedding', promptText: 'luxurious royal Myanmar wedding couple in rich embroidered silk acheik longyi and golden taikpong jacket with traditional headwear' },
  { id: 'western_white_wedding', emoji: '👰', labelMm: '၂။ အနောက်တိုင်း မင်္ဂလာဝတ်စုံ စတူဒီယို ပုံတူ (Western White Wedding Dress & Tuxedo)', labelEn: '2. Western White Wedding Dress & Tuxedo', promptText: 'elegant bride in flowing white lace wedding dress and groom in sharp black tuxedo holding bridal bouquet' },
  { id: 'engagement_ceremony', emoji: '💐', labelMm: '၃။ စေ့စပ်ပွဲ မင်္ဂလာ အမှတ်တရ (Engagement Ring Ceremony)', labelEn: '3. Engagement Ring Ceremony', promptText: 'romantic couple exchanging engagement ring with loving smile in floral decorated venue' },
  { id: 'konbaung_wedding_court', emoji: '👑', labelMm: '၄။ ကုန်းဘောင်ခေတ် နန်းတွင်း မင်္ဂလာဆောင် (Konbaung Royal Court Wedding)', labelEn: '4. Konbaung Royal Court Wedding', promptText: 'regal Konbaung kingdom royal wedding couple with heavy gold embroidery, peacock velvet capes, and authentic royal jewels' },
  { id: 'beach_prewedding_sunset', emoji: '🏖️', labelMm: '၅။ ကမ်းခြေ မင်္ဂလာ ပရီးဝက်ဒင်း (Beach Sunset Pre-wedding Shoot)', labelEn: '5. Beach Sunset Pre-wedding Shoot', promptText: 'romantic bride and groom walking barefoot on golden beach sand during sunset with ocean waves' },
  { id: 'highland_nature_prewedding', emoji: '🌿', labelMm: '၆။ သဘာဝ တောတောင် မင်္ဂလာ ရိုက်ကူးရေး (Highland Nature Pre-wedding)', labelEn: '6. Highland Nature Pre-wedding', promptText: 'picturesque pre-wedding portrait in Pyin Oo Lwin flower gardens surrounded by pine trees and misty hills' },
  { id: 'pagoda_blessing_wedding', emoji: '🛕', labelMm: '၇။ စေတီတော် မင်္ဂလာ ရိုးရာ ပုံတူ (Pagoda Temple Blessing Pre-wedding)', labelEn: '7. Pagoda Temple Blessing Pre-wedding', promptText: 'pious wedding couple in pure white Myanmar traditional silk attire posing gracefully at ancient temple courtyard' },
  { id: 'vintage_car_wedding', emoji: '🚘', labelMm: '၈။ ဗင်းတေ့ချ် ကားနှင့် မင်္ဂလာ ရိုက်ကူးရေး (Vintage Classic Car Wedding Shoot)', labelEn: '8. Vintage Classic Car Wedding Shoot', promptText: 'classic retro wedding couple posing elegantly leaning against a shiny vintage 1950s convertible car' },
  { id: 'reception_party_wedding', emoji: '🕯️', labelMm: '၉။ ခန်းမ မင်္ဂလာ ဧည့်ခံပွဲ ညစာ (Grand Hall Reception Gala Night)', labelEn: '9. Grand Hall Reception Gala Night', promptText: 'glamorous wedding reception couple dancing intimately under crystal chandeliers in opulent ballroom' },
  { id: 'modern_garden_wedding', emoji: '🌸', labelMm: '၁၀။ ပန်းခြံစတိုင် ခေတ်ပေါ် မင်္ဂလာ ရိုက်ကူးရေး (Modern Floral Garden Pre-wedding)', labelEn: '10. Modern Floral Garden Pre-wedding', promptText: 'fresh romantic pre-wedding photo under an archway of fresh pastel roses and blooming greenery' },
];

export const LOVERS_COUPLE_OPTIONS: SubCategoryPresetOption[] = [
  { id: 'beach_sunset_lovers', emoji: '👩‍❤️‍💋‍👨', labelMm: '၁၁။ ကမ်းခြေ နေဝင်ချိန် ချစ်သူများ လက်တွဲ (Sunset Beach Hand-in-Hand Walk)', labelEn: '11. Sunset Beach Hand-in-Hand Walk', promptText: 'affectionate couple walking hand in hand along beach shoreline during warm golden sunset' },
  { id: 'cozy_cafe_date', emoji: '☕', labelMm: '၁၂။ ကော်ဖီဆိုင် ချစ်သူများ ခံစားချက် (Cozy Cafe Date Night)', labelEn: '12. Cozy Cafe Date Night', promptText: 'sweet couple sharing a cup of hot coffee at a warm aesthetic cafe window with gentle laughter' },
  { id: 'bicycle_date_lovers', emoji: '🚲', labelMm: '၁၃။ စက်ဘီး အတူစီး မနက်ခင်း ချစ်သူများ (Morning Bicycle Ride Date)', labelEn: '13. Morning Bicycle Ride Date', promptText: 'playful couple riding a vintage tandem bicycle through a sunlit tree-lined avenue' },
  { id: 'rainy_day_umbrella', emoji: '🌧️', labelMm: '၁၄။ မိုးရေထဲ ထီးဆောင်း ပုံတူ (Rainy Day Shared Umbrella Portrait)', labelEn: '14. Rainy Day Shared Umbrella Portrait', promptText: 'romantic couple huddled together under a transparent umbrella in gentle rain with bokeh streetlights' },
  { id: 'urban_night_street_lovers', emoji: '🌃', labelMm: '၁၅။ မြို့ပြ ညမီးရောင် ချစ်သူများ လမ်းလျှောက် (Urban Night Street Date)', labelEn: '15. Urban Night Street Date', promptText: 'stylish young couple walking through neon-lit city streets at night in matching chic outfits' },
  { id: 'camping_campfire_lovers', emoji: '🏕️', labelMm: '၁၆။ တောင်ပေါ် စခန်းချ မီးပုံပွဲ ချစ်သူများ (Highland Camping Campfire Date)', labelEn: '16. Highland Camping Campfire Date', promptText: 'cozy couple sitting wrapped in a warm blanket by a crackling campfire under starry night sky' },
  { id: 'rooftop_sunset_embrace', emoji: '🌇', labelMm: '၁၇။ ခေါင်မိုးပေါ် နေဝင်ချိန် ချစ်သူများ (Rooftop Sunset Romantic Embrace)', labelEn: '17. Rooftop Sunset Romantic Embrace', promptText: 'loving couple standing on city rooftop terrace hugging warmly during golden hour glow' },
  { id: 'vintage_polaroid_couple', emoji: '📸', labelMm: '၁၈။ ဗင်းတေ့ချ် ပိုလာရွိုက် ချစ်သူများ (Vintage Polaroid Retro Couple Snap)', labelEn: '18. Vintage Polaroid Retro Couple Snap', promptText: 'nostalgic 90s retro film style couple photo with light leaks, soft film grain, and candid happy emotion' },
  { id: 'inle_flower_boat_lovers', emoji: '🛶', labelMm: '၁၉။ အင်းလေး ပန်းလှေပေါ် ချစ်သူများ (Inle Lake Romantic Flower Boat)', labelEn: '19. Inle Lake Romantic Flower Boat', promptText: 'romantic couple sitting peacefully on a wooden longtail boat surrounded by floating flowers on Inle Lake' },
  { id: 'autumn_park_cozy_lovers', emoji: '🍁', labelMm: '၂၀။ ဆောင်းဦး ပန်းခြံ ချစ်သူများ (Autumn Park Walk & Cozy Sweaters)', labelEn: '20. Autumn Park Walk & Cozy Sweaters', promptText: 'cozy lovers wearing warm knit sweaters walking over fallen autumn leaves in golden sunlit park' },
];

export const ALL_COUPLE_OPTIONS: SubCategoryPresetOption[] = [
  ...WEDDING_COUPLE_OPTIONS,
  ...LOVERS_COUPLE_OPTIONS,
];

export const EVENT_OPTIONS: EventOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 မရွေးပါ (ပွဲတော်မရှိပါ)', labelEn: '🚫 Skip / No Event', category: 'lifestyle' },
  { id: 'thingyan', emoji: '💦', labelMm: '၁။ သင်္ကြန် ရေသဘင်ပွဲတော် (Thingyan Water Festival)', labelEn: '1. Thingyan Water Festival', category: 'festival' },
  { id: 'thadingyut', emoji: '🪔', labelMm: '၂။ သီတင်းကျွတ် မီးထွန်းပွဲတော် (Thadingyut Light Festival)', labelEn: '2. Thadingyut Light Festival', category: 'festival' },
  { id: 'tazaungdaing', emoji: '🎈', labelMm: '၃။ တန်ဆောင်တိုင် မီးပုံးပျံပွဲတော် (Tazaungdaing Balloon Festival)', labelEn: '3. Tazaungdaing Balloon Festival', category: 'festival' },
  { id: 'karen_new_year', emoji: '🥁', labelMm: '၄။ ကရင် ရိုးရာ စုပေါင်း နှစ်သစ်ကူးပွဲတော် (Karen Traditional New Year)', labelEn: '4. Karen New Year Festival', category: 'festival' },
  { id: 'kachin_manaw', emoji: '🗡️', labelMm: '၅။ ကချင် ရိုးရာ မနောပွဲတော် (Kachin Manaw Festival)', labelEn: '5. Kachin Manaw Festival', category: 'festival' },
  { id: 'shan_festival', emoji: '🏮', labelMm: '၆။ ရှမ်း ရိုးရာ မီးထွန်းပွဲတော် (Shan Traditional Festival)', labelEn: '6. Shan Traditional Festival', category: 'festival' },
  { id: 'chin_national_day', emoji: '🎺', labelMm: '၇။ ချင်း အမျိုးသားနေ့နှင့် ရိုးရာပွဲတော် (Chin National Day Festival)', labelEn: '7. Chin National Day Festival', category: 'festival' },
  { id: 'mon_national_day', emoji: '🪕', labelMm: '၈။ မွန် အမျိုးသားနေ့ ပွဲတော် (Mon National Day Festival)', labelEn: '8. Mon National Day Festival', category: 'festival' },
  { id: 'rakhine_water_festival', emoji: '🚣', labelMm: '၉။ ရခိုင် ရိုးရာ သင်္ကြန်နှင့် လှေပြိုင်ပွဲတော် (Rakhine Water & Boat Racing Festival)', labelEn: '9. Rakhine Water Festival', category: 'festival' },
  { id: 'kayah_kay_hto_boe', emoji: '🎋', labelMm: '၁၀။ ကယား ကဲထိုးဘိုး စိုက်ထူပွဲတော် (Kayah Kay Htoe Boe Festival)', labelEn: '10. Kayah Kay Htoe Boe Festival', category: 'festival' },
  { id: 'paoh_national_day', emoji: '🥁', labelMm: '၁၁။ ပအိုဝ်း အမျိုးသားနေ့ ပွဲတော် (Pa-O National Day Festival)', labelEn: '11. Pa-O National Day Festival', category: 'festival' },
  { id: 'pagan_ananda_festival', emoji: '🛕', labelMm: '၁၂။ ပုဂံ အာနန္ဒာ ဘုရားပွဲတော် (Bagan Ananda Pagoda Festival)', labelEn: '12. Bagan Ananda Pagoda Festival', category: 'festival' },
  { id: 'shwedagon_pagoda_festival', emoji: '🪔', labelMm: '၁၃။ ရွှေတိဂုံ စေတီတော် ဗုဒ္ဓပူဇနိယ ပွဲတော် (Shwedagon Pagoda Festival)', labelEn: '13. Shwedagon Pagoda Festival', category: 'festival' },
  { id: 'inle_phaungdaw_oo', emoji: '🛶', labelMm: '၁၄။ အင်းလေး ဖောင်တော်ဦး ဘုရားပွဲတော် (Inle Phaung Daw Oo Pagoda Festival)', labelEn: '14. Inle Phaung Daw Oo Festival', category: 'festival' },
  { id: 'taungbyone', emoji: '🎭', labelMm: '၁၅။ တောင်ပြုန်း နတ်ပွဲတော် (Taungbyone Traditional Festival)', labelEn: '15. Taungbyone Festival', category: 'festival' },
  { id: 'htamane_festival', emoji: '🍲', labelMm: '၁၆။ တပို့တွဲ ထမနဲ ထိုးပွဲတော် (Tabodwe Htamane Festival)', labelEn: '16. Tabodwe Htamane Festival', category: 'festival' },
  { id: 'kason_watering', emoji: '🌳', labelMm: '၁၇။ ကဆုန်လပြည့် ညောင်ရေသွန်းပွဲတော် (Kason Banyan Tree Watering Festival)', labelEn: '17. Kason Banyan Tree Watering Festival', category: 'festival' },
  { id: 'waso_flower', emoji: '🪷', labelMm: '၁၈။ ဝါဆိုလပြည့် ပန်းကပ်ပွဲတော် (Waso Flower Offering Festival)', labelEn: '18. Waso Flower Offering Festival', category: 'festival' },
  { id: 'shinbyu_ceremony', emoji: '☂️', labelMm: '၁၉။ ရှင်ပြု ရဟန်းခံ ပွဲတော် (Shinbyu Novitiation Ceremony)', labelEn: '19. Shinbyu Novitiation Ceremony', category: 'celebration' },
  { id: 'wedding', emoji: '💍', labelMm: '၂၀။ မင်္ဂလာဆောင် / စေ့စပ်ပွဲ (Wedding & Engagement Ceremony)', labelEn: '20. Wedding & Engagement', category: 'celebration' },
  { id: 'birthday', emoji: '🎂', labelMm: '၂၁။ မွေးနေ့ ပွဲတော် (Birthday Celebration Party)', labelEn: '21. Birthday Party', category: 'celebration' },
  { id: 'graduation_ceremony', emoji: '🎓', labelMm: '၂၂။ ဘွဲ့နှင်းသဘင်နှင့် အောင်ပွဲ (Graduation & Achievement Ceremony)', labelEn: '22. Graduation & Achievement', category: 'celebration' },
  { id: 'maternity', emoji: '🤰', labelMm: '၂၃။ ကိုယ်ဝန်ဆောင် / သားဦး အမှတ်တရ (Maternity & Baby Shower)', labelEn: '23. Maternity & Baby Shower', category: 'celebration' },
  { id: 'fashion_editorial', emoji: '💃', labelMm: '၂၄။ ဖက်ရှင် မဂ္ဂဇင်း ရိုက်ကူးရေး (Fashion Editorial Photoshoot)', labelEn: '24. Fashion Editorial', category: 'fashion' },
  { id: 'corporate', emoji: '👔', labelMm: '၂၅။ စီးပွားရေး / ရုံးသုံး ပုံတူ (Corporate Professional Portrait)', labelEn: '25. Corporate Portrait', category: 'celebration' },
  { id: 'beach_vacation', emoji: '🏖️', labelMm: '၂၆။ ကမ်းခြေ အပန်းဖြေ ခရီးစဉ် (Beach Vacation Getaway)', labelEn: '26. Beach Vacation', category: 'lifestyle' },
  { id: 'night_party', emoji: '🥂', labelMm: '၂၇။ ညပါတီ / VIP ဂါလာ (Night Party & Gala Night)', labelEn: '27. Night Party & Gala', category: 'lifestyle' },
  { id: 'music_concert', emoji: '🎸', labelMm: '၂၈။ ဂီတ ဖျော်ဖြေပွဲ / ကွန်ဆတ် (Music Concert & Festival)', labelEn: '28. Music Concert & Festival', category: 'lifestyle' },
  { id: 'halloween_party', emoji: '🎃', labelMm: '၂၉။ ဟယ်လိုဝင်းနှင့် ဝတ်စုံဆန်းပွဲတော် (Halloween & Costume Party)', labelEn: '29. Halloween & Costume Party', category: 'lifestyle' },
  { id: 'christmas_newyear', emoji: '🎄', labelMm: '၃၀။ ခရစ္စမတ်နှင့် နှစ်သစ်ကူး ညပွဲတော် (Christmas & New Year Eve)', labelEn: '30. Christmas & New Year Eve', category: 'lifestyle' },
  { id: 'other', emoji: '✏️', labelMm: '၃၁။ အခြား ကိုယ်ပိုင် ပွဲတော် (Other Custom Event)', labelEn: '31. Custom Special Event', category: 'lifestyle' },
];

export const LOCATION_OPTIONS: LocationOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 မရွေးပါ (မူလ တည်နေရာ)', labelEn: '🚫 Skip / Default Location', environmentType: 'studio', category: 'indoor_studio' },
  
  // မြန်မာ့ ထင်ရှားသော နေရာများ (Myanmar Iconic Locations - 1 to 15)
  { id: 'shwedagon_pagoda', emoji: '🛕', labelMm: '၁။ ရွှေတိဂုံ စေတီတော် ရင်ပြင်တော် (Shwedagon Pagoda Platform)', labelEn: '1. Shwedagon Pagoda Platform', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'bagan_temples', emoji: '🌅', labelMm: '၂။ ပုဂံ ရှေးဟောင်း စေတီပုထိုးများနှင့် နေဝင်ချိန် (Bagan Ancient Temples & Sunset)', labelEn: '2. Bagan Ancient Temples & Sunset', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'inle_lake', emoji: '🛶', labelMm: '၃။ အင်းလေးကန် ရေပြင်နှင့် ဖောင်တော်ဦး ဘုရား (Inle Lake Scenic Waters & Phaung Daw Oo)', labelEn: '3. Inle Lake & Phaung Daw Oo', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'mandalay_moat', emoji: '🏰', labelMm: '၄။ မန္တလေး ကျုံးနှင့် နန်းမြို့ရိုး (Mandalay Palace Moat & Wall)', labelEn: '4. Mandalay Palace Moat & Wall', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'konbaung_palace_interior', emoji: '🏛️', labelMm: '၅။ ကုန်းဘောင် / ရတနာပုံ နန်းတွင်း ရွှေနန်းတော် အတွင်း (Royal Konbaung Golden Palace)', labelEn: '5. Royal Konbaung Golden Palace Interior', environmentType: 'indoor', category: 'myanmar' },
  { id: 'sagaing_hill', emoji: '⛰️', labelMm: '၆။ စစ်ကိုင်းတောင်ရိုး စေတီများ ရှုခင်း (Sagaing Hill View)', labelEn: '6. Sagaing Hill View', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'kalaw_pindaya', emoji: '🌲', labelMm: '၇။ ကလော ထင်းရှူးတောနှင့် ပင်းတယ လိုဏ်ဂူ ရှုခင်း (Kalaw Pine Forest & Pindaya)', labelEn: '7. Kalaw Pine Forest & Pindaya', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'pyinoolwin_garden', emoji: '🌺', labelMm: '၈။ ပြင်ဦးလွင် အမျိုးသား ကန်တော်ကြီး ပန်းခြံ (Pyin Oo Lwin National Garden)', labelEn: '8. Pyin Oo Lwin National Garden', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'ngapali_beach', emoji: '🏖️', labelMm: '၉။ ငပလီ / ချောင်းသာ / ငွေဆောင် ကမ်းခြေ (Ngapali & White Sand Beach)', labelEn: '9. Ngapali & White Sand Beach', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'myeik_islands', emoji: '🌊', labelMm: '၁၀။ မြိတ် ကျွန်းစုများ၏ အပြာရောင် ပင်လယ် (Myeik Archipelago Turquoise Sea)', labelEn: '10. Myeik Archipelago Turquoise Sea', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'taunggyi_balloon_field', emoji: '🎈', labelMm: '၁၁။ တောင်ကြီး မီးပုံးပျံပွဲတော် ကွင်း (Taunggyi Balloon Field)', labelEn: '11. Taunggyi Balloon Field', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'chin_mountains', emoji: '🏔️', labelMm: '၁၂။ ချင်းတောင်တန်း၊ ဝိတိုရိယတောင်နှင့် မြူခိုး (Chin Hills, Mount Victoria & Mist)', labelEn: '12. Chin Mountains & Mist', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'kyaiktiyo_golden_rock', emoji: '🪨', labelMm: '၁၃။ ကျိုက်ထီးရိုး ဆံတော်ရှင် စေတီတော် (Kyaiktiyo Golden Rock Pagoda)', labelEn: '13. Kyaiktiyo Golden Rock Pagoda', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'riverside_sunset', emoji: '🌅', labelMm: '၁၄။ ရန်ကုန်မြစ်ကမ်း / ဧရာဝတီ မြစ်ကမ်း သင်္ဘောဆိပ် (Riverside Jetty & Sunset)', labelEn: '14. Riverside Jetty & Sunset', environmentType: 'outdoor', category: 'myanmar' },
  { id: 'monastery_temple_hall', emoji: '🏛️', labelMm: '၁၅။ ရိုးရာ ကျောင်းတိုက် / ဓမ္မာရုံ / ပြာသာဒ် (Monastery Dhamma Hall & Royal Pavilion)', labelEn: '15. Monastery Dhamma Hall', environmentType: 'indoor', category: 'myanmar' },

  // ကမ္ဘာ့ ထိပ်တန်း ဓာတ်ပုံ စာရင်းဝင် နေရာများ (World-Class Iconic Photo Locations - 16 to 25)
  { id: 'paris_eiffel_tower', emoji: '🗼', labelMm: '၁၆။ ပြင်သစ် ပါရီ အီဖယ်တာဝါနှင့် စိန်းမြစ်ကမ်း (Paris Eiffel Tower & Seine River)', labelEn: '16. Paris Eiffel Tower & Seine River', environmentType: 'outdoor', category: 'world' },
  { id: 'santorini_greece', emoji: '🏛️', labelMm: '၁၇။ ဂရိ ဆန်တိုရီနီ အဖြူရောင် ပင်လယ်ကမ်းပါး မြို့ကလေး (Santorini White Village & Blue Domes)', labelEn: '17. Santorini White Village & Blue Domes', environmentType: 'outdoor', category: 'world' },
  { id: 'kyoto_bamboo_torii', emoji: '🎋', labelMm: '၁၈။ ဂျပန် ကျိုတို အာရာရှိယာမ ဝါးတောနှင့် တိုရီးတံခါးအနီ (Kyoto Bamboo Grove & Fushimi Inari)', labelEn: '18. Kyoto Bamboo Grove & Fushimi Inari', environmentType: 'outdoor', category: 'world' },
  { id: 'swiss_alps_snow', emoji: '🏔️', labelMm: '၁၉။ ဆွစ်ဇာလန် အဲလ်ပ်စ် နှင်းတောင်နှင့် သဘာဝ ရေကန် (Swiss Alps Snowy Peaks & Alpine Lake)', labelEn: '19. Swiss Alps Snowy Peaks & Alpine Lake', environmentType: 'outdoor', category: 'world' },
  { id: 'venice_gondola_canal', emoji: '🛶', labelMm: '၂၀။ အီတလီ ဗင်းနစ် ဂွန်ဒိုလာ လှေနှင့် မြို့ပြ ရေမြောင်း (Venice Grand Canal & Gondola)', labelEn: '20. Venice Grand Canal & Gondola', environmentType: 'outdoor', category: 'world' },
  { id: 'taj_mahal_palace', emoji: '🕌', labelMm: '၂၁။ အိန္ဒိယ တာဂျ်မဟာရ် စကျင်ကျောက် နန်းတော် (Taj Mahal Monumental Grounds)', labelEn: '21. Taj Mahal Monumental Grounds', environmentType: 'outdoor', category: 'world' },
  { id: 'bali_jungle_swing', emoji: '🌴', labelMm: '၂၂။ အင်ဒိုနီးရှား ဘာလီ လယ်ကွင်းနှင့် သပိတ်တော (Bali Rice Terraces & Jungle Swing)', labelEn: '22. Bali Rice Terraces & Jungle Swing', environmentType: 'outdoor', category: 'world' },
  { id: 'maldives_overwater', emoji: '🏝️', labelMm: '၂၃။ မော်လဒိုက် ရေပေါ် ဘန်ဂလိုနှင့် အပြာရောင် လဂွန် (Maldives Overwater Bungalow & Lagoon)', labelEn: '23. Maldives Overwater Bungalow & Lagoon', environmentType: 'outdoor', category: 'world' },
  { id: 'cappadocia_balloons', emoji: '🎈', labelMm: '၂၄။ တူရကီ ကက်ပါဒိုစီယာ မီးပုံးပျံနှင့် ကျောက်တောင် ရှုခင်း (Cappadocia Balloons & Cave View)', labelEn: '24. Cappadocia Balloons & Cave View', environmentType: 'outdoor', category: 'world' },
  { id: 'ny_central_park', emoji: '🗽', labelMm: '၂၅။ အမေရိကန် နယူးယောက် စင်ထရယ်ပါ့ခ်နှင့် မြို့ပြရှုခင်း (New York Central Park & Skyline)', labelEn: '25. New York Central Park & Skyline', environmentType: 'outdoor', category: 'world' },

  // စတူဒီယိုနှင့် အခန်းတွင်း အခင်းအကျင်းများ (Indoor & Studio - 26 to 30)
  { id: 'plain_studio', emoji: '📸', labelMm: '၂၆။ စတူဒီယို သန့်သန့် မိုနိုခရုန်း နောက်ခံ (Minimalist Studio Backdrop)', labelEn: '26. Minimalist Plain Studio Backdrop', environmentType: 'studio', category: 'indoor_studio' },
  { id: 'wood_brick_studio', emoji: '🧱', labelMm: '၂၇။ စတူဒီယို သစ်သား / အုတ်နံရံ ခေတ်မီစတိုင်လ် (Modern Brick & Wooden Studio)', labelEn: '27. Modern Brick & Wooden Studio', environmentType: 'studio', category: 'indoor_studio' },
  { id: 'luxury_hotel_ballroom', emoji: '🏨', labelMm: '၂၈။ ဟိုတယ် လော်ဘီနှင့် ခမ်းနားသော ပွဲမ အခန်းမ (Luxury Hotel Grand Ballroom & Lobby)', labelEn: '28. Luxury Hotel Ballroom & Lobby', environmentType: 'indoor', category: 'indoor_studio' },
  { id: 'cafe_interior', emoji: '☕', labelMm: '၂၉။ ခေတ်မီ မီးရောင်စုံ ကော်ဖီဆိုင် အတွင်း (Aesthetic Modern Cafe Interior)', labelEn: '29. Aesthetic Modern Cafe Interior', environmentType: 'indoor', category: 'indoor_studio' },
  { id: 'traditional_myanmar_house', emoji: '🏠', labelMm: '၃၀။ ရိုးရာ မြန်မာ့ သစ်သားအိမ်နှင့် ပန်းခြံ (Traditional Myanmar Teak House)', labelEn: '30. Traditional Myanmar Teak House', environmentType: 'indoor', category: 'indoor_studio' },

  // သဘာဝနှင့် မြို့ပြ အခင်းအကျင်းများ (Nature & Lifestyle - 31 to 35)
  { id: 'golden_hour_paddy_field', emoji: '🌾', labelMm: '၃၁။ နေဝင်ချိန် ရွှေရောင် လယ်ကွင်းများ (Golden Hour Paddy Field)', labelEn: '31. Golden Hour Paddy Field', environmentType: 'outdoor', category: 'nature_lifestyle' },
  { id: 'lush_forest_stream', emoji: '🌲', labelMm: '၃၂။ စိမ်းစိုသော သစ်တော၊ ရေတံခွန်နှင့် စမ်းချောင်း (Lush Forest, Waterfall & Stream)', labelEn: '32. Lush Forest, Waterfall & Stream', environmentType: 'outdoor', category: 'nature_lifestyle' },
  { id: 'cherry_blossom_garden', emoji: '🌸', labelMm: '၃၃။ ပန်းချယ်ရီခင်းနှင့် သဘာဝပန်းခြံ (Cherry Blossom Flower Garden)', labelEn: '33. Cherry Blossom Flower Garden', environmentType: 'outdoor', category: 'nature_lifestyle' },
  { id: 'modern_city_street', emoji: '🏙️', labelMm: '၃၄။ မြို့ပြ လမ်းမနှင့် ခေတ်မီ ဒေါင်လိုက် အဆောက်အဦများ (Modern City Street & Skyscrapers)', labelEn: '34. Modern City Street & Skyscrapers', environmentType: 'outdoor', category: 'nature_lifestyle' },
  { id: 'neon_city_night', emoji: '🌃', labelMm: '၃၅။ နီယွန်မီးရောင်စုံ ညမြို့ပြ (Neon City Nightscape & Cyberpunk)', labelEn: '35. Neon City Nightscape', environmentType: 'fantasy', category: 'nature_lifestyle' },
  
  { id: 'other_location', emoji: '✏️', labelMm: '၃၆။ အခြား ကိုယ်ပိုင် တည်နေရာ (Custom Location)', labelEn: '36. Custom Location', environmentType: 'outdoor', category: 'nature_lifestyle' },
];

export const TIME_OF_DAY_OPTIONS: TimeOfDayOption[] = [
  { id: 'select_time', emoji: '⏱️', labelMm: '-- ရွေးပါ --', labelEn: '-- Select --', promptText: '' },
  { id: 'early_morning', emoji: '🌅', labelMm: 'နံနက်စောစော (Early Morning)', labelEn: 'Early Morning', promptText: 'early morning golden dawn sunlight with soft mist and gentle dew drops' },
  { id: 'high_noon', emoji: '☀️', labelMm: 'မွန်းတည့်ချိန် (High Noon)', labelEn: 'High Noon', promptText: 'bright mid-day high noon overhead sunlight with clear sky illumination' },
  { id: 'golden_hour', emoji: '🌇', labelMm: 'နေဝင်ချိန် (Golden Hour / Sunset)', labelEn: 'Golden Hour / Sunset', promptText: 'warm golden hour sunset lighting with rich amber glow and long dramatic shadows' },
  { id: 'twilight', emoji: '🌆', labelMm: 'ညနေခင်း (Twilight)', labelEn: 'Twilight', promptText: 'peaceful twilight blue hour mood with soft gradient sky glow' },
  { id: 'night', emoji: '🌙', labelMm: 'ည (Night)', labelEn: 'Night', promptText: 'dramatic night atmosphere with dark ambient contrast and deep subtle highlights' },
];

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'select_mood', emoji: '🎭', labelMm: '-- ရွေးပါ --', labelEn: '-- Select --', promptText: '' },
  { id: 'calm_serene', emoji: '🕊️', labelMm: '၁။ အေးဆေးငြိမ်းချမ်းသော ခံစားချက် (Calm & Serene)', labelEn: '1. Calm & Serene', promptText: 'calm and peaceful serene emotional atmosphere, gentle composure, soft harmonious expressions' },
  { id: 'joyful_cheerful', emoji: '😄', labelMm: '၂။ ပျော်ရွှင်တက်ကြွသော ခံစားချက် (Joyful & Cheerful)', labelEn: '2. Joyful & Cheerful', promptText: 'joyful vibrant happy energy, glowing smile, uplifting playful demeanor' },
  { id: 'romantic_tender', emoji: '💖', labelMm: '၃။ ရင်ခုန်ကြည်နူးဖွယ် ခံစားချက် (Romantic & Tender)', labelEn: '3. Romantic & Tender', promptText: 'romantic intimate atmosphere with soft dreamlike warmth and soulful tender gazes' },
  { id: 'powerful_confident', emoji: '👑', labelMm: '၄။ စွမ်းအားပြည့် ယုံကြည်မှုရှိသော ခံစားချက် (Powerful & Confident)', labelEn: '4. Powerful & Confident', promptText: 'powerful confident posture, regal aura, strong charismatic presence and firm gaze' },
  { id: 'dreamy_ethereal', emoji: '🌌', labelMm: '၅။ စိတ်ကူးယဉ် နက်နဲသော ခံစားချက် (Dreamy & Ethereal)', labelEn: '5. Dreamy & Ethereal', promptText: 'dreamy poetic cinematic feeling with mystical ethereal atmosphere and rich emotional depth' },
  { id: 'dark_moody', emoji: '🌑', labelMm: '၆။ မှောင်မိုက်ဆန်းကြယ်သော ခံစားချက် (Dark & Moody Intrigue)', labelEn: '6. Dark & Moody Intrigue', promptText: 'dark and moody intense emotional atmosphere with deep chiaroscuro shadows and intriguing aura' },
  { id: 'elegant_graceful', emoji: '✨', labelMm: '၇။ ယဉ်ကျေးသိမ်မွေ့သော ခံစားချက် (Elegant & Graceful)', labelEn: '7. Elegant & Graceful', promptText: 'elegant poised demeanor, noble grace, refined posture and sophisticated charm' },
  { id: 'melancholic_thoughtful', emoji: '🍂', labelMm: '၈။ ငေးမောတွေးတောနေသော ခံစားချက် (Melancholic & Thoughtful)', labelEn: '8. Melancholic & Thoughtful', promptText: 'pensive thoughtful melancholic mood, deep introspective gaze with poetic emotional tone' },
  { id: 'playful_mischievous', emoji: '😜', labelMm: '၉။ စနောက်ချစ်စရာ ခံစားချက် (Playful & Mischievous)', labelEn: '9. Playful & Mischievous', promptText: 'playful cheeky mischievous expression, lively energetic spirit and animated smile' },
  { id: 'mysterious_enigmatic', emoji: '🔮', labelMm: '၁၀။ ဆန်းကြယ်လျှို့ဝှက်သော ခံစားချက် (Mysterious & Enigmatic)', labelEn: '10. Mysterious & Enigmatic', promptText: 'mysterious enigmatic look, intriguing subtle half-smile and captivating focused eyes' },
  { id: 'warm_welcoming', emoji: '🤗', labelMm: '၁၁။ နွေးထွေးဖော်ရွေသော ခံစားချက် (Warm & Welcoming)', labelEn: '11. Warm & Welcoming', promptText: 'warm friendly welcoming aura, gentle accessible posture, kind empathetic eyes' },
  { id: 'nostalgic_vintage', emoji: '📜', labelMm: '၁၂။ အတိတ်ကို လွမ်းမောဖွယ် ခံစားချက် (Nostalgic & Vintage Vibe)', labelEn: '12. Nostalgic & Vintage Vibe', promptText: 'nostalgic reflective vintage atmosphere, timeless sentimental emotion and warm classic vibe' },
  { id: 'passionate_intense', emoji: '🔥', labelMm: '၁၃။ ပြင်းပြသော ခံစားချက် (Passionate & Intense)', labelEn: '13. Passionate & Intense', promptText: 'intense passionate emotional expression, fiery focused gaze and strong dramatic tension' },
  { id: 'cool_rebellious', emoji: '😎', labelMm: '၁၄။ စတိုင်ကျ ခန့်ညားသော ခံစားချက် (Cool & Rebellious)', labelEn: '14. Cool & Rebellious', promptText: 'cool effortlessly stylish rebellious attitude, relaxed stoic confidence and edgy presence' },
  { id: 'peaceful_zen', emoji: '🧘', labelMm: '၁၅။ တည်ငြိမ်အေးချမ်းသော ဇင် ခံစားချက် (Peaceful Zen Mindfulness)', labelEn: '15. Peaceful Zen Mindfulness', promptText: 'peaceful mindful zen composure, perfectly balanced inner tranquility and gentle relaxation' },
];

export const LIGHTING_OPTIONS: LightingOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 မရွေးပါ (မူလ အလင်း)', labelEn: '🚫 Skip / Default Light' },
  { id: 'golden_hour', emoji: '🌇', labelMm: '၁။ နေဝင်ချိန် ရွှေရောင်အလင်း (Golden Hour / Sunset Glow)', labelEn: '1. Golden Hour / Sunset Glow' },
  { id: 'early_morning', emoji: '🌅', labelMm: '၂။ နံနက်စောစော သဘာဝအလင်း (Early Morning Soft Dawn)', labelEn: '2. Early Morning Soft Dawn' },
  { id: 'high_noon', emoji: '☀️', labelMm: '၃။ မွန်းတည့်ချိန် တောက်ပသောအလင်း (High Noon Bright Sunlight)', labelEn: '3. High Noon Bright Sunlight' },
  { id: 'twilight', emoji: '🌆', labelMm: '၄။ ဆည်းဆာ/ညနေခင်း အလင်း (Twilight / Blue Hour Glow)', labelEn: '4. Twilight / Blue Hour Glow' },
  { id: 'night', emoji: '🌙', labelMm: '၅။ ညမီးရောင် အလင်း (Night Mood & Ambient Lighting)', labelEn: '5. Night Mood & Ambient Lighting' },
  { id: 'studio_softbox', emoji: '💡', labelMm: '၆။ စတူဒီယို ဆော့ဖ်ဘောက်စ် အလင်း (Studio Softbox & Key Lighting)', labelEn: '6. Studio Softbox & Key Lighting' },
  { id: 'cinematic_dramatic', emoji: '🎬', labelMm: '၇။ ဒရာမာဆန်သော ရုပ်ရှင်အလင်း (Dramatic Cinematic Chiaroscuro)', labelEn: '7. Dramatic Cinematic Chiaroscuro' },
  { id: 'neon_cyberpunk', emoji: '🌃', labelMm: '၈။ နီယွန် ရောင်စုံ အလင်း (Neon Glow & Cyberpunk Color)', labelEn: '8. Neon Glow & Cyberpunk Color' },
  { id: 'warm_candlelight', emoji: '🕯️', labelMm: '၉။ ဖယောင်းတိုင်/နွေးထွေးသောအလင်း (Warm Candlelight & Flame Glow)', labelEn: '9. Warm Candlelight & Flame Glow' },
  { id: 'soft_overcast', emoji: '☁️', labelMm: '၁၀။ တိမ်အုပ် သဘာဝအလင်း (Overcast Soft Natural Lighting)', labelEn: '10. Overcast Soft Natural Lighting' },
  { id: 'studio_rim_light', emoji: '✨', labelMm: '၁၁။ ဘက်လိုက် / အနားကွပ် အလင်း (Studio Rim Light & Backlight)', labelEn: '11. Studio Rim Light & Backlight' },
  { id: 'window_sunlight', emoji: '🪟', labelMm: '၁၂။ ပြတင်းပေါက် သဘာဝ နေရောင် (Window Natural Sunlight & Shadow)', labelEn: '12. Window Natural Sunlight & Shadow' },
  { id: 'monochrome_dramatic_light', emoji: '🖤', labelMm: '၁၃။ အနက်ဖြူ ဒရာမာ အလင်း (Monochrome High Contrast Light)', labelEn: '13. Monochrome High Contrast Light' },
  { id: 'fireplace_warm_glow', emoji: '🔥', labelMm: '၁၄။ မီးဖို နွေးထွေးသော မီးရောင် (Fireplace Warm Ambient Glow)', labelEn: '14. Fireplace Warm Ambient Glow' },
  { id: 'stage_spotlight', emoji: '🔦', labelMm: '၁၅။ စတေချ် စပေါ့လိုက် မီးရောင် (Stage Spotlight & Performance Light)', labelEn: '15. Stage Spotlight & Performance Light' },
  { id: 'bioluminescent_glow', emoji: '🌌', labelMm: '၁၆။ ဇီဝအလင်း / ဂြိုဟ်လွန် ရောင်စဉ်အလင်း (Bioluminescent Aura)', labelEn: '16. Bioluminescent Aura Glow' },
  { id: 'prism_rainbow_flare', emoji: '🌈', labelMm: '၁၇။ ပရစ်ဇမ် သက်တံ ရောင်ပြန်အလင်း (Prism Rainbow Light Flare)', labelEn: '17. Prism Rainbow Light Flare' },
  { id: 'underwater_dappled_sun', emoji: '🌊', labelMm: '၁၈။ ရေအောက် နေရောင်ပြန် အလင်း (Underwater Dappled Sunlight)', labelEn: '18. Underwater Dappled Sunlight' },
  { id: 'autumn_golden_bokeh', emoji: '🍂', labelMm: '၁၉။ သစ်ရွက်ကြွေ ရွှေရောင်အလင်း (Autumn Golden Bokeh Sunlight)', labelEn: '19. Autumn Golden Bokeh Sunlight' },
  { id: 'foggy_ethereal_mist', emoji: '🌫️', labelMm: '၂၀။ မြူခိုးဆိုင်း အိပ်မက်ဆန်အလင်း (Foggy Ethereal Mist Light)', labelEn: '20. Foggy Ethereal Mist Light' },
  { id: 'fairy_tale_starlight', emoji: '⭐', labelMm: '၂၁။ နတ်ဒေဝါ ကြယ်ရောင်အလင်း (Fairy Tale Glitter & Starlight)', labelEn: '21. Fairy Tale Glitter & Starlight' },
  { id: 'beauty_dish_fashion', emoji: '💄', labelMm: '၂၂။ မော်ဒယ် စတူဒီယို ဘယူတီအလင်း (High Fashion Beauty Dish)', labelEn: '22. High Fashion Beauty Dish' },
  { id: 'retro_film_grain_light', emoji: '🎞️', labelMm: '၂၃။ ရက်ထရို ဖလင် ကင်မရာအလင်း (Retro Film Grain Sunlight)', labelEn: '23. Retro Film Grain Sunlight' },
  { id: 'moonlight_starlight', emoji: '🌕', labelMm: '၂၄။ လရောင်နှင့် ကြယ်ရောင် အလင်း (Full Moonlight & Starlight)', labelEn: '24. Full Moonlight & Starlight' },
  { id: 'sunset_horizon_orange', emoji: '🌄', labelMm: '၂၅။ တောင်တန်း နေဝင်ချိန် အလင်း (Sunset Horizon Orange Glow)', labelEn: '25. Sunset Horizon Orange Glow' },
  { id: 'volumetric_god_rays', emoji: '🌤️', labelMm: '၂၆။ တိမ်ကြားမှ ထိုးထွက်သော နေရောင် (Volumetric God Rays Sunlight)', labelEn: '26. Volumetric God Rays Sunlight' },
  { id: 'disco_laser_party', emoji: '🪩', labelMm: '၂၇။ ဒစ္စကို ပါတီ လေဆာ မီးရောင် (Disco Party Laser Lighting)', labelEn: '27. Disco Party Laser Lighting' },
  { id: 'soft_pastel_glow', emoji: '🌸', labelMm: '၂၈။ ပန်းရောင် နူးညံ့သောအလင်း (Soft Pastel Ethereal Glow)', labelEn: '28. Soft Pastel Ethereal Glow' },
  { id: 'vintage_sepia_sun', emoji: '📜', labelMm: '၂၉။ ရှေးဟောင်း စက်ပီယာ ရွှေရောင်အလင်း (Vintage Warm Sepia Sun)', labelEn: '29. Vintage Warm Sepia Sun' },
  { id: 'venetian_blinds_shadow', emoji: '🏙️', labelMm: '၃၀။ ပြတင်းပေါက် သစ်ရွက်/လိုက်ကာ ရိပ်ရိပ်မီးရောင် (Venetian Blinds Shadow)', labelEn: '30. Venetian Blinds Shadow Light' },
];

export const CAMERA_OPTIONS: CameraOption[] = [
  { id: 'skip', emoji: '🚫', label: '-- Skip Lens Profile --', labelMm: '-- Skip Lens Profile --', labelEn: '-- Skip Lens Profile --', lens: 'Default Auto Lens', aperture: 'Auto' },
  { id: 'lens_85mm_portrait', emoji: '📸', label: '85mm f/1.4 Portrait Lens', labelMm: '85mm f/1.4 Portrait Lens', labelEn: '85mm f/1.4 Portrait Lens', lens: '85mm f/1.4 Portrait Lens', aperture: 'f/1.4 Bokeh' },
  { id: 'lens_100mm_macro', emoji: '🔍', label: '100mm f/2.8 Macro Lens', labelMm: '100mm f/2.8 Macro Lens', labelEn: '100mm f/2.8 Macro Lens', lens: '100mm f/2.8 Macro Lens', aperture: 'f/2.8 1:1 Magnification' },
  { id: 'lens_35mm_wide', emoji: '🔴', label: '35mm f/1.4 Wide Lens', labelMm: '35mm f/1.4 Wide Lens', labelEn: '35mm f/1.4 Wide Lens', lens: '35mm f/1.4 Wide Lens', aperture: 'f/1.4 Micro-contrast' },
  { id: 'lens_50mm_prime', emoji: '📷', label: '50mm f/1.2 Standard Prime Lens', labelMm: '50mm f/1.2 Standard Prime Lens', labelEn: '50mm f/1.2 Standard Prime Lens', lens: '50mm f/1.2 Standard Prime Lens', aperture: 'f/1.2 Eye Focus' },
  { id: 'lens_135mm_telephoto', emoji: '⚡', label: '135mm f/1.8 Telephoto (ရှေ့ ကြည့်နောက်ဝါး)', labelMm: '135mm f/1.8 Telephoto (ရှေ့ ကြည့်နောက်ဝါး)', labelEn: '135mm f/1.8 Telephoto (Background Blur)', lens: '135mm f/1.8 Telephoto', aperture: 'f/1.8 Background Blur' },
  { id: 'lens_200mm_super_telephoto', emoji: '🦅', label: '200mm f/2.0 Super-Telephoto (အဝေးရိုက် ဘိုကေးစတိုင်)', labelMm: '200mm f/2.0 Super-Telephoto (အဝေးရိုက် ဘိုကေးစတိုင်)', labelEn: '200mm f/2.0 Super-Telephoto (Far Bokeh Style)', lens: '200mm f/2.0 Super-Telephoto', aperture: 'f/2.0 Extreme Compression' },
  { id: 'lens_50mm_ultrafast', emoji: '✨', label: '50mm f/0.95 Ultra-Fast Prime (DOF ခပ်ပါးပါး)', labelMm: '50mm f/0.95 Ultra-Fast Prime (DOF ခပ်ပါးပါး)', labelEn: '50mm f/0.95 Ultra-Fast Prime (Thin DOF)', lens: '50mm f/0.95 Ultra-Fast Prime', aperture: 'f/0.95 Shallow DOF' },
  { id: 'lens_24mm_ultrawide', emoji: '🏔️', label: '24mm f/1.4 Ultra-Wide (မြင်ကွင်းကျယ်)', labelMm: '24mm f/1.4 Ultra-Wide (မြင်ကွင်းကျယ်)', labelEn: '24mm f/1.4 Ultra-Wide (Panoramic View)', lens: '24mm f/1.4 Ultra-Wide', aperture: 'f/1.4 Panoramic' },
  { id: 'lens_40mm_anamorphic', emoji: '🎬', label: '40mm f/2.0 Anamorphic Cinema (ရုပ်ရှင်ဆန်သော ရောင်စဉ်တန်းပါ)', labelMm: '40mm f/2.0 Anamorphic Cinema (ရုပ်ရှင်ဆန်သော ရောင်စဉ်တန်းပါ)', labelEn: '40mm f/2.0 Anamorphic Cinema (Cinematic Flare)', lens: '40mm f/2.0 Anamorphic Cinema', aperture: 'f/2.0 Oval Lens Flare' },
  { id: 'lens_70_200mm_zoom', emoji: '📰', label: '70-200mm f/2.8 Telephoto Zoom (သတင်း / ပွဲတက် / အမှတ်တရပွဲ)', labelMm: '70-200mm f/2.8 Telephoto Zoom (သတင်း / ပွဲတက် / အမှတ်တရပွဲ)', labelEn: '70-200mm f/2.8 Telephoto Zoom (Journalism/Event)', lens: '70-200mm f/2.8 Telephoto Zoom', aperture: 'f/2.8 Pro Zoom' },
  { id: 'lens_tilt_shift_45mm', emoji: '📐', label: 'Tilt-Shift 45mm f/2.8 (Focus ကွက်ပြီးဖြတ်)', labelMm: 'Tilt-Shift 45mm f/2.8 (Focus ကွက်ပြီးဖြတ်)', labelEn: 'Tilt-Shift 45mm f/2.8 (Selective Focus Plane)', lens: 'Tilt-Shift 45mm f/2.8', aperture: 'f/2.8 Selective Plane' },
  { id: 'lens_vintage_helios_85mm', emoji: '🎞️', label: 'Vintage Helios 85mm f/1.5 (ရှေးခေတ် ဘိုကေးစတိုင်)', labelMm: 'Vintage Helios 85mm f/1.5 (ရှေးခေတ် ဘိုကေးစတိုင်)', labelEn: 'Vintage Helios 85mm f/1.5 (Vintage Swirly Bokeh)', lens: 'Vintage Helios 85mm f/1.5', aperture: 'f/1.5 Swirly Bokeh' },
  { id: 'lens_soft_focus_90mm', emoji: '☁️', label: 'Soft Focus 90mm Portrait (အိပ်မက်ဆန်ဆန်)', labelMm: 'Soft Focus 90mm Portrait (အိပ်မက်ဆန်ဆန်)', labelEn: 'Soft Focus 90mm Portrait (Dreamy Soft Glow)', lens: 'Soft Focus 90mm Portrait', aperture: 'f/2.8 Soft Ethereal Glow' },
  { id: 'hasselblad_medium_format', emoji: '🖼️', label: 'Hasselblad 100MP Medium Format', labelMm: 'Hasselblad 100MP စတူဒီယို ကင်မရာ', labelEn: 'Hasselblad 100MP Medium Format', lens: '100mm f/2.2 Medium Format', aperture: 'f/2.2 Ultra Depth' },
  { id: 'leica_m11_street', emoji: '🔴', label: 'Leica M11 Rangefinder', labelMm: 'Leica M11 လိုင်ကာ ကင်မရာ ရိုက်ချက်', labelEn: 'Leica M11 Rangefinder', lens: '35mm Summilux f/1.4', aperture: 'f/1.4 Micro-contrast' },
  { id: 'canon_eos_r3_portrait', emoji: '📷', label: 'Canon EOS R3 Pro Portrait', labelMm: 'Canon EOS R3 ပရော်ဖက်ရှင်နယ် ပုံတူ', labelEn: 'Canon EOS R3 Pro Portrait', lens: '85mm f/1.2 L USM', aperture: 'f/1.2 Creamy Bokeh' },
  { id: 'sony_a7rv_highres', emoji: '⚡', label: 'Sony A7R V 61MP Ultra Sharp', labelMm: 'Sony A7R V 61MP ကြည်လင်ပြတ်သားချက်', labelEn: 'Sony A7R V 61MP Ultra Sharp', lens: '135mm f/1.8 G Master', aperture: 'f/1.8 Razor Sharp' },
  { id: 'fujifilm_gfx100', emoji: '🎞️', label: 'Fujifilm GFX 100 II Film', labelMm: 'Fujifilm GFX 100 II ဖလင် ရုပ်ထွက်', labelEn: 'Fujifilm GFX 100 II Film', lens: '110mm f/2.0 GF Prime', aperture: 'f/2.0 Film Simulation' },
  { id: 'nikon_z9_editorial', emoji: '📸', label: 'Nikon Z9 Fashion Editorial', labelMm: 'Nikon Z9 မဂ္ဂဇင်း ဖက်ရှင် ရိုက်ကူးရေး', labelEn: 'Nikon Z9 Fashion Editorial', lens: '105mm f/1.4E ED', aperture: 'f/1.4 Velvet Bokeh' },
  { id: 'iphone_15pro_portrait', emoji: '📱', label: 'iPhone 15 Pro RAW Portrait', labelMm: 'iPhone 15 Pro Max 48MP RAW', labelEn: 'iPhone 15 Pro RAW Portrait', lens: '24mm / 120mm Telephoto RAW', aperture: 'f/1.7 Smart HDR' },
];

export const CAMERA_ANGLE_OPTIONS: CameraAngleOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 ကျော်သွားပါ (မရွေးပါ / Default)', labelEn: '🚫 Skip / Default Angle', promptText: '' },
  { id: 'eye_level', emoji: '👁️', labelMm: '၁။ မျက်လုံးအနိမ့်အမြင့် ရိုက်ချက် (Eye Level)', labelEn: '1. Eye Level Shot', promptText: 'eye-level camera angle with direct natural perspective' },
  { id: 'low_angle', emoji: '📐', labelMm: '၂။ အောက်မှ အထက်သို့ မော့ရိုက်ချက် (Low Angle / Hero Shot)', labelEn: '2. Low Angle / Hero Shot', promptText: 'low angle camera shot looking up, creating a dramatic dynamic scale' },
  { id: 'high_angle', emoji: '🕊️', labelMm: '၃။ အထက်မှ အောက်သို့ ငုံ့ရိုက်ချက် (High Angle View)', labelEn: '3. High Angle View', promptText: 'high angle top-down view looking down with expressive composition' },
  { id: 'close_up', emoji: '🔍', labelMm: '၄။ မျက်နှာ အနီးကပ် ရိုက်ချက် (Close-up Portrait)', labelEn: '4. Close-up Portrait', promptText: 'intimate close-up portrait framing focusing on facial details and expressions' },
  { id: 'extreme_close_up', emoji: '👁️‍🗨️', labelMm: '၅။ အလွန်အနီးကပ် ရိုက်ချက် (Extreme Close-up Detail)', labelEn: '5. Extreme Close-up Detail', promptText: 'extreme close-up macro framing highlighting eye, lips, or jewelry details' },
  { id: 'medium_shot', emoji: '📸', labelMm: '၆။ ခါးအထက် အလတ်စား ရိုက်ချက် (Medium Shot / Waist-up)', labelEn: '6. Medium Shot (Waist-up)', promptText: 'classic waist-up medium photo framing balancing subject and background' },
  { id: 'cowboy_shot', emoji: '🤠', labelMm: '၇။ ပေါင်လည် ရိုက်ချက် (Cowboy Shot / American Shot)', labelEn: '7. Cowboy / American Shot', promptText: 'mid-thigh framing capturing body posture and waist attire details' },
  { id: 'full_body', emoji: '🧍', labelMm: '၈။ တစ်ကိုယ်လုံး ပါဝင်သော ရိုက်ချက် (Full Body Length Shot)', labelEn: '8. Full Body Length Shot', promptText: 'full length body shot capturing complete attire and head-to-toe poise' },
  { id: 'wide_angle_environmental', emoji: '🏞️', labelMm: '၉။ ပတ်ဝန်းကျင်ပါ အကျယ် ရိုက်ချက် (Wide Environmental Shot)', labelEn: '9. Wide Environmental Shot', promptText: 'wide-angle environmental framing showcasing subject within surrounding landscape' },
  { id: 'over_the_shoulder', emoji: '👤', labelMm: '၁၀။ ပခုံးကျော် ရိုက်ချက် (Over-the-shoulder Frame)', labelEn: '10. Over-the-shoulder Frame', promptText: 'cinematic over-the-shoulder camera composition framing the subject' },
  { id: 'dutch_angle', emoji: '🔄', labelMm: '၁၁။ စောင်း၍ ရိုက်သော ရိုက်ချက် (Dutch Angle / Tilted)', labelEn: '11. Dutch Angle / Tilted', promptText: 'tilted dynamic dutch angle camera framing creating tension and cinematic drama' },
  { id: 'birds_eye_view', emoji: '🦅', labelMm: '၁၂။ အပေါ်စီး ဒရုန်း ရိုက်ချက် (Bird\'s Eye / Top-down View)', labelEn: '12. Bird\'s Eye View', promptText: 'direct overhead bird\'s eye view camera composition looking straight down' },
  { id: 'profile_side_view', emoji: '👤', labelMm: '၁၃။ ဘေးတစောင်း ရိုက်ချက် (Side Profile Shot)', labelEn: '13. Side Profile Shot', promptText: 'elegant 90-degree side profile portrait framing silhouette and contour' },
  { id: 'three_quarter_portrait', emoji: '📐', labelMm: '၁၄။ သုံးပုံတစ်ပုံ တစောင်း ရိုက်ချက် (3/4 View Portrait)', labelEn: '14. 3/4 View Portrait', promptText: 'flattering three-quarters view portrait angle highlighting facial structure' },
  { id: 'macro_detail_framing', emoji: '💎', labelMm: '၁၅။ အသေးစိတ် မက်ခရို ရိုက်ချက် (Macro Detail Framing)', labelEn: '15. Macro Detail Framing', promptText: 'ultra fine detail macro framing focusing on texture, eyes, and fabric weave' },
];

export const PHOTO_STYLE_OPTIONS: PhotoStyleOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 ကျော်သွားပါ (မူလ / Default)', labelEn: '🚫 Skip / Default Style', promptText: '' },
  { id: 'photorealistic_studio', emoji: '🖼️', labelMm: '၁။ သဘာဝဆန်သော စတူဒီယို ပေါ်ထရိတ် (Photorealistic Studio)', labelEn: '1. Photorealistic Studio Portrait', promptText: 'photorealistic professional studio portrait photography, ultra-crisp skin detail and clean studio lighting' },
  { id: 'cinematic', emoji: '🎬', labelMm: '၂။ ရုပ်ရှင်ဆန်သော စတိုင် (Cinematic Movie Still)', labelEn: '2. Cinematic Movie Still', promptText: 'cinematic movie still photography, deep depth of field, anamorphic lens atmosphere and dramatic lighting' },
  { id: 'fashion_editorial', emoji: '👗', labelMm: '၃။ ဖက်ရှင် မဂ္ဂဇင်း စတိုင် (Fashion Editorial Vogue Style)', labelEn: '3. Fashion Editorial Vogue Style', promptText: 'high fashion editorial vogue magazine photoshoot, avant-garde framing and haute couture aesthetic' },
  { id: 'documentary_style', emoji: '📰', labelMm: '၄။ သဘာဝအတိုင်း မှတ်တမ်းတင် စတိုင် (Documentary / Candid)', labelEn: '4. Documentary / Candid Journalism', promptText: 'candid documentary journalism photography, raw unposed natural storytelling moment' },
  { id: 'fine_art_portrait', emoji: '🎨', labelMm: '၅။ ပန်းချီဆန်သော အနုပညာ ပေါ်ထရိတ် (Fine Art Painterly)', labelEn: '5. Fine Art Painterly Portrait', promptText: 'fine art painterly portrait photography, Rembrandt tone, artistic lighting and graceful mood' },
  { id: 'film_photography_look', emoji: '🎞️', labelMm: '၆။ 35mm အနုပညာ ဖလင် စတိုင် (35mm Analog Film Look)', labelEn: '6. 35mm Analog Film Look', promptText: 'authentic 35mm film photography look, fine analog grain, soft nostalgic highlight roll-off' },
  { id: 'soft_dreamy', emoji: '☁️', labelMm: '၇။ အိပ်မက်ဆန် နူးညံ့သော စတိုင် (Soft Ethereal Dreamy Mood)', labelEn: '7. Soft Ethereal Dreamy Mood', promptText: 'soft dreamy ethereal mood, gentle bloom highlights, pastel color tones and magical aesthetic' },
  { id: 'monochrome_black_white', emoji: '🖤', labelMm: '၈။ အနက်ဖြူ အနုပညာ စတိုင် (Classic Black & White Fine Art)', labelEn: '8. Classic Black & White Fine Art', promptText: 'monochrome black and white fine art portrait, high micro-contrast, deep shadows and elegant silver tones' },
  { id: 'vintage_retro_70s', emoji: '📜', labelMm: '၉။ 70s / 80s ဗင်းတေ့ချ် စတိုင် (70s/80s Retro Vintage Aesthetic)', labelEn: '9. 70s/80s Retro Vintage Aesthetic', promptText: '70s retro vintage aesthetic, warm faded polaroid tones, subtle light leak and nostalgia' },
  { id: 'high_fashion_glamour', emoji: '💎', labelMm: '၁၀။ ဟိုင်းဖက်ရှင် ဂလန်းမား စတိုင် (High Fashion Glamour)', labelEn: '10. High Fashion Glamour Lighting', promptText: 'glamour studio lighting with rim light, glossy accents, and high-contrast fashion aesthetics' },
  { id: 'cyberpunk_neon', emoji: '🌃', labelMm: '၁၁။ နီယွန် ဆိုက်ဘာပန့်ခ် စတိုင် (Cyberpunk Neon Glow)', labelEn: '11. Cyberpunk Neon Glow Aesthetic', promptText: 'futuristic cyberpunk urban night photography with glowing cyan and magenta neon light reflections' },
  { id: 'golden_hour_sunset', emoji: '🌅', labelMm: '၁၂။ နေဝင်ချိန် ရွှေရောင် အလင်းစတိုင် (Golden Hour Warm Glow)', labelEn: '12. Golden Hour Natural Sun Glow', promptText: 'warm sun-drenched golden hour photography, backlit glowing hair rim light and dreamy warm hues' },
  { id: 'high_key_minimalist', emoji: '⚪', labelMm: '၁၃။ အဖြူရောင် မင်းနီးမားလစ် စတိုင် (High-Key Minimalist)', labelEn: '13. High-Key Minimalist Studio', promptText: 'clean high-key minimalist photography, bright soft light backdrop, crisp modern contrast' },
  { id: 'low_key_dramatic_noir', emoji: '🌑', labelMm: '၁၄။ ဒရာမာဆန်သော အမှောင်ရိုက်ချက် (Low-Key Film Noir)', labelEn: '14. Low-Key Dramatic Film Noir', promptText: 'low-key dramatic chiaroscuro photography, deep shadows, single key light source and intense mood' },
  { id: 'surreal_artistic', emoji: '🌌', labelMm: '၁၅။ စိတ်ကူးယဉ် အနုပညာ စတိုင် (Surrealism Artistic Vision)', labelEn: '15. Surrealism Artistic Vision', promptText: 'surreal artistic portrait photography with poetic dreamlike composition and fantasy elements' },
  { id: 'polaroid_instant', emoji: '📷', labelMm: '၁၆။ ပိုလာရွိုက် အင်စတန့် စတိုင် (Polaroid Instant Film)', labelEn: '16. Polaroid Instant Film Style', promptText: 'vintage polaroid instant photo aesthetic, soft flash, square framing and saturated vintage hues' },
  { id: 'hdr_vibrant_detail', emoji: '🌈', labelMm: '၁၇။ ရောင်စုံ တောက်ပ ကြည်လင် စတိုင် (HDR Ultra-Vibrant)', labelEn: '17. HDR Ultra-Vibrant Sharp Detail', promptText: 'vibrant HDR photography, rich saturated colors, ultra-high dynamic range and crystal crisp clarity' },
  { id: 'street_photography', emoji: '🏙️', labelMm: '၁၈။ မြို့ပြ လမ်းမပေါ် စတိုင် (Urban Street Photography)', labelEn: '18. Urban Street Photography', promptText: 'authentic candid urban street photography, natural ambient light and dynamic city background' },
  { id: 'soft_pastel_aesthetic', emoji: '🌸', labelMm: '၁၉။ ပါစတဲလ် နူးညံ့သော စတိုင် (Soft Pastel Aesthetics)', labelEn: '19. Soft Pastel Aesthetics', promptText: 'gentle soft pastel color palette, muted tone photography with airy light diffusion' },
  { id: 'commercial_advertising', emoji: '💡', labelMm: '၂၀။ ကြော်ငြာ မော်ဒယ် စတိုင် (Commercial Product Model)', labelEn: '20. Commercial Advertising Portrait', promptText: 'commercial advertising portrait photography, perfectly lit, vibrant and attractive hero shot' },
];

export const RETOUCH_OPTIONS: RetouchOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 ကျော်သွားပါ (မူလ သဘာဝအတိုင်း)', labelEn: '🚫 Skip / Natural', details: 'Preserves natural unedited skin appearance' },
  { id: 'natural', emoji: '🌿', labelMm: '-- Default Natural Finish --', labelEn: '-- Default Natural Finish --', details: 'Preserves authentic micro skin pores, natural tone and realistic details' },
  { id: 'flawless_blemish_free', emoji: '✨', labelMm: 'Flawless Blemish-Free & Micro Pores (ဝက်ခြံဖျောက် + သဘာဝ မွေးညှင်းပေါက်)', labelEn: 'Flawless Blemish-Free & Micro Pores', details: 'Flawless acne-free smooth texture while retaining authentic micro skin pores' },
  { id: 'high_end_beauty_retouch', emoji: '👑', labelMm: 'High-End Beauty Retouch (အပြစ်အဆာရှင်း + သဘာဝ အသားအရေ) 👑', labelEn: 'High-End Beauty Retouch (Blemish Removal + Natural Skin) 👑', details: 'Pristine frequency separation beauty retouching with blemish removal and natural skin texture' },
  { id: 'dreamy_soft_look', emoji: '👑', labelMm: 'Dreamy Soft Look (အပြစ်အဆာရှင်း နူးညံ့ အလင်းပျော့) 👑', labelEn: 'Dreamy Soft Look (Soft Focus Bloom) 👑', details: 'Dreamy soft focus skin glow with flawless subtle light diffusion' },
  { id: 'vietnamese_aesthetic_look', emoji: '👑', labelMm: 'Vietnamese Aesthetic Look (ဗီယက်နမ် အလင်းကြည် စတိုင်) 👑', labelEn: 'Vietnamese Aesthetic Look (Luminous Clear) 👑', details: 'Trending Vietnamese aesthetic portrait look with crystal clear luminous glowing skin' },
  { id: 'romantic_ethereal_glow', emoji: '👑', labelMm: 'Romantic Ethereal Glow (Soft Focus Bloom) 👑', labelEn: 'Romantic Ethereal Glow (Soft Focus Bloom) 👑', details: 'Ethereal romantic skin bloom effect with dreamy ambient highlights' },
  { id: 'royal_commercial_sculpt', emoji: '👑', labelMm: 'Royal Commercial Sculpt (Dodge & Burn + အသားအရေ သန့်စင်) 👑', labelEn: 'Royal Commercial Sculpt (Dodge & Burn + Clean Skin) 👑', details: 'Royal studio dodge & burn contouring with pristine skin cleanup and dimensional pop' },
  { id: 'hydrating_dewy_glass_skin', emoji: '👑', labelMm: 'Hydrating Dewy Glass Skin Finish 👑', labelEn: 'Hydrating Dewy Glass Skin Finish 👑', details: 'Hydrating Korean dewy glass skin texture with radiant moist specular reflections' },
  { id: 'traditional_thanaka', emoji: '🇲🇲', labelMm: 'သနပ်ခါး ပါးကွက် မြန်မာ့အလှ (Traditional Thanaka Texture)', labelEn: 'Traditional Thanaka Texture', details: 'Authentic golden Thanaka paste texture delicately applied on cheeks' },
  { id: 'film_grain_skin', emoji: '🎞️', labelMm: 'ဖလင် စတိုင် အသားအရေ (Analog Film Grain Skin)', labelEn: 'Analog Film Grain Skin', details: 'Analog film grain texture with natural organic skin tone response' },
  { id: 'raw_unretouched', emoji: '📷', labelMm: 'မူရင်း RAW အသားအရေ (Raw Unretouched Texture)', labelEn: 'Raw Unretouched Texture', details: 'Unfiltered high-detail RAW photo texture with fine lines and peach fuzz' },
  { id: 'soft_matte', emoji: '🪞', labelMm: 'မက် အသားအရေ (Soft Velvet Matte Finish)', labelEn: 'Soft Velvet Matte Finish', details: 'Non-shiny velvety soft matte complexion with even light diffusion' },
  { id: 'vogue_high_fashion', emoji: '💃', labelMm: 'မဂ္ဂဇင်း ဟိုင်းဖက်ရှင် (Vogue High-Fashion Retouch)', labelEn: 'Vogue High-Fashion Retouch', details: 'Sculpted cheekbones, high contrast lighting, and magazine polish' },
  { id: 'studio_flash_sharp', emoji: '💡', labelMm: 'စတူဒီယို ဖလတ်ရှ် ကြည်လင်ပြတ်သား (Studio Flash Crisp Detail)', labelEn: 'Studio Flash Crisp Detail', details: 'Ultra sharp razor detail under commercial studio strobe lighting' },
  { id: 'golden_bronze_glow', emoji: '☀️', labelMm: 'ရွှေရောင် နေလောင် အသားအရေ (Golden Bronze Sun-Kissed Glow)', labelEn: 'Golden Bronze Sun-Kissed Glow', details: 'Warm sun-kissed golden bronze complexion with healthy radiant skin highlights' },
  { id: 'porcelain_porcelain_fair', emoji: '❄️', labelMm: 'နှင်းဖြူ ရွေပြောင် အသားအရေ (Porcelain Fair Complexion)', labelEn: 'Porcelain Fair Complexion', details: 'Fair porcelain smooth complexion with crystal clear refined translucency' },
  { id: 'warm_olive_radiance', emoji: '🫒', labelMm: 'အိုလစ်ဗ် ဝှမ် တုန်း (Warm Olive Radiant Skin)', labelEn: 'Warm Olive Radiant Skin', details: 'Rich warm olive skin tone with natural healthy subsurface glow' },
  { id: 'velvet_satin_glow', emoji: '🪡', labelMm: 'ဗဲလ်ဗက် ဆက်တင် အလှ (Velvet Satin Complexion)', labelEn: 'Velvet Satin Complexion', details: 'Silky smooth velvet satin finish with gentle diffused light reflectance' },
];

export const MAKEUP_OPTIONS: MakeupOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: 'Default / Skip Makeup (မူလအတိုင်း)', labelEn: 'Default / Skip Makeup', promptText: 'subtle default natural facial texture' },
  { id: 'natural_makeup', emoji: '💄', labelMm: 'သဘာဝ မိတ်ကပ် (Natural Soft Glow Makeup)', labelEn: 'Natural Makeup', promptText: 'soft natural dewy makeup with subtle nude lipstick and gentle blush' },
  { id: 'korean_makeup', emoji: '🌸', labelMm: 'ကိုရီးယားစတိုင် မိတ်ကပ် (Korean Glass Skin Makeup)', labelEn: 'Korean Makeup', promptText: 'glass skin Korean style makeup with gradient lips, soft aegyo sal, and luminous glow' },
  { id: 'traditional_myanmar_makeup', emoji: '🇲🇲', labelMm: 'ရိုးရာ မြန်မာ မိတ်ကပ် (Traditional Myanmar Bridal Makeup)', labelEn: 'Traditional Myanmar Makeup', promptText: 'elegant traditional Myanmar bridal beauty makeup with Thanaka scented highlights and classic red lips' },
  { id: 'thanaka_natural_makeup', emoji: '🌿', labelMm: 'သနပ်ခါး ပါးကွက် မိတ်ကပ် (Thanaka Natural Powder Look)', labelEn: 'Thanaka Powder Look', promptText: 'authentic traditional Burmese Thanaka powder cheeks artwork with soft natural lip tint' },
  { id: 'thai_aesthetic_makeup', emoji: '🇹🇭', labelMm: 'ထိုင်း စတိုင် အလှမိတ်ကပ် (Thai Glam Beauty Makeup)', labelEn: 'Thai Style Makeup', promptText: 'trending Thai style beauty makeup with fluffy feathery brows, warm bronze tones, and glossy lips' },
  { id: 'editorial_makeup', emoji: '🎨', labelMm: 'ဖက်ရှင် မဂ္ဂဇင်း မိတ်ကပ် (Editorial High-Fashion)', labelEn: 'Editorial Makeup', promptText: 'high fashion avant-garde editorial makeup with bold artistic eyes and sleek contour' },
  { id: 'glam_makeup', emoji: '✨', labelMm: 'ညနေခင်း ပွဲတက် မိတ်ကပ် (Hollywood Glam Makeup)', labelEn: 'Glam Makeup', promptText: 'glamorous evening makeup with smoky eyes, defined contour, and glossy rich lipstick' },
  { id: 'western_makeup', emoji: '👑', labelMm: 'ဗြိတိသျှ / ယူရိုပ မိတ်ကပ် (Western Classic Velvet)', labelEn: 'Western Makeup', promptText: 'polished Western makeup with winged eyeliner, defined brows, and matte velvet lipstick' },
  { id: 'soft_pink_blush', emoji: '🎀', labelMm: 'ပါးနီ နူးညံ့ မိတ်ကပ် (Soft Pink Blush & Peach Lips)', labelEn: 'Soft Pink Blush Makeup', promptText: 'youthful soft pink blush makeup with dewy peach lipstick and clear mascara' },
  { id: 'retro_vintage_red_lip', emoji: '💋', labelMm: 'ရက်ထရို ဗင်းတေ့ချ် နှုတ်ခမ်းနီ (Retro Vintage Red Lip)', labelEn: 'Retro Vintage Red Lip', promptText: 'classic retro 1950s vintage style makeup with iconic bold red lipstick and sharp eyeliner' },
  { id: 'no_makeup', emoji: '🌿', labelMm: 'No Makeup Look (မိတ်ကပ်မပါ သဘာဝမျက်နှာ)', labelEn: 'No Makeup Look', promptText: 'bare-faced no makeup look showing clean raw skin texture, peach fuzz, and natural lips' },
];

export const COLOR_GRADE_OPTIONS: ColorGradeOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '-- Default / Skip Color Grade --', labelEn: '-- Default / Skip Color Grade --', filmStock: 'Standard Neutral Profile' },
  { id: 'kodak_portra_400', emoji: '🎞️', labelMm: '၁။ Kodak Portra 400 Warm (နွေးထွေး သဘာဝ ဖလင်တိုနင်)', labelEn: '1. Kodak Portra 400 Warm Film', filmStock: 'Kodak Portra 400 Warm Emulation' },
  { id: 'kodak_gold_200', emoji: '🌅', labelMm: '၂။ Kodak Gold 200 Sunset Warmth (ရွှေရောင် သဘာဝ ကိုဒက် ဖလင်)', labelEn: '2. Kodak Gold 200 Sunset Warmth', filmStock: 'Kodak Gold 200 Film Stock' },
  { id: 'kodak_ultramax_400', emoji: '📸', labelMm: '၃။ Kodak UltraMax 400 Vibrant (စိုပြေ တောက်ပသော ကိုဒက် ဖလင်)', labelEn: '3. Kodak UltraMax 400 Vibrant', filmStock: 'Kodak UltraMax 400 Color Film' },
  { id: 'fuji_pro_400h', emoji: '🌸', labelMm: '၄။ Fuji Pro 400H Soft Pastel (နူးညံ့ အေးမြသော ဖူဂျီ ဖလင်)', labelEn: '4. Fuji Pro 400H Soft Pastel', filmStock: 'Fujifilm Pro 400H Soft Tone' },
  { id: 'fuji_eterna_cool', emoji: '❄️', labelMm: '၅။ Fuji Eterna Cool Cinema (အေးမြသော ဖူဂျီ စီနီမာ ဖလင်)', labelEn: '5. Fuji Eterna Cool Cinema', filmStock: 'Fujifilm Eterna Cool Cinema Profile' },
  { id: 'fuji_velvia_50', emoji: '🌺', labelMm: '၆။ Fuji Velvia 50 Vivid Colors (တောက်ပ စိုပြေသော ဖူဂျီ ဗယ်လ်ဗီးယား)', labelEn: '6. Fuji Velvia 50 Vivid Colors', filmStock: 'Fujifilm Velvia 50 High Saturation' },
  { id: 'fuji_superia_400', emoji: '🏙️', labelMm: '၇။ Fuji Superia 400 Street Vibe (လမ်းမပေါ် ဖူဂျီ ဖလင်တိုနင်)', labelEn: '7. Fuji Superia X-TRA 400', filmStock: 'Fujifilm Superia 400 Street Look' },
  { id: 'cinestill_800t', emoji: '🌃', labelMm: '၈။ CineStill 800T Neon Night (နီယွန် ညမီးရောင် စီနီစတီးလ် ဖလင်)', labelEn: '8. CineStill 800T Neon Night', filmStock: 'CineStill 800T Tungsten Halation' },
  { id: 'ilford_hp5_plus', emoji: '🖤', labelMm: '၉။ Ilford HP5 Plus 400 Silver B&W (အနုပညာ အနက်ဖြူ ဖလင်)', labelEn: '9. Ilford HP5 Plus 400 Silver B&W', filmStock: 'Ilford HP5 Plus 400 Silver Halide' },
  { id: 'kodak_tri_x_400', emoji: '⚡', labelMm: '၁၀။ Kodak Tri-X 400 High Contrast B&W (ပြတ်သားသော အနက်ဖြူ)', labelEn: '10. Kodak Tri-X 400 High Contrast B&W', filmStock: 'Kodak Tri-X 400 B&W Grain' },
  { id: 'agfa_vista_200', emoji: '🎨', labelMm: '၁၁။ Agfa Vista 200 Warm Punch (ဗင်းတေ့ချ် အက်ဂ်ဖာ ဖလင်)', labelEn: '11. Agfa Vista 200 Warm Punch', filmStock: 'Agfa Vista 200 Warm Red Punch' },
  { id: 'polaroid_600_vintage', emoji: '📷', labelMm: '၁၂။ Vintage Polaroid 600 Instant (ပိုလာရွိုက် အင်စတန့် ဖလင်)', labelEn: '12. Vintage Polaroid 600 Instant', filmStock: 'Polaroid 600 Instant Film Print' },
  { id: 'teal_orange', emoji: '🎬', labelMm: '၁၃။ Hollywood Teal & Orange (ဟောလိဝုဒ် ဘလော့ဘတ်စတာ စတိုင်)', labelEn: '13. Hollywood Teal & Orange', filmStock: 'Hollywood Blockbuster Profile' },
  { id: 'cinematic_bleach_bypass', emoji: '📽️', labelMm: '၁၄။ Bleach Bypass Dramatic Grit (စစ်ပွဲ/ဒရာမာဆန်သော ဘလိချ် ဘိုင်ပတ်စ်)', labelEn: '14. Bleach Bypass Dramatic Grit', filmStock: 'Cinematic Bleach Bypass Contrast' },
  { id: 'nordic_muted_cool', emoji: '🌲', labelMm: '၁၅။ Nordic Muted Earthy Tones (မြောက်ဥရောပ အေးမြ ငြိမ်သက်သော တိုနင်)', labelEn: '15. Nordic Muted Earthy Tones', filmStock: 'Scandinavian Nordic Muted Color Profile' },
  { id: 'vintage_fade', emoji: '📜', labelMm: '၁၆။ Vintage Retro Polarized Print (အတိတ်လွမ်းမောဖွယ် ဗင်းတေ့ချ်)', labelEn: '16. Vintage Retro Film Print', filmStock: 'Vintage Retro Polarized Print' },
  { id: 'soft_pastel', emoji: '🌸', labelMm: '၁၇။ Soft Pastel Romantic Glow (ပါစတဲလ် နူးညံ့ အရောင်တိုနင်)', labelEn: '17. Soft Pastel Romantic Glow', filmStock: 'Soft Pastel Color Grade Profile' },
  { id: 'moody_dark', emoji: '🌑', labelMm: '၁၈။ Noir Moody Deep Shadows (နက်မှောင် နက်ရှိုင်းသော စီနီမာတိုနင်)', labelEn: '18. Noir Moody Deep Shadows', filmStock: 'Noir Moody Shadow Grading' },
  { id: 'cyberpunk_neon_grade', emoji: '🌆', labelMm: '၁၉။ Cyberpunk Magenta & Cyan (ဆိုက်ဘာပန့်ခ် နီယွန် ရောင်စုံတိုနင်)', labelEn: '19. Cyberpunk Magenta & Cyan', filmStock: 'Futuristic Cyberpunk Neon LUT' },
];

export const ASPECT_RATIOS: AspectRatioOption[] = [
  { id: '4:5', ratio: '4:5', label: '4:5 (Instagram Post / Portrait)', width: 864, height: 1080 },
  { id: '3:4', ratio: '3:4', label: '3:4 (Studio Portrait)', width: 864, height: 1152 },
  { id: '9:16', ratio: '9:16', label: '9:16 (TikTok / Reels / Mobile Story)', width: 768, height: 1344 },
  { id: '2:3', ratio: '2:3', label: '2:3 (Classic 35mm Photo / Portrait)', width: 768, height: 1152 },
  { id: '16:9', ratio: '16:9', label: '16:9 (Cinematic Widescreen)', width: 1344, height: 768 },
  { id: '1:1', ratio: '1:1', label: '1:1 (Square)', width: 1024, height: 1024 },
];

export const QUALITY_PROFILES: QualityProfileOption[] = [
  {
    id: 'high_end_commercial',
    emoji: '💎',
    label: '💎 ၁။ High-End Commercial Fashion Grade (ဟိုင်းအန်း ဖက်ရှင် စတူဒီယို အဆင့်)',
    labelMm: '၁။ High-End Commercial Fashion Grade (ဟိုင်းအန်း ဖက်ရှင် စတူဒီယို အဆင့်)',
    labelEn: '1. High-End Commercial Fashion Grade',
    engine: 'Flux.1 Pro / Midjourney v6 Engine',
    detailLevel: 'Raytracing, Photorealistic 8K, Volumetric Studio Shadows, Ultra Skin Detail'
  },
  {
    id: '8k_uhd',
    emoji: '🖼️',
    label: '🖼️ ၂။ 8K Ultra High Definition Masterpiece (၈ကေ ရုပ်ထွက်အလွန်မြင့် ပေါ်ထရိတ်)',
    labelMm: '၂။ 8K Ultra High Definition Masterpiece (၈ကေ ရုပ်ထွက်အလွန်မြင့် ပေါ်ထရိတ်)',
    labelEn: '2. 8K Ultra High Definition Masterpiece',
    engine: 'Midjourney v6 Masterpiece Engine',
    detailLevel: '8K Ultra High Definition, crisp edge sharpness, micro-texture clarity'
  },
  {
    id: 'film_realism',
    emoji: '🎞️',
    label: '🎞️ ၃။ RAW Film Photo Realism (သဘာဝ ဖလင် ဓာတ်ပုံ စတိုင်)',
    labelMm: '၃။ RAW Film Photo Realism (သဘာဝ ဖလင် ဓာတ်ပုံ စတိုင်)',
    labelEn: '3. RAW Film Photo Realism',
    engine: 'RAW Film Photography Engine',
    detailLevel: 'Authentic 35mm Analog Grain, Natural Halation & Vintage Lens Optics'
  },
  {
    id: 'cinematic_imax',
    emoji: '🎬',
    label: '🎬 ၄။ IMAX Cinematic Movie Still (ရုပ်ရှင်ဇာတ်ကားကြီး ရိုက်ချက် အဆင့်)',
    labelMm: '၄။ IMAX Cinematic Movie Still (ရုပ်ရှင်ဇာတ်ကားကြီး ရိုက်ချက် အဆင့်)',
    labelEn: '4. IMAX Cinematic Movie Still',
    engine: 'Arri Alexa 65 Cinema Render',
    detailLevel: '70mm Anamorphic Lens Flare, Panavision Color Grading, Deep Cinematic Depth'
  },
  {
    id: 'studio_unreal_engine',
    emoji: '⚡',
    label: '⚡ ၅။ Unreal Engine 5.4 Ultra Render (၃ဒီ လက်ရာဆန်ဆန် စတူဒီယို အလင်း)',
    labelMm: '၅။ Unreal Engine 5.4 Ultra Render (၃ဒီ လက်ရာဆန်ဆန် စတူဒီယို အလင်း)',
    labelEn: '5. Unreal Engine 5.4 Ultra Render',
    engine: 'Unreal Engine 5.4 Path Tracing',
    detailLevel: 'Lumen Dynamic Global Illumination, Nanite Geometry Precision, Subsurface Scattering'
  },
  {
    id: 'hasselblad_medium_format',
    emoji: '📸',
    label: '📸 ၆။ Hasselblad 100MP Medium Format Clarity (၁၀၀ မဂ်ဂါပစ်ဆဲလ် စတူဒီယို)',
    labelMm: '၆။ Hasselblad 100MP Medium Format (အလွန် အသေးစိတ်ကျသော ပေါ်ထရိတ်)',
    labelEn: '6. Hasselblad 100MP Medium Format',
    engine: 'Hasselblad Phocus RAW Engine',
    detailLevel: '16-bit Color Depth, 100MP Micro-Detail, Natural Skin Texture, Zero Distortion'
  },
  {
    id: 'vogue_magazine_cover',
    emoji: '👠',
    label: '👠 ၇။ Vogue Fashion Magazine Cover (ဖက်ရှင် မဂ္ဂဇင်း မျက်နှာဖုံး အဆင့်)',
    labelMm: '၇။ Vogue Fashion Magazine Cover (ဖက်ရှင် မဂ္ဂဇင်း မျက်နှာဖုံး အဆင့်)',
    labelEn: '7. Vogue Fashion Magazine Cover',
    engine: 'High Fashion Runway Studio Engine',
    detailLevel: 'Editorial Studio Lighting, High Contrast Vogue Aesthetics, Glossy Magazine Finish'
  },
  {
    id: 'national_geographic',
    emoji: '🌍',
    label: '🌍 ၈။ National Geographic Documentary Realism (သဘာဝ မှတ်တမ်းတင် ဓာတ်ပုံ)',
    labelMm: '၈။ National Geographic Documentary (သဘာဝ မှတ်တမ်းတင် ဓာတ်ပုံ အဆင့်)',
    labelEn: '8. National Geographic Documentary',
    engine: 'DocuPhoto Realism Engine',
    detailLevel: 'Authentic Environmental Lighting, Unretouched Pure Realism, Razor Sharp Eyes & Facial Detail'
  },
  {
    id: 'hyper_photorealistic_macro',
    emoji: '🔬',
    label: '🔬 ၉။ Hyper-Photorealistic Portrait Macro (အသားအရေ မိုက်ခရို အသေးစိတ်)',
    labelMm: '၉။ Hyper-Photorealistic Portrait Macro (အသားအရေ မိုက်ခရို အသေးစိတ်)',
    labelEn: '9. Hyper-Photorealistic Portrait Macro',
    engine: 'Macro Optic Portrait Engine',
    detailLevel: 'Extreme Pores & Iris Reflection Detail, Volumetric Subsurface Skin Glow'
  },
  {
    id: 'soft_dreamy_bokeh',
    emoji: '✨',
    label: '✨ ၁၀။ Soft Dreamy Portrait Bokeh (နူးညံ့ အိပ်မက်ဆန်သော နောက်ခံဝါး)',
    labelMm: '၁၀။ Soft Dreamy Portrait Bokeh (နူးညံ့ အိပ်မက်ဆန်သော နောက်ခံဝါး)',
    labelEn: '10. Soft Dreamy Portrait Bokeh',
    engine: 'F1.2 Ultra Prime Bokeh Engine',
    detailLevel: 'Creamy Smooth Background Blur, Soft Romantic Glow, Glowing Highlight Halos'
  },
  {
    id: 'fashion_runway_studio',
    emoji: '🌟',
    label: '🌟 ၁၁။ Studio Fashion Runway Lighting (ဖက်ရှင် စတူဒီယို အလင်း)',
    labelMm: '၁၁။ Studio Fashion Runway Lighting (ဖက်ရှင် စတူဒီယို အလင်း)',
    labelEn: '11. Studio Fashion Runway Lighting',
    engine: 'High Fashion Studio Lighting Engine',
    detailLevel: 'Professional Rim Lighting, Razor Sharp Focus, Dramatic High Fashion Ambiance'
  },
  {
    id: 'fine_art_oil_canvas',
    emoji: '🎨',
    label: '🎨 ၁၂။ Fine Art Masterpiece Painting (အနုပညာ ပန်းချီ လက်ရာ စတိုင်)',
    labelMm: '၁၂။ Fine Art Masterpiece Painting (အနုပညာ ပန်းချီ လက်ရာ စတိုင်)',
    labelEn: '12. Fine Art Masterpiece Painting',
    engine: 'Fine Art Classical Oil Painting Engine',
    detailLevel: 'Rich Impasto Brushstrokes, Renaissance Chiaroscuro Lighting & Canvas Texture'
  },
  {
    id: 'cyberpunk_neon_sci_fi',
    emoji: '🔮',
    label: '🔮 ၁၃။ Cyberpunk Sci-Fi Neon Glow (ဆိုင်ဘာပန့်ခ် နီယွန် အလင်းရောင်)',
    labelMm: '၁၃။ Cyberpunk Sci-Fi Neon Glow (ဆိုင်ဘာပန့်ခ် နီယွန် အလင်းရောင်)',
    labelEn: '13. Cyberpunk Sci-Fi Neon Glow',
    engine: 'Futuristic Cyberpunk Rendering Engine',
    detailLevel: 'Dual Magenta & Cyan Neon Reflections, Rainy Asphalt Specular Glow & Volumetric Fog'
  },
  {
    id: 'golden_hour_sunset',
    emoji: '🌅',
    label: '🌅 ၁၄။ Golden Hour Sunset Atmosphere (နေဝင်ချိန် သဘာဝ ရွှေရောင် အလင်း)',
    labelMm: '၁၄။ Golden Hour Sunset Atmosphere (နေဝင်ချိန် သဘာဝ ရွှေရောင် အလင်း)',
    labelEn: '14. Golden Hour Sunset Atmosphere',
    engine: 'Natural Golden Hour Lighting Engine',
    detailLevel: 'Warm Amber Sunbeams, Soft Atmospheric Lens Flare & Glowing Rim Light'
  },
  {
    id: 'black_white_dramatic',
    emoji: '🎭',
    label: '🎭 ၁၅။ Black & White Dramatic Monochromatic Portrait (အနက်နှင့် အဖြူ ဒရာမာ ပေါ်ထရိတ်)',
    labelMm: '၁၅။ Black & White Dramatic Monochromatic Portrait (အနက်နှင့် အဖြူ ဒရာမာ ပေါ်ထရိတ်)',
    labelEn: '15. Black & White Dramatic Monochromatic Portrait',
    engine: 'Monochrome High-Contrast Silver Gelatin Engine',
    detailLevel: 'Deep Rich Shadows, Crisp High-Contrast Highlights & Timeless Fine Art Grain'
  }
];

export const GARMENT_OPTIONS: GarmentOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 မရွေးပါ (မူလ အဝတ်အစား)', labelEn: '🚫 Skip / Default Outfit', fabric: 'Natural Default Apparel', category: 'casual' },
  { id: 'casual_wear', emoji: '👕', labelMm: '၁။ နေ့စဉ်ဝတ် (Casual T-Shirt & Jeans)', labelEn: '1. Casual Wear (T-Shirt & Jeans)', fabric: 'Comfortable Cotton T-Shirt & Classic Blue Jeans', category: 'casual' },
  { id: 'formal_business', emoji: '👔', labelMm: '၂။ ရုံးဝတ် / တရားဝတ် (Formal Business Suit)', labelEn: '2. Formal Business Suit', fabric: 'Sharp Tailored Business Suit, Crisp Shirt & Blazer', category: 'formal' },
  { id: 'evening_gown', emoji: '👗', labelMm: '၃။ ညနေခင်း ပွဲတက်ဂါဝန် (Luxury Evening Gown)', labelEn: '3. Luxury Evening Gown', fabric: 'Elegant Haute Couture Silk Evening Gown with Sequins', category: 'formal' },
  { id: 'traditional_myanmar', emoji: '🇲🇲', labelMm: '၄။ မြန်မာ့ ရိုးရာ ချိတ်ဝတ်စုံ (Traditional Acheik Silk)', labelEn: '4. Traditional Myanmar Acheik Silk', fabric: 'Royal Handwoven Acheik Silk Longyi & Fitted Silk Blouse', category: 'myanmar' },
  { id: 'traditional_myanmar_royal', emoji: '👑', labelMm: '၅။ မြန်မာ့ ရှေးဟောင်း မင်းဝတ်မင်းစား (Burmese Royal Dynasty)', labelEn: '5. Royal Dynasty Court Attire', fabric: 'Opulent Mandalay Royal Court Silk Costume with Gold Embroidery', category: 'myanmar' },
  { id: 'myanmar_taingmathea', emoji: '🏛️', labelMm: '၆။ မြန်မာ တိုင်မသီ ပုဆိုး/ထမီ (Myanmar Taingmathea Silk)', labelEn: '6. Myanmar Taingmathea & Pasoe', fabric: 'Formal Myanmar White Taingmathea Jacket, Silk Pasoe/Htamain', category: 'myanmar' },
  { id: 'shan_ethnic_attire', emoji: '🏔️', labelMm: '၇။ ရှမ်းရိုးရာ ဝတ်စုံ (Traditional Shan Ethnic Attire)', labelEn: '7. Traditional Shan Ethnic Costume', fabric: 'Authentic Handwoven Shan Trousers, Embroidered Jacket & Shan Bag', category: 'myanmar' },
  { id: 'kachin_ethnic_attire', emoji: '🔴', labelMm: '၈။ ကချင်ရိုးရာ ဝတ်စုံ (Traditional Kachin Ethnic Attire)', labelEn: '8. Traditional Kachin Costume', fabric: 'Vibrant Patterned Handloom Kachin Woven Longyi & Silver Buttoned Top', category: 'myanmar' },
  { id: 'karen_ethnic_attire', emoji: '🧵', labelMm: '၉။ ကရင်ရိုးရာ ဝတ်စုံ (Traditional Karen Ethnic Attire)', labelEn: '9. Traditional Karen Costume', fabric: 'Handcrafted Karen Red-Striped Tunic & Woven Sarong', category: 'myanmar' },
  { id: 'chin_ethnic_attire', emoji: '🦅', labelMm: '၁၀။ ချင်းရိုးရာ ဝတ်စုံ (Traditional Chin Ethnic Attire)', labelEn: '10. Traditional Chin Costume', fabric: 'Ornate Geometric Hand-Woven Chin Blanket Wrap & Traditional Costume', category: 'myanmar' },
  { id: 'mon_ethnic_attire', emoji: '🪷', labelMm: '၁၁။ မွန်ရိုးရာ ဝတ်စုံ (Traditional Mon Ethnic Attire)', labelEn: '11. Traditional Mon Costume', fabric: 'Elegant Red & Gold Handwoven Mon Silk Longyi & Fitted Lace Top', category: 'myanmar' },
  { id: 'rakhine_ethnic_attire', emoji: '⛵', labelMm: '၁၂။ ရခိုင်ရိုးရာ ဝတ်စုံ (Traditional Rakhine Ethnic Attire)', labelEn: '12. Traditional Rakhine Costume', fabric: 'Traditional Rakhine Handwoven Silk Pasoe with Royal Motifs', category: 'myanmar' },
  { id: 'kayah_ethnic_attire', emoji: '🌸', labelMm: '၁၃။ ကယားရိုးရာ ဝတ်စုံ (Traditional Kayah Ethnic Attire)', labelEn: '13. Traditional Kayah Costume', fabric: 'Authentic Kayah Woven Dress with Traditional Lacquer Leg Bands', category: 'myanmar' },
  { id: 'traditional_thai', emoji: '🇹🇭', labelMm: '၁၄။ ရိုးရာ ထိုင်းဝတ်စုံ (Traditional Thai Chakkri Silk)', labelEn: '14. Traditional Thai Outfit', fabric: 'Exquisite Thai Chakkri Silk Pleated Costume with Gold Sash', category: 'traditional_world' },
  { id: 'korean_hanbok', emoji: '🇰🇷', labelMm: '၁၅။ ရိုးရာ ကိုရီးယား ဟန်ဘုတ် (Korean Traditional Hanbok)', labelEn: '15. Traditional Korean Hanbok', fabric: 'Vibrant Elegant Silk Korean Hanbok Robe & Chima Skirt', category: 'traditional_world' },
  { id: 'japanese_kimono', emoji: '🇯🇵', labelMm: '၁၆။ ရိုးရာ ဂျပန် ကီမိုနို (Japanese Silk Kimono)', labelEn: '16. Japanese Silk Kimono', fabric: 'Intricate Floral Silk Japanese Kimono with Obi Sash', category: 'traditional_world' },
  { id: 'indian_saree_sherwani', emoji: '🕌', labelMm: '၁၇။ ရိုးရာ အိန္ဒိယ ဆာရီ / Sherwani (Indian Silk Saree)', labelEn: '17. Indian Silk Saree & Sherwani', fabric: 'Luxurious Royal Embroidered Silk Saree & Gold Sherwani Suit', category: 'traditional_world' },
  { id: 'high_fashion', emoji: '👠', labelMm: '၁၈။ ဖက်ရှင် မော်ဒယ်ဝတ် (High Fashion Runway Couture)', labelEn: '18. High Fashion Runway Couture', fabric: 'Designer Runway Avant-Garde High-Fashion Ensemble', category: 'fashion' },
  { id: 'streetwear_hoodie', emoji: '🧥', labelMm: '၁၉။ လမ်းဘေး ဖက်ရှင် / Hoodie (Streetwear & Denim)', labelEn: '19. Streetwear & Denim Jacket', fabric: 'Trendy Urban Oversized Hoodie, Cargo Pants & Denim Jacket', category: 'casual' },
  { id: 'vintage_retro', emoji: '📻', labelMm: '၂၀။ ဗင်းတေ့ချ် / ရက်ထရိုဝတ် (Vintage 70s/80s Retro)', labelEn: '20. Vintage Retro Style', fabric: 'Classic 1970s/80s Vintage Leather & Patterned Retro Attire', category: 'fashion' },
  { id: 'sporty', emoji: '👟', labelMm: '၂၁။ အားကစားဝတ် (Sporty Athletic Activewear)', labelEn: '21. Sporty Activewear', fabric: 'Modern Breathable Athletic Activewear & Tracksuit', category: 'casual' },
  { id: 'beachwear', emoji: '🩱', labelMm: '၂၂။ ကမ်းခြေ အပန်းဖြေဝတ် (Resort Beachwear & Linen)', labelEn: '22. Resort Beachwear & Linen', fabric: 'Tropical Resort Linen Shirt, Sundress & Beach Cover-up', category: 'casual' },
  { id: 'winter_wear', emoji: '❄️', labelMm: '၂၃။ ဆောင်းရာသီ Wool Coat (Winter Coat & Sweater)', labelEn: '23. Winter Wool Coat & Sweater', fabric: 'Cozy Tailored Wool Trench Coat & Knitted Cashmere Sweater', category: 'casual' },
  { id: 'wedding_outfit', emoji: '👰', labelMm: '၂၄။ မင်္ဂလာဆောင် သတို့သမီး/သတို့သား (Bridal & Tuxedo)', labelEn: '24. Bridal Wedding Attire', fabric: 'Opulent White Lace Bridal Gown & Black Velvet Tuxedo', category: 'formal' },
  { id: 'leather_biker_jacket', emoji: '🏍️', labelMm: '၂၅။ သားရေဂျာကင် / Biker (Leather Biker Jacket)', labelEn: '25. Leather Biker Jacket', fabric: 'Rugged Black Leather Biker Jacket with Metallic Zippers', category: 'fashion' },
  { id: 'bohemian_chic', emoji: '🌿', labelMm: '၂၆။ ဘိုဟီးမီးယန်း ဖက်ရှင် (Bohemian Chic Dress)', labelEn: '26. Bohemian Chic Style', fabric: 'Flowy Bohemian Floral Maxi Dress with Embroidered Pattern', category: 'fashion' },
  { id: 'doctor_medical_scrubs', emoji: '🩺', labelMm: '၂၇။ ဆရာဝန် / သူနာပြု ဝတ်စုံ (Doctor Medical Scrub & Coat)', labelEn: '27. Doctor Medical Scrubs & Coat', fabric: 'Professional Medical White Coat, Stethoscope & Teal Scrubs', category: 'uniform' },
  { id: 'pilot_uniform', emoji: '✈️', labelMm: '၂၈။ လေယာဉ်မှူး / လေယာဉ်မယ် ဝတ်စုံ (Pilot & Flight Attendant)', labelEn: '28. Pilot & Flight Attendant Uniform', fabric: 'Sharp Navy Blue Pilot Uniform with Gold Epaulets & Airline Blazer', category: 'uniform' },
  { id: 'advocate_lawyer_robe', emoji: '⚖️', labelMm: '၂၉။ ရှေ့နေဝတ်စုံ / Advocate (Lawyer Legal Robe & Black Gown)', labelEn: '29. Advocate / Lawyer Legal Robe & Gown', fabric: 'Professional Senior Advocate Formal Black Gown, Legal Robe & White Bands', category: 'uniform' },
  { id: 'chef_uniform', emoji: '🧑‍🍳', labelMm: '၃၀။ စားဖိုမှူး ဝတ်စုံ (Chef Culinary Uniform)', labelEn: '30. Chef Culinary Uniform', fabric: 'Classic Double-Breasted Chef Jacket & White Chef Hat', category: 'uniform' },
  { id: 'graduation_gown', emoji: '🎓', labelMm: '၃၁။ ဘွဲ့လွန် ဝတ်စုံ (Graduation Academic Cap & Gown)', labelEn: '31. Graduation Cap & Gown', fabric: 'Formal Academic Graduation Gown with Satin Hood & Mortarboard Cap', category: 'formal' },
  { id: 'modern_acheik_denim', emoji: '🎨', labelMm: '၃၂။ ချိတ် + ဒင်းနစ် ခေတ်ပေါ် စပ်ဟန် (Modern Acheik & Denim Fusion)', labelEn: '32. Acheik & Denim Fusion', fabric: 'Chic Modern Fusion Denim Jacket Inlaid with Traditional Acheik Silk Pattern', category: 'fashion' },
];

export const ETHNICITY_OPTIONS: EthnicityOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 ကျော်သွားပါ (မရွေးပါ / Default)', labelEn: '🚫 Skip / Default Ethnicity', promptText: '' },
  { id: 'burmese', emoji: '🇲🇲', labelMm: '၁။ မြန်မာ (Burmese)', labelEn: '1. Burmese (Myanmar)', promptText: 'Burmese ethnicity, Southeast Asian facial structure with natural golden-brown complexion' },
  { id: 'thai', emoji: '🇹🇭', labelMm: '၂။ ထိုင်း (Thai)', labelEn: '2. Thai', promptText: 'Thai ethnicity, Southeast Asian features with warm glowing skin tone' },
  { id: 'korean', emoji: '🇰🇷', labelMm: '၃။ ကိုရီးယား (Korean)', labelEn: '3. Korean', promptText: 'Korean ethnicity, East Asian facial features with smooth porcelain dewy skin' },
  { id: 'japanese', emoji: '🇯🇵', labelMm: '၄။ ဂျပန် (Japanese)', labelEn: '4. Japanese', promptText: 'Japanese ethnicity, East Asian delicate facial structure with fair clear skin' },
  { id: 'chinese', emoji: '🇨🇳', labelMm: '၅။ တရုတ် (Chinese)', labelEn: '5. Chinese', promptText: 'Chinese ethnicity, East Asian almond eyes with refined facial contour' },
  { id: 'indian', emoji: '🇮🇳', labelMm: '၆။ အိန္ဒိယ (Indian)', labelEn: '6. Indian', promptText: 'South Asian Indian ethnicity, deep expressive eyes, warm dusky olive skin tone' },
  { id: 'western', emoji: '🇪🇺', labelMm: '၇။ အနောက်တိုင်း (Western / Caucasian)', labelEn: '7. Western / Caucasian', promptText: 'Caucasian Western ethnicity, sharp facial features with high cheekbones' },
  { id: 'african', emoji: '🌍', labelMm: '၈။ အာဖရိက (African)', labelEn: '8. African', promptText: 'African ethnicity, rich dark glowing melanin skin tone, striking features' },
  { id: 'custom', emoji: '✏️', labelMm: '၉။ အခြား (ကိုယ်တိုင် ရေးပါ)', labelEn: '9. Custom Ethnicity', promptText: 'Custom ethnicity' },
];

export const CULTURAL_PROP_PRESETS = [
  { id: 'thanaka', category: 'beauty', emoji: '🌿', labelMm: '၁။ သနပ်ခါး ပါးကွက် (Thanaka Facial Paste)', labelEn: '1. Thanaka Bark Paste', promptText: 'traditional yellowish-white Thanaka bark paste patterns softly brushed on cheeks' },
  { id: 'flower_garland', category: 'beauty', emoji: '🌸', labelMm: '၂။ စပယ်ပန်းကုံး / ပန်းကူး (Jasmine Flower Garland)', labelEn: '2. Jasmine Flower Garland', promptText: 'delicate fragrant white jasmine flower garland woven in hair or around neck' },
  { id: 'pathein_umbrella', category: 'accessories', emoji: '☂️', labelMm: '၃။ ပုသိမ်ထီး (Pathein Traditional Umbrella)', labelEn: '3. Pathein Parasol Umbrella', promptText: 'vibrant Pathein hand-painted traditional oil-paper parasol umbrella' },
  { id: 'traditional_gold_jewelry', category: 'jewelry', emoji: '👑', labelMm: '၄။ မြန်မာ့ ရှေးဟောင်း ရွှေထည် (Burmese Royal Gold Jewelry)', labelEn: '4. Royal Gold Jewelry', promptText: 'intricate royal Burmese gold filigree earrings, necklace, and traditional hairpins' },
  { id: 'silk_longyi', category: 'attire', emoji: '🇲🇲', labelMm: '၅။ ချိတ်လုံချည် / ပိုးပဆိုး (Traditional Silk Longyi Sarong)', labelEn: '5. Traditional Silk Longyi', promptText: 'luxurious traditional woven silk acheik longyi sarong with intricate royal motifs' },
  { id: 'lacquerware', category: 'household', emoji: '🏺', labelMm: '၆။ မြန်မာ့ ယွန်းထည် (Traditional Myanmar Lacquerware)', labelEn: '6. Myanmar Lacquerware Box', promptText: 'exquisite handcrafted black and gold Myanmar lacquerware box and tray' },
  { id: 'ruby_jade_jewelry', category: 'jewelry', emoji: '💎', labelMm: '၇။ ပတ္တမြား / မြကျောက် လက်စွပ် (Myanmar Ruby & Jade Jewelry)', labelEn: '7. Ruby & Jade Ring', promptText: 'luxurious Myanmar royal ruby pendant and natural imperial jade ring' },
  { id: 'clay_teapot', category: 'household', emoji: '🫖', labelMm: '၈။ မြေထည် ရေနွေးကတ္တရာနှင့် ခွက် (Traditional Clay Teapot Set)', labelEn: '8. Clay Teapot Set', promptText: 'cozy traditional earthenware clay teapot and porcelain tea cups on bamboo mat' },
  { id: 'burmese_harp', category: 'music', emoji: '🎵', labelMm: '၉။ စောင်းကောက် ရိုးရာတူရိယာ (Saung-Gauk Traditional Harp)', labelEn: '9. Burmese Harp (Saung-Gauk)', promptText: 'elegant traditional Burmese arched harp (Saung-Gauk) with golden silk tassel' },
  { id: 'bamboo_fan', category: 'accessories', emoji: '🪭', labelMm: '၁၀။ ဝါးယပ်တောင် / ဝါးခြင်းတောင်း (Handwoven Bamboo Fan & Basket)', labelEn: '10. Bamboo Fan & Basket', promptText: 'delicate handwoven bamboo palm fan and traditional wicker basket' },
  { id: 'silver_bowl', category: 'household', emoji: '🥣', labelMm: '၁၁။ ငွေဖလား / ငွေခွက် (Traditional Carved Silver Bowl)', labelEn: '11. Carved Silver Bowl', promptText: 'hand-embossed traditional Burmese silver bowl with celestial dancing figures' },
  { id: 'gem_pendant', category: 'jewelry', emoji: '✨', labelMm: '၁၂။ ပတ္တမြား နားကပ် / ဘယက် (Traditional Gem Earrings & Pendant)', labelEn: '12. Traditional Gem Pendant', promptText: 'traditional Burmese ruby-encrusted gold filigree drop earrings and necklace pendant' },
  { id: 'modern_acheik_bag', category: 'attire', emoji: '👜', labelMm: '၁၃။ ခေတ်ပေါ် ချိတ်စပိတ် လက်ကိုင်အိတ် (Modern Acheik Silk Handbag)', labelEn: '13. Modern Acheik Silk Handbag', promptText: 'chic modern designer tote handbag crafted with traditional Burmese acheik silk fabric' },
  { id: 'sunglasses_parasol', category: 'modern', emoji: '🕶️', labelMm: '၁၄။ နေကာမျက်မှန် + ပုသိမ်ထီး ရောစပ်ဟန် (Modern Sunglasses & Parasol)', labelEn: '14. Sunglasses & Parasol', promptText: 'contemporary fusion featuring stylish designer sunglasses alongside a hand-painted Pathein parasol' },
  { id: 'watch_gold_bangle', category: 'modern', emoji: '⌚', labelMm: '၁၅။ ခေတ်ပေါ် နာရီ + ရိုးရာ ရွှေလက်ကောက် (Modern Watch & Gold Bangle)', labelEn: '15. Watch & Gold Bangle', promptText: 'luxury modern wrist watch paired harmoniously with a traditional Burmese solid gold bangle' },
  { id: 'thanaka_stone_slab', category: 'beauty', emoji: '🪨', labelMm: '၁၆။ သနပ်ခါး ကျောက်ပျဉ်နှင့် အတုံး (Traditional Thanaka Stone Slab)', labelEn: '16. Thanaka Stone Slab & Bark', promptText: 'authentic natural Thanaka tree bark log resting on a traditional round Kyauk Pyin grinding stone' },
  { id: 'betel_tea_set', category: 'household', emoji: '🍵', labelMm: '၁၇။ ယွန်းကွမ်းအစ်နှင့် ရေနွေးကြမ်းပွဲ (Lacquer Betel Box & Tea Set)', labelEn: '17. Lacquer Betel Box & Tea', promptText: 'traditional ornamental lacquerware betel box paired with Burmese green tea set' },
  { id: 'modern_coffee_lacquer', category: 'modern', emoji: '☕', labelMm: '၁၈။ ခေတ်ပေါ် ကော်ဖီခွက် + ယွန်းခွက်စပ် (Modern Coffee Mug & Lacquer Coaster)', labelEn: '18. Coffee Mug & Lacquer Coaster', promptText: 'modern artisanal coffee ceramic mug resting on a traditional handcrafted lacquerware coaster' },
  { id: 'ethno_sling_bag', category: 'attire', emoji: '🎒', labelMm: '၁၉။ ခေတ်ပေါ် လွယ်အိတ် + ချိတ်စလွယ် (Modern Ethno-Chic Sling Bag)', labelEn: '19. Ethno-Chic Sling Bag', promptText: 'trendy streetwear canvas sling bag accented with traditional Burmese tribal woven patterns' },
  { id: 'burmese_pattala', category: 'music', emoji: '🎼', labelMm: '၂၀။ မြန်မာ့ ပတ္တလား / ရိုးရာ တူရိယာ (Traditional Burmese Pattala)', labelEn: '20. Burmese Pattala Xylophone', promptText: 'traditional Burmese bamboo xylophone (Pattala) with carved teakwood sound box' },
  { id: 'shwe_chi_doe_pillow', category: 'household', emoji: '🧵', labelMm: '၂၁။ ရွှေချည်ထိုး မှန်စီရွှေချ ခေါင်းအုံး / ကော်ဇော (Shwe Chi Doe Pillow)', labelEn: '21. Embroidered Tapestry Pillow', promptText: 'ornate traditional Burmese Shwe Chi Doe gold thread embroidered pillow and wall tapestry' },
  { id: 'bamboo_hat', category: 'accessories', emoji: '👒', labelMm: '၂၂။ ရိုးရာ ဝါးခမောက် (Traditional Bamboo Conical Hat)', labelEn: '22. Traditional Bamboo Hat', promptText: 'authentic woven bamboo conical hat with rustic chin strap' },
  { id: 'teak_prayer_beads', category: 'accessories', emoji: '📿', labelMm: '၂၃။ ရိုးရာ သစ်သား ပုတီး (Burmese Teakwood Prayer Beads)', labelEn: '23. Teakwood Prayer Beads', promptText: 'polished traditional Burmese teakwood prayer beads wrapped around hand' },
  { id: 'bronze_gong', category: 'music', emoji: '🔔', labelMm: '၂၄။ ကြေးမောင်း / ရိုးရာ ကြေးစည် (Traditional Bronze Gong / Bell)', labelEn: '24. Traditional Bronze Gong', promptText: 'carved traditional Burmese triangular bronze bell (Kyi-zee) with wooden mallet' },  { id: 'inle_lotus_scarf', category: 'attire', emoji: '🧣', labelMm: '၂၅။ အင်းလေး ကြာချည် စလွယ် / ပဝါ (Inle Lotus Silk Scarf)', labelEn: '25. Inle Lotus Silk Scarf', promptText: 'rare handcrafted Inle Lake lotus silk scarf draped softly over shoulders' },
  { id: 'dragon_parasol', category: 'accessories', emoji: '☂️', labelMm: '၂၆။ ရိုးရာ နဂါးရုပ် ခေါက်ထီး (Dragon Engraved Parasol)', labelEn: '26. Dragon Engraved Umbrella', promptText: 'ornate Burmese traditional umbrella adorned with gold hand-drawn dragon motifs' },
  { id: 'wooden_mask', category: 'music', emoji: '🎭', labelMm: '၂၇။ နဂါး / ဘီလူး ရိုးရာ သစ်သားမျက်နှာဖုံး (Carved Wooden Mask)', labelEn: '27. Carved Wooden Mask', promptText: 'hand-carved colorful traditional Burmese theatrical wooden mask' },
  { id: 'burmese_oboe', category: 'music', emoji: '🎺', labelMm: '၂၈။ ရိုးရာ နှဲ / လင်းကွင်း တူရိယာ (Burmese Oboe & Cymbals)', labelEn: '28. Traditional Oboe & Cymbals', promptText: 'brass traditional Burmese Hne oboe and small brass cymbals' },
  { id: 'modern_phone_acheik', category: 'modern', emoji: '📱', labelMm: '၂၉။ စမတ်ဖုန်း + ရိုးရာ ချိတ်ဖုန်းအိတ် (Smart Phone with Acheik Case)', labelEn: '29. Smartphone in Acheik Case', promptText: 'modern sleek smartphone enclosed in a traditional Burmese Acheik patterned protective case' },
  { id: 'headphones_sling', category: 'modern', emoji: '🎧', labelMm: '၃၀။ နားကြပ် + ရိုးရာ ရှမ်းလွယ်အိတ် (Headphones & Shan Bag)', labelEn: '30. Headphones & Shan Bag', promptText: 'modern wireless headphones paired stylishly with an authentic handwoven Shan ethnic shoulder bag' },
  { id: 'diamond_earrings', category: 'jewelry', emoji: '💍', labelMm: '၃၁။ စိန်ထည် / ပလက်တီနမ် နားကပ် (Modern Diamond Earrings)', labelEn: '31. Diamond Earrings', promptText: 'brilliant cut modern diamond drop earrings setting with platinum chain' },
  { id: 'handloom_shuttle', category: 'accessories', emoji: '🧶', labelMm: '၃၂။ မြန်မာ့ ရိုးရာ ယက်ကန်းလွန်း (Traditional Handloom Shuttle)', labelEn: '32. Handloom Weaving Shuttle', promptText: 'polished wooden traditional handloom shuttle with colorful spools of silk thread' },
  { id: 'luxurious_modern_car', category: 'accessories', emoji: '🚗', labelMm: '၃၃။ ခေတ်မီ ပြောင်လက်သော မော်တော်ကား (Luxurious Modern Car)', labelEn: '33. Luxurious Modern Car', promptText: 'A highly detailed image of a luxurious modern car, shiny metallic paint with vibrant colors, glowing headlights and taillights, parked on a bustling city street at night, realistic photography, ultra realistic, 8K resolution, cinematic lighting, sharp details, professional photography' },
];

export const POSE_EXPRESSION_OPTIONS: PoseOption[] = [
  { id: 'skip', emoji: '🚫', labelMm: '🚫 ကျော်သွားပါ (မူလ ကိုယ်ဟန်)', labelEn: '🚫 Skip / Default Pose', promptText: '' },
  { id: 'soft_smile', emoji: '😊', labelMm: '၁။ ပြုံးနေသော (Soft Smile)', labelEn: '1. Soft Smile', promptText: 'soft gentle smile with warm friendly expression' },
  { id: 'laughing', emoji: '😄', labelMm: '၂။ ရယ်မောနေသော (Joyful Laughing)', labelEn: '2. Joyful Laughing', promptText: 'candid joyful laughing expression with sparkling happy eyes' },
  { id: 'serious_calm', emoji: '😐', labelMm: '၃။ တည်ကြည်သော (Serious / Calm)', labelEn: '3. Serious / Calm', promptText: 'serene composed calm serious expression with deep confident look' },
  { id: 'looking_at_camera', emoji: '👀', labelMm: '၄။ မျက်လုံးစူးစိုက်ကြည့်သော (Looking at Camera)', labelEn: '4. Direct Eye Contact', promptText: 'direct intense eye contact looking straight at camera lens' },
  { id: 'looking_back', emoji: '🔄', labelMm: '၅။ ကျောခိုင်း၍ ပြန်လှည့်ကြည့်သော (Looking Back)', labelEn: '5. Looking Back Over Shoulder', promptText: 'turned around looking back over shoulder toward camera' },
  { id: 'sitting_pose', emoji: '🪑', labelMm: '၆။ ထိုင်နေသော (Sitting Pose)', labelEn: '6. Seated Pose', promptText: 'gracefully seated pose in relaxed natural position' },
  { id: 'standing_pose', emoji: '🧍', labelMm: '၇။ မတ်တပ်ရပ်နေသော (Standing Pose)', labelEn: '7. Standing Pose', promptText: 'elegant full-body standing pose with confident posture' },
  { id: 'walking', emoji: '🚶', labelMm: '၈။ လမ်းလျှောက်နေသော (Walking Pose)', labelEn: '8. Walking Pose', promptText: 'candid walking pose in graceful natural motion' },
  { id: 'arms_crossed', emoji: '🙅', labelMm: '၉။ လက်ပိုက်ထားသော (Arms Crossed)', labelEn: '9. Arms Crossed', promptText: 'poised arms crossed pose conveying authority and style' },
  { id: 'waving', emoji: '👋', labelMm: '၁၀။ လက်ဝှေ့ယမ်းနေသော (Waving Hand)', labelEn: '10. Waving Hand', promptText: 'friendly waving hand gesture with cheerful welcoming expression' },
  { id: 'looking_down', emoji: '⬇️', labelMm: '၁၁။ ခေါင်းငုံ့ထားသော / တွေးတောနေဟန် (Pensive Looking Down)', labelEn: '11. Looking Down', promptText: 'thoughtful demure pose looking downwards gently' },
  { id: 'lying_down', emoji: '🛌', labelMm: '၁၂။ အိပ်ရာပေါ် လဲလျောင်းနေသော (Reclining / Lying Down)', labelEn: '12. Reclining Lying Down', promptText: 'relaxed reclining pose lying down comfortably' },
  { id: 'dancing', emoji: '💃', labelMm: '၁၃။ ကခုန်နေသော (Dancing Pose)', labelEn: '13. Dancing Pose', promptText: 'dynamic fluid dancing pose with expressive posture and movement' },
  { id: 'hand_on_chin', emoji: '🤔', labelMm: '၁၄။ လက်ဖြင့် မေးထောက်ထားဟန် (Hand on Chin)', labelEn: '14. Hand on Chin Thinking', promptText: 'thoughtful pose with delicate hand resting gently on chin' },
  { id: 'wai_folded_hands', emoji: '🙏', labelMm: '၁၅။ လက်ဝါးချင်းယှက်ဆုတောင်းဟန် (Folded Hands / Wai)', labelEn: '15. Folded Hands / Wai Gesture', promptText: 'respectful polite Burmese Wai pose with palms folded gracefully together in front of chest' },
  { id: 'hands_in_pockets', emoji: '👖', labelMm: '၁၆။ လက်နှစ်ဖက် အိတ်ကပ်ထဲထည့်ထားဟန် (Hands in Pockets)', labelEn: '16. Hands in Pockets', promptText: 'cool casual pose with hands tucked loosely in pockets' },
  { id: 'reading_book', emoji: '📖', labelMm: '၁၇။ စာအုပ်ဖတ်နေဟန် (Reading a Book)', labelEn: '17. Reading a Book', promptText: 'engaging candid pose reading a book intently with focused serene expression' },
  { id: 'adjusting_glasses', emoji: '👓', labelMm: '၁၈။ မျက်မှန်ကို ကိုင်ထားဟန် (Adjusting Glasses)', labelEn: '18. Adjusting Glasses', promptText: 'stylish intelligent pose adjusting eyeglasses frame with index finger' },
  { id: 'alluring_pout', emoji: '💋', labelMm: '၁၉။ နှုတ်ခမ်းအနည်းငယ်ဟပြီး ဆွဲဆောင်မှုရှိသောဟန် (Alluring Pose)', labelEn: '19. Alluring Pose', promptText: 'glamorous fashion pose with soft subtle lip pout and captivating gaze' },
  { id: 'looking_away_candid', emoji: '🌅', labelMm: '၂၀။ အဝေးသို့ ငေးမောကြည့်နေဟန် (Looking Away / Candid)', labelEn: '20. Looking Away Sideways', promptText: 'scenic candid sideways pose looking far into distance with reflective gaze' },
  { id: 'holding_coffee', emoji: '☕', labelMm: '၂၁။ ကော်ဖီခွက် ကိုင်ထားဟန် (Holding Coffee Cup)', labelEn: '21. Holding Coffee Cup', promptText: 'cozy lifestyle pose holding a warm coffee ceramic mug with both hands' },
  { id: 'pointing_gesture', emoji: '👈', labelMm: '၂၂။ ညွှန်ပြနေဟန် (Pointing Gesture)', labelEn: '22. Pointing Gesture', promptText: 'expressive engaging pose pointing finger playfully towards side' },
  { id: 'surprised_excited', emoji: '😲', labelMm: '၂၃။ အံ့အားသင့်ဝမ်းမြောက်ဟန် (Surprised & Excited)', labelEn: '23. Surprised & Excited', promptText: 'delighted expressive wide-eyed surprised and excited smile' },
  { id: 'peace_v_sign', emoji: '✌️', labelMm: '၂၄။ လက်နှစ်ချောင်းထောင် Peace သင်္ကေတဟန် (Victory / Peace Sign)', labelEn: '24. Victory / Peace Sign', promptText: 'playful energetic pose gesturing a cute peace V-sign gesture near cheek' },
  { id: 'shy_blushing', emoji: '🙈', labelMm: '၂၅။ ရှက်ပြုံး ပြုံးနေဟန် (Shy Blushing Smile)', labelEn: '25. Shy Blushing Smile', promptText: 'sweet bashful shy blushing smile with lowered eyelashes' },
];

export const CHILD_AGE_OPTIONS: AgeRangeOption[] = [
  { id: '3_years', emoji: '👶', labelMm: '၃ နှစ် (3 Years)', labelEn: '3 Years Old', promptText: 'adorable 3 years old toddler child with innocent cute facial features' },
  { id: '4_years', emoji: '🧒', labelMm: '၄ နှစ် (4 Years)', labelEn: '4 Years Old', promptText: 'cute 4 years old young child with playful innocent demeanor' },
  { id: '5_years', emoji: '🧒', labelMm: '၅ နှစ် (5 Years)', labelEn: '5 Years Old', promptText: 'cheerful 5 years old kindergarten child with sweet innocent smile' },
  { id: '6_years', emoji: '👦', labelMm: '၆ နှစ် (6 Years)', labelEn: '6 Years Old', promptText: 'happy 6 years old child with bright expressive eyes' },
  { id: '7_years', emoji: '👦', labelMm: '၇ နှစ် (7 Years)', labelEn: '7 Years Old', promptText: 'lively 7 years old primary school child with joyful expression' },
  { id: '8_years', emoji: '👦', labelMm: '၈ နှစ် (8 Years)', labelEn: '8 Years Old', promptText: 'energetic 8 years old child with cheerful bright personality' },
  { id: '9_years', emoji: '👧', labelMm: '၉ နှစ် (9 Years)', labelEn: '9 Years Old', promptText: 'smart 9 years old child with confident sweet smile' },
  { id: '10_years', emoji: '👧', labelMm: '၁၀ နှစ် (10 Years)', labelEn: '10 Years Old', promptText: 'friendly 10 years old pre-teen child with bright polite demeanor' },
  { id: '11_years', emoji: '👧', labelMm: '၁၁ နှစ် (11 Years)', labelEn: '11 Years Old', promptText: 'active 11 years old pre-teen child with youthful charm' },
  { id: '12_years', emoji: '👧', labelMm: '၁၂ နှစ် (12 Years)', labelEn: '12 Years Old', promptText: 'charming 12 years old pre-teen child with graceful cheerful presence' },
];

export const AGE_RANGE_OPTIONS: AgeRangeOption[] = [
  { id: 'under_18', emoji: '👧', labelMm: '၁၈ နှစ်အောက် (Teen)', labelEn: 'Under 18 (Teen)', promptText: 'youthful teenager around 16-17 years old with fresh energetic look' },
  { id: '18_25', emoji: '👩', labelMm: '၁၈–၂၅ နှစ် (Young Adult)', labelEn: '18–25 Years (Young Adult)', promptText: 'young adult in early 20s around 21-23 years old with vibrant radiant demeanor' },
  { id: '26_35', emoji: '💃', labelMm: '၂၆–၃၅ နှစ် (Adult)', labelEn: '26–35 Years (Adult)', promptText: 'prime adult around 28-32 years old with poised confident appearance' },
  { id: '36_45', emoji: '👔', labelMm: '၃၆–၄၅ နှစ် (Mature Adult)', labelEn: '36–45 Years (Mature Adult)', promptText: 'mature adult around 38-42 years old with refined sophisticated aura' },
  { id: '46_55', emoji: '🧑‍💼', labelMm: '၄၆–၅၅ နှစ် (Middle Age)', labelEn: '46–55 Years (Middle Age)', promptText: 'distinguished middle-aged adult around 48-52 years old with elegant graceful maturity' },
  { id: '56_65', emoji: '🧓', labelMm: '၅၆–၆၅ နှစ် (Senior)', labelEn: '56–65 Years (Senior)', promptText: 'dignified senior adult around 58-62 years old with wise serene demeanor' },
  { id: 'over_65', emoji: '👵', labelMm: '၆၅+ နှစ် (Elderly)', labelEn: '65+ Years (Elderly)', promptText: 'revered elderly person 65+ years old with gentle silver-haired dignity and warm smiles' },
];

export const HEIGHT_OPTIONS: HeightOption[] = [
  { id: '155_cm', emoji: '📏', labelMm: '၁၅၅ cm (၅ ပေ)', labelEn: '155 cm (5 ft 1 in)', promptText: 'standing height 155 cm (5 feet 1 inch), petite proportion' },
  { id: '160_cm', emoji: '📏', labelMm: '၁၆၀ cm (၅ ပေ ၃ လက်)', labelEn: '160 cm (5 ft 3 in)', promptText: 'standing height 160 cm (5 feet 3 inches), graceful compact proportion' },
  { id: '165_cm', emoji: '📏', labelMm: '၁၆၅ cm (၅ ပေ ၅ လက်)', labelEn: '165 cm (5 ft 5 in)', promptText: 'standing height 165 cm (5 feet 5 inches), balanced natural height' },
  { id: '170_cm', emoji: '📏', labelMm: '၁၇၀ cm (၅ ပေ ၇ လက်)', labelEn: '170 cm (5 ft 7 in)', promptText: 'standing height 170 cm (5 feet 7 inches), slender tall model proportion' },
  { id: '175_cm', emoji: '📏', labelMm: '၁၇၅ cm (၅ ပေ ၉ လက်)', labelEn: '175 cm (5 ft 9 in)', promptText: 'standing height 175 cm (5 feet 9 inches), statuesque tall posture' },
  { id: '180_cm', emoji: '📏', labelMm: '၁၈၀ cm (၆ ပေ)', labelEn: '180 cm (6 ft 0 in)', promptText: 'standing height 180 cm (6 feet 0 inches), tall commanding physique' },
  { id: '185_cm', emoji: '📏', labelMm: '၁၈၅ cm (၆ ပေ ၁ လက်)', labelEn: '185 cm (6 ft 1 in)', promptText: 'standing height 185 cm (6 feet 1 inch), athletic tall stature' },
  { id: '190_cm', emoji: '📏', labelMm: '၁၉၀ cm (၆ ပေ ၃ လက်)', labelEn: '190 cm (6 ft 3 in)', promptText: 'standing height 190 cm (6 feet 3 inches), prominent tall stature' },
  { id: '195_plus_cm', emoji: '📏', labelMm: 'Extra Tall (၁၉၅ cm+)', labelEn: 'Extra Tall (195+ cm / 6 ft 5 in+)', promptText: 'standing extra tall height 195+ cm (6 feet 5 inches and above), towering stature' },
];

export const WEIGHT_OPTIONS: WeightOption[] = [
  { id: '45_kg', emoji: '⚖️', labelMm: '၄၅ kg (၉၉ ပေါင်)', labelEn: '45 kg (99 lbs)', promptText: 'body weight 45 kg (99 lbs), slim slender petite build' },
  { id: '50_kg', emoji: '⚖️', labelMm: '၅၀ kg (၁၁၀ ပေါင်)', labelEn: '50 kg (110 lbs)', promptText: 'body weight 50 kg (110 lbs), slender graceful proportion' },
  { id: '55_kg', emoji: '⚖️', labelMm: '၅၅ kg (၁၂၁ ပေါင်)', labelEn: '55 kg (121 lbs)', promptText: 'body weight 55 kg (121 lbs), natural balanced slim-fit physique' },
  { id: '60_kg', emoji: '⚖️', labelMm: '၆၀ kg (၁၃၂ ပေါင်)', labelEn: '60 kg (132 lbs)', promptText: 'body weight 60 kg (132 lbs), healthy toned balanced body' },
  { id: '65_kg', emoji: '⚖️', labelMm: '၆၅ kg (၁၄၃ ပေါင်)', labelEn: '65 kg (143 lbs)', promptText: 'body weight 65 kg (143 lbs), fit athletic well-proportioned frame' },
  { id: '70_kg', emoji: '⚖️', labelMm: '၇၀ kg (၁၅၄ ပေါင်)', labelEn: '70 kg (154 lbs)', promptText: 'body weight 70 kg (154 lbs), sturdy athletic build' },
  { id: '75_kg', emoji: '⚖️', labelMm: '၇၅ kg (၁၆၅ ပေါင်)', labelEn: '75 kg (165 lbs)', promptText: 'body weight 75 kg (165 lbs), solid strong physique' },
  { id: '80_kg', emoji: '⚖️', labelMm: '၈၀ kg (၁၇၆ ပေါင်)', labelEn: '80 kg (176 lbs)', promptText: 'body weight 80 kg (176 lbs), robust muscular build' },
  { id: '85_kg', emoji: '⚖️', labelMm: '၈၅ kg (၁၈၇ ပေါင်)', labelEn: '85 kg (187 lbs)', promptText: 'body weight 85 kg (187 lbs), powerful broad build' },
  { id: '90_kg', emoji: '⚖️', labelMm: '၉၀ kg (၁၉၈ ပေါင်)', labelEn: '90 kg (198 lbs)', promptText: 'body weight 90 kg (198 lbs), heavyweight powerful muscular frame' },
  { id: '95_plus_kg', emoji: '⚖️', labelMm: 'Heavy Build (၉၅ kg+)', labelEn: 'Heavy Build (95+ kg / 209+ lbs)', promptText: 'heavy build body weight 95+ kg (209+ lbs), heavy robust solid stature' },
];

export const IDENTITY_LOCK_OPTIONS = [
  { id: 'face_100', emoji: '🔒', labelMm: '1. Face Lock 100% (မျက်နှာ တစ်ထပ်တည်း ထိန်းသိမ်းမည်)', labelEn: '1. Face Lock 100% (Exact Identity Preservation)', descMm: 'မူရင်းရုပ် ပုံစံ၊ မျက်လုံး၊ နှာခေါင်း၊ နှုတ်ခမ်း 100% တူညီအောင် မပြောင်းလဲဘဲ ထိန်းထားမည်' },
  { id: 'face_body_lock', emoji: '🧘', labelMm: '2. Face + Body Lock (မျက်နှာ + ခန္ဓာကိုယ် အချိုးအစား ထိန်းမည်)', labelEn: '2. Face + Body Lock (Identity & Body Proportion)', descMm: 'မျက်နှာအသွင်အပြင် အပြင် ခန္ဓာကိုယ် အချိုးအစား၊ အရပ်အမောင်းနှင့် အရေပြားအရောင်ပါ ထိန်းထားမည်' },
  { id: 'soft_ref', emoji: '🎨', labelMm: '3. Soft Reference (အနည်းငယ် ပြောင်းလဲခွင့်ပြုမည်)', labelEn: '3. Soft Reference (Flexible Feature Adaptation)', descMm: 'မူရင်းရုပ် ရုပ်ဆင်မှုကို အခြေခံ၍ စတိုင်လ်နှင့် အလင်းအမှောင်အလိုက် သဘာဝကျကျ အနည်းငယ် ပြောင်းလဲမည်' },
  { id: 'no_lock', emoji: '✨', labelMm: '4. No Lock (လွတ်လပ်စွာ ထုတ်မည်)', labelEn: '4. No Lock (Unrestricted Creative Generation)', descMm: 'မူရင်းရုပ်ကို မထိန်းဘဲ Prompt စာသားအတိုင်း အသစ်စက်စက် ဖန်တီးမည်' },
];

export const PRESET_TEMPLATES: PresetTemplate[] = [
  {
    id: 'portrait_reference_img2img',
    titleMm: 'အလှပုံ ရည်ညွှန်းပုံ (Img2Img)',
    titleEn: 'Portrait Enhancement Reference Photo',
    mode: 'img2img',
    emoji: '🖼️',
    previewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    selection: {
      subject: 'woman',
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
      garmentFabric: 'Woven Silk with Water Droplet Highlights'
    }
  },
  {
    id: 'thadingyut_light_sanctuary',
    titleMm: 'သီတင်းကျွတ် မီးထွန်းပွဲ ဖန်တီးမှု',
    titleEn: 'Thadingyut Lanterns Creation (Txt2Img)',
    mode: 'txt2img',
    emoji: '✨',
    previewUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    selection: {
      subject: 'couple',
      event: 'thadingyut',
      location: 'shwedagon_view',
      timeAndLighting: 'candle_glow',
      camera: 'hasselblad_h6d',
      retouching: 'ultra_realism',
      makeup: 'natural_glam',
      colorGrade: 'kodak_portra',
      aspectRatio: '4:5',
      qualityProfile: '8k_uhd',
      garmentStyle: 'silk_longyi',
      garmentFabric: 'Royal Gold Silk Cheik'
    }
  },
  {
    id: 'high_fashion_vogue',
    titleMm: 'မဂ္ဂဇင်း ဖက်ရှင် ဝတ်စုံလဲ',
    titleEn: 'Haute Couture Clothes Swap',
    mode: 'clothes-swap',
    emoji: '👗',
    previewUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=800&auto=format&fit=crop',
    selection: {
      subject: 'woman',
      event: 'met_gala',
      location: 'high_fashion_runway',
      timeAndLighting: 'soft_studio',
      camera: 'leica_m11',
      retouching: 'high_fashion',
      makeup: 'hollywood_red',
      colorGrade: 'teal_orange',
      aspectRatio: '3:4',
      qualityProfile: 'award_photo',
      garmentStyle: 'evening_gown',
      garmentFabric: 'Heavy Satin & Swarovski Crystals'
    }
  },
  {
    id: 'golden_hour_background_only',
    titleMm: 'ကမ်းခြေ နေဝင်ချိန် နောက်ခံထုတ်',
    titleEn: 'Beach Sunset Studio Background Only',
    mode: 'background-only',
    emoji: '🌄',
    previewUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop',
    selection: {
      subject: 'couple',
      event: 'sunset_party',
      location: 'tropical_beach',
      timeAndLighting: 'golden_hour',
      camera: 'canon_eos_r3',
      retouching: 'ultra_realism',
      makeup: 'no_makeup',
      colorGrade: 'fuji_pro_400h',
      aspectRatio: '16:9',
      qualityProfile: '8k_uhd'
    }
  }
];

// --- COUPLE SPECIFIC DETAILED PRESETS ---

export const COUPLE_POSES_OPTIONS = [
  { id: 'hand_in_hand', emoji: '👩‍❤️‍👨', labelMm: 'လက်ချင်းတွဲလျက် လမ်းလျှောက်နေပုံ', labelEn: 'Walking Hand in Hand', promptText: 'couple holding hands intimately while walking together gracefully' },
  { id: 'warm_embrace', emoji: '🤗', labelMm: 'တစ်ယောက်ကိုတစ်ယောက် ချစ်ခင်စွာ ပွေ့ဖက်ထားပုံ', labelEn: 'Warm Loving Embrace', promptText: 'loving couple hugging tightly with genuine warm affection' },
  { id: 'eye_contact_smile', emoji: '👁️', labelMm: 'မျက်လုံးချင်းဆုံကာ သာယာစွာ ပြုံးပြနေပုံ', labelEn: 'Eye-to-Eye Soft Gazing Smile', promptText: 'couple making deep affectionate eye contact with gentle radiant smiles' },
  { id: 'head_on_shoulder', emoji: '💆‍♀️', labelMm: 'ပခုံးပေါ် ခေါင်းမှီလျက် အနားယူနေပုံ', labelEn: 'Head Resting on Shoulder', promptText: 'bride leaning head softly on groom\'s shoulder peacefully' },
  { id: 'ring_exchange', emoji: '💍', labelMm: 'လက်စွပ် စွပ်ပေးနေသည့် အမှတ်တရ ပုံရိုက်ချက်', labelEn: 'Exchanging Engagement Ring', promptText: 'groom placing a diamond wedding ring on bride\'s finger in close-up shot' },
  { id: 'sitting_together', emoji: '🪑', labelMm: 'ကမ်းခြေ / ပန်းခြံတွင် အတူတကွ ထိုင်နေပုံ', labelEn: 'Sitting Together Romantic Pose', promptText: 'couple sitting side by side cozy and comfortable in serene outdoor setting' },
  { id: 'romantic_dance', emoji: '💃', labelMm: 'မင်္ဂလာဆောင် ကပွဲ / ရိုမန်းတစ် ကနေဟန်', labelEn: 'First Dance Romantic Pose', promptText: 'couple slow dancing intimately with romantic posture' },
  { id: 'gentle_kiss', emoji: '💋', labelMm: 'ပါးပြင် / နဖူးကို မြတ်နိုးစွာ နမ်းရှုံ့နေဟန်', labelEn: 'Gentle Forehead or Cheek Kiss', promptText: 'groom kissing bride gently on the forehead with loving reverence' },
  { id: 'back_to_back', emoji: '👥', labelMm: 'ဘက်ခ်လိုက် ပခုံးချင်းမှီကာ နောက်ကျောပေး ရိုက်ချက်', labelEn: 'Back-to-Back Shoulder Lean', promptText: 'couple leaning back to back stylishly turning heads toward camera with subtle smile' },
  { id: 'vehicle_boat_ride', emoji: '🛶', labelMm: 'စက်ဘီး / လှေပေါ်တွင် အတူတကွ ပျော်ရွှင်စွာ ပို့စ်ပေးနေပုံ', labelEn: 'Tandem Ride / Flower Boat Pose', promptText: 'couple riding together smiling joyfully enjoying the scenic moment' },
];

export const GROOM_OUTFIT_OPTIONS = [
  // မြန်မာ့ / ရိုးရာ မင်္ဂလာဝတ်စုံများ
  { id: 'groom_gold_full_set', emoji: '👑', labelMm: 'ရွှေအိုရောင် မင်္ဂလာဝတ်စုံအပြည့် (ခေါင်းပေါင်း၊ တိုက်ပုံ၊ ချိတ်ပုဆိုး)', labelEn: 'Full Golden Amber Traditional Groom Set', promptText: 'groom wearing royal golden amber full traditional wedding suit with silk gaung baung turban, embroidered taikpong jacket, and acheik longyi' },
  { id: 'groom_traditional_gold', emoji: '✨', labelMm: 'မြန်မာ့ရိုးရာ ရွှေချည်ထိုး သတို့သား ဝတ်စုံ', labelEn: 'Myanmar Gold Embroidered Groom Suit', promptText: 'groom wearing royal golden embroidered silk taikpong jacket, cream silk longyi, and formal gold-trimmed gaung baung' },
  { id: 'groom_palace_taikpong', emoji: '🏛️', labelMm: 'နန်းတွင်းသတို့သား မင်္ဂလာတိုက်ပုံ', labelEn: 'Royal Palace Groom Wedding Taikpong', promptText: 'groom wearing royal court style traditional Myanmar wedding taikpong jacket with silk longyi' },
  { id: 'groom_velvet_gold_taikpong', emoji: '👑', labelMm: 'ကတ္တီပါရွှေခြည်ထိုး သတို့သား တိုက်ပုံ', labelEn: 'Velvet Gold Thread Embroidered Groom Taikpong', promptText: 'groom wearing luxurious royal velvet gold thread embroidered taikpong jacket with woven silk longyi' },
  { id: 'groom_shan_silk', emoji: '🎋', labelMm: 'ရှမ်းရိုးရာ မင်္ဂလာပိုးအင်္ကျီ', labelEn: 'Shan Traditional Wedding Silk Jacket', promptText: 'groom wearing traditional Shan ethnic wedding silk jacket with handwoven patterns and turban' },
  { id: 'groom_chinese_gold', emoji: '🏮', labelMm: 'တရုတ်ရိုးရာ ရွှေကြိုးထိုး မင်္ဂလာအင်္ကျီ', labelEn: 'Traditional Chinese Gold Thread Wedding Jacket', promptText: 'groom wearing traditional red Chinese wedding dragon suit with gold thread embroidery' },

  // အနောက်တိုင်း မင်္ဂလာ ဝတ်စုံများ (Western Groom Wear)
  { id: 'groom_royal_tuxedo', emoji: '👑', labelMm: 'တော်ဝင် တက်ဆီးဒို့ (Royal Tuxedo)', labelEn: 'Royal Tuxedo', promptText: 'groom wearing regal royal black tuxedo with satin lapel, crisp white dress shirt, and black bowtie' },
  { id: 'groom_highclass_tuxedo', emoji: '🤵', labelMm: 'အထက်တန်းစား တက်ဆီးဒို့', labelEn: 'High-Class Luxury Tuxedo', promptText: 'groom wearing high-class tailored luxury tuxedo suit with satin lapel' },
  { id: 'groom_lightblue_3piece', emoji: '👔', labelMm: '၃ မျိုးစပ် ရေပြာရောင် မင်္ဂလာ ကုတ်အင်္ကျီ', labelEn: '3-Piece Light Blue Wedding Suit', promptText: 'groom wearing 3-piece light blue wedding suit with vest, tie, and trousers' },
  { id: 'groom_emerald_velvet_tux', emoji: '💚', labelMm: 'မြကတ္တီပါ တက်ဆီးဒို့', labelEn: 'Emerald Velvet Tuxedo', promptText: 'groom wearing rich emerald green velvet tuxedo jacket with dark satin lapels and black bowtie' },
  { id: 'groom_maroon_velvet_suit', emoji: '🍷', labelMm: 'နီညိုရောင် ကတ္တီပါသတို့သား ကုတ်အင်္ကျီ', labelEn: 'Maroon Velvet Groom Suit Jacket', promptText: 'groom wearing elegant maroon burgundy velvet groom suit jacket with black bowtie' },
  { id: 'groom_modern_suit', emoji: '💼', labelMm: 'ခေတ်မီသတို့သား ကုတ်အင်္ကျီ', labelEn: 'Modern Groom Suit Jacket', promptText: 'groom wearing sleek modern tailored groom suit jacket with pocket square' },
  { id: 'groom_gold_floral_tux', emoji: '✨', labelMm: 'ရွှေအိုရောင် ပန်းပွင့်ဒီဇိုင်းပါ တက်ဆီးဒို့', labelEn: 'Golden Amber Floral Pattern Tuxedo', promptText: 'groom wearing golden amber tuxedo jacket with subtle floral brocade pattern and black satin lapel' },
  { id: 'groom_double_breasted', emoji: '🧥', labelMm: 'ကြယ်သီးနှစ်တန်းပါ သတို့သား ဝတ်စုံ', labelEn: 'Double-Breasted Groom Suit', promptText: 'groom wearing classic double-breasted formal groom suit' },
  { id: 'groom_royal_tailcoat', emoji: '👑', labelMm: 'တော်ဝင်မြီးရှည် အနောက်တိုင်း အခမ်းအနား ဝတ်စုံ', labelEn: 'Royal Tailcoat Formal Western Suit', promptText: 'groom wearing opulent royal tailcoat tuxedo for ultra-formal grand wedding ceremony' },
  { id: 'groom_white_dinner_jacket', emoji: '🤍', labelMm: 'အဖြူရောင် ဒင်နာပွဲတက် ဂျာကင်', labelEn: 'White Dinner Party Jacket', promptText: 'groom wearing crisp white dinner jacket with black bow tie, white pocket square, and dark trousers' },

  // ပေါ့ပေါ့ပါးပါးနှင့် အခြား ဝတ်စုံများ
  { id: 'groom_casual_linen', emoji: '👕', labelMm: 'ပေါ့ပေါ့ပါးပါး ရှပ်အင်္ကျီနှင့် ဘောင်းဘီရှည်', labelEn: 'Casual Linen Shirt & Trousers', promptText: 'groom wearing relaxed unbuttoned beige linen shirt and dark trousers' },
  { id: 'groom_vintage_denim', emoji: '👖', labelMm: 'ဗင်းတေ့ချ် ဂျင်းဂျာကင်နှင့် လမ်းဘေး စတိုင်လ်', labelEn: 'Vintage Retro Denim Jacket & Jeans', promptText: 'groom wearing cool vintage denim jacket over plain white tee' },
  { id: 'groom_cafe_polo', emoji: '☕', labelMm: 'ကော်ဖီဆိုင် / ခရီးသွား ပေါ့ပေါ့ပါးပါး Polo/Sweater', labelEn: 'Aesthetic Cafe Knit Sweater / Polo', promptText: 'groom wearing cozy pastel knit sweater and beige chinos' },
  { id: 'groom_beach_shirt', emoji: '🏖️', labelMm: 'ကမ်းခြေ သဘာဝ ပိုးရှပ်အင်္ကျီ ပေါ့ပေါ့ပါးပါး', labelEn: 'Resort Beach Linen Shirt', promptText: 'groom wearing breezy white short-sleeve resort linen shirt' },
];

export const GROOM_TOP_OPTIONS = [
  { id: 'groom_white_shirt', emoji: '👔', labelMm: 'အဖြူရောင် ရှပ်အင်္ကျီ (Formal White Shirt)', labelEn: 'Crisp Formal White Shirt', promptText: 'groom wearing crisp tailored white button-up dress shirt' },
  { id: 'groom_linen_shirt', emoji: '👕', labelMm: 'ပေါ့ပေါ့ပါးပါး လင်းနင် ရှပ် (Casual Linen Shirt)', labelEn: 'Casual Linen Shirt', promptText: 'groom wearing relaxed beige linen shirt' },
  { id: 'groom_plain_tee', emoji: '👕', labelMm: 'တီရှပ် အဖြူ/အနက် (Minimalist Plain T-Shirt)', labelEn: 'Plain Cotton T-Shirt', promptText: 'groom wearing clean fitted plain t-shirt' },
  { id: 'groom_denim_jacket', emoji: '🧥', labelMm: 'ဂျင်း ဂျာကင် (Denim Jacket)', labelEn: 'Vintage Denim Jacket', promptText: 'groom wearing classic vintage denim jacket over plain tee' },
  { id: 'groom_polo_shirt', emoji: '👕', labelMm: 'ပိုလို ရှပ်အင်္ကျီ (Smart Casual Polo Shirt)', labelEn: 'Smart Polo Shirt', promptText: 'groom wearing fitted pastel polo shirt' },
  { id: 'groom_knit_sweater', emoji: '🧶', labelMm: 'စဝေတာ / ကာဒီဂန် (Cozy Knit Sweater / Cardigan)', labelEn: 'Cozy Knit Sweater', promptText: 'groom wearing soft aesthetic knit sweater' },
  { id: 'groom_taikpong_top', emoji: '👑', labelMm: 'မြန်မာ့ရိုးရာ တိုက်ပုံအင်္ကျီ (Myanmar Taikpong Top)', labelEn: 'Traditional Myanmar Taikpong Jacket', promptText: 'groom wearing elegant silk taikpong jacket' },
  { id: 'groom_ethnic_top', emoji: '🎋', labelMm: 'တိုင်းရင်းသား ရိုးရာ အင်္ကျီ (Ethnic Traditional Top)', labelEn: 'Ethnic Traditional Shirt', promptText: 'groom wearing handwoven Myanmar ethnic traditional shirt' },
];

export const GROOM_BOTTOM_OPTIONS = [
  { id: 'groom_silk_longyi', emoji: '👑', labelMm: 'မြန်မာ့ရိုးရာ ပိုးပုဆိုး (Myanmar Silk Longyi)', labelEn: 'Myanmar Silk Longyi', promptText: 'groom wearing traditional Myanmar silk longyi' },
  { id: 'groom_dress_trousers', emoji: '👖', labelMm: 'ဘောင်းဘီရှည် စမတ်ကျကျ (Smart Dress Trousers)', labelEn: 'Tailored Dress Trousers', promptText: 'groom wearing sharp tailored trousers' },
  { id: 'groom_denim_jeans', emoji: '👖', labelMm: 'ဂျင်းဘောင်းဘီ (Classic Denim Jeans)', labelEn: 'Classic Denim Jeans', promptText: 'groom wearing classic blue denim jeans' },
  { id: 'groom_chino_pants', emoji: '👖', labelMm: 'ခါကီ / စိနိုး ဘောင်းဘီ (Casual Chino Pants)', labelEn: 'Beige Chino Trousers', promptText: 'groom wearing beige chino trousers' },
  { id: 'groom_resort_shorts', emoji: '🩳', labelMm: 'ကမ်းခြေ ဘောင်းဘီတို (Resort Summer Shorts)', labelEn: 'Resort Linen Shorts', promptText: 'groom wearing breezy linen shorts' },
];

export const GROOM_EXPRESSION_OPTIONS = [
  { id: 'gentle_eye_smile', emoji: '😊', labelMm: 'မျက်လုံးအကြည့် နူးညံ့စွာ ပြုံးနေသော အပြုံး', labelEn: 'Gentle Loving Smile with Eye Contact', promptText: 'groom having a gentle loving warm smile with soft eye contact' },
  { id: 'confident_handsome', emoji: '😎', labelMm: 'စမတ်ကျပြီး ယုံကြည်ချက်ရှိသော အပြုံး', labelEn: 'Confident Handsome Smile', promptText: 'groom with a confident handsome masculine smile' },
  { id: 'overjoyed_wedding', emoji: '😁', labelMm: 'ကြည်နူးဝမ်းမြောက်သော မင်္ဂလာအပြုံး', labelEn: 'Overjoyed Happy Wedding Smile', promptText: 'groom beaming with immense joyful happiness' },
  { id: 'regal_calm', emoji: '👑', labelMm: 'တည်ငြိမ်ခန့်ညားသော အကြည့်', labelEn: 'Regal Calm & Noble Gaze', promptText: 'groom displaying a poised calm dignified gaze' },
  { id: 'adoring_bride_look', emoji: '😍', labelMm: 'ချစ်သူကို မြတ်နိုးစွာ ငေးကြည့်နေသော အကြည့်', labelEn: 'Adoring Loving Gaze at Bride', promptText: 'groom gazing adoringly at bride with affectionate devotion' },
  { id: 'candid_laughter', emoji: '😄', labelMm: 'ရယ်မောပျော်ရွှင်နေသော သဘာဝ အပြုံး', labelEn: 'Candid Cheerful Natural Laughter', promptText: 'groom caught in mid-laugh with candid natural facial expression' },
];

export const GROOM_HAIR_OPTIONS = [
  { id: 'sharp_side_part', emoji: '✂️', labelMm: 'စမတ်ကျကျ အနောက်လှန် သပ်တင်ထားသော ဆံပင်', labelEn: 'Sharp Side-Parted Pompadour', promptText: 'groom with neatly styled side-part pompadour hair' },
  { id: 'korean_two_block', emoji: '💇‍♂️', labelMm: 'ခေတ်မှီ ကိုရီးယားစတိုင် နဖူးစည်း ဆံပင်', labelEn: 'Modern Korean Two-Block Combed Hair', promptText: 'groom with trendy modern Korean style soft textured fringe hair' },
  { id: 'traditional_gaung_baung', emoji: '👳‍♂️', labelMm: 'မြန်မာ့ရိုးရာ ခေါင်းပေါင်း ပေါင်းထားသော စတိုင်', labelEn: 'Myanmar Traditional Gaung Baung Turban', promptText: 'groom wearing traditional silk gaung baung headwear draped neatly' },
  { id: 'natural_textured_crop', emoji: '🌿', labelMm: 'သဘာဝအတိုင်း ပေါ့ပေါ့ပါးပါး စတိုင်လ်', labelEn: 'Natural Short Textured Crop', promptText: 'groom with natural short textured crop hairstyle' },
  { id: 'classic_slick_back', emoji: '💈', labelMm: 'ဗင်းတေ့ချ် ဂန္ထဝင် ဆံပင်စတိုင်', labelEn: 'Classic Vintage Slick Back', promptText: 'groom with smooth slicked-back vintage hair' },
  { id: 'short_clean_fade', emoji: '✨', labelMm: 'အတိုစမတ်ကျ စတူဒီယို ဆံပင်စတိုင်', labelEn: 'Clean Short Studio Taper Fade', promptText: 'groom with sharp clean short taper fade haircut' },
];

export const GROOM_ACCESSORY_PRESETS = [
  // ရိုးရာနှင့် မင်္ဂလာ အသုံးအဆောင်များ
  { labelMm: 'မင်္ဂလာခေါင်းပေါင်း ပေါင်းထား', promptText: 'wearing traditional Myanmar silk gaung baung headwear' },
  { labelMm: 'ရှမ်းရိုးရာ ခေါင်းပေါင်း', promptText: 'wearing Shan traditional woven headwear' },
  { labelMm: 'သစ်ခွဂွံထိုးပန်း တပ်ထား', promptText: 'wearing orchid flower brooch pin' },
  { labelMm: 'မင်္ဂလာ ရင်ထိုးနှင်းဆီးဖြူ ထိုးထား', promptText: 'wearing a white rose wedding boutonniere lapel pin' },
  { labelMm: 'မင်္ဂလာ ပဝါ/လွယ်ကြိုး လွယ်ထား', promptText: 'draped with traditional silk wedding scarf ribbon sash' },
  { labelMm: 'မင်္ဂလာ ပန်းကုံး ဆွဲထား', promptText: 'adorned with fresh jasmine garland around neck' },
  { labelMm: 'မင်္ဂလာ လက်စွပ်ဘူး ပွင့်လျက် ကိုင်ထားဟန်', promptText: 'holding an open velvet ring box presenting engagement ring' },
  { labelMm: 'မင်္ဂလာ လက်စွပ် ဝတ်ထား', promptText: 'wearing a gold wedding ring on finger' },
  
  // အသုံးအဆောင်များနှင့် အပိုပစ္စည်းများ
  { labelMm: 'ဖယောင်းတိုင်မီး', promptText: 'holding a warm glowing ceremonial candle' },
  { labelMm: 'ရှေးဟောင်း မီးအိမ်', promptText: 'holding a vintage brass lantern' },
  { labelMm: 'စမတ်နာရီ', promptText: 'wearing a sleek modern smartwatch' },
  { labelMm: 'လက်ပတ်နာရီ', promptText: 'wearing a luxury metallic wristwatch' },
  { labelMm: 'နေကာမျက်မှန်', promptText: 'wearing dark stylish aviator sunglasses' },
  { labelMm: 'မျက်မှန်', promptText: 'wearing modern round wireframe eyeglasses' },
  { labelMm: 'ဦးထုပ်', promptText: 'wearing a stylish fedora hat or cap' },
  { labelMm: 'ဘေးလွယ်အိတ်', promptText: 'slung with a stylish crossbody messenger bag' },
  { labelMm: 'အိတ်ကပ်ပါ', promptText: 'carrying a stylish designer bag with handles' },
  { labelMm: 'ရှမ်းပိန်းနက် ကိုင်ထားဟန်', promptText: 'holding traditional ceremonial Shan parasol umbrella' },
  
  // ပါတီနှင့် ပွဲတက် အသုံးအဆောင်များ
  { labelMm: 'ရှမ်ပိန်ခွက် ကိုင်ထားဟန်', promptText: 'holding a sparkling champagne flute glass in celebration pose' },
  { labelMm: 'မီးပန်းပါ ရှမ်ပိန်ပုလင်း ကိုင်ထားဟန်', promptText: 'holding a popping champagne bottle with sparkler fireworks' },
  { labelMm: 'နီယွန် LED ပါတီမျက်မှန် တပ်လျက်', promptText: 'wearing glowing neon LED party glasses' },
  { labelMm: 'နီယွန် အလင်းတုတ် ကိုင်ထားဟန်', promptText: 'holding glowing neon glow light stick' },
  { labelMm: 'ပါတီ မျက်နှာဖုံး ဝတ်လျက်', promptText: 'wearing elegant masquerade party mask' },
  { labelMm: 'စလွယ် လွယ်ထားဟန်', promptText: 'wearing traditional ceremonial pageant sash' },
  { labelMm: 'ပြိုင်ပွဲဝင် ရင်ထိုးဝတ်ထားဟန်', promptText: 'wearing competition contest ribbon badge pin' },
  
  // တော်ဝင်နှင့် ဇာတ်ကောင် ဟန်ပန်များ
  { labelMm: 'ဒဏ္ဍာရီ မင်းသားဝတ်စုံ ဝတ်ဆင်ထားဟန်', promptText: 'adorned in mythical prince royal ceremonial costume pose' },
  { labelMm: 'တော်ဝင်မင်းသား ငွေရောင် ခေါင်းစည်း ဝတ်ဆင်ထားဟန်', promptText: 'wearing royal prince silver crown circlet headband' },
  
  // ယာဉ်နှင့် အရာဝတ္ထု ဟန်ပန် ပရိုဆက်များ
  { labelMm: 'အရာဝတ္ထု/ယာဉ် ထဲတွင် ထိုင်နေဟန်', promptText: 'seated elegantly inside vintage luxury car or vehicle' },
  { labelMm: 'အရာဝတ္ထု/မြင်း/စက်ဘီး ပေါ်တွင် စီးနင်း/ထိုင်နေဟန်', promptText: 'riding/sitting on top of horse, bicycle, or classic vehicle' },
  { labelMm: 'အရာဝတ္ထု/ယာဉ် ဘေးတွင် မှီရပ်နေဟန်', promptText: 'leaning stylishly against shiny retro automobile or structure' },
  { labelMm: 'အရာဝတ္ထု/ယာဉ် နားတွင် တံခါး/ဇက်ကြိုး ကိုင်ရပ်နေဟန်', promptText: 'standing next to vehicle holding open door or horse reins' },
];

export const BRIDE_OUTFIT_OPTIONS = [
  // မြန်မာ့ / ရိုးရာ မင်္ဂလာဝတ်စုံများ
  { id: 'bride_gold_full_set', emoji: '👑', labelMm: 'ရွှေအိုရောင် ဇာ/စိန်ပုထိုး မင်္ဂလာ ဝတ်စုံအပြည့် (အမြီးဆွဲ ထမီ၊ ပဝါရှည်နှင့် ဆံထုံး)', labelEn: 'Full Golden Amber Lace/Diamond Embroidered Bridal Set with Train', promptText: 'bride wearing opulent golden amber lace and diamond-embroidered full traditional wedding gown with long trailing train longyi, sheer silk shawl, and traditional flower updo' },
  { id: 'bride_gold_htaingmathein', emoji: '✨', labelMm: 'ရွှေခြည်ထိုး ထိုင်မသိမ်းအင်္ကျီ', labelEn: 'Gold-Embroidered Htaingmathein Dress', promptText: 'bride wearing exquisite traditional gold-thread embroidered htaingmathein blouse with matching silk acheik longyi' },
  { id: 'bride_palace_blouse', emoji: '🏛️', labelMm: 'နန်းတွင်း သတို့သမီးအင်္ကျီ', labelEn: 'Royal Court Palace Bridal Blouse', promptText: 'bride wearing authentic royal court style traditional Myanmar bridal blouse with golden sequins and lace' },
  { id: 'bride_maroon_velvet_htaingmathein', emoji: '👑', labelMm: 'ကတ္တီပါ နီညိုရောင် ရွှေခြည်ထိုး ထိုင်မသိမ်းအင်္ကျီ', labelEn: 'Maroon Velvet Gold-Embroidered Htaingmathein', promptText: 'bride wearing luxurious maroon burgundy velvet gold-thread embroidered htaingmathein dress' },
  { id: 'bride_pearl_sequin_lace', emoji: '✨', labelMm: 'ဇာအင်္ကျီ ပုလဲနှင့် စီးကွင့်ပါ သတို့သမီးအင်္ကျီ', labelEn: 'Lace Blouse with Pearls & Sequins', promptText: 'bride wearing delicate lace bridal blouse embellished with sparkling pearls and shiny sequins' },
  { id: 'bride_sheer_silk_blouse', emoji: '🌸', labelMm: 'ပိုးဇာ ပါးပါး ရင်ဖုံး သတို့သမီး အင်္ကျီ', labelEn: 'Sheer Silk Side-Wrapped Bridal Blouse', promptText: 'bride wearing soft sheer silk lace side-wrapped Myanmar bridal blouse' },
  { id: 'bride_royal_palace_attire', emoji: '👑', labelMm: 'နန်းတွင်း တော်ဝင် မင်္ဂလာဝတ်စုံ', labelEn: 'Royal Palace Regal Wedding Attire', promptText: 'bride in lavish Konbaung royal princess attire with golden peacock velvet cape and royal jewels' },
  { id: 'bride_shan_royal_silk', emoji: '🎋', labelMm: 'ရှမ်းရိုးရာ တော်ဝင် သတို့သမီး ပိုးအင်္ကျီ', labelEn: 'Shan Royal Bridal Silk Outfit', promptText: 'bride wearing royal Shan ethnic traditional bridal silk blouse and handwoven pattern longyi' },
  { id: 'bride_rakhine_bridal_silk', emoji: '🌺', labelMm: 'ရခိုင်ရိုးရာ သတို့သမီး မင်္ဂလာပိုးအင်္ကျီ', labelEn: 'Rakhine Traditional Bridal Silk Outfit', promptText: 'bride wearing authentic Rakhine traditional bridal silk outfit with ornate silver hairpins and jewelry' },
  { id: 'bride_mon_bridal_silk', emoji: '🌸', labelMm: 'မွန်ရိုးရာ သတို့သမီး မင်္ဂလာပိုးအင်္ကျီ', labelEn: 'Mon Traditional Bridal Silk Outfit', promptText: 'bride wearing traditional Mon ethnic bridal silk blouse with ornate longyi' },
  { id: 'bride_contemporary_silk', emoji: '✨', labelMm: 'ခေတ်ပြိုင် ရိုးရာပိုး မင်္ဂလာ အပေါ်ဝတ်စုံ', labelEn: 'Contemporary Traditional Silk Wedding Attire', promptText: 'bride wearing modern contemporary Myanmar traditional silk wedding ensemble with elegant overcoat' },

  // အနောက်တိုင်း မင်္ဂလာ ဂါဝန်များ (Western Bridal Wear)
  { id: 'bride_western_royal_gown', emoji: '👰', labelMm: 'တော်ဝင်မင်္ဂလာဝတ်စုံ (Western Royal Wedding Gown)', labelEn: 'Western Royal Wedding Gown', promptText: 'bride wearing romantic sweeping white lace ballgown wedding dress with long trailing veil and pearl embroidery' },
  { id: 'bride_longsleeve_satin_gown', emoji: '✨', labelMm: 'လက်ရှည် ဇာပါ ပိုးဆာတင် မင်္ဂလာ', labelEn: 'Long-Sleeve Lace Satin Wedding Gown', promptText: 'bride wearing elegant long-sleeve lace and premium silk satin bridal gown' },
  { id: 'bride_mermaid_wedding_gown', emoji: '🧜‍♀️', labelMm: 'ငါးမြီးစတိုင် မင်္ဂလာဂါဝန်', labelEn: 'Mermaid Style Wedding Gown', promptText: 'bride wearing modern sleek satin mermaid silhouette wedding dress with trailing veil' },
  { id: 'bride_offshoulder_lace_gown', emoji: '👗', labelMm: 'ပုခုံးဖော် ဇာနု မင်္ဂလာ', labelEn: 'Off-Shoulder Delicate Lace Wedding Gown', promptText: 'bride wearing romantic off-the-shoulder delicate lace bridal gown with soft tulle skirt' },

  // ပွဲတက်နှင့် အခြား ဝတ်စုံများ
  { id: 'bride_evening_gown', emoji: '💃', labelMm: 'ခေတ်ပေါ် ညနေခင်း ပွဲတက် ဂါဝန်', labelEn: 'Glamorous Evening Party Gown', promptText: 'bride wearing dazzling satin evening gown with flowing train' },
  { id: 'bride_casual_dress', emoji: '👗', labelMm: 'ပေါက်ပေါ့ပါးပါး ဂါဝန်တို / စကတ် စတိုင်လ်', labelEn: 'Casual Floral Summer Dress', promptText: 'bride wearing breezy pastel floral sundress' },
  { id: 'bride_cafe_blouse', emoji: '☕', labelMm: 'ကော်ဖီဆိုင် / ခရီးသွား ပေါ့ပေါ့ပါးပါး အင်္ကျီနှင့် ဂျင်း', labelEn: 'Aesthetic Casual Chic Blouse & Jeans', promptText: 'bride wearing chic cream linen blouse and denim jeans' },
  { id: 'bride_vintage_silk', emoji: '🌺', labelMm: 'ဗင်းတေ့ချ် ရိုးရာ ပိုးအင်္ကျီနှင့် ထမီ', labelEn: 'Retro Vintage Silk Outfit', promptText: 'bride wearing classic 90s vintage Myanmar silk outfit' },
  { id: 'bride_boho_maxi', emoji: '🏖️', labelMm: 'ကမ်းခြေ ဘိုဟီမီယံ ဝတ်စုံ', labelEn: 'Boho Beach Resort Maxi Dress', promptText: 'bride wearing flowing boho white maxi dress' },
];

export const BRIDE_TOP_OPTIONS = [
  { id: 'bride_lace_blouse', emoji: '👚', labelMm: 'မြန်မာ့ရိုးရာ ဇာအင်္ကျီ / ပိုးအင်္ကျီ (Myanmar Silk / Lace Blouse)', labelEn: 'Myanmar Traditional Lace Blouse', promptText: 'bride wearing delicate lace embroidered traditional Myanmar blouse' },
  { id: 'bride_linen_blouse', emoji: '👚', labelMm: 'ပေါ့ပေါ့ပါးပါး လင်းနင် အင်္ကျီ (Casual Linen Blouse)', labelEn: 'Casual Linen Blouse', promptText: 'bride wearing chic cream linen blouse' },
  { id: 'bride_chic_crop_top', emoji: '👗', labelMm: 'စတိုင်ကျ တီရှပ် / Top (Chic Casual Top)', labelEn: 'Chic Casual Top', promptText: 'bride wearing elegant stylish casual top' },
  { id: 'bride_knit_sweater', emoji: '🧶', labelMm: 'စဝေတာ / ကာဒီဂန် (Cozy Knit Sweater / Cardigan)', labelEn: 'Cozy Knit Sweater', promptText: 'bride wearing soft cozy knit cardigan' },
  { id: 'bride_ethnic_blouse', emoji: '🌺', labelMm: 'တိုင်းရင်းသား ရိုးရာ အင်္ကျီ (Ethnic Traditional Blouse)', labelEn: 'Ethnic Traditional Blouse', promptText: 'bride wearing handwoven ethnic traditional top' },
];

export const BRIDE_BOTTOM_OPTIONS = [
  { id: 'bride_acheik_longyi', emoji: '👑', labelMm: 'မြန်မာ့ရိုးရာ အချိတ်ထမီ / ပိုးထမီ (Myanmar Acheik Silk Longyi)', labelEn: 'Myanmar Traditional Acheik Silk Longyi', promptText: 'bride wearing royal Myanmar gold embroidered silk acheik longyi' },
  { id: 'bride_maxi_skirt', emoji: '👗', labelMm: 'စကတ်ရှည် / မက်ဆီ စကတ် (Flowing Maxi Skirt)', labelEn: 'Flowing Maxi Skirt', promptText: 'bride wearing elegant flowing maxi skirt' },
  { id: 'bride_denim_jeans', emoji: '👖', labelMm: 'ဂျင်းဘောင်းဘီ / စတိုင်လ် ဘောင်းဘီ (Denim Jeans / Trousers)', labelEn: 'High-Waisted Denim Jeans', promptText: 'bride wearing high-waisted denim jeans' },
  { id: 'bride_casual_skirt', emoji: '👗', labelMm: 'စကတ်တို / ပလီးတက် စကတ် (Pleated Casual Skirt)', labelEn: 'Pleated Casual Skirt', promptText: 'bride wearing stylish pleated skirt' },
];

export const BRIDE_EXPRESSION_OPTIONS = [
  { id: 'soft_shy_smile', emoji: '😊', labelMm: 'နူးညံ့သိမ်မွေ့စွာ ပြုံးနေသော အပြုံး', labelEn: 'Soft Gentle & Shy Radiant Smile', promptText: 'bride displaying a soft gentle blushful radiant smile' },
  { id: 'joyful_wedding_smile', emoji: '😁', labelMm: 'ကြည်နူးဝမ်းမြောက်သော မင်္ဂလာအပြုံး', labelEn: 'Joyful Radiant Wedding Smile', promptText: 'bride smiling warmly with joyous gleaming eyes' },
  { id: 'confident_elegant', emoji: '👑', labelMm: 'ယုံကြည်မှုရှိပြီး လှပသော အပြုံး', labelEn: 'Confident Elegant Queen Smile', promptText: 'bride wearing a confident elegant serene expression' },
  { id: 'adoring_groom_look', emoji: '😍', labelMm: 'သတို့သားကို မြတ်နိုးစွာ ကြည့်နေသော အကြည့်', labelEn: 'Adoring Loving Look at Groom', promptText: 'bride looking up lovingly into groom\'s eyes with romantic devotion' },
  { id: 'captivating_natural', emoji: '✨', labelMm: 'ဆွဲဆောင်မှုရှိသော သဘာဝ အကြည့်', labelEn: 'Graceful Captivating Natural Eyes', promptText: 'bride making soft enchanting gaze toward camera' },
  { id: 'charming_laughter', emoji: '😄', labelMm: 'ချိုသာစွာ ရယ်မောနေသော အမူအရာ', labelEn: 'Sweet Charming Laughter', promptText: 'bride captured in a sweet charming spontaneous laugh' },
];

export const BRIDE_HAIR_OPTIONS = [
  { id: 'traditional_royal_updo', emoji: '🌸', labelMm: 'မြန်မာ့ရိုးရာ သံယောဇဉ် ဆံထုံးနှင့် ပန်းကုံး', labelEn: 'Myanmar Traditional Royal Updo with Fresh Flowers', promptText: 'bride with traditional Myanmar royal hair updo decorated with fragrant fresh jasmine garland and gold hairpins' },
  { id: 'bride_wedding_veil_updo', emoji: '👰', labelMm: 'မင်္ဂလာဆောင် သတို့သမီး ဆံထုံးကျစ်နှင့် ဇာပဝါ', labelEn: 'Elegant Bride Wedding Updo with Veil', promptText: 'bride with polished bridal updo wrapped with sheer white lace wedding veil' },
  { id: 'soft_shoulder_waves', emoji: '💇‍♀️', labelMm: 'ပခုံးပေါ် သဘာဝအတိုင်း ဝဲကျနေသော ဆံပင်', labelEn: 'Soft Waves Cascading Down Shoulders', promptText: 'bride with soft romantic wavy hair flowing down over shoulders' },
  { id: 'boho_braided_flower', emoji: '🌿', labelMm: 'ပန်းကန်းစည်းနှင့် ဘိုဟီမီယံ ဆံပင်', labelEn: 'Bohemian Braided Hair with Flower Crown', promptText: 'bride with soft boho braided hair decorated with delicate pastel flower tiara' },
  { id: 'modern_stylish_bob', emoji: '✨', labelMm: 'ခေတ်မှီ ဆံပင်အတို/အလတ် စတိုင်လ်', labelEn: 'Modern Stylish Medium Bob Cut', promptText: 'bride with stylish soft curled shoulder-length bob haircut' },
  { id: 'retro_finger_waves', emoji: '💈', labelMm: 'ဗင်းတေ့ချ် ရေလှိုင်း ဆံပင်စတိုင်', labelEn: 'Retro Vintage Finger Waves', promptText: 'bride with classic glam 1920s vintage finger wave hairstyle' },
];

export const BRIDE_ACCESSORY_PRESETS = [
  // မင်္ဂလာနှင့် ရိုးရာ အသုံးအဆောင်များ
  { labelMm: 'သတို့သမီး မင်္ဂလာ ပန်းစည်း ကိုင်ထား', promptText: 'holding a lush bouquet of fresh white roses and pastel peonies' },
  { labelMm: 'မင်္ဂလာ ဇာခေါင်းစည်း / ပဝါ ခြုံထား', promptText: 'draped with sheer lace bridal wedding veil' },
  { labelMm: 'မင်္ဂလာ ရွှေထီး / ပုသိမ်ထီး ဆောင်းထား', promptText: 'holding a traditional gold Pathein silk umbrella' },
  { labelMm: 'သစ်ခွဂွံထိုးပန်း တပ်ထား', promptText: 'wearing orchid flower brooch pin or hair blossom' },
  { labelMm: 'မင်္ဂလာ ရင်ထိုးနှင်းဆီးဖြူ ထိုးထား', promptText: 'wearing a white rose wedding corsage pin' },
  { labelMm: 'မင်္ဂလာ ပဝါ/လွယ်ကြိုး လွယ်ထား', promptText: 'draped with traditional silk wedding scarf ribbon sash' },
  { labelMm: 'မင်္ဂလာ ပန်းကုံး ဆွဲထား', promptText: 'wearing a sweet scented jasmine flower necklace' },
  { labelMm: 'မင်္ဂလာ လက်စွပ်ဘူး ပွင့်လျက် ကိုင်ထားဟန်', promptText: 'holding an open velvet ring box presenting engagement ring' },
  { labelMm: 'မင်္ဂလာ ရွှေဆွဲကြိုး / စိန်ဆွဲကြိုး ဆွဲထား', promptText: 'wearing a sparkling diamond and gold bridal necklace' },
  { labelMm: 'မင်္ဂလာ စိန်နားကပ် / ရွှေနားကပ် တပ်ထား', promptText: 'wearing ornate traditional gold drop earrings' },
  { labelMm: 'မင်္ဂလာ လက်စွပ် ဝတ်ထား', promptText: 'wearing a glittering diamond engagement ring' },
  { labelMm: 'မင်္ဂလာ ရိုးရာ ဆံထုံးပန်း ထိုးထား', promptText: 'adorned with jasmine flowers pinned in hair updo' },
  { labelMm: 'မင်္ဂလာ ပုတီး / လက်ဝတ်ရတနာ ဆင်ယင်ထား', promptText: 'adorned with delicate pearl bracelets and gold bangles' },
  { labelMm: 'သနပ်ခါး ပါးကွက် တပ်ထား', promptText: 'wearing subtle elegant Thanaka paste on cheeks' },

  // အသုံးအဆောင်များနှင့် အပိုပစ္စည်းများ
  { labelMm: 'ဖယောင်းတိုင်မီး', promptText: 'holding a warm glowing ceremonial candle' },
  { labelMm: 'ရှေးဟောင်း မီးအိမ်', promptText: 'holding a vintage brass lantern' },
  { labelMm: 'စမတ်နာရီ', promptText: 'wearing a sleek modern smartwatch' },
  { labelMm: 'လက်ပတ်နာရီ', promptText: 'wearing a luxury gold wrist watch' },
  { labelMm: 'နေကာမျက်မှန်', promptText: 'wearing chic cat-eye sunglasses' },
  { labelMm: 'မျက်မှန်', promptText: 'wearing stylish gold wire eyeglasses' },
  { labelMm: 'ဦးထုပ်', promptText: 'wearing a stylish sun hat or floral fascinator' },
  { labelMm: 'ဘေးလွယ်အိတ်', promptText: 'slung with a chic designer crossbody bag' },
  { labelMm: 'အိတ်ကပ်ပါ', promptText: 'carrying a beaded designer wedding clutch or handbag with handles' },
  { labelMm: 'မင်္ဂလာ ပန်းဦးစည်း ဆောင်းထား', promptText: 'wearing a floral crown tiara of fresh blossoms' },

  // ပါတီနှင့် ပွဲတက် အသုံးအဆောင်များ
  { labelMm: 'ရှမ်ပိန်ခွက် ကိုင်ထားဟန်', promptText: 'holding a sparkling champagne flute glass in celebration pose' },
  { labelMm: 'မီးပန်းပါ ရှမ်ပိန်ပုလင်း ကိုင်ထားဟန်', promptText: 'holding a popping champagne bottle with sparkler fireworks' },
  { labelMm: 'နီယွန် LED ပါတီမျက်မှန် တပ်လျက်', promptText: 'wearing cool neon LED party glasses' },
  { labelMm: 'နီယွန် အလင်းတုတ် ကိုင်ထားဟန်', promptText: 'holding glowing neon glow light stick' },
  { labelMm: 'ပါတီ မျက်နှာဖုံး ဝတ်လျက်', promptText: 'holding a Venetian masquerade party mask' },
  { labelMm: 'စလွယ် လွယ်ထားဟန်', promptText: 'wearing traditional ceremonial pageant sash' },
  { labelMm: 'ပြိုင်ပွဲဝင် ရင်ထိုးဝတ်ထားဟန်', promptText: 'wearing competition contest ribbon badge pin' },

  // တော်ဝင်နှင့် ဇာတ်ကောင် ဟန်ပန်များ
  { labelMm: 'ဒဏ္ဍာရီ မင်းသားဝတ်စုံ ဝတ်ဆင်ထားဟန်', promptText: 'adorned in mythical royal princess ceremonial costume pose' },
  { labelMm: 'တော်ဝင်မင်းသား ငွေရောင် ခေါင်းစည်း ဝတ်ဆင်ထားဟန်', promptText: 'wearing royal silver princess crown circlet tiara' },

  // တွဲဘက်နှင့် ယာဉ် ဟန်ပန် ပရိုဆက်များ
  { labelMm: 'သတို့သား၏ လက်ကို မြတ်နိုးစွာ တွဲထားဟန်', promptText: 'holding groom\'s arm affectionately with loving smile' },
  { labelMm: 'သတို့သား၏ ပခုံးပေါ် လက်တင်ထားဟန်', promptText: 'resting hand gently on groom\'s shoulder' },
  { labelMm: 'သတို့သား၏ ရင်ခွင်ထဲတွင် မှီလိုက်ဟန်', promptText: 'snuggled warmly into groom\'s side' },
  { labelMm: 'အရာဝတ္ထု/ယာဉ် ထဲတွင် ထိုင်နေဟန်', promptText: 'seated inside vintage car looking out window smiling' },
  { labelMm: 'အရာဝတ္ထု/မြင်း/စက်ဘီး ပေါ်တွင် စီးနင်း/ထိုင်နေဟန်', promptText: 'sitting gracefully on longtail boat, horse, or bicycle' },
  { labelMm: 'အရာဝတ္ထု/ယာဉ် ဘေးတွင် မှီရပ်နေဟန်', promptText: 'standing elegantly alongside groom near vehicle' },
  { labelMm: 'အရာဝတ္ထု/ယာဉ် နားတွင် တံခါး/ဇက်ကြိုး ကိုင်ရပ်နေဟန်', promptText: 'standing near vehicle door holding reins or handle gracefully' },
];

