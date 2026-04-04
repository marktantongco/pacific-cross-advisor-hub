import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const misconceptions = await db.misconception.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(misconceptions);
  } catch (error) {
    console.error('Error fetching misconceptions:', error);
    return NextResponse.json({ error: 'Failed to fetch misconceptions' }, { status: 500 });
  }
}
