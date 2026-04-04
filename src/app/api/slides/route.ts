import { NextResponse } from 'next/server';
import { slides } from '@/lib/data';

export async function GET() {
  return NextResponse.json(slides);
}
