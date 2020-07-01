import React, { useState } from "react";
import CastorModal from "./castorModal";
import { Card, CardContent, Typography, ButtonBase } from "@material-ui/core";

const CastorCard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
      <Card className="branchecard bleu" onClick={() => setOpenModal(!openModal)}>
        <CardContent>

          <Typography>
            Les Castors
          </Typography>
        </CardContent>
        <CardContent className="bleu" onClick={() => setOpenModal(!openModal)}>
            <ButtonBase>
              <Typography color="textSecondary">Pour les 7-9 ans</Typography>
            </ButtonBase>
        </CardContent>
        <CastorModal open={openModal} handleClose={handleCloseModal} />
      </Card>
    )
}

export default CastorCard;