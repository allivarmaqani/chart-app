import SingleLineChart from "./SingleLineChart";
import MultiLineChart from "./MultiLineChart";

const ChartWrapper = ({ title, data }) => {
  const isMultiSeries = Array.isArray(data?.[0]?.[1]);

  return (
    <div className="chart-card">
  <h2>{title}</h2>
  {isMultiSeries ? (
    <MultiLineChart data={data} />
  ) : (
    <SingleLineChart data={data} />
  )}
</div>

  );
};

export default ChartWrapper;
