import React, { useState } from 'react';
import { Volume2, Music, Monitor, Globe, ZoomIn, Eye, Users, Bell, LogOut, Trash2, Shield, Sparkles, Battery } from 'lucide-react';
import { useSettingsStore } from '../../store/settingsStore';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import Button from '../ui/Button';
import ConfirmDialog from '../ui/ConfirmDialog';
import type { SystemSettings } from '../../types/index';

const SettingsPanel: React.FC = () => {
  const settings = useSettingsStore((s) => s.settings);
  const updateSettings = useSettingsStore((s) => s.updateSettings);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const toast = useToast();
  const [showLogout, setShowLogout] = useState(false);
  const [showClear, setShowClear] = useState(false);

  const toggle = (key: keyof SystemSettings) => {
    updateSettings({ [key]: !settings[key as keyof typeof settings] });
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleClear = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success('缓存已清理');
    setShowClear(false);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      {/* 音效设置 */}
      <SettingSection title="🎵 音效设置">
        <ToggleSetting
          icon={<Volume2 size={16} />}
          label="音效"
          desc="游戏音效（点击、战斗等）"
          value={settings.soundEnabled}
          onToggle={() => toggle('soundEnabled')}
        />
        {settings.soundEnabled && (
          <SliderSetting
            label="音效音量"
            value={settings.soundVolume}
            onChange={(v) => updateSettings({ soundVolume: v })}
          />
        )}
        <ToggleSetting
          icon={<Music size={16} />}
          label="背景音乐"
          desc="游戏背景音乐"
          value={settings.musicEnabled}
          onToggle={() => toggle('musicEnabled')}
        />
        {settings.musicEnabled && (
          <SliderSetting
            label="音乐音量"
            value={settings.musicVolume}
            onChange={(v) => updateSettings({ musicVolume: v })}
          />
        )}
      </SettingSection>

      {/* 画面设置 */}
      <SettingSection title="🖥️ 画面设置">
        <SelectSetting
          icon={<Monitor size={16} />}
          label="画质"
          value={settings.graphicsQuality}
          options={[
            { value: 'low', label: '低' },
            { value: 'medium', label: '中' },
            { value: 'high', label: '高' },
            { value: 'ultra', label: '极高' },
          ]}
          onChange={(v) => updateSettings({ graphicsQuality: v as SystemSettings['graphicsQuality'] })}
        />
        <ToggleSetting
          icon={<Monitor size={16} />}
          label="性能模式"
          desc="降低画质以提升流畅度"
          value={settings.performanceMode}
          onToggle={() => toggle('performanceMode')}
        />
        <SliderSetting
          label="界面缩放"
          icon={<ZoomIn size={16} />}
          value={Math.round(settings.uiScale * 100)}
          min={80}
          max={120}
          step={5}
          onChange={(v) => updateSettings({ uiScale: v / 100 })}
          suffix="%"
        />

        <SelectSetting
          icon={<Sparkles size={16} />}
          label="动效强度"
          value={settings.effectsLevel}
          options={[
            { value: 'high', label: '高（推荐）' },
            { value: 'low', label: '省电' },
            { value: 'off', label: '关闭' },
          ]}
          onChange={(v) => updateSettings({ effectsLevel: v as SystemSettings['effectsLevel'] })}
        />

        <ToggleSetting
          icon={<Battery size={16} />}
          label="省电模式"
          desc="开启后将动效强度设置为“省电”"
          value={settings.effectsLevel !== 'high'}
          onToggle={() => updateSettings({ effectsLevel: settings.effectsLevel === 'high' ? 'low' : 'high' })}
        />
      </SettingSection>

      {/* 游戏设置 */}
      <SettingSection title="⚙️ 游戏设置">
        <SelectSetting
          icon={<Globe size={16} />}
          label="语言"
          value={settings.language}
          options={[
            { value: 'zh-CN', label: '简体中文' },
            { value: 'zh-TW', label: '繁體中文' },
            { value: 'en-US', label: 'English' },
          ]}
          onChange={(v) => updateSettings({ language: v as SystemSettings['language'] })}
        />
        <ToggleSetting
          icon={<Eye size={16} />}
          label="伤害数字"
          desc="战斗时显示伤害数字"
          value={settings.showDamageNumbers}
          onToggle={() => toggle('showDamageNumbers')}
        />
        <ToggleSetting
          icon={<Users size={16} />}
          label="显示其他玩家"
          desc="在地图上显示其他修士"
          value={settings.showOtherPlayers}
          onToggle={() => toggle('showOtherPlayers')}
        />
        <ToggleSetting
          icon={<Bell size={16} />}
          label="消息通知"
          desc="接收游戏消息通知"
          value={settings.notificationEnabled}
          onToggle={() => toggle('notificationEnabled')}
        />
      </SettingSection>

      {/* 账号设置 */}
      <SettingSection title="🔐 账号安全">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={<Shield size={14} />}>修改密码</Button>
          <Button variant="outline" size="sm" onClick={() => setShowClear(true)} icon={<Trash2 size={14} />}>清理缓存</Button>
          <Button variant="danger" size="sm" onClick={() => setShowLogout(true)} icon={<LogOut size={14} />}>退出登录</Button>
        </div>
      </SettingSection>

      {/* 确认弹窗 */}
      <ConfirmDialog
        open={showLogout}
        onConfirm={handleLogout}
        onCancel={() => setShowLogout(false)}
        title="退出登录"
        content="确认要离开仙途吗？记得保存进度哦，道友！"
        confirmText="含泪离开"
        danger
      />
      <ConfirmDialog
        open={showClear}
        onConfirm={handleClear}
        onCancel={() => setShowClear(false)}
        title="清理缓存"
        content="清理缓存将删除本地临时数据，不会影响账号存档。"
        confirmText="确认清理"
      />
    </div>
  );
};

/** 设置分区 */
const SettingSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="game-card p-4 space-y-4">
    <h3 className="text-sm font-semibold text-glow-gold">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

/** 开关设置项 */
const ToggleSetting: React.FC<{
  icon?: React.ReactNode;
  label: string;
  desc?: string;
  value: boolean;
  onToggle: () => void;
}> = ({ icon, label, desc, value, onToggle }) => (
  <div className="flex items-center gap-3">
    {icon && <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>}
    <div className="flex-1">
      <div className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{label}</div>
      {desc && <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{desc}</div>}
    </div>
    <button
      onClick={onToggle}
      className="relative w-11 h-6 rounded-full transition-colors duration-200"
      style={{ background: value ? 'var(--color-border-gold)' : 'var(--color-border)' }}
    >
      <span
        className="absolute top-1 w-4 h-4 rounded-full transition-all duration-200"
        style={{
          background: value ? 'var(--color-gold)' : '#6b7280',
          left: value ? '24px' : '4px',
        }}
      />
    </button>
  </div>
);

/** 滑块设置项 */
const SliderSetting: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  onChange: (v: number) => void;
}> = ({ icon, label, value, min = 0, max = 100, step = 1, suffix = '', onChange }) => (
  <div className="flex items-center gap-3">
    {icon && <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>}
    <div className="flex-1">
      <div className="flex justify-between mb-1">
        <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: 'var(--color-gold)' }}
      />
    </div>
  </div>
);

/** 下拉选择项 */
const SelectSetting: React.FC<{
  icon?: React.ReactNode;
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (v: string) => void;
}> = ({ icon, label, value, options, onChange }) => (
  <div className="flex items-center gap-3">
    {icon && <span style={{ color: 'var(--color-text-muted)' }}>{icon}</span>}
    <span className="flex-1 text-sm" style={{ color: 'var(--color-text-primary)' }}>{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-1.5 rounded text-sm"
      style={{
        background: 'rgba(0,0,0,0.4)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
        outline: 'none',
      }}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);

export { SettingSection, ToggleSetting, SliderSetting, SelectSetting };
export default SettingsPanel;
