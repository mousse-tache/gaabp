import React from "react";
import PropTypes from "prop-types";
import { Security, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { Router } from "@reach/router";

const oktaAuth = typeof window !== 'undefined' && new OktaAuth({
    issuer: 'https://dev-132704.okta.com/oauth2/default',
    clientId: '0oa5i1e8aXo6JNxOx4x6',
    redirectUri: window.location.origin + '/app/login/callback'
  });

const OktaContextProvider = ({children}) => {
    if(window === "undefined") {
        return null;
    }

    return (            
        <Security oktaAuth={oktaAuth} restoreOriginalUri={window.location.origin + "/app"}>
            <Router>
                <LoginCallback path='/app/login/callback' />
            </Router>            
            {children}
        </Security>
    );
};

OktaContextProvider.propTypes = {
    children: PropTypes.node
};

export default OktaContextProvider;