import { NextResponse } from 'next/server';

// Mock data for scheduled posts
const scheduledPosts = [
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

export async function GET() {
  return NextResponse.json(scheduledPosts);
}
