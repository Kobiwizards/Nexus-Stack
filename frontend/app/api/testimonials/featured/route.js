import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch featured testimonials from backend API
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/testimonials/featured`,
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
          message: backendData.message || 'Failed to fetch featured testimonials' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData);

  } catch (error) {
    console.error('Featured testimonials API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}