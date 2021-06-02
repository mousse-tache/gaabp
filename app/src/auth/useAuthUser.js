import { useContext } from "react";
import AppContext from "@aabp/context/app/appContext";

const useAuthUser = () => {
    const { authedUser } = useContext(AppContext);
    
    return authedUser;
};

export default useAuthUser;