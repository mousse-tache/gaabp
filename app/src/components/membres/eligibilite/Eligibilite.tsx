import { useEffect, useState } from "react";

import { Chip } from "@material-ui/core";

import Card from "@aabp/components/design-system/Card/Card";
import EligibliteContext from "@aabp/context/eligibiliteContext";
import EligibiliteTable from "./EligibiliteTable";

const Eligibilite = (): React.ReactNode => {
  // select honor / formation, fetch users with matching criterias
  // criteres: annee de service + formations
  const [buchettes, setBuchettes] = useState(false);
  const [provalore, setProvalore] = useState(false);
  const [snm, setSnm] = useState(false);

  const [honneurs, setHonneurs] = useState([]);

  useEffect(() => {
    setHonneurs({ buchettes, provalore, snm });
  }, [buchettes, provalore, snm]);

  return (
    <EligibliteContext.Provider value={honneurs}>
      <Card>
        <h2>
          Montre l'éligibilité, mais ne valide pas si une personne a déjà
          l'honneur en question.
        </h2>
        <div className="m-auto p-3 flex flex-row gap-2">
          <Chip
            label="Bûchettes"
            onClick={() => setBuchettes(!buchettes)}
            color={buchettes ? "primary" : "default"}
          />
          <Chip
            label="Pro Valore Sua"
            onClick={() => setProvalore(!provalore)}
            color={provalore ? "primary" : "default"}
          />
          <Chip
            label="Service national méritoire"
            onClick={() => setSnm(!snm)}
            color={snm ? "primary" : "default"}
          />
        </div>
        <EligibiliteTable />
      </Card>
    </EligibliteContext.Provider>
  );
};

export default Eligibilite;
