import React, { useState, useEffect } from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile/profile"
import Membres from "../components/membres/membres"
import UserContext from "../context/userContext"
import Loading from '../components/loading/loading'
import UserClient from "../clients/userClient"
import Login, { signIn } from './login'

import "../components/profile/profile.css"

const App = () => {
    const [user, setUser] = useState(false);
    const [authedUser, setAuthedUser] = useState({});
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

    useEffect(() => {
        fetchAuth();
        FetchUser();
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
        <UserContext.Provider value={{claims: user, authedUser, setAuthedUser}}>
            <Layout username={user.name}> 
                <Router basepath="/app"> 
                    <Profile path="/account" />
                    <Membres path="/membres" />
                    <Profile default />
                </Router>
            </Layout>
        </UserContext.Provider>
          )
}

export default App
