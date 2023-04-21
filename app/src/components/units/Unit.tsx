import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

import { Fab, MenuItem, Modal, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import Button from "../design-system/Button/Button";
import Card from "../design-system/Card/Card";
import Loading from "../loading/Loading";
import UnitTable from "./unitTable";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import GroupClient from "@aabp/clients/groupClient";
import UnitClient from "@aabp/clients/unitClient";
import Branches from "@aabp/utils/branches";
import Genre from "@aabp/utils/genre";

import useAuthUser from "@aabp/auth/useAuthUser";

import "./unit.scss";

const Unit = () => {
  const authedUser = useAuthUser();
  const [unitList, setUnitList] = useState([]);
  const [isFetchingUnitList, setIsFetchingUnitList] = useState(true);
  const [isFetchingGroupList, setIsFetchingGroupList] = useState(true);
  const [unit, setUnit] = useState({
    group: "0",
    nom: null,
    branche: null,
    genre: null,
  });
  const [open, setOpen] = React.useState(false);

  const [groupList, setGroupList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const unitClient = new UnitClient();
  const groupClient = new GroupClient();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function FetchGroups() {
      try {
        const data = await groupClient.getGroups();
        if (data !== null) {
          setGroupList(data);
          setIsFetchingGroupList(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    async function FetchUnits() {
      try {
        const data = await unitClient.getUnits();
        if (data !== null) {
          setUnitList(data);
        }
      } catch (e) {
        console.log(e.message);
      }

      setIsFetchingUnitList(false);
    }
    FetchUnits();
    FetchGroups();
  }, []);

  async function AddUnit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      setUnitList([...unitList, unit]);
      await unitClient.addUnit(unit);
      setOpen(false);
      enqueueSnackbar("L'unité " + unit.nom + " a été créée");
    } catch (e) {
      console.log(e);
    }
  }

  if (isFetchingUnitList || isFetchingGroupList) {
    return <Loading />;
  }

  return (
    <Card>
      <h2 className="membres-title">
        <span className="membres-title-element">Liste des unités</span>
        <span className="membres-title-element">
          <Fab
            aria-label="add"
            size="small"
            color="secondary"
            disabled={!Permissions(PermissionTypes.CreateUnit, authedUser)}
            onClick={handleOpen}
          >
            <AddIcon />
          </Fab>
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
          <div className="close-icon">
            <Fab
              aria-label="close"
              size="small"
              color="secondary"
              onClick={handleClose}
            >
              <CloseIcon />
            </Fab>
          </div>
          <form className="unit-modal-content">
            <h3>Nouvelle unité</h3>

            <TextField
              label="Nom de l'unité"
              fullWidth
              type="text"
              value={unit.nom}
              placeholder="1ère Troupe de Glasgow"
              onChange={(event) =>
                setUnit({ ...unit, nom: event.target.value })
              }
            />

            <TextField
              select
              label="Group"
              fullWidth
              value={unit.group}
              onChange={(event) =>
                setUnit({ ...unit, group: event.target.value })
              }
              displayEmpty
            >
              <MenuItem value="0" disabled>
                Glasgow
              </MenuItem>
              {groupList.map((x) => (
                <MenuItem key={x._id} value={x._id}>
                  {x.numero} {x.nom}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Branche"
              fullWidth
              value={unit.branche}
              onChange={(x) => setUnit({ ...unit, branche: x.target.value })}
            >
              {Branches.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.couleur}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Type"
              fullWidth
              value={unit.genre}
              onChange={(x) => setUnit({ ...unit, genre: x.target.value })}
            >
              {Genre.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.nom}
                </MenuItem>
              ))}
            </TextField>

            <Button
              className="submit-button"
              color="secondary"
              disabled={!Permissions(PermissionTypes.CreateUser, authedUser)}
              onClick={AddUnit}
            >
              Ajouter
            </Button>
          </form>
        </Card>
      </Modal>

      <UnitTable
        units={unitList}
        canEdit={Permissions(PermissionTypes.UpdateUnit, authedUser)}
      />
    </Card>
  );
};

export default Unit;
