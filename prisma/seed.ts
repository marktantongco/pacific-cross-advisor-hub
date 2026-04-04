import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Products
  await prisma.product.upsert({
    where: { slug: 'blue-royale' },
    update: {},
    create: {
      name: 'Blue Royale',
      slug: 'blue-royale',
      tagline: 'Premium Global Health Coverage',
      description: 'The ultimate international health insurance plan offering comprehensive medical coverage worldwide. Perfect for executives, frequent travelers, and those who demand the best healthcare access globally.',
      coverage: 'Up to USD 2,000,000',
      minCoverage: 500000,
      maxCoverage: 2000000,
      currency: 'USD',
      category: 'premium',
      features: [
        'Maximum coverage of up to USD 2 million annually',
        'Freedom to choose any medical provider worldwide',
        'All-inclusive Core Benefits covering medical and travel',
        'Inpatient and outpatient coverage',
        'Emergency medical evacuation',
        'Maternity benefits available',
        'Optional dental and vision coverage',
        'Direct billing at accredited facilities',
        'Annual health check-up allowance',
        'Mental health coverage'
      ],
      benefits: [
        { title: 'Global Access', desc: 'Use any hospital worldwide - no network restrictions' },
        { title: 'High Coverage', desc: 'Up to $2M annual limit - peace of mind for major medical events' },
        { title: 'Travel Protection', desc: 'Built-in travel insurance for trips up to 90 days' },
        { title: 'Direct Billing', desc: 'No cash outlay at accredited hospitals' },
        { title: 'Family Coverage', desc: 'Cover your spouse and children under one plan' }
      ],
      idealFor: [
        'Business executives and entrepreneurs',
        'Frequent international travelers',
        'Expatriates living in the Philippines',
        'OFW families seeking premium coverage',
        'High-net-worth individuals'
      ],
      pricing: [
        { plan: 'Essential', annual: 'From $3,500/year', coverage: '$500,000' },
        { plan: 'Classic', annual: 'From $5,500/year', coverage: '$1,000,000' },
        { plan: 'Premier', annual: 'From $8,000/year', coverage: '$2,000,000' }
      ],
      advantages: [
        'Worldwide coverage with no network restrictions',
        'Very high annual coverage limits',
        'Includes both medical and travel insurance',
        'Direct billing at Pacific Cross accredited facilities',
        'Comprehensive maternity coverage option',
        'Pre-existing conditions may be covered after waiting period'
      ],
      disadvantages: [
        'Premium pricing - higher than local HMO plans',
        'May require medical underwriting',
        '90-day trip limitation for overseas coverage',
        'Pre-existing conditions have waiting periods',
        'Annual deductible applies to some plans'
      ],
      order: 1
    }
  });

  await prisma.product.upsert({
    where: { slug: 'flexishield' },
    update: {},
    create: {
      name: 'FlexiShield',
      slug: 'flexishield',
      tagline: 'Your Affordable Top-Up Protection',
      description: 'A second-layer medical insurance plan that enhances your existing HMO coverage. Perfect for individuals who want extra protection without the premium price tag of comprehensive international plans.',
      coverage: 'Up to PHP 2,000,000',
      minCoverage: 500000,
      maxCoverage: 2000000,
      currency: 'PHP',
      category: 'topup',
      features: [
        'Coverage up to PHP 2 million per illness',
        'Works with your existing HMO as a top-up',
        'Includes COVID-19 coverage',
        'No pre-existing condition exclusions for Plan A',
        'Room and board allowance',
        'Surgical fees coverage',
        'Doctor\'s fees coverage',
        'Outpatient benefits available',
        'Emergency coverage nationwide',
        'Quick and easy claims process'
      ],
      benefits: [
        { title: 'Budget-Friendly', desc: 'Affordable premiums that won\'t break the bank' },
        { title: 'HMO Booster', desc: 'Extends your HMO coverage when limits are reached' },
        { title: 'COVID Covered', desc: 'Includes COVID-19 related hospitalization' },
        { title: 'Easy Claims', desc: 'Simple reimbursement process' },
        { title: 'Family Plans', desc: 'Cover your whole family affordably' }
      ],
      idealFor: [
        'Employees with existing HMO coverage',
        'Young professionals starting their careers',
        'Families on a budget',
        'Individuals whose HMO limits are too low',
        'Those seeking extra protection without high costs'
      ],
      pricing: [
        { plan: 'Plan A', annual: 'From PHP 15,000/year', coverage: 'PHP 500,000' },
        { plan: 'Plan B', annual: 'From PHP 25,000/year', coverage: 'PHP 1,000,000' },
        { plan: 'Plan C', annual: 'From PHP 40,000/year', coverage: 'PHP 2,000,000' }
      ],
      advantages: [
        'Very affordable compared to comprehensive plans',
        'No medical exam required for most applicants',
        'Covers what your HMO doesn\'t',
        'COVID-19 included in coverage',
        'Easy application process',
        'Works with ANY existing HMO provider'
      ],
      disadvantages: [
        'Requires existing HMO coverage (minimum PHP 150,000)',
        'Reimbursement basis - pay first, claim later',
        'Limited to Philippine coverage only',
        'Not suitable as standalone insurance',
        'Some procedures require pre-authorization'
      ],
      order: 2
    }
  });

  // Seed FAQs
  const faqs = [
    { question: 'What is the difference between Blue Royale and FlexiShield?', answer: 'Blue Royale is a premium international health insurance with coverage up to USD 2 million worldwide, ideal for executives and frequent travelers. FlexiShield is an affordable top-up plan that enhances your existing HMO coverage up to PHP 2 million, perfect for those who already have basic HMO but want extra protection.', category: 'product' },
    { question: 'Do I need an existing HMO to get FlexiShield?', answer: 'Yes, FlexiShield is designed as a second-layer plan. You need an existing HMO with at least PHP 150,000 coverage per illness to qualify. It kicks in when your HMO limits are exhausted.', category: 'product' },
    { question: 'Can I use Blue Royale anywhere in the world?', answer: 'Yes! Blue Royale offers worldwide coverage. You can choose any doctor or hospital globally. For trips outside the Philippines, each trip can last up to 90 days under standard terms.', category: 'product' },
    { question: 'What happens if I have a pre-existing condition?', answer: 'For Blue Royale, pre-existing conditions may be covered after a waiting period (usually 12-24 months) depending on your medical history. FlexiShield Plan A has no pre-existing condition exclusions.', category: 'product' },
    { question: 'How do I file a claim?', answer: 'For Blue Royale with direct billing, simply present your Pacific Cross Health Care Card at accredited facilities. For FlexiShield and non-accredited facilities, submit your receipts and accomplished claim form within 60 days of treatment.', category: 'claims' },
    { question: 'How much does health insurance cost in the Philippines?', answer: 'Costs vary widely. Basic HMO plans start around PHP 15,000-30,000/year. Top-up plans like FlexiShield range from PHP 15,000-40,000/year. Premium international plans like Blue Royale start around $3,500/year.', category: 'general' },
    { question: 'Is health insurance worth it for young professionals?', answer: 'Absolutely! Health emergencies can cost hundreds of thousands of pesos. A single hospitalization can wipe out years of savings. Starting young also means lower premiums and protection when you need it most.', category: 'general' },
    { question: 'What makes a good insurance advisor?', answer: 'A good advisor listens first, educates rather than sells, provides transparent information, offers multiple options, follows up consistently, and genuinely cares about your financial protection - not just making a sale.', category: 'advisor' },
    { question: 'How do I approach someone about insurance without sounding pushy?', answer: 'Start with genuine care and questions about their situation. Share stories and information without immediately pushing products. Position yourself as a resource and educator. Let them come to you when ready.', category: 'advisor' },
    { question: 'What\'s the best way to explain insurance to skeptics?', answer: 'Use real-life examples and statistics. Share the reality of medical costs in the Philippines. Focus on what they\'re protecting (family, savings, future) rather than what they\'re buying. Address misconceptions directly with facts.', category: 'advisor' }
  ];

  for (let i = 0; i < faqs.length; i++) {
    await prisma.fAQ.upsert({
      where: { id: `faq-${i + 1}` },
      update: {},
      create: {
        id: `faq-${i + 1}`,
        question: faqs[i].question,
        answer: faqs[i].answer,
        category: faqs[i].category,
        order: i + 1
      }
    });
  }

  // Seed Spiel Steps
  const spiels = [
    {
      title: 'The Warm Opening',
      script: 'Hi [Name]! How are you? I\'ve been thinking about our last conversation about [topic]. By the way, I wanted to share something interesting I learned recently about healthcare costs...',
      context: 'Opening conversation with someone you know',
      category: 'opening',
      tips: ['Be genuine', 'Reference past conversations', 'Transition naturally']
    },
    {
      title: 'The Discovery Question',
      script: 'Out of curiosity, what\'s your plan if something unexpected happens health-wise? I\'m asking because I\'ve seen too many people caught off guard by medical bills.',
      context: 'Understanding their current situation',
      category: 'discovery',
      tips: ['Listen more than talk', 'Ask follow-up questions', 'Don\'t assume they need insurance']
    },
    {
      title: 'The Story Approach',
      script: 'Let me share a story. A client of mine thought their HMO was enough. Then they had a medical emergency that cost PHP 800,000. Their HMO only covered PHP 200,000. Guess where the rest came from? Their savings. That\'s why I always recommend having a backup plan.',
      context: 'Using stories to illustrate importance',
      category: 'presentation',
      tips: ['Use real stories (anonymized)', 'Be specific with numbers', 'Let the story speak for itself']
    },
    {
      title: 'The FlexiShield Pitch',
      script: 'Think of FlexiShield as your HMO\'s best friend. It\'s like having a backup generator - you don\'t think about it until you need it. For just [amount] a year, you get an extra PHP 2 million coverage. That\'s less than [daily equivalent] a day for peace of mind.',
      context: 'Presenting FlexiShield to HMO holders',
      category: 'presentation',
      tips: ['Use analogies', 'Break down costs to daily amounts', 'Focus on peace of mind']
    },
    {
      title: 'The Blue Royale Pitch',
      script: 'Imagine being able to walk into any hospital in the world and say "treat me, cost is not an issue." That\'s what Blue Royale offers. Up to $2 million coverage, any doctor, any hospital, anywhere. It\'s not just insurance - it\'s freedom.',
      context: 'Presenting Blue Royale to high-value prospects',
      category: 'presentation',
      tips: ['Paint a picture', 'Appeal to lifestyle aspirations', 'Emphasize freedom and choice']
    },
    {
      title: 'Handling "It\'s too expensive"',
      script: 'I totally understand. Let me ask you this - if you got sick tomorrow, would you rather have paid [amount] for protection, or be faced with a [much larger amount] hospital bill? The question isn\'t "Can I afford insurance?" but "Can I afford NOT to have it?"',
      context: 'Price objection handling',
      category: 'objection',
      tips: ['Validate their concern', 'Reframe the question', 'Use real numbers']
    },
    {
      title: 'Handling "I already have HMO"',
      script: 'That\'s great that you have coverage! Quick question - do you know your HMO\'s maximum coverage per illness? Most HMOs cap at PHP 200,000-300,000. A serious illness can cost 5-10 times that. FlexiShield kicks in when your HMO runs out.',
      context: 'Competitor objection handling',
      category: 'objection',
      tips: ['Acknowledge what they have', 'Educate on gaps', 'Present as enhancement, not replacement']
    },
    {
      title: 'The Soft Close',
      script: 'Look, I\'m not here to pressure you into anything. I genuinely believe this could help protect you and your family. Why don\'t we just look at the numbers together? No commitment needed. If it makes sense, great. If not, at least you\'ll know your options.',
      context: 'Moving toward commitment',
      category: 'closing',
      tips: ['Remove pressure', 'Offer information, not demands', 'Give them control']
    },
    {
      title: 'The OFW Family Angle',
      script: 'If you have family working abroad, imagine how they\'d feel knowing you\'re protected. They work hard overseas to give you a better life. The last thing they want is to come home to a family burdened by medical debt. Insurance is a gift of love - to yourself and to them.',
      context: 'For families of OFWs',
      category: 'presentation',
      tips: ['Tap into emotional connections', 'Acknowledge sacrifice', 'Position as family protection']
    },
    {
      title: 'The Follow-Up',
      script: 'Hey [Name], just wanted to check in. I know we talked about [topic]. Any thoughts or questions that came up? I\'m here whenever you\'re ready. No rush.',
      context: 'Following up after initial conversation',
      category: 'closing',
      tips: ['Be patient', 'Stay available', 'Don\'t be pushy']
    }
  ];

  for (let i = 0; i < spiels.length; i++) {
    await prisma.spielStep.upsert({
      where: { id: `spiel-${i + 1}` },
      update: {},
      create: {
        id: `spiel-${i + 1}`,
        ...spiels[i],
        order: i + 1
      }
    });
  }

  // Seed Market Statistics
  const stats = [
    { label: 'Insurance Penetration Rate', value: '1.78%', description: 'Insurance premiums as % of GDP (2025)', source: 'Insurance Commission', year: 2025, category: 'penetration', order: 1 },
    { label: 'Life Insurance Premiums', value: '₱403 Billion', description: 'Record-high premiums collected in 2025', source: 'Insurance Commission', year: 2025, category: 'premium', order: 2 },
    { label: 'Filipinos with Insurance', value: '~15%', description: 'Estimated percentage of population with some form of insurance', source: 'Various estimates', year: 2024, category: 'penetration', order: 3 },
    { label: 'Average HMO Coverage', value: '₱150,000', description: 'Typical annual coverage limit for corporate HMOs', source: 'Industry average', year: 2024, category: 'premium', order: 4 },
    { label: 'Cancer Treatment Cost', value: '₱1-2M', description: 'Average cost for cancer treatment in private hospitals', source: 'Hospital data', year: 2024, category: 'premium', order: 5 },
    { label: 'ICU Daily Rate', value: '₱50,000+', description: 'Average ICU cost per day in Metro Manila private hospitals', source: 'Hospital surveys', year: 2024, category: 'premium', order: 6 },
    { label: 'OFW Count', value: '2.2 Million', description: 'Overseas Filipino Workers deployed annually', source: 'POEA', year: 2024, category: 'demographics', order: 7 },
    { label: 'Middle Class Growth', value: 'Increasing', description: 'Growing middle class driving insurance demand', source: 'World Bank', year: 2024, category: 'demographics', order: 8 }
  ];

  for (let i = 0; i < stats.length; i++) {
    await prisma.marketStat.upsert({
      where: { id: `stat-${i + 1}` },
      update: {},
      create: {
        id: `stat-${i + 1}`,
        ...stats[i]
      }
    });
  }

  // Seed Roadmap Items
  const roadmap = [
    { title: 'Complete Product Training', description: 'Master Blue Royale and FlexiShield features, benefits, and pricing', phase: 'week1', order: 1 },
    { title: 'Study FAQ and Objection Handling', description: 'Learn common questions and practice responses', phase: 'week1', order: 2 },
    { title: 'Role-play with a Mentor', description: 'Practice spiels and presentations with experienced advisor', phase: 'week1', order: 3 },
    { title: 'Build Your Prospect List', description: 'Identify 50 potential clients from your network', phase: 'week2', order: 4 },
    { title: 'Create Social Media Presence', description: 'Set up professional Facebook page and LinkedIn profile', phase: 'week2', order: 5 },
    { title: 'First 10 Outreach Messages', description: 'Reach out to prospects with genuine care approach', phase: 'week2', order: 6 },
    { title: 'Attend Training Sessions', description: 'Join Keystone training and team meetings', phase: 'month1', order: 7 },
    { title: 'Close Your First Sale', description: 'Guide your first client from prospect to policyholder', phase: 'month1', order: 8 },
    { title: 'Build Client Referral System', description: 'Ask satisfied clients for referrals and testimonials', phase: 'month3', order: 9 },
    { title: 'Expand to OFW Market', description: 'Tap into OFW families and overseas prospects', phase: 'month3', order: 10 },
    { title: 'Continuous Learning', description: 'Stay updated on products, market trends, and sales techniques', phase: 'ongoing', order: 11 },
    { title: 'Build Your Brand', description: 'Establish yourself as a trusted insurance advisor', phase: 'ongoing', order: 12 }
  ];

  for (let i = 0; i < roadmap.length; i++) {
    await prisma.roadmapItem.upsert({
      where: { id: `roadmap-${i + 1}` },
      update: {},
      create: {
        id: `roadmap-${i + 1}`,
        ...roadmap[i]
      }
    });
  }

  // Seed Misconceptions
  const misconceptions = [
    {
      myth: '"I\'m young and healthy, I don\'t need insurance"',
      reality: 'Illness and accidents don\'t discriminate by age',
      explanation: 'Actually, getting insurance while young and healthy means LOWER premiums and better coverage. Plus, you never know when you\'ll develop a condition that makes you uninsurable later.',
      category: 'general',
      order: 1
    },
    {
      myth: '"My HMO from work is enough"',
      reality: 'Most HMOs have limited coverage that can be exhausted quickly',
      explanation: 'Typical HMO coverage is PHP 150,000-300,000 per illness. A serious condition like cancer or stroke can cost millions. Your HMO is a good start, but not complete protection.',
      category: 'product',
      order: 2
    },
    {
      myth: '"Insurance is just a waste of money"',
      reality: 'Insurance is one of the best financial investments you can make',
      explanation: 'Think of insurance as buying peace of mind. A PHP 20,000/year premium protects you from potentially losing millions in medical bills. That\'s a pretty good ROI for your peace of mind.',
      category: 'general',
      order: 3
    },
    {
      myth: '"I\'ll just get insurance when I\'m older"',
      reality: 'Insurance gets more expensive and harder to get as you age',
      explanation: 'Premiums increase with age. Plus, health conditions that develop may make you uninsurable or subject to exclusions. The best time to get insurance is NOW, while you\'re young and healthy.',
      category: 'general',
      order: 4
    },
    {
      myth: '"Insurance agents just want my money"',
      reality: 'Good advisors genuinely want to protect you and your family',
      explanation: 'Yes, advisors earn commissions. But the best ones focus on educating and protecting clients. A good advisor will even tell you if a product isn\'t right for you. It\'s about building trust and long-term relationships.',
      category: 'advisor',
      order: 5
    },
    {
      myth: '"FlexiShield is redundant with my HMO"',
      reality: 'FlexiShield kicks in exactly where your HMO stops',
      explanation: 'FlexiShield is designed to complement, not replace your HMO. When your HMO hits its limit (often PHP 150,000-300,000), FlexiShield covers the excess up to PHP 2 million. It\'s the safety net you didn\'t know you needed.',
      category: 'product',
      productSlug: 'flexishield',
      order: 6
    },
    {
      myth: '"Blue Royale is only for rich people"',
      reality: 'Blue Royale offers plans for various budgets',
      explanation: 'While Blue Royale is a premium product, it has different tiers starting from around $3,500/year. For executives, entrepreneurs, and frequent travelers, this is actually very competitive for international coverage.',
      category: 'product',
      productSlug: 'blue-royale',
      order: 7
    },
    {
      myth: '"Insurance won\'t cover my pre-existing condition"',
      reality: 'Many plans cover pre-existing conditions after a waiting period',
      explanation: 'It\'s true that pre-existing conditions have special terms, but they\'re not automatically excluded. Blue Royale may cover them after a waiting period, and FlexiShield Plan A has NO pre-existing condition exclusions.',
      category: 'product',
      order: 8
    }
  ];

  for (let i = 0; i < misconceptions.length; i++) {
    await prisma.misconception.upsert({
      where: { id: `misconception-${i + 1}` },
      update: {},
      create: {
        id: `misconception-${i + 1}`,
        ...misconceptions[i]
      }
    });
  }

  // Seed Presentation Slides
  const slides = [
    { title: 'Insurance Fundamentals', content: '# Why Insurance Matters\n\nInsurance is not just a product—it\'s a financial safety net that protects everything you\'ve worked for.\n\n## Key Points\n- Risk transfer mechanism\n- Peace of mind\n- Family protection\n- Asset preservation', section: 'Fundamentals', order: 1 },
    { title: 'Philippine Insurance Landscape', content: '# The Reality Check\n\n## Statistics\n- **1.78%** penetration rate (2025)\n- **85%** of Filipinos without insurance\n- **₱403B** in life insurance premiums\n\n## The Opportunity\nHuge untapped market with growing middle class', section: 'Market', order: 2 },
    { title: 'Blue Royale Overview', content: '# Blue Royale\n**Premium Global Health Coverage**\n\n## Key Features\n- Up to USD 2 million coverage\n- Worldwide hospital access\n- Direct billing available\n- Travel insurance included\n\n## Ideal For\n- Executives\n- Frequent travelers\n- Expatriates\n- OFW families', section: 'Products', order: 3 },
    { title: 'FlexiShield Overview', content: '# FlexiShield\n**Your HMO\'s Best Friend**\n\n## Key Features\n- Up to PHP 2 million coverage\n- Works with any HMO\n- COVID-19 included\n- Affordable premiums\n\n## Ideal For\n- Employees with HMO\n- Young professionals\n- Budget-conscious families', section: 'Products', order: 4 },
    { title: 'Comparing Products', content: '# Which One\'s for You?\n\n| Feature | Blue Royale | FlexiShield |\n|---------|-------------|-------------|\n| Coverage | Up to $2M | Up to ₱2M |\n| Network | Worldwide | Philippines |\n| Requires HMO | No | Yes |\n| Best For | Executives | Employees |\n| Starting Price | ~$3,500/yr | ~₱15,000/yr |', section: 'Products', order: 5 },
    { title: 'The Advisor\'s Role', content: '# Be a Guide, Not a Salesperson\n\n## What Makes a Great Advisor?\n1. **Listen first** - Understand their needs\n2. **Educate** - Don\'t just sell\n3. **Be honest** - Share limitations too\n4. **Follow up** - Build relationships\n5. **Care genuinely** - It\'s about protection', section: 'Advisor', order: 6 },
    { title: 'Common Misconceptions', content: '# Myth Busters\n\n**Myth:** "I\'m young, I don\'t need insurance"\n**Reality:** Best time to buy is when young and healthy\n\n**Myth:** "My HMO is enough"\n**Reality:** Most HMOs cap at ₱300,000\n\n**Myth:** "It\'s too expensive"\n**Reality:** Can you afford NOT to have it?', section: 'Education', order: 7 },
    { title: 'The OFW Opportunity', content: '# Protecting Families Across Borders\n\n## Why OFW Families Need Insurance\n- OFWs work hard to provide\n- Medical emergencies create debt\n- Distance makes care coordination hard\n- Insurance = gift of love\n\n## Talking Points\n- "Your [family member] works hard abroad"\n- "Protect what they\'re building"\n- "Give them peace of mind"', section: 'Market', order: 8 },
    { title: 'Closing Thoughts', content: '# Remember\n\n> "Insurance is the only product that you buy hoping you\'ll never need to use it. But if you do need it, you\'ll be glad you have it."\n\n## Action Items\n1. Know your products\n2. Build your network\n3. Educate, don\'t sell\n4. Follow up consistently\n5. Protect families', section: 'Closing', order: 9 }
  ];

  for (let i = 0; i < slides.length; i++) {
    await prisma.presentationSlide.upsert({
      where: { id: `slide-${i + 1}` },
      update: {},
      create: {
        id: `slide-${i + 1}`,
        ...slides[i]
      }
    });
  }

  // Seed Calendar Events
  const events = [
    { title: 'Weekly Team Training', description: 'Join the weekly sales training and product updates', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), type: 'training', isRecurring: true, recurrence: 'weekly' },
    { title: 'Product Knowledge Exam', description: 'Quarterly assessment on product knowledge', date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), type: 'deadline' },
    { title: 'Client Appreciation Event', description: 'Quarterly gathering for existing clients', date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), type: 'event' },
    { title: 'Follow-up with Prospects', description: 'Weekly reminder to check in with pending prospects', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), type: 'reminder', isRecurring: true, recurrence: 'weekly' }
  ];

  for (let i = 0; i < events.length; i++) {
    await prisma.calendarEvent.upsert({
      where: { id: `event-${i + 1}` },
      update: {},
      create: {
        id: `event-${i + 1}`,
        ...events[i]
      }
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
