import React, { useState, useEffect } from "react";
import RecensementClient from "../../clients/recensementClient";
import CalculateCost from "./calculateRecensementCost";

const Recensement = ({unitId, unitMembers}) => {
    const [latestRecensement, setLatestRecensement] = useState({})

    const recensementClient = new RecensementClient();

    const FetchLatestRecensement = async() => {
        try {
            var data = await recensementClient.getLatestByUnitId(unitId);
            setLatestRecensement(data);
            console.log(data)
        } catch (error) {
            console.log(error);   
            setLatestRecensement(false);
        }
    };

    useEffect(() => {
        FetchLatestRecensement();
    }, [])

    if (!latestRecensement) {
        return (
            <div>
                Aucun recensement n'a été enregistré par le passé. Le coût de recensement actuel serait de {CalculateCost(unitMembers)}
            </div>
        )
    }

    return (
        <div>
            {unitId}
        </div>
    )
};

export default Recensement;