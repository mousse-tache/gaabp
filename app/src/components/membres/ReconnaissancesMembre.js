import React, { useContext, useEffect, useState } from "react";

import UserContext from "@aabp/context/userContext";

import DecorationClient from "@aabp/clients/decorationClient";
import Decorations from "@aabp/utils/decorations";

import { CardContent } from '@material-ui/core';
import MaterialTable from "material-table";

const ReconnaissancesMembre = () => {
    const { member } = useContext(UserContext);
    const [decorations, setDecorations] = useState([]);

    const columns = [
        { title: 'Décoration', field: 'type', render: rowData => rowData && Decorations.filter(x => x.id == rowData.type)[0].name },
        { title: "Obtention", field: 'dateObtention', type:"date"},
        { title: "", field:"comments"}
    ]
    const decorationClient = new DecorationClient()

    useEffect(() => {
        const init = async() => {
            const data = await decorationClient.getByUser(member?._id)
            if(data) {
                setDecorations(data);
            }
        };
        
        init();
    }, [member])

    return (
        <CardContent>
            <MaterialTable 
                title=""
                columns={columns}
                data={decorations}
            />
        </CardContent>
    );
};

export default ReconnaissancesMembre;