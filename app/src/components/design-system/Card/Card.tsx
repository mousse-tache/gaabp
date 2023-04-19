const Card = ({
  className,
  children,
}: {
  className: string
  children: React.ReactChildren
}): React.ReactNode => {
  return (
    <div className={`${className} bg-white rounded drop-shadow-md`}>
      {children}
    </div>
  );
};

export default Card;
