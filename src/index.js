import React from "react";
import ReactDOM from "react-dom";
import ReactEcharts from "echarts-for-react";

import "./styles.css";

const option = {
  legend: {
    show: true
  },
  tooltip: {},
  dataset: {
    source: [
      ["score", "amount", "product"],
      [89.3, 58212, "Vodka"],
      [57.1, 78254, "Whisky"],
      [74.4, 41032, "Brandy"],
      [50.1, 12755, "Vermouth"],
      [89.7, 20145, "Cognac"],
      [68.1, 79146, "Beer"],
      [19.6, 91852, "Port Wine"],
      [10.6, 101852, "Rum"],
      [32.7, 20112, "Gin"]
    ]
  },
  xAxis: [{ gridIndex: 0 }],
  yAxis: [{ gridIndex: 0, type: "category" }],
  grid: [{ left: "12%", right: "50%" }],
  series: [
    {
      type: "bar",
      encode: {
        x: "amount",
        y: "product"
      }
    },
    {
      type: "pie",
      // xAxisIndex: 0,
      // yAxisIndex: 0,
      encode: {
        value: "score",
        itemName: "product"
      },
      tooltip: ["product", "score"],
      radius: "30%",
      center: ["70%", "50%"],
      label: {
        show: true
      }
    }
  ]
};

function App() {
  return (
    <div className="App">
      <h1>Wine Dataset</h1>
      <ReactEcharts
        option={option}
        style={{ height: "600px", width: "100%", marginBottom: "20px" }} //TODO: 高度太小 category 会不显示; 宽度不够, label 也显示不全，而且拉宽了也不显示； 怎么改颜色
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
