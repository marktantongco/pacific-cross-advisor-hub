import { NextResponse } from 'next/server';
import { spiels } from '@/lib/data';

export async function GET() {
  return NextResponse.json(spiels);
}
