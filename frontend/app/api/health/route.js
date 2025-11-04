import { NextResponse } from 'next/server';

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      message: 'Frontend API is healthy',
      data: {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'production'
      }
    });

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Health check failed' 
      },
      { status: 500 }
    );
  }
}