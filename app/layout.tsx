export const metadata = { title: 'Next.js + LIQAA', description: 'Drop-in video calls' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{ margin: 0, background: '#fafbfc' }}>{children}</body></html>);
}
