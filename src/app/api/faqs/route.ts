import { NextResponse } from 'next/server';
import { faqs } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(faqs);
}
