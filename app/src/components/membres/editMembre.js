import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import MaterialTable from "material-table"
import { Input, Paper, Button, Switch, FormControlLabel, InputLabel, Breadcrumbs, Typography, CardContent, MenuList, MenuItem } from '@material-ui/core';

const EditMembre = ({email}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [isFecthingUser, setIsFetchingUser] = useState(true);

    const [canEdit, setCanEdit] = useState(Permissions(authedUser, PermissionTypes.UpdateUser));
    const [member, setMember] = useState(false);

    const userClient = new UserClient();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        FetchUser();
    }, [])

    async function FetchUser() {
        try {               
            var data = await userClient.getByEmail(email);
            if(data !== null)
            {
                setMember(data[0]);
            }            
        } catch (e) {
            console.log(e.message);   
        }

        setIsFetchingUser(false);
    }

    async function saveUser(e) {           
        e.preventDefault();
        e.stopPropagation();    
        if(member?._id) {
            await userClient.updateUser({...member, id: member._id});
        }
    }

    const handleAdminCheck = () => {
        setMember({...member, isAdmin: !member.isAdmin});
    };

    if(isFecthingUser || !member) {
        return (<Loading />)
    }


    return  (
    <Paper className="profile">
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
            <Link color="inherit" href="/app/membres">
                Membres
            </Link>
            <Typography color="textPrimary">{`${member.prenom} ${member.nom}`}</Typography>
        </Breadcrumbs>
        <form onSubmit={saveUser} className="form">        
            <h3>Informations de base</h3>
            
            <InputLabel>Courriel</InputLabel>
            <Input type="email" disabled={!canEdit} value={member.courriel} placeholder="robert@badenpowell.ca" disabled={!authedUser?.isAdmin} onChange={event => setMember({...member, courriel: event.target.value})} />

            <InputLabel>Prénom</InputLabel>
            <Input type="text" value={member.prenom} disabled={!canEdit} placeholder="Robert" onChange={event => setMember({...member, prenom:event.target.value})} />

            <InputLabel>Nom de famille</InputLabel>
            <Input type="text" value={member.nom} disabled={!canEdit} placeholder="Baden-Powell" onChange={event => setMember({...member, nom: event.target.value})} />

            <h3>Permissions</h3>
            <FormControlLabel
                disabled={!canEdit && !authedUser.isAdmin}
                control={
                <Switch
                    checked={member.isAdmin}
                    onChange={handleAdminCheck}
                    name="checkedB"
                    className="switch"
                />
                }
                label="Administrateur de la base de donnée"
            />
            
        </form>
        <div className="submit-button">
            <Button variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.UpdateUser) || member.courriel == ""} onClick={saveUser}>Sauvegarder</Button>
        </div>        
        <CardContent>
            <MaterialTable
            title=""
            options={
                {
                pageSize: 10,
                search: false
                }
            }
            onRowClick={(event, rowData) => navigate("/app/unite/"+rowData.unitId)}
            />
        </CardContent>
        
    </Paper>
    )
}



export default EditMembre
