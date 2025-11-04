import { NextResponse } from 'next/server';

// Get backend URL from environment
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message, phone } = body;

    // Validation (keep your existing validation)

    // Send to backend API using environment variable
    const backendResponse = await fetch(`${BACKEND_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        subject,
        message,
        phone
      }),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to submit contact form' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: backendData.data
    });

  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}