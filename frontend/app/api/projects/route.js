import { NextResponse } from 'next/server';
import { projects } from '@/data/projectsData';

export const dynamic = 'force-dynamic'; // Add this line

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const search = searchParams.get('search');

    // Filter projects based on query parameters
    let filteredProjects = projects;

    if (category && category !== 'All') {
      filteredProjects = filteredProjects.filter(project => project.category === category);
    }

    if (featured === 'true') {
      filteredProjects = filteredProjects.filter(project => project.featured);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProjects = filteredProjects.filter(project =>
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
      );
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects: paginatedProjects,
        pagination: {
          page,
          limit,
          total: filteredProjects.length,
          pages: Math.ceil(filteredProjects.length / limit)
        }
      }
    });

  } catch (error) {
    console.error('Projects API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch projects' 
      },
      { status: 500 }
    );
  }
}