import { useContext, useEffect, useState } from "react";

import FeatureClient from "@aabp/clients/featureClient";

import AppContext from "@aabp/context/app/appContext";

const isFeatureActivated = (feature) => {
  const { features } = useContext(AppContext);

  const f = features.find((x) => x._id == feature);

  if (f) {
    return true;
  }

  return false;
};

function useFeatures() {
  const [features, setFeatures] = useState([]);

  const featureClient = new FeatureClient();

  const fetchFeatures = async () => {
    const f = await featureClient.getActiveFeatures();
    setFeatures(f);
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

  return features;
}

export { isFeatureActivated };

export default useFeatures;
