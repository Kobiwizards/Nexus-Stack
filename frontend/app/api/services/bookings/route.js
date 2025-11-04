import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validation (keep your existing validation)

    // Send to backend API
    const backendResponse = await fetch(`${BACKEND_URL}/services/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to create service booking' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service booking created successfully',
      data: backendData.data
    });

  } catch (error) {
    console.error('Service booking API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}