import React from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Link } from "gatsby";

import Login from '@aabp/login/login';

import "./login-page.scss";

const LoginPage = () => {
    return (
        <>
            <Login  />                
            <Link to="/aide" target="_blank" className="login-help-container">
                <HelpOutlineIcon className="login-help-item" fontSize="large" label="bottin"/>
                <h3 className="login-help-item">
                    Centre d'aide
                </h3>
            </Link>
        </>
    );
};

export default LoginPage;