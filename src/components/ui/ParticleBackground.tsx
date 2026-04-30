import React, { useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
}

const ParticleBackground: React.FC = () => {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: (i * 37 + 13) % 100,
        y: (i * 53 + 7) % 100,
        size: ((i * 17 + 3) % 3) + 1,
        color: i % 2 === 0 ? '#d4a843' : '#7ecba1',
        opacity: ((i * 7 + 5) % 5) * 0.06 + 0.08,
        duration: 3 + ((i * 11) % 4),
        delay: (i * 0.31) % 5,
      })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
