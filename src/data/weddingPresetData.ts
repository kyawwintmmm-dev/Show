export interface WeddingPropItem {
  id: string;
  emoji: string;
  labelMm: string;
  labelEn: string;
  promptText: string;
}

export interface WeddingEraCategory {
  id: 'ancient' | 'colonial' | 'modern';
  eraMm: string;
  eraEn: string;
  accessories: WeddingPropItem[];
  studioProps: WeddingPropItem[];
}

export interface WeddingEthnicCategory {
  id: 'bamar' | 'mon' | 'karen' | 'shan' | 'kachin' | 'rakhine';
  nameMm: string;
  nameEn: string;
  emoji: string;
  eras: WeddingEraCategory[];
}

export const WEDDING_ETHNIC_CATEGORIES: WeddingEthnicCategory[] = [
  // ==========================================
  // 1. မြန်မာ (Bamar / Burmese)
  // ==========================================
  {
    id: 'bamar',
    nameMm: '၁။ မြန်မာ (Bamar / Burmese)',
    nameEn: '1. Bamar / Burmese',
    emoji: '🇲🇲',
    eras: [
      {
        id: 'ancient',
        eraMm: 'ခေတ်ဟောင်း (Royal & Pre-colonial Era - Konbaung / Yadanabon)',
        eraEn: 'Royal & Pre-colonial Era (Konbaung / Yadanabon)',
        accessories: [
          { id: 'bamar_a_1', emoji: '👑', labelMm: 'မဟာလတာ တန်ဆာ (Maharlatar Royal Jewellery Set)', labelEn: 'Maharlatar Royal Jewellery Set', promptText: 'adorned with authentic Maharlatar royal court jewellery set studded with rubies, emeralds, and natural pearls' },
          { id: 'bamar_a_2', emoji: '👸', labelMm: 'သင်းကျစ် (Thingyit / Bridal Diadem Tiara)', labelEn: 'Bridal Diadem Tiara (Thingyit)', promptText: 'wearing golden repousse regal diadem tiara headband (Thingyit)' },
          { id: 'bamar_a_3', emoji: '🎖️', labelMm: 'ဒူးရား / စလွယ် (Salwe / Royal Sash Ring & Shoulder Chains)', labelEn: 'Royal Salwe Sash & Shoulder Chains', promptText: 'wearing multi-strand royal gold ceremonial Salwe sashes across shoulders' },
          { id: 'bamar_a_4', emoji: '👞', labelMm: 'ကတ္တီပါ ဖိနပ် (Kathiba Hpinat / Velvet Royal Shoes)', labelEn: 'Velvet Royal Shoes (Kathiba Hpinat)', promptText: 'wearing traditional pointed velvet royal shoes embroidered with bullion gold threads' },
          { id: 'bamar_a_5', emoji: '🌸', labelMm: 'စံပယ်ပန်းကုံး (Sabae Pan Kyo / Jasmine Garland)', labelEn: 'Fresh Jasmine Garland', promptText: 'adorned with fragrant fresh jasmine garlands wrapped into hair bun and draped on chest' },
          { id: 'bamar_a_6', emoji: '🥣', labelMm: 'သပြေခက်နှင့် ငွေဖလား (Thabye Khet & Ngwe Hpala / Eugenia Leaves & Silver Bowl)', labelEn: 'Eugenia Leaves & Silver Blessing Bowl', promptText: 'holding traditional silver bowl containing auspicious Eugenia leaves and floral blessing water' },
          { id: 'bamar_a_7', emoji: '🎁', labelMm: 'ကွမ်းအစ်နှင့် ထုံးဘူး (Kwon It & Htone Bu / Royal Lacquerware Betel Box)', labelEn: 'Royal Lacquerware Betel Box Set', promptText: 'flanked by gold-inlaid royal lacquerware betel box and ceremonial limestone receptacle' },
          { id: 'bamar_a_8', emoji: '🎗️', labelMm: 'ဖဲကြိုးတွဲ မင်္ဂလာလက်ထပ်ကွင်း (Hand-Tying Silk Ribbon Set)', labelEn: 'Hand-Tying Silk Ribbon Binding Set', promptText: 'ceremonial white and gold silk sash binding couple hands for traditional Latt Htat hand-tying ritual' }
        ],
        studioProps: [
          { id: 'bamar_b_1', emoji: '🖼️', labelMm: 'ကနုတ်ရွှေဇာ နောက်ခံ (Kanote Gold Leaf Carved Wood Backdrop)', labelEn: 'Carved Teak Kanote Backdrop', promptText: 'backdrop featuring hand-carved teakwood panel with intricate gold Kanote floral scrollwork' },
          { id: 'bamar_b_2', emoji: '🪑', labelMm: 'မှန်စီရွှေချ ပလ္လင် (Mhan-Si Shwe-Cha Palin / Gilded Glass-Mosaic Throne Seat)', labelEn: 'Gilded Glass-Mosaic Throne Seat', promptText: 'seated on royal raised wooden throne platform decorated with gold leaf and glass mosaic mirrorwork' },
          { id: 'bamar_b_3', emoji: '☂️', labelMm: 'ကြက်လျှာအလံနှင့် ထီးဖြူ (Htihpyu & Kyat-Lya Streamers / Royal White Umbrellas)', labelEn: 'Royal White Tiered Umbrellas', promptText: 'framed by multi-tiered ceremonial white royal umbrellas and gold-trimmed streamers' },
          { id: 'bamar_b_4', emoji: '🏺', labelMm: 'သပြေအိုးကြီးများ (Thabye O / Large Brass Water Vessels)', labelEn: 'Large Brass Water Urns with Eugenia', promptText: 'flanked by polished brass water urns with fresh Eugenia branches and orchid arrangements' },
          { id: 'bamar_b_5', emoji: '🛋️', labelMm: 'ယွန်းကတ္တီပါ ခေတ္တရာစိမ်း (Velvet Carpet with Gold Embroidery)', labelEn: 'Gold-Embroidered Velvet Carpet', promptText: 'standing on deep crimson velvet rug adorned with gold wire embroidery' },
          { id: 'bamar_b_6', emoji: '🪔', labelMm: 'ဆီမီးခွက်များ (Traditional Oil Lamps on Brass Pedestals)', labelEn: 'Tiered Brass Oil Lamps', promptText: 'illuminated by tiered brass oil lamps providing warm ambient golden light' }
        ]
      },
      {
        id: 'colonial',
        eraMm: 'ခေတ်လယ် (Colonial to Mid-20th Century Era)',
        eraEn: 'Colonial to Mid-20th Century Era',
        accessories: [
          { id: 'bamar_c_a_1', emoji: '📿', labelMm: 'စိုင်းရွှေဆွဲကြိုး (Sai Shwe Swae Kyo / Layered Gold Bead Necklaces)', labelEn: 'Layered Gold Bead Necklaces', promptText: 'wearing multi-layered heavy gold bead chain necklaces (Kyat U Kyo)' },
          { id: 'bamar_c_a_2', emoji: '🌺', labelMm: 'ဆံထုံး အလှပန်းနှင့် မှန်ပန်း (Santhone Hman Pan / Glass Gem Hairpin & Jasmine)', labelEn: 'Gem Hairpin & Jasmine Hair Bun', promptText: 'hairstyled with glass gem hairpins combined with fresh jasmine wrapped into high side-bun' },
          { id: 'bamar_c_a_3', emoji: '☂️', labelMm: 'ရွှေထီး (Shwe Htee / Gold Satin Bridal Umbrella)', labelEn: 'Gold Satin Bridal Umbrella', promptText: 'carrying gold silk embroidered umbrella with bamboo handle' },
          { id: 'bamar_c_a_4', emoji: '🌸', labelMm: 'ဒေစီပန်း / သဇင်ပန်းကုံး (Thazin & Daisy Floral Garlands)', labelEn: 'Thazin Orchid Floral Garlands', promptText: 'adorned with royal Thazin orchid cascades draped over shoulder' },
          { id: 'bamar_c_a_5', emoji: '💫', labelMm: 'ငွေလက်ကောက်နှင့် လက်စွပ် (Traditional Gold/Silver Bangle Stack)', labelEn: 'Gold/Silver Bangle Stack', promptText: 'wearing stacked thick solid gold bangles and traditional rings' },
          { id: 'bamar_c_a_6', emoji: '🧺', labelMm: 'ကြိမ်မင်္ဂလာကွမ်းတိုင် (Silver/Lacquer Betel Basket Stand)', labelEn: 'Silver/Lacquer Betel Basket Stand', promptText: 'accompanied by woven lacquer betel stand used during tea refresh ceremony' }
        ],
        studioProps: [
          { id: 'bamar_c_b_1', emoji: '🎨', labelMm: 'လက်ရေးဆေးဆေး ဆန်းပြားနောက်ခံ (Hand-painted Scenic Canvas Backdrop)', labelEn: 'Hand-painted Scenic Canvas Backdrop', promptText: 'vintage hand-painted scenic canvas backdrop featuring classical archways and garden pillars' },
          { id: 'bamar_c_b_2', emoji: '🛋️', labelMm: 'ကျွန်းသစ်ထိုင်ခုံနှင့် စက်ဝိုင်းခုံ (Victorian-Style Teakwood Bridal Settee)', labelEn: 'Victorian Teakwood Bridal Settee', promptText: 'seated on carved Burmese teak settee upholstered in velvet brocade' },
          { id: 'bamar_c_b_3', emoji: '📻', labelMm: 'ဓာတ်စက်နှင့် ရှေးဟောင်းပန်းအိုး (Antique Gramophone & Brass Vases)', labelEn: 'Antique Gramophone & Brass Vases', promptText: 'vintage gramophone and brass flower vases placed on carved side tables' },
          { id: 'bamar_c_b_4', emoji: '🪵', labelMm: 'ပါကေးနှင့် ကော်ဇောပြာ (Carved Parquet & Patterned Oriental Rug)', labelEn: 'Carved Parquet & Oriental Rug', promptText: 'patterned Oriental area rug layered over polished teak plank parquet floor' },
          { id: 'bamar_c_b_5', emoji: '💡', labelMm: 'ဖလင်ကင်မရာ မီးဆိုင်း (Vintage Tungsten Studio Continuous Lights)', labelEn: 'Vintage Studio Tungsten Continuous Lights', promptText: 'warm vintage tungsten studio spotlight creating soft classic lighting setup' },
          { id: 'bamar_c_b_6', emoji: '🪴', labelMm: 'သဇင်ပန်း တိုင်အလှ (Teak Flower Pedestals with Fresh Orchids)', labelEn: 'Teak Flower Pedestals with Orchids', promptText: 'flanked by carved teak columns supporting brass pots filled with cascading white orchids' }
        ]
      },
      {
        id: 'modern',
        eraMm: 'ခေတ်သစ် (Modern & Contemporary Era)',
        eraEn: 'Modern & Contemporary Era',
        accessories: [
          { id: 'bamar_m_a_1', emoji: '💎', labelMm: 'ချိတ်အင်္ကျီနှင့် ရွှေစိန်လက်ဝတ်ရတနာ (Acheik Match & Diamond Jewellery Set)', labelEn: 'Acheik Match & Diamond Jewelry Set', promptText: 'wearing high-grade diamond choker and drop earrings customized to match silk Acheik weave' },
          { id: 'bamar_m_a_2', emoji: '💍', labelMm: 'မင်္ဂလာလက်စွပ်ဘူး (Modern Velvet Ring Box)', labelEn: 'Monogrammed Velvet Ring Box', promptText: 'holding open monogrammed velvet ring box with twin diamond wedding bands' },
          { id: 'bamar_m_a_3', emoji: '✉️', labelMm: 'မင်္ဂလာကတ်နှင့် ဖိတ်စာ (Minimalist Luxury Wedding Invitation & Cards)', labelEn: 'Luxury Gold-Foil Wedding Invitations', promptText: 'flatlay styling with embossed gold-foil acrylic wedding invitation cards' },
          { id: 'bamar_m_a_4', emoji: '💐', labelMm: 'ခေတ်သစ် သဇင်နှင့် စံပယ်ပန်းကုံး (Modern Cascading Thazin & Baby\'s Breath Bouquet)', labelEn: 'Cascading Thazin & Baby\'s Breath Bouquet', promptText: 'holding modern cascading bridal bouquet combining Thazin orchids with white roses and baby\'s breath' },
          { id: 'bamar_m_a_5', emoji: '✨', labelMm: 'ရိုးရာကွမ်းအစ် ငွေဖလား (Polished Modern Silver Blessing Set)', labelEn: 'Polished Silver Blessing Set', promptText: 'high-polish modern silver blessing bowl with floating Eugenia leaves and silver betel receptacle' },
          { id: 'bamar_m_a_6', emoji: '🎁', labelMm: 'စပွန်ဆာ မင်္ဂလာလက်ဆောင်သေတ္တာ (Decorated Gift Boxes / Trunk Props)', labelEn: 'Decorated Gift Presentation Trunks', promptText: 'silk-ribbon bound glass presentation trunks for wedding dowry and gifts' }
        ],
        studioProps: [
          { id: 'bamar_m_b_1', emoji: '🌈', labelMm: 'မော်ဒန် ပန်းမုတ်နှင့် LED ဆိုင်းဘုတ် (Acrylic Arc Archway with LED Neon)', labelEn: 'Acrylic Arc Archway with LED Neon', promptText: 'minimalist white arched backdrop with pastel floral arrangements and custom LED family initial sign' },
          { id: 'bamar_m_b_2', emoji: '🛋️', labelMm: 'ခေတ်သစ် အဖြူရောင် တင်းပလပ် စိုခုံ (Minimalist Curved Bridal Sofa)', labelEn: 'Minimalist Curved Cream Sofa', promptText: 'seated on cream boucle curved settee sofa' },
          { id: 'bamar_m_b_3', emoji: '🕯️', labelMm: 'ကြည်လင် ဖန်တိုင်များနှင့် ဖယောင်းတိုင် (Acrylic Pedestals & Pillar Candles)', labelEn: 'Acrylic Pedestals & Pillar Candles', promptText: 'surrounded by transparent acrylic columns holding glass cylinder vases with floating pillar candles' },
          { id: 'bamar_m_b_4', emoji: '💡', labelMm: 'ပျော့ပျောင်းသော ပန်းရောင်စက္ကူမီး (Warm Studio Softbox & RGB Ambient Ring Lights)', labelEn: 'Studio Softbox & Warm Diffusion Lighting', promptText: 'lit with large diffusion softboxes creating soft wrapping shadows for detailed threadwork' },
          { id: 'bamar_m_b_5', emoji: '✨', labelMm: 'သစ်သားပါကေးနှင့် ပန်းခင်းကြမ်းပြင် (Seamless Cream Studio Floor with Floral Trail)', labelEn: 'Seamless Cream Floor with Floral Runners', promptText: 'seamless neutral cream studio floor lined with fresh floral runners' },
          { id: 'bamar_m_b_6', emoji: '🌾', labelMm: 'သဖန်းသီးနှင့် ခြောက်ထုတ်ပန်းအိုးများ (Pampa Grass & White Floral Installations)', labelEn: 'Pampa Grass & White Floral Installations', promptText: 'boho-chic dried pampa grass installations paired with classic white lilies' }
        ]
      }
    ]
  },

  // ==========================================
  // 2. မွန် (Mon)
  // ==========================================
  {
    id: 'mon',
    nameMm: '၂။ မွန် (Mon)',
    nameEn: '2. Mon Ethnic Group',
    emoji: '🦚',
    eras: [
      {
        id: 'ancient',
        eraMm: 'ခေတ်ဟောင်း (Royal & Pre-colonial Era - Hanthawaddy Period)',
        eraEn: 'Pre-colonial Era (Hanthawaddy Period)',
        accessories: [
          { id: 'mon_a_1', emoji: '👑', labelMm: 'မွန်ရိုးရာ ဆံထုံးတန်ဆာ (Mon Bridal Gold Crown & Hair Pin Set)', labelEn: 'Mon Bridal Gold Crown Set', promptText: 'wearing raised Mon gold bun comb adorned with golden peacock feather (Hamsa) motifs' },
          { id: 'mon_a_2', emoji: '🦢', labelMm: 'ဟင်္သာရုပ် ငွေဖလား (Hamsa Bird Silver Blessing Bowl)', labelEn: 'Hamsa Bird Silver Blessing Bowl', promptText: 'holding silver water blessing vessel engraved with sacred Hintha swan' },
          { id: 'mon_a_3', emoji: '⛓️', labelMm: 'မွန်ခါးပတ် ရွှေကြိုး (Layered Gold Waist Chain / Belt)', labelEn: 'Layered Gold Waist Chain', promptText: 'wearing hand-hammered solid gold link belt securing wrapped Mon skirt' },
          { id: 'mon_a_4', emoji: '🌸', labelMm: 'သဇင်နှင့် နံ့သာပန်းကုံး (Mon Sandalwood & Wild Orchid Garlands)', labelEn: 'Sandalwood & Orchid Garlands', promptText: 'adorned with fragrant sandalwood and wild orchid garlands across collar' },
          { id: 'mon_a_5', emoji: '🎗️', labelMm: 'စလွယ်စိမ်းနှင့် ခင်းပဝါ (Traditional Mon Silk Shoulder Sash - Yat Toe)', labelEn: 'Mon Silk Shoulder Sash (Yat Toe)', promptText: 'draped with traditional handwoven red Mon silk sash over shoulder' },
          { id: 'mon_a_6', emoji: '🧺', labelMm: 'ကွမ်းရွက်နှင့် ဆွမ်းအုပ် (Mon Lacquer Offering Tray)', labelEn: 'Mon Lacquer Offering Tray', promptText: 'high-footed wooden offering tray carrying sacred betel leaves and yellow rice grains' }
        ],
        studioProps: [
          { id: 'mon_b_1', emoji: '🦢', labelMm: 'မွန်ဟင်္သာရုပ် ရွှေပန်းချီ (Hamsa / Sacred Swan Carved Wall Panel)', labelEn: 'Carved Hamsa Swan Backdrop', promptText: 'backdrop featuring carved teak panel with paired Hintha sacred swans flanking central floral emblem' },
          { id: 'mon_b_2', emoji: '🛋️', labelMm: 'မွန်ရိုးရာ သစ်သားစင်ခုံ (Carved Wooden Platform / Mon Daybed)', labelEn: 'Mon Carved Wooden Daybed', promptText: 'seated on low carved wooden Mon platform covered with red and gold woven bamboo mats' },
          { id: 'mon_b_3', emoji: '🪔', labelMm: 'ငွေဖလားနှင့် သင်းတွဲ (Mon Traditional Brass Oil Lamp Stand)', labelEn: 'Mon Brass Oil Lamp Tree', promptText: 'flanked by tall multi-tiered Mon brass oil lamp trees lit with sesame oil' },
          { id: 'mon_b_4', emoji: '☂️', labelMm: 'ရိုးရာစက္ကူ ထီးနီ (Red Mon Paper Umbrellas)', labelEn: 'Red Mon Oil-Paper Umbrellas', promptText: 'framed by oil-paper hand-painted red Mon umbrellas' },
          { id: 'mon_b_5', emoji: '🪵', labelMm: 'မွန်ရက်ကန်း ယက်ကွက်ကြမ်းပြင် (Handwoven Mon Ethnic Matting)', labelEn: 'Mon Handwoven Ethnic Floor Matting', promptText: 'floor covered with red and white patterned Mon thinphyu woven mats' }
        ]
      },
      {
        id: 'colonial',
        eraMm: 'ခေတ်လယ် (Colonial to Mid-20th Century Era)',
        eraEn: 'Colonial Era',
        accessories: [
          { id: 'mon_c_a_1', emoji: '🧣', labelMm: 'မွန်ရိုးရာ ပန်းထိုးပဝါ (Embroidered Mon Silk Shoulder Shawl)', labelEn: 'Embroidered Mon Silk Shawl', promptText: 'wearing intricately embroidered red Mon silk shawl over shoulder' },
          { id: 'mon_c_a_2', emoji: '👑', labelMm: 'ရွှေဆွဲသီး ခေါင်းဆောင်း (Mon Gold Filigree Hair Comb)', labelEn: 'Mon Gold Filigree Hair Comb', promptText: 'adorned with crescent-shaped gold hair comb studded with garnets' },
          { id: 'mon_c_a_3', emoji: '💫', labelMm: 'ငွေလက်ကောက်ဆိုင်း (Hand-carved Silver Cuff Bangles)', labelEn: 'Silver Cuff Bangles with Peacock Motif', promptText: 'wearing thick silver cuff bangles etched with peacock motifs' },
          { id: 'mon_c_a_4', emoji: '🌸', labelMm: 'စံပယ်ရောင်စုံ ပန်းပွင့် (Mon Pearl & Fresh Jasmine Bun Loop)', labelEn: 'Mon Pearl & Jasmine Hair Loop', promptText: 'hairstyled with tight coil of jasmine flowers enclosing golden hair knot' },
          { id: 'mon_c_a_5', emoji: '🎁', labelMm: 'ယွန်းကွမ်းအစ် (Traditional Mon Monogrammed Lacquer Box)', labelEn: 'Mon Monogrammed Lacquer Box', promptText: 'holding cylindrical black and red lacquerware betel box' }
        ],
        studioProps: [
          { id: 'mon_c_b_1', emoji: '🖼️', labelMm: 'မွန်ရိုးရာ ရက်ကန်းအထည် စကေရာ (Mon Handwoven Textile Hanging Backdrop)', labelEn: 'Mon Handwoven Textile Hanging Backdrop', promptText: 'backdrop draped with layered red and white striped Mon traditional textiles' },
          { id: 'mon_c_b_2', emoji: '🪑', labelMm: 'ကျွန်းထိုင်ခုံစောင်း (Carved Wooden Mon Bench with Red Cushion)', labelEn: 'Carved Teak Bench with Red Cushion', promptText: 'seated on low-backed teak bench upholstered with crimson cotton fabric' },
          { id: 'mon_c_b_3', emoji: '🏺', labelMm: 'မွန်မြေအိုး ရေကင်း (Traditional Mon Earthenware Water Jars)', labelEn: 'Mon Earthenware Urns with Banana Leaves', promptText: 'terracotta urns wrapped with fresh banana leaf accents and jasmine loops' },
          { id: 'mon_c_b_4', emoji: '💡', labelMm: 'ကြေးမီးအိမ် (Hanging Brass Oil Lanterns)', labelEn: 'Hanging Colonial Brass Oil Lanterns', promptText: 'lit by hanging brass oil lanterns illuminating the sides' },
          { id: 'mon_c_b_5', emoji: '🛋️', labelMm: 'မွန်ရိုးရာ ကော်ဇောနီ (Woven Red Thread Floor Runner)', labelEn: 'Mon Woven Red Floor Runner', promptText: 'deep red handloom carpet runner leading to the stage' }
        ]
      },
      {
        id: 'modern',
        eraMm: 'ခေတ်သစ် (Modern & Contemporary Era)',
        eraEn: 'Modern & Contemporary Era',
        accessories: [
          { id: 'mon_m_a_1', emoji: '🧣', labelMm: 'မွန်ရိုးရာ အနီရောင် ရက်ကန်းစုံ (Modern Red Mon Silk Couple Attire Accessories)', labelEn: 'Modern Red Mon Silk Accessories', promptText: 'wearing matching ruby-red Mon woven silk shoulder sashes' },
          { id: 'mon_m_a_2', emoji: '🦢', labelMm: 'ဟင်္သာပုံစံ ရွှေရင်ထိုး (Gold Hintha Bird Brooch)', labelEn: 'Gold Hintha Bird Brooch', promptText: 'wearing fine jewelry gold Hintha bird brooch pinned to shoulder sash' },
          { id: 'mon_m_a_3', emoji: '💐', labelMm: 'ခေတ်သစ် ပန်းစည်း (Modern Red & White Rose Wedding Bouquet)', labelEn: 'Modern Red & White Rose Bouquet', promptText: 'holding structured bouquet with red roses, white baby\'s breath, and jasmine' },
          { id: 'mon_m_a_4', emoji: '🥣', labelMm: 'မွန်မင်္ဂလာလက်ဖွဲ့ ရွှေဖလား (Polished Mon Silver Gift Tray)', labelEn: 'Mon Silver Gift Tray', promptText: 'engraved silver platter used for cash and ring offerings' },
          { id: 'mon_m_a_5', emoji: '🌸', labelMm: 'ရွှေရောင် စံပယ်ပန်းကုံး (Modern Pearl-draped Jasmine Garland)', labelEn: 'Pearl-draped Jasmine Garland', promptText: 'wearing fresh jasmine garlands interlaid with small cultured pearls' }
        ],
        studioProps: [
          { id: 'mon_m_b_1', emoji: '🖼️', labelMm: 'မွန်ဟင်္သာ တံဆိပ်ပါ ခေတ်သစ် နောက်ခံ (Minimalist Wall Panel with Gilded Mon Hintha Emblem)', labelEn: 'Minimalist Wall Panel with Gold Hintha Emblem', promptText: 'matte white arched backdrop featuring stylized gold Hintha bird silhouette' },
          { id: 'mon_m_b_2', emoji: '🛋️', labelMm: 'မော်ဒန် ကတ္တီပါ ဆိုဖာ (Modern Cream Velvet Loveseat)', labelEn: 'Modern Cream Velvet Loveseat', promptText: 'seated on neutral cream velvet loveseat with red silk accent pillows' },
          { id: 'mon_m_b_3', emoji: '💡', labelMm: 'မွန်ရိုးရာ စိုးရိုက် မီးဆိုင်း (Modern Pendant Lights with Woven Mon Bamboo Shades)', labelEn: 'Modern Mon Woven Bamboo Pendant Lights', promptText: 'contemporary lighting housed inside handwoven Mon bamboo lampshades' },
          { id: 'mon_m_b_4', emoji: '🏺', labelMm: 'မှန်တိုင်နှင့် ပန်းအိုး (Clear Glass Cylinder Vases with White Floral Trails)', labelEn: 'Clear Glass Cylinder Vases with Petals', promptText: 'clear glass cylinder vases with floating red and white petals' },
          { id: 'mon_m_b_5', emoji: '✨', labelMm: 'ခေတ်သစ် မွန်ရက်ကန်း ကြမ်းပြင်ကော်ဇော (Neutral Studio Carpet with Mon Red Border Runners)', labelEn: 'Neutral Carpet with Mon Red Border Runners', promptText: 'light beige studio floor bordered with Mon traditional fabric ribbons' }
        ]
      }
    ]
  },

  // ==========================================
  // 3. ကရင် (Karen / Kayin)
  // ==========================================
  {
    id: 'karen',
    nameMm: '၃။ ကရင် (Karen / Kayin)',
    nameEn: '3. Karen / Kayin Ethnic Group',
    emoji: '🥁',
    eras: [
      {
        id: 'ancient',
        eraMm: 'ခေတ်ဟောင်း (Traditional / Pre-colonial Era)',
        eraEn: 'Traditional Pre-colonial Era',
        accessories: [
          { id: 'karen_a_1', emoji: '👳', labelMm: 'ကရင် ရိုးရာ ခေါင်းပေါင်း (Karen Woven Headdress with Fringe / Dress Headband)', labelEn: 'Karen Woven Fringed Headdress', promptText: 'wearing hand-woven striped cotton headband with long hanging thread tassels' },
          { id: 'karen_a_2', emoji: '⛓️', labelMm: 'ကြေးကွင်းနှင့် ငွေဆွဲကြိုး (Heavy Solid Silver Neck Ring / Torc - Hsa)', labelEn: 'Heavy Solid Silver Torc Ring (Hsa)', promptText: 'wearing torque-style solid silver necklaces (Hsa) layered over tunic' },
          { id: 'karen_a_3', emoji: '🥁', labelMm: 'ဖားစည် (Karen Bronze Frog Drum - Kyee-Zi / Frog Drum)', labelEn: 'Karen Bronze Frog Drum (Kyee-Zi)', promptText: 'featuring ceremonial bronze Karen frog drum (Kyee-Zi) prop' },
          { id: 'karen_a_4', emoji: '🎒', labelMm: 'ကရင်ရိုးရာ လွယ်အိတ် (Handwoven Karen Shoulder Bag)', labelEn: 'Handwoven Karen Fringed Bag', promptText: 'carrying bright red and white fringed woven Karen shoulder sling bag' },
          { id: 'karen_a_5', emoji: '🎗️', labelMm: 'ကြိုးချည်မင်္ဂလာ ဆန်နှင့် ရေခွက် (Karen Wrist-Tying Thread Set with Rice & Water)', labelEn: 'Karen Wrist-Tying Thread & Water Set', promptText: 'white cotton threads, raw rice grains, and clear water set for Kwen Htoo wrist-tying ceremony' },
          { id: 'karen_a_6', emoji: '🪶', labelMm: 'ငှက်မွေးခေါင်းထိုး (Wild Hornbill / Pheasant Feather Hairpin)', labelEn: 'Hornbill Feather Hair Pin', promptText: 'ceremonial pheasant feather attached to woven headband' }
        ],
        studioProps: [
          { id: 'karen_b_1', emoji: '🖼️', labelMm: 'ဖားစည် ရုပ်ကြွ နောက်ခံ (Bronze Frog Drum Relief Backdrop)', labelEn: 'Bronze Frog Drum Relief Backdrop', promptText: 'wooden background featuring raised motifs of Karen frog drums and morning sun rays' },
          { id: 'karen_b_2', emoji: '🛋️', labelMm: 'ဝါးထိုင်ခုံနှင့် ကြိုးခုံ (Handcrafted Bamboo & Rattan Bridal Bench)', labelEn: 'Bamboo & Rattan Bridal Bench', promptText: 'seated on low bamboo bench tied with rattan cords and draped with woven Karen cloth' },
          { id: 'karen_b_3', emoji: '🥁', labelMm: 'ကြေးဖားစည် စင် (Raised Teak Stand with Ceremonial Bronze Frog Drum)', labelEn: 'Raised Teak Stand with Bronze Frog Drum', promptText: 'prominently displaying authentic bronze frog drum on carved teak pedestal' },
          { id: 'karen_b_4', emoji: '🔥', labelMm: 'ဝါးမီးတိုင် (Traditional Woven Bamboo Torches / Oil Stands)', labelEn: 'Woven Bamboo Torches', promptText: 'flanked by natural bamboo torches providing warm flicker lights' },
          { id: 'karen_b_5', emoji: '🪵', labelMm: 'ကရင်ရိုးရာ ဖျာ (Hand-plaited Reed Mat - Htoo Hta)', labelEn: 'Hand-plaited Reed Mat (Htoo Hta)', promptText: 'natural woven reed matting laid over wooden studio flooring' }
        ]
      },
      {
        id: 'colonial',
        eraMm: 'ခေတ်လယ် (Colonial to Mid-20th Century Era)',
        eraEn: 'Colonial Era',
        accessories: [
          { id: 'karen_c_a_1', emoji: '🥋', labelMm: 'ကရင် အနီရောင် သဲလွန် သင်တိုင်း (Red & Black Woven Karen Tunic - Hose)', labelEn: 'Red & Black Karen Tunic (Hose)', promptText: 'wearing heavily beaded V-neck Karen tunic trimmed with Job\'s tears seeds' },
          { id: 'karen_c_a_2', emoji: '📿', labelMm: 'ကရင်စိ ကြေဆွဲကြိုး (Job\'s Tears Seed & Silver Bead Necklaces)', labelEn: 'Job\'s Tears Seed Necklaces', promptText: 'wearing multi-strand necklaces made from natural white seeds and beaten silver beads' },
          { id: 'karen_c_a_3', emoji: '⛓️', labelMm: 'ငွေခါးပတ် (Woven Silver Wire Waistband)', labelEn: 'Woven Silver Wire Belt', promptText: 'wearing flexible silver wire mesh belt around waist' },
          { id: 'karen_c_a_4', emoji: '🗡️', labelMm: 'ကရင် ရိုးရာ ဓားလွယ် (Ceremonial Karen Machete in Carved Wooden Sheath)', labelEn: 'Ceremonial Karen Machete Dagger', promptText: 'groom slung with ceremonial Karen machete in carved wooden sheath' },
          { id: 'karen_c_a_5', emoji: '🧣', labelMm: 'ဖြူနီသိုးမွေး ခေါင်းပဝါ (Red & White Fringed Cotton Headscarf)', labelEn: 'Red & White Fringed Headscarf', promptText: 'soft woven red and white headscarf folded over hair' }
        ],
        studioProps: [
          { id: 'karen_c_b_1', emoji: '🖼️', labelMm: 'ကရင်ရိုးရာ ရက်ကန်း စကေရာ (Suspended Karen Woven Tapestry Backdrop)', labelEn: 'Suspended Karen Tapestry Backdrop', promptText: 'wall-mounted Karen handloom blanket displaying red, black, and white geometric lines' },
          { id: 'karen_c_b_2', emoji: '🪑', labelMm: 'ကျွန်းနှင့် ဝါး ပေါင်းစပ် ထိုင်ခုံ (Teakwood Frame Settee with Woven Mat Upholstery)', labelEn: 'Teakwood Frame Settee with Karen Cushion', promptText: 'rustic wooden bench with handwoven Karen cushion overlays' },
          { id: 'karen_c_b_3', emoji: '🪜', labelMm: 'ဝါးကျောက်စာနှင့် လွယ်အိတ် စင် (Display Ladder with Karen Shoulder Bags & Horns)', labelEn: 'Display Ladder with Karen Bags & Horns', promptText: 'bamboo ladder showing authentic Karen bags and buffalo horn drinking cups' },
          { id: 'karen_c_b_4', emoji: '💡', labelMm: 'စက်ဝိုင်းမီးနှင့် ရိုးရာ မီးအိမ် (Colonial Oil Lanterns on Bamboo Poles)', labelEn: 'Colonial Oil Lanterns on Bamboo Poles', promptText: 'classic oil lanterns hung from crossed bamboo posts' },
          { id: 'karen_c_b_5', emoji: '🪵', labelMm: 'ရိုးရာ ရက်ကန်းခင်း ကြမ်းပြင် (Layered Karen Striped Rugs)', labelEn: 'Layered Karen Striped Rugs', promptText: 'floor covered with woven Karen runners featuring signature vertical stripe patterns' }
        ]
      },
      {
        id: 'modern',
        eraMm: 'ခေတ်သစ် (Modern & Contemporary Era)',
        eraEn: 'Modern & Contemporary Era',
        accessories: [
          { id: 'karen_m_a_1', emoji: '🎗️', labelMm: 'ခေတ်သစ် ကရင် ချည်မျှင် လက်ဖွဲ့ကြိုး (Modern Silver & Silk Wrist-Tying Set)', labelEn: 'Modern Silver & Silk Wrist-Tying Tray', promptText: 'silver tray carrying combed white cotton threads and flower petals for wrist-tying' },
          { id: 'karen_m_a_2', emoji: '🥁', labelMm: 'စိန်နှင့် ငွေ ပေါင်းစပ် ကရင်ရင်ထိုး (Modern Silver-Plated Karen Drum Brooch)', labelEn: 'Silver Karen Frog Drum Brooch', promptText: 'miniature silver frog drum pin pinned to blouse lapel' },
          { id: 'karen_m_a_3', emoji: '🎗️', labelMm: 'ကရင် ရက်ကန်း ပုခုံးလွယ် ပဝါ (Stylized Karen Woven Bridal Sash)', labelEn: 'Stylized Karen Woven Bridal Sash', promptText: 'refined silk-cotton sash wrapped diagonally over bridal dress' },
          { id: 'karen_m_a_4', emoji: '💐', labelMm: 'ခေတ်သစ် သဲလွန် ပန်းစည်း (Wildflower & Native Grain Bridal Bouquet)', labelEn: 'Wildflower & Seed Grain Bouquet', promptText: 'bridal bouquet with wild grass, red berries, white roses, and Job\'s tears seeds' },
          { id: 'karen_m_a_5', emoji: '💫', labelMm: 'ကရင်ရိုးရာ ငွေလက်ကောက် (Polished Silver Engraved Cuffs)', labelEn: 'Polished Silver Engraved Cuffs', promptText: 'wearing polished silver cuffs with traditional Karen geometric engravings' }
        ],
        studioProps: [
          { id: 'karen_m_b_1', emoji: '🎋', labelMm: 'မော်ဒန် ဝါးနှင့် ခေတ်သစ် နောက်ခံ (Modern Bamboo Slat Screen with Warm Backlighting)', labelEn: 'Modern Bamboo Screen with Backlighting', promptText: 'vertical bamboo slat screen with hidden LED strip backlighting and Karen plaques' },
          { id: 'karen_m_b_2', emoji: '🛋️', labelMm: 'ခေတ်သစ် စိုခုံ အဖြူရောင် (Modern White Boucle Bench with Karen Textile Pillows)', labelEn: 'White Boucle Bench with Karen Pillows', promptText: 'minimalist white bench accented with vibrant Karen handwoven throw pillows' },
          { id: 'karen_m_b_3', emoji: '🥁', labelMm: 'ဖားစည် ပုံစံ ခေတ်သစ် စတန်း (Glass-topped Frog Drum Side Tables)', labelEn: 'Glass-topped Frog Drum Side Tables', promptText: 'contemporary glass side tables with replica frog drum bases' },
          { id: 'karen_m_b_4', emoji: '💡', labelMm: 'အပျော့လင်း LED မီးဆိုင်း (Warm Softbox Lighting with Warm Spotlight Focus)', labelEn: 'Warm Softbox & Warm Spotlight Focus', promptText: 'softbox lighting calibrated to emphasize silver jewelry reflections and bold textile colors' },
          { id: 'karen_m_b_5', emoji: '✨', labelMm: 'ခေတ်သစ် အဆင် ကြမ်းပြင် (Neutral Grey Studio Floor with Woven Karen Runner)', labelEn: 'Neutral Grey Floor with Red Karen Runner', promptText: 'smooth studio floor with single high-contrast red Karen runner leading to bench' }
        ]
      }
    ]
  },

  // ==========================================
  // 4. ရှမ်း (Shan)
  // ==========================================
  {
    id: 'shan',
    nameMm: '၄။ ရှမ်း (Shan)',
    nameEn: '4. Shan Ethnic Group',
    emoji: '🏮',
    eras: [
      {
        id: 'ancient',
        eraMm: 'ခေတ်ဟောင်း (Royal & Pre-colonial Era - Saopha / Chao Fa)',
        eraEn: 'Royal Saopha Era (Chao Fa)',
        accessories: [
          { id: 'shan_a_1', emoji: '👑', labelMm: 'စောဘွား သင်းကျစ် မကုဋ် (Saopha Crown / Shan Royal Golden Turban Headpiece)', labelEn: 'Saopha Royal Golden Crown / Turban', promptText: 'wearing elaborate gold Saopha crown or royal conical turban decorated with filigree' },
          { id: 'shan_a_2', emoji: '🦚', labelMm: 'ဒေါင်းရုပ် ရွှေဆွဲကြိုး (Shan Peacock Motif Gold Collar Necklace)', labelEn: 'Shan Peacock Gold Collar Necklace', promptText: 'wearing wide-hinged gold collar necklace with peacock motifs studded with rubies and jade' },
          { id: 'shan_a_3', emoji: '⛓️', labelMm: 'ရှမ်း ရိုးရာ ငွေခါးပတ် (Heavy Articulated Silver Waist Belt)', labelEn: 'Articulated Silver Waist Belt', promptText: 'wearing silver filigree chain belt with dangling silver leaf pendants' },
          { id: 'shan_a_4', emoji: '☂️', labelMm: 'ရှမ်းမင်္ဂလာ ထီးစိမ် (Shan Oiled Silk Umbrella - Inle Style)', labelEn: 'Inle Shan Oiled Silk Umbrella', promptText: 'holding hand-painted oiled silk Shan umbrella with long bamboo handle' },
          { id: 'shan_a_5', emoji: '🎁', labelMm: 'ကြင်းတိုင် ရွှေကွမ်းအစ် (Saopha Royal Silver Betel Box)', labelEn: 'Saopha Royal Silver Betel Box', promptText: 'multi-tiered silver betel container engraved with Shan dragon motifs' },
          { id: 'shan_a_6', emoji: '🌸', labelMm: 'သဇင်ပန်းနှင့် စံပယ်ပန်းကုံး (Cascading Shan Orchid Headpiece)', labelEn: 'Shan Orchid Headpiece', promptText: 'white and purple Shan orchids woven into tall hair updo' }
        ],
        studioProps: [
          { id: 'shan_b_1', emoji: '🏛️', labelMm: 'စောဘွား ဟော်နန်း နောက်ခံ (Shan Saopha Palace Arch Backdrop)', labelEn: 'Shan Saopha Palace Arch Backdrop', promptText: 'golden multi-spired wooden archway styled after Hsipaw / Inle Haw Palace' },
          { id: 'shan_b_2', emoji: '🪑', labelMm: 'စောဘွား ပလ္လင်ထိုင်ခုံ (Saopha Royal Gilded Throne Chair)', labelEn: 'Saopha Royal Gilded Throne Chair', promptText: 'seated on high-backed carved teak chair finished in dark varnish and gold lacquer' },
          { id: 'shan_b_3', emoji: '🦚', labelMm: 'ဒေါင်းရုပ် ကြေးတိုင် မီးအိမ် (Brass Peacock Candle Lanterns)', labelEn: 'Brass Peacock Candle Lanterns', promptText: 'flanked by tall brass stands shaped like standing peacocks holding candles' },
          { id: 'shan_b_4', emoji: '☂️', labelMm: 'ရှမ်းမင်္ဂလာ ရွှေထီးကြီးများ (Pair of Royal Shan Tiered Golden Umbrellas)', labelEn: 'Royal Shan Tiered Golden Umbrellas', promptText: 'pair of large yellow silk royal Shan umbrellas flanking the throne' },
          { id: 'shan_b_5', emoji: '🛋️', labelMm: 'ရှမ်းရိုးရာ ရိုးယင်း ကော်ဇော (Handwoven Shan Silk Carpet)', labelEn: 'Handwoven Shan Silk Carpet', promptText: 'heavy silk floor rug woven with geometric diamond patterns' }
        ]
      },
      {
        id: 'colonial',
        eraMm: 'ခေတ်လယ် (Colonial to Mid-20th Century Era)',
        eraEn: 'Colonial Era',
        accessories: [
          { id: 'shan_c_a_1', emoji: '👒', labelMm: 'ခမောက် / ရှမ်းခေါင်းပေါင်း (Traditional Shan Straw Sunhat / Silk Turban)', labelEn: 'Shan Sunhat / Silk Turban', promptText: 'wearing finely woven velvet-lined Shan hat or pink silk turban (Gaung Baung)' },
          { id: 'shan_c_a_2', emoji: '🦋', labelMm: 'ရှမ်း အကျီ င်္ငွေကြယ်သီး (Shan Silver Butterfly Buttons)', labelEn: 'Shan Silver Butterfly Buttons', promptText: 'silver filigree butterfly buttons sewn down jacket front' },
          { id: 'shan_c_a_3', emoji: '💫', labelMm: 'ငွေခက် ဆံထိုး (Shan Silver Hairpin with Dangling Coins/Leaves)', labelEn: 'Shan Silver Hairpin with Coins', promptText: 'adorned with silver hairpin set with dangling chimes' },
          { id: 'shan_c_a_4', emoji: '🎒', labelMm: 'ရှမ်းရိုးရာ လွယ်အိတ် (Embroidered Shan Velvet Shoulder Sling)', labelEn: 'Embroidered Shan Velvet Sling Bag', promptText: 'slung with deep green or red velvet bag embroidered with silver thread' },
          { id: 'shan_c_a_5', emoji: '🍵', labelMm: 'ရှမ်းသေတ္တာ မင်္ဂလာပစ္စည်း (Engraved Silver Tea / Blessing Bowl Set)', labelEn: 'Engraved Silver Tea & Blessing Set', promptText: 'silver tea set used for elder blessing ceremony' }
        ],
        studioProps: [
          { id: 'shan_c_b_1', emoji: '🏮', labelMm: 'ရှမ်းစက္ကူ မီးအိမ် နောက်ခံ (Shan Mulberry Paper Backdrop with Suspended Lanterns)', labelEn: 'Shan Saa Paper Backdrop with Lanterns', promptText: 'textured Saa (mulberry) paper backdrop lit from behind with warm orange glow' },
          { id: 'shan_c_b_2', emoji: '🪑', labelMm: 'ကျွန်းသစ် ရှမ်းခုံရှည် (Carved Teak Low Bench with Shan Brocade Cushions)', labelEn: 'Teak Low Bench with Shan Cushions', promptText: 'low teak wooden bench lined with pink and green Shan woven cushions' },
          { id: 'shan_c_b_3', emoji: '🏮', labelMm: 'ရှမ်းစက္ကူ မီးအိမ်များ (Hanging Shan Mulberry Paper Lanterns)', labelEn: 'Hanging Shan Mulberry Paper Lanterns', promptText: 'spherical and diamond paper lanterns hanging at varying heights' },
          { id: 'shan_c_b_4', emoji: '👒', labelMm: 'ရှမ်းခမောက် အလှဆင်စင် (Display Wall of Shan Straw Hats & Weaving Shuttles)', labelEn: 'Wall Display of Shan Straw Hats', promptText: 'decorative wall grid showcasing traditional Shan hats and bamboo weaving' },
          { id: 'shan_c_b_5', emoji: '🌾', labelMm: 'စပါးနှံနှင့် မြေအိုး (Terracotta Jars with Dried Rice Stalks)', labelEn: 'Terracotta Jars with Golden Rice Stalks', promptText: 'clay vessels holding golden rice stalks symbolizing prosperity' }
        ]
      },
      {
        id: 'modern',
        eraMm: 'ခေတ်သစ် (Modern & Contemporary Era)',
        eraEn: 'Modern & Contemporary Era',
        accessories: [
          { id: 'shan_m_a_1', emoji: '💎', labelMm: 'ရှမ်းပိုးထည်နှင့် ရွှေစိန်ဆွဲကြိုး (Modern Shan Silk Match with Jade & Gold Set)', labelEn: 'Modern Shan Silk with Jade & Gold Set', promptText: 'wearing Shan silk couple attire paired with Burmese green jade and gold necklaces' },
          { id: 'shan_m_a_2', emoji: '👳', labelMm: 'ခေတ်သစ် ရှမ်းခေါင်းပေါင်း (Pre-styled Shan Silk Turban)', labelEn: 'Pre-styled Pastel Pink Shan Turban', promptText: 'ready-to-wear pastel pink silk turban with gold brooch clip' },
          { id: 'shan_m_a_3', emoji: '💍', labelMm: 'စောဘွားစတိုင် မင်္ဂလာလက်စွပ်ဘူး (Silver Lacquer Ring Presentation Box)', labelEn: 'Silver Ring Presentation Box', promptText: 'holding silver leaf ring box designed with Shan floral motifs' },
          { id: 'shan_m_a_4', emoji: '🌸', labelMm: 'ရှမ်းရိုးရာ သီးသန့် ပန်းစည်း (Orchid & Cherry Blossom Fusion Bouquet)', labelEn: 'Orchid & Cherry Blossom Bouquet', promptText: 'bridal bouquet with wild Shan orchids, pink cherry blossoms, and eucalyptus' },
          { id: 'shan_m_a_5', emoji: '✨', labelMm: 'ခေတ်သစ် ရွှေကွမ်းအစ် (Polished Silver Betel Service Prop)', labelEn: 'Polished Silver Betel Set', promptText: 'decorative silver betel set for studio flatlays' }
        ],
        studioProps: [
          { id: 'shan_m_b_1', emoji: '🖼️', labelMm: 'မော်ဒန် ရှမ်းစက္ကူနှင့် မီးဆိုင်း (Minimalist Saa Paper Panel with Embedded Flower Petals)', labelEn: 'Minimalist Saa Paper Panel with Petals', promptText: 'textured wall panel with dried petals illuminated by soft warm spotlights' },
          { id: 'shan_m_b_2', emoji: '🛋️', labelMm: 'ခေတ်သစ် တင်းပလပ် စိုခုံ (Pastel Upholstered Modern Bench)', labelEn: 'Pastel Upholstered Modern Bench', promptText: 'soft pink or ivory minimal bench matching Shan pastel silk tones' },
          { id: 'shan_m_b_3', emoji: '💡', labelMm: 'ခေတ်သစ် ရှမ်းစက္ကူ မီးဆိုင်း (Modern LED Mulberry Lanterns)', labelEn: 'Modern LED Mulberry Lanterns', promptText: 'sleek cylindrical Saa paper lamps providing soft diffusion' },
          { id: 'shan_m_b_4', emoji: '🌾', labelMm: 'ဖန်တိုင်နှင့် စပါးနှံ (Clear Acrylic Columns topped with Golden Grain & Orchids)', labelEn: 'Acrylic Columns with Golden Grain & Orchids', promptText: 'transparent stands with lush orchid and golden grain arrangements' },
          { id: 'shan_m_b_5', emoji: '🪵', labelMm: 'ခေတ်သစ် သစ်သား ကြမ်းပြင် (Light Oak Parquet Floor with Soft Cream Rug)', labelEn: 'Light Oak Floor with Soft Cream Rug', promptText: 'light wood studio flooring emphasizing pastel Shan outfits' }
        ]
      }
    ]
  },

  // ==========================================
  // 5. ကချင် (Kachin)
  // ==========================================
  {
    id: 'kachin',
    nameMm: '၅။ ကချင် (Kachin)',
    nameEn: '5. Kachin Ethnic Group',
    emoji: '🗡️',
    eras: [
      {
        id: 'ancient',
        eraMm: 'ခေတ်ဟောင်း (Traditional / Pre-colonial Era)',
        eraEn: 'Traditional Pre-colonial Era',
        accessories: [
          { id: 'kachin_a_1', emoji: '👑', labelMm: 'ကချင် ခေါင်းပေါင်းနီ (Kachin Tall Red/Black Woven Crown Headdress - Numhtang)', labelEn: 'Kachin Tall Woven Crown (Numhtang)', promptText: 'wearing tall structured Kachin bridal headdress wrapped in red cotton with woven motifs' },
          { id: 'kachin_a_2', emoji: '💿', labelMm: 'ငွေပြား ရင်ဖုံး တန်ဆာ (Kachin Silver Breastplate Discs - Hpa Daw)', labelEn: 'Kachin Silver Discs (Hpa Daw)', promptText: 'adorned with dozens of circular polished silver discs (Hpa Daw) sewn onto velvet jacket' },
          { id: 'kachin_a_3', emoji: '👂', labelMm: 'ကြေးကွင်း နားတောင်း (Long Silver Cylinder Earrings - Kaning)', labelEn: 'Long Silver Cylinder Earrings (Kaning)', promptText: 'wearing extra-long solid silver tube cylinder earrings hanging to shoulders' },
          { id: 'kachin_a_4', emoji: '🗡️', labelMm: 'ကချင် ဓားလွယ် (Kachin Ceremonial Sword / Dagger - Ntue)', labelEn: 'Kachin Ceremonial Sword (Ntue)', promptText: 'groom holding Kachin sword decorated with animal teeth and red goat hair tassels' },
          { id: 'kachin_a_5', emoji: '⛓️', labelMm: 'ကြေးခါးပတ် စိမ်း (Stacked Black Rattan Waist Rings)', labelEn: 'Stacked Black Rattan Waist Rings', promptText: 'wearing dozens of thin lacquered black rattan hoops around hips' },
          { id: 'kachin_a_6', emoji: '📿', labelMm: 'ငွေသဲလွန် ဆွဲကြိုး (Layered Beaded Silver Necklaces)', labelEn: 'Layered Silver & Amber Necklaces', promptText: 'heavy silver torcs layered with dark red amber beads (Kachin Amber)' }
        ],
        studioProps: [
          { id: 'kachin_b_1', emoji: '🖼️', labelMm: 'မနောတိုင် နောက်ခံ (Manaw Pole Patterned Wall Panel)', labelEn: 'Manaw Pole Patterned Wall Panel', promptText: 'wall panel featuring hand-painted geometric spirals of Kachin Manaw poles (Manaw Shadaw)' },
          { id: 'kachin_b_2', emoji: '🪑', labelMm: 'သစ်လုံး ထိုင်ခုံ (Carved Solid Teak/Hardwood Bench)', labelEn: 'Carved Solid Hardwood Bench', promptText: 'rustic solid wood bench carved with hornbill and buffalo head symbols' },
          { id: 'kachin_b_3', emoji: '🐂', labelMm: 'ကျွဲချိုနှင့် မနောတိုင်အနုပညာ (Ceremonial Water Buffalo Horns & Drums)', labelEn: 'Water Buffalo Horns & Drums', promptText: 'real buffalo horns mounted on wooden bases alongside mini Manaw poles' },
          { id: 'kachin_b_4', emoji: '🔥', labelMm: 'ရိုးရာ မီးတိုင် (Rustic Bamboo Torch Stands)', labelEn: 'Rustic Bamboo Torch Stands', promptText: 'flickering torch-style warm amber spotlights' },
          { id: 'kachin_b_5', emoji: '🪵', labelMm: 'ကချင် ရိုးရာ ရက်ကန်း ကော်ဇော (Heavy Kachin Geometric Woven Carpet)', labelEn: 'Heavy Kachin Geometric Woven Carpet', promptText: 'thick handwoven rug with high-contrast diamond patterns in red, black, and white' }
        ]
      },
      {
        id: 'colonial',
        eraMm: 'ခေတ်လယ် (Colonial to Mid-20th Century Era)',
        eraEn: 'Colonial Era',
        accessories: [
          { id: 'kachin_c_a_1', emoji: '🔔', labelMm: 'ငွေသီးသောင်း ပုခုံးစောင်း (Kachin Silver Fringe Shoulder Drape)', labelEn: 'Kachin Silver Fringe Drape', promptText: 'wearing shoulder cape loaded with dangling silver bell pendants that chime' },
          { id: 'kachin_c_a_2', emoji: '🎒', labelMm: 'ကချင် မင်္ဂလာ လွယ်အိတ် (Beaded Kachin Wedding Bag)', labelEn: 'Beaded Kachin Wedding Bag', promptText: 'black velvet shoulder bag heavily embroidered with cowrie shells and silver beads' },
          { id: 'kachin_c_a_3', emoji: '📿', labelMm: 'ပယင်းနီ ဆွဲကြိုး (Burmese Amber Bead Necklace)', labelEn: 'Burmese Red Amber Bead Necklace', promptText: 'wearing choker made of raw translucent red Kachin amber beads' },
          { id: 'kachin_c_a_4', emoji: '💫', labelMm: 'ကချင် သက်ကယ်စိ ခေါင်းထိုး (Silver Hairpins with Coral/Turquoise Beads)', labelEn: 'Silver Hairpins with Coral', promptText: 'intricate silver headpins set with red coral beads' },
          { id: 'kachin_c_a_5', emoji: '✨', labelMm: 'ငွေလက်ကောက်မိုကြီး (Thick Embossed Silver Cuffs)', labelEn: 'Thick Embossed Silver Cuffs', promptText: 'wide silver wrist cuffs featuring embossed floral and hornbill motifs' }
        ],
        studioProps: [
          { id: 'kachin_c_b_1', emoji: '🖼️', labelMm: 'ကချင် ရက်ကန်း နောက်ခံ (Suspended Kachin Velvet & Beaded Tapestry)', labelEn: 'Suspended Kachin Velvet Tapestry', promptText: 'hanging black velvet backdrop decorated with silver discs and red weaving strips' },
          { id: 'kachin_c_b_2', emoji: '🛋️', labelMm: 'ကျွန်းသစ် ခုံရှည် (Classic Teak Settee with Kachin Beaded Throw Pillows)', labelEn: 'Teak Settee with Kachin Pillows', promptText: 'dark wood settee contrasted with bright geometric Kachin cushions' },
          { id: 'kachin_c_b_3', emoji: '🪜', labelMm: 'ဂျင်ဖော့ ရိုးရာ ပစ္စည်းစင် (Wooden Display Shelf with Kachin Horns & Swords)', labelEn: 'Display Shelf with Kachin Horns & Swords', promptText: 'wooden rack showcasing ceremonial swords, woven hats, and bags' },
          { id: 'kachin_c_b_4', emoji: '💡', labelMm: 'ကြေးမီးအိမ် သိုင်း (Colonial Brass Lamps on Wooden Stands)', labelEn: 'Colonial Brass Lamps on Stands', promptText: 'warm oil lamps highlighting gleam of silver breastplate discs' },
          { id: 'kachin_c_b_5', emoji: '🪵', labelMm: 'ကချင် ရိုးရာ ဖျာ (Woven Bamboo Floor Mat with Kachin Border)', labelEn: 'Woven Bamboo Floor Mat', promptText: 'dark split-bamboo matting with red cloth piping' }
        ]
      },
      {
        id: 'modern',
        eraMm: 'ခေတ်သစ် (Modern & Contemporary Era)',
        eraEn: 'Modern & Contemporary Era',
        accessories: [
          { id: 'kachin_m_a_1', emoji: '💿', labelMm: 'ခေတ်သစ် ငွေပြား ရင်ဖုံး အကျီ င်္ (Modern Tailored Kachin Silver Disc Jacket)', labelEn: 'Modern Kachin Silver Disc Jacket', promptText: 'fitted modern velvet blouse featuring high-grade polished sterling silver discs' },
          { id: 'kachin_m_a_2', emoji: '👑', labelMm: 'ခေတ်သစ် ကချင် ခေါင်းပေါင်း (Structured Modern Kachin Headdress)', labelEn: 'Structured Modern Kachin Headdress', promptText: 'pre-formed lightweight red and silver thread headpiece' },
          { id: 'kachin_m_a_3', emoji: '✉️', labelMm: 'မနောတိုင် စတိုင် မင်္ဂလာကတ် (Manaw Motif Acrylic Wedding Cards)', labelEn: 'Manaw Motif Wedding Cards', promptText: 'invitation cards featuring red, silver, and black geometric foil designs' },
          { id: 'kachin_m_a_4', emoji: '💐', labelMm: 'ကချင် ရိုးရာ စိုင်ပန်းစည်း (Red Rose & Native Fern Bridal Bouquet)', labelEn: 'Red Rose & Native Fern Bouquet', promptText: 'rich crimson roses mixed with wild mountain ferns and silver eucalyptus' },
          { id: 'kachin_m_a_5', emoji: '💎', labelMm: 'စိန်နှင့် ငွေ နားတောင်း (Modern Sterling Silver Kachin Tube Earrings)', labelEn: 'Modern Silver Cylinder Earrings', promptText: 'high-polish silver cylinder earrings adjusted for modern comfort' }
        ],
        studioProps: [
          { id: 'kachin_m_b_1', emoji: '🖼️', labelMm: 'မော်ဒန် မနောတိုင် LED နောက်ခံ (Contemporary Matte Black Arch with LED Manaw Lines)', labelEn: 'Contemporary Arch with LED Manaw Lines', promptText: 'sleek black backdrop accented with glowing red and white LED geometric stripes' },
          { id: 'kachin_m_b_2', emoji: '🛋️', labelMm: 'ခေတ်သစ် အဖြူရောင် တင်းပလပ် စိုခုံ (Minimalist White Settee)', labelEn: 'Minimalist White Settee', promptText: 'modern bench allowing vibrant Kachin silver and red attire to pop' },
          { id: 'kachin_m_b_3', emoji: '🏛️', labelMm: 'မနောတိုင် ရွှေရောင် စတန်း (Gilded Miniature Manaw Pole Pillars)', labelEn: 'Gilded Miniature Manaw Pole Pillars', promptText: 'stylized gold pillars flanking the bridal settee' },
          { id: 'kachin_m_b_4', emoji: '💡', labelMm: 'ခေတ်သစ် စတူဒီယို မီးဆိုင်း (High-Contrast Studio Softbox & Rim Lights)', labelEn: 'Studio Softbox & Rim Lights', promptText: 'dynamic lighting tuned to capture metallic shine of silver discs' },
          { id: 'kachin_m_b_5', emoji: '🪵', labelMm: 'ဆန်းပြား သစ်သား ကြမ်းပြင် (Dark Charcoal Studio Floor with Kachin Geometric Runner)', labelEn: 'Dark Floor with Kachin Geometric Runner', promptText: 'matte dark floor with sharp red-and-silver geometric carpet' }
        ]
      }
    ]
  },

  // ==========================================
  // 6. ရခိုင် (Rakhine)
  // ==========================================
  {
    id: 'rakhine',
    nameMm: '၆။ ရခိုင် (Rakhine)',
    nameEn: '6. Rakhine Ethnic Group',
    emoji: '🚣',
    eras: [
      {
        id: 'ancient',
        eraMm: 'ခေတ်ဟောင်း (Royal & Pre-colonial Era - Mrauk-U Kingdom)',
        eraEn: 'Royal Mrauk-U Kingdom Era',
        accessories: [
          { id: 'rakhine_a_1', emoji: '👑', labelMm: 'မြောက်ဦး ရာဇသင်းကျစ် (Mrauk-U Royal Gold Crown / Tiara)', labelEn: 'Mrauk-U Royal Gold Crown', promptText: 'wearing intricate tiered gold crown with flame-like crest motifs (Mrauk-U)' },
          { id: 'rakhine_a_2', emoji: '🎖️', labelMm: 'ရခိုင် ရိုးရာ စလွယ် (Multi-strand Gold Royal Salwe Sash)', labelEn: 'Multi-strand Gold Royal Salwe', promptText: 'wearing imperial multi-chain gold Salwe sash across chest' },
          { id: 'rakhine_a_3', emoji: '👂', labelMm: 'ရခိုင် တင်းထိုး နားတောင်း (Large Hollow Gold Ear Plugs - Nadaung)', labelEn: 'Large Hollow Gold Ear Plugs (Nadaung)', promptText: 'wearing heavy cylinder-shaped gold ear plugs studded with rubies' },
          { id: 'rakhine_a_4', emoji: '🎁', labelMm: 'ရခိုင် ရိုးရာ ကွမ်းခင်း (Mrauk-U Silver Betel Casket Set)', labelEn: 'Mrauk-U Silver Betel Casket', promptText: 'high-grade silver betel container shaped like sacred bird' },
          { id: 'rakhine_a_5', emoji: '🥣', labelMm: 'သပြေခက်နှင့် ရခိုင် ရေဖလား (Rakhine Silver Water Blessing Vessel)', labelEn: 'Rakhine Silver Water Blessing Vessel', promptText: 'silver bowl containing fragrant floral water and Eugenia leaves' },
          { id: 'rakhine_a_6', emoji: '🌸', labelMm: 'စံပယ်နှင့် သဇင်ပန်း ဆံထုံး (Rakhine Royal Orchid Hair Arrangement)', labelEn: 'Rakhine Royal Orchid Hair Updo', promptText: 'high regal hair updo entwined with royal Thazin and jasmine strands' }
        ],
        studioProps: [
          { id: 'rakhine_b_1', emoji: '🗿', labelMm: 'မြောက်ဦး ကျောက်ဆစ် ပန်းချီ နောက်ခံ (Mrauk-U Stone Relief Carving Backdrop)', labelEn: 'Mrauk-U Stone Relief Backdrop', promptText: 'stone-textured backdrop depicting Mrauk-U temple carvings and archways' },
          { id: 'rakhine_b_2', emoji: '🪑', labelMm: 'ရခိုင် ရာဇပလ္လင် (Mrauk-U Style Royal Gilded Throne)', labelEn: 'Mrauk-U Royal Gilded Throne', promptText: 'heavy carved teakwood throne accented with gold leaf and red lacquer' },
          { id: 'rakhine_b_3', emoji: '🪔', labelMm: 'ကြေးဆီမီးတိုင် (Multi-Tiered Rakhine Brass Oil Lamps)', labelEn: 'Multi-Tiered Rakhine Brass Oil Lamps', promptText: 'traditional brass oil lamps shaped like pagoda finials' },
          { id: 'rakhine_b_4', emoji: '☂️', labelMm: 'ရခိုင် ထီးဖြူကြီးများ (Pair of Royal White Umbrellas with Gold Fringe)', labelEn: 'Royal White Umbrellas with Gold Fringe', promptText: 'tiered white silk umbrellas positioned behind throne' },
          { id: 'rakhine_b_5', emoji: '🛋️', labelMm: 'ရာဇ ကတ္တီပါ ကော်ဇော (Deep Maroon Velvet Floor Carpet)', labelEn: 'Deep Maroon Velvet Carpet', promptText: 'rich maroon rug with gold bullion wire borders' }
        ]
      },
      {
        id: 'colonial',
        eraMm: 'ခေတ်လယ် (Colonial to Mid-20th Century Era)',
        eraEn: 'Colonial Era',
        accessories: [
          { id: 'rakhine_c_a_1', emoji: '👗', labelMm: 'ရခိုင် ရိုးရာ အထက်ဆင် ချိတ် (Rakhine Woven Silk Htamein - Rakhine Longyi)', labelEn: 'Rakhine Woven Silk Longyi', promptText: 'wearing thick silk skirt with bold horizontal Rakhine geometric wave weaves' },
          { id: 'rakhine_c_a_2', emoji: '📿', labelMm: 'ရွှေဆွဲကြိုး တောင်ဆင်း (Layered Gold Coin Necklace)', labelEn: 'Layered Gold Coin Necklace', promptText: 'gold chain studded with historic Mrauk-U silver/gold coins' },
          { id: 'rakhine_c_a_3', emoji: '⛓️', labelMm: 'ရခိုင် ရိုးရာ ရွှေခါးပတ် (Solid Gold Filigree Waist Belt)', labelEn: 'Solid Gold Filigree Belt', promptText: 'wide articulated gold belt securing woven silk longyi' },
          { id: 'rakhine_c_a_4', emoji: '🦚', labelMm: 'ငွေခက် ဆံထိုး (Rakhine Silver Peacock Hair Comb)', labelEn: 'Rakhine Silver Peacock Hair Comb', promptText: 'curved silver comb inserted into side of bridal hair bun' },
          { id: 'rakhine_c_a_5', emoji: '🧣', labelMm: 'ရခိုင် ရိုးရာ ပဝါ (Rakhine Silk Shoulder Sash - Red/Yellow)', labelEn: 'Rakhine Silk Shoulder Sash', promptText: 'woven red and yellow silk sash draped neatly over shoulder' }
        ],
        studioProps: [
          { id: 'rakhine_c_b_1', emoji: '🖼️', labelMm: 'ရခိုင် ရက်ကန်း စကေရာ (Rakhine Woven Silk Tapestry Backdrop)', labelEn: 'Rakhine Woven Silk Tapestry Backdrop', promptText: 'hanging silk wall drape showcasing rich maroon, gold, and green Rakhine patterns' },
          { id: 'rakhine_c_b_2', emoji: '🛋️', labelMm: 'ကျွန်းထိုင်ခုံကြီး (Carved Teakwood Bridal Bench with Velvet Cushions)', labelEn: 'Carved Teakwood Bench with Velvet Cushions', promptText: 'classic dark teak bench lined with rich red velvet cushions' },
          { id: 'rakhine_c_b_3', emoji: '🏺', labelMm: 'ရှေးဟောင်း ရခိုင် အိုးကြီးများ (Antique Brass Water Urns with Fresh Jasmines)', labelEn: 'Antique Brass Water Urns', promptText: 'polished brass urns filled with Eugenia branches and jasmine garlands' },
          { id: 'rakhine_c_b_4', emoji: '💡', labelMm: 'ကြေးမီးအိမ် (Colonial Hanging Oil Lamps)', labelEn: 'Colonial Hanging Oil Lamps', promptText: 'warm tungsten lanterns mounted on wood pillars' },
          { id: 'rakhine_c_b_5', emoji: '🪵', labelMm: 'ရခိုင် ရိုးရာ ဖျာနီ (Traditional Woven Red Matting)', labelEn: 'Traditional Woven Red Matting', promptText: 'smooth woven red matting layered over wood floorboards' }
        ]
      },
      {
        id: 'modern',
        eraMm: 'ခေတ်သစ် (Modern & Contemporary Era)',
        eraEn: 'Modern & Contemporary Era',
        accessories: [
          { id: 'rakhine_m_a_1', emoji: '💎', labelMm: 'ရခိုင် ချိတ်အင်္ကျီနှင့် စိန်တန်ဆာ (Modern Rakhine Silk Match with Diamond Set)', labelEn: 'Modern Rakhine Silk with Diamond Set', promptText: 'wearing custom Rakhine silk longyi paired with modern diamond necklace and drop earrings' },
          { id: 'rakhine_m_a_2', emoji: '👑', labelMm: 'ခေတ်သစ် ရခိုင် သင်းကျစ် (Lightweight Modern Gold Rakhine Tiara)', labelEn: 'Modern Gold Rakhine Tiara', promptText: 'modernized gold tiara contoured for comfortable hair styling' },
          { id: 'rakhine_m_a_3', emoji: '🥣', labelMm: 'မင်္ဂလာ လက်ဖွဲ့ ငွေဖလား (Polished Silver Blessing Tray)', labelEn: 'Polished Silver Blessing Tray', promptText: 'engraved silver bowl containing jasmine flowers and Eugenia blessing leaves' },
          { id: 'rakhine_m_a_4', emoji: '💐', labelMm: 'ရခိုင် ရိုးရာ စံပယ်ပန်းစည်း (Cascading White Orchid & Jasmine Bouquet)', labelEn: 'White Orchid & Jasmine Bouquet', promptText: 'cascading bridal bouquet featuring white orchids and fresh jasmine' },
          { id: 'rakhine_m_a_5', emoji: '💍', labelMm: 'မင်္ဂလာ လက်စွပ်ဘူး (Embossed Velvet Ring Box)', labelEn: 'Embossed Velvet Ring Box', promptText: 'velvet box embossed with Rakhine royal flame motifs' }
        ],
        studioProps: [
          { id: 'rakhine_m_b_1', emoji: '🖼️', labelMm: 'မော်ဒန် မြောက်ဦး မုတ်နှင့် LED မီး (Modern Archway with Mrauk-U Arch Silhouette & Soft LED)', labelEn: 'Modern Archway with Mrauk-U Silhouette', promptText: 'clean arched panel inspired by Mrauk-U temple doors with warm perimeter lighting' },
          { id: 'rakhine_m_b_2', emoji: '🛋️', labelMm: 'ခေတ်သစ် အဖြူရောင် တင်းပလပ် စိုခုံ (Modern Cream Boucle Bench)', labelEn: 'Modern Cream Boucle Bench', promptText: 'minimalist neutral bench complementing rich Rakhine silk tones' },
          { id: 'rakhine_m_b_3', emoji: '🕯️', labelMm: 'ကြည်လင် ဖန်တိုင်များနှင့် ဖယောင်းတိုင် (Acrylic Pedestals with Floating Candles & White Lilies)', labelEn: 'Acrylic Pedestals with Floating Candles', promptText: 'glass cylinders holding floating lights and white blooms' },
          { id: 'rakhine_m_b_4', emoji: '💡', labelMm: 'ပျော့ပျောင်းသော ပန်းရောင် စတူဒီယို မီးဆိုင်း (Soft Studio Softbox Array)', labelEn: 'Soft Studio Softbox Array', promptText: 'even lighting designed to bring out silk luster and metallic reflections' },
          { id: 'rakhine_m_b_5', emoji: '✨', labelMm: 'ခေတ်သစ် သစ်သား ကြမ်းပြင် (Light Oak Parquet Floor with Maroon Runner)', labelEn: 'Light Oak Floor with Maroon Runner', promptText: 'neutral floor featuring deep maroon runner bordered with Rakhine silk trims' }
        ]
      }
    ]
  }
];
