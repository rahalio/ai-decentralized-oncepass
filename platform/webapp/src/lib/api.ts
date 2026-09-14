const API_KEY_STORAGE = 'oncepass_api_key';
const ROLE_STORAGE = 'oncepass_role';

export type OperatorRole =
  | 'customer'
  | 'home_kyc'
  | 'relying'
  | 'mlro'
  | 'dpo'
  | 'operator';

export function getApiKey() {
  return localStorage.getItem(API_KEY_STORAGE) ?? 'oncepass_demo_local_dev_key';
}

export function setApiKey(key: string) {
  localStorage.setItem(API_KEY_STORAGE, key);
}

export function getRole(): OperatorRole {
  return (localStorage.getItem(ROLE_STORAGE) as OperatorRole) || 'customer';
}

export function setRole(role: OperatorRole) {
  localStorage.setItem(ROLE_STORAGE, role);
}

export function clearSession() {
  localStorage.removeItem(API_KEY_STORAGE);
  localStorage.removeItem(ROLE_STORAGE);
}

export async function api<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('X-API-Key', getApiKey());
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (['POST', 'PUT', 'PATCH'].includes((init.method ?? 'GET').toUpperCase())) {
    headers.set('Idempotency-Key', crypto.randomUUID());
  }
  const res = await fetch(path, { ...init, headers });
  if (res.status === 204) return undefined as T;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.detail || body.message || body.title || `HTTP ${res.status}`);
  }
  return body as T;
}

export type ListEnvelope<T> = { data: { items: T[]; nextCursor?: string }; meta?: unknown };
export type DataEnvelope<T> = { data: T; meta?: unknown };
