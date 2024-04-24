import { Input, InputLabel, Modal } from "@material-ui/core";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";

import AppContext from "@aabp/context/app/appContext";

import Button from "@aabp/components/design-system/Button/Button";
import Card from "../design-system/Card/Card";
import Loading from "../loading/Loading";
import GroupTable from "./GroupTable";

import Permissions from "../../auth/permissions";
import PermissionTypes from "../../auth/permissionTypes";

import GroupClient from "../../clients/groupClient";
import AddIcon from "../design-system/Icons/AddIcon";
import CloseIcon from "../design-system/Icons/CloseIcon";

const Group = (): React.ReactNode => {
  const { authedUser } = useContext(AppContext);
  const [groupList, setGroupList] = useState([]);
  const [numero, setNumero] = useState(null);
  const [ville, setVille] = useState(null);
  const [nom, setNom] = useState(null);
  const [isFetchingGroupList, setIsFetchingGroupList] = useState(true);
  const [open, setOpen] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const groupClient = new GroupClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    FetchGroups();
  }, []);

  async function FetchGroups() {
    try {
      const data = await groupClient.getGroups();
      if (data !== null) {
        setGroupList(data);
      }
    } catch (e) {
      console.log(e.message);
    }

    setIsFetchingGroupList(false);
  }

  async function AddGroup(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await groupClient.addGroup({ nom: nom, numero: numero, ville: ville });
      FetchGroups();
      setOpen(false);
      setNom(null);
      setVille(null);
      setNumero(null);
      enqueueSnackbar("Le groupe " + nom + " a été créé");
    } catch (e) {
      console.log(e);
    }
  }

  if (isFetchingGroupList) {
    return <Loading />;
  }

  return (
    <Card className="membres">
      <h2 className="membres-title">
        <span className="membres-title-element">Groupes</span>
        <span className="membres-title-element">
          <Button
            size="small"
            color="secondary"
            disabled={!Permissions(PermissionTypes.CreateGroup, authedUser)}
            onClick={handleOpen}
          >
            <AddIcon />
          </Button>
        </span>
      </h2>
      <Modal
        className="unit-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card>
          <form className="unit-modal-content">
            <div className="close-icon">
              <Button
                aria-label="add"
                size="small"
                color="secondary"
                onClick={handleClose}
              >
                <CloseIcon />
              </Button>
            </div>
            <h3>Nouveau groupe</h3>

            <InputLabel>Numéro</InputLabel>
            <Input
              fullWidth
              type="text"
              value={numero}
              required={true}
              placeholder="1er"
              onChange={(event) => setNumero(event.target.value)}
            />

            <InputLabel>Nom du groupe</InputLabel>
            <Input
              fullWidth
              type="text"
              value={nom}
              placeholder="Group de Glasgow"
              onChange={(event) => setNom(event.target.value)}
            />

            <InputLabel>Ville</InputLabel>
            <Input
              fullWidth
              type="text"
              value={ville}
              placeholder="Glasgow"
              onChange={(event) => setVille(event.target.value)}
            />

            <Button
              className="submit-button"
              variant="contained"
              color="secondary"
              disabled={
                !Permissions(PermissionTypes.CreateUser, authedUser) ||
                nom === null ||
                numero === null ||
                ville == null
              }
              onClick={AddGroup}
            >
              Ajouter
            </Button>
          </form>
        </Card>
      </Modal>

      <GroupTable groups={groupList} canSee={true} />
    </Card>
  );
};

export default Group;
