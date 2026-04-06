import { NextResponse } from 'next/server';
import { spiels } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(spiels);
}
