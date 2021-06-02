import React from "react";
import PropTypes from "prop-types";
import AppContext from "./appContext";

import LogoSpinner from '@aabp/components/spinner/LogoSpinner';

import Login from '@aabp/login/login';
import useAuthentication, { isAuthenticated } from "@aabp/auth/useAuthentication";
import useFeatures from "@aabp/features/useFeatures";

const AppContextProvider = ({children}) => {
    const auth = useAuthentication();
    const features = useFeatures();

    if (!isAuthenticated()) {
        return <Login  />;
    }
  
    if(!(auth.claims && auth.init) || (!auth.jwtToken && auth.authedUser) || features == undefined)  {
        return (
            <LogoSpinner />
        );        
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