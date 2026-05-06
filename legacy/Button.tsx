import React, { useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'gold' | 'jade' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  glow?: boolean;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3 text-base',
};

const variantClasses: Record<ButtonVariant, string> = {
  gold: 'btn-gold',
  jade: 'btn-jade',
  outline: 'btn-outline',
  danger: 'btn-danger',
  ghost: 'bg-transparent text-[--color-text-secondary] hover:text-[--color-text-primary] hover:bg-white/5',
};

const glowClasses: Record<ButtonVariant, string> = {
  gold: 'animate-pulse-gold',
  jade: 'animate-pulse-jade',
  outline: 'animate-pulse-gold',
  danger: '',
  ghost: '',
};

const rippleVariants: ButtonVariant[] = ['gold', 'jade', 'danger'];

const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  loading = false,
  icon,
  glow = false,
  children,
  className = '',
  disabled,
  onClick,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rippleVariants.includes(variant) && btnRef.current) {
      const btn = btnRef.current;
      const rect = btn.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - diameter / 2;
      const y = e.clientY - rect.top - diameter / 2;

      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.cssText = `width:${diameter}px;height:${diameter}px;left:${x}px;top:${y}px;`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    }
    onClick?.(e);
  };

  return (
    <button
      ref={btnRef}
      className={`btn-game ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${rippleVariants.includes(variant) ? 'relative overflow-hidden' : ''} ${glow && !loading ? glowClasses[variant] : ''} transition-transform duration-200`}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...rest}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : icon && isHovered && rippleVariants.includes(variant) ? (
        <span className="transform scale-110 transition-transform duration-200">{icon}</span>
      ) : (
        icon
      )}
      {children && <span className="transition-transform duration-200">{children}</span>}
    </button>
  );
};

export default Button;
