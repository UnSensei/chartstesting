import React, { useEffect, useState } from "react";
import "./App.css";
import { ChartGraph } from "./DragableGraph";
import { Chart, registerables } from "chart.js";
import dragable from "chartjs-plugin-dragdata";
import zoomer from "chartjs-plugin-zoom";
Chart.register(...registerables, dragable, zoomer);

const graphJSON = [
  {
    orderType: "Single",
    m1: 5,
    m2: null,
    m3: null,
    quantity: 50,
    price: 10,
    label: "Buy 5Y",
    points: [{ x: 5, y: 50 }],
  },
  {
    orderType: "Single",
    m1: 7,
    m2: null,
    m3: null,
    quantity: -100,
    price: 15,
    label: "Buy 7Y",
    points: [{ x: 7, y: -100 }],
  },
  {
    orderType: "Double",
    m1: 1,
    m2: 5,
    m3: null,
    quantity: 200,
    price: 5,
    label: "Buy 1Y,5Y",
    points: [
      { x: 1, y: 0 - 200 },
      { x: 5, y: 200 },
    ],
  },
  {
    orderType: "Triple",
    m1: 1,
    m2: 5,
    m3: 7,
    quantity: -500,
    price: 2,
    label: "Sell 1Y,5Y,7Y",
    points: [
      { x: 1, y: 500 },
      { x: 5, y: -500 },
      { x: 7, y: 500 },
    ],
  },
];

function App() {
  const [currentRow, setCurrentRow] = useState(null);
  const [labels] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);

  const getColor = (orderType) => {
    if (orderType === "Single") {
      return "blue";
    } else if (orderType === "Double") {
      return "red";
    } else return "green";
  };

  const [tableData, setTableData] = useState(graphJSON);

  const [dataSet, setDataSet] = useState(
    graphJSON.map((item, index) => {
      return {
        label: item.label,
        data: item.points,
        borderColor: getColor(item.orderType),
        borderWidth: 1,
        pointRadius: 10,
        pointHoverRadius: 10,
        pointBackgroundColor: getColor(item.orderType),
        pointBorderWidth: 0,
        spanGaps: false,
      };
    })
  );
  const updatePosition = (datasetIndex, index, value) => {
    console.log(datasetIndex, index, value, "abc", dataSet);
    const tempData = [...tableData];
    tempData[datasetIndex].points[index] = value;
    setTableData(tempData);
    setCurrentRow(datasetIndex);
    console.log(tempData[datasetIndex].points[index]);
  };

  const getOptions = {
    ondblclick: function (e, datasetIndex, index, value) {
      console.log(datasetIndex, index, value, "on double click end");
    },
    plugins: {
      dragData: {
        enabled: true,
        round: 1,
        showTooltip: true,
        dragX: true,
        onDragStart: function (e) {
          console.log(e, "starting");
        },
        onDrag: function (e, datasetIndex, index, value) {
          // console.log(datasetIndex, index, value, "on drag");
          if (value > 600 || value < -600) return false;
        },
        onDragEnd: function (e, datasetIndex, index, value) {
          console.log(datasetIndex, index, value, "on Drag end");
          updatePosition(datasetIndex, index, value);
        },
      },
      legend: {
        labels: {
          usePointStyle: true,
        },
      },
      zoom: {
        zoom: {
          // zoom options and/or events
          wheel: { enabled: true },
          enabled: true,
          mode: "xy",
        },
      },
    },
    scales: {
      y: {
        label: "qua",
        max: 700,
        min: -700,
      },
      x: {
        max: 8,
        min: 0,
      },
    },

    tooltips: { enabled: true },

    legend: {
      display: false,
    },
    dragData: true,
  };

  useEffect(() => {
    const lineData = graphJSON.map((item, index) => {
      return {
        label: item.label,
        data: item.points,
        borderColor: getColor(item.orderType),
        borderWidth: 1,
        pointRadius: 10,
        pointHoverRadius: 10,
        pointBackgroundColor: getColor(item.orderType),
        pointBorderWidth: 0,
        spanGaps: false,
      };
    });

    setDataSet(lineData);
  }, []);

  const showQuantity = (val) => {
    if (val) {
      return `${val.y || null} at ${val.x}`;
    }
    return "";
  };

  return (
    <div className="App">
      <div className="App-header">
        {/* <Line
          data={{
            labels: labels,
            datasets: dataSet,
          }}
          options={getOptions}
          width={1000}
          height={500}
        /> */}
        <ChartGraph
          data={{
            labels: labels,
            datasets: dataSet,
          }}
          configOptions={getOptions}
        />
        <div style={{ backgroundColor: "white", padding: 10, margin: 20 }}>
          <table
            style={{
              color: "black",
              borderWidth: 1,
              borderCollapse: "collapse",
            }}
          >
            <tr>
              <th>Order Type</th>
              <th>Maturity 1</th>
              <th>Maturity 2</th>
              <th>Maturity 3</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
            {tableData.map((val, index) => {
              return (
                <tr
                  style={{
                    border: currentRow === index ? "solid 1px red" : "none",
                  }}
                >
                  <td>{val.orderType}</td>
                  <td>{`${val.points[0].y} at ${val.points[0].x}`}</td>
                  <td>{showQuantity(val.points[1])}</td>
                  <td>{showQuantity(val.points[2])}</td>
                  <td>{val.price}</td>
                  <td>{val.label}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
