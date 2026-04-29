import React from 'react';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'gold' | 'jade' | 'outline' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
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

const Button: React.FC<ButtonProps> = ({
  variant = 'gold',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...rest
}) => {
  return (
    <button
      className={`btn-game ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <Loader2 size={14} className="animate-spin" /> : icon}
      {children}
    </button>
  );
};

export default Button;
