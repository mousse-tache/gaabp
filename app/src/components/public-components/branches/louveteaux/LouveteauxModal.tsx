import { Dialog, IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

import Card from "@aabp/components/design-system/Card/Card";

const LouveteauxModal = ({
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
      fullWidth
      maxWidth="lg"
    >
      <Paper className="branche-modal-paper jaune">
        <Card>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <div className="p-3">
            <Typography variant="h5">La Branche jaune</Typography>
          </div>

          <div className="p-3">
            <Typography variant="h6" gutterBottom>
              Louveteaux et louvettes
            </Typography>
          </div>

          <div className="p-3">
            <Typography gutterBottom>
              Chez les louveteaux et louvettes, on suit les traces de Mowgli, le
              célèbre petit homme du <b>Livre de la Jungle</b> de Rudyard
              Kipling. Menés par Akela, ils apprennent la vie de la meute et
              comment se débrouiller au sein de la Jungle de Seeonee. Les jeunes
              sont également séparés en sizaine afin d'également travailler leur
              coopération en plus petites équipes constantes.
            </Typography>
          </div>

          <div className="p-3">
            <Typography variant="h6">Jeannettes</Typography>
          </div>

          <div className="p-3">
            <Typography gutterBottom>
              Les Jeannettes suivent l'histoire de la dénommée Jeannette et ses
              aventures dans la Forêt Bleue.
            </Typography>
          </div>
          <div className="p-3">
            <Typography>
              Comme pour tous les membres, l'apprentissage par le jeu est une
              partie importante du cursus. À la branche jaune, les compétences
              techniques prennent galon avec des enseignements variés sur la
              nature, le mattelotage, l'expression, le campisme et les activités
              en plein air.
            </Typography>
          </div>

          <div className="p-3">
            <Typography>
              Typiquement, la branche jaune tient un camp en hiver et un autre
              en été. Celui d'hiver est généralement d'une durée d'une fin de
              semaine, alors que celui d'été dure généralement une semaine.
            </Typography>
          </div>
          <div className="p-3">
            <Typography variant="h6">Devise: De notre mieux</Typography>
          </div>
        </Card>
      </Paper>
    </Dialog>
  );
};

export default LouveteauxModal;
