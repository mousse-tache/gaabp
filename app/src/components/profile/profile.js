import React, { useState, useContext, useEffect } from "react"

import { useSnackbar } from 'notistack';
import { navigate } from "gatsby";

import { Alert } from "@material-ui/lab";
import { Paper } from '@material-ui/core';

import AppContext from "@aabp/context/appContext";
import UserContext from "@aabp/context/userContext";


import Loading from "../loading/loading";
import UserClient from "../../clients/userClient";
import MemberDetails from "../membres/memberDetails";
import UserDetailsTab from "../membres/userDetailsTabs";
const Profile = () => {
    const { authedUser, claims, init } = useContext(AppContext);
    const [member, setMember] = useState(authedUser);
    
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
    }

    useEffect(() => {
        if (!authedUser) {
            setMember({
                courriel: claims.email
            })
        }
        else {
            setMember(authedUser);
        }
    }, [authedUser]);

    if(!init) {
        return <Loading />;
    }

    return  (
        <UserContext.Provider value={{member}}>
            <Paper className="profile">    
                {!authedUser && <Alert severity="warning">Complétez votre inscription en remplissant les informations suivantes</Alert>}    
                <MemberDetails isPersonalProfile={true} setMember={setMember} saveUser={saveUser} />
                <UserDetailsTab />
            </Paper>
        </UserContext.Provider>    
    );
};

export default Profile;
