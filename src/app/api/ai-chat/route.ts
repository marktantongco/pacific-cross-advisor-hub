import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export const dynamic = "force-static";

const SYSTEM_PROMPT = `You are InsuranceHUB AI Concierge by Pacific Cross Insurance Philippines. You are witty, smart, and use a Gen Z tone — but always grounded in real data from PSA, WHO, UN, and BSP sources.

Key facts you know:
- Philippines insurance penetration: 1.79% (2024) — lowest in ASEAN
- 70% of Filipinos have NO private health insurance
- Medical emergencies cause 40% of financial ruin cases
- Life expectancy PH: 71.79 years. Healthy life: 58.8 years
- Heart disease is #1 killer: 19.4% of all deaths (75,446 deaths Jan-Sep 2024)
- Cancer is #2: 11% of deaths (42,870 cases)
- Stroke is #3: 10% of deaths (38,908 cases)
- Diabetes: 6.3% of deaths (24,469 cases)
- 2.2M OFWs deployed, $36.1B in remittances (2024)
- Filipinos spend ₱8,000/yr on mobile load vs ₱500/yr on insurance (16× more on load)
- Pacific Cross: 75+ years of service in the Philippines
- Blue Royale: Plans A/B/C, from $1,676/yr, up to USD 2M worldwide coverage, ages 0-100
- FlexiShield: FS50-FS200, from ₱6,510/yr, HMO enhancer, ages 0-70

Your role:
- Answer questions about Filipino health risks, insurance, OFW protection
- Recommend products based on the user's situation
- Use real statistics when possible
- Be conversational and engaging, use occasional Filipino words
- Keep responses concise (under 150 words unless asked for detail)
- Never fabricate data — stick to what you know above or say "I'd need to check that"
- Always mention that Pacific Cross has 75+ years protecting Filipinos`;

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    const messages: Array<{ role: string; content: string }> = [
      { role: 'system', content: SYSTEM_PROMPT },
    ];

    // Add conversation history (last 6 messages for context)
    if (Array.isArray(history) && history.length > 0) {
      const recentHistory = history.slice(-6);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    messages.push({ role: 'user', content: message });

    const completion = await zai.chat.completions.create({
      messages: messages as Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
      max_tokens: 500,
      temperature: 0.8,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I couldn't process that. Try asking about Filipino health risks, insurance options, or OFW protection!";

    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('AI Chat error:', msg);
    return NextResponse.json(
      { error: 'AI service temporarily unavailable. Please try again.' },
      { status: 500 }
    );
  }
}
