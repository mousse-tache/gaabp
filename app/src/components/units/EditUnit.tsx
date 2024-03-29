import { Link, navigate } from "gatsby";
import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";

import { Breadcrumbs, Tab, Tabs, Typography } from "@material-ui/core";

import Features from "@aabp/features/features";
import { isFeatureActivated } from "@aabp/features/useFeatures";

import AppContext from "@aabp/context/app/appContext";
import UnitContext from "@aabp/context/unit/unitContext";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

import Card from "../design-system/Card/Card";
import Loading from "../loading/Loading";
import DeleteUnit from "./operations/DeleteUnit";
import ToggleActivationUnit from "./operations/ToggleActivationUnit";
import CampTab from "./tabs/CampTab";
import UnitRecensementTab from "./tabs/UnitRecensementTab";
import UnitDetails from "./UnitDetails";

import UnitClient from "@aabp/clients/unitClient";

import "./unit.scss";

const EditUnit = ({ id }: { id: string }): React.ReactNode => {
  const { authedUser } = useContext(AppContext);
  const { unit, setUnit } = useContext(UnitContext);
  const [isFetchingUnit, setIsFetchingUnit] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const unitClient = new UnitClient();
  const [tab, setTab] = useState(0);

  useEffect(() => {
    FetchUnit();
  }, [id]);

  async function FetchUnit() {
    try {
      const data = await unitClient.getById(id);
      if (data !== null && data._id) {
        setUnit(data);
      } else {
        navigate("/app/unites");
      }
    } catch (e) {
      console.log(e.message);
      enqueueSnackbar("L'unité n'a pas été trouvée");
      navigate("/app/unites");
    }

    setIsFetchingUnit(false);
  }

  if (isFetchingUnit) {
    return <Loading />;
  }

  return (
    <Card>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Breadcrumbs aria-label="breadcrumb" className="crumbs">
          <Link color="inherit" to="/app/unites">
            Unités
          </Link>
          <Typography color="textPrimary">{`${unit.nom}`}</Typography>
        </Breadcrumbs>
        <div>
          {Permissions(PermissionTypes.DeactivateUnit, authedUser, id) && (
            <ToggleActivationUnit />
          )}
          {Permissions(PermissionTypes.DeleteUnit, authedUser, id) && (
            <DeleteUnit />
          )}
        </div>
      </div>
      <div>
        <Tabs
          value={tab}
          variant="scrollable"
          scrollButtons="auto"
          onChange={(event, newValue) => setTab(newValue)}
          aria-label="simple tabs for user details"
        >
          <Tab label="Informations" />
          <Tab
            label="Recensement"
            disabled={
              !Permissions(PermissionTypes.SubmitRecensement, authedUser, id) ||
              !unit.a
            }
          />
          <Tab
            label="Camps"
            disabled={
              !Permissions(PermissionTypes.SubmitCamp, authedUser, id) ||
              !unit.a ||
              !isFeatureActivated(Features.DemandeDeCamp)
            }
          />
        </Tabs>
        {tab === 0 && (
          <UnitDetails
            disabled={!Permissions(PermissionTypes.UpdateUnit, authedUser, id)}
          />
        )}
        {tab === 1 && <UnitRecensementTab />}
        {tab === 2 && <CampTab />}
      </div>
    </Card>
  );
};

export default EditUnit;
