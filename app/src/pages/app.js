import React from "react";
import { SnackbarProvider } from 'notistack';
import { Helmet } from "react-helmet";

import AppContext from "@aabp/context/appContext";
import UnitContextProvider from "@aabp/context/unit/unitContextProvider";

import Layout from "@aabp/components/layout";
import Loading from '@aabp/components/loading/loading';
import NominatedUserRouter from "@aabp/components/routers/nominatedUserRouter";
import AnonymousUserRouter from "@aabp/components/routers/anonymousUserRouter";

import Login from '@aabp/login/login';
import useAuthentication, { isAuthenticated } from "@aabp/auth/useAuthentication";

const App = () => {
    const auth = useAuthentication();
    const { authedUser } = auth;

    if (!isAuthenticated()) {
        return <Login  />;
    }
  
    if(!(auth.claims || auth.init) || (!auth.jwtToken && auth.authedUser))  {
        return (
            <Loading />
        );        
    }
    
    return (        
        <AppContext.Provider value={auth}> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>AABP | Scoutisme traditionnel</title>
            </Helmet> 
            <UnitContextProvider>
                <Layout username={auth.claims.name}> 
                    <SnackbarProvider maxSnack={3}>
                            {(authedUser?.nominations?.length > 0 || authedUser?.isAdmin) && <NominatedUserRouter />}  
                            {(!authedUser?.nominations || authedUser?.nominations?.length === 0) && !authedUser?.isAdmin && <AnonymousUserRouter />} 
                    </SnackbarProvider>
                </Layout>
            </UnitContextProvider>            
        </AppContext.Provider>
          );
};

export default App;
