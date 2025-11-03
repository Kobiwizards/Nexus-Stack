import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { clientInfo, serviceType, package: servicePackage, projectDetails, payment } = body;

    // Validation
    if (!clientInfo || !clientInfo.name || !clientInfo.email || !serviceType || !servicePackage) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Client information, service type, and package are required' 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientInfo.email)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Send to backend API
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/services/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientInfo,
        serviceType,
        package: servicePackage,
        projectDetails,
        payment
      }),
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