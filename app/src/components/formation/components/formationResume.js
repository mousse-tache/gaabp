import React from "react";
import { Link } from "gatsby"
import { Breadcrumbs, Button, Card, List, ListItem, Typography, ListItemIcon } from "@material-ui/core";
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';

const FormationResume = ({niveau, branche}) => {

    return (
        <div>        
            <div className="membres-title">
                <Breadcrumbs aria-label="breadcrumb" className="crumbs">
                    <Link color="inherit" to="/app/formation">
                        Formation à distance 2020
                    </Link>
                    <Typography color="textPrimary">{`${niveau} ${branche ?? ""}`}</Typography>
                </Breadcrumbs>
            </div>
            <div className="formation-main-container"> 
                <div className="formation-disponibles">
                    <Card className={`formation-card preformatted ${branche}`}>
                        <b>Cahier du participant</b>
                        <List>
                            <ListItem disabled divider button disableRipple>
                                <ListItemIcon>
                                    <LibraryBooksRoundedIcon />
                                </ListItemIcon>
                            </ListItem>
                        </List>
                    </Card>
                </div>
                <div className="formation-main-message">
                    <Card className={`formation-card preformatted ${branche}`}>
                        <blockquote style={{lineHeight: "2rem"}}>
                            {"Bonjour à tous\, \n \n Cette année hors du commun nous aura permis de surmonter un nouveau défi à la formation; Un programme à distance fonctionnel sans avoir à faire de concessions sur notre programme de formation initial. \n Un travail colossal a été accompli et les formateurs n’attendent que des participants pour partager avec dynamisme leur savoir. \n Les formateurs communiqueront avec TOUS les participants avant le début de la formation pour revoir le cahier du participant avec eux et s'assurer de la compréhension de tous. \n \n Marianne De Garie \n Commissaire à la formation"}
                        </blockquote>
                        <div>
                        <Button variant="outlined" color="primary" target="_blank" href="https://forms.gle/Qn7mP9VBKoDYGbCMA" >Inscription</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FormationResume;