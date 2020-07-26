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
    const user = userContext.claims;

    const [member, setMember] = useState({});
    const [isFecthingUser, setIsFetchingUser] = useState(true);
    
    const userClient = new UserClient();


    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        FetchUser();
    }, [])

    async function FetchUser() {
        if(!user?.email) {
            return;
        }
        try {               
            var data = await userClient.getByEmail(user?.email);
            if(data !== null)
            {
                setMember(data[0]);
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingUser(false);
    }

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

    if(isFecthingUser) {
        return (<Loading />)
    }


    return  (
    <Paper className="profile">        
        <MemberDetails member={member} isPersonalProfile={true} setMember={setMember} saveUser={saveUser} />
    </Paper>
    )
}

export default Profile
