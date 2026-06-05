import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#151716"/><path d="M17 18h30v9H27v10h17v9H17V18Z" fill="#c6e36d"/></svg>`,
    { headers: { 'content-type': 'image/svg+xml' } },
  );
