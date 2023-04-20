import { Typography } from "@material-ui/core";
import { useState } from "react";
import RougeModal from "./RougeModal";

import Card from "@aabp/components/design-system/Card/Card";

const RougeCard = (): React.ReactNode => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Card
      className="branchecard rouge"
      onClick={() => setOpenModal(!openModal)}
    >
      <div>
        <Typography>La Branche rouge</Typography>
        <Typography color="textSecondary">Pour les 17 ans et plus</Typography>
      </div>
      <div className="rouge">
        <Typography className="p-3" color="textSecondary">
          Les routiers et guides ainées
        </Typography>
      </div>
      <RougeModal open={openModal} handleClose={handleCloseModal} />
    </Card>
  );
};

export default RougeCard;
