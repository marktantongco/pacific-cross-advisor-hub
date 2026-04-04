import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const where = category ? { category, isActive: true } : { isActive: true };
    
    const spiels = await db.spielStep.findMany({
      where,
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(spiels);
  } catch (error) {
    console.error('Error fetching spiels:', error);
    return NextResponse.json({ error: 'Failed to fetch spiels' }, { status: 500 });
  }
}
