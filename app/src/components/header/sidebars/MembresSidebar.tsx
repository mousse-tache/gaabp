import { Link, navigate } from "gatsby";
import { useState } from "react";

import PermissionTypes from "@aabp/auth/permissionTypes";
import QuickUnits from "../QuickUnits";

import usePermissions from "@aabp/auth/usePermissions";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

const MembresSidebar = () => {
  const perms = usePermissions();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <List>
        <ListItem button onClick={() => setOpen(!open)}>
          <ListItemText primary="Gestion" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              divider
              button
              disableRipple
              onClick={() => navigate("/app/membres")}
            >
              <Link
                className=""
                to="/app/membres"
                partiallyActive={true}
                activeClassName="active"
              >
                Membres
              </Link>
            </ListItem>
            <ListItem
              divider
              button
              disableRipple
              onClick={() => navigate("/app/unites")}
            >
              <Link
                className=""
                to="/app/unites"
                partiallyActive={true}
                activeClassName="active"
              >
                Unités
              </Link>
            </ListItem>
            <ListItem
              divider
              button
              disableRipple
              onClick={() => navigate("/app/groupes")}
            >
              <Link
                className=""
                to="/app/groupes"
                partiallyActive={true}
                activeClassName="active"
              >
                Groupes
              </Link>
            </ListItem>
            {perms(PermissionTypes.ViewRecensementSummary) && (
              <ListItem
                divider
                button
                disableRipple
                onClick={() => navigate("/app/recensements")}
              >
                <Link
                  className=""
                  to="/app/recensements"
                  partiallyActive={true}
                  activeClassName="active"
                >
                  Recensements
                </Link>
              </ListItem>
            )}
            <ListItem
              divider
              button
              disableRipple
              onClick={() => navigate("/app/nominations")}
            >
              <Link
                className=""
                to="/app/nominations"
                partiallyActive={true}
                activeClassName="active"
              >
                Nominations
              </Link>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <QuickUnits />
    </div>
  );
};

export default MembresSidebar;
