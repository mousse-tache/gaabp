import React, { useState } from "react";
import RougeModal from "./rougeModal";
import { Card, CardContent, Typography } from "@material-ui/core";

const RougeCard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
      <Card className="branchecard rouge" onClick={() => setOpenModal(!openModal)}>
        <CardContent>
          <Typography>La Branche rouge</Typography>
          <Typography color="textSecondary">Pour les 17 ans et plus</Typography>
        </CardContent>        
        <CardContent className="rouge">
          <Typography color="textSecondary">Les routiers et guides ainées</Typography>
        </CardContent>
        <RougeModal open={openModal} handleClose={handleCloseModal} />
      </Card>
    );
};

export default RougeCard;