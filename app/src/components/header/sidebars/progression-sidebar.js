import React, { useContext } from "react";
import { List, ListItem } from "@material-ui/core";
import { Link, navigate } from "gatsby";
import UserContext from "../../../context/userContext";
import PermissionTypes from "../../../auth/permissionTypes";
import Permissions from "../../../auth/permissions";

const ProgressionSidebar = () => {
    const { authedUser } = useContext(UserContext);

    

    return (
        <div>
            <List>
                <ListItem className="title-list-item" disableGutters divider>
                <Link className="" to="/app/formation" partiallyActive={true} activeClassName="active">
                        Formation
                    </Link>  
                </ListItem>
                {
                    Permissions(authedUser, PermissionTypes.RecommendFormation) &&
                    (<ListItem divider button disableRipple onClick={() => navigate("/app/formation/recommandations")}>     
                        <Link className="" to="/app/formation/recommandations" partiallyActive={true} activeClassName="active">
                            Recommander
                        </Link>  
                    </ListItem>)
                }
                
            </List>
        </div>
    );
};

export default ProgressionSidebar;