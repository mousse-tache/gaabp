import { Tab, Tabs } from "@material-ui/core";
import { useState } from "react";

import Card from "../design-system/Card/Card";

import AGA2021 from "./aga/AGA2021";
import Cotisation from "./Cotisation";
import Documents from "./Documents";
import Reglements from "./reglements/reglements";
import ResourceList from "./ResourceList";

const AccueilRessources = (): React.ReactNode => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="mainnav"
        className="p-5"
      >
        <Tab disableRipple component="a" label="Cotisation" />
        <Tab disableRipple component="a" label="Règlements" />
        <Tab disableRipple component="a" label="Documents" />
        <Tab disableRipple component="a" label="AGA 2023" />
        <Tab disableRipple component="a" label="AGA 2022" />
        <Tab disableRipple component="a" label="AGA 2021" />
      </Tabs>
      {value === 0 && <Cotisation />}
      {value === 1 && <Reglements />}
      {value === 2 && <Documents />}
      {value === 3 && <ResourceList path="aga2023" />}
      {value === 4 && <ResourceList path="aga2022" />}
      {value === 5 && <AGA2021 />}
    </Card>
  );
};

export default AccueilRessources;
