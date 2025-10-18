import { NextResponse } from 'next/server';

export async function GET() {
  const hasSecret =
    !!process.env.STREAM_API_SECRET ||
    !!process.env.STREAM_SECRET ||
    !!process.env.STREAM_KEY ||
    !!process.env.STREAM_API_SECRET_KEY;

  return NextResponse.json({ hasSecret });
}