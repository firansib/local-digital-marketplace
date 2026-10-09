/**
 * Reusable Button
 * variant: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost'
 * size:    'sm' | 'md' | 'lg'
 */
export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500',
    secondary:
      'bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 focus:ring-gray-400',
    outline:
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-500',
    danger:
      'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white focus:ring-red-400',
    ghost:
      'text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus:ring-blue-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[base, variants[variant], sizes[size], fullWidth ? 'w-full' : '', className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
