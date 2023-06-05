import classNames from "classnames";
import React, { ReactNode, useState } from "react";

import "./accordion.scss";

const Accordion = ({
  children,
  header,
  ...props
}: {
  children: ReactNode
  header: ReactNode
} & React.HTMLProps<HTMLDivElement>): React.ReactNode => {
  const [open, setOpen] = useState(false);

  const classes = classNames(
    "accordion bg-white rounded drop-shadow-md p-1",
    props?.className ?? "",
  );
  return (
    <div className={classes} {...props}>
      <div onClick={() => setOpen(!open)} className="accordion-header">
        <div className={`caret ${open ? "toggle-up" : "toggle-down"}`}>^</div>
        <div className="accordion-header-title">{header}</div>
      </div>
      <div className={`accordion-content content-${open ? "open" : "closed"}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
