import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useSettingsStore } from '../store/settingsStore';
import Button from '../components/ui/Button';
import { useMotionPrefs } from '../hooks/useMotionPrefs';
import PageAtmosphere from '../components/ui/PageAtmosphere';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const guestLogin = useAuthStore((s) => s.guestLogin);
  const loading = useAuthStore((s) => s.loading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const effectsLevel = useSettingsStore((s) => s.settings.effectsLevel);
  const { enableMotion, enableHighMotion } = useMotionPrefs();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const stars = useMemo(() => {
    if (!enableMotion) return [];
    // stable star field: avoid Math.random() during render
    const count = enableHighMotion ? 18 : 8;
    const seed = 20260429;
    let t = seed;
    const rand = () => {
      t += 0x6D2B79F5;
      let r = Math.imul(t ^ (t >>> 15), t | 1);
      r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };

    return Array.from({ length: count }).map((_, i) => {
      const left = rand() * 100;
      const top = rand() * 55;
      const warm = rand() > 0.75;
      const opacity = rand() * (enableHighMotion ? 0.55 : 0.35) + 0.18;
      const size = rand() > 0.85 ? 2 : 1;
      const duration = 2.8 + rand() * (enableHighMotion ? 3.2 : 2);
      const delay = rand() * 2.5;
      return { i, left, top, warm, opacity, size, duration, delay };
    });
  }, [enableMotion, enableHighMotion]);

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
      <PageAtmosphere src="/images/pages/login.png" className="-z-10" opacity={0.32} />
      {/* 登录页本地装饰（少量动效，受动效强度控制） */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {stars.map((s) => (
          <motion.div
            key={s.i}
            className="absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background: s.warm ? 'rgba(212,168,67,0.95)' : 'rgba(255,255,255,0.95)',
              opacity: s.opacity,
            }}
            animate={enableMotion ? { y: [0, -4, 0], opacity: [s.opacity, Math.min(1, s.opacity + 0.25), s.opacity] } : undefined}
            transition={enableMotion ? { duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay } : undefined}
          />
        ))}

        {/* 角色立绘（真实资源位） */}
        <motion.img
          src="/images/character-art.png"
          alt="角色立绘"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[520px] max-w-[88vw] opacity-60"
          style={{ filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.55))' }}
          initial={{ opacity: 0, y: 18 }}
          animate={enableMotion ? { opacity: 0.6, y: enableHighMotion ? [0, -6, 0] : 0 } : { opacity: 0.6, y: 0 }}
          transition={enableMotion ? { duration: enableHighMotion ? 7 : 0.4, repeat: enableHighMotion ? Infinity : 0, ease: 'easeInOut' } : { duration: 0.4 }}
        />

        <motion.img
          src="/images/talisman-strip.png"
          alt="符箓光纹"
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-[900px] max-w-[140vw] opacity-75"
          style={{ mixBlendMode: 'screen' }}
          initial={{ opacity: 0, y: -10 }}
          animate={enableMotion ? { opacity: 0.75, y: enableHighMotion ? [0, 6, 0] : 0 } : { opacity: 0.75, y: 0 }}
          transition={enableMotion ? { duration: enableHighMotion ? 10 : 0.4, repeat: enableHighMotion ? Infinity : 0, ease: 'easeInOut' } : { duration: 0.4 }}
        />
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
            background: 'linear-gradient(145deg, rgba(22,27,34,0.92) 0%, rgba(13,17,23,0.96) 100%)',
            backdropFilter: effectsLevel === 'high' ? 'blur(18px)' : effectsLevel === 'low' ? 'blur(10px)' : undefined,
            border: '1px solid var(--color-border-gold)',
          }}
        >
          {/* 顶部装饰 */}
          <div className="divider-gold mb-6" />

          {/* 标题 */}
          <div className="text-center mb-8">
            {/* 宗门徽记（真实资源位） */}
            <motion.div
              className="w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden"
              animate={enableMotion && enableHighMotion ? { rotate: [0, 3, 0, -3, 0] } : undefined}
              transition={enableMotion && enableHighMotion ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined}
            >
              <img
                src="/images/sect-crest.png"
                alt="宗门徽记"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 18px rgba(212,168,67,0.25))' }}
                draggable={false}
              />
            </motion.div>
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
