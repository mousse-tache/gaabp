import React, { useState, useEffect } from "react"
import { Router } from "@reach/router"
import Layout from "./components/layout"
import Profile from "./profile/profile"
import UserContext from "./context/userContext"
import Loading from './components/loading/loading'
import Login, { signIn } from './pages/login'
import NotFoundPage from "./pages/404"

const AppAuthenticated = ({children}) => {
    const [user, setUser] = useState(false);

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
          setUser(false)
          localStorage.setItem('isAuthenticated', 'false');
        }
    }

    useEffect(() => {
        fetchAuth();
    }, []);
    
    if (!isAuthenticated()) {
        return (
          <Login/>
        );
    }
  
    if(user == null || !user)  {
        return (
            <Loading />
        )        
    }

    return (        
        <UserContext.Provider value={{courriel: user.email, nomcomplet:user.name}}>
            <Layout username={user.name}> 
                <Router> 
                    <Profile path="/account" />
                    <NotFoundPage default />
                </Router>
            </Layout>
        </UserContext.Provider>
          )
}

export default AppAuthenticated
