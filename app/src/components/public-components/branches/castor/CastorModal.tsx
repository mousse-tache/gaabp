import { Dialog, IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

import Card from "@aabp/components/design-system/Card/Card";

const CastorModal = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}): React.ReactNode => {
  return (
    <Dialog
      className="branche-modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Paper className="branche-modal-paper bleu">
        <Card>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <div className="p-3">
            <Typography variant="h5">
              Les castors sont les plus jeunes membres à l'AABP.
            </Typography>
          </div>

          <div className="p-3">
            <Typography>
              Ils sont amenés à apprendre la vie en groupe par le biais des
              aventures de Pistache le castor et de ses amis de la nature.
            </Typography>
          </div>

          <div className="p-3">
            <Typography>
              Comme pour tous les membres, l'apprentissage par le jeu est une
              partie importante du cursus des castors. Les activités courantes
              incluent également le bricolage, le partage d'histoire, le jeu
              actif et l'apprentissage de techniques de base.
            </Typography>
          </div>

          <div className="p-3">
            <Typography>
              Typiquement, les castors tiennent un camp en hiver et un autre en
              été. Celui d'hiver est généralement d'une durée d'une fin de
              semaine, alors que celui d'été peut durer jusqu'à 5 jours.
            </Typography>
          </div>
          <div className="p-3">
            <Typography variant="h6">Devise: Partager</Typography>
          </div>
        </Card>
      </Paper>
    </Dialog>
  );
};

export default CastorModal;
