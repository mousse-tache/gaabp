import React, { useState, useEffect } from "react";
import RecensementClient from "../../clients/recensementClient";
import CalculateCost from "./calculateRecensementCost";
import SoumettreRecensement from "./soumettreRecensement";
import PreviewCost from "./previewCost";
import RecensementDetails from "./RecensementDetails";

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

    return (
        <div>
            <PreviewCost cost={cost} previousRecensement={latestRecensement} />
            <SoumettreRecensement cost={cost} unitId={unitId} unitMembers={unitMembers} />
            {latestRecensement && 
            <RecensementDetails recensement={latestRecensement} />}
        </div>
    )
};

export default Recensement;