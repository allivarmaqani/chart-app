import { useEffect, useRef } from "react";
import * as d3 from "d3";

const SingleLineChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const filteredData = data.filter((d) => d[1] !== null);

    const margin = { top: 30, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d[0]))
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain(d3.extent(filteredData, (d) => d[1]))
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => x(d[0]))
      .y((d) => y(d[1]));

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("background", "#222")
      .style("color", "#fff")
      .style("padding", "6px 10px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

 
    g.append("path")
      .datum(filteredData)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2.5)
      .attr("d", line);

   
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(-height).tickPadding(10))
      .selectAll("text")
      .style("fill", "#aaa");

    g.append("g")
      .call(d3.axisLeft(y).tickSize(-width).tickPadding(10))
      .selectAll("text")
      .style("fill", "#aaa");

    
    g.selectAll(".dot")
      .data(filteredData)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d[0]))
      .attr("cy", (d) => y(d[1]))
      .attr("r", 4)
      .attr("fill", "#3b82f6")
      .attr("opacity", 0.9)
      .on("mouseover", (event, d) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip
          .html(`x: ${d[0]}<br/>y: ${d[1]}`)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  }, [data]);

  return (
    <svg
      ref={svgRef}
      width={600}
      height={300}
      style={{ borderRadius: "12px", background: "#111317" }}
    />
  );
};

export default SingleLineChart;
