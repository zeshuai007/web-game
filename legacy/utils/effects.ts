import { useSettingsStore } from '../store/settingsStore';

export type EffectsLevel = 'high' | 'low' | 'off';

export function getEffectsLevel(): EffectsLevel {
  return useSettingsStore.getState().settings.effectsLevel;
}

export function isEffectsEnabled(level: EffectsLevel = getEffectsLevel()): boolean {
  return level !== 'off';
}

export function isEffectsHigh(level: EffectsLevel = getEffectsLevel()): boolean {
  return level === 'high';
}

