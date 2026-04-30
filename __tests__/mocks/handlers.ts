import { http, HttpResponse } from 'msw';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function getStringField(body: unknown, key: string): string | undefined {
  if (!isObject(body)) return undefined;
  const value = body[key];
  return typeof value === 'string' ? value : undefined;
}

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/signin', async ({ request }) => {
    const body = await request.json();
    const email = getStringField(body, 'email');
    const password = getStringField(body, 'password');

    if (email === 'test@example.com' && password === 'password123') {
      return HttpResponse.json({ user: { email: 'test@example.com', name: 'Test User' } });
    }
    return HttpResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }),

  http.post('/api/auth/signup', async ({ request }) => {
    const body = await request.json();
    const email = getStringField(body, 'email');
    const password = getStringField(body, 'password');
    const name = getStringField(body, 'name');

    if (email && password) {
      return HttpResponse.json({ user: { email, name } });
    }
    return HttpResponse.json({ error: 'Invalid data' }, { status: 400 });
  }),

  http.get('/api/auth/session', () => {
    return HttpResponse.json({ user: null });
  }),

  // Data endpoints
  http.get('/api/data', () => {
    return HttpResponse.json([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
    ]);
  }),
];
