import { NextResponse } from 'next/server';
import { projects } from '@/data/projectsData';

export async function GET() {
  try {
    const featuredProjects = projects.filter(project => project.featured);

    return NextResponse.json({
      success: true,
      message: 'Featured projects retrieved successfully',
      data: {
        projects: featuredProjects
      }
    });

  } catch (error) {
    console.error('Featured projects API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch featured projects' 
      },
      { status: 500 }
    );
  }
}