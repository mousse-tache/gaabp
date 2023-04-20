import { Dialog, IconButton, Paper, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

import Card from "@aabp/components/design-system/Card/Card";

const VerteModal = ({
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
      <Paper className="branche-modal-paper vert">
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <Card>
          <div className="p-3">
            <Typography variant="h5">
              La Branche verte | Guides et éclaireurs
            </Typography>
          </div>
          <div className="p-3">
            <Typography gutterBottom>
              À la branche verte, on prend inspiration du livre <e>Éclaireur</e>{" "}
              publié par Baden-Powell en 1907. Les jeunes sont organisées en{" "}
              <e>patrouilles</e> qui ont pour but d'être des entités autonome
              dans la mesure du possible. Les patrouilles ont toutes un chef et
              un second, en plus d'avoir de nombreux rôles répartis parmis tous
              les membres, appelés <e>postes d'action</e>.
            </Typography>

            <Typography gutterBottom>
              Les patrouilles sont encadrés par le chef de la Troupe et ses
              assistants qui ont pour buts de les aider à déveloper leur{" "}
              <b>débrouillardise</b>, <b>leur caractère</b>,{" "}
              <b>leur sens du service</b> et leur <b>santé</b>. Pour ce faire,
              on privilégiera l'apprentissage par le jeu. La patrouille et les
              responsabilités qu'ils et elles auront serviront d'outils pour
              aider leur développement.
            </Typography>
          </div>
          <div className="p-3">
            <Typography>
              Typiquement, la branche verte tient un camp par saison, qui
              peuvent varier de quelques jours à quelques semaines.
            </Typography>
          </div>
          <div className="p-3">
            <Typography variant="h6">Devise: Soit prêt(e)</Typography>
          </div>
        </Card>
      </Paper>
    </Dialog>
  );
};

export default VerteModal;
