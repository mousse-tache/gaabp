import React, { useState, useEffect, useContext } from "react";
import { navigate } from "gatsby";

import AppContext from "@aabp/context/appContext";

import { Checkbox } from "@material-ui/core";
import MaterialTable from "material-table";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

import RecensementClient from "@aabp/clients/recensementClient";

const RecensementOverview = () => {
    const { authedUser } = useContext(AppContext);
    const [recensements, setRecensements] = useState([]);
    const recensementClient = new RecensementClient();
    const [paid, setPaid] = useState(false);

    const cols = [
        { title:"Unité", field:'unit.nom'},
        { title: 'Date de soumission du recensement', field: 'date' },
        { title: 'Coût total', field: 'details.cost.totalPrice', render: row => `${row.details.cost.totalPrice}$`},
        { title: 'Paiement complété', field: 'paiementComplet' }
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
            setRecensements(data.map(x => {
                return {...x, paiementComplet: paid ? "Oui" : "Non"};
            }));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        FetchRecensements();
    },[paid]);

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
                        exportButton: true,
                        exportAllData: true
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