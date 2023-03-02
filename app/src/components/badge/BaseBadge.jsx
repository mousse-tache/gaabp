import "./base-badge.scss";

const BadgeStyles = {
  Squared: 1,
  Rounded: 2,
};

const BaseBadge = ({ className, style, children, ...props }) => {
  const appliedStyle = getStyle();

  function getStyle() {
    switch (style) {
      case BadgeStyles.Rounded:
        return "rounded";
      case BadgeStyles.Squared:
      default:
        return "squared";
    }
  }

  return (
    <div
      {...props}
      className={`${className} base-badge badge-style--${appliedStyle}`}
    >
      {children}
    </div>
  );
};

export { BadgeStyles };

export default BaseBadge;
