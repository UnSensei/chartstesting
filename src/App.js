import "./App.css";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import highchartsMore from "highcharts/highcharts-more";
import Indicators from "highcharts/indicators/indicators-all.js";
import DragPanes from "highcharts/modules/drag-panes.js";
import AnnotationsAdvanced from "highcharts/modules/annotations-advanced.js";
import PriceIndicator from "highcharts/modules/price-indicator.js";
import FullScreen from "highcharts/modules/full-screen.js";
import StockTools from "highcharts/modules/stock-tools.js";

highchartsMore(Highcharts);
Indicators(Highcharts);
DragPanes(Highcharts);
AnnotationsAdvanced(Highcharts);
PriceIndicator(Highcharts);
FullScreen(Highcharts);
StockTools(Highcharts);

const data = [
  {
    orderType: "Single",
    m1: 5,
    m2: null,
    m3: null,
    quantity: 50,
    price: 10,
    label: "Buy 5Y",
  },
  {
    orderType: "Single",
    m1: 7,
    m2: null,
    m3: null,
    quantity: -100,
    price: 15,
    label: "Buy 7Y",
  },
  {
    orderType: "Double",
    m1: 1,
    m2: 5,
    m3: null,
    quantity: 200,
    price: 5,
    label: "Buy 1Y,5Y",
  },
  {
    orderType: "Triple",
    m1: 1,
    m2: 5,
    m3: 7,
    quantity: -500,
    price: 2,
    label: "Sell 1Y,5Y,7Y",
  },
];

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={{
            chart: { width: 1000, height: 500, zoomType: "xy" },
            title: {
              text: "Quantity vs Maturity",
            },
            rangeSelector: { selected: 1 },

            yAxis: {
              plotLines: [
                {
                  color: "#FF0000",
                  width: 1,
                  value: 0,
                  zIndex: 2,
                },
              ],
              gridLineWidth: 1,
              title: {
                text: "Quantity",
              },
            },

            xAxis: {
              categories: [0, 1, 2, 3, 4, 5, 6, 7, 8],
              gridLineWidth: 1,
              title: {
                text: "Maturity",
              },
            },

            legend: {
              layout: "vertical",
              align: "right",
              verticalAlign: "middle",
            },

            plotOptions: {
              series: {
                label: {
                  connectorAllowed: false,
                },
                pointStart: 0,
              },
            },

            series: [
              {
                symbol: "diamond",
                name: "Buy 5Y",
                data: [[5, 50]],
              },
              { symbol: "diamond", name: "Sell 7Y", data: [[7, -100]] },
              {
                symbol: "circle",
                name: "Buy 1Y,5Y",
                data: [
                  [1, -200],
                  [5, 200],
                ],
              },
              {
                symbol:
                  "url(https://cdn-icons-png.flaticon.com/512/130/130188.png)",
                name: "Sell 1Y,5Y,7Y",
                data: [
                  [1, 500],
                  [5, -500],
                  [7, 500],
                ],
              },
            ],

            responsive: {
              rules: [
                {
                  condition: {
                    maxWidth: 1500,
                  },
                  chartOptions: {
                    legend: {
                      layout: "horizontal",
                      align: "center",
                      verticalAlign: "bottom",
                    },
                  },
                },
              ],
            },
          }}
        />
        <div style={{ backgroundColor: "white", padding: 10, margin: 20 }}>
          <table style={{ color: "black" }}>
            <tr>
              <th>Order Type</th>
              <th>Maturity 1</th>
              <th>Maturity 2</th>
              <th>Maturity 3</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.orderType}</td>
                  <td>{val.m1}</td>
                  <td>{val.m2}</td>
                  <td>{val.m3}</td>
                  <td>{val.quantity}</td>
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
