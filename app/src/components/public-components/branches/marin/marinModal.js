import React from "react";
import PropTypes from "prop-types";
import { Dialog, Paper, Card, CardContent, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const MarinModal = ({open, handleClose}) => {
    return (
        <Dialog 
            className="branche-modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Paper className="branche-modal-paper bleu">
                <Card>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <CardContent>
                        <Typography variant="h5">
                            La Branche marine
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography>    
                            <p>
                                En plus de faire partie d'une des quatre autres branches, une unité peut également faire partie de la <b>branche de spécialité marine</b>. Dans cet optique, en plus des exigences de leur branche maîtresse, les jeunes de ces unités se spécialisent dans les activités nautiques et marines.
                            </p>

                            Un programme est adapté pour chaque âge ayant un but spécifique:

                            <ul>
                                <li>
                                    Castors marin: Initiation au milieu marin
                                </li>
                                <li>
                                Louveteaux, louvettes et jeanettes marin(e): mise en pratique de techniques nautiques et marines de bases
                                </li>
                                <li>
                                    Éclaireurs et guides marin(e) : Perfectionnement des techniques nautiques et marines
                                </li>
                                <li>
                                    Routier et guide aînées marin(e): Transmission de connaissances et implication dans la communauté nautique
                                </li>
                            </ul>
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Dialog>
    )
}

MarinModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
}

export default MarinModal;