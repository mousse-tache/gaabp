import { useContext } from "react";
import AppContext from "@aabp/context/appContext";

const useAuthUser = () => {
    const { authedUser } = useContext(AppContext);
    
    return authedUser;
}

export default  useAuthUser;