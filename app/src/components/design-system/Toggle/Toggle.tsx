type Size = "small" | "medium" | "large"

type Color = "primary" | "secondary" | "ghost"

const Toggle = ({
  label,
  className,
  size,
  color,
  checked,
  onClick,
  disabled,
}: {
  label: any
  className: string
  size: Size
  color: Color
  checked: boolean
  disabled: boolean
  onClick: () => void
}) => {
  const classes = `${className} ${getColorClasses(color)} ${getSizeClasses(
    size,
  )} bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:bg-white after:border-gray-300 after:border after:rounded-full after:transition-all dark:border-gray-600 disabled:opacity-75 disabled:cursor-not-allowed`;

  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        value=""
        checked={checked}
        disabled={disabled}
        onClick={() => onClick()}
        className="sr-only peer"
      />
      <div className={classes}></div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </span>
    </label>
  );
};

const getColorClasses = (color) => {
  switch (color) {
    case "ghost":
      return "text-base py-1 px-2";
    case "secondary":
      return "dark:peer-focus:ring-yellow-600 peer-checked:bg-yellow-600";
    case "primary":
    default:
      return "dark:peer-focus:ring-rose-800 peer-checked:bg-rose-800";
  }
};

const getSizeClasses = (size) => {
  switch (size) {
    case "small":
      return "w-9 h-5 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4";
    case "large":
      return "w-14 h-7 after:absolute after:top-0.5 after:left-[4px] after:h-6 after:w-6";
    case "medium":
    default:
      return "w-11 h-6 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5";
  }
};

export default Toggle;
