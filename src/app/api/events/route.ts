import { NextResponse } from 'next/server';
import { events } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(events);
}
