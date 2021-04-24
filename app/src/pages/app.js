import React, { useState, useEffect } from "react";
import { SnackbarProvider } from 'notistack';
import { Helmet } from "react-helmet";

import AppContext from "@aabp/context/appContext";
import UnitContextProvider from "@aabp/context/unit/unitContextProvider";

import Layout from "@aabp/components/layout";
import Loading from '@aabp/components/loading/loading';
import NominatedUserRouter from "@aabp/components/routers/nominatedUserRouter";
import AnonymousUserRouter from "@aabp/components/routers/anonymousUserRouter";

import UserClient from "@aabp/clients/userClient";

import Login, { signIn } from '@aabp/login/login';

const App = () => {
    const [user, setUser] = useState(false);
    const [authedUser, setAuthedUser] = useState(false);
    const userClient = new UserClient("");
    const [idToken, setIdToken] = useState(null);
    const [jwtToken, setJwtToken] = useState("");
    const [init, setInit] = useState(false);

    const isAuthenticated = () => {
        if (typeof window !== 'undefined') {
          return localStorage.getItem('isAuthenticated') === 'true';
        } else {
          return false;
        }
    };

    const fetchAuth = async() => {
        const token = await signIn.authClient.tokenManager.get('idToken');
        if (token) {
          await setUser(token.claims);
          await setIdToken(token.idToken);
        } else {
          setUser(false);
          localStorage.setItem('isAuthenticated', 'false');
          setInit(true);
        }       
    };

    async function FetchUser() {
        if(idToken) {
            try {               
                var { user, jwttoken } = await userClient.inializeSession(idToken);

                if(user)
                {
                    await setAuthedUser(user);
                }            

                if (jwttoken) {
                    await setJwtToken(jwttoken);
                }
            } catch (e) {
                console.log(e.message);   
            }
            
            setInit(true);
        }
    }

    useEffect(() => {
        try {
            fetchAuth();
        }
        catch(e) {
            console.log(e.message);
        }
    }, [UserClient]);

    useEffect(() => {
        FetchUser();
    }, [idToken]);

    if (!isAuthenticated()) {
        return <Login  />;
    }
  
    if(!(user || init) || (!jwtToken && authedUser))  {
        return (
            <Loading />
        );        
    }
    
    return (        
        <AppContext.Provider value={{claims: user, authedUser, FetchUser, setAuthedUser, jwtToken, init}}> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>AABP | Scoutisme traditionnel</title>
            </Helmet> 
            <UnitContextProvider>
                <Layout username={user.name}> 
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
