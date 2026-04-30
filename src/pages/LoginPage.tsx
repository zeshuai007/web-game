import React, { useState, useMemo } from 'react';
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

  // Stabilized star positions to prevent re-render jitter
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 53 + 7) % 65}%`,
        color: i % 3 === 0 ? '#d4a843' : '#ffffff',
        opacity: ((i * 7 + 3) % 6) * 0.08 + 0.15,
        duration: 2 + ((i * 11) % 3),
        delay: (i * 0.29) % 3,
      })),
    [],
  );

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
        {/* 底部仙山光晕 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(126,203,161,0.3) 0%, transparent 70%)',
          }}
        />

        {/* 漂移云雾层 1 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 160,
            top: '18%',
            left: '5%',
            background: 'radial-gradient(ellipse, rgba(126,203,161,0.18) 0%, transparent 70%)',
            filter: 'blur(24px)',
            animation: 'driftLeft 60s ease-in-out infinite',
          }}
        />
        {/* 漂移云雾层 2 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 420,
            height: 120,
            top: '30%',
            right: '8%',
            background: 'radial-gradient(ellipse, rgba(212,168,67,0.14) 0%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'driftRight 70s ease-in-out infinite',
          }}
        />
        {/* 漂移云雾层 3 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 340,
            height: 100,
            top: '50%',
            left: '20%',
            background: 'radial-gradient(ellipse, rgba(126,203,161,0.1) 0%, transparent 70%)',
            filter: 'blur(30px)',
            animation: 'driftLeft 80s ease-in-out 10s infinite',
          }}
        />

        {/* SVG 山脉剪影 */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ opacity: 0.13 }}
        >
          {/* 远山 */}
          <polygon
            points="0,320 180,140 320,220 480,100 640,180 800,80 960,160 1120,60 1280,140 1440,90 1440,320"
            fill="#7ecba1"
          />
          {/* 近山 */}
          <polygon
            points="0,320 100,220 240,280 380,180 520,250 660,160 800,230 940,140 1080,210 1220,130 1360,200 1440,160 1440,320"
            fill="#4a7c5e"
          />
        </svg>

        {/* 稳定星空 */}
        {stars.map((s) => (
          <div
            key={s.id}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              left: s.left,
              top: s.top,
              background: s.color,
              opacity: s.opacity,
              animation: `float ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
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
            {/* 法阵装饰 – 旋转 */}
            <div className="relative w-24 h-24 mx-auto mt-4 flex items-center justify-center">
              {/* 外圈旋转 */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid var(--color-gold)',
                  opacity: 0.25,
                  animation: 'rotateSlow 24s linear infinite',
                }}
              />
              {/* 内圈反向旋转 */}
              <div
                className="absolute w-16 h-16 rounded-full"
                style={{
                  border: '1px dashed var(--color-gold)',
                  opacity: 0.2,
                  animation: 'rotateSlow 16s linear infinite reverse',
                }}
              />
              {/* 中心光晕 */}
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)',
                  boxShadow: '0 0 20px rgba(212,168,67,0.15)',
                }}
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
