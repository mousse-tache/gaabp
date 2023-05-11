const List = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
  className: string
}): React.ReactNode => {
  return (
    <ul className={`${className} flex flex-col gap-2`} {...props}>
      {children}
    </ul>
  );
};

export default List;
