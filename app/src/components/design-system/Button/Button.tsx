import { ReactNode } from "react";

type Size = "small" | "medium" | "large"

type Color = "primary" | "secondary" | "ghost"

const Button = ({
  children,
  className,
  size,
  color,
  ...props
}: {
  children: ReactNode
  className: string
  size: Size
  color: Color
}): React.ReactNode  => {
  return (
    <button
      className={`${className} ${getSizeClasses(size)}
      ${getColorClasses(
        color,
      )} font-bold rounded drop-shadow-lg disabled:opacity-75 disabled:bg-neutral-500 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
};

const getColorClasses = (color) => {
  switch (color) {
    case "ghost":
      return "text-base hover:text-rose-800 py-1 px-2 hover:bg-slate-200";
    case "secondary":
      return "bg-yellow-500 hover:bg-yellow-600 text-black";
    case "primary":
    default:
      return "bg-rose-800 hover:bg-rose-900 text-white";
  }
};

const getSizeClasses = (size) => {
  switch (size) {
    case "small":
      return "text-base py-1 px-2";
    case "large":
      return "text-xl py-4 px-6";
    case "medium":
    default:
      return "text-lg py-2 px-3";
  }
};

export default Button;
