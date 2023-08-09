import React from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import arrowUp from "../../assets/employeeOverview/ArrowUp.svg";

const DoughnutChart = ({ data1, data2 }) => {
  const data = {
    datasets: [
      {
        backgroundColor: ["#FF8A1E ", "white"],
        data: [data1, data2],
        borderWidth: 0,
        cutout: "75%",
        borderRadius: 20,
      },
    ],
  };
  return (
    <div className="flex justify-center items-center relative">
      <img src={arrowUp} alt="arrow" className="absolute top-[35%] z-30" />
      <Doughnut
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
        className="z-40"
      />
    </div>
  );
};
export default DoughnutChart;
