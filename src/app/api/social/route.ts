import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// Mock data for social posts
const mockPosts = [
  {
    id: 'post-1',
    content: 'Did you know? Only 1.78% of Filipinos have insurance. Protect your family today with Pacific Cross. #InsurancePH #PacificCross #FamilyProtection',
    platform: 'facebook',
    status: 'posted',
    hashtags: ['InsurancePH', 'PacificCross', 'FamilyProtection'],
    scheduledAt: null,
    postedAt: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'post-2',
    content: 'Your HMO caps at ₱150,000 but hospital bills can reach millions. FlexiShield fills the gap. Message me to learn more! 💪',
    platform: 'instagram',
    status: 'scheduled',
    hashtags: ['FlexiShield', 'HMO', 'HealthInsurance'],
    scheduledAt: new Date(Date.now() + 86400000).toISOString(),
    postedAt: null,
    createdAt: new Date().toISOString()
  }
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { content, platform, hashtags, scheduledAt } = body;
    
    const post = {
      id: `post-${Date.now()}`,
      content,
      platform,
      hashtags: hashtags || [],
      scheduledAt: scheduledAt || null,
      postedAt: null,
      status: scheduledAt ? 'scheduled' : 'draft',
      createdAt: new Date().toISOString()
    };
    
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating social post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json(mockPosts);
}
