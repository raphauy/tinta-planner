import clsx from "clsx";

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  colorOnPrimary?: string;
}

export default function Button ({
  type = "button",
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  colorOnPrimary,
}: ButtonProps) {
  const color= colorOnPrimary ? colorOnPrimary : "bg-tinta-vino"
  return ( 
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(`
        flex 
        justify-center
        items-center
        rounded-md 
        px-3 
        py-2 
        text-sm 
        font-semibold 
        focus-visible:outline 
        focus-visible:outline-2 
        focus-visible:outline-offset-2 
        `,
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
        secondary && 'text-gray-600 border',
        danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
        !secondary && !danger && `${color} hover:opacity-80 focus-visible:outline-tinta-marron`
      )}
    >
      {children}
    </button>
   );
}
 