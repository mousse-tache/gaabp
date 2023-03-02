import { Dialog, DialogTitle, IconButton, Tooltip } from "@material-ui/core";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Link } from "gatsby";
import React, { useState } from "react";
import Bottin from "../bottin/Bottin";

const Help = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <Tooltip title="Aide">
          <IconButton>
            <HelpOutlineIcon fontSize="large" color="primary" />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <HelpOutlineIcon fontSize="large" color="primary" label="bottin" />
          <Link to="/aide" target="_blank">
            <h3>Centre d'aide</h3>
          </Link>
        </DialogTitle>
        <Bottin />
      </Dialog>
    </div>
  );
};

export default React.memo(Help);
