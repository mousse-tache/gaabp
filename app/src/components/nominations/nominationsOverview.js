import React, { useState, useContext, useEffect } from "react";
import NominationTypes from "../../utils/nominationTypes";

import { useSnackbar } from 'notistack';
import MaterialTable from "material-table";
import UserContext from "../../context/userContext";
import { navigate } from "gatsby";
import PermissionTypes from "../../auth/permissionTypes";
import CheckIcon from '@material-ui/icons/Check';
import GroupClient from "../../clients/groupClient";
import UnitClient from "../../clients/unitClient";
import NominationClient from "../../clients/nominationClient";
import UserClient from "../../clients/userClient";

const dateFromObjectId = (objectId) => {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};
	
const NominationsOverview = () => {
    const { authedUser} = useContext(UserContext);
    const [nominations, setNominations] = useState([]);
    const nominationClient = new NominationClient("");
    const groupClient = new GroupClient("");
    const unitClient = new UnitClient("");
    const userClient = new UserClient("");
    const [state, setState] = useState({columns: [], data: []})
    const { enqueueSnackbar } = useSnackbar();
    const [groups, setGroups] = useState([]);
    const [units, setUnits] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setState({
            columns: [
                { title: 'Membre', field: 'user', render: row => <span>{users && `${users?.filter(x => x._id == row.user)[0]?.prenom} ${users?.filter(x => x._id == row.user)[0]?.nom}`}</span> },
                { title: 'Rôle', field: 'role', lookup: NominationTypes },
                { title: "Unité", field: "nominations._id", render: row => <span>{(units ? units?.filter(x => x._id === row.unit)[0]?.nom : null) ?? (groups? `Groupe ${groups?.filter(x => x._id === row.group)[0]?.numero} ${groups.filter(x => x._id === row.group)[0]?.nom}` : null)}</span> , editable: 'never'},
                { title: "Date de la demande", field:"_id", render: row => <span>{dateFromObjectId(row._id).toISOString()}</span>}
            ],
            data: nominations,
          });
    }, [nominations, groups, units, users])

    const FetchNominations = async() => {
        try {
            const demandesNomination = await nominationClient.getPending();
            setNominations(demandesNomination);
        } catch (error) {
            enqueueSnackbar(error.toString());
        }
    };

    async function FetchMemberUnits() {
        try {               
            var data = await unitClient.getMultipleById(nominations?.filter(x => x.unit !== "").map(x => x.unit));
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
            var data = await groupClient.getMultipleById(nominations?.filter(x => x.group !== "").map(x => x.group));
            if(data !== null)
            {
                setGroups(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    async function FetchUsers() {
        try {               
            var data = await userClient.getByIds(nominations?.map(x => x.user));
            if(data !== null)
            {
                setUsers(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    }

    useEffect(() => {
        FetchMemberUnits();
        FetchGroups();
        FetchUsers();
    }, [nominations]);

    useEffect(() => {
        FetchNominations();
    }, [])

    return (
        <div>
            <h3>Demandes de nomination</h3>
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