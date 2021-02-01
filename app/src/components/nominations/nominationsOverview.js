import React, { useState, useContext, useEffect } from "react";
import NominationTypes from "../../utils/nominationTypes";

import { useSnackbar } from 'notistack';
import MaterialTable from "material-table";
import { navigate } from "gatsby";
import Permissions from "../../auth/permissions"
import PermissionTypes from "../../auth/permissionTypes";
import GroupClient from "../../clients/groupClient";
import UnitClient from "../../clients/unitClient";
import NominationClient from "../../clients/nominationClient";
import UserClient from "../../clients/userClient";
import NominationRowDetail from "./components/nominationRowDetail";
import "./nominations.css";
import { Checkbox } from "@material-ui/core";
import AppContext from "@aabp/context/appContext";

const dateFromObjectId = (objectId) => {
	return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
};
	
const NominationsOverview = () => {
    const { authedUser } = useContext(AppContext);
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
    const [past, setPast] = useState(false);

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
            if(Permissions(PermissionTypes.AddNomination, authedUser)) {
                const demandesNomination = await nominationClient.getNominations(past ? "complete" : "pending");
                setNominations(demandesNomination);
            }
            else {
                const demandesNomination = await nominationClient.getPendingRecommendationForUser(authedUser._id);
                setNominations(demandesNomination);
            }
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

    const ConfirmNomination = async(nomination) => { 
        try {            
            await nominationClient.confirmNomination(nomination._id, authedUser._id)
            enqueueSnackbar("Nomination complétée");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    const RefuseNomination = async(nomination) => { 
        try {            
            await nominationClient.refuseNomination(nomination._id, authedUser._id)
            setNominations(nominations.filter(x => x._id !== nomination._id))
            enqueueSnackbar("Nomination retirée");
        } catch (e) {
            enqueueSnackbar(e);
        }        
    }

    useEffect(() => {
        FetchMemberUnits();
        FetchGroups();
        FetchUsers();
    }, [nominations]);

    useEffect(() => {
        FetchNominations();
    }, [past])

    return (
        <div>
            <h3>Demandes de nomination</h3>
            <h4>Ces demandes de nomination demandent votre attention</h4>
            {
                <MaterialTable
                title={
                    Permissions(PermissionTypes.ValidateNomination, authedUser) &&
                    (<div>
                        Voir demandes complétées
                        <Checkbox checked={past} onChange={() => setPast(!past)} />
                    </div>)
            }
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
                    onRowUpdateCancelled: rowData => enqueueSnackbar("Aucune modification apportée")
                }}

                actions={[
                    rowData => ({
                        icon: 'check',
                        tooltip: "Compléter la nomination (ajoute la nomination en date du jour au dossier du membre, avec toutes les permissions reliées)",
                        onClick: (event, rowData) => ConfirmNomination(rowData),
                        disabled: !Permissions(PermissionTypes.ValidateNomination, authedUser) || rowData.complete
                      }),
                      rowData => ({
                        icon: 'delete',
                        tooltip: "Marque la nomination comme complétée, sans l'ajouter au dossier du membre",
                        onClick: (event, rowData) => RefuseNomination(rowData),
                        disabled: !Permissions(PermissionTypes.ValidateNomination, authedUser) || rowData.complete
                      })
                ]}

                detailPanel={rowData => <NominationRowDetail nomination={rowData} />}

                onRowClick={(event, rowData) => navigate("/app/membre/"+rowData.user)}
                />
            }
        </div>
    );
};

export default NominationsOverview;