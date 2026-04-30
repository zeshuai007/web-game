import React from 'react';
import { motion } from 'framer-motion';
import { useMotionPrefs } from '../../hooks/useMotionPrefs';

type Props = {
  /** 路径：/images/pages/xxx.svg */
  src: string;
  className?: string;
  opacity?: number;
};

const PageAtmosphere: React.FC<Props> = ({
  src,
  className = '',
  opacity = 0.22,
}) => {
  const { enableMotion, enableHighMotion } = useMotionPrefs();

  return (
    <motion.img
      src={src}
      alt="页面氛围图"
      className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none ${className}`}
      style={{ opacity, filter: 'saturate(1.05) contrast(1.05)' }}
      draggable={false}
      initial={{ opacity: 0, scale: 1.02 }}
      animate={
        enableMotion
          ? {
              opacity,
              scale: enableHighMotion ? [1.02, 1.035, 1.02] : 1.02,
            }
          : { opacity, scale: 1.02 }
      }
      transition={
        enableMotion
          ? {
              duration: enableHighMotion ? 14 : 0.6,
              repeat: enableHighMotion ? Infinity : 0,
              ease: 'easeInOut',
            }
          : { duration: 0.6 }
      }
    />
  );
};

export default PageAtmosphere;

