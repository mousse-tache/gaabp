import React, { useContext, useEffect, useState } from "react";
import { navigate } from "gatsby";
import { useSnackbar } from 'notistack';
import { CardContent } from '@material-ui/core';
import MaterialTable from "material-table";
import CheckIcon from '@material-ui/icons/Check';

import UserContext from "@aabp/context/userContext";
import AppContext from "@aabp/context/appContext";

import PermissionTypes from "@aabp/auth/permissionTypes";
import GroupClient from "@aabp/clients/groupClient";
import UnitClient from "@aabp/clients/unitClient";
import Permissions from "@aabp/auth/permissions";

import NominationsType from "@aabp/utils/nominationTypes";

const NominationsMembres = () => {
    const { authedUser } = useContext(AppContext);
    const { member, setMember, saveUser } = useContext(UserContext);
    const [state, setState] = useState({
        columns: [],
        data: member.nominations,
      });

    const [memberUnits, setMemberUnits] = useState(false);
    const [groups, setGroups] = useState(false);


    const unitClient = new UnitClient();
    const groupClient = new GroupClient();

    const { enqueueSnackbar } = useSnackbar();

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

    useEffect(() => {
        if(member?.nominations) {
            FetchMemberUnits();
            FetchGroups()
        }
    }, [member?.nominations])
      
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

    return (
        <CardContent>
            <MaterialTable
            title=""
            columns={state.columns}
            data={state.data}
            options={
                {
                pageSize: 10,
                search: true,
                grouping: true,
                exportButton: true,
                exportAllData: true
                }
            }
            editable={{
                isEditable: rowData => Permissions(PermissionTypes.RemoveNomination, authedUser),
                isEditHidden: rowData => !Permissions(PermissionTypes.RemoveNomination, authedUser),
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
    );
};

export default NominationsMembres;