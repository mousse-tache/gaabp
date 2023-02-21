import React from "react";
import PropTypes from "prop-types";
import { Dialog, Paper, Card, CardContent, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const RougeModal = ({open, handleClose}) => {
    return (
        <Dialog 
            className="branche-modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">
            <Paper className="branche-modal-paper rouge">
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                <Card>
                    <CardContent>
                        <Typography variant="h5">
                            La Branche rouge
                        </Typography>
                    </CardContent>                                  
                    <CardContent>
                        <Typography gutterBottom>     
                            Les membres de la Branche rouge s'impliquent au sein d'un Clan routier. Le choix du clan n'est pas banal, puisque de nos nombreuses affinités et spécialités existent à l'AABP. Certains clans sont plutôt familiaux, alors que d'autres s'unissent dans le service ou même dans une spécialité marine. 
                        </Typography>

                        <Typography gutterBottom>     
                            Les routiers et guides aînées font avant tout un chemin personnel, soutenu par leur clan. Le tout est guidé par le triangle de la route et toutes leurs activités le rejoigne d'une certaine façon dans l'équilibre <b>Marche</b>, <b>Service</b> et <b>Palabre</b>.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>
                            Typiquement, la branche Rouge tient un camp par saison, nommé Route.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h6">
                            Devise: Servir
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Dialog>
    );
};

RougeModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default RougeModal;