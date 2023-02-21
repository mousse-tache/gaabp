import React from "react";
import PropTypes from "prop-types";
import { Dialog, Paper, Card, CardContent, Typography, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const LouveteauxModal = ({open, handleClose}) => {
    return (
        <Dialog 
            className="branche-modal"
            open={open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            fullWidth
            maxWidth="lg">
            <Paper className="branche-modal-paper jaune">
                <Card>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <CardContent>
                        <Typography variant="h5">
                            La Branche jaune
                        </Typography>
                    </CardContent>
                                            
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Louveteaux et louvettes
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography gutterBottom>     
                            Chez les louveteaux et louvettes, on suit les traces de Mowgli, le célèbre petit homme du <b>Livre de la Jungle</b> de Rudyard Kipling. Menés par Akela, ils apprennent la vie de la meute et comment se débrouiller au sein de la Jungle de Seeonee. Les jeunes sont également séparés en sizaine afin d'également travailler leur coopération en plus petites équipes constantes.       
                        </Typography>
                    </CardContent>
       
                    <CardContent>
                        <Typography variant="h6" >
                            Jeannettes
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography gutterBottom>     
                            Les Jeannettes suivent l'histoire de la dénommée Jeannette et ses aventures dans la Forêt Bleue.              
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography>
                            Comme pour tous les membres, l'apprentissage par le jeu est une partie importante du cursus. À la branche jaune, les compétences techniques prennent galon avec des enseignements variés sur la nature, le mattelotage, l'expression, le campisme et les activités en plein air. 
                        </Typography>
                    </CardContent>

                    <CardContent>
                        <Typography>
                            Typiquement, la branche jaune tient un camp en hiver et un autre en été. Celui d'hiver est généralement d'une durée d'une fin de semaine, alors que celui d'été dure généralement une semaine.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="h6">
                            Devise: De notre mieux
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Dialog>
    );
};

LouveteauxModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func
};

export default LouveteauxModal;