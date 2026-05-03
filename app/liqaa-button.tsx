'use client';
import { useEffect, useState } from 'react';
import { LIQAA, type LIQAAClient } from '@liqaa/js';

export default function LiqaaButton({ sdkToken, publicKey }: { sdkToken: string; publicKey: string }) {
  const [client, setClient] = useState<LIQAAClient | null>(null);

  useEffect(() => {
    LIQAA.init({ publicKey, sdkToken, accent: '#1d4ed8' })
      .then(setClient)
      .catch((e) => console.error('LIQAA init failed:', e));
  }, [publicKey, sdkToken]);

  return (
    <button
      onClick={() => client?.startCall('support@yoursite.com', 'Support')}
      disabled={!client}
      style={{
        padding: '14px 24px', background: '#0a0d18', color: '#fff', border: 'none',
        borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: 'pointer',
      }}
    >
      🎥 {client ? 'Talk to Support' : 'Loading SDK…'}
    </button>
  );
}
