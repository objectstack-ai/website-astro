import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f7f4ec"/><path d="M0 455h1200v175H0z" fill="#151716"/><text x="88" y="185" font-family="Inter,Arial,sans-serif" font-size="86" font-weight="800" fill="#151716">ObjectStack</text><text x="92" y="274" font-family="Inter,Arial,sans-serif" font-size="36" fill="#626761">AI-native app development platform</text><text x="92" y="535" font-family="Inter,Arial,sans-serif" font-size="34" fill="#fffdf7">Build with AI. Run on ObjectOS. Govern every tool.</text></svg>`,
    { headers: { 'content-type': 'image/svg+xml' } },
  );
