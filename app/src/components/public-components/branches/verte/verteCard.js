import React, { useState } from "react";
import VerteModal from "./verteModal";
import { Card, CardContent, Typography } from "@material-ui/core";

const VerteCard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
      <Card className="branchecard vert" onClick={() => setOpenModal(!openModal)}>
        <CardContent>
          <Typography>La Branche verte</Typography>
          <Typography color="textSecondary">Pour les 12-17 ans</Typography>
        </CardContent>        
        <CardContent className="vert">
          <Typography color="textSecondary">Les éclaireurs et guides</Typography>
        </CardContent>
        <VerteModal open={openModal} handleClose={handleCloseModal} />
      </Card>
    );
};

export default VerteCard;