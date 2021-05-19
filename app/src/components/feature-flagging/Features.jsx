import React, { useContext, useEffect, useState } from "react";

import { Skeleton } from "@material-ui/lab";
import MaterialTable from "material-table";

import AppContext from "@aabp/context/appContext";

import FeatureClient from "@aabp/clients/featureClient";

import "./features.scss";

const Features = () => {
    const { init } = useContext(AppContext);
    const [features, setFeatures] = useState([]);
    const featureClient = new FeatureClient();

    const columns = 
    [
      { title: 'Nom', field: '_id' }
    ];

    useEffect(() => {
        const getList = async() => {
            var data = await featureClient.getList();

            if (data) {
                setFeatures(data);
            }
        };

        getList();

    }, []);

    if(!init) {
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

export default Features;