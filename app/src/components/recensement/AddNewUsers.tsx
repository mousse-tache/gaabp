import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  ListItem,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import CloseIcon from "@material-ui/icons/Close";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSnackbar } from "notistack";
import { useState } from "react";
import UserClient from "../../clients/userClient";
import NominationTypes from "../../utils/nominationTypes";

const AddNewUsers = ({ unitId, triggerUpdateMembres }) => {
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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5">
          Recenser des membres pour la première fois
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div className="add-new-users-recensement">
          <List className="add-new-users-recensement">
            <ListItem className="add-new-users-recensement-item" divider>
              <TextField
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
                <AddCircleOutlineIcon
                  size="large"
                  color={
                    nextUserToCreate.prenom == "" || nextUserToCreate.nom == ""
                      ? "inherit"
                      : "primary"
                  }
                />
              </Button>
            </ListItem>
            {usersToCreate.length > 0 && (
              <ListItem>
                <Typography>Membres qui seront ajoutés:</Typography>
              </ListItem>
            )}
            {usersToCreate.map((x, index) => (
              <ListItem
                key={index}
                className="add-new-users-recensement-item"
                divider
              >
                <TextField fullWidth value={x.prenom} label="Prénom" />
                <TextField fullWidth value={x.nom} label="Nom" />
                <TextField
                  fullWidth
                  value={nextUserToCreate.courriel}
                  label="Courriel de contact"
                />
                <TextField
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
                  <CloseIcon size="large" color="primary" />
                </Button>
              </ListItem>
            ))}
          </List>
        </div>
      </AccordionDetails>
      {usersToCreate.length > 0 && (
        <AccordionActions>
          <Button
            size="small"
            onClick={() =>
              setUsersToCreate([]) && setNextUserToCreate(defaultUserState)
            }
          >
            Annuler
          </Button>
          <Button size="small" color="primary" onClick={addUsers}>
            Sauvegarder
          </Button>
        </AccordionActions>
      )}
    </Accordion>
  );
};

export default AddNewUsers;
