import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import NominationsType from "../../utils/nominationTypes"
import MaterialTable from "material-table"
import { Input, Paper, Button, Switch, FormControlLabel, InputLabel, Breadcrumbs, Typography, CardContent, MenuList, MenuItem } from '@material-ui/core';
import UnitClient from "../../clients/unitClient";
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';

const EditMembre = ({email}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [isFecthingUser, setIsFetchingUser] = useState(true);

    const [canEdit, setCanEdit] = useState(Permissions(authedUser, PermissionTypes.UpdateUser));
    const [member, setMember] = useState(false);
    const [memberUnits, setMemberUnits] = useState(false);
    const [state, setState] = React.useState({
        columns: [],
        data: member.nominations,
      })
    const userClient = new UserClient();
    const unitClient = new UnitClient();

    const { enqueueSnackbar } = useSnackbar();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        setState({
            columns: [
                { title: 'Rôle', field: 'type', lookup: NominationsType },
                { title: "Unité", field: "nominations._id", render: row => <span>{memberUnits.filter(x => x._id === row.unitId)[0]?.nom}</span> , editable: 'never'},
                { title: "Début", field:"sd", type:"date"},
                { title: "Fin", field:"ed", type:"date", defaultSort: "asc"},
                { title: "Nomination approuvée", field: "approved", type:"boolean", render: row => row.approved ? <CheckIcon color="primary" /> : "" }
            ],
            data: member.nominations,
          });
    }, [memberUnits])

    useEffect(() => {
        setCanEdit(Permissions(authedUser, PermissionTypes.UpdateUser))
    }, [authedUser])

    useEffect(() => {
        FetchUser();
    }, [])

    useEffect(() => {
        if(member.nominations !== null && member.nominations !== undefined) {
            FetchMemberUnits();
        }
    }, [member])

    async function FetchMemberUnits() {
        try {               
            var data = await unitClient.getMultipleById(member?.nominations?.map(x => x.unitId));
            if(data !== null)
            {
                setMemberUnits(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

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

    async function saveUser() {       
        if(member?._id) {
            await userClient.updateUser({...member, id: member._id});
        }
        enqueueSnackbar(`Le profil de ${member?.prenom} ${member?.nom} a été mis à jour.`)
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
            <Link color="inherit" to="/app/membres">
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
                disabled={!canEdit && !authedUser?.isAdmin}
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
            <Button variant="contained" color="secondary" disabled={!Permissions(authedUser, PermissionTypes.UpdateUser) || member.courriel === ""} onClick={saveUser}>Sauvegarder</Button>
        </div>        
        <CardContent>
            <MaterialTable
            title=""
            columns={state.columns}
            data={state.data}
            options={
                {
                pageSize: 10,
                search: true,
                grouping: true
                }
            }
            editable={{
                isEditable: rowData => Permissions(authedUser, PermissionTypes.RemoveNomination),
                isEditHidden: rowData => !Permissions(authedUser, PermissionTypes.RemoveNomination),
                onRowUpdateCancelled: rowData => enqueueSnackbar("Aucune modification apportée"),
                onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const index = oldData.tableData.id;
                        let nominations = member?.nominations;
                        nominations[index] = newData;
                        nominations[index].approvedBy = authedUser._id;
                        setMember({...member, nominations: nominations})
                        saveUser();
                        resolve();
                }, 1000);
            })

            }}
            onRowClick={(event, rowData) => navigate("/app/unite/"+rowData.unitId)}
            />
        </CardContent>
        
    </Paper>
    )
}

export default EditMembre
