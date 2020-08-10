import React from "react";
import { Button } from "@material-ui/core";
import RecensementClient from "../../clients/recensementClient";
import { useSnackbar } from 'notistack';

const SoumettreRecensement = ({cost, unitId, unitMembers}) => {
    const recensementClient = new RecensementClient();
    const { enqueueSnackbar } = useSnackbar();

/*
date: Date,
  paiementComplet: Boolean,
  details: Object,
  cost: Number,
  unitId: mongoose.Types.ObjectId
*/

    const SubmitRecensement = async() => {
        try {
            await recensementClient.addRecensement({
                date: new Date(),
                details: {
                    cost,
                    unitMembers: unitMembers.map(x => x._id)
                },
                unitId,
                cost: cost.totalPrice
            })

            enqueueSnackbar("Un recensement a été soumis avec les membres actuels");
        } catch (e) {
            console.log(e);
            enqueueSnackbar(e);
        }
    }

    return (
        <div>
            <Button variant="contained" color="secondary" onClick={SubmitRecensement} >
                Soumettre son recensement
            </Button>
        </div>
    )
};

export default SoumettreRecensement;