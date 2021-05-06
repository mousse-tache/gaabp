import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import MaterialTable from "material-table";
import { Alert, Skeleton } from "@material-ui/lab";
import { Card } from "@material-ui/core";

import CampClient from "@aabp/clients/campClient";
import CampSummary from "./CampSummary";

import PermissionTypes from "@aabp/auth/permissionTypes";
import Permissions from "@aabp/auth/permissions";
import useAuthUser from "@aabp/auth/useAuthUser";

const ApprobationCamp = () => {    
    const authedUser = useAuthUser();
    const [camps, setCamps] = useState(null);
    const [init, setInit] = useState(false);

    const campClient = new CampClient();
    const { enqueueSnackbar } = useSnackbar();
    
    const GetCamps = async() => {
        await setInit(false);
        var data = await campClient.getList();
        if(data) {
            setCamps(data);
        }

        await setInit(true);
    };

    const SaveCamp = async(camp) => {
        await campClient.save(camp);
        GetCamps();
    };

    const AutorizeCamp = async(camp) => {
        await campClient.save({...camp, approuvePar: {id: authedUser._id, nom: `${authedUser.prenom} ${authedUser.nom}`}, approuve: true});
        GetCamps();
    };

    useEffect(() => {
        GetCamps();
    }, []);

    const cols =  [
        { title: "Unité", field:'unitInfo.nom', render: row => <a href={`/app/unite/${row.unit}`} rel="noreferrer" target="_blank">{row?.unitInfo?.nom}</a>, editable: false },
        { title: "Branche", field: 'unitInfo.branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Verte", 3: "Rouge"}, editable:false},
        { title:"Début", field:'debutDuCamp', type: "date"},
        { title: 'Fin', field: 'finDuCamp', type: "date"},
        { title: 'Autorisation émise', field: "approuve", type: "boolean", editable: false },
        { title: 'Émission par', field: "approuvePar.nom", editable: false },      
        { title: "URL de l'évaluation (https://...)", field: "evaluation", render: (row) => {
            return <a href={row.evaluation} rel="noreferrer" target="_blank">{row.evaluation}</a>;
        } },
        { title: 'Notes', field: "comments" },      
    ];

    if(!camps) {
        return <Skeleton />;
    }

    return  (
        <Card>
            <Alert severity="info">
                Les évaluations de camp doivent être conduites selon le formulaire officiel d'évaluation.
            </Alert>
            <MaterialTable
            title="Camps"
            isLoading={!init}
            localization={{
                toolbar: {
                    searchPlaceholder: "Chercher"
                }
            }}
            options={
                {
                pageSize: 10,
                exportButton: true,
                exportAllData: true,
                filtering: true
                }
            } 
            columns={cols}
            data={camps} 
            
            detailPanel={
                [
                    {
                        tooltip: 'Sommaire',
                        icon: 'list',
                        render: rowData => {
                        return (
                            <CampSummary camp={rowData} />
                        );
                        },
                    }
                ]}
                
            editable={{
                isEditable: () => Permissions(PermissionTypes.ApproveCamp, authedUser),
                isEditHidden: () => !Permissions(PermissionTypes.ApproveCamp, authedUser),
                onRowUpdateCancelled: () => enqueueSnackbar("Aucune modification apportée"),
                onRowUpdate: (newData) =>
                            new Promise((resolve) => {
                                setTimeout(() => {
                                    SaveCamp(newData);
                                    resolve();
                            }, 1000);
                })
            }} 

            actions={[
                rowData => ({
                    icon: 'check',
                    tooltip: "Autoriser la tenue du camp",
                    onClick: (event, rowData) => AutorizeCamp(rowData),
                    disabled: !Permissions(PermissionTypes.ApproveCamp, authedUser) || rowData.approuve
                })
            ]}
            />
        </Card>
        
    );
};

export default ApprobationCamp;
