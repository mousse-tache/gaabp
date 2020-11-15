import React, { useState, useContext, useEffect } from "react"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import { Paper } from '@material-ui/core';
import MemberDetails from "../membres/memberDetails";
import { useSnackbar } from 'notistack';
import { navigate } from "gatsby";
import { Alert } from "@material-ui/lab";

const Profile = () => {
    const { authedUser, claims, init } = useContext(UserContext);
    const [member, setMember] = useState(authedUser);
    
    const userClient = new UserClient();
    const { enqueueSnackbar } = useSnackbar();

    async function AddUser() { 
        try {
            await userClient.addUsers([member]);
            enqueueSnackbar(`${member?.prenom} ${member?.nom}, votre inscription a été complétée`, { variant: "success" });
            navigate("/app/profile");
        }
        catch(e) {
            enqueueSnackbar(e.message, {variant: "error"});
        }
    }

    async function saveUser() {       
        if(member?._id) {
            await userClient.updateUser({...member, id: member._id});
            enqueueSnackbar(`Le profil de ${member?.prenom} ${member?.nom} a été mis à jour.`)
        }
        else {
            await AddUser();
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
        return <Loading />
    }

    return  (
    <Paper className="profile">    
        {!authedUser && <Alert severity="warning">Complétez votre inscription en remplissant les informations suivantes</Alert>}    
        <MemberDetails member={member} isPersonalProfile={true} setMember={setMember} saveUser={saveUser} />
    </Paper>
    )
}

export default Profile
