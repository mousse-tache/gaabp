import {
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@material-ui/core";
import { useSnackbar } from "notistack";
import Proptypes from "prop-types";
import { useContext, useEffect, useState } from "react";

import UnitContext from "../../context/unit/unitContext";

import Button from "../design-system/Button/Button";
import Accordion from "../design-system/Collapsible/Accordion";
import Loading from "../loading/Loading";

import Branches from "../../utils/branches";
import Genre from "../../utils/genre";

import GroupClient from "../../clients/groupClient";
import UnitClient from "../../clients/unitClient";

const UnitDetails = ({ disabled }) => {
  const unitContext = useContext(UnitContext);
  const { unit, setUnit } = unitContext;

  const [isFetchingGroup, setIsFetchingGroup] = useState(true);
  const [group, setGroup] = useState(null);

  const [groupList, setGroupList] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const groupClient = new GroupClient();
  const unitClient = new UnitClient();

  useEffect(() => {
    async function FetchGroup(groupId) {
      if (!groupId) {
        await FetchGroups();
      } else {
        try {
          const data = await groupClient.getById(groupId);
          if (data !== null) {
            setGroup(data);
          }
        } catch (e) {
          enqueueSnackbar(e.message);
        }
      }

      setIsFetchingGroup(false);
    }

    async function FetchGroups() {
      try {
        const data = await groupClient.getGroups();
        if (data !== null) {
          setGroupList(data);
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    FetchGroup(unit?.group);
  }, [unit]);

  async function SaveUnit(e) {
    e.preventDefault();
    e.stopPropagation();
    try {
      await unitClient.updateUnit({ ...unit, id: unit._id });
      enqueueSnackbar("L'unité " + unit.nom + " a été sauvegardée");
    } catch (e) {
      enqueueSnackbar(e);
    }
  }

  if (isFetchingGroup) {
    return <Loading />;
  }

  return (
    <Accordion header="Informations de base">
      <div className="w-full">
        <form className="form">
          <InputLabel>Nom de l'unité</InputLabel>
          <TextField
            type="text"
            fullWidth
            disabled={disabled}
            value={unit.nom}
            placeholder="1ère Troupe de Glasgow"
            onChange={(event) => setUnit({ ...unit, nom: event.target.value })}
          />

          <InputLabel>Groupe</InputLabel>
          {unit.group && <Input fullWidth value={group?.nom} disabled />}

          {!unit.group && (
            <TextField
              select
              fullWidth
              value={unit.group}
              onChange={(event) =>
                setUnit({ ...unit, group: event.target.value })
              }
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
          )}

          <InputLabel>Branche</InputLabel>
          <Select
            fullWidth
            value={unit.branche}
            disabled={disabled}
            onChange={(x) => setUnit({ ...unit, branche: x.target.value })}
          >
            {Branches.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.couleur}
              </MenuItem>
            ))}
          </Select>

          <InputLabel id="typelabel">Type</InputLabel>
          <Select
            fullWidth
            labelId="typelabel"
            value={unit.genre}
            disabled={disabled}
            onChange={(x) => setUnit({ ...unit, genre: x.target.value })}
          >
            {Genre.map((x) => (
              <MenuItem key={x.id} value={x.id}>
                {x.nom}
              </MenuItem>
            ))}
          </Select>

          {!disabled && (
            <div className="save-unit-button">
              <Button color="secondary" disabled={disabled} onClick={SaveUnit}>
                Sauvegarder
              </Button>
            </div>
          )}
        </form>
      </div>
    </Accordion>
  );
};

UnitDetails.propTypes = {
  disabled: Proptypes.bool,
};

export default UnitDetails;
