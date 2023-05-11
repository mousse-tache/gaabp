import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import LouveteauxModal from "./LouveteauxModal";

import Card from "@aabp/components/design-system/Card/Card";

const VerteCard = (): React.ReactElement => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card
      className="branchecard jaune"
      onClick={() => setOpenModal(!openModal)}
    >
      <div>
        <Typography>La Branche jaune</Typography>
        <Typography color="textSecondary">Pour les 9-12 ans</Typography>
      </div>
      <div className="jaune">
        <Typography className="p-3" color="textSecondary">
          Les louveteaux, louvettes et jeannettes
        </Typography>
      </div>
      <LouveteauxModal open={openModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default VerteCard;
