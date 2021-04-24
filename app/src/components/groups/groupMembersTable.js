import React, { useEffect, useContext, useState } from 'react';
import Proptypes from "prop-types";
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';
import { Dialog, DialogTitle, Button, DialogActions } from "@material-ui/core";
import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import NominationTypes from "@aabp/utils/nominationTypes";
import AppContext from '@aabp/context/appContext';

const GroupMembresTable = ({users, groupId, removeFromGroup}) => {
  const { authedUser } = useContext(AppContext);
  const [open, setOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(false);
  };

  const [state, setState] = React.useState({
    columns: [
      { title: "Nom", field:'prenom' },
      { title:"", field:'nom'},
      { title: 'Courriel', field: 'courriel' },
      { title: "Début", field:"sd", type:"date"},
      { title: "Fin", field:"ed", type:"date"},
      { title: "Rôle", field: 'nominations', render: row => row.nominations.filter(x => x.groupId === groupId)[0]?.type }
      
    ],
    data: users,
  });

  useEffect(() => {
    setState(
      {
      columns: [
        { title: "Nom", field:'prenom' },
        { title:"", field:'nom'},
        { title: 'Courriel', field: 'courriel' },
        { title: "Début", field:"sd", type:"date", render: row => row.nominations.filter(x => x.groupId === groupId).sort(function(a, b){return a.sd > b.sd;})[0]?.sd},
        { title: "Rôle", field: 'nominations', render: row => NominationTypes[row.nominations.filter(x => x.groupId === groupId && !x.ed)[0]?.type]}
      ],
      data: users,
    });
  }, [users]);

  useEffect(() => {
    if(userToDelete) {
      setOpen(true);
    }
  }, [userToDelete]);

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle id="alert-dialog-slide-title">{"Voulez-vous vraiment retiré cette personne de la maîtrise de groupe?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Non
            </Button>
            <Button onClick={() => removeFromGroup({...userToDelete}) && handleClose()} color="primary">
              Oui
            </Button>
          </DialogActions>
      </Dialog>
      <MaterialTable
      title=""
      localization={{
        toolbar: {
            searchPlaceholder: "Chercher"
        }
      }}
      options={
        {
          pageSize: 10,
          exportButton: true,
          exportAllData: true
        }
      }
      actions={[
        {
          icon: 'delete',
          tooltip: "Retirer du groupe",
          onClick: (event, rowData) => setUserToDelete(rowData),
          disabled: !Permissions(PermissionTypes.UpdateGroup, authedUser)
        }
      ]}
      columns={state.columns}
      data={state.data}
      onRowClick={(event, rowData) => navigate("/app/membre/"+rowData._id)}
    />
    </div>    
  );
};

GroupMembresTable.propTypes = {
    users: Proptypes.array, 
    groupId: Proptypes.string,
    removeFromGroup: Proptypes.func
};

export default GroupMembresTable;
