import { useContext, useEffect, useState } from "react";

import { Skeleton } from "@material-ui/lab";
import MaterialTable from "material-table";

import AppContext from "@aabp/context/app/appContext";

import FeatureClient from "@aabp/clients/featureClient";

import { Switch } from "@material-ui/core";

const FeatureList = () => {
  const { init } = useContext(AppContext);
  const [features, setFeatures] = useState([]);
  const featureClient = new FeatureClient();

  const columns = [
    { title: "Nom", field: "name" },
    {
      title: "Activée",
      field: "activated",
      type: "boolean",
    },
    {
      title: "",
      field: "",
      render: (rowData) => (
        <Switch
          checked={rowData.activated}
          onChange={() => HandleChangeVisibility(rowData)}
        />
      ),
    },
  ];

  const HandleChangeVisibility = async (feature) => {
    const f = { ...feature, activated: !feature.activated };

    await featureClient.save(f);

    getList();
  };

  const getList = async () => {
    const data = await featureClient.getList();

    if (data) {
      setFeatures(data);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  if (!init) {
    return <Skeleton />;
  }

  return (
    <div className="features-container">
      <MaterialTable
        title="Fonctionnalités"
        data={features}
        columns={columns}
      />
    </div>
  );
};

export default FeatureList;
