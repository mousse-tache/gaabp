import React, { useContext } from "react"
import Loading from "../loading/loading"
import { Paper } from '@material-ui/core';
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import RecommendFormation from "./recommendFormation";

const Formation = () => {
    const authedUser = useContext(UserContext).authedUser;
    
    if(authedUser?._id == undefined) {
        return <Loading />;
    }

    return  (
    <Paper className="membres-paper">        
        <div className="membres-title">
            <div className="membres-title-element"><h3>Formation</h3></div>
        </div>
        {Permissions(authedUser, PermissionTypes.RecommendFormation) && <RecommendFormation />}
    </Paper>
    )
}

export default Formation
