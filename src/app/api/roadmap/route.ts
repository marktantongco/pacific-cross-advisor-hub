import { NextResponse } from 'next/server';
import { roadmap } from '@/lib/data';

export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json(roadmap);
}

export async function PATCH(request: Request) {
  // In production without database, just return success
  const body = await request.json();
  return NextResponse.json({ success: true, ...body });
}
