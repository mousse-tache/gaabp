import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import UserContext from "../context/userContext"
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

const App = () => {
    const [user, setUser] = useState(false);
    const [authedUser, setAuthedUser] = useState(false);
    const userClient = new UserClient("");

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
        } else {
          // Token has expired
          setUser(false);
          localStorage.setItem('isAuthenticated', 'false');
        }
    }

    async function FetchUser() {
        if(!authedUser) {
            try {               
                var data = await userClient.getByEmail(user.email);
                if(data !== null)
                {
                    setAuthedUser(data[0]);
                }            
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
    }, [user])

    if (!isAuthenticated()) {
        return (
          <Login/>
        );
    }
  
    if(!user)  {
        return (
            <Loading />
        )        
    }
    
    return (        
        <UserContext.Provider value={{claims: user, authedUser, FetchUser, setAuthedUser}}> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>AABP | Scoutisme traditionnel</title>
            </Helmet> 
            <UnitContextProvider>
                <Layout username={user.name}> 
                    <SnackbarProvider maxSnack={3}>
                            {authedUser?.nominations?.length > 0 && <NominatedUserRouter />}  
                            {(!authedUser?.nominations || authedUser?.nominations?.length === 0) && <AnonymousUserRouter />} 
                    </SnackbarProvider>
                </Layout>
            </UnitContextProvider>            
        </UserContext.Provider>
          )
}

export default App
