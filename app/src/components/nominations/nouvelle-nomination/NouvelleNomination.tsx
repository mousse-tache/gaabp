import { useContext, useEffect, useState } from "react";

import AppContext from "@aabp/context/app/appContext";
import NominationContext from "@aabp/context/nominationContext";

import { Dialog, Tooltip } from "@material-ui/core";
import NominationStepper from "./NominationStepper";

import Button from "@aabp/components/design-system/Button/Button";
import "./nomination.scss";

const DefaultNomination = {
  role: "",
  unit: "",
  group: "",
  groupOnly: false,
  dossierCriminel: "nonselectionner",
  approvers: [
    { prenom: "", nom: "" },
    { prenom: "", nom: "" },
  ],
  motivation: "",
  fidelite: "nonselectionner",
  engagementChef: "nonselectionner",
  engagementAssistant: "nonselectionner",
  deonto: "nonselectionner",
};

const NouvelleNomination = () => {
  const [open, setOpen] = useState(false);
  const { authedUser } = useContext(AppContext);
  const [nomination, setNomination] = useState(DefaultNomination);

  useEffect(() => {
    if (nomination.done) {
      setNomination(DefaultNomination);
      setOpen(false);
    }
  }, [nomination.done]);

  return (
    <NominationContext.Provider value={{ nomination, setNomination }}>
      <Tooltip title={"Pour soumettre une demande de nomination"}>
        <Button
          className="min-h-fit"
          color="secondary"
          disabled={!authedUser}
          onClick={() => setOpen(true)}
        >
          Demande de nomination
        </Button>
      </Tooltip>
      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        <NominationStepper />
      </Dialog>
    </NominationContext.Provider>
  );
};

export default NouvelleNomination;
