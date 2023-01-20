import React, { useEffect, useRef } from "react";
import Proptypes from "prop-types";

import DrawChart from "./DrawChart";

type props = {
  data: any,
  innerRadius: number,
  outerRadius: number
}

const DonutChart = ({ data, innerRadius, outerRadius } : props) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
        DrawChart(ref.current, data, innerRadius, outerRadius);
    }
  }, [ref]);

  return (
    <div className="container">
      <div className="graph" ref={ref} />
    </div>
  );
};

DonutChart.propTypes = {
    innerRadius: Proptypes.number,
    outerRadius: Proptypes.number
  };
  
  DonutChart.defaultProps = {
    innerRadius: 100,
    outerRadius: 250
  };
  

export default React.memo(DonutChart);