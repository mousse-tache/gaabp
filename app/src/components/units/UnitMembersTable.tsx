import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { navigate } from "gatsby";
import MaterialTable from "material-table";
import React, { useContext, useEffect, useState } from "react";

import UnitContext from "@aabp/context/unit/unitContext";

import Button from "../design-system/Button/Button";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import useAuthUser from "@aabp/auth/useAuthUser";
import { sortMemberPriority } from "@aabp/utils/tableExtensions";

const UnitMembersTable = ({
  users,
  unitId,
  removeFromUnit,
}: {
  users: Array<unknown>
  unitId: string
  removeFromUnit: () => void
}): React.ReactNode => {
  const authedUser = useAuthUser();
  const { unit } = useContext(UnitContext);
  const [open, setOpen] = React.useState(false);
  const [userToDelete, setUserToDelete] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setUserToDelete(false);
  };

  const columns = [
    { title: "Nom", field: "prenom" },
    { title: "", field: "nom" },
    { title: "Courriel", field: "courriel" },
    { title: "Début", field: "sd", type: "date" },
    {
      title: "Rôle",
      field: "nominations.type",
      customSort: (a, b) => {
        return sortMemberPriority(a, b);
      },
      defaultSort: "desc",
    },
  ];

  const [state, setState] = React.useState({
    columns,
    data: users,
  });

  useEffect(() => {
    setState({
      columns,
      data: users,
    });
  }, [users, unitId]);

  useEffect(() => {
    if (userToDelete) {
      setOpen(true);
    }
  }, [userToDelete]);

  return (
    <div className="unit-member-table-container">
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Voulez-vous vraiment retiré cette personne de l'unité?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button
            onClick={() => removeFromUnit({ ...userToDelete }) && handleClose()}
            color="primary"
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title={unit?.nom}
        localization={{
          toolbar: {
            searchPlaceholder: "Chercher",
          },
        }}
        options={{
          pageSize: 10,
          exportButton: true,
          exportAllData: true,
        }}
        actions={[
          {
            icon: "delete",
            tooltip: "Retirer de l'unité",
            onClick: (event, rowData) => setUserToDelete(rowData),
            disabled: !Permissions(PermissionTypes.UpdateUnit, authedUser),
          },
        ]}
        columns={state.columns}
        data={state.data}
        onRowClick={(event, rowData) => navigate("/app/membre/" + rowData._id)}
      />
    </div>
  );
};

export default UnitMembersTable;
