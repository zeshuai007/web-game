import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useSettingsStore } from '../../store/settingsStore';

type Props = {
  className?: string;
};

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BackgroundLayer: React.FC<Props> = ({ className = '' }) => {
  const effectsLevel = useSettingsStore((s) => s.settings.effectsLevel);

  const stars = useMemo(() => {
    if (effectsLevel === 'off') return [];
    const rand = mulberry32(20260429);
    const count = effectsLevel === 'high' ? 26 : 12;

    return Array.from({ length: count }).map((_, i) => {
      const left = rand() * 100;
      const top = rand() * 55;
      const warm = rand() > 0.75;
      const opacity = rand() * (effectsLevel === 'high' ? 0.65 : 0.4) + 0.15;
      const size = rand() > 0.85 ? 2 : 1;
      const duration = 2.5 + rand() * (effectsLevel === 'high' ? 3.5 : 2);
      const delay = rand() * 2.5;
      return {
        key: i,
        left,
        top,
        warm,
        opacity,
        size,
        duration,
        delay,
      };
    });
  }, [effectsLevel]);

  const enableMotion = effectsLevel !== 'off';

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* 底色渐变 + 暗角 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 28% 18%, rgba(18,26,48,0.92) 0%, rgba(13,17,23,1) 58%), radial-gradient(ellipse at 70% 80%, rgba(212,168,67,0.08) 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 160px rgba(0,0,0,0.75)',
        }}
      />

      {/* 远山/灵气光晕 */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(126,203,161,0.32) 0%, transparent 72%)',
        }}
      />

      {/* 云雾层（少量动效） */}
      {enableMotion ? (
        <motion.div
          className="absolute top-1/4 left-1/4 w-72 h-36 rounded-full"
          style={{
            opacity: effectsLevel === 'high' ? 0.12 : 0.08,
            background: 'radial-gradient(ellipse, rgba(126,203,161,0.9) 0%, transparent 72%)',
            filter: `blur(${effectsLevel === 'high' ? 22 : 18}px)`,
          }}
          animate={{ x: [0, 14, 0], y: [0, -8, 0] }}
          transition={{ duration: effectsLevel === 'high' ? 8 : 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <div
          className="absolute top-1/4 left-1/4 w-72 h-36 rounded-full"
          style={{
            opacity: 0.08,
            background: 'radial-gradient(ellipse, rgba(126,203,161,0.9) 0%, transparent 72%)',
            filter: 'blur(18px)',
          }}
        />
      )}

      {/* 星点 */}
      {stars.map((s) => (
        <motion.div
          key={s.key}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            background: s.warm ? 'rgba(212,168,67,0.95)' : 'rgba(255,255,255,0.95)',
            opacity: s.opacity,
          }}
          animate={
            enableMotion
              ? { y: [0, -4, 0], opacity: [s.opacity, Math.min(1, s.opacity + 0.25), s.opacity] }
              : undefined
          }
          transition={
            enableMotion
              ? { duration: s.duration, repeat: Infinity, ease: 'easeInOut', delay: s.delay }
              : undefined
          }
        />
      ))}
    </div>
  );
};

export default BackgroundLayer;

