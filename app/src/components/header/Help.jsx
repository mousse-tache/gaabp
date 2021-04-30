import React, { useState } from "react";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { IconButton, Dialog, DialogTitle } from "@material-ui/core";
import Bottin from "../bottin/bottin";

const Help = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div onClick={() =>setOpen(true)}>
                Aide <IconButton>
                    <HelpOutlineIcon fontSize="large" color="primary" />
                </IconButton>
            </div>
            <Dialog open={open} onClose={() => {setOpen(false);}}>
                <DialogTitle>
                    <HelpOutlineIcon fontSize="large" color="primary" label="bottin"/>
                </DialogTitle>
                <Bottin />
            </Dialog>
        </div>
    );

};

export default React.memo(Help);