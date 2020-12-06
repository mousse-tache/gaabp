import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, List, ListItem } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Bottin = () => {
    return (

        <div>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Permis de camp
                </AccordionSummary>
                <AccordionDetails>
                    <List>

                        Vous devez envoyer votre demande de permis de camp à votre branche, votre chef de groupe et info@badenpowell.ca
                        <ListItem></ListItem>
                        <ListItem>
                            Castors: bleu@badenpowell.ca
                        </ListItem>
                        <ListItem>
                            Louveteaux/Louvettes/Jeannettes: jaune@badenpowell.ca
                        </ListItem>
                        <ListItem>
                            Guides/Éclaireurs: vert@badenpowell.ca
                        </ListItem>
                        <ListItem>
                           Routiers/Guides aînées: rouge@badenpowell.ca
                        </ListItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Cotisation
                </AccordionSummary>
                <AccordionDetails>
                info@badenpowell.ca ou gestion@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Méthodologie
                </AccordionSummary>
                <AccordionDetails>
                commissariat@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Groupes
                </AccordionSummary>
                <AccordionDetails>
                groupe@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Initiatives jeunesses
                </AccordionSummary>
                <AccordionDetails>
                jeunesse@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Spiritualité
                </AccordionSummary>
                <AccordionDetails>
                spiritualite@badenpowell.ca
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Éthique et déontologie
                </AccordionSummary>
                <AccordionDetails>
                ethique@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Dénonciations
                </AccordionSummary>
                <AccordionDetails>
                ethique@badenpowell.ca ou presidence@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Le site web
                </AccordionSummary>
                <AccordionDetails>
                informatique@badenpowell.ca
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Toute autre question
                </AccordionSummary>
                <AccordionDetails>
                info@badenpowell.ca
                </AccordionDetails>
            </Accordion>
        </div>

    )
}

export default Bottin;