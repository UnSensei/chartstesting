import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import dragable from "chartjs-plugin-dragdata";
import zoomer from "chartjs-plugin-zoom";
Chart.register(...registerables, dragable, zoomer);

// [{ x: 5, y: 50 }],
//     [{ x: 7, y: -100 }],
//     [
//       { x: 1, y: 0 - 200 },
//       { x: 5, y: 200 },
//     ],
//     [
//       { x: 1, y: 500 },
//       { x: 5, y: -500 },
//       { x: 7, y: 500 },
//     ],

export const ChartGraph = ({ data, configOptions }) => {
  const [lineData, setLineData] = useState(data);
  return (
    <div style={{ backgroundColor: "white", margin: 20 }}>
      <Line data={lineData} options={configOptions} width={1000} height={500} />
      {/* <button onClick={() => null}>Reset Zoom</button> */}
    </div>
  );
};
