import { useSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";

import {
  Button,
  MenuItem,
  TextField
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

import AppContext from "@aabp/context/app/appContext";
import UnitContext from "@aabp/context/unit/unitContext";

import { isFeatureActivated } from "@aabp/features/useFeatures";

import Accordion from "@aabp/components/design-system/Collapsible/Accordion";

import Loading from "@aabp/components/loading/Loading";
import AddNewUsers from "@aabp/components/recensement/AddNewUsers";
import Recensement from "@aabp/components/recensement/recensement";
import UnitMembersTable from "@aabp/components/units/UnitMembersTable";

import Permissions from "@aabp/auth/permissions";
import PermissionTypes from "@aabp/auth/permissionTypes";
import NominationTypes from "@aabp/utils/nominationTypes";

import UserClient from "@aabp/clients/userClient";

import Features from "@aabp/features/features";

import "../unit.scss";

const UnitRecensementTab = (): React.ReactNode => {
  const { authedUser } = useContext(AppContext);
  const { unit } = useContext(UnitContext);
  const [allMembers, setAllMembers] = useState([]);
  const [selectUser, setSelectUser] = useState({ _id: 0, prenom: "", nom: "" });
  const [selectRole, setSelectRole] = useState(NominationTypes.Membre);
  const [membres, setMembres] = useState([]);
  const [activeMembers, setActiveMembers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const userClient = new UserClient();
  const [query, setQuery] = useState("");

  useEffect(() => {
    FetchAllUsers();
  }, [query]);

  useEffect(() => {
    FetchMembres();
  }, [unit]);

  useEffect(() => {
    FetchMembres();
  }, [unit, selectUser]);

  useEffect(() => {
    if (membres.length == 0) {
      return;
    }
    setActiveMembers(membres);
  }, [membres]);

  async function FetchAllUsers() {
    if (query.length < 3) {
      return;
    }

    try {
      const data = await userClient.searchUsers(query);
      if (data !== null) {
        setAllMembers(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async function FetchMembres() {
    if (!unit?._id) {
      return;
    }

    try {
      const data = await userClient.getByUnitId(unit._id);
      if (data !== null) {
        setMembres(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  const addToUnit = async () => {
    try {
      await userClient.updateUser({
        ...selectUser,
        id: selectUser._id,
        nominations: [
          ...selectUser.nominations,
          { unitId: unit._id, type: selectRole, sd: new Date() },
        ],
      });
      FetchMembres();
      setSelectUser({ _id: 0, prenom: "", nom: "" });
      enqueueSnackbar("Membre ajouté");
    } catch (e) {
      enqueueSnackbar(e);
    }
  };

  const RemoveFromUnit = async (user) => {
    try {
      await userClient.removeFromUnit(user._id, unit._id, user.nominations.type);
      setMembres(membres?.filter((x) => x._id !== user._id));
      enqueueSnackbar("Membre retiré en date d'aujourd'hui");
    } catch (e) {
      enqueueSnackbar(e);
    }
  };

  function handleChangeAutoUser(x) {
    setSelectUser(x);
  }

  if (!membres) {
    return <Loading />;
  }

  return (
    <div>
      <Accordion header="Recensement">
          <Recensement
            unitId={unit._id}
            unitMembers={activeMembers}
            uniteCadette={unit.branche !== 3 && unit.branche !== 4}
          />
      </Accordion>
      {isFeatureActivated(Features.Recensement) && (
        <Accordion header=" Ajouter des membres dans l'unité">
          <div className="w-full">
            <div className="add-user-search">
              <Autocomplete
                fullWidth={true}
                disabled={!Permissions(PermissionTypes.UpdateUnit, authedUser)}
                autoSelect
                blurOnSelect
                disableClearable
                onChange={(event, newValue) => {
                  handleChangeAutoUser(newValue);
                }}
                value={selectUser}
                defaultValue={{ prenom: "", nom: "" }}
                options={allMembers}
                getOptionLabel={(option) => option.prenom + " " + option.nom}
                style={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(event) => setQuery(event.target.value)}
                    label="Cherchez un membre"
                    variant="outlined"
                  />
                )}
              />

              <TextField
                label="Rôle"
                select
                fullWidth
                value={selectRole}
                disabled={
                  !Permissions(PermissionTypes.AddNomination, authedUser)
                }
                variant="outlined"
                onChange={(x) => setSelectRole(x.target.value)}
              >
                {Object.keys(NominationTypes).map((x) => (
                  <MenuItem key={x} value={x}>
                    {NominationTypes[x]}
                  </MenuItem>
                ))}
              </TextField>
              <div className="add-user-button">
                <Button
                  variant={selectUser?._id !== null ? "contained" : "outlined"}
                  color={selectUser?._id !== null ? "primary" : "secondary"}
                  hidden={!Permissions(PermissionTypes.UpdateUnit, authedUser)}
                  disabled={
                    !Permissions(PermissionTypes.UpdateUnit, authedUser) ||
                    selectUser._id === 0
                  }
                  onClick={addToUnit}
                >
                  Ajouter à l'unité
                </Button>
              </div>
            </div>
          </div>
        </Accordion>
      )}
      {Permissions(PermissionTypes.CreateUser, authedUser) &&
        Permissions(PermissionTypes.UpdateUnit, authedUser) &&
        isFeatureActivated(Features.Recensement) && (
          <AddNewUsers
            unitId={unit?._id}
            uniteCadette={
              unit.branche?.couleur !== "Rouge" &&
              unit.branche?.couleur !== "Multibranche"
            }
            triggerUpdateMembres={FetchMembres}
          />
        )}
      <Accordion header="Membres de l'unité">
        <div className="w-full flex flex-col gap-3">
          <ul>
            <li>{activeMembers.length} membre(s) actif(s)</li>
            <li>
              {
                activeMembers.filter(
                  (user) => user.nominations.type === NominationTypes.Membre,
                ).length
              }{" "}
              membre(s) régulier(s)
            </li>
            <li>
              {
                activeMembers.filter(
                  (user) => user.nominations.type !== NominationTypes.Membre,
                ).length
              }{" "}
              membre(s) de maîtrise
            </li>
          </ul>
          <UnitMembersTable
            users={activeMembers}
            unitId={unit._id}
            removeFromUnit={RemoveFromUnit}
          />
        </div>
      </Accordion>
    </div>
  );
};

export default UnitRecensementTab;
