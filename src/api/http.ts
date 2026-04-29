/**
 * HTTP 请求基础封装（基于 fetch，可替换为 axios）
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

export class ApiError extends Error {
  code: number;
  data?: unknown;

  constructor(code: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
  timeout?: number;
}

/**
 * 构建 URL（带查询参数）
 */
function buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  if (!params) return url;
  const query = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  return query ? `${url}?${query}` : url;
}

/**
 * 统一请求方法
 */
async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { params, timeout = 10000, headers, ...rest } = options;
  const url = buildUrl(path, params);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
        ...headers,
      },
    });

    clearTimeout(timer);

    if (!res.ok) {
      throw new ApiError(res.status, `HTTP ${res.status}: ${res.statusText}`);
    }

    const json: ApiResponse<T> = await res.json();

    if (json.code !== 0 && json.code !== 200) {
      throw new ApiError(json.code, json.message, json.data);
    }

    return json.data;
  } catch (err) {
    clearTimeout(timer);
    if (err instanceof ApiError) throw err;
    if ((err as Error).name === 'AbortError') {
      throw new ApiError(408, '请求超时，请稍后重试');
    }
    throw new ApiError(0, (err as Error).message);
  }
}

/**
 * 获取认证 header
 */
function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('auth_token');
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

/**
 * 封装 GET/POST/PUT/DELETE
 */
export const http = {
  get: <T>(path: string, params?: Record<string, string | number | boolean>) =>
    request<T>(path, { method: 'GET', params }),
  post: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body?: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: <T>(path: string) =>
    request<T>(path, { method: 'DELETE' }),
};

export default http;
