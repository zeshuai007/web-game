import React from 'react';

type GlowColor = 'gold' | 'jade' | 'purple' | 'vermillion' | 'cyan';

interface GlowTextProps {
  children: React.ReactNode;
  color?: GlowColor;
  intensity?: 'low' | 'medium' | 'high';
  animate?: boolean;
  className?: string;
}

const glowStyles: Record<GlowColor, { color: string; shadow: string }> = {
  gold: {
    color: 'var(--color-gold)',
    shadow: '0 0 10px rgba(212, 168, 67, 0.6), 0 0 20px rgba(212, 168, 67, 0.4), 0 0 30px rgba(212, 168, 67, 0.2)',
  },
  jade: {
    color: 'var(--color-jade)',
    shadow: '0 0 10px rgba(126, 203, 161, 0.6), 0 0 20px rgba(126, 203, 161, 0.4), 0 0 30px rgba(126, 203, 161, 0.2)',
  },
  purple: {
    color: '#a78bfa',
    shadow: '0 0 10px rgba(167, 139, 250, 0.6), 0 0 20px rgba(167, 139, 250, 0.4), 0 0 30px rgba(167, 139, 250, 0.2)',
  },
  vermillion: {
    color: '#ef4444',
    shadow: '0 0 10px rgba(239, 68, 68, 0.6), 0 0 20px rgba(239, 68, 68, 0.4), 0 0 30px rgba(239, 68, 68, 0.2)',
  },
  cyan: {
    color: '#22d3ee',
    shadow: '0 0 10px rgba(34, 211, 238, 0.6), 0 0 20px rgba(34, 211, 238, 0.4), 0 0 30px rgba(34, 211, 238, 0.2)',
  },
};

const intensityMultiplier: Record<string, number> = {
  low: 0.5,
  medium: 1,
  high: 1.5,
};

const GlowText: React.FC<GlowTextProps> = ({
  children,
  color = 'gold',
  intensity = 'medium',
  animate = false,
  className = '',
}) => {
  const style = glowStyles[color];
  const multiplier = intensityMultiplier[intensity];

  const calculateShadow = () => {
    const baseShadow = style.shadow;
    if (multiplier === 1) return baseShadow;
    
    const adjustedShadow = baseShadow.replace(/(\d+)px/g, (match, p1) => 
      `${Math.round(parseInt(p1) * multiplier)}px`
    );
    return adjustedShadow;
  };

  return (
    <span
      className={`transition-all duration-300 ${animate ? 'animate-pulse-gold' : ''} ${className}`}
      style={{
        color: style.color,
        textShadow: calculateShadow(),
      }}
    >
      {children}
    </span>
  );
};

export default GlowText;
