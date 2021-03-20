import React, { useContext } from "react";
import moment from "moment";
import { List, ListItem, Link } from "@material-ui/core";

import CampContext from "@aabp/context/campContext";

import StepAction from "./stepAction";

import CampClient from "@aabp/clients/campClient";

const Revision = () => {
    const { camp, membres, activeStep, setActiveStep } = useContext(CampContext);
    const campClient = new CampClient();

    const SaveCamp = async() => {
        await campClient.save({...camp, dateSoumission: new Date()});
        window.location.reload();
    };

    if(!membres) {
        return null;
    }

    return  (     
            <div>
                <div>
                    <p>
                        Révisez l'exactitude des informations suivantes avant de soumettre votre demande.
                        <List>
                            <ListItem>
                                Se déroulera du {moment(camp.debutDuCamp).format("YYYY-MM-DD")} au {moment(camp.finDuCamp).format("YYYY-MM-DD")}
                            </ListItem>
                            <ListItem>
                                Se déroulera au {camp.lieuDuCamp.adresse}
                            </ListItem>
                            <ListItem>
                                Les lieux appartiennent à {camp.lieuDuCamp.proprio} qui peut être contacter au {camp.lieuDuCamp.telephone}
                            </ListItem>
                            <ListItem>
                                Le chef de l'unité est {`${camp.chefUnite.prenom} ${camp.chefUnite.nom}`}
                            </ListItem>
                            {
                                camp.chefCamp && camp.chefUnite._id !== camp.chefCamp._id &&
                                <ListItem>
                                    Le chef de camp est {`${camp.chefCamp.prenom} ${camp.chefCamp.nom}`}
                                </ListItem>
                            }
                            <ListItem>
                                {membres.length} personnes participeront au camp et leurs informations sont à jour dans la base de données.
                            </ListItem>
                            <ListItem>
                                Le cahier de camp est disponible 
                                <Link href={camp.cahierCamp} target="_blank" rel="noopener">
                                    <pre> ici </pre>
                                </Link> et respecte les normes de campement de votre branche.
                            </ListItem>
                        </List>
                    </p>
                </div>
                <div>                        
                    <StepAction disabled={!camp.debutDuCamp || !camp.finDuCamp || camp.finDuCamp < camp.debutDuCamp} submit={SaveCamp} activeStep={activeStep} setActiveStep={setActiveStep} />
                </div>
            </div>
        
    );
};

export default Revision;
