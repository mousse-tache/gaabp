import React, { useState, useContext, useEffect } from "react";
import NominationTypes from "../../utils/nominationTypes";
import UserClient from "../../clients/userClient";

import { useSnackbar } from 'notistack';
import MaterialTable from "material-table";
import UserContext from "../../context/userContext";
import { navigate } from "gatsby";
import PermissionTypes from "../../auth/permissionTypes";
import CheckIcon from '@material-ui/icons/Check';
import GroupClient from "../../clients/groupClient";
import UnitClient from "../../clients/unitClient";

const NominationsOverview = () => {
    const { authedUser} = useContext(UserContext);
    const [nominations, setNominations] = useState([]);
    const userClient = new UserClient("");
    const groupClient = new GroupClient("");
    const unitClient = new UnitClient("");
    const [state, setState] = useState({columns: [], data: []})
    const { enqueueSnackbar } = useSnackbar();
    const [groups, setGroups] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        setState({
            columns: [
                { title: 'Membre', field: 'nom'},
                { title: 'Rôle', field: 'type', lookup: NominationTypes },
                { title: "Unité", field: "nominations._id", render: row => <span>{(units ? units?.filter(x => x._id === row.unitId)[0]?.nom : null) ?? (groups? `Groupe ${groups?.filter(x => x._id === row.groupId)[0]?.numero} ${groups.filter(x => x._id === row.groupId)[0]?.nom}` : null)}</span> , editable: 'never'},
                { title: "Début", field:"sd", type:"date"},
                { title: "Fin", field:"ed", type:"date", defaultSort: "asc"},
                { title: "Nomination approuvée", field: "approved", type:"boolean", render: row => row.approved ? <CheckIcon color="primary" /> : "" }
            ],
            data: nominations,
          });
    }, [nominations, groups, units])

    const FetchNominations = async() => {
        try {
            const users = await userClient.searchUsersWithPendingNominations();
            const nominationsFlat =[];
            users.forEach(user => {
                user.nominations.filter(n => n.type !== "Membre" && !n.approved && !n.ed).forEach(n => {
                    nominationsFlat.push({...n, _id: user._id, nom: `${user.prenom} ${user.nom}`})
                })
            });

            setNominations(nominationsFlat);
        } catch (error) {
            enqueueSnackbar(error.toString());
        }
    };

    async function FetchMemberUnits() {
        try {               
            var data = await unitClient.getMultipleById(nominations?.map(x => x.unitId));
            if(data !== null)
            {
                setUnits(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    async function FetchGroups() {
        try {               
            var data = await groupClient.getMultipleById(nominations?.map(x => x.groupId));
            if(data !== null)
            {
                setGroups(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    useEffect(() => {
        FetchMemberUnits();
        FetchGroups();
    }, [nominations]);

    useEffect(() => {
        FetchNominations();
    }, [])

    return (
        <div>
            <h3>Nominations en attente</h3>
            {
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
                //     onRowUpdate: (newData, oldData) =>
                //     new Promise((resolve, reject) => {
                //         setTimeout(() => {
                //             const index = oldData.tableData.id;
                //             let nominations = member?.nominations;
                //             nominations[index] = newData;
                //             nominations[index].approvedBy = authedUser._id;
                //             setMember({...member, nominations: nominations})
                //             saveUser();
                //             resolve();
                //     }, 1000);
                // })

                }}
                onRowClick={(event, rowData) => navigate("/app/membre/"+rowData._id)}
                />
            }
        </div>
    );
};

export default NominationsOverview;