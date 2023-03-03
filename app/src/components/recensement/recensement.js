import { Divider } from "@material-ui/core";
import { useEffect, useState } from "react";

import RecensementContext from "@aabp/context/recensementContext";
import Loading from "../loading/Loading";
import CalculateCost from "./calculateRecensementCost";
import PreviewCost from "./previewCost";
import RecensementDetails from "./RecensementDetails";
import SoumettreRecensement from "./SoumettreRecensement";

import RecensementClient from "../../clients/recensementClient";

import "./recensement.css";

const Recensement = ({ unitId, unitMembers, uniteCadette }) => {
  const [latestRecensement, setLatestRecensement] = useState(1);
  const [cost, setCost] = useState(CalculateCost(unitMembers, uniteCadette));

  const recensementClient = new RecensementClient();

  const FetchLatestRecensement = async () => {
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
  }, [unitId]);

  useEffect(() => {
    setCost(CalculateCost(unitMembers, uniteCadette));
  }, [unitMembers]);

  if (latestRecensement == 1) {
    return <Loading />;
  }

  return (
    <RecensementContext.Provider value={latestRecensement}>
      <div className="recensement-overview-container">
        <div>
          <PreviewCost
            cost={cost}
            previousRecensement={latestRecensement !== null}
          />
          <SoumettreRecensement
            cost={cost}
            unitId={unitId}
            unitMembers={unitMembers}
          />
        </div>
        <Divider />
        {latestRecensement.recensement !== null && <RecensementDetails />}
      </div>
    </RecensementContext.Provider>
  );
};

export default Recensement;
