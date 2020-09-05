import React, { useState, useContext, useEffect } from "react"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import { Input, Paper, Button, Switch, FormControlLabel, InputLabel } from '@material-ui/core';
import MemberDetails from "../membres/memberDetails";
import { useSnackbar } from 'notistack';
import { navigate } from "gatsby";

const Profile = () => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;

    const [member, setMember] = useState(authedUser);
    
    const userClient = new UserClient();
    const { enqueueSnackbar } = useSnackbar();

    async function AddUser() { 
        try {
            await userClient.addUser(member);
            enqueueSnackbar(`${member?.prenom} ${member?.nom}, votre inscription a été complétée`, { variant: "success" });
            navigate("/")
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

    return  (
    <Paper className="profile">        
        <MemberDetails member={member} isPersonalProfile={true} setMember={setMember} saveUser={saveUser} />
    </Paper>
    )
}

export default Profile
