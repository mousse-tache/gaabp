import { useContext } from "react";

import AnonymousUserRouter from "@aabp/components/routers/AnonymousUserRouter";
import NominatedUserRouter from "@aabp/components/routers/NominatedUserRouter";
import AppContext from "@aabp/context/app/appContext";

const AppRouter = () => {
  const { authedUser } = useContext(AppContext);

  return (
    <>
      {authedUser?.nominations?.length > 0 || authedUser?.isAdmin ? (
        <NominatedUserRouter />
      ) : (
        <AnonymousUserRouter />
      )}
    </>
  );
};

export default AppRouter;
