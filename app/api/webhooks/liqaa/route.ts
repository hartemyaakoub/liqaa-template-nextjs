import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

const SECRET = process.env.LIQAA_WEBHOOK_SECRET || '';
const REPLAY_WINDOW_SECONDS = 300;

function verify(rawBody: string, header: string): boolean {
  if (!SECRET || !header) return false;
  const parts = Object.fromEntries(header.split(',').map((s) => s.trim().split('=')));
  const t = parseInt(parts.t || '', 10);
  const v1 = parts.v1;
  if (!t || !v1) return false;
  if (Math.abs(Math.floor(Date.now() / 1000) - t) > REPLAY_WINDOW_SECONDS) return false;
  const expected = crypto.createHmac('sha256', SECRET).update(`${t}.${rawBody}`).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(v1));
}

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const sig = req.headers.get('x-liqaa-signature') || '';
  if (!verify(raw, sig)) return NextResponse.json({ error: 'bad signature' }, { status: 401 });

  const event = JSON.parse(raw) as { event: string; data: unknown };
  switch (event.event) {
    case 'call.started':
      console.log('Call started:', event.data);
      break;
    case 'call.ended':
      console.log('Call ended:', event.data);
      break;
    default:
      console.log('Event:', event.event, event.data);
  }
  return new NextResponse(null, { status: 204 });
}
