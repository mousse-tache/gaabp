import { Typography } from "@material-ui/core";
import React from "react";

import BrancheModal from "../BrancheModal";

const MarinModal = ({
  open,
  handleClose,
}: {
  open: boolean
  handleClose: () => void
}): React.ReactNode => {
  return (
    <BrancheModal
      color="bleu-marine"
      title="La Branche marine"
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="p-3">
        <Typography>
          <p>
            En plus de faire partie d'une des quatre autres branches, une unité
            peut également faire partie de la{" "}
            <b>branche de spécialité marine</b>. Dans cet optique, en plus des
            exigences de leur branche maîtresse, les jeunes de ces unités se
            spécialisent dans les activités nautiques et marines.
          </p>
          Un programme est adapté pour chaque âge ayant un but spécifique:
          <ul>
            <li>Castors marin: Initiation au milieu marin</li>
            <li>
              Louveteaux, louvettes et jeanettes marin(e): mise en pratique de
              techniques nautiques et marines de bases
            </li>
            <li>
              Éclaireurs et guides marin(e) : Perfectionnement des techniques
              nautiques et marines
            </li>
            <li>
              Routier et guide aînées marin(e): Transmission de connaissances et
              implication dans la communauté nautique
            </li>
          </ul>
        </Typography>
      </div>
    </BrancheModal>
  );
};

export default MarinModal;
