import { useContext } from "react";

import UserContext from "@aabp/context/userContext";
import { TextField } from "@material-ui/core";
import AnneesService from "./anneesService";

import useAuthUser from "@aabp/auth/useAuthUser";
import Button from "../design-system/Button/Button";
import Toggle from "../design-system/Toggle/Toggle";
import MemberFormationsUniform from "./formation/MemberFormationsUniform";

const MemberDetails = ({
  canEdit,
  isPersonalProfile,
}: {
  canEdit: boolean
  isPersonalProfile: boolean
}): React.ReactNode => {
  const authedUser = useAuthUser();
  const { member, setMember, saveUser } = useContext(UserContext);

  return (
    <div className="membres">
      <form onSubmit={saveUser} className="form">
        <div className="membres-information-section">
          <h3>Informations de base</h3>

          <TextField
            fullWidth
            label="Courriel"
            type="email"
            disabled={!canEdit || isPersonalProfile}
            value={member?.courriel}
            placeholder="robert@badenpowell.ca"
            onChange={(event) =>
              setMember({ ...member, courriel: event.target.value })
            }
          />

          <TextField
            fullWidth={true}
            type="text"
            value={member?.prenom}
            label="Prénom"
            disabled={!(canEdit || isPersonalProfile)}
            placeholder="Robert"
            onChange={(event) =>
              setMember({ ...member, prenom: event.target.value })
            }
          />

          <TextField
            fullWidth={true}
            type="text"
            label="Nom de famille"
            value={member?.nom}
            disabled={!(canEdit || isPersonalProfile)}
            placeholder="Baden-Powell"
            onChange={(event) =>
              setMember({ ...member, nom: event.target.value })
            }
          />
        </div>
        <MemberFormationsUniform formations={member?.formations} />
        {(canEdit || isPersonalProfile) && (
          <div className="membres-information-section">
            <h3>Informations personnelles</h3>
            <TextField
              fullWidth
              disabled={!(canEdit || isPersonalProfile)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setMember({
                  ...member,
                  details: { ...member?.details, ddn: event.target.value },
                });
              }}
              value={member?.details?.ddn}
              label="Date de naissance"
              type="date"
            />

            <TextField
              fullWidth={true}
              disabled={!(canEdit || isPersonalProfile)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setMember({
                  ...member,
                  details: { ...member?.details, phone: event.target.value },
                });
              }}
              value={member?.details?.phone}
              label="Numéro de téléphone"
              type="string"
            />

            <TextField
              fullWidth={true}
              disabled={!(canEdit || isPersonalProfile)}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(event) => {
                setMember({
                  ...member,
                  details: { ...member?.details, addresse: event.target.value },
                });
              }}
              value={member?.details?.addresse}
              label="Addresse complète"
              type="string"
            />
          </div>
        )}

        <div className="membres-information-section">
          <h3>Informations supplémentaires</h3>
          <TextField
            fullWidth={true}
            disabled={!(canEdit || isPersonalProfile)}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(event) => {
              setMember({
                ...member,
                details: { ...member?.details, totem: event.target.value },
              });
            }}
            value={member?.details?.totem}
            label="Nom de totem"
            variant="outlined"
            type="text"
          />
          <AnneesService nominations={member?.nominations ?? []} />
        </div>

        {authedUser?.isAdmin && (
          <div className="membres-information-section">
            <h3>Permissions</h3>

            <Toggle
              disabled={!authedUser?.isAdmin}
              checked={!!member?.isAdmin}
              onClick={() =>
                setMember({ ...member, isAdmin: !member?.isAdmin })
              }
              label="Administrateur de la base de donnée"
            />
          </div>
        )}
        {(canEdit || isPersonalProfile) && (
          <div className="membres-information-section">
            <Button color="secondary" onClick={saveUser}>
              {member?._id ? "Sauvegarder" : "Compléter l'inscription"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default MemberDetails;
