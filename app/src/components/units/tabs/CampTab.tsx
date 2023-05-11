import { Typography } from "@material-ui/core";

import Card from "@aabp/components/design-system/Card/Card";
import DemandePermisCamper from "./camp/DemandePermisCamper";
import DernierCamp from "./camp/DernierCamp";

const CampTab = (): React.ReactNode => {
  return (
    <Card>
      <div className="p-3">
        <Typography variant="h3">Camps</Typography>
      </div>
      <DernierCamp />
      <DemandePermisCamper />
    </Card>
  );
};

export default CampTab;
