import { useEffect, useState } from "react";

import { Chip } from "@material-ui/core";

import Card from "@aabp/components/design-system/Card/Card";
import EligibliteContext from "@aabp/context/eligibiliteContext";
import EligibiliteTable from "./EligibiliteTable";

import "./eligibilite.scss";

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
        <li className="eligibilite-list-chips">
          <Chip
            className="eligibilite-chip"
            label="Bûchettes"
            onClick={() => setBuchettes(!buchettes)}
            color={buchettes ? "primary" : "default"}
          />
          <Chip
            className="eligibilite-chip"
            label="Pro Valore Sua"
            onClick={() => setProvalore(!provalore)}
            color={provalore ? "primary" : "default"}
          />
          <Chip
            className="eligibilite-chip"
            label="Service national méritoire"
            onClick={() => setSnm(!snm)}
            color={snm ? "primary" : "default"}
          />
        </li>
        <EligibiliteTable />
      </Card>
    </EligibliteContext.Provider>
  );
};

export default Eligibilite;
