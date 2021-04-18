import React, { useEffect, useState } from "react";
import { navigate } from "gatsby-link";

import MaterialTable from "material-table";
import { Skeleton } from "@material-ui/lab";

import CampClient from "@aabp/clients/campClient";
import CampSummary from "./campSummary";

const ApprobationCamp = () => {    
    const [camps, setCamps] = useState(null);
    const [init, setInit] = useState(false);

    const campClient = new CampClient();
    
    const GetCamps = async() => {
        await setInit(false);
        var data = await campClient.getList();
        if(data) {
            setCamps(data);
        }

        await setInit(true);
    };

    useEffect(() => {
        GetCamps();
    }, []);

    const cols =  [
        { title: "Unité", field:'unitInfo.nom' },
        { title: "Branche", field: 'unitInfo.branche', lookup: {0: "Bleue", 1: "Jaune", 2: "Verte", 3: "Rouge"}},
        { title:"Début", field:'debutDuCamp'},
        { title: 'Fin', field: 'finDuCamp' },
        { title: 'Approbation', field: "approuve", type: "boolean"},
        { title: 'Approuvé par', field: "approuvePar" }      
      ]

    if(!camps) {
        return <Skeleton />;
    }

    return  (
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
            exportAllData: true
            }
        } 
        columns={cols}
        data={camps} 
        
        detailPanel={rowData => <CampSummary camp={rowData} />}    
        
        onRowClick={(event, rowData) => navigate("/app/unite/"+rowData.unit)}   
        />
    );
};

export default ApprobationCamp;
