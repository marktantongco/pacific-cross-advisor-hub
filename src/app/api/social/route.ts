import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, platform, hashtags, scheduledAt } = body;
    
    const post = await db.socialPost.create({
      data: {
        content,
        platform,
        hashtags,
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        status: scheduledAt ? 'scheduled' : 'draft'
      }
    });
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating social post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await db.socialPost.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
