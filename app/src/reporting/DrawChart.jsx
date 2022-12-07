
// https://medium.com/tinyso/how-to-create-pie-donut-chart-in-react-using-d3-js-9ea695bcf819
import * as d3 from "d3";

const DrawChart = (element, data, innerRadius, outerRadius) => {

  const colorScale = d3     
    .scaleSequential()      
    .interpolator(d3.interpolateCool)      
    .domain([0, data.length]);

  const boxSize = outerRadius * 2;

  d3.select(element).select("svg").remove(); // Remove the old svg
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);

  const arcGenerator = d3.arc().cornerRadius(10).padAngle(0.02).innerRadius(innerRadius).outerRadius(outerRadius);

  const pieGenerator = d3.pie().value((d) => d.value);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();
  arcs
    .append("path")
    .attr("d", arcGenerator)
    .style("fill", (d, i) => d.data.color ?? colorScale(i))
    .transition()
    .duration(700)
    .attrTween("d", function (d) {
      const i = d3.interpolate(d.startAngle, d.endAngle);
      return function (t) {
        d.endAngle = i(t);
        return arcGenerator(d);
      };
    });

  arcs
    .append("text")
    .attr("text-anchor", "middle")
    .text((d) => `${d.data.value} (${d.data.label})`) // label text
    .style("fill", "#fff")
    .style("font-size", "30px")
    .attr("transform", (d) => {
      const [x,y] = arcGenerator.centroid(d);
      return `translate(${x}, ${y})`;
    });
};

export default DrawChart;