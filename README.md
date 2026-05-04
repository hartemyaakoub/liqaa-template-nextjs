<div align="center">

# Next.js + LIQAA Template

**Production-ready Next.js 16 starter with LIQAA video calls wired in.**

[![deploy](https://img.shields.io/badge/Deploy_to-Vercel-000?style=flat-square&logo=vercel)](https://vercel.com/new/clone?repository-url=https://github.com/hartemyaakoub/liqaa-template-nextjs)
[![next.js](https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![liqaa](https://img.shields.io/badge/LIQAA-Cloud-1d4ed8?style=flat-square)](https://liqaa.io)
[![license](https://img.shields.io/badge/license-MIT-475569?style=flat-square)](./LICENSE)

```bash
npx degit hartemyaakoub/liqaa-template-nextjs my-app
cd my-app && npm install
echo "LIQAA_PK=pk_live_…" >> .env.local
echo "LIQAA_SK=sk_live_…" >> .env.local
npm run dev
```

**That's it.** A working video-call button is now on `localhost:3000`.

</div>

---

## What's included

- Next.js 16 (App Router, RSC)
- TypeScript strict mode
- Server Component that exchanges identity → SDK token (HMAC-signed)
- Client Component that loads `@liqaa/js` and shows a call button
- Webhook handler at `/api/webhooks/liqaa` with HMAC verification + replay protection
- Tailwind CSS v4 (skip if you don't want it)
- ESLint + Prettier + tsconfig strict
- Ready-to-deploy on Vercel (one-click)

## Project layout

```
.
 app/
 page.tsx # Server Component — fetches sdk_token
 layout.tsx
 liqaa-button.tsx # Client Component — calls LIQAA.startCall()
 api/
 webhooks/
 liqaa/
 route.ts # Webhook receiver with HMAC verification
 lib/
 liqaa.server.ts # exchangeIdentityForSdkToken() — server-only
 .env.example # required env vars
 package.json
 README.md
```

## Environment variables

Required for the integration to work:

```bash
LIQAA_PK=pk_live_… # public key (browser-safe)
LIQAA_SK=sk_live_… # secret key — SERVER ONLY
LIQAA_WEBHOOK_SECRET=whsec_… # signing secret (returned once when you create a webhook)
```

For local dev:
- Copy `.env.example` → `.env.local`
- Get your keys from [liqaa.io/console](https://liqaa.io/console)
- Get your webhook signing secret with `npx @liqaa/cli webhooks create http://localhost:3000/api/webhooks/liqaa call.started call.ended`

## Deploy

### One-click on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hartemyaakoub/liqaa-template-nextjs&env=LIQAA_PK,LIQAA_SK,LIQAA_WEBHOOK_SECRET)

Vercel will prompt for the three env vars, build, and deploy. Done.

### Manual

```bash
npm run build
npm run start
```

## What this template does NOT do

- Authentication (bring your own — NextAuth, Clerk, Lucia, etc.)
- Database (the example uses a hard-coded user)
- UI design beyond minimum (style it however you want)

The template is a **clean foundation**, not a finished product. Drop your auth + UI on top.

## Common customizations

```ts
// Force a specific room name (useful for "support" or "sales-demo" buttons)
liqaa.startCall('agent@you.com', 'Agent', { room: 'support-line' });

// Change accent color to match your brand
LIQAA.init({ publicKey, sdkToken, accent: '#FF6B6B' });

// Show on the left side (RTL languages)
LIQAA.init({ publicKey, sdkToken, position: 'left' });
```

See [liqaa.io/docs](https://liqaa.io/docs) for the full SDK reference.

## License

[MIT](./LICENSE) — fork it, ship it, sell it.
