import React, { useState, useEffect, useContext } from "react"
import Loading from "../loading/loading"
import GroupClient from "../../clients/groupClient"
import { Input, Paper, Button, Fab, InputLabel, Modal } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import UserContext from "../../context/userContext";
import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";
import RecommendFormation from "./recommendFormation";
import { Helmet } from "react-helmet";
import { useSnackbar } from 'notistack';

const Formation = () => {
    const authedUser = useContext(UserContext).authedUser;
    const [open, setOpen] = React.useState(false);

    const { enqueueSnackbar } = useSnackbar();
    
    const groupClient = new GroupClient();

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };

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
