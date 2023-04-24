import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import { navigate } from "gatsby";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

import Button from "@aabp/components/design-system/Button/Button";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import useAuthUser from "@aabp/auth/useAuthUser";
import { sortMemberPriority } from "@aabp/utils/tableExtensions";

const GroupMembersTable = ({
  users,
  groupId,
  removeFromGroup,
}: {
  users: Array<unknown>
  groupId: string
  removeFromGroup: () => void
}): React.ReactNode => {
  const authedUser = useAuthUser();
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
    { title: "Fin", field: "ed", type: "date" },
    {
      title: "Rôle",
      field: "nominations",
      render: (row) =>
        row.nominations.filter((x) => x.groupId === groupId)[0]?.type,
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
  }, [users]);

  useEffect(() => {
    if (userToDelete) {
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
        <DialogTitle id="alert-dialog-slide-title">
          {
            "Voulez-vous vraiment retiré cette personne de la maîtrise de groupe?"
          }
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Non
          </Button>
          <Button
            onClick={() =>
              removeFromGroup({ ...userToDelete }) && handleClose()
            }
            color="primary"
          >
            Oui
          </Button>
        </DialogActions>
      </Dialog>
      <MaterialTable
        title=""
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
            tooltip: "Retirer du groupe",
            onClick: (event, rowData) => setUserToDelete(rowData),
            disabled: !Permissions(PermissionTypes.UpdateGroup, authedUser),
          },
        ]}
        columns={state.columns}
        data={state.data}
        onRowClick={(event, rowData) => navigate("/app/membre/" + rowData._id)}
      />
    </div>
  );
};

export default GroupMembersTable;
