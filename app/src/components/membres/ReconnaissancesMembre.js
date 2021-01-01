import React, { useContext, useEffect, useState } from "react";

import UserContext from "@aabp/context/userContext";

import DecorationClient from "@aabp/clients/decorationClient";
import Decorations from "@aabp/utils/decorations";

import { CardContent, MenuItem, TextField } from '@material-ui/core';
import MaterialTable from "material-table";
import AppContext from "@aabp/context/appContext";

const ReconnaissancesMembre = () => {
    const { member } = useContext(UserContext);
    const { authedUser } = useContext(AppContext);
    const [decorations, setDecorations] = useState([]);

    const columns = [
        { title: 'Décoration', 
        field: 'type', 
        editComponent: props => (
            <TextField
                label="Rôle"
                select
                value={props.value}
                fullWidth
                onChange={(e) => props.onChange(e.target.value)}
                variant="outlined"
                >
                {Decorations.map(d => <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem>)}
            </TextField>
        ),
        render: rowData => rowData && Decorations.filter(x => x.id == rowData.type)[0]?.name },
        { title: "Obtention", field: 'dateObtention', type:"date"},
        { title: "Commentaires", field:"comments"}
    ]
    const decorationClient = new DecorationClient();

    const init = async() => {
        const data = await decorationClient.getByUser(member?._id)
        if(data) {
            setDecorations(data);
        }
    };

    useEffect(() => {
        
        init();
    }, [member])

    async function saveDecoration(decoration) {
        let dec = {...decoration, membre: member._id};
        const data = await decorationClient.save(dec);
        init();
    }

    return (
        <CardContent>
            <MaterialTable 
                title=""                
                editable={authedUser.isAdmin && {                    
                    onRowAdd: rowData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {    
                                saveDecoration(rowData);
                                resolve();
                            }, 1000);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                saveDecoration(newData);
                                resolve();
                        }, 1000);
                    })
                }}
                columns={columns}
                data={decorations}
            />
        </CardContent>
    );
};

export default ReconnaissancesMembre;