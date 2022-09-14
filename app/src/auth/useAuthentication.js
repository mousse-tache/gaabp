import { useState, useEffect } from "react";

import UserClient from "@aabp/clients/userClient";

import { signIn } from '@aabp/login/login';

const isAuthenticated = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isAuthenticated') === 'true';
    } else {
      return false;
    }
};

function useAuthentication() {
    const [user, setUser] = useState(false);
    const [authedUser, setAuthedUser] = useState(false);
    const userClient = new UserClient("");
    const [idToken, setIdToken] = useState(null);
    const [jwtToken, setJwtToken] = useState("");
    const [init, setInit] = useState(false);

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
    }, []);

    useEffect(() => {
        FetchUser();
    }, [idToken]);

    return { claims: user, authedUser, FetchUser, setAuthedUser, jwtToken, init };
}

export {
    isAuthenticated
};

export default useAuthentication;