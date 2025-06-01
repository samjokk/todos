import { ReactNode } from 'react';

type ButtonVariant = 'default' | 'outline' | 'dangerous';

interface ButtonProps {
  onClick: () => void;
  children?: ReactNode;
  variant?: ButtonVariant;
}

const variants: Record<ButtonVariant, string> = {
  default: 'bg-gray-600 hover:bg-gray-700',
  outline: 'bg-gray-400 hover:bg-gray-500 text-gray-700',
  dangerous: 'bg-red-500 hover:bg-red-600',
};

export function Button({
  children,
  onClick,
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      role='button'
      className={`px-3 py-1 rounded text-white ${variants[variant]} ${variant}`}
      {...props}
    >
      {children}
    </button>
  );
}
