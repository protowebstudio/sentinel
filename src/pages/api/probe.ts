import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () =>
  new Response(JSON.stringify({ ok: true, method: 'GET' }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });

export const POST: APIRoute = async ({ request }) =>
  new Response(JSON.stringify({ ok: true, method: request.method, body: await request.text() }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
