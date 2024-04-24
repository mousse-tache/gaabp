import {
  MenuItem,
  TextField
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useState } from "react";

import Button from "../design-system/Button/Button";
import Accordion from "../design-system/Collapsible/Accordion";
import List from "../design-system/List/List";
import ListItem from "../design-system/List/ListItem";

import UserClient from "../../clients/userClient";
import NominationTypes from "../../utils/nominationTypes";
import AddIcon from "../design-system/Icons/AddIcon";
import CloseIcon from "../design-system/Icons/CloseIcon";


const AddNewUsers = ({ unitId, triggerUpdateMembres }: {
  unitId: string
  triggerUpdateMembres: () => void
}): React.ReactNode => {
  const defaultUserState = {
    prenom: "",
    nom: "",
    courriel: "",
    details: {},
    nominations: [
      { type: NominationTypes.Membre, unitId: unitId, sd: new Date() },
    ],
  };
  const [usersToCreate, setUsersToCreate] = useState([]);
  const [nextUserToCreate, setNextUserToCreate] = useState(defaultUserState);

  const { enqueueSnackbar } = useSnackbar();

  const userClient = new UserClient();

  const addUsers = async () => {
    try {
      await userClient.addUsers(usersToCreate);
      setUsersToCreate([]);
      setNextUserToCreate(defaultUserState);
      triggerUpdateMembres();
      enqueueSnackbar("Membres créés");
    } catch (e) {
      enqueueSnackbar(e);
    }
  };

  const addPreviewUser = () => {
    setUsersToCreate([...usersToCreate, nextUserToCreate]);
    setNextUserToCreate(defaultUserState);
  };

  const removeRow = (userRow) => {
    setUsersToCreate(usersToCreate.filter((x) => x !== userRow));
  };

  return (
    <Accordion header="Recenser des membres pour la première fois">
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full">
          <List className="flex flex-col w-full">
            <ListItem className="flex flex-row flex-wrap justify-between self-auto w-full gap-3">
              <TextField
                className="w-56"
                fullWidth
                required
                value={nextUserToCreate.prenom}
                onChange={(x) =>
                  setNextUserToCreate({
                    ...nextUserToCreate,
                    prenom: x.target.value,
                  })
                }
                label="Prénom"
              />
              <TextField
                className="w-56"
                fullWidth
                required
                value={nextUserToCreate.nom}
                onChange={(x) =>
                  setNextUserToCreate({
                    ...nextUserToCreate,
                    nom: x.target.value,
                  })
                }
                label="Nom"
              />
              <TextField
                className="w-56"
                fullWidth
                value={nextUserToCreate.courriel}
                onChange={(x) =>
                  setNextUserToCreate({
                    ...nextUserToCreate,
                    courriel: x.target.value,
                  })
                }
                label="Courriel de contact"
              />
              <TextField
                className="w-56"
                label="Rôle"
                select
                fullWidth
                value={nextUserToCreate.nominations[0].type}
                onChange={(x) =>
                  setNextUserToCreate({
                    ...nextUserToCreate,
                    nominations: [
                      {
                        ...nextUserToCreate.nominations[0],
                        type: x.target.value,
                      },
                    ],
                  })
                }
              >
                {Object.keys(NominationTypes).map((x) => (
                  <MenuItem key={x} value={x}>
                    {NominationTypes[x]}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                disabled={
                  nextUserToCreate.prenom == "" || nextUserToCreate.nom == ""
                }
                onClick={addPreviewUser}
              >
                <AddIcon />
              </Button>
            </ListItem>
            {usersToCreate.length > 0 && (
              <ListItem>
                <span className="text-xl">Membres qui seront ajoutés:</span>
              </ListItem>
            )}
            {usersToCreate.map((x, index) => (
              <ListItem
                key={index}
                className="flex flex-row flex-wrap justify-between w-full max-w-full gap-3"
                divider
              >
                <TextField 
                className="w-56" fullWidth value={x.prenom} label="Prénom" />
                <TextField 
                className="w-56" fullWidth value={x.nom} label="Nom" />
                <TextField
                  className="w-56"
                  fullWidth
                  value={nextUserToCreate.courriel}
                  label="Courriel de contact"
                />
                <TextField
                  className="w-56"
                  label="Rôle"
                  select
                  fullWidth
                  value={x.nominations[0].type}
                >
                  {Object.keys(NominationTypes).map((y, index) => (
                    <MenuItem key={index} value={y}>
                      {NominationTypes[y]}
                    </MenuItem>
                  ))}
                </TextField>
                <Button onClick={() => removeRow(x)}>
                  <CloseIcon />
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      {usersToCreate.length > 0 && (
        <div className="flex flex-row-reverse gap-3 justify-items-end">
          <Button
            size="small"
            onClick={() =>
              setUsersToCreate([]) && setNextUserToCreate(defaultUserState)
            }
          >
            Annuler
          </Button>
          <Button 
            size="small" 
            color="secondary" 
            onClick={addUsers}>
            Sauvegarder
          </Button>
        </div>
      )}
      </div>
    </Accordion>
  );
};

export default AddNewUsers;
