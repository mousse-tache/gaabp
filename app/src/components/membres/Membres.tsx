import { useContext } from "react";

import AppContext from "@aabp/context/app/appContext";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

import Card from "@aabp/components/design-system/Card/Card";
import MembresTable from "./list/MembresTable";

import "./membres.scss";

const Membres = (): React.ReactNode => {
  const { authedUser } = useContext(AppContext);

  return (
    <Card className="membres">
      {!Permissions(PermissionTypes.ViewUsers, authedUser) && (
        <div>Vous n'avez pas accès à consulter la liste des membres</div>
      )}
      {Permissions(PermissionTypes.ViewUsers, authedUser) && (
        <MembresTable
          canEdit={Permissions(PermissionTypes.UpdateUser, authedUser)}
        />
      )}
    </Card>
  );
};

export default Membres;
