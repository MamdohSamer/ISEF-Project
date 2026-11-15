export interface LossMetric {
  id: string;
  label: string;
  shortLabel: string;
  valueDisplay: string;
  numericValue: number;
  unit: string;
  agency: string;
  detail: string;
  sourceUrl?: string;
}

export interface SampleProfile {
  id: string;
  name: string;
  category: 'Reference Standard' | 'Agricultural Formulation' | 'Fault / Adulterated';
  ec25: number; // uS/cm at 25C
  tdsPpm: number;
  rgb: [number, number, number];
  clear: number;
  absorbance660: number; // A660
  iOverI0: number;
  statusLabel: string;
  agronomicEffect: string;
  notes: string;
}

export interface ProcedureStep {
  stepNumber: string;
  title: string;
  summary: string;
  bullets: string[];
  equation?: {
    label: string;
    formula: string;
    variables: string;
  };
  pinout?: {
    subsystem: string;
    component: string;
    spec: string;
    gpioOrRail: string;
    role: string;
  }[];
}

export interface ApaReference {
  id: string;
  group: 'Core Project & Global Fertilizer Data' | 'Multimodal Sensing & Hardware Literature' | 'Supporting Global Reports';
  authorsYear: string;
  apaText: string;
  url?: string;
  urlLabel?: string;
  doi?: string;
}

export const ABSTRACT_TEXT = {
  en: `Making sure liquid fertilizers have the exact chemical formula and concentration is very essential for optimal crop productivity, yet fertilizer mismanagement is a huge problem that wastes massive amounts of money around the world. Overusing nutrients wastes around $200 billion every year in lost nitrogen and causes $152 billion in water ecosystem damage, while not using enough causes an estimated $196 billion in lost annual crop yields and a 10% yield drop on degraded soils. Furthermore, within the $10.22 billion global liquid fertilizer market, lab testing shows that up to 17.35% of supplementary macro and micro nutrient products are adulterated and 4.3% fall below legal nutrient limits, which causes about $2.21 billion in direct wasted liquid fertilizer money every year—and almost $49.71 billion when scaled across the broader $229.60 billion global fertilizer market. In field operations, farmers often apply imbalanced NPK mixes, expired or precipitated batches, or fake salt adulterated solutions because of manual dilution errors, degraded labels, and the limitations of normal portable electrical conductivity (EC) meters, which cannot distinguish different chemical species or adulterants sharing identical conductivity profiles. Applying overly concentrated solutions triggers osmotic root shock and fertilizer burn, whereas diluted or degraded batches cause nutrient deficiencies and soil salinization, yet benchtop laboratory spectrophotometers remain way too expensive and slow for routine field use. To fix this challenge, our project builds the Portable Multimodal Chemical Identification System (PMCIS), a low cost, field deployable platform powered by an ESP32 microcontroller that fuses electrochemical, thermal, and optical sensing to fingerprint liquid fertilizers. Specifically, the device integrates an analog Total Dissolved Solids (TDS) sensor to measure ionic conductivity, a waterproof DS18B20 temperature sensor to monitor temperature changes because the solubility condition of salts and nutrients changes according to the temperature of the solution, a TCS34725 RGB color sensor to capture spectral color signatures, and a custom 660 nm LED and BPW34 photodiode chamber to measure optical absorbance. By combining these sensor outputs into a unified 7 dimensional feature vector and matching sample signatures against calibrated fertilizer reference profiles, PMCIS accurately identifies fertilizer formulations, verifies dilution accuracy, and flags degraded or adulterated batches in real time.`,
  ar: `يُعد التأكد من امتلاك الأسمدة السائلة للتركيبة الكيميائية والتركيز الدقيقين أمراً أساسياً للغاية لتحقيق أفضل إنتاجية للمحاصيل، إلا أن سوء إدارة الأسمدة يمثل مشكلة ضخمة تهدر مبالغ هائلة من الأموال حول العالم. فالإفراط في استخدام المغذيات يهدر حوالي ٢٠٠ مليار دولار سنوياً من النيتروجين المفقود ويسبب أضراراً للنظم البيئية المائية بقيمة ١٥٢ مليار دولار، بينما يؤدي نقص الاستخدام إلى خسائر تُقدّر بنحو ١٩٦ مليار دولار في إنتاجية المحاصيل السنوية وانخفاض الإنتاجية بنسبة ١٠٪ في التربة المتدهورة. وعلاوة على ذلك، ضمن سوق الأسمدة السائلة العالمي البالغ ١٠,٢٢ مليار دولار، تُظهر الاختبارات المعملية أن ما يصل إلى ١٧,٣٥٪ من منتجات المغذيات الكبرى والصغرى التكميلية مغشوشة، وأن ٤,٣٪ منها تقل عن الحدود القانونية للمغذيات، مما يسبب خسائر مباشرة بنحو ٢,٢١ مليار دولار من أموال الأسمدة السائلة المهدرة سنوياً، وما يقرب من ٤٩,٧١ مليار دولار عند قياسها على مستوى سوق الأسمدة العالمي الأوسع. في العمليات الميدانية، غالباً ما يطبق المزارعون خلطات غير متوازنة، أو دفعات منتهية الصلاحية أو مترسبة، أو محاليل مغشوشة بالأملاح الرخيصة بسبب أخطاء التخفيف اليدوي، أو تلف الملصقات، ومحدودية أجهزة قياس التوصيل الكهربائي المحمولة العادية التي لا تستطيع التمييز بين الأنواع الكيميائية المختلفة أو المواد المغشوشة التي تشترك في نفس قيم التوصيلية. إن استخدام محاليل عالية التركيز يسبب صدمة أسموزية للجذور وحرقاً للأسمدة، في حين أن الدفعات المخففة أو المتدهورة تسبب نقصاً في المغذيات وتملحاً للتربة، ومع ذلك تظل أجهزة قياس الطيف الضوئي المعملية باهظة الثمن وبطيئة للغاية بحيث لا تناسب الاستخدام الميداني الروتيني. ولحل هذا التحدي، يطور مشروعنا نظام التعرف الكيميائي المحمول متعدد الوسائط، وهو منصة منخفضة التكلفة وقابلة للنشر الميداني تعمل بواسطة متحكم دقيق وتدمج الاستشعار الكهروكيميائي والحراري والبصري لإنشاء بصمة كيميائية للأسمدة السائلة. وعلى وجه التحديد، يدمج الجهاز مستشعر إجمالي المواد الصلبة الذائبة التناظري لقياس التوصيلية الأيونية، ومستشعر حرارة مقاوم للماء لمراقبة تغيرات درجة الحرارة نظراً لأن حالة ذوبانية الأملاح والمغذيات تتغير تبعاً لدرجة حرارة المحلول، بالإضافة إلى مستشعر ألوان لالتقاط البصمات اللونية الطيفية، وغرفة بصرية مخصصة مزودة بمصباح أحمر بطول موجي ٦٦٠ نانومتر وثنائي ضوئي لقياس الامتصاص الضوئي. ومن خلال دمج مخرجات هذه المستشعرات في متجه خصائص موحد سباعي الأبعاد ومطابقة بصمات العينات مع مكتبة مرجعية معايرة للأسمدة، يقوم النظام بتحديد تركيبات الأسمدة بدقة، والتحقق من دقة التخفيف، واكتشاف الدفعات المتدهورة أو المغشوشة في الوقت الفعلي.`
};

export const GRAPH_1_OVERUSE: LossMetric[] = [
  {
    id: 'wasted-nitrogen',
    label: 'Direct Wasted Nitrogen (Air & Water)',
    shortLabel: 'Wasted Nitrogen',
    valueDisplay: '$200B / yr',
    numericValue: 200,
    unit: 'USD Billions',
    agency: 'United Nations Economic Commission for Europe (UNECE, 2021)',
    detail: 'Globally, crops absorb only 50% to 65% of applied nitrogen; tens of millions of tonnes leach into waterways or volatilize as greenhouse gases.'
  },
  {
    id: 'ecosystem-damage',
    label: 'Aquatic Ecosystem & Water Damage',
    shortLabel: 'Ecosystem Damage',
    valueDisplay: '$152B / yr',
    numericValue: 152,
    unit: 'USD Billions',
    agency: 'Nature Sustainability / Nitrogen Study',
    detail: 'Excess nutrient runoff triggers toxic algal blooms, eutrophication, and coastal aquatic dead zones.'
  },
  {
    id: 'human-health',
    label: 'Human Health Costs (Ammonia Air Pollution)',
    shortLabel: 'Health Costs',
    valueDisplay: '$130B / yr',
    numericValue: 130,
    unit: 'USD Billions',
    agency: 'Agricultural Ammonia Premature Mortality Estimates',
    detail: 'Agricultural ammonia emissions form fine particulate matter contributing to severe respiratory illness and premature mortality.'
  },
  {
    id: 'unep-lower',
    label: 'Broader Environmental Burden (Lower Bound)',
    shortLabel: 'UNEP Burden (Min)',
    valueDisplay: '$340B / yr',
    numericValue: 340,
    unit: 'USD Billions',
    agency: 'United Nations Environment Programme (UNEP)',
    detail: 'Total nitrogen pollution burden spans $340B to $3.4T annually when accounting for long-term climate and ecological impacts.'
  }
];

export const GRAPH_2_UNDERUSE_FINANCIAL: LossMetric[] = [
  {
    id: 'yield-gap-value',
    label: 'Lost Annual Crop Yield Value (Under-Fertilized Regions)',
    shortLabel: 'Yield Opportunity Loss',
    valueDisplay: '$196B / yr',
    numericValue: 196,
    unit: 'USD Billions',
    agency: 'Nature Study (Sub-Saharan Africa & MENA)',
    detail: 'Optimizing nitrogen delivery in under-fertilized agricultural regions would generate an estimated $196 billion in additional annual crop output.'
  },
  {
    id: 'africa-degradation',
    label: 'Continental Soil Degradation (Africa)',
    shortLabel: 'Africa Soil Loss',
    valueDisplay: '$4B / yr',
    numericValue: 4,
    unit: 'USD Billions',
    agency: 'Continental Nutrient Management Assessment',
    detail: 'Soil mining—harvesting without replenishing macronutrients—depletes soil reserves across millions of smallholder farms.'
  }
];

export const GRAPH_2_UNDERUSE_YIELD_PCT: LossMetric[] = [
  {
    id: 'no-till-omission',
    label: 'No-Till Conservation Yield Drop (N Omitted)',
    shortLabel: 'No-Till N Omission',
    valueDisplay: '12.0%',
    numericValue: 12,
    unit: '% Yield Drop',
    agency: 'UC Davis Global Meta-Analysis',
    detail: 'Crop yields drop by 12% in no-till systems when nitrogen fertilizer is omitted, compared to only a 4% variance when properly supplied.'
  },
  {
    id: 'fao-soil-degradation',
    label: 'Soil Degradation Crop Yield Reduction',
    shortLabel: 'FAO Soil Degradation',
    valueDisplay: '10.0%',
    numericValue: 10,
    unit: '% Yield Drop',
    agency: 'Food and Agriculture Organization (FAO, 2023)',
    detail: 'Nutrient depletion and land degradation reduce crop yields by 10% across regions affecting 1.7 billion people.'
  },
  {
    id: 'cfr-supply-shock',
    label: 'Projected Cereal Producer Income Loss (2026)',
    shortLabel: '2026 Supply Shock',
    valueDisplay: '5.0%',
    numericValue: 5,
    unit: '% Income Loss',
    agency: 'Council on Foreign Relations (CFR)',
    detail: 'Sudden fertilizer shortages and price spikes force growers to cut liquid and granular inputs, reducing cereal producer incomes up to 5%.'
  },
  {
    id: 'no-till-supplied',
    label: 'No-Till Variance (Proper N Supplied Baseline)',
    shortLabel: 'Proper N Baseline',
    valueDisplay: '4.0%',
    numericValue: 4,
    unit: '% Variance',
    agency: 'UC Davis Global Meta-Analysis',
    detail: 'Reference variance benchmark showing stabilized output when accurate nitrogen replenishment is maintained.'
  }
];

export const GRAPH_3_WRONG_LIQUID: LossMetric[] = [
  {
    id: 'liquid-adulteration',
    label: 'Adulterated Liquid & Bio-Supplements (17.35% Failure)',
    shortLabel: 'Adulterated (17.35%)',
    valueDisplay: '$1.77B / yr',
    numericValue: 1.77,
    unit: 'USD Billions',
    agency: 'Mordor Intelligence ($10.22B) × Siddique et al. (2023)',
    detail: '17.35% of supplementary macro/micro-nutrient products (liquid humic acid, amino acid, bio-phosphate) failed laboratory adulteration surveillance.'
  },
  {
    id: 'liquid-micronutrient',
    label: 'Below-Spec Micronutrient Mixes (4.3% Failure)',
    shortLabel: 'Below-Spec (4.3%)',
    valueDisplay: '$0.44B / yr',
    numericValue: 0.44,
    unit: 'USD Billions',
    agency: 'Mordor Intelligence ($10.22B) × Siddique et al. (2023)',
    detail: '4.3% of micronutrient mixes (Zn, Cu, Fe, Mn) fell below minimum legal nutrient concentrations.'
  },
  {
    id: 'liquid-combined',
    label: 'Combined Direct Liquid Fertilizer Waste',
    shortLabel: 'Combined Liquid Loss',
    valueDisplay: '$2.21B / yr',
    numericValue: 2.21,
    unit: 'USD Billions',
    agency: 'Calculated Global Liquid Segment Loss',
    detail: 'Direct wasted grower expenditure in the $10.22B liquid fertilizer segment before counting secondary root burn or yield failure.'
  }
];

export const GRAPH_3_WRONG_TOTAL: LossMetric[] = [
  {
    id: 'total-adulteration',
    label: 'Scaled Adulteration Loss (17.35% Across $229.60B)',
    shortLabel: 'Scaled Adulterated',
    valueDisplay: '$39.84B / yr',
    numericValue: 39.84,
    unit: 'USD Billions',
    agency: 'Mordor Intelligence ($229.60B) × Siddique et al. (2023)',
    detail: 'Applying the 17.35% laboratory defect rate across the $229.60B global fertilizer market equals $39.84 billion in annual waste.'
  },
  {
    id: 'total-micronutrient',
    label: 'Scaled Below-Spec Micronutrient Loss (4.3%)',
    shortLabel: 'Scaled Below-Spec',
    valueDisplay: '$9.87B / yr',
    numericValue: 9.87,
    unit: 'USD Billions',
    agency: 'Mordor Intelligence ($229.60B) × Siddique et al. (2023)',
    detail: 'Applying the 4.3% legal deficit threshold across the global market represents $9.87 billion in under-potency inputs.'
  },
  {
    id: 'total-combined',
    label: 'Combined Global Scaled Direct Product Loss',
    shortLabel: 'Combined Global Loss',
    valueDisplay: '$49.71B / yr',
    numericValue: 49.71,
    unit: 'USD Billions',
    agency: 'Calculated Total Fertilizer Market Scale',
    detail: 'Combined direct annual expenditure lost to adulterated, degraded, expired, or below-spec formulations globally.'
  }
];

export const REGIONAL_QUALITY_CASES = [
  {
    region: 'Tanzania',
    metric: 'Up to 40%',
    label: 'Fake or diluted fertilizer market share',
    source: 'Chemicals Knowledge Hub'
  },
  {
    region: 'Uganda',
    metric: '33% less N',
    label: 'Blind tests showed urea missing 1/3 advertised nitrogen',
    source: 'Field Quality Surveillance'
  },
  {
    region: 'Vietnam',
    metric: '~$2B / year',
    label: 'National agricultural damage from substandard & fake fertilizers',
    source: 'National Agricultural Trade Analysis'
  },
  {
    region: 'Global Baseline',
    metric: '17.35%',
    label: 'Supplementary macro/micro-nutrient samples adulterated in lab tests',
    source: 'Siddique et al. (2023) via ResearchGate'
  }
];

export const SAMPLE_PROFILES: SampleProfile[] = [
  {
    id: 'nacl-50',
    name: 'Sodium Chloride (NaCl · 50 mM)',
    category: 'Reference Standard',
    ec25: 5560,
    tdsPpm: 2780,
    rgb: [242, 246, 248],
    clear: 940,
    absorbance660: 0.014,
    iOverI0: 0.968,
    statusLabel: 'Verified Pure Electrolyte',
    agronomicEffect: 'High salinity risk if mislabeled as nutrient mix — causes osmotic root shock.',
    notes: 'Overlaps strongly in raw EC/TDS with KCl (50 mM) and certain salt-cut NPK mixes, making 1D meters blind to identity.'
  },
  {
    id: 'kcl-50',
    name: 'Potassium Chloride (KCl · 50 mM)',
    category: 'Reference Standard',
    ec25: 5620,
    tdsPpm: 2810,
    rgb: [238, 244, 246],
    clear: 932,
    absorbance660: 0.018,
    iOverI0: 0.959,
    statusLabel: 'Verified Potash Standard',
    agronomicEffect: 'Delivers bioavailable potassium (K+); visually clear like NaCl.',
    notes: 'Only ~1.1% EC difference vs. NaCl at 50 mM. Single-parameter TDS pens cannot separate KCl from NaCl.'
  },
  {
    id: 'cuso4-micro',
    name: 'Copper Sulfate (CuSO4 · Micronutrient)',
    category: 'Agricultural Formulation',
    ec25: 3890,
    tdsPpm: 1945,
    rgb: [42, 168, 232],
    clear: 520,
    absorbance660: 0.612,
    iOverI0: 0.244,
    statusLabel: 'Verified Cu Micronutrient',
    agronomicEffect: 'Correctly calibrated trace copper supplement for fertigation.',
    notes: 'Strong 660 nm red-spectrum absorption (A = 0.612) plus deep cyan-blue TCS34725 chromatic signature.'
  },
  {
    id: 'npk-balanced',
    name: 'Liquid NPK 10-10-10 (Calibrated)',
    category: 'Agricultural Formulation',
    ec25: 4480,
    tdsPpm: 2240,
    rgb: [76, 198, 128],
    clear: 685,
    absorbance660: 0.348,
    iOverI0: 0.449,
    statusLabel: 'Verified Dilution Target',
    agronomicEffect: 'Optimal balanced N-P-K profile for drip fertigation without burn.',
    notes: 'Distinct emerald chromatic profile paired with moderate 660 nm attenuation.'
  },
  {
    id: 'salt-adulterated',
    name: 'Salt-Adulterated NPK (Fake Cut)',
    category: 'Fault / Adulterated',
    ec25: 4510,
    tdsPpm: 2255,
    rgb: [198, 214, 196],
    clear: 878,
    absorbance660: 0.068,
    iOverI0: 0.855,
    statusLabel: 'FLAGGED: Adulterated Batch',
    agronomicEffect: 'Dangerous cheap-salt filler mimics NPK EC reading while starving crops of real N-P-K.',
    notes: 'EC25 matches authentic NPK 10-10-10 (4510 vs 4480 uS/cm), fooling standard TDS meters—but 660 nm absorbance and RGB vectors immediately expose missing chromophores.'
  },
  {
    id: 'expired-precipitated',
    name: 'Expired / Precipitated Humic Mix',
    category: 'Fault / Adulterated',
    ec25: 2940,
    tdsPpm: 1470,
    rgb: [112, 86, 54],
    clear: 245,
    absorbance660: 0.945,
    iOverI0: 0.114,
    statusLabel: 'FLAGGED: Degraded / Precipitated',
    agronomicEffect: 'Suspended precipitate clogs drip emitters and delivers <60% bioavailable nutrition.',
    notes: 'Excessive turbidity causes sharp Clear drop (245) and anomalous 660 nm attenuation spike (A = 0.945).'
  }
];

export const PROCEDURE_STEPS: ProcedureStep[] = [
  {
    stepNumber: '01',
    title: 'Hardware Assembly & Circuit Wiring',
    summary: 'Construct the regulated 2S Li-ion power rail and connect all four sensing modalities to dedicated ESP32 DevKit V1 GPIO channels.',
    bullets: [
      'Power Subsystem: Wire two 18650 Li-ion cells (7.4V nominal) in series via a 2S BMS module into a DC-DC Buck Converter stepped down to a regulated 5V rail feeding the ESP32 VIN pin, with all grounds tied to a single common GND rail.',
      'DS18B20 Temperature Probe: Connect power to 3.3V, ground to common GND, and data to GPIO 4 with a 4.7 kΩ pull-up resistor between data and 3.3V.',
      'Gravity TDS Sensor V1.0: Connect VCC to 5V, GND to common rail, and analog signal pin A to GPIO 34 (12-bit ADC1 input-only pin).',
      'TCS34725 Color Sensor: Connect VIN to 3.3V, GND to common rail, SDA to GPIO 21, and SCL to GPIO 22 on the hardware I2C bus.',
      'Optical Absorbance Chamber: Mount the 660 nm narrowband red LED opposite the BPW34 silicon PIN photodiode inside a light-shielded cuvette enclosure; feed the transimpedance amplifier output to GPIO 35 (ADC1).'
    ],
    pinout: [
      { subsystem: 'Processing Unit', component: 'ESP32 DevKit V1', spec: '30-pin, 240 MHz Dual-Core, 12-bit ADC', gpioOrRail: 'VIN 5V / Common GND', role: 'Data acquisition, thermodynamic compensation, feature vector fusion' },
      { subsystem: 'Electrochemical', component: 'Gravity TDS Sensor V1.0', spec: 'Analog 0–2.3V, 0–1000 ppm range', gpioOrRail: 'GPIO 34 (ADC1) · 5V', role: 'Measures raw solution electrical conductivity (EC_T) & TDS' },
      { subsystem: 'Thermal Sensing', component: 'DS18B20 Probe', spec: 'Waterproof OneWire, ±0.5°C accuracy', gpioOrRail: 'GPIO 4 (4.7 kΩ Pull-up) · 3.3V', role: 'Tracks solution temperature T because salt solubility changes with temp' },
      { subsystem: 'Color Spectrometry', component: 'TCS34725 Module', spec: 'RGB + Clear sensing, IR blocking filter', gpioOrRail: 'GPIO 21 (SDA) / GPIO 22 (SCL)', role: 'Captures spectral color shifts and chromatic transmission ratios' },
      { subsystem: 'Optical Absorbance', component: 'BPW34 + 660 nm LED', spec: 'Silicon PIN Photodiode + Narrowband Red LED', gpioOrRail: 'GPIO 35 (ADC1)', role: 'Measures monochromatic light attenuation (I / I0) through cuvette' },
      { subsystem: 'Power Supply', component: '2S 18650 + Buck Module', spec: '2x 18650 (7.4V), 2S BMS, 5V Buck', gpioOrRail: 'Regulated 5V Rail', role: 'Provides noise-free portable power for remote agricultural field use' }
    ]
  },
  {
    stepNumber: '02',
    title: 'System Calibration & Baseline Measurements',
    summary: 'Establish electrochemical conversion constants, the 100% distilled-water optical reference (I0), and thermal verification across 0°C to 40°C.',
    bullets: [
      'Electrochemical Calibration: Submerge the TDS probe in a standard 1413 µS/cm reference buffer solution at controlled 25°C to verify sensor accuracy and lock raw ADC calibration constants.',
      'Optical Baseline Setup (I0): Fill a clean cuvette with pure distilled water (100% transmission), seal it in the light-shielded chamber, energize the 660 nm LED, and record the baseline intensity I0 on GPIO 35.',
      'Thermal Verification: Validate the DS18B20 probe in ice water (0°C) and warm water (40°C) alongside a laboratory thermometer to confirm ±0.5°C accuracy.'
    ]
  },
  {
    stepNumber: '03',
    title: 'Sample Preparation & Experimental Testing',
    summary: 'Execute five repeated trials (N = 5) per aqueous formulation across controlled concentrations with strict cross-contamination rinsing.',
    bullets: [
      'Prepare aqueous test matrices spanning Sodium Chloride (NaCl), Potassium Chloride (KCl), Copper Sulfate (CuSO4), liquid NPK formulations, and controlled adulterated dilutions.',
      'Thermal & Electrochemical Pass: Submerge DS18B20 and TDS probes simultaneously to capture raw temperature T and raw conductivity EC_T.',
      'Colorimetric & Optical Pass: Measure RGB + Clear digital channels via TCS34725 over I2C and transmitted 660 nm intensity I via the BPW34 photodiode chamber.',
      'Repeatability & Hygiene: Rinse all probe tips thoroughly with distilled water between tests and run N = 5 trials per sample to quantify standard deviation.'
    ]
  },
  {
    stepNumber: '04',
    title: 'Data Processing & Multi-Sensor Fusion',
    summary: 'Normalize temperature-induced solubility/mobility shifts to 25°C, compute Beer-Lambert absorbance, and assemble the 7D feature vector.',
    bullets: [
      'Because salt and nutrient solubility and ionic mobility shift ~1.9%–2.0% per °C, raw conductivity readings drift up to 18.4% across 15°C–35°C ambient temperatures.',
      'Apply real-time thermodynamic temperature compensation (α = 0.0191 / °C) to reduce temperature-induced measurement error to under 1.2%.',
      'Calculate monochromatic optical absorbance A at 660 nm relative to the distilled water reference I0.',
      'Concatenate all seven normalized outputs into a unified 7-dimensional feature vector x.'
    ],
    equation: {
      label: 'Thermodynamic Normalization & Beer-Lambert Fusion',
      formula: 'EC₂₅ = EC_T / [1 + 0.0191(T − 25)]   |   A₆₆₀ = −log₁₀(I / I₀)   |   x = [EC₂₅, T, R, G, B, Clear, A₆₆₀]ᵀ',
      variables: 'Where α = 0.0191 / °C for aqueous electrolytes, I₀ is distilled water baseline intensity, and x ∈ ℝ⁷ is the multimodal fingerprint.'
    }
  },
  {
    stepNumber: '05',
    title: 'Solution Classification & Evaluation',
    summary: 'Compare incoming 7D feature vectors against calibrated reference profiles using Euclidean distance to classify identity and flag adulteration.',
    bullets: [
      'Compute normalized Euclidean distance d(x, r_k) between the measured 7-dimensional sample vector x and every pre-recorded reference profile r_k in the ESP32 library.',
      'Separate overlapping single-sensor clusters (such as 50 mM NaCl vs. 50 mM KCl or salt-adulterated NPK) across optical and chromatic axes.',
      'Verify dilution ratio accuracy, log standard deviation across N = 5 trials, and flag expired, precipitated, or adulterated batches exceeding anomaly distance thresholds.'
    ],
    equation: {
      label: 'Euclidean Distance Classification Metric',
      formula: 'd(x, rₖ) = √( Σᵢ₌₁⁷ [ (xᵢ − rₖ,ᵢ) / σᵢ ]² )',
      variables: 'Minimum normalized distance identifies the formulation; distances exceeding the calibrated confidence radius trigger an Adulteration / Anomaly alert.'
    }
  }
];

export const APA_REFERENCES: ApaReference[] = [
  {
    id: 'mordor-2026',
    group: 'Core Project & Global Fertilizer Data',
    authorsYear: 'Mordor Intelligence (2026)',
    apaText: 'Mordor Intelligence. (2026). Liquid fertilizers market size & share analysis - Growth trends & forecasts (2026–2031).',
    url: 'https://www.mordorintelligence.com/industry-reports/global-liquid-fertilizers-market',
    urlLabel: 'mordorintelligence.com/industry-reports/global-liquid-fertilizers-market'
  },
  {
    id: 'mordor-2019',
    group: 'Core Project & Global Fertilizer Data',
    authorsYear: 'Mordor Intelligence (2019)',
    apaText: 'Mordor Intelligence. (2019). Fertilizers market - Growth, trends, COVID-19 impact, and forecasts.',
    url: 'https://www.mordorintelligence.com/industry-reports/fertilizers-market',
    urlLabel: 'mordorintelligence.com/industry-reports/fertilizers-market'
  },
  {
    id: 'siddique-2023',
    group: 'Core Project & Global Fertilizer Data',
    authorsYear: 'Siddique et al. (2023)',
    apaText: 'Siddique, M. A., et al. (2023). Monitoring of mineral fertilizer for quality assurance and detection of fertilizer adulteration. ResearchGate.',
    url: 'https://www.researchgate.net/publication/405432816',
    urlLabel: 'researchgate.net/publication/405432816'
  },
  {
    id: 'fao-2023',
    group: 'Core Project & Global Fertilizer Data',
    authorsYear: 'Food and Agriculture Organization of the United Nations (2023)',
    apaText: 'Food and Agriculture Organization of the United Nations. (2023). The state of food and agriculture 2023: Revealing the true cost of food to transform agrifood systems. FAO.',
    url: 'https://doi.org/10.4060/cc7724en',
    urlLabel: 'doi.org/10.4060/cc7724en',
    doi: '10.4060/cc7724en'
  },
  {
    id: 'unece-2021',
    group: 'Core Project & Global Fertilizer Data',
    authorsYear: 'United Nations Economic Commission for Europe (2021)',
    apaText: 'United Nations Economic Commission for Europe. (2021). Appraising the true cost of nitrogen pollution. UNECE.',
    url: 'https://unece.org/environment-policy/air/appraising-true-cost-nitrogen-pollution',
    urlLabel: 'unece.org (Nitrogen Pollution Appraisal)'
  },
  {
    id: 'garcia-2022',
    group: 'Multimodal Sensing & Hardware Literature',
    authorsYear: 'García & Martínez (2022)',
    apaText: 'García, A., & Martínez, R. (2022). Low-cost microcontroller architectures for real-time environmental data acquisition using ESP32. Journal of Systems Architecture, 124, 102415.',
    url: 'https://doi.org/10.1016/j.sysarc.2022.102415',
    urlLabel: 'doi.org/10.1016/j.sysarc.2022.102415',
    doi: '10.1016/j.sysarc.2022.102415'
  },
  {
    id: 'patel-2020',
    group: 'Multimodal Sensing & Hardware Literature',
    authorsYear: 'Patel & Henderson (2020)',
    apaText: 'Patel, N. V., & Henderson, E. J. (2020). Portable colorimetric and optical absorption sensors for point-of-use chemical analysis. Analytica Chimica Acta, 1105, 88–97.',
    url: 'https://doi.org/10.1016/j.aca.2020.01.034',
    urlLabel: 'doi.org/10.1016/j.aca.2020.01.034',
    doi: '10.1016/j.aca.2020.01.034'
  },
  {
    id: 'thompson-2021',
    group: 'Multimodal Sensing & Hardware Literature',
    authorsYear: 'Thompson & Kumar (2021)',
    apaText: 'Thompson, D. R., & Kumar, S. (2021). Multi-sensor data fusion techniques for enhanced chemical and liquid identification systems. Sensors and Actuators B: Chemical, 332, 129502.',
    url: 'https://doi.org/10.1016/j.snb.2021.129502',
    urlLabel: 'doi.org/10.1016/j.snb.2021.129502',
    doi: '10.1016/j.snb.2021.129502'
  },
  {
    id: 'wang-2023',
    group: 'Multimodal Sensing & Hardware Literature',
    authorsYear: 'Wang & Chen (2023)',
    apaText: 'Wang, H., & Chen, Y. (2023). Temperature compensation algorithms and ionic conductivity modeling for portable water quality meters. Measurement, 210, 112534.',
    url: 'https://doi.org/10.1016/j.measurement.2023.112534',
    urlLabel: 'doi.org/10.1016/j.measurement.2023.112534',
    doi: '10.1016/j.measurement.2023.112534'
  },
  {
    id: 'oecd-euipo',
    group: 'Supporting Global Reports',
    authorsYear: 'OECD & EUIPO',
    apaText: 'Organisation for Economic Co-operation and Development, & European Union Intellectual Property Office. (2025). Mapping global trade in fakes: Global counterfeit trade benchmarks ($467B annual benchmark). OECD Publishing.',
    url: 'https://www.oecd.org/en/topics/sub-issues/illicit-trade.html',
    urlLabel: 'oecd.org (Illicit & Counterfeit Trade)'
  },
  {
    id: 'unep-nitrogen',
    group: 'Supporting Global Reports',
    authorsYear: 'United Nations Environment Programme',
    apaText: 'United Nations Environment Programme. (2023). Frontiers & global nitrogen assessment: Environmental and climate pollution costs ($340B–$3.4T/yr). UNEP.',
    url: 'https://www.unep.org/topics/chemicals-and-pollution-action/pollution-and-health/nitrogen',
    urlLabel: 'unep.org (Nitrogen Pollution Assessment)'
  },
  {
    id: 'owid-fertilizer',
    group: 'Supporting Global Reports',
    authorsYear: 'Our World in Data',
    apaText: 'Ritchie, H., & Roser, M. (2024). Excess fertilizer use: Which countries cause environmental damage by overapplying fertilizers? Our World in Data.',
    url: 'https://ourworldindata.org/excess-fertilizer',
    urlLabel: 'ourworldindata.org/excess-fertilizer'
  }
];
