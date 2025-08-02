import { useEffect, useState } from "react";
import ChartWrapper from "./components/ChartWrapper";

function App() {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then(setCharts)
      .catch((err) => console.error("خطا در خواندن data.json", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      {charts.map((chart, index) => (
        <ChartWrapper key={index} title={chart.title} data={chart.data} />
      ))}
    </div>
  );
}

export default App;
