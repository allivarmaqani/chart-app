import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const colors = ["blue", "green", "red"];
const labels = ["Series 1", "Series 2", "Series 3"];

const MultiLineChart = ({ data }) => {
  const svgRef = useRef(null);
  const [visible, setVisible] = useState([true, true, true]);

  const toggleVisibility = (index) => {
    const newVisible = [...visible];
    newVisible[index] = !newVisible[index];
    setVisible(newVisible);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const margin = { top: 40, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[0]))
      .range([0, width]);

    const allVisibleValues = data
      .flatMap((d) =>
        d[1].filter((v, i) => visible[i] && v !== null && typeof v === "number")
      );

    const y = d3
      .scaleLinear()
      .domain(d3.extent(allVisibleValues))
      .nice()
      .range([height, 0]);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    [0, 1, 2].forEach((seriesIndex) => {
      if (!visible[seriesIndex]) return;

      const seriesData = data
        .map(([t, arr]) => [t, arr?.[seriesIndex]])
        .filter((d) => d[1] !== null && typeof d[1] === "number");

      const line = d3
        .line()
        .x((d) => x(d[0]))
        .y((d) => y(d[1]));

     g.append("path")
    .datum(seriesData)
    .attr("fill", "none")
    .attr("stroke", colors[seriesIndex])
    .attr("stroke-width", 2)
    .attr("opacity", 0)  
    .attr("d", line)
    .transition()
    .duration(400)
    .attr("opacity", 1); 
    });

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .style("fill", "#aaa");

    g.append("g").call(d3.axisLeft(y)).selectAll("text").style("fill", "#aaa");
  }, [data, visible]);

  return (
    <div>
      <svg
        ref={svgRef}
        width={600}
        height={300}
        style={{ borderRadius: "12px", background: "#111317" }}
      />
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginTop: "1rem" }}>
        {labels.map((label, i) => (
          <div
            key={i}
            onClick={() => toggleVisibility(i)}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              opacity: visible[i] ? 1 : 0.4,
              transition: "opacity 0.3s",
              userSelect: "none",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                backgroundColor: colors[i],
                borderRadius: "50%",
                marginRight: 8,
              }}
            />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiLineChart;
