import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading";
import UserClient from "@aabp/clients/userClient"
import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import { Paper, Breadcrumbs, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import MemberDetails from "./memberDetails"
import AppContext from "@aabp/context/appContext"
import UserContext from "@aabp/context/userContext"
import UserDetailsTabs from "./userDetailsTabs";
import Fusion from "./fusion/fusion";

const EditMembre = ({id}) => {
    const { authedUser } = useContext(AppContext);
    const [isFecthingUser, setIsFetchingUser] = useState(true);

    const [canEdit, setCanEdit] = useState(Permissions(PermissionTypes.UpdateUser));
    const [member, setMember] = useState(false);
    
    const userClient = new UserClient();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        setCanEdit(Permissions(PermissionTypes.UpdateUser))
    }, [authedUser])

    useEffect(() => {
        FetchUser();
    }, [id])

    async function FetchUser() {
        try {               
            var data = await userClient.getById(id);
            if(data !== null)
            {
                setMember(data[0]);
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingUser(false);
    }

    async function saveUser() {       
        try {
            if(member?._id) {
                await userClient.updateUser({...member, id: member._id});
            }
            enqueueSnackbar(`Le profil de ${member?.prenom} ${member?.nom} a été mis à jour.`)
        } catch (error) {
            enqueueSnackbar(error?.error?.response?.data, { variant: "error"})
        }
    }

    if(isFecthingUser || !member ) {
        return (<Loading />)
    }

    return  (
        <UserContext.Provider value={{member, setMember, saveUser}}>
            <Paper className="profile">
                <h2 style={{display:"flex", justifyContent:"space-between"}}>
                    <Breadcrumbs aria-label="breadcrumb" className="crumbs">
                        <Link color="inherit" to="/app/membres">
                            Membres
                        </Link>
                        <Typography color="textPrimary">{`${member.prenom} ${member.nom}`}</Typography>
                    </Breadcrumbs>
                    {authedUser.isAdmin && <div>
                        <Fusion />
                    </div>}
                </h2>
                <MemberDetails canEdit={canEdit} />            
                <UserDetailsTabs />           
            </Paper>
        </UserContext.Provider>
        )
}

export default EditMembre
