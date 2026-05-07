import React from 'react';
import { SKILL_TYPE_NAMES } from '../../constants/index';
import type { Skill } from '../../types/index';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import Tooltip from '../ui/Tooltip';

interface SkillListProps {
  skills: Skill[];
}

const SkillList: React.FC<SkillListProps> = ({ skills }) => {
  const grouped: Record<string, Skill[]> = {
    active: skills.filter((s) => s.type === 'active'),
    passive: skills.filter((s) => s.type === 'passive'),
    xinjue: skills.filter((s) => s.type === 'xinjue'),
  };

  return (
    <div className="space-y-4">
      {(['active', 'passive', 'xinjue'] as const).map((type) => {
        if (!grouped[type]?.length) return null;
        return (
          <div key={type}>
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {SKILL_TYPE_NAMES[type]}
            </h4>
            <div className="space-y-2">
              {grouped[type].map((skill) => (
                <Tooltip
                  key={skill.id}
                  content={
                    <div className="max-w-xs">
                      <div className="font-semibold mb-1" style={{ color: 'var(--color-gold)' }}>{skill.name}</div>
                      <div className="text-xs leading-relaxed">{skill.description}</div>
                      {skill.effect && <div className="text-xs mt-1" style={{ color: 'var(--color-jade)' }}>{skill.effect}</div>}
                      {skill.cooldown && <div className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>冷却：{skill.cooldown}s</div>}
                    </div>
                  }
                  placement="top"
                >
                  <div
                    className="flex items-center gap-3 p-3 rounded-lg cursor-default"
                    style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--color-border)' }}
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                          {skill.name}
                        </span>
                        <Badge variant="gold">Lv.{skill.level}</Badge>
                      </div>
                      <ProgressBar
                        value={skill.level}
                        max={skill.maxLevel}
                        variant="exp"
                        height={4}
                        className="mt-1.5"
                      />
                    </div>
                    {skill.cost && (
                      <span className="text-xs shrink-0" style={{ color: '#3b82f6' }}>
                        -{skill.cost}灵
                      </span>
                    )}
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SkillList;
