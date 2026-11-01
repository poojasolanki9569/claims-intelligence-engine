import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  disabled?: boolean;
  loading?: boolean;
}

function Button({
  children,
  type = 'button',
  disabled = false,
  loading = false,
}: ButtonProps) {
  return (
    <button type={type} disabled={disabled || loading}>
      {loading ? 'Assessing...' : children}
    </button>
  );
}

export default Button;