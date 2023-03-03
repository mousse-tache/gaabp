import React, { useContext } from "react";

import { Skeleton } from "@material-ui/lab";

import AppContext from "@aabp/context/app/appContext";

import GlobalReport from "@aabp/components/home/globalReport/GlobalReport";
import Profile from "@aabp/components/profile/profile";
import ApprobationCamp from "@aabp/components/units/camp/ApprobationCamp";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";

const Home = () => {
  const { authedUser, init } = useContext(AppContext);

  if (!init) {
    return <Skeleton />;
  }

  return (
    <div className="flex flex-col">
      {!authedUser.isAdmin &&
        !Permissions(PermissionTypes.ApproveCamp, authedUser) && (
          <div className="m-4">
            <Profile />
          </div>
        )}

      {authedUser.isAdmin && (
        <div className="m-4">
          <GlobalReport />
        </div>
      )}

      {Permissions(PermissionTypes.ApproveCamp, authedUser) && (
        <div className="m-4">
          <ApprobationCamp />
        </div>
      )}
    </div>
  );
};

export default Home;
