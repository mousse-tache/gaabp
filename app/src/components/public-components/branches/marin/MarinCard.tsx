import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import MarinModal from "./MarinModal";

import Card from "@aabp/components/design-system/Card/Card";

const MarinCard = (): React.ReactNode => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card
      className="branchecard bleu-marine"
      onClick={() => setOpenModal(!openModal)}
    >
      <div>
        <Typography>La Branche marine</Typography>
        <Typography color="textSecondary">Tout âge</Typography>
      </div>
      <div className="bleu-marine">
        <Typography className="p-3" color="textSecondary">
          Les unités marines
        </Typography>
      </div>
      <MarinModal open={openModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default MarinCard;
