import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const approved = searchParams.get('approved') || 'true';

    // Build query parameters
    const params = new URLSearchParams({
      approved,
      ...(featured && { featured })
    });

    // Fetch testimonials from backend API
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials?${params}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to fetch testimonials' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData);

  } catch (error) {
    console.error('Testimonials API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientName, position, company, rating, testimonialText, project, socialLinks } = body;

    // Validation
    if (!clientName || !position || !company || !rating || !testimonialText || !project) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All required fields must be filled' 
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Rating must be between 1 and 5' 
        },
        { status: 400 }
      );
    }

    // Send to backend API
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientName,
        position,
        company,
        rating,
        testimonialText,
        project,
        socialLinks
      }),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to submit testimonial' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Testimonial submitted successfully and awaiting approval',
      data: backendData.data
    });

  } catch (error) {
    console.error('Testimonial submission API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}