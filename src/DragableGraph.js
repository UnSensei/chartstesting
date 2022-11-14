import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dragable from "chartjs-plugin-dragdata";
import zoomer from "chartjs-plugin-zoom";
Chart.register(...registerables, dragable, zoomer);

export const ChartGraph = ({ data, configOptions }) => {
  const [lineData, setLineData] = useState(data);
  return (
    <div style={{ backgroundColor: "white", margin: 20 }}>
      <Line data={lineData} options={configOptions} width={1000} height={500} />
      {/* <button onClick={() => null}>Reset Zoom</button> */}
    </div>
  );
};
