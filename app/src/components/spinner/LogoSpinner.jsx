import React from "react";

import Logo from "@aabp/images/Logo_AABP.png";

import "./logo-spinner.scss";

const LogoSpinner = () => {
    return (
        <>
            <img className="logo-spinner" src={Logo} alt="Logo AABP spinner"/> 
        </>
      );
};

export default React.memo(LogoSpinner);