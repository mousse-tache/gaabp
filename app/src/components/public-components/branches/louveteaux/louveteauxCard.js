import React, { useState } from "react";
import LouveteauxModal from "./louveteauxModal";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";

const VerteCard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
      <Card className="branchecard jaune" onClick={() => setOpenModal(!openModal)}>
        <CardContent>
          <Typography>La Branche jaune</Typography>
          <Typography color="textSecondary">Pour les 9-12 ans</Typography>
        </CardContent>        
        <CardContent className="jaune">
          <Typography color="textSecondary">Les louveteaux, louvettes et jeannettes</Typography>
        </CardContent>
        <LouveteauxModal open={openModal} handleClose={handleCloseModal} />
      </Card>
    )
}

export default VerteCard;