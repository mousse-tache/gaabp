import React, { useState } from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Dialog, DialogTitle, Tooltip } from "@material-ui/core";
import Bottin from "../bottin/bottin";
import { Link } from "gatsby";

const Help = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div onClick={() =>setOpen(true)}>
                <Tooltip title="Aide">
                    <IconButton>
                        <HelpOutlineIcon fontSize="large" color="primary" />
                    </IconButton>
                </Tooltip>
            </div>
            <Dialog open={open} onClose={() => {setOpen(false);}}>
                <DialogTitle>
                    <HelpOutlineIcon fontSize="large" color="primary" label="bottin"/>
                    <Link to="/aide" target="_blank">
                        <h3>
                            Centre d'aide
                        </h3>
                    </Link>
                </DialogTitle>
                <Bottin />
            </Dialog>
        </div>
    );

};

export default React.memo(Help);