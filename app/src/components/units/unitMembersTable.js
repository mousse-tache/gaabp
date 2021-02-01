import React, { useContext, useEffect, useState } from 'react';
import Proptypes from "prop-types"
import MaterialTable from 'material-table';
import { navigate } from 'gatsby';

import AppContext from '@aabp/context/appContext';

import { Dialog, DialogTitle, Button, DialogActions } from "@material-ui/core";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import NominationTypes from "@aabp/utils/nominationTypes";


const UnitMembresTable = ({users, unitId, removeFromUnit}) => {
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
      { title: "Rôle", field: 'nominations', render: row => row.nominations.filter(x => x.unitId === unitId)[0]?.type }
      
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
        { title: "Début", field:"sd", type:"date", render: row => row.nominations.filter(x => x.unitId === unitId).sort(function(a, b){return a.sd > b.sd})[0]?.sd},
        { title: "Rôle", field: 'nominations', render: row => NominationTypes[row.nominations.filter(x => x.unitId === unitId && !x.ed)[0]?.type]}
      ],
      data: users,
    });
  }, [users, unitId])

  useEffect(() => {
    if(userToDelete) {
      setOpen(true);
    }
  }, [userToDelete])

  return (
    <div className="unit-member-table-container">
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
          <DialogTitle id="alert-dialog-slide-title">{"Voulez-vous vraiment retiré cette personne de l'unité?"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Non
            </Button>
            <Button onClick={() => removeFromUnit({...userToDelete}) && handleClose()} color="primary">
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
          tooltip: "Retirer de l'unité",
          onClick: (event, rowData) => setUserToDelete(rowData),
          disabled: !Permissions(PermissionTypes.UpdateUnit, authedUser)
        }
      ]}
      columns={state.columns}
      data={state.data}
      onRowClick={(event, rowData) => navigate("/app/membre/"+rowData._id)}
    />
    </div>    
  );
};

UnitMembresTable.propTypes = {
    users: Proptypes.array, 
    unitId: Proptypes.string,
    removeFromUnit: Proptypes.func
};

export default UnitMembresTable;
