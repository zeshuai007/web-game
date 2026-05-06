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
      <PageAtmosphere 
        src="/images/pages/login.png" 
        className="-z-10" 
        opacity={0.38}
        parallax={false}
        mixBlendMode="soft-light"
        glowColor="rgba(212, 168, 67, 0.15)"
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(126,203,161,0.25) 0%, rgba(212,168,67,0.1) 40%, transparent 70%)',
          }}
        />

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

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={{ opacity: 0.13 }}
        >
          <polygon
            points="0,320 180,140 320,220 480,100 640,180 800,80 960,160 1120,60 1280,140 1440,90 1440,320"
            fill="#7ecba1"
          />
          <polygon
            points="0,320 100,220 240,280 380,180 520,250 660,160 800,230 940,140 1080,210 1220,130 1360,200 1440,160 1440,320"
            fill="#4a7c5e"
          />
        </svg>

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

        {/* Character Art - Enhanced Effects */}
        <motion.img
          src="/images/character-art.png"
          alt="character"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[560px] max-w-[90vw]"
          style={{ 
            opacity: 0.7,
            filter: 'drop-shadow(0 25px 80px rgba(0,0,0,0.6)) drop-shadow(0 0 40px rgba(212,168,67,0.15))',
          }}
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={enableMotion ? { opacity: 0.7, y: enableHighMotion ? [0, -8, 0] : 0, scale: 1 } : { opacity: 0.7, y: 0, scale: 1 }}
          transition={enableMotion ? { duration: enableHighMotion ? 8 : 0.5, repeat: enableHighMotion ? Infinity : 0, ease: 'easeInOut' } : { duration: 0.5 }}
        />
        
        {/* Character glow effect */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(212,168,67,0.15) 0%, rgba(126,203,161,0.1) 40%, transparent 70%)',
            filter: 'blur(30px)',
          }}
          animate={enableMotion && enableHighMotion ? { opacity: [0.8, 1, 0.8] } : { opacity: 1 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Talisman Strip - Enhanced Effects */}
        <motion.img
          src="/images/talisman-strip.png"
          alt="talisman"
          className="absolute -top-20 left-1/2 -translate-x-1/2 w-[1000px] max-w-[150vw]"
          style={{ 
            opacity: 0.85,
            mixBlendMode: 'screen',
            filter: 'drop-shadow(0 0 30px rgba(212,168,67,0.4))',
          }}
          initial={{ opacity: 0, y: -15, scale: 1.05 }}
          animate={enableMotion ? { opacity: 0.85, y: enableHighMotion ? [0, 8, 0] : 0, scale: enableHighMotion ? [1, 1.02, 1] : 1 } : { opacity: 0.85, y: 0, scale: 1 }}
          transition={enableMotion ? { duration: enableHighMotion ? 12 : 0.5, repeat: enableHighMotion ? Infinity : 0, ease: 'easeInOut' } : { duration: 0.5 }}
        />
      </div>

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
            boxShadow: '0 0 40px rgba(212,168,67,0.1)',
          }}
        >
          <div className="divider-gold mb-6" />

          <div className="text-center mb-8">
            {/* Sect Crest - Enhanced Effects */}
            <motion.div
              className="relative w-20 h-20 mx-auto mb-3"
              animate={enableMotion && enableHighMotion ? { rotate: [0, 3, 0, -3, 0] } : undefined}
              transition={enableMotion && enableHighMotion ? { duration: 8, repeat: Infinity, ease: 'easeInOut' } : undefined}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,168,67,0.2) 0%, transparent 70%)',
                  animation: 'pulse-gold 2s ease-in-out infinite',
                }}
              />
              <div
                className="absolute inset-2 rounded-full overflow-hidden border-2 border-[var(--color-border-gold)]"
                style={{
                  boxShadow: '0 0 20px rgba(212,168,67,0.3)',
                }}
              >
                <img
                  src="/images/sect-crest.png"
                  alt="crest"
                  className="w-full h-full"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(212,168,67,0.4)) saturate(1.2)' }}
                  draggable={false}
                />
              </div>
            </motion.div>
            
            <h1 className="text-2xl font-bold tracking-widest text-glow-gold mb-1">
              天道仙途
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              踏入修仙之路，问鼎长生之道
            </p>
            
            <div className="relative w-24 h-24 mx-auto mt-4 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '1px solid var(--color-gold)',
                  opacity: 0.3,
                  animation: 'rotateSlow 24s linear infinite',
                  boxShadow: '0 0 10px rgba(212,168,67,0.2)',
                }}
              />
              <div
                className="absolute w-16 h-16 rounded-full"
                style={{
                  border: '1px dashed var(--color-gold)',
                  opacity: 0.25,
                  animation: 'rotateSlow 16s linear infinite reverse',
                }}
              />
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)',
                  boxShadow: '0 0 25px rgba(212,168,67,0.2)',
                }}
              />
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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

            {error && (
              <div
                className="px-4 py-2 rounded-lg text-sm"
                style={{ background: 'rgba(192,57,43,0.15)', color: '#f87171', border: '1px solid rgba(192,57,43,0.3)' }}
              >
                {error}
              </div>
            )}

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

          <Button
            variant="outline"
            className="w-full"
            onClick={handleGuest}
            loading={loading}
          >
            以散修身份游历
          </Button>

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
