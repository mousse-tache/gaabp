import Drawer from "@material-ui/core/Drawer";
import { navigate } from "gatsby";
import PropTypes from "prop-types";
import { useContext } from "react";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import NouvelleNomination from "@aabp/components/nominations/nouvelle-nomination/NouvelleNomination";
import AppContext from "@aabp/context/app/appContext";
import { List, ListItem, ListItemText, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import MenuButton from "./MenuButton";
import MembresSidebar from "./sidebars/MembresSidebar";
import ProgressionSidebar from "./sidebars/ProgressionSidebar";

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (arg: boolean) => void
}) => {
  const { authedUser } = useContext(AppContext);

  const canAccessMemberSection = Permissions(
    PermissionTypes.ViewUsers,
    authedUser,
  );

  return (
    <Drawer anchor="left" open={open} variant="persistent">
      <div className="sidebar">
        <MenuButton open={open} setOpen={setOpen} />

        <List>
          <ListItem button disableRipple onClick={() => navigate("/app")}>
            <HomeIcon />
            <ListItemText primary="Accueil" />
          </ListItem>
        </List>
        <ProgressionSidebar />
        <List>
          <ListItem
            divider
            button
            disableRipple
            onClick={() => navigate("/app/ressources")}
          >
            <Typography>Ressources</Typography>
          </ListItem>
        </List>
        {canAccessMemberSection && <MembresSidebar />}
        <List>
          <ListItem>
            <NouvelleNomination />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

export default Sidebar;
