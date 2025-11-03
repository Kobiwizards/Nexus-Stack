import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Check backend health
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/health`);
    const backendData = await backendResponse.json();

    const healthStatus = {
      frontend: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      },
      backend: backendData
    };

    return NextResponse.json(healthStatus);

  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      frontend: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      },
      backend: {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      }
    }, { status: 503 });
  }
}