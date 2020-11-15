import React, { useState, useEffect } from "react";
import RecensementClient from "../../clients/recensementClient";
import CalculateCost from "./calculateRecensementCost";
import SoumettreRecensement from "./soumettreRecensement";
import PreviewCost from "./previewCost";
import RecensementDetails from "./RecensementDetails";
import Loading from "../loading/loading";
import { Divider } from "@material-ui/core";
import "./recensement.css"

const Recensement = ({unitId, unitMembers, uniteCadette}) => {
    const [latestRecensement, setLatestRecensement] = useState(1)
    const cost = CalculateCost(unitMembers, uniteCadette)

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
    }, [])

    if (latestRecensement == 1) {
        return <Loading />
    }

    return (
        <div className="recensement-overview-container">
            <div>
                <PreviewCost cost={cost} previousRecensement={latestRecensement !== null} />
                <SoumettreRecensement cost={cost} unitId={unitId} unitMembers={unitMembers} />
            </div>
            <Divider />
            {latestRecensement !== null && 
            <RecensementDetails recensement={latestRecensement.recensement} users={latestRecensement.users} usersNonRecenses={latestRecensement.usersNonRecenses} />}
        </div>
    )
};

export default Recensement;