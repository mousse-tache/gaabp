import React, { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";

import AppContext from "@aabp/context/appContext";

import { Checkbox } from "@material-ui/core";
import MaterialTable from "material-table";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

import RecensementClient from "@aabp/clients/recensementClient";
import UnitClient from "@aabp/clients/unitClient";

const RecensementOverview = () => {
    const { authedUser } = useContext(AppContext);
    const [recensements, setRecensements] = useState([]);
    const [units, setUnits] = useState([]);
    const recensementClient = new RecensementClient();
    const unitClient = new UnitClient();
    const [paid, setPaid] = useState(false);

    const cols = [
        { title:"Unité", field:'unitId', render: row => units.filter(x => x._id === row.unitId)[0]?.nom},
        { title: 'Date de soumission du recensement', field: 'date' },
        { title: 'Coût total', field: 'details.cost.totalPrice', render: row => `${row.details.cost.totalPrice}$`},
        { title: 'Paiement complété', field: 'paiementComplet', render: row => row.paiementComplet ? "Oui" : "Non"}
      ];

    const confirmPaiement = async(recensement) => {
        await recensementClient.updateRecensement({...recensement, paiementComplet: true, datePaiement: new Date()})
        window.location.reload();
    };

    const removeRecensement = async(recensement) => {
        await recensementClient.removeRecensement(recensement);
        setRecensements(recensements.filter(x => x._id !== recensement._id));
    };

    const FetchRecensements = async() => {
        try {
            var data = await recensementClient.getByPayment(paid);
            setRecensements(data);
        } catch (error) {
            console.log(error);
        }
    };

    const FetchUnits = async() => {
        try {               
            var data = await unitClient.getMultipleById(recensements.map(x => x.unitId));
            if(data !== null)
            {
                setUnits(data);
            }            
        } catch (e) {
            console.log(e.message);   
        }
    };

    useEffect(() => {
        FetchRecensements();
    },[paid]);

    useEffect(() => {
        FetchUnits();
    }, [recensements])

    return (
            <div>
                <h3>
                    Recensements
                </h3>
                <h4>
                    Montrer les recensements payés
                    <Checkbox value={paid} onClick={() => setPaid(!paid)} />
                </h4>
                <MaterialTable
                    title=""
                    localization={{
                        toolbar: {
                            searchPlaceholder: "Chercher"
                        },
                        body: {
                            deleteTooltip: "Supprimer",
                            editTooltip: "Modifier",
                            addTooltip: "Nouveau"
                        }
                    }}
                    options={
                        {
                        pageSize: 10,
                        headerStyle: {
                            zIndex: 8
                        },
                        exportButton: true
                        }
                    }
                    actions={[
                        rowData => ({
                            icon: 'payment',
                            tooltip: "Confirmer le paiement",
                            onClick: (event, rowData) => confirmPaiement(rowData),
                            disabled: rowData.paiementComplet === true || !Permissions(PermissionTypes.ViewRecensementSummary, authedUser) 
                        }),
                        rowData => ({
                            icon: 'delete',
                            tooltip: "Supprimer le recensement",
                            onClick: (event, rowData) => removeRecensement(rowData),
                            disabled: rowData.paiementComplet === true || !Permissions(PermissionTypes.ViewRecensementSummary, authedUser) 
                        })
                    ]}
                    onRowClick={(event, rowData) => navigate("/app/unite/"+rowData.unitId)}
                    columns={cols}
                    data={recensements}     
                />
            </div>
    )
};

export default RecensementOverview;