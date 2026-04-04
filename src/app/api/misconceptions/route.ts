import { NextResponse } from 'next/server';
import { misconceptions } from '@/lib/data';

export async function GET() {
  return NextResponse.json(misconceptions);
}
