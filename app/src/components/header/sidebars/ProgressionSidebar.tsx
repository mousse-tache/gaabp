import PermissionTypes from "@aabp/auth/permissionTypes";
import { Link, navigate } from "gatsby";
import React, { useState } from "react";

import usePermissions from "@aabp/auth/usePermissions";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const ProgressionSidebar = (): React.ReactNode => {
  const perms = usePermissions();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <List>
        <ListItem
          button
          disabled={!perms(PermissionTypes.RecommendFormation)}
          onClick={() => setOpen(!open)}
        >
          <ListItemText primary="Progression" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {perms(PermissionTypes.RecommendFormation) && (
              <ListItem
                divider
                button
                disableRipple
                onClick={() => navigate("/app/formation/recommandations")}
              >
                <Link
                  className=""
                  to="/app/formation/recommandations"
                  partiallyActive={true}
                  activeClassName="active"
                >
                  Recommandations
                </Link>
              </ListItem>
            )}
          </List>
        </Collapse>
      </List>
    </div>
  );
};

export default ProgressionSidebar;
