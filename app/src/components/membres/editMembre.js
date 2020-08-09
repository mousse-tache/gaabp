import React, { useState, useContext, useEffect } from "react"
import { Link, navigate } from "gatsby"
import Loading from "../loading/loading"
import UserContext from "../../context/userContext"
import UserClient from "../../clients/userClient"
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import NominationsType from "../../utils/nominationTypes"
import MaterialTable from "material-table"
import { Paper, Breadcrumbs, Typography, CardContent } from '@material-ui/core';
import UnitClient from "../../clients/unitClient";
import CheckIcon from '@material-ui/icons/Check';
import { useSnackbar } from 'notistack';
import FormationMembre from "./formationMembre"
import MemberDetails from "./memberDetails"
import GroupClient from "../../clients/groupClient"

const EditMembre = ({id}) => {
    const userContext = useContext(UserContext);
    const authedUser = userContext.authedUser;
    const [isFecthingUser, setIsFetchingUser] = useState(true);

    const [canEdit, setCanEdit] = useState(Permissions(authedUser, PermissionTypes.UpdateUser));
    const [member, setMember] = useState(false);
    const [memberUnits, setMemberUnits] = useState(false);
    const [groups, setGroups] = useState(false);
    const [state, setState] = React.useState({
        columns: [],
        data: member.nominations,
      })
    const userClient = new UserClient();
    const unitClient = new UnitClient();
    const groupClient = new GroupClient();

    const { enqueueSnackbar } = useSnackbar();

    if (!authedUser) {
        userContext.FetchUser();  
    }

    useEffect(() => {
        setState({
            columns: [
                { title: 'Rôle', field: 'type', lookup: NominationsType },
                { title: "Unité", field: "nominations._id", render: row => <span>{(memberUnits ? memberUnits?.filter(x => x._id === row.unitId)[0]?.nom : null) ?? (groups? `Groupe ${groups?.filter(x => x._id === row.groupId)[0]?.numero} ${groups.filter(x => x._id === row.groupId)[0]?.nom}` : null)}</span> , editable: 'never'},
                { title: "Début", field:"sd", type:"date"},
                { title: "Fin", field:"ed", type:"date", defaultSort: "asc"},
                { title: "Nomination approuvée", field: "approved", type:"boolean", render: row => row.approved ? <CheckIcon color="primary" /> : "" }
            ],
            data: member.nominations,
          });
    }, [memberUnits, groups])

    useEffect(() => {
        setCanEdit(Permissions(authedUser, PermissionTypes.UpdateUser))
    }, [authedUser])

    useEffect(() => {
        FetchUser();
    }, [])

    useEffect(() => {
        if(member?.nominations) {
            FetchMemberUnits();
            FetchGroups()
        }
    }, [member?.nominations])

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

    async function FetchGroups() {
        try {               
            var data = await groupClient.getMultipleById(member?.nominations?.map(x => x.groupId));
            if(data !== null)
            {
                setGroups(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

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
        if(member?._id) {
            await userClient.updateUser({...member, id: member._id});
        }
        enqueueSnackbar(`Le profil de ${member?.prenom} ${member?.nom} a été mis à jour.`)
    }

    if(isFecthingUser || !member ) {
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
        <MemberDetails member={member} canEdit={canEdit} setMember={setMember} saveUser={saveUser} />
    
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
            onRowClick={(event, rowData) => rowData.unitId ? navigate("/app/unite/"+rowData.unitId) : navigate("/app/groupe/"+rowData.groupId)}
            />
        </CardContent>
        <FormationMembre formations={member.formations} />
        
    </Paper>
    )
}

export default EditMembre
