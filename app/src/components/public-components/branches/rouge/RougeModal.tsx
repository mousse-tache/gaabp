import { Typography } from "@material-ui/core";

import BrancheModal from "../BrancheModal";

const RougeModal = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}): React.ReactNode => {
  return (
    <BrancheModal
      color="rouge"
      title="La Branche rouge"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="p-3">
        <Typography gutterBottom>
          Les membres de la Branche rouge s'impliquent au sein d'un Clan
          routier. Le choix du clan n'est pas banal, puisque de nos nombreuses
          affinités et spécialités existent à l'AABP. Certains clans sont plutôt
          familiaux, alors que d'autres s'unissent dans le service ou même dans
          une spécialité marine.
        </Typography>

        <Typography gutterBottom>
          Les routiers et guides aînées font avant tout un chemin personnel,
          soutenu par leur clan. Le tout est guidé par le triangle de la route
          et toutes leurs activités le rejoigne d'une certaine façon dans
          l'équilibre <b>Marche</b>, <b>Service</b> et <b>Palabre</b>.
        </Typography>
      </div>
      <div className="p-3">
        <Typography>
          Typiquement, la branche Rouge tient un camp par saison, nommé Route.
        </Typography>
      </div>
      <div className="p-3">
        <Typography variant="h6">Devise: Servir</Typography>
      </div>
    </BrancheModal>
  );
};

export default RougeModal;
