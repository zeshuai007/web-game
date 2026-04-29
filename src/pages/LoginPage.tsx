import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const guestLogin = useAuthStore((s) => s.guestLogin);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(username, password);
    const isLoggedIn = useAuthStore.getState().isLoggedIn;
    if (isLoggedIn) navigate('/lobby');
  };

  const handleGuest = async () => {
    clearError();
    await guestLogin();
    navigate('/lobby');
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 仙山轮廓 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(126,203,161,0.3) 0%, transparent 70%)',
          }}
        />
        {/* 云雾效果 */}
        <div
          className="absolute top-1/4 left-1/4 w-64 h-32 opacity-10 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #7ecba1 0%, transparent 70%)', filter: 'blur(20px)' }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-48 h-24 opacity-8 rounded-full"
          style={{ background: 'radial-gradient(ellipse, #d4a843 0%, transparent 70%)', filter: 'blur(20px)' }}
        />
        {/* 星空 */}
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              background: Math.random() > 0.7 ? '#d4a843' : '#fff',
              opacity: Math.random() * 0.6 + 0.2,
              animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* 登录卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md px-4"
      >
        <div
          className="game-card p-8"
          style={{
            background: 'linear-gradient(145deg, rgba(22,27,34,0.95) 0%, rgba(13,17,23,0.98) 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--color-border-gold)',
          }}
        >
          {/* 顶部装饰 */}
          <div className="divider-gold mb-6" />

          {/* 标题 */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-3 animate-float">⚔️</div>
            <h1 className="text-2xl font-bold tracking-widest text-glow-gold mb-1">
              天道仙途
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              踏入修仙之路，问鼎长生之道
            </p>
            {/* 法阵装饰 */}
            <div
              className="w-24 h-24 mx-auto mt-4 rounded-full flex items-center justify-center opacity-20"
              style={{
                border: '1px solid var(--color-gold)',
                boxShadow: '0 0 20px rgba(212,168,67,0.2)',
                background: 'radial-gradient(circle, rgba(212,168,67,0.05) 0%, transparent 70%)',
              }}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{ border: '1px dashed var(--color-gold)' }}
              />
            </div>
          </div>

          {/* 登录表单 */}
          <form onSubmit={handleLogin} className="space-y-4">
            {/* 用户名 */}
            <div>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <User size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--color-text-primary)' }}
                  placeholder="道号（用户名）"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
            </div>

            {/* 密码 */}
            <div>
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <Lock size={16} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  className="flex-1 bg-transparent outline-none text-sm"
                  style={{ color: 'var(--color-text-primary)' }}
                  placeholder="仙缘密语（密码）"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="shrink-0"
                >
                  {showPwd
                    ? <EyeOff size={14} style={{ color: 'var(--color-text-muted)' }} />
                    : <Eye size={14} style={{ color: 'var(--color-text-muted)' }} />
                  }
                </button>
              </div>
            </div>

            {/* 错误提示 */}
            {error && (
              <div
                className="px-4 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(192,57,43,0.15)', color: '#f87171', border: '1px solid rgba(192,57,43,0.3)' }}
              >
                {error}
              </div>
            )}

            {/* 登录按钮 */}
            <Button
              type="submit"
              variant="gold"
              className="w-full"
              loading={loading}
            >
              踏入仙途
            </Button>
          </form>

          <div className="divider-gold my-4" />

          {/* 游客入口 */}
          <Button
            variant="outline"
            className="w-full"
            onClick={handleGuest}
            loading={loading}
          >
            以散修身份游历
          </Button>

          {/* 注册入口 */}
          <div className="mt-4 text-center">
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              尚未拜入宗门？{' '}
              <button className="hover:opacity-80" style={{ color: 'var(--color-jade)' }}>
                前往注册
              </button>
            </span>
          </div>

          <div className="divider-gold mt-6" />
          <p className="text-center text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
            道法自然 · 仙途无尽
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
