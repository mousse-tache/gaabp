import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "gatsby";

const NominationRowDetail = ({nomination}) => {

    return (
        <Grid container spacing={3} className="nomination-detail-container" > 
            <Grid item xs={12}>
                <b>Engagements</b>
            </Grid>
            <Grid item xs>
                {nomination.dossierCriminel == "oui" ? "Rapporte avoir un dossier criminel" : "Rapporte ne pas avoir de dossier criminel"}
            </Grid>
            {
                nomination.fidelite == "oui" ? (
                    <Grid item xs>
                        S'est engagé à être fidèle
                    </Grid>
                ) :
                (
                    <Grid item xs>
                        Ne s'est pas engagé à être fidèle
                    </Grid>
                )
            }
            {
                nomination.engagementChef == "oui" && (
                    <Grid item xs>
                        S'est engagé comme Chef(taine)
                    </Grid>
                )
            }
            {
                nomination.engagementAssistant == "oui" && (
                    <Grid item xs>
                        S'est engagé comme Assistant(e)-chef(taine)
                    </Grid>
                )
            }
            {
                nomination.deonto == "oui" ? (
                    <Grid item xs>
                        S'est engagé à suivre le code d'éthique et déontologie
                    </Grid>
                ) :
                (
                    <Grid item xs>
                        Ne s'est pas engagé à suivre le code d'éthique et déontologie
                    </Grid>
                )
            }
            <Grid item xs={12}>
                <b>Motivation</b>
            </Grid>
            <Grid divider item xs={12}>
                {nomination.motivation}
            </Grid>
            <Grid divider item xs={12}>
                <b>Références</b>
            </Grid>
            <Grid divider item xs>
                {nomination.approvers.map(x => <p><Link to={`/app/membre/${x._id}`}>{x.nom}</Link></p>)}
            </Grid>
        </Grid>
    )
};

export default NominationRowDetail;