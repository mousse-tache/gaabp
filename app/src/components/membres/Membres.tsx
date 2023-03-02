import { useContext } from "react";

import AppContext from "@aabp/context/app/appContext";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import { Paper } from "@material-ui/core";

import MembresTable from "./list/MembresTable";

import "./membres.scss";

const Membres = () => {
  const { authedUser } = useContext(AppContext);

  return (
    <Paper className="membres">
      {!Permissions(PermissionTypes.ViewUsers, authedUser) && (
        <div>Vous n'avez pas accès à consulter la liste des membres</div>
      )}
      {Permissions(PermissionTypes.ViewUsers, authedUser) && (
        <MembresTable
          canEdit={Permissions(PermissionTypes.UpdateUser, authedUser)}
        />
      )}
    </Paper>
  );
};

export default Membres;
