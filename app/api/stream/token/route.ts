import { NextResponse } from 'next/server';
import stream from 'getstream';

export async function GET(req: Request) {
  const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
  const STREAM_API_SECRET = process.env.STREAM_API_SECRET || process.env.STREAM_SECRET;
  const STREAM_APP_ID = process.env.NEXT_PUBLIC_STREAM_APP_ID;

  if (!STREAM_API_SECRET) {
    return NextResponse.json(
      { error: 'Server missing Stream API secret. Set STREAM_API_SECRET in .env.local' },
      { status: 500 }
    );
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId') ?? 'anonymous';

    const serverClient = stream.connect(String(STREAM_API_KEY), String(STREAM_API_SECRET), String(STREAM_APP_ID));
    const token = serverClient.createToken(userId);

    return NextResponse.json({ token });
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message ?? err) }, { status: 500 });
  }
}