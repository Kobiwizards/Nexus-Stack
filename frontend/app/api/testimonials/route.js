import { NextResponse } from 'next/server';
import { testimonials } from '@/data/testimonialsData';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const approved = searchParams.get('approved') !== 'false'; // default to true

    let filteredTestimonials = testimonials;

    if (approved) {
      filteredTestimonials = filteredTestimonials.filter(t => t.approved);
    }

    if (featured === 'true') {
      filteredTestimonials = filteredTestimonials.filter(t => t.featured);
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonials retrieved successfully',
      data: {
        testimonials: filteredTestimonials
      }
    });

  } catch (error) {
    console.error('Testimonials API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to fetch testimonials' 
      },
      { status: 500 }
    );
  }
}