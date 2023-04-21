import { Typography } from "@material-ui/core";

import BrancheModal from "../BrancheModal";

const CastorModal = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}): React.ReactNode => {
  return (
    <BrancheModal
      color="bleu"
      title="Les castors sont les plus jeunes membres à l'AABP."
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="p-3">
        <Typography>
          Ils sont amenés à apprendre la vie en groupe par le biais des
          aventures de Pistache le castor et de ses amis de la nature.
        </Typography>
      </div>

      <div className="p-3">
        <Typography>
          Comme pour tous les membres, l'apprentissage par le jeu est une partie
          importante du cursus des castors. Les activités courantes incluent
          également le bricolage, le partage d'histoire, le jeu actif et
          l'apprentissage de techniques de base.
        </Typography>
      </div>

      <div className="p-3">
        <Typography>
          Typiquement, les castors tiennent un camp en hiver et un autre en été.
          Celui d'hiver est généralement d'une durée d'une fin de semaine, alors
          que celui d'été peut durer jusqu'à 5 jours.
        </Typography>
      </div>
      <div className="p-3">
        <Typography variant="h6">Devise: Partager</Typography>
      </div>
    </BrancheModal>
  );
};

export default CastorModal;
