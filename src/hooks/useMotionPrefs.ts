import { useMemo } from 'react';
import { useSettingsStore } from '../store/settingsStore';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export type MotionPrefs = {
  reducedMotion: boolean;
  enableMotion: boolean;
  enableHighMotion: boolean;
};

export const useMotionPrefs = (): MotionPrefs => {
  const effectsLevel = useSettingsStore((s) => s.settings.effectsLevel);

  return useMemo(() => {
    const reducedMotion = prefersReducedMotion();
    const enableMotion = effectsLevel !== 'off' && !reducedMotion;
    const enableHighMotion = effectsLevel === 'high' && !reducedMotion;
    return { reducedMotion, enableMotion, enableHighMotion };
  }, [effectsLevel]);
};

