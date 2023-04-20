const Card = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
  props?: unknown
}): React.ReactElement => {
  return (
    <div
      className={`${className} bg-white rounded drop-shadow-md p-5`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
