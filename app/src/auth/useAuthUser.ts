import AppContext from "@aabp/context/app/appContext";
import { useContext } from "react";

const useAuthUser = (): unknown => {
  const { authedUser } = useContext(AppContext);

  return authedUser;
};

export default useAuthUser;
