import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import RecensementClient from "../../clients/recensementClient";
import { useSnackbar } from 'notistack';
import RecensementContext from "../../context/recensementContext";
import moment from "moment";

const SoumettreRecensement = ({cost, unitId, unitMembers}) => {
    const recensementClient = new RecensementClient();
    const latestRecensement = useContext(RecensementContext).recensement;
    const { enqueueSnackbar } = useSnackbar();
    const shouldSubmitNew = shouldSubmitNewRecensement();

    function shouldSubmitNewRecensement() {
        var y = moment().year();
        var nextRecensementPeriod = moment(`${y}-09-01`);

        if(moment().isAfter(nextRecensementPeriod)) {
            nextRecensementPeriod.add(1, 'y');
        }

        var lastRecensementPeriod = moment(nextRecensementPeriod).add(-1, 'y');

        return moment(latestRecensement.date).isBefore(lastRecensementPeriod) || latestRecensement.paiementComplet;
    }; 

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
            enqueueSnackbar(e?.error?.response?.data, { variant: "error"})
        }
    }

    const UpdateLatest = async() => {
        try {
            await recensementClient.updateRecensement({
                ...latestRecensement,
                details: {
                    cost,
                    unitMembers: unitMembers.map(x => x._id)
                },
                unitId,
                cost: cost.totalPrice
            })

            enqueueSnackbar("Le dernier recensement a été mis à jour");
        } catch (e) {
            enqueueSnackbar(e?.error?.response?.data, { variant: "error"})
        }
    }

    return (
        <div>
            {
                latestRecensement && !shouldSubmitNew && (
                    <Button variant="contained" color="secondary" onClick={UpdateLatest} >
                        Mettre à jour le dernier recensement
                    </Button>
                )
            }
            {
                (!latestRecensement || shouldSubmitNew) && (
                    <Button variant="contained" color="secondary" onClick={SubmitRecensement} >
                        Soumettre un nouveau recensement
                    </Button>
                )
            }
        </div>
    )
};

export default SoumettreRecensement;