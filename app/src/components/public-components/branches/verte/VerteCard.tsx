import { Typography } from "@material-ui/core";
import { useState } from "react";
import VerteModal from "./VerteModal";

import Card from "@aabp/components/design-system/Card/Card";

const VerteCard = (): React.ReactNode => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card className="branchecard vert" onClick={() => setOpenModal(!openModal)}>
      <div>
        <Typography>La Branche verte</Typography>
        <Typography color="textSecondary">Pour les 12-17 ans</Typography>
      </div>
      <div className="vert">
        <Typography className="p-3" color="textSecondary">
          Les éclaireurs et guides
        </Typography>
      </div>
      <VerteModal open={openModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default VerteCard;
