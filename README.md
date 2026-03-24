# Minimalist Shopify Storefront

Production-grade headless Shopify storefront built with Next.js 14 App Router, React Server Components, TailwindCSS, and Shopify Storefront GraphQL API.

## Project Structure

- `apps/storefront` - Next.js storefront app
- `packages/shared` - shared Shopify/data/format utilities
- `packages/ui` - reusable UI primitives

## Environment

Create `apps/storefront/.env.local` (already scaffolded) with your real values:

```bash
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_storefront_token
```

## Run Locally

```bash
npm install
npm run dev
```

The storefront runs at `http://localhost:3000`.

## Deploy To Vercel

1. Import this repository in Vercel.
2. Set the root directory to `.`.
3. Add environment variables:
   - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
   - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN`
4. Deploy with default build settings:
   - Build command: `npm run build`
   - Output handled by Next.js
