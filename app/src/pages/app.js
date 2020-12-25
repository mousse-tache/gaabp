import React, { useState, useEffect } from "react"
import Layout from "../components/layout";
import Loading from '../components/loading/loading'
import UserClient from "../clients/userClient"
import Login, { signIn } from './login'
import UnitContextProvider from "../context/unit/unitContextProvider"
import { SnackbarProvider } from 'notistack';
import { Helmet } from "react-helmet";

import NominatedUserRouter from "../components/routers/nominatedUserRouter";
import AnonymousUserRouter from "../components/routers/anonymousUserRouter";

import "../components/profile/profile.css"
import '@material/react-material-icon/dist/material-icon.css';
import AppContext from "@aabp/context/appContext"

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
        }
    }

    async function FetchUser() {
        if(!authedUser && idToken) {
            try {               
                var { user, jwttoken } = await userClient.inializeSession(idToken);

                if(user)
                {
                    setAuthedUser(user);
                }            

                if (jwttoken) {
                    setJwtToken(jwttoken);
                }

                setInit(true);
            } catch (e) {
                console.log(e.message);   
            }
        }
    }

    useEffect(() => {
        try {
            fetchAuth();
        }
        catch(e) {
            console.log(e.message);
        }
    }, []);

    useEffect(() => {
        FetchUser();
    }, [idToken])

    if (!isAuthenticated()) {
        return (
          <Login/>
        );
    }
  
    if(!(user || init))  {
        return (
            <Loading />
        )        
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
          )
}

export default App
