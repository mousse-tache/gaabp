import { Dialog, DialogTitle, Tooltip } from "@material-ui/core";
import { Link } from "gatsby";
import React, { useState } from "react";
import Bottin from "../bottin/Bottin";
import Button from "../design-system/Button/Button";
import HelpIcon from "../design-system/Icons/HelpIcon";

const Help = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div onClick={() => setOpen(true)}>
        <Tooltip title="Aide">
          <Button color="ghost">
            <HelpIcon />
          </Button>
        </Tooltip>
      </div>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <HelpIcon />
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
