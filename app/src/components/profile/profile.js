import React, { useState, useContext, useEffect } from "react";

import { useSnackbar } from 'notistack';
import { navigate } from "gatsby";

import { Alert, Skeleton } from "@material-ui/lab";
import { Paper } from '@material-ui/core';

import AppContext from "@aabp/context/appContext";
import UserContext from "@aabp/context/userContext";

import UserClient from "@aabp/clients/userClient";

import MemberDetails from "@aabp/components/membres/MemberDetails";
import UserDetailsTab from "@aabp/components/membres/userDetailsTabs";
const Profile = () => {
    const { authedUser, claims, init } = useContext(AppContext);
    const [member, setMember] = useState({});
    
    const userClient = new UserClient();
    const { enqueueSnackbar } = useSnackbar();

    async function AddUser() { 
        try {
            await userClient.completeSignup([member]);
            enqueueSnackbar(`${member?.prenom} ${member?.nom}, votre inscription a été complétée`, { variant: "success" });
            navigate("/app/profile");
        }
        catch(e) {
            enqueueSnackbar(e.message, {variant: "error"});
        }
    }

    async function saveUser() {      
        try {
            if(member?._id) {
                await userClient.updateUser({...member, id: member._id});
                enqueueSnackbar(`Le profil de ${member?.prenom} ${member?.nom} a été mis à jour.`);
            }
            else {
                await AddUser();
            }
        } catch (error) {            
            enqueueSnackbar(error?.error?.response?.data, { variant: "error"});
        }

        window.location.reload();
    }

    useEffect(() => {
        if (!authedUser) {
            setMember({...member,
                courriel: claims.email
            });
        }
        else {
            setMember(authedUser);
        }
    }, [authedUser]);

    if(!init) {
        return <Skeleton />;
    }

    return  (
        <UserContext.Provider value={{member, setMember, saveUser}}>
            <Paper className="profile">    
                {!authedUser && <Alert severity="warning">Complétez votre inscription en remplissant les informations suivantes</Alert>}    
                <MemberDetails isPersonalProfile={true} />
                <UserDetailsTab />
            </Paper>
        </UserContext.Provider>    
    );
};

export default Profile;
