import React, { useState, useEffect } from "react";
import RecensementClient from "../../clients/recensementClient";
import CalculateCost from "./calculateRecensementCost";
import SoumettreRecensement from "./soumettreRecensement";
import PreviewCost from "./previewCost";
import RecensementDetails from "./RecensementDetails";
import Loading from "../loading/loading";
import { Divider } from "@material-ui/core";
import "./recensement.css"
import RecensementContext from "../../context/recensementContext";

const Recensement = ({unitId, unitMembers, uniteCadette}) => {
    const [latestRecensement, setLatestRecensement] = useState(1)
    const cost = CalculateCost(unitMembers, uniteCadette);

    const recensementClient = new RecensementClient();

    const FetchLatestRecensement = async() => {
        try {
            var data = await recensementClient.getLatestByUnitId(unitId);
            setLatestRecensement(data);
        } catch (error) {
            console.log(error);   
            setLatestRecensement(false);
        }
    };

    useEffect(() => {
        FetchLatestRecensement();
    }, [unitId])

    if (latestRecensement == 1) {
        return <Loading />
    }

    return (
        <RecensementContext.Provider value={latestRecensement}>
            <div className="recensement-overview-container">
                <div>
                    <PreviewCost cost={cost} previousRecensement={latestRecensement !== null} />
                    <SoumettreRecensement cost={cost} unitId={unitId} unitMembers={unitMembers} />
                </div>
                <Divider />
                {latestRecensement.recensement !== null && 
                <RecensementDetails />}
            </div>
        </RecensementContext.Provider>
    )
};

export default Recensement;