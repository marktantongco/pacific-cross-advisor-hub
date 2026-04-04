import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const posts = await db.socialPost.findMany({
      where: { status: 'scheduled' },
      orderBy: { scheduledAt: 'asc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching scheduled posts:', error);
    return NextResponse.json({ error: 'Failed to fetch scheduled posts' }, { status: 500 });
  }
}
