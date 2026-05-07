import React from 'react';
import { motion } from 'framer-motion';
import { useMotionPrefs } from '../../hooks/useMotionPrefs';

type Props = {
  src: string;
  className?: string;
  opacity?: number;
  mixBlendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
  glow?: boolean;
  glowColor?: string;
  zoomRange?: [number, number];
};

const PageAtmosphere: React.FC<Props> = ({
  src,
  className = '',
  opacity = 0.3,
  mixBlendMode = 'normal',
  glow = true,
  glowColor = 'rgba(212, 168, 67, 0.2)',
  zoomRange = [1.02, 1.05],
}) => {
  const { enableMotion, enableHighMotion } = useMotionPrefs();

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {glow && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${glowColor} 0%, transparent 60%)`,
          }}
        />
      )}
      
      <motion.img
        src={src}
        alt="页面氛围图"
        className="absolute inset-0 w-full h-full object-cover select-none"
        style={{ 
          opacity, 
          mixBlendMode,
          filter: `saturate(1.1) contrast(1.05)`,
        }}
        draggable={false}
        initial={{ opacity: 0, scale: zoomRange[0] }}
        animate={{
          opacity,
          scale: enableMotion && enableHighMotion ? [...zoomRange, zoomRange[0]] : zoomRange[0],
        }}
        transition={{
          duration: enableMotion && enableHighMotion ? 18 : 0.8,
          repeat: enableMotion && enableHighMotion ? Infinity : 0,
          ease: 'easeInOut',
        }}
      />
      
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(13,17,23,0.15) 0%, transparent 30%, transparent 70%, rgba(13,17,23,0.25) 100%)`,
        }}
      />
      
      {glow && enableMotion && enableHighMotion && (
        <>
          <div
            className="absolute top-0 left-0 w-64 h-64 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)`,
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-80 h-80 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(126,203,161,0.06) 0%, transparent 70%)`,
              animation: 'float 10s ease-in-out infinite reverse',
            }}
          />
        </>
      )}
    </div>
  );
};

export default PageAtmosphere;
