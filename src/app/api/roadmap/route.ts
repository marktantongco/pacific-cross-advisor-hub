import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const roadmap = await db.roadmapItem.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(roadmap);
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return NextResponse.json({ error: 'Failed to fetch roadmap' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, isCompleted } = body;
    
    const updated = await db.roadmapItem.update({
      where: { id },
      data: { isCompleted }
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating roadmap:', error);
    return NextResponse.json({ error: 'Failed to update roadmap' }, { status: 500 });
  }
}
