import React from "react";
import { Chart } from "react-google-charts";

const CostLineChart = ({ props, lineData, chartTitle, chartSubTitle }) => {
  let tableData = props?.map((prop, i) => {
    return [prop.date, prop.total_cost];
  });

  const data = [["date", lineData], ...tableData];

  const options = {
    chart: {
      title: chartTitle,
      subtitle: chartSubTitle,
    },
  };

  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default CostLineChart;
