import React, { useState, useContext, useEffect } from "react"
import { Link } from "gatsby"
import Loading from "../loading/loading";
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import { Paper, Breadcrumbs, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import FormationMembre from "./formationMembre"
import MemberDetails from "./memberDetails"
import NominationsMembre  from "./nominationsMembre"
import AppContext from "@aabp/context/appContext"
import UserContext from "@aabp/context/userContext"

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
    }, [])


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
                <Breadcrumbs aria-label="breadcrumb" className="crumbs">
                    <Link color="inherit" to="/app/membres">
                        Membres
                    </Link>
                    <Typography color="textPrimary">{`${member.prenom} ${member.nom}`}</Typography>
                </Breadcrumbs>
                <MemberDetails canEdit={canEdit} />            
                <NominationsMembre />
                <FormationMembre />                
            </Paper>
        </UserContext.Provider>
        )
}

export default EditMembre
