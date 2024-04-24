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
      <div onClick={() => setOpen(!open)} className="accordion-header w-full">
        <div className="accordion-header-title text-xl">{header}</div>
        <div className={`caret ${open ? "toggle-up" : "toggle-down"}`}>
          <svg className="h-8 w-8 text-slate-500"  
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          strokeWidth="2" 
          stroke="currentColor" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>
      <div className={`accordion-content content-${open ? "open" : "closed"} w-full`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
