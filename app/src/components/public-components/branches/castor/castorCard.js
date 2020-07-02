import React, { useState } from "react";
import CastorModal from "./castorModal";
import { Card, CardContent, Typography } from "@material-ui/core";

const CastorCard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
      <Card className="branchecard bleu" onClick={() => setOpenModal(!openModal)}>
        <CardContent>
            <Typography>La Branche bleue</Typography>
            <Typography color="textSecondary">Pour les 7-9 ans</Typography>
        </CardContent>
        <CardContent className="bleu">
          <Typography color="textSecondary">Les castors</Typography>
        </CardContent>
        <CastorModal open={openModal} handleClose={handleCloseModal} />
      </Card>
    )
}

export default CastorCard;