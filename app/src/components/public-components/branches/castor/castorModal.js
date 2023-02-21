import React from "react";
import PropTypes from "prop-types";
import { Dialog, Paper, Card, CardContent, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const CastorModal = ({open, handleClose}) => {
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
                            Les castors sont les plus jeunes membres à l'AABP.
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography>     
                            Ils sont amenés à apprendre la vie en groupe par le biais des aventures de Pistache le castor et de ses amis de la nature.                          
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography>
                            Comme pour tous les membres, l'apprentissage par le jeu est une partie importante du cursus des castors. Les activités courantes incluent également le bricolage, le partage d'histoire, le jeu actif et l'apprentissage de techniques de base.
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography>
                            Typiquement, les castors tiennent un camp en hiver et un autre en été. Celui d'hiver est généralement d'une durée d'une fin de semaine, alors que celui d'été peut durer jusqu'à 5 jours.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h6">
                            Devise: Partager
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Dialog>
    );
};

CastorModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default CastorModal;