/**
 * 认证相关 API
 */
import { mockUser } from '../mock/index';
import type { User } from '../types/index';

export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResult {
  token: string;
  user: User;
}

const authApi = {
  /** 登录 */
  login: async (params: LoginParams): Promise<LoginResult> => {
    // TODO: 接入真实接口 http.post<LoginResult>('/auth/login', params)
    await new Promise((r) => setTimeout(r, 800));
    if (params.username === '' || params.password === '') {
      throw new Error('用户名或密码不能为空');
    }
    return {
      token: 'mock-token-' + Date.now(),
      user: mockUser,
    };
  },

  /** 游客登录 */
  guestLogin: async (): Promise<LoginResult> => {
    await new Promise((r) => setTimeout(r, 500));
    return {
      token: 'guest-token-' + Date.now(),
      user: { ...mockUser, username: '无名散修', isGuest: true },
    };
  },

  /** 注册 */
  register: async (): Promise<void> => {
    // TODO: 接入真实注册接口
    await new Promise((r) => setTimeout(r, 1000));
  },

  /** 登出 */
  logout: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200));
    localStorage.removeItem('auth_token');
  },

  /** 刷新 token */
  refreshToken: async (token: string): Promise<string> => {
    // TODO: http.post<{ token: string }>('/auth/refresh', { token })
    await new Promise((r) => setTimeout(r, 200));
    return 'refreshed-' + token;
  },
};

export default authApi;
