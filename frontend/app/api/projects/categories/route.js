import { NextResponse } from 'next/server';
import { projects } from '@/data/projectsData';

export async function GET() {
  try {
    const categories = ['All', ...new Set(projects.map(project => project.category))];

    return NextResponse.json({
      success: true,
      message: 'Project categories retrieved successfully',
      data: {
        categories
      }
    });

  } catch (error) {
    console.error('Project categories API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch project categories' 
      },
      { status: 500 }
    );
  }
}