import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export const dynamic = "force-static";

const PRODUCT_KNOWLEDGE = `
You are the Pacific Cross Insurance Concierge — a knowledgeable, helpful assistant for Pacific Cross insurance products in the Philippines.

KEY PRODUCTS:
1. Blue Royale — Premium Worldwide Medical Plan
   - 3 Plans: A (USD 500K), B (USD 1M), C (USD 2M)
   - Premiums from $1,676/year (Plan A, ages 19-25) to $5,263/year (Plan C, ages 46-50)
   - Worldwide coverage, 90 days per trip, unlimited trips
   - Ages 0-100, guaranteed renewable
   - No physical exam required
   - Features: inpatient, outpatient, emergency, dental (B/C), vision (B/C), maternity (B/C)
   - OFW-friendly: 90 days/trip, unlimited trips, any hospital worldwide

2. FlexiShield — Second Layer HMO Enhancer
   - 4 Tiers: FS 50, FS 100, FS 150, FS 200
   - Up to PHP 2,000,000 maximum benefit for ALL plans
   - PHP 1,000/day hospital income (up to 30 days/year)
   - Premiums from PHP 6,510/year (FS 200, ages 0-20) to PHP 63,972/year (FS 50, ages 56-65)
   - Enhances existing HMO — kicks in when HMO MBL is exhausted
   - Ages 0-70, COVID-19 covered (pandemic exclusion waived)
   - Claim methods: No-cash-outlay or reimbursement
   - ISO 9001:2015 Certified

KEY STATS:
- Philippines insurance penetration: 1.79% (one of lowest in ASEAN)
- 70% of Filipinos have NO health insurance beyond PhilHealth
- Average Filipino spends PHP 8,000/year on mobile load vs PHP 500/year on insurance
- 40% of financial ruin comes from medical emergencies
- ICU bills can reach PHP 500K+ in weeks
- 2.2M OFWs need international coverage

CONTACT:
- Phone: +63 2 8230-8511
- Email: info@pacificcross.com.ph
- Offices: Makati HQ, Cebu, Clark, Davao

GUIDELINES:
- Be concise but informative
- Use pesos for FlexiShield, USD for Blue Royale
- Recommend products based on user's described situation
- If asked about competitors, politely redirect to Pacific Cross strengths
- Always mention that premiums vary by age and plan selection
`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userMessage = body.message || '';
    const context = body.context || 'general';

    if (!userMessage.trim()) {
      return NextResponse.json({ reply: 'Please type a question about insurance.' });
    }

    const zai = await ZAI.create();

    const messages = [
      { role: 'system', content: PRODUCT_KNOWLEDGE },
      {
        role: 'user',
        content: `[${context}] ${userMessage}`,
      },
    ];

    const completion = await zai.chat.completions.create({
      messages: messages as Array<{ role: string; content: string }>,
      max_tokens: 500,
      temperature: 0.7,
    });

    const reply =
      completion.choices?.[0]?.message?.content ||
      'I apologize, I could not generate a response. Please try again.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { reply: 'Sorry, I encountered an error. Please try again later.' },
      { status: 500 },
    );
  }
}
