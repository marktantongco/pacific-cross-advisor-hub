import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({ 
    message: 'Pacific Cross Advisor Hub API',
    version: '1.0.0',
    endpoints: [
      '/api/products',
      '/api/faqs',
      '/api/spiels',
      '/api/stats',
      '/api/roadmap',
      '/api/misconceptions',
      '/api/slides',
      '/api/events',
      '/api/social'
    ]
  });
}
