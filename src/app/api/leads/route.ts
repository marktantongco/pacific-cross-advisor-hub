import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-static";

// Lead data stored in-memory (in production, connect to database via Prisma)
const leads: Array<{
  id: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  quoteAge?: string;
  quoteBudget?: string;
  generatedPremium?: number;
  generatedProduct?: string;
  createdAt: string;
}> = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, email, source, quoteAge, quoteBudget, generatedPremium, generatedProduct } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Client name is required' },
        { status: 400 }
      );
    }

    const lead = {
      id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: name.trim(),
      phone: phone?.trim() || '',
      email: email?.trim() || '',
      source: source || 'command-center',
      quoteAge: quoteAge || '',
      quoteBudget: quoteBudget || '',
      generatedPremium: generatedPremium || null,
      generatedProduct: generatedProduct || null,
      createdAt: new Date().toISOString(),
    };

    // Store lead in memory
    leads.push(lead);

    // Log lead capture (in production, this would go to a database)
    console.log('[LEAD CAPTURED]', {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      source: lead.source,
      premium: lead.generatedPremium,
      product: lead.generatedProduct,
    });

    // Attempt to sync with AI Gateway if available (for CRM integration)
    const apiKey = process.env.AI_GATEWAY_API_KEY;
    if (apiKey) {
      try {
        // Prepare lead summary for AI-powered follow-up
        const leadSummary = `New insurance lead captured:
Name: ${lead.name}
Phone: ${lead.phone}
Email: ${lead.email}
Source: ${lead.source}
Quote: ${lead.generatedPremium ? `₱${lead.generatedPremium}/mo ${lead.generatedProduct}` : 'No quote generated'}

Suggested next steps:
1. Call within 24 hours
2. Prepare personalized quote based on age ${lead.quoteAge || 'not provided'} and budget ${lead.quoteBudget || 'not provided'}
3. Send confirmation SMS/email`;

        console.log('[AI_GATEWAY] Lead summary prepared for CRM sync');
        // In production, POST this to your AI Gateway endpoint for CRM integration
      } catch (aiError) {
        console.error('[AI_GATEWAY] Sync failed:', aiError);
        // Non-blocking — lead is still saved locally
      }
    }

    return NextResponse.json({
      success: true,
      lead: {
        id: lead.id,
        name: lead.name,
        source: lead.source,
      },
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return lead count (for dashboard stats)
  return NextResponse.json({
    total: leads.length,
    recent: leads.slice(-10).reverse(),
  });
}
