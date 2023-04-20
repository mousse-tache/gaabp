import { Typography } from "@material-ui/core";
import { useState } from "react";
import CastorModal from "./CastorModal";

import Card from "@aabp/components/design-system/Card/Card";

const CastorCard = (): React.ReactNode => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card className="branchecard bleu" onClick={() => setOpenModal(!openModal)}>
      <div>
        <Typography>La Branche bleue</Typography>
        <Typography color="textSecondary">Pour les 7-9 ans</Typography>
      </div>
      <div className="bleu">
        <Typography className="p-3" color="textSecondary">
          Les castors
        </Typography>
      </div>
      <CastorModal open={openModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default CastorCard;
