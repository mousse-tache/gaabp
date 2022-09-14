import React from "react";
import PropTypes from "prop-types";
import { useOktaAuth } from '@okta/okta-react';

import AppContext from "./appContext";

import LogoSpinner from '@aabp/components/spinner/LogoSpinner';

import LoginPage from "@aabp/login/LoginPage";
import useAuthentication from "@aabp/auth/useAuthentication";
import useFeatures from "@aabp/features/useFeatures";

const AppContextProvider = ({children}) => {
    const auth = useAuthentication();
    const features = useFeatures();
    const { authState } = useOktaAuth();
  
    if(!authState)  {
        return (
            <LogoSpinner />
        );        
    }

    if (!authState.isAuthenticated) {
        return <LoginPage  />;
    }

    return (
        <AppContext.Provider value={{...auth, features: features}} >
            {children}
        </AppContext.Provider>
    );
};

AppContextProvider.propTypes = {
    children: PropTypes.node
};

export default AppContextProvider;