import { NextResponse } from 'next/server';
import { testimonials } from '@/data/testimonialsData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // During build or if no API URL is set, use local data
    if (!process.env.NEXT_PUBLIC_API_URL || process.env.NODE_ENV === 'development') {
      const featuredTestimonials = testimonials.filter(t => t.featured && t.approved);
      
      return NextResponse.json({
        success: true,
        data: {
          testimonials: featuredTestimonials
        }
      });
    }

    // Fetch from external API in production
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials/featured`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // If the external API fails, fall back to local data
    if (!backendResponse.ok) {
      throw new Error('External API failed');
    }

    const backendData = await backendResponse.json();
    return NextResponse.json(backendData);

  } catch (error) {
    console.error('Featured testimonials API error:', error);
    
    // Fallback to local data
    const featuredTestimonials = testimonials.filter(t => t.featured && t.approved);
    
    return NextResponse.json({
      success: true,
      data: {
        testimonials: featuredTestimonials
      }
    });
  }
}