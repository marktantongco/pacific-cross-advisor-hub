// ============================================================
// PACIFIC CROSS INSURANCE ADVISOR HUB - COMPREHENSIVE DATA
// ============================================================

export const TABS = [
  { id: 'home', label: 'HOME', icon: '🏠' },
  { id: 'products', label: 'PRODUCTS', icon: '💎' },
  { id: 'playbook', label: 'PLAYBOOK', icon: '🗣️' },
  { id: 'social', label: 'SOCIAL', icon: '📱' },
  { id: 'phinsurance', label: 'PH DATA', icon: '🇵🇭' },
  { id: 'training', label: 'TRAIN', icon: '📚' },
  { id: 'roadmap', label: 'ROADMAP', icon: '🗺️' },
  { id: 'client', label: 'CLIENT', icon: '🤝' },
] as const;

export type TabId = (typeof TABS)[number]['id'];

// ============================================================
// BLUE ROYALE - PREMIUM WORLDWIDE MEDICAL PLAN
// ============================================================

export const blueRoyalePlans = {
  planA: {
    name: 'Plan A',
    maxCoverage: 500000,
    maxCoverageLabel: 'USD 500,000',
    premiums: [
      { minAge: 19, maxAge: 25, annual: 1676 },
      { minAge: 26, maxAge: 30, annual: 1844 },
      { minAge: 31, maxAge: 35, annual: 1981 },
      { minAge: 36, maxAge: 40, annual: 2168 },
      { minAge: 41, maxAge: 45, annual: 2602 },
      { minAge: 46, maxAge: 50, annual: 2778 },
    ],
    room: { phPerDay: 300, overseasPerDay: 1000, type: 'Private Room' },
    surgeonFeeCap: 'USD 30,000',
    surgeonFeeType: 'Capped',
    maternity: 'NOT AVAILABLE',
    supplementaryOPD: 'PC pays 80% up to USD 2,500/yr',
    alternativeTreatments: 'USD 1,500/yr',
    ecuVaccinations: 'USD 200/yr',
    mentalDisorders: 'USD 7,000 lifetime',
    aidsHiv: 'USD 25,000 lifetime (after 5 yrs continuous)',
    dental: 'Optional: 1st yr USD 1,000, 2nd+ USD 2,000',
    vision: 'NOT AVAILABLE',
  },
  planB: {
    name: 'Plan B',
    maxCoverage: 1000000,
    maxCoverageLabel: 'USD 1,000,000',
    premiums: [
      { minAge: 19, maxAge: 25, annual: 2698 },
      { minAge: 26, maxAge: 30, annual: 3382 },
      { minAge: 31, maxAge: 35, annual: 3707 },
      { minAge: 36, maxAge: 40, annual: 4064 },
      { minAge: 41, maxAge: 45, annual: 4378 },
      { minAge: 46, maxAge: 50, annual: 4689 },
    ],
    room: { phPerDay: 600, overseasPerDay: 1500, type: 'Private Room' },
    surgeonFeeCap: 'As Charged',
    surgeonFeeType: 'As Charged',
    maternity: 'USD 5,000 per pregnancy (12-month waiting period)',
    supplementaryOPD: 'As Charged (no limit)',
    alternativeTreatments: 'As Charged',
    ecuVaccinations: 'As Charged',
    mentalDisorders: 'USD 13,000 lifetime',
    aidsHiv: 'USD 100,000 lifetime (after 5 yrs)',
    dental: 'INCLUDED in core plan',
    vision: 'Included — USD 700 annual limit',
  },
  planC: {
    name: 'Plan C',
    maxCoverage: 2000000,
    maxCoverageLabel: 'USD 2,000,000',
    premiums: [
      { minAge: 19, maxAge: 25, annual: 3346 },
      { minAge: 26, maxAge: 30, annual: 4232 },
      { minAge: 31, maxAge: 35, annual: 4533 },
      { minAge: 36, maxAge: 40, annual: 4810 },
      { minAge: 41, maxAge: 45, annual: 5008 },
      { minAge: 46, maxAge: 50, annual: 5263 },
    ],
    room: { phPerDay: 850, overseasPerDay: 1500, type: 'Private Room' },
    surgeonFeeCap: 'As Charged',
    surgeonFeeType: 'As Charged',
    maternity: 'USD 6,000 per pregnancy',
    supplementaryOPD: 'As Charged (no limit)',
    alternativeTreatments: 'As Charged',
    ecuVaccinations: 'As Charged',
    mentalDisorders: 'As Charged',
    aidsHiv: 'As Charged',
    dental: 'INCLUDED in core plan',
    vision: 'INCLUDED — As Charged',
  },
} as const;

export const blueRoyaleKeyFeatures = {
  qualifyingPeriod: '30 days (accidents covered immediately)',
  travelCoverage: '90 days per trip, unlimited trips per year',
  renewable: 'Guaranteed renewable up to age 100',
  physicalExam: 'No physical exam required',
  payment: {
    options: ['Annual', 'Semi-annual (+8% surcharge)'],
  },
  personalAccident: {
    available: true,
    rate: 'USD 1.32 per $1,000 (Class 1)',
  },
  discounts: [
    { deductible: 'USD 1,000', discount: '15%', planRestriction: 'Plan A only' },
    { deductible: 'USD 2,500', discount: '18-30%', planRestriction: 'Plans A & B' },
    { deductible: 'USD 5,000', discount: '24-40%', planRestriction: 'All Plans' },
    { deductible: 'TAL (Treatment Area Limitation)', discount: '25%', planRestriction: 'All Plans' },
  ],
  freeChildCoverage: 'From 15th day of newborn',
  covidVaccine: { planA: '$100/yr', planB: '$250/yr', planC: '$300/yr' },
  contact: {
    phone: '+63 2 8230-8511',
    email: 'info@pacificcross.com.ph',
  },
  offices: ['Makati HQ', 'Cebu', 'Clark', 'Davao', 'Agency offices nationwide'],
};

export const blueRoyaleExclusions = [
  'Cosmetic surgery',
  'Contact lenses & hearing aids',
  'Suicide / self-inflicted injury',
  'Undeclared pre-existing conditions',
  'STDs',
  'Contraceptives / infertility treatment',
  'Weight treatment / management',
  'Routine check-ups only (no illness)',
];

// ============================================================
// FLEXISHIELD - SECOND LAYER HMO ENHANCER
// ============================================================

export type FlexiShieldTier = 'FS50' | 'FS100' | 'FS150' | 'FS200';

export const flexiShieldTiers = [
  { id: 'FS50' as const, label: 'FS 50', hmoRange: 'HMO MBL 50K-99K', deductible: 50000 },
  { id: 'FS100' as const, label: 'FS 100', hmoRange: 'HMO MBL 100K-149K', deductible: 100000 },
  { id: 'FS150' as const, label: 'FS 150', hmoRange: 'HMO MBL 150K-199K', deductible: 150000 },
  { id: 'FS200' as const, label: 'FS 200', hmoRange: 'HMO MBL 200K+', deductible: 200000 },
];

export const flexiShieldPricing: Record<string, { minAge: number; maxAge: number; premiums: Record<FlexiShieldTier, number> }[]> = [
  {
    minAge: 0, maxAge: 20,
    premiums: { FS50: 12258, FS100: 9350, FS150: 7160, FS200: 6510 },
  },
  {
    minAge: 21, maxAge: 35,
    premiums: { FS50: 18297, FS100: 14040, FS150: 9390, FS200: 7500 },
  },
  {
    minAge: 36, maxAge: 45,
    premiums: { FS50: 27378, FS100: 20730, FS150: 13510, FS200: 10440 },
  },
  {
    minAge: 46, maxAge: 55,
    premiums: { FS50: 40221, FS100: 30660, FS150: 20270, FS200: 15790 },
  },
  {
    minAge: 56, maxAge: 65,
    premiums: { FS50: 63972, FS100: 48860, FS150: 31740, FS200: 24190 },
  },
  {
    minAge: 66, maxAge: 70,
    premiums: { FS50: 0, FS100: 0, FS150: 0, FS200: 30260 },
  },
];

export const flexiShieldKeyFeatures = {
  maximumBenefit: 'PHP 2,000,000 for ALL plans',
  hospitalIncome: 'PHP 1,000/day (up to 30 days/year)',
  room: 'Private Room',
  miscellaneousInpatient: 'As Charged',
  icuCcuTelemetry: 'As Charged',
  surgeonFee: 'As Charged (accredited) or up to PHP 180,000 (reimbursement)',
  anesthetist: 'Up to 40% of surgeon fee',
  attendingPhysician: 'Up to PHP 3,000/day (reimbursement)',
  specialist: 'Up to PHP 3,000/day (reimbursement)',
  covid19: 'Covered (pandemic exclusion waived)',
  philHealth: 'Benefits IN ADDITION to FlexiShield',
  claimMethods: ['No-cash-outlay', 'Reimbursement'],
  mustHaveHmo: true,
  certification: 'ISO 9001:2015 Certified company',
  deductibleRule: 'The applicable deductible is whichever is higher — FlexiShield SOB amount or actual HMO MBL',
};

// ============================================================
// PRODUCTS (LEGACY SUPPORT)
// ============================================================
export const products = {
  blueRoyale: {
    name: 'Blue Royale',
    tagline: 'Premium Worldwide Medical Plan',
    emoji: '👑',
    color: '#1a1a1a',
    accentColor: '#00BFFF',
    coverage: 'Up to USD 2,000,000/year',
    description:
      'The ultimate worldwide medical protection for those who demand the best. Freedom to choose any medical provider anywhere in the world.',
    features: [
      'Coverage up to USD 2 million per year',
      'Freedom to choose your own medical provider worldwide',
      'All-inclusive Core Benefits (medical + travel)',
      'Maternity and childbirth coverage (Plans B & C)',
      'Worldwide emergency assistance 24/7',
      'Dental & vision included in Plans B & C',
      'Ages: infants to 100 years old',
      'Reimbursement or no-cash-outlay options',
    ],
    target: 'HNWIs, expats, OFWs, senior professionals',
    targetAudience: [
      'High-Net-Worth Individuals',
      'Overseas Filipino Workers (OFWs)',
      'Expatriates in the Philippines',
      'Senior Professionals & Executives',
      'International travelers',
    ],
    premiumRange: 'USD 1,676 - USD 5,263/year (Plans A-C, ages 19-50)',
    plans: [
      { name: 'Plan A', coverage: 'USD 500K', premium: 'From $1,676/yr', features: ['Inpatient', 'Outpatient', 'Emergency', 'Surgeon Cap $30K', 'No Maternity', 'Optional Dental'] },
      { name: 'Plan B', coverage: 'USD 1M', premium: 'From $2,698/yr', features: ['Inpatient', 'Outpatient', 'Emergency', 'As Charged', 'Maternity $5K', 'Dental + Vision'] },
      { name: 'Plan C', coverage: 'USD 2M', premium: 'From $3,346/yr', features: ['Inpatient', 'Outpatient', 'Emergency', 'As Charged', 'Maternity $6K', 'Dental + Vision'] },
    ],
  },
  flexiShield: {
    name: 'FlexiShield',
    tagline: 'Second Layer HMO Enhancer',
    emoji: '🛡️',
    color: '#1A1A1A',
    accentColor: '#FFB800',
    coverage: 'Up to PHP 2,000,000',
    description:
      'The smart enhancer for your existing HMO. When your HMO maxes out, FlexiShield kicks in to cover what\'s left. Affordable peace of mind for every Filipino family.',
    features: [
      'Up to PHP 2 million medical coverage',
      'Enhances existing HMO plans',
      'Covers COVID-19 (pandemic exclusion waived)',
      'Daily Hospital Income (PHP 1,000/day)',
      'Critical Care & Surgical Benefits',
      'ICU and Operating Theater — As Charged',
      'Affordable premiums from ₱6,510/year',
      'Ages: 0-70 years old',
      'No-cash-outlay or reimbursement',
    ],
    target: 'Employees, families, young professionals, SMEs',
    targetAudience: [
      'Employed professionals with HMO',
      'Young families',
      'SME employees',
      'Freelancers & gig workers',
      'Parents securing kids\' health',
    ],
    premiumRange: 'PHP 6,510 - PHP 63,972/year',
    plans: [
      { name: 'FS 50', coverage: 'HMO 50-99K', premium: 'From ₱7,160/yr', features: ['Hospitalization', 'PHP 2M MBL', 'PHP 1K/day', 'As Charged IP', 'COVID-19'] },
      { name: 'FS 100', coverage: 'HMO 100-149K', premium: 'From ₱7,500/yr', features: ['Hospitalization', 'PHP 2M MBL', 'PHP 1K/day', 'As Charged IP', 'COVID-19'] },
      { name: 'FS 150', coverage: 'HMO 150-199K', premium: 'From ₱6,510/yr', features: ['Hospitalization', 'PHP 2M MBL', 'PHP 1K/day', 'As Charged IP', 'COVID-19'] },
      { name: 'FS 200', coverage: 'HMO 200K+', premium: 'From ₱6,510/yr', features: ['Hospitalization', 'PHP 2M MBL', 'PHP 1K/day', 'As Charged IP', 'COVID-19'] },
    ],
  },
} as const;

// ============================================================
// HELPER FUNCTIONS FOR PRICING
// ============================================================

export function getBlueRoyalePremium(planId: 'planA' | 'planB' | 'planC', age: number): number | null {
  const plan = blueRoyalePlans[planId];
  for (const bracket of plan.premiums) {
    if (age >= bracket.minAge && age <= bracket.maxAge) {
      return bracket.annual;
    }
  }
  // For ages outside listed brackets, extrapolate approximately
  if (age < 19) return plan.premiums[0].annual;
  if (age > 50) {
    const last = plan.premiums[plan.premiums.length - 1];
    const increase = Math.round(last.annual * 0.15);
    const overFifty = Math.ceil((age - 50) / 5);
    return last.annual + increase * overFifty;
  }
  return null;
}

export function getFlexiShieldPremium(tierId: FlexiShieldTier, age: number): number | null {
  for (const bracket of flexiShieldPricing) {
    if (age >= bracket.minAge && age <= bracket.maxAge) {
      const premium = bracket.premiums[tierId];
      return premium > 0 ? premium : null;
    }
  }
  return null;
}

// ============================================================
// KEY STATISTICS
// ============================================================
export const stats = {
  phPenetration: 1.79,
  phDensity: 75.05,
  aseanAverage: 3.5,
  uninsuredPercent: 70,
  ofwPopulation: '2.2 million',
  mobileLoadSpending: '₱8,000/year',
  insuranceSpending: '₱500/year',
  medicalInflation: '10-12%',
  topCausesOfRuin: [
    { cause: 'Medical Emergencies', percent: 40, emoji: '🏥' },
    { cause: 'Natural Disasters', percent: 30, emoji: '🌊' },
    { cause: 'Job Loss', percent: 20, emoji: '💼' },
    { cause: 'Other', percent: 10, emoji: '❓' },
  ],
  quickStats: [
    { value: 1.79, suffix: '%', label: 'PH Insurance Penetration', color: '#FF5722' },
    { value: 75.05, prefix: '$', suffix: '', label: 'Insurance Density per Capita', color: '#FFB800' },
    { value: 70, suffix: '%', label: 'Filipinos with NO Health Insurance', color: '#FF5722' },
    { value: 75, suffix: '+', label: 'Years of Pacific Cross Service', color: '#FFB800' },
  ],
};

// ============================================================
// ASEAN COMPARISON
// ============================================================
export const aseanComparison = [
  { country: 'Singapore', penetration: 6.75, color: '#FF6B9D' },
  { country: 'Malaysia', penetration: 4.78, color: '#FFB800' },
  { country: 'Thailand', penetration: 4.99, color: '#00BFFF' },
  { country: 'Indonesia', penetration: 3.18, color: '#FF9F43' },
  { country: 'Philippines', penetration: 1.79, color: '#FF5722' },
  { country: 'Vietnam', penetration: 3.01, color: '#54A0FF' },
  { country: 'Myanmar', penetration: 0.47, color: '#888' },
];

// ============================================================
// LIFE STAGES
// ============================================================
export const lifeStages = [
  {
    stage: 'Young Professional',
    age: '22-30',
    emoji: '🚀',
    income: '₱15K-₱35K/mo',
    priority: 'Build emergency fund',
    product: 'FlexiShield',
    color: '#FFB800',
    tips: ['Start small, start now', 'FlexiShield is affordable from ₱6,510/yr', 'Build the habit of protection'],
  },
  {
    stage: 'Family Builder',
    age: '31-40',
    emoji: '👨‍👩‍👧',
    income: '₱35K-₱80K/mo',
    priority: 'Comprehensive coverage',
    product: 'Blue Royale Plan B',
    color: '#00BFFF',
    tips: ['Cover the whole family', 'Maternity benefits matter (Plan B: $5K)', 'Consider international coverage'],
  },
  {
    stage: 'Peak Earner',
    age: '41-50',
    emoji: '💰',
    income: '₱80K-₱200K/mo',
    priority: 'Premium protection',
    product: 'Blue Royale Plan C',
    color: '#FFB800',
    tips: ['Max coverage: USD 2M', 'Everything As Charged', 'Plan for retirement health'],
  },
  {
    stage: 'Pre-Retirement',
    age: '51-60',
    emoji: '📊',
    income: '₱60K-₱150K/mo',
    priority: 'Evaluate coverage gaps',
    product: 'Blue Royale Plan B',
    color: '#00BFFF',
    tips: ['Review existing coverage', 'Ensure worldwide access', 'Check for pre-existing condition gaps'],
  },
  {
    stage: 'Retirement',
    age: '61+',
    emoji: '🏖️',
    income: 'Fixed/pension',
    priority: 'Medical cost security',
    product: 'Blue Royale',
    color: '#FF9F43',
    tips: ['Renewable up to age 100', 'No upper age limit worries', 'Worldwide healthcare access'],
  },
];

// ============================================================
// MISCONCEPTIONS
// ============================================================
export const misconceptions = [
  {
    myth: "I'm young, I don't need insurance",
    fact: 'Medical emergencies don\'t check your ID. One accident can wipe out years of savings.',
    emoji: '😅',
  },
  {
    myth: 'My HMO from work is enough',
    fact: 'HMO limits are often exhausted in a single major illness. Cancer treatment alone can cost ₱2M+.',
    emoji: '😱',
  },
  {
    myth: 'Insurance is too expensive',
    fact: 'FlexiShield starts at just PHP 6,510/year — that\'s less than ₱550/month!',
    emoji: '☕',
  },
  {
    myth: "I'll just save for emergencies",
    fact: 'An ICU bill can reach ₱500K in weeks. How long would it take you to save that?',
    emoji: '💸',
  },
  {
    myth: 'Insurance companies don\'t pay claims',
    fact: 'Pacific Cross has 75+ years of reliable claims service. ISO 9001:2015 Certified.',
    emoji: '✅',
  },
  {
    myth: "I'll get insurance when I'm older",
    fact: 'Premiums increase with age, and pre-existing conditions get excluded. Lock in rates now!',
    emoji: '⏰',
  },
];

// ============================================================
// SPIEL FLOW
// ============================================================
export const spielSteps = [
  {
    step: 1,
    title: 'DISCOVER',
    emoji: '🔍',
    description: 'Understand the client\'s situation and concerns',
    script: '"What\'s your biggest worry when it comes to healthcare for you and your family?"',
    tips: [
      'Listen actively — let them share their story',
      'Note their specific pain points',
      'Ask about current coverage (HMO, PhilHealth)',
      'Understand their budget comfort zone',
    ],
    objections: [
      { objection: 'I already have HMO', response: 'Great! Your HMO covers the basics. But what happens when it runs out? That\'s exactly what FlexiShield is designed for.' },
      { objection: 'I can\'t afford it', response: 'Totally understand. Let me show you — FlexiShield starts at just ₱6,510/year. That\'s less than ₱550/month!' },
    ],
  },
  {
    step: 2,
    title: 'EDUCATE',
    emoji: '📖',
    description: 'Share eye-opening industry facts',
    script: '"Did you know that the Philippines has only 1.79% insurance penetration? That means 7 out of 10 Filipinos have NO health insurance beyond PhilHealth."',
    tips: [
      'Use relatable comparisons (load vs insurance spending)',
      'Share the medical inflation rate (10-12% annually)',
      'Mention that 40% of financial ruin comes from medical emergencies',
      'Keep it conversational, not lecture-like',
    ],
    objections: [
      { objection: 'PhilHealth is enough', response: 'PhilHealth covers about 30-40% of hospital bills. For a ₱500K hospitalization, you\'d still shoulder ₱300K+ out of pocket.' },
      { objection: 'I\'m healthy, I don\'t need it', response: 'That\'s awesome! But health is unpredictable. Insurance is about being prepared, not pessimistic.' },
    ],
  },
  {
    step: 3,
    title: 'PERSONALIZE',
    emoji: '🎯',
    description: 'Match products to their specific needs',
    script: '"Based on what you\'ve shared, here\'s what makes the most sense for you..."',
    tips: [
      'Reference their specific concerns from Step 1',
      'Recommend based on life stage, not just budget',
      'Show how the product solves THEIR problem',
      'Use "you" and "your family" language',
    ],
    objections: [
      { objection: 'Let me think about it', response: 'Of course! Just remember — premiums increase every year you wait. Locking in now saves you money long-term.' },
      { objection: 'I need to ask my spouse', response: 'Absolutely! Smart decision-making involves the whole family. Can we schedule a quick 15-min call this week?' },
    ],
  },
  {
    step: 4,
    title: 'DEMONSTRATE',
    emoji: '📊',
    description: 'Show product value through comparison',
    script: '"Let me show you the numbers so you can see the real value..."',
    tips: [
      'Use the premium calculator to show costs',
      'Compare vs out-of-pocket costs for common procedures',
      'Show real claim scenarios',
      'Highlight unique Pacific Cross advantages',
    ],
    objections: [
      { objection: 'Other companies are cheaper', response: 'Price matters, but so does reliability. Pacific Cross has 75+ years of claims-paying history.' },
      { objection: 'I don\'t understand the terms', response: 'No worries at all — that\'s what I\'m here for! Let me break it down in simple terms...' },
    ],
  },
  {
    step: 5,
    title: 'COMMIT',
    emoji: '🤝',
    description: 'Guide them to a confident decision',
    script: '"Let\'s get you protected. Which option feels right for you?"',
    tips: [
      'Offer clear next steps',
      'Make the process seem simple and quick',
      'Provide reassurance about the decision',
      'Set expectations for what happens next',
    ],
    objections: [
      { objection: 'Maybe next month', response: 'I totally get it! But if something happens between now and then, you won\'t be covered. The process takes just 15 minutes.' },
      { objection: 'I\'m not ready to decide', response: 'That\'s completely fine. Let me send you all the details so you can review at your own pace.' },
    ],
  },
];

// ============================================================
// SOCIAL MEDIA CONTENT
// ============================================================
export const contentPillars = [
  { name: 'Financial Literacy', emoji: '📚', color: '#00BFFF', description: 'Educational content about insurance, savings, and financial planning' },
  { name: 'Real Stories', emoji: '💬', color: '#FF5722', description: 'Testimonials, case studies, and real-life claim stories' },
  { name: 'Myth Busting', emoji: '💥', color: '#FFB800', description: 'Debunking common insurance myths with facts' },
  { name: 'Life Hacks', emoji: '💡', color: '#4CAF50', description: 'Tips for OFWs, families, and smart financial moves' },
  { name: 'Industry News', emoji: '📰', color: '#FF9F43', description: 'Philippine healthcare and insurance updates' },
  { name: 'Relatable Humor', emoji: '😂', color: '#FF5722', description: 'Memes, trending formats, and entertaining content' },
];

export const socialMediaPosts = {
  facebook: [
    {
      title: 'Shocking Truth 🔥',
      content: 'The average Filipino spends ₱8,000/year on mobile load but only ₱500/year on insurance. 💀\n\nThat\'s 16x more on texts and calls than on PROTECTING their health!\n\nTime to flip the script. 💪\n\n#PacificCross #InsurancePH #FinancialLiteracy',
      bestTime: '6:00 PM - 8:00 PM',
      day: 'Tuesday',
    },
    {
      title: 'Real Talk 💬',
      content: 'Client story: "I thought my company HMO was enough until my husband was hospitalized for 2 weeks. The bill? ₱1.2M. Our HMO covered only ₱200K."\n\nThat\'s a ₱1M gap. Don\'t let this be your story. 💔➡️🛡️\n\n#RealStory #HealthInsurance #FlexiShield',
      bestTime: '7:00 PM - 9:00 PM',
      day: 'Wednesday',
    },
    {
      title: 'Myth vs Fact 🧠',
      content: 'MYTH: "I\'m young and healthy, I don\'t need insurance."\nFACT: 1 in 4 Filipinos face a major health event before 50. Accidents don\'t check your age. 🎂❌\n\nFlexiShield starts at just PHP 6,510/year. That\'s your daily coffee money. ☕\n\n#MythBuster #InsurancePH #FlexiShield',
      bestTime: '12:00 PM - 1:00 PM',
      day: 'Thursday',
    },
    {
      title: 'OFW Feature 🌏',
      content: 'Calling all OFWs! 🇵🇭✈️\n\nBlue Royale gives you worldwide medical coverage up to USD 2M. Whether you\'re in Dubai, Singapore, or London — you\'re protected.\n\n90 days per trip. Unlimited trips. Any hospital worldwide.\n\n#OFW #BlueRoyale #PacificCross #WorldwideCoverage',
      bestTime: '8:00 PM - 10:00 PM',
      day: 'Saturday',
    },
  ],
  instagram: [
    {
      title: 'Carousel: 5 Signs You Need Insurance',
      content: 'Slide 1: Hook — "5 signs you\'re one medical emergency away from financial ruin"\nSlide 2: You only have PhilHealth\nSlide 3: Your savings can\'t cover a ₱500K hospital bill\nSlide 4: You have dependents relying on you\nSlide 5: You spend more on wants than protection\nSlide 6: CTA — "DM me for a free consultation"',
      bestTime: '11:00 AM - 1:00 PM',
      day: 'Monday',
    },
    {
      title: 'Reel: Premium Comparison',
      content: 'Quick-fire comparison of what you spend on:\n- Netflix: ₱500/mo\n- Coffee: ₱2,000/mo\n- Shopping: ₱3,000/mo\n- Insurance: ₱550/mo (FlexiShield FS 200)\n\nPlot twist: Only one protects your family. 🎬',
      bestTime: '7:00 PM - 9:00 PM',
      day: 'Friday',
    },
  ],
  // New InsuranceHub campaign posts
  campaign: [
    {
      title: 'WEALTH ARMOR 💪',
      content: 'Is insurance only for old people? Nope.\n\nIt\'s WEALTH ARMOR. 🛡️\n\nYou wouldn\'t go into battle without protection.\nSo why go through life without it?\n\nFlexiShield from ₱6,510/yr\nBlue Royale from $1,676/yr\n\n#WealthArmor #InsurancePH #PacificCross',
      bestTime: '6:00 PM - 8:00 PM',
      day: 'Monday',
    },
    {
      title: 'HOSPITAL BILLS NOT HEARTBREAK 🏥❤️',
      content: 'FlexiShield protects you from HOSPITAL BILLS, NOT HEARTBREAK 💔🛡️\n\nWhen your HMO runs out (and it will), FlexiShield kicks in.\n\n• Up to PHP 2M coverage\n• PHP 1,000/day hospital income\n• As Charged ICU & surgery\n• COVID-19 covered\n\nYou focus on healing. We handle the bills.\n\n#FlexiShield #HospitalHero #PacificCross',
      bestTime: '7:00 PM - 9:00 PM',
      day: 'Tuesday',
    },
    {
      title: 'CHOOSE YOUR ARMOR ⚔️',
      content: 'CHOOSE YOUR ARMOR 🛡️👑\n\n🛡️ FlexiShield — Hospital Hero\n• Enhances your HMO\n• From ₱6,510/yr\n• Ages 0-70\n\n👑 Blue Royale — Legacy Boss\n• Worldwide coverage\n• From $1,676/yr\n• Ages 0-100\n\nBoth available now. Both life-changing.\nWhich one fits your battle plan?\n\n#ChooseYourArmor #PacificCross #InsurancePH',
      bestTime: '12:00 PM - 1:00 PM',
      day: 'Wednesday',
    },
    {
      title: 'EDUCATOR NOT SELLER 📚',
      content: 'BE AN EDUCATOR, NOT A SELLER! 🎓\n\nUse Analogies That Hit Different:\n\n📶 Insurance = Wifi for life\nYou don\'t notice it until it\'s gone.\n\n🛡️ Insurance = Armor\nYou hope you never need it, but you\'re glad it\'s there.\n\n🏠 Insurance = Heirloom\nPass it on. Protect the next generation.\n\nStop selling. Start teaching.\n\n#BeAnEducator #InsurancePH #FinancialLiteracy',
      bestTime: '8:00 PM - 10:00 PM',
      day: 'Thursday',
    },
    {
      title: 'PROTECTS WALLET NOT LOVE 💰❤️',
      content: 'Insurance protects your wallet, not your love life! 😂💸\n\nHere\'s what it CAN\'T do:\n❌ Make someone text back\n❌ Fix your dating life\n❌ Stop ghosting\n\nHere\'s what it CAN do:\n✅ Cover a ₱500K hospital bill\n✅ Give you PHP 1,000/day while confined\n✅ Let you choose ANY hospital worldwide\n\n#RealTalk #InsurancePH #PacificCross #FlexiShield',
      bestTime: '7:00 PM - 9:00 PM',
      day: 'Friday',
    },
  ],
};

export const hashtagStrategy = [
  { category: 'Primary', tags: ['#PacificCrossPH', '#BlueRoyale', '#FlexiShield', '#ProtectYourFuture'] },
  { category: 'Industry', tags: ['#InsurancePH', '#HealthInsurance', '#FinancialLiteracy', '#LifeInsurance'] },
  { category: 'Audience', tags: ['#OFWLife', '#FilipinoFamily', '#SmartPinoy', '#PinoyAbroad'] },
  { category: 'Engagement', tags: ['#RealTalk', '#MoneyTips', '#HealthIsWealth', '#NoCap'] },
  { category: 'Campaign', tags: ['#ChooseYourArmor', '#WealthArmor', '#HospitalHero', '#LegacyBoss'] },
];

export const postingSchedule = [
  { day: 'Monday', time: '11 AM', type: 'Educational Carousel', platform: 'Instagram', pillar: 'Financial Literacy' },
  { day: 'Tuesday', time: '7 PM', type: 'Story/Reel', platform: 'Facebook', pillar: 'Relatable Humor' },
  { day: 'Wednesday', time: '7 PM', type: 'Long-form Post', platform: 'Facebook', pillar: 'Real Stories' },
  { day: 'Thursday', time: '12 PM', type: 'Myth Busting Post', platform: 'Facebook', pillar: 'Myth Busting' },
  { day: 'Friday', time: '8 PM', type: 'Reel', platform: 'Instagram', pillar: 'Life Hacks' },
  { day: 'Saturday', time: '9 PM', type: 'OFW Feature', platform: 'Facebook', pillar: 'Industry News' },
  { day: 'Sunday', time: '4 PM', type: 'Weekly Recap', platform: 'Stories', pillar: 'Financial Literacy' },
];

// ============================================================
// FAQ - COMPREHENSIVE
// ============================================================
export const faqItems = [
  { question: 'What is Pacific Cross?', answer: 'Pacific Cross is a leading insurance provider in the Philippines with 75+ years of experience. We offer health, travel, and life insurance products designed for Filipinos and international clients.' },
  { question: 'What makes Blue Royale different from other international health plans?', answer: 'Blue Royale offers unparalleled flexibility — choose any doctor or hospital worldwide, comprehensive coverage up to USD 2M, and options for no-cash-outlay. No network restrictions, no gatekeepers. Plans A, B, and C offer different coverage tiers with specific pricing.' },
  { question: 'Can I get FlexiShield if I already have an HMO?', answer: 'Absolutely! That\'s exactly what FlexiShield is designed for. It acts as a second layer — when your HMO benefits are exhausted, FlexiShield kicks in to cover the remaining expenses up to PHP 2M.' },
  { question: 'What is the claims process like?', answer: 'Pacific Cross offers both reimbursement and no-cash-outlay options. No-cash-outlay: Pacific Cross directly pays the hospital at partner facilities. Reimbursement: you pay first, submit receipts, and get refunded.' },
  { question: 'Is there an age limit?', answer: 'FlexiShield covers ages 0-70 (FS 200 available up to 70). Blue Royale covers infants to 100 years old — guaranteed renewable!' },
  { question: 'How do commissions work for advisors?', answer: 'Pacific Cross offers competitive commission structures with upfront commissions plus renewal incentives. New advisors can earn significant income in their first 90 days.' },
  { question: 'Can OFWs purchase Pacific Cross products?', answer: 'Yes! Blue Royale is specifically designed for international coverage. OFWs get 90 days per trip, unlimited trips, emergency evacuation and repatriation. FlexiShield is also available for families left behind.' },
  { question: 'What does "no-cash-outlay" mean?', answer: 'No-cash-outlay means Pacific Cross directly pays the hospital for covered expenses at accredited hospitals. You don\'t need to pay out of pocket and wait for reimbursement. Just show your Pacific Cross card.' },
  { question: 'Does FlexiShield cover COVID-19?', answer: 'Yes! FlexiShield includes COVID-19 coverage. The pandemic exclusion has been waived for FlexiShield policies.' },
  { question: 'How do I become a Pacific Cross advisor?', answer: 'Contact us through this app or visit pacificcross.com.ph. We provide comprehensive training, marketing materials, and mentorship to help you succeed.' },
  // New FAQ items
  { question: 'Do I need a medical exam?', answer: 'No, just answer the medical questionnaire truthfully. No physical exam is required for either Blue Royale or FlexiShield.' },
  { question: 'What is a Pre-Existing Condition?', answer: 'Any disability (illness or injury) that existed before your insurance cover commencement. Always declare conditions honestly on your application.' },
  { question: 'How soon can I use my benefits?', answer: 'Blue Royale: 30 days after policy date for general coverage (accidents are covered immediately). Maternity has a 12-month waiting period. FlexiShield: coverage begins after your first layer HMO\'s Maximum Benefit Limit is exhausted.' },
  { question: 'What does Blue Royale cover abroad?', answer: 'Up to 90 days per trip, unlimited trips per year. Includes emergency evacuation, repatriation, return of mortal remains, and access to any hospital worldwide.' },
  { question: 'What is the Free-Look Period?', answer: 'Your contract contains a provision for a Free-Look Period — a window of time after receiving your policy where you can review it and cancel for a full refund if you change your mind.' },
  { question: 'Can I pay semi-annually?', answer: 'Yes, Blue Royale can be paid annually or semi-annually. Semi-annual payments have an 8% surcharge applied.' },
  { question: 'What if my HMO changes its MBL?', answer: 'The applicable deductible for FlexiShield is whichever is higher — the FlexiShield SOB amount or your actual HMO\'s Maximum Benefit Limit.' },
  { question: 'Is COVID-19 covered?', answer: 'Yes, both products cover COVID-19. For FlexiShield, the pandemic exclusion has been waived. Blue Royale covers COVID-19 treatment including hospitalization and ICU.' },
  { question: 'What\'s the difference between no-cash-outlay and reimbursement?', answer: 'No-cash-outlay uses Pacific Cross accredited hospitals with direct settlement — you show your card and walk out without paying. Reimbursement means you pay the hospital first, then submit claims documents for refund processing.' },
  { question: 'What are the discount options?', answer: 'Blue Royale offers deductible discounts: USD 1,000 = 15% off (Plan A only), USD 2,500 = 18-30% off (Plans A & B), USD 5,000 = 24-40% off (All Plans). Treatment Area Limitation (TAL) discount of 25% is available for all plans.' },
];

// ============================================================
// GLOSSARY
// ============================================================
export const glossaryTerms = [
  { term: 'Premium', definition: 'The amount you pay (monthly/annually) to keep your insurance active. Think of it as your "protection subscription."' },
  { term: 'Deductible', definition: 'The amount you pay out-of-pocket before insurance kicks in. Like a "threshold" before your coverage activates.' },
  { term: 'Co-pay', definition: 'A fixed amount you pay for a covered service (e.g., ₱500 per consultation). Your insurance covers the rest.' },
  { term: 'No-Cash-Outlay', definition: 'Pacific Cross pays the hospital directly — you pay nothing at the time of service. Just show your card!' },
  { term: 'Pre-existing Condition', definition: 'A health condition you had before getting insured. Some plans may have waiting periods for these conditions.' },
  { term: 'Waiting Period', definition: 'The time after purchasing before certain benefits become active. Blue Royale: 30 days general, 12 months maternity.' },
  { term: 'Reimbursement', definition: 'You pay the hospital first, then submit receipts to Pacific Cross for refund. Usually processed within 15-30 days.' },
  { term: 'Coverage Limit', definition: 'The maximum amount your insurance will pay. Blue Royale: up to USD 2M. FlexiShield: up to PHP 2M.' },
  { term: 'Benefit', definition: 'A specific service or payment your insurance provides (e.g., hospitalization, surgery, daily hospital income).' },
  { term: 'Rider', definition: 'An add-on benefit you can attach to your base policy for additional coverage (e.g., dental, vision, personal accident).' },
  { term: 'PhilHealth', definition: 'The Philippine national health insurance program. It covers basic services but has significant limitations for major medical events.' },
  { term: 'HMO', definition: 'Health Maintenance Organization. Usually provided by employers. Has network restrictions and annual benefit limits.' },
  { term: 'MBL', definition: 'Maximum Benefit Limit — the maximum amount your HMO will pay in a policy year. FlexiShield activates when MBL is exhausted.' },
  { term: 'Critical Illness Benefit', definition: 'A lump-sum payment if you\'re diagnosed with a covered critical illness (cancer, heart attack, stroke, etc.).' },
  { term: 'Daily Hospital Income', definition: 'A cash benefit paid for each day you\'re confined in a hospital. FlexiShield: PHP 1,000/day up to 30 days/year.' },
  { term: 'As Charged', definition: 'The insurance pays the actual billed amount without a predefined cap. Available in Blue Royale Plans B/C and FlexiShield.' },
  { term: 'TAL', definition: 'Treatment Area Limitation — limits coverage to specific countries/regions for a discount on premiums.' },
  { term: 'SOB', definition: 'Schedule of Benefits — the detailed table showing what your policy covers and the limits for each benefit.' },
];

// ============================================================
// CLIENT QUIZ (for QuizFlow component)
// ============================================================
export const quizQuestions = [
  {
    question: 'What best describes your current work situation?',
    options: [
      { text: 'Employed with company HMO', value: 'employed-hmo', emoji: '🏢' },
      { text: 'Employed without HMO', value: 'employed-nohmo', emoji: '💼' },
      { text: 'Self-employed / Freelancer', value: 'freelance', emoji: '💻' },
      { text: 'OFW / Working abroad', value: 'ofw', emoji: '✈️' },
      { text: 'Retired / Senior citizen', value: 'retired', emoji: '🏖️' },
    ],
  },
  {
    question: 'How many people depend on your income?',
    options: [
      { text: 'Just me', value: 'solo', emoji: '🧍' },
      { text: '1-2 dependents', value: 'small', emoji: '👨‍👩‍👧' },
      { text: '3-5 dependents', value: 'medium', emoji: '👨‍👩‍👧‍👦' },
      { text: 'More than 5', value: 'large', emoji: '👨‍👩‍👧‍👦‍👦' },
    ],
  },
  {
    question: 'What\'s your biggest healthcare worry?',
    options: [
      { text: 'Major illness (cancer, heart disease)', value: 'illness', emoji: '🏥' },
      { text: 'Accidents and emergencies', value: 'accident', emoji: '🚑' },
      { text: 'Maternity and childbirth costs', value: 'maternity', emoji: '👶' },
      { text: 'Everyday medical expenses', value: 'everyday', emoji: '💊' },
      { text: 'Access to quality healthcare abroad', value: 'international', emoji: '🌍' },
    ],
  },
  {
    question: 'What\'s your monthly budget for insurance?',
    options: [
      { text: 'Under ₱1,000/month', value: 'budget', emoji: '💵' },
      { text: '₱1,000 - ₱3,000/month', value: 'moderate', emoji: '💰' },
      { text: '₱3,000 - ₱10,000/month', value: 'comfortable', emoji: '💎' },
      { text: '₱10,000+/month', value: 'premium', emoji: '👑' },
    ],
  },
];

// ============================================================
// 30-60-90 DAY PLAN
// ============================================================
export const thirtySixtyNinety = {
  phase1: {
    title: 'Days 1-30: Foundation',
    emoji: '🏗️',
    color: '#FF5722',
    goals: [
      { text: 'Complete product training (Blue Royale & FlexiShield)', done: false },
      { text: 'Memorize key statistics and spiels', done: false },
      { text: 'Set up social media profiles', done: false },
      { text: 'Create first 5 social media posts', done: false },
      { text: 'Build your warm market list (50+ contacts)', done: false },
      { text: 'Conduct first 10 client conversations', done: false },
      { text: 'Get your first 5 clients', done: false },
    ],
    milestones: ['First sale', 'First commission earned', 'Social media presence established'],
  },
  phase2: {
    title: 'Days 31-60: Growth',
    emoji: '📈',
    color: '#FFB800',
    goals: [
      { text: 'Refine your spiel based on feedback', done: false },
      { text: 'Join 3+ community groups (Facebook, Viber)', done: false },
      { text: 'Post consistently (5x/week minimum)', done: false },
      { text: 'Conduct 25+ client conversations', done: false },
      { text: 'Accumulate 15 total clients', done: false },
      { text: 'Earn first significant commission (₱20K+)', done: false },
      { text: 'Get 2+ client referrals', done: false },
    ],
    milestones: ['Referral pipeline built', 'Consistent income flowing', 'Personal brand growing'],
  },
  phase3: {
    title: 'Days 61-90: Scale',
    emoji: '🚀',
    color: '#4CAF50',
    goals: [
      { text: 'Build referral network (partners, satisfied clients)', done: false },
      { text: 'Create content consistently across platforms', done: false },
      { text: 'Mentor 1-2 new advisors', done: false },
      { text: 'Conduct 40+ client conversations', done: false },
      { text: 'Hit 30 total clients', done: false },
      { text: 'Achieve ₱50K+ monthly income', done: false },
      { text: 'Set 6-month growth targets', done: false },
    ],
    milestones: ['Self-sustaining pipeline', 'Team building begins', 'Financial freedom path clear'],
  },
};

// ============================================================
// INCOME PROJECTION
// ============================================================
export const incomeProjection = [
  { month: 'Month 1', clients: 5, income: 15000, cumulative: 15000 },
  { month: 'Month 2', clients: 10, income: 20000, cumulative: 35000 },
  { month: 'Month 3', clients: 15, income: 30000, cumulative: 65000 },
  { month: 'Month 4', clients: 22, income: 35000, cumulative: 100000 },
  { month: 'Month 5', clients: 30, income: 45000, cumulative: 145000 },
  { month: 'Month 6', clients: 40, income: 55000, cumulative: 200000 },
  { month: 'Month 9', clients: 70, income: 80000, cumulative: 450000 },
  { month: 'Month 12', clients: 100, income: 100000, cumulative: 750000 },
];

// ============================================================
// CLIENT LIFESTYLE QUIZ
// ============================================================
export const lifestyleQuiz = [
  {
    lifestyle: 'Adventurous Traveler',
    icon: '❤️',
    description: 'You love exploring new places and experiencing different cultures',
    recommended: 'Blue Royale',
    reason: 'Worldwide coverage up to 90 days per trip. Any hospital, any country. Emergency evacuation included.',
  },
  {
    lifestyle: 'Busy Professional',
    icon: '💼',
    description: 'Career-focused with limited time, need reliable protection',
    recommended: 'Blue Royale Plan B or FlexiShield',
    reason: 'If you travel: Blue Royale Plan B ($2,698-$4,689/yr). If local: FlexiShield FS 200 (from ₱6,510/yr).',
  },
  {
    lifestyle: 'Family Focused',
    icon: '🏠',
    description: 'Your family\'s health and future are your top priorities',
    recommended: 'FlexiShield or Blue Royale Plan C',
    reason: 'FlexiShield for budget-friendly HMO backup. Blue Royale Plan C ($3,346-$5,263/yr) for full maternity + dental + vision.',
  },
  {
    lifestyle: 'Budget Conscious',
    icon: '💵',
    description: 'You want solid protection without breaking the bank',
    recommended: 'FlexiShield',
    reason: 'From just ₱6,510/year (FS 200). Enhances your existing HMO with PHP 2M additional coverage.',
  },
];

// ============================================================
// COMPETITOR COMPARISON
// ============================================================
export const competitorComparison = [
  { feature: 'Worldwide Coverage', pacificCross: true, competitor1: false, competitor2: true, competitor3: false },
  { feature: 'No Age Limit', pacificCross: true, competitor1: false, competitor2: false, competitor3: false },
  { feature: 'No-Cash-Outlay', pacificCross: true, competitor1: true, competitor2: false, competitor3: true },
  { feature: 'COVID-19 Coverage', pacificCross: true, competitor1: true, competitor2: true, competitor3: false },
  { feature: 'Maternity Benefits', pacificCross: true, competitor1: false, competitor2: true, competitor3: false },
  { feature: 'Daily Hospital Income', pacificCross: true, competitor1: false, competitor2: false, competitor3: true },
  { feature: '75+ Years Experience', pacificCross: true, competitor1: false, competitor2: false, competitor3: false },
  { feature: 'Enhances Existing HMO', pacificCross: true, competitor1: false, competitor2: false, competitor3: false },
];

// ============================================================
// OFW STATS
// ============================================================
export const ofwStats = {
  totalPopulation: '2.2 million',
  topDestinations: [
    { country: 'Saudi Arabia', percent: 22, emoji: '🇸🇦' },
    { country: 'UAE', percent: 18, emoji: '🇦🇪' },
    { country: 'Singapore', percent: 12, emoji: '🇸🇬' },
    { country: 'Hong Kong', percent: 8, emoji: '🇭🇰' },
    { country: 'Others', percent: 40, emoji: '🌍' },
  ],
  remittances: '$33.5 billion (2024)',
  insuranceGap: '80% of OFWs have inadequate insurance',
  opportunity: 'OFW market represents ₱50B+ in potential premiums',
};

// ============================================================
// AGE DEMOGRAPHICS
// ============================================================
export const ageDemographics = [
  { range: '0-14', percent: 31.5, insuranceRate: 15 },
  { range: '15-24', percent: 18.2, insuranceRate: 12 },
  { range: '25-34', percent: 17.8, insuranceRate: 25 },
  { range: '35-44', percent: 14.5, insuranceRate: 32 },
  { range: '45-54', percent: 9.8, insuranceRate: 38 },
  { range: '55-64', percent: 5.2, insuranceRate: 28 },
  { range: '65+', percent: 3.0, insuranceRate: 20 },
];

// ============================================================
// CALENDAR DATA
// ============================================================
export const contentCalendar = [
  { week: 1, monday: '💡 Tip: Emergency fund basics', wednesday: '📊 Myth: Insurance is a scam', friday: '😂 Meme: When your HMO says...', sunday: '🎯 Weekend reflection post' },
  { week: 2, monday: '📚 Carousel: 5 insurance terms to know', wednesday: '💬 Client story: OFW protected', friday: '🔥 Hot take: Why Filipinos avoid insurance', sunday: '📸 Behind the scenes post' },
  { week: 3, monday: '📖 Thread: How Blue Royale works', wednesday: '🧠 Quiz: Test your insurance IQ', friday: '🎬 Reel: Premium vs hospital bill', sunday: '❤️ Gratitude post + CTA' },
  { week: 4, monday: '💡 Infographic: PH vs ASEAN insurance', wednesday: '💬 Story: Family saved by FlexiShield', friday: '🤔 Poll: What stops you from getting insurance?', sunday: '🎯 Month-end review + wins' },
];

// ============================================================
// ARCHETYPE TYPE SYSTEM
// ============================================================
export type Archetype = 'eagle' | 'beaver' | 'ant' | 'owl';

export const archetypes: Record<Archetype, {
  id: Archetype;
  name: string;
  icon: string;
  tagline: string;
  color: string;
  colorAlt: string;
  surface: string;
  gradient: string;
  description: string;
  products: string[];
  targetAudience: string[];
}> = {
  eagle: {
    id: 'eagle',
    name: 'Eagle',
    icon: '🦅',
    tagline: 'Soar Above — Worldwide Premium Coverage',
    color: '#00d4ff',
    colorAlt: '#c9a227',
    surface: '#0a1628',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #0f2035 50%, #080808 100%)',
    description: 'The premium worldwide protection archetype. For high-net-worth individuals, OFWs, and senior professionals who demand the best coverage anywhere in the world.',
    products: ['Blue Royale'],
    targetAudience: ['HNWIs', 'OFWs', 'Expatriates', 'Senior Professionals', 'International Travelers'],
  },
  beaver: {
    id: 'beaver',
    name: 'Beaver',
    icon: '🦫',
    tagline: 'Build Your Shield — Practical HMO Enhancement',
    color: '#f59e0b',
    colorAlt: '#92400e',
    surface: '#1c1917',
    gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #080808 100%)',
    description: 'The practical builder archetype. For employed professionals and families who want reliable, affordable enhancement for their existing HMO coverage.',
    products: ['FlexiShield'],
    targetAudience: ['Employed Professionals', 'Young Families', 'SME Employees', 'Freelancers', 'Parents'],
  },
  ant: {
    id: 'ant',
    name: 'Ant',
    icon: '🐜',
    tagline: 'Better Together — Group & Community Coverage',
    color: '#10b981',
    colorAlt: '#14b8a6',
    surface: '#022c22',
    gradient: 'linear-gradient(135deg, #022c22 0%, #064e3b 50%, #080808 100%)',
    description: 'The community collective archetype. For groups, SMEs, and organizations that protect their people together with coordinated health benefits.',
    products: ['FlexiShield', 'Blue Royale'],
    targetAudience: ['HR Managers', 'SME Owners', 'Community Groups', 'Cooperatives', 'Government Agencies'],
  },
  owl: {
    id: 'owl',
    name: 'Owl',
    icon: '🦉',
    tagline: 'Know Before You Go — Informed Insurance Decisions',
    color: '#818cf8',
    colorAlt: '#a78bfa',
    surface: '#1e1b4b',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #080808 100%)',
    description: 'The wisdom and trust archetype. For first-time buyers and the naturally cautious who want to understand insurance before committing.',
    products: ['FlexiShield', 'Blue Royale'],
    targetAudience: ['First-time Buyers', 'Young Professionals', 'Educated Consumers', 'Risk-Averse Individuals'],
  },
};

// ============================================================
// DAILY PRICING DATA (Gen-Z friendly ₱XX/day format)
// ============================================================
export const dailyPricing = {
  flexiShield: [
    { tier: 'FS 200', age: '0-20', annual: 6510, daily: Math.round(6510 / 365), monthly: Math.round(6510 / 12) },
    { tier: 'FS 200', age: '21-35', annual: 7500, daily: Math.round(7500 / 365), monthly: Math.round(7500 / 12) },
    { tier: 'FS 200', age: '36-45', annual: 10440, daily: Math.round(10440 / 365), monthly: Math.round(10440 / 12) },
    { tier: 'FS 200', age: '46-55', annual: 15790, daily: Math.round(15790 / 365), monthly: Math.round(15790 / 12) },
    { tier: 'FS 200', age: '56-65', annual: 24190, daily: Math.round(24190 / 365), monthly: Math.round(24190 / 12) },
  ],
  blueRoyale: [
    { plan: 'Plan A', age: '19-25', annual: 1676, daily: Math.round(1676 / 365), monthly: Math.round(1676 / 12) },
    { plan: 'Plan B', age: '19-25', annual: 2698, daily: Math.round(2698 / 365), monthly: Math.round(2698 / 12) },
    { plan: 'Plan C', age: '19-25', annual: 3346, daily: Math.round(3346 / 365), monthly: Math.round(3346 / 12) },
  ],
};

// ============================================================
// COMPETITIVE LANDSCAPE DATA
// ============================================================
export const competitors = [
  {
    name: 'Maxicare',
    type: 'HMO',
    colors: ['#003399', '#FF6600'],
    positioning: 'Largest HMO network in the Philippines',
    keyDifferentiator: 'Biggest hospital network (700+ facilities)',
    weakness: 'Corporate-heavy, weak individual offering',
    digitalPresence: 'Functional but outdated mobile app',
    marketShare: '~25% HMO market',
  },
  {
    name: 'Intellicare',
    type: 'HMO',
    colors: ['#008080', '#00CED1'],
    positioning: 'Most digitally advanced HMO',
    keyDifferentiator: 'Best mobile experience among HMOs',
    weakness: 'Limited provincial reach',
    digitalPresence: 'Modern app, telemedicine integration',
    marketShare: '~10% HMO market',
  },
  {
    name: 'Sun Life',
    type: 'Life Insurance',
    colors: ['#FFD700', '#000000'],
    positioning: '#1 insurance brand trust in PH',
    keyDifferentiator: 'Strongest brand recognition, 125+ years',
    weakness: 'Traditional products, slow digital transformation',
    digitalPresence: 'Sun Life GO app, but limited features',
    marketShare: '~18% life insurance market',
  },
  {
    name: 'PhilHealth',
    type: 'Government',
    colors: ['#004B87', '#FFFFFF'],
    positioning: 'National health insurance (mandatory)',
    keyDifferentiator: 'Universal coverage, 94M+ members',
    weakness: 'Fixed case rates, long processing, 30-40% gap per illness',
    digitalPresence: 'Basic portal, mostly offline',
    marketShare: '100% of employed Filipinos (mandatory)',
  },
  {
    name: 'Singlife',
    type: 'Micro-insurance',
    colors: ['#FF5722', '#FFFFFF'],
    positioning: 'Micro-insurance disruptor (₱29/day)',
    keyDifferentiator: 'Best mobile UX, embedded distribution via Cebuana',
    weakness: 'Limited coverage, no major medical events',
    digitalPresence: 'Best-in-class mobile-first experience',
    marketShare: 'Emerging, fast growth',
  },
  {
    name: 'GCash/GInsure',
    type: 'Embedded Insurance',
    colors: ['#00ADEF', '#004B87'],
    positioning: 'Insurance embedded in 90M-user super app',
    keyDifferentiator: 'One-tap purchase, GCash integration',
    weakness: 'Limited product range, basic coverage only',
    digitalPresence: 'Embedded in GCash app (90M+ MAU)',
    marketShare: 'Emerging, massive distribution',
  },
];

// ============================================================
// PACIFIC CROSS COMPETITIVE ADVANTAGES
// ============================================================
export const pcxAdvantages = [
  { area: 'Coverage Depth', advantage: 'Up to USD 2M worldwide vs competitors\' PHP limits', competitors: ['Maxicare', 'Intellicare'] },
  { area: 'Age Range', advantage: 'Covers 0-100 years, guaranteed renewable', competitors: ['Sun Life', 'Manulife'] },
  { area: 'No Network Restriction', advantage: 'Choose ANY hospital worldwide, no gatekeepers', competitors: ['Maxicare', 'Intellicare', 'PhilHealth'] },
  { area: 'Claims Service', advantage: '75+ years ISO-certified, sub-48hr settlement available', competitors: ['All'] },
  { area: 'OFW Specialization', advantage: '90 days/trip unlimited, tailored for Filipino diaspora', competitors: ['Sun Life', 'AXA'] },
  { area: 'FlexiShield USP', advantage: 'Only HMO enhancer with PHP 2M coverage, COVID covered', competitors: ['Maxicare', 'Intellicare'] },
  { area: 'PhilHealth Partnership', advantage: 'Benefits IN ADDITION to PhilHealth, not replacement', competitors: ['All HMOs'] },
  { area: 'Heritage', advantage: '75+ years, oldest continuously operating non-life insurer in PH', competitors: ['All'] },
];

// ============================================================
// RELATABLE PRICE COMPARISONS (Gen-Z targeted)
// ============================================================
export const relatablePriceComparisons = [
  { item: 'Netflix Monthly', price: 550, emoji: '📺' },
  { item: 'Spotify Premium', price: 199, emoji: '🎵' },
  { item: 'Coffee per Week', price: 1200, emoji: '☕' },
  { item: 'Gaming Load per Month', price: 800, emoji: '🎮' },
  { item: 'FlexiShield FS 200 (21-35)', price: 7500, emoji: '🛡️', isInsurance: true },
  { item: 'Blue Royale Plan A (19-25)', price: 1676, emoji: '👑', isInsurance: true },
];
