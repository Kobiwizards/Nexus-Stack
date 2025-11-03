import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch project categories from backend API
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects/categories`,
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
          message: backendData.message || 'Failed to fetch project categories' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(backendData);

  } catch (error) {
    console.error('Project categories API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}