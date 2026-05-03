import { exchangeIdentityForSdkToken } from '@/lib/liqaa.server';
import LiqaaButton from './liqaa-button';

export default async function Home() {
  // Replace with your authenticated user. For demo we use a placeholder.
  const user = { email: 'visitor@example.com', name: 'Anonymous Visitor' };
  const sdkToken = await exchangeIdentityForSdkToken(user);

  return (
    <main style={{ maxWidth: 720, margin: '80px auto', padding: '0 24px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-.02em' }}>
        Hello from Next.js + LIQAA
      </h1>
      <p style={{ color: '#475569', lineHeight: 1.7, fontSize: 16 }}>
        Click the button below — or the floating bubble in the corner — to start a video call with our support agent.
        The SDK was loaded with a 1-hour scoped JWT issued from the server (your <code>sk_live_</code> never reaches the browser).
      </p>
      <LiqaaButton sdkToken={sdkToken} publicKey={process.env.LIQAA_PK!} />
      <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 32 }}>
        Edit <code>app/page.tsx</code> and <code>app/liqaa-button.tsx</code> to customize.
      </p>
    </main>
  );
}
