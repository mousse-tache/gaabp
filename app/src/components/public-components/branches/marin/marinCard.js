import React, { useState } from "react";
import MarinModal from "./marinModal";
import { Card, CardContent, Typography } from "@material-ui/core";

const MarinCard = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
      <Card className="branchecard bleu-marine" onClick={() => setOpenModal(!openModal)}>
        <CardContent>
            <Typography>La Branche marine</Typography>
            <Typography color="textSecondary">Tout âge</Typography>
        </CardContent>
        <CardContent className="bleu-marine">
          <Typography color="textSecondary">Les unités marines</Typography>
        </CardContent>
        <MarinModal open={openModal} handleClose={handleCloseModal} />
      </Card>
    );
};

export default MarinCard;