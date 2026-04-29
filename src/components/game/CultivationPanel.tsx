import React, { useState } from 'react';
import { Flame, Clock, Zap, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';
import { useToast } from '../ui/Toast';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import Modal from '../ui/Modal';
import { CULTIVATION_MODE_NAMES } from '../../constants/index';
import { formatCountdown, calcProgress } from '../../utils/index';
import type { CultivationMode } from '../../types/index';

interface CultivationOption {
  mode: CultivationMode;
  duration: number;       // 秒
  gainPerHour: number;
  successRate: number;
  staminaCost: number;
  description: string;
  icon: string;
  requiresSpecial?: boolean;
}

const CULTIVATION_OPTIONS: CultivationOption[] = [
  {
    mode: 'meditation',
    duration: 1800,
    gainPerHour: 200,
    successRate: 100,
    staminaCost: 10,
    description: '平息心神，吸纳周天灵气，稳步提升修为。',
    icon: '🧘',
  },
  {
    mode: 'seclusion',
    duration: 7200,
    gainPerHour: 400,
    successRate: 100,
    staminaCost: 30,
    description: '深闭洞府，心无旁骛，大幅提升修炼效率。',
    icon: '🏔️',
  },
  {
    mode: 'absorption',
    duration: 3600,
    gainPerHour: 300,
    successRate: 100,
    staminaCost: 20,
    description: '引动灵脉，快速吸收天地灵气入体。',
    icon: '🌀',
  },
  {
    mode: 'breakthrough',
    duration: 600,
    gainPerHour: 0,
    successRate: 65,
    staminaCost: 50,
    description: '凝聚心神，冲击下一境界。成功则境界提升，失败则受创。',
    icon: '⚡',
    requiresSpecial: true,
  },
  {
    mode: 'tribulation',
    duration: 300,
    gainPerHour: 0,
    successRate: 45,
    staminaCost: 80,
    description: '以肉身承天道雷劫，风险极高，成则成仙，败则殒身。',
    icon: '🌩️',
    requiresSpecial: true,
  },
];

const CultivationPanel: React.FC = () => {
  const { character, cultivation, startCultivation, stopCultivation } = usePlayerStore();
  const toast = useToast();
  const [showResult, setShowResult] = useState(false);
  const [resultSuccess, setResultSuccess] = useState(false);

  if (!character) return null;

  const handleStart = (opt: CultivationOption) => {
    if (character.stamina < opt.staminaCost) {
      toast.error(`体力不足！需要 ${opt.staminaCost} 点体力`);
      return;
    }
    startCultivation(opt.mode, opt.duration);
    toast.info(`开始${CULTIVATION_MODE_NAMES[opt.mode]}...`);
  };

  const handleStop = () => {
    if (cultivation.mode === 'breakthrough' || cultivation.mode === 'tribulation') {
      const success = Math.random() * 100 < cultivation.successRate;
      setResultSuccess(success);
      setShowResult(true);
    }
    stopCultivation();
  };

  const pct = calcProgress(cultivation.elapsed, cultivation.duration);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 当前修炼状态 */}
      {cultivation.isActive && (
        <div
          className="game-card p-4 animate-pulse-gold"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame size={16} style={{ color: 'var(--color-gold)' }} />
              <span className="text-sm font-semibold text-glow-gold">
                {cultivation.mode ? CULTIVATION_MODE_NAMES[cultivation.mode] : ''} 进行中
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleStop}>
              <X size={12} className="mr-1" /> 停止
            </Button>
          </div>
          <ProgressBar value={pct} max={100} variant="realm" height={10} showLabel label={`进度 ${pct}%`} />
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <Clock size={12} style={{ color: 'var(--color-text-muted)' }} />
              <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                剩余：{formatCountdown(cultivation.duration - cultivation.elapsed)}
              </span>
            </div>
            {cultivation.gainPerHour > 0 && (
              <div className="flex items-center gap-1">
                <Zap size={12} style={{ color: '#f59e0b' }} />
                <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {cultivation.gainPerHour}/时
                </span>
              </div>
            )}
            {cultivation.successRate < 100 && (
              <div className="flex items-center gap-1">
                <AlertTriangle size={12} style={{ color: '#f87171' }} />
                <span className="text-xs" style={{ color: '#f87171' }}>
                  成功率：{cultivation.successRate}%
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 修炼选项 */}
      {!cultivation.isActive && (
        <div className="grid gap-3">
          {CULTIVATION_OPTIONS.map((opt) => (
            <div
              key={opt.mode}
              className="game-card p-4 hover:border-[--color-border-gold] transition-colors cursor-default"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl">{opt.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                      {CULTIVATION_MODE_NAMES[opt.mode]}
                    </span>
                    {opt.requiresSpecial && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
                      >
                        高风险
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {opt.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 flex-wrap">
                    <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      时长：{formatCountdown(opt.duration)}
                    </span>
                    {opt.gainPerHour > 0 && (
                      <span className="text-xs" style={{ color: '#f59e0b' }}>
                        +{opt.gainPerHour} 修为/时
                      </span>
                    )}
                    {opt.successRate < 100 && (
                      <span className="text-xs" style={{ color: '#f87171' }}>
                        成功率：{opt.successRate}%
                      </span>
                    )}
                    <span className="text-xs" style={{ color: 'var(--color-jade)' }}>
                      体力：{opt.staminaCost}
                    </span>
                  </div>
                </div>
                <Button
                  variant={opt.requiresSpecial ? 'danger' : 'gold'}
                  size="sm"
                  onClick={() => handleStart(opt)}
                  disabled={character.stamina < opt.staminaCost}
                >
                  开始
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 突破结果弹窗 */}
      <Modal
        open={showResult}
        onClose={() => setShowResult(false)}
        title={resultSuccess ? '✨ 突破成功！' : '💀 突破失败'}
        width={360}
        footer={
          <Button variant="gold" size="sm" onClick={() => setShowResult(false)}>
            知晓了
          </Button>
        }
      >
        <div className="text-center py-4">
          {resultSuccess ? (
            <>
              <CheckCircle size={48} className="mx-auto mb-3" style={{ color: '#4ade80' }} />
              <p className="text-base font-semibold mb-2 text-glow-jade">境界突破！</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                道友修为精进，境界更上一层楼，前途无量！
              </p>
            </>
          ) : (
            <>
              <AlertTriangle size={48} className="mx-auto mb-3" style={{ color: '#f87171' }} />
              <p className="text-base font-semibold mb-2" style={{ color: '#f87171' }}>突破失败</p>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                天道艰险，此番突破未能成功，道友需修复伤势，再图进取。
              </p>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default CultivationPanel;
