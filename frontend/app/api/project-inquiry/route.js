import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, projectType, details } = body;

    // Validation
    if (!name || !email || !service || !budget || !projectType || !details) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'All required fields must be filled' 
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(projectType) || projectType.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'At least one project type must be selected' 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Send to backend API
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project-inquiry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        company,
        service,
        budget,
        projectType,
        details
      }),
    });

    const backendData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: backendData.message || 'Failed to submit project inquiry' 
        },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project inquiry submitted successfully',
      data: backendData.data
    });

  } catch (error) {
    console.error('Project inquiry API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error' 
      },
      { status: 500 }
    );
  }
}