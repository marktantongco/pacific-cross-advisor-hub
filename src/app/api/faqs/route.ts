import { NextResponse } from 'next/server';
import { faqs } from '@/lib/data';

export async function GET() {
  return NextResponse.json(faqs);
}
