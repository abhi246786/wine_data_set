import React from "react";
import ReactDOM from "react-dom";
import ReactEcharts from "echarts-for-react";

import "./styles.css";

const option = {
  title: {
    text: "ECharts 入门示例" //标题
  },
  tooltip: {},
  legend: {
    data: ["销量"] //图例
  },
  grid: {
    bottom: 80
  },
  xAxis: {
    show: true, // 更改为 false 隐藏 x 轴和标签 label,
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"], //对应 label 名
    name: "商品\n名称", //x轴名称，出现在 x轴末尾，可以不填
    nameLocation: "center", //x轴名称位置， 可为'start', 'center', 'end', 默认'end';
    nameTextStyle: {
      //控制 name 样式
      color: "blue",
      fontSize: "20", //默认12px
      padding: 10
    },
    nameGap: 15, //name 与轴线的距离，默认15
    silent: false, //关闭交互
    axisLine: {
      //轴线
      show: true, //false 时隐藏
      lineStyle: {
        color: "green", //同时改变了 label 颜色
        width: 5 //x轴线条粗细，默认1px
      }
    },
    axisTick: {
      show: true, //为 false 时隐藏
      alignWithLabel: true,
      interval: 0, //可以设置成 0 强制显示所有tick, 不是 label
      length: 10, // tick 长度, 默认5
      lineStyle: {
        color: "gray",
        width: 2 //tick 宽度
      }
    },
    axisLabel: {
      //x轴上标签
      show: true, //false 时隐藏，
      interval: 0, //label显示间隔
      margin: 20, //label 与轴线的距离
      color: "red", // 统一改 label 颜色
      fontSize: 18 //默认12px
    }
  },
  yAxis: {},
  series: [
    {
      name: "销量",
      type: "bar",
      data: [5, 20, 36, 10, 10, 20]
    }
  ]
};

function App() {
  return (
    <div className="App">
      <h1>xAxis - category</h1>

      <ReactEcharts
        option={option}
        style={{ height: "600px", width: "100%", marginBottom: "20px" }} //TODO: 高度太小 category 会不显示; 宽度不够, label 也显示不全，而且拉宽了也不显示； 怎么改颜色
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
