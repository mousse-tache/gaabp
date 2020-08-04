import React, { useState, useEffect } from "react";
import RecensementClient from "../../clients/recensementClient";
import CalculateCost from "./calculateRecensementCost";

const Recensement = ({unitId, unitMembers, uniteCadette}) => {
    const [latestRecensement, setLatestRecensement] = useState({})
    const cost = CalculateCost(unitMembers, uniteCadette)

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
                Aucun recensement n'a été enregistré par le passé. Le coût de recensement actuel serait de {cost.totalPrice}
                <ul>
                    <li>
                        {cost.details.formedUsers} membre(s) de maîtrise formés à 1$ chacun - {cost.details.formedUsers}$
                    </li>
                   { cost.details.adultUsers ? ( <li>
                        {cost.details.adultUsers} membre(s) de maîtrise non formés à 25$ chacun - {cost.details.adultUsers*25}$
                    </li>) : null}
                   { cost.details.others ? (
                    <li>
                        {cost.details.others} membre(s) à {cost.basePrice}$ chacun - {cost.details.others}$
                    </li>
                   ) : null} 
                </ul>
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