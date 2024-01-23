import React from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const Data = [
  {
    type: "Jan",
    sales: 38,
  },
  {
    type: "Feb",
    sales: 52,
  },
  {
    type: "Mar",
    sales: 61,
  },
  {
    type: "Apr",
    sales: 145,
  },
  {
    type: "May",
    sales: 48,
  },
  {
    type: "Jun",
    sales: 38,
  },
  {
    type: "Jul",
    sales: 38,
  },
  {
    type: "Aug",
    sales: 38,
  },
  {
    type: "Sep",
    sales: 38,
  },
  {
    type: "Oct",
    sales: 38,
  },
  {
    type: "Nov",
    sales: 38,
  },
  {
    type: "Dec",
    sales: 38,
  },
];

const BarChart = ({ id }) => {
  const chartData = {
    labels: Data.map((data) => data.type),
    datasets: [
      {
        label: "Sales",
        data: Data.map((data) => data.sales),
        backgroundColor: "#ffd333",
        borderWidth: 0,
      },
    ],
  };
  return (
    <div className="chart-container">
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
