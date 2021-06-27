Setting up

We are going to start by using Facebook’s npm package, create-react-app, to build our React project. Create the project by entering the following line in command:

 $ create-react-app react-echarts-tutorial

Once the project is created, you can test if the web development server is running by going into the project folder,

$ cd react-echarts-tutorial 

and running:

$ npm start

The following default page should show up in your browser:

Next, we will add ECharts to the project. Run:

$ npm i echarts echarts-for-react

Go into App.js and replace the default codes with:
// src/App.js
import React, { Component } from “react”;
import ReactEcharts from “echarts-for-react”;
class App extends Component {
  render() {
    return (
      <ReactEcharts
        option={{
          xAxis: {
            type: “category”,
            data: [“Mon”, “Tue”, “Wed”, “Thu”, “Fri”, “Sat”, “Sun”]
          },
          yAxis: {
            type: “value”
          },
          series: [{ 
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: “line”
          }]
        }}
      />
    );
  }
}
export default App;

Go back to your browser and you should be able to see the following chart:

Adding data to project

Now that ECharts has been added to your React project, let’s begin adding actual data to the chart.
For this tutorial, I will not be demonstrating how to retrieve the chart’s data from a database. Instead I have downloaded the data from the Singapore OneMap API , pre-processed and separated the data by genders.
You will need to create two new files in the ‘src’ folder:

$ cd src && touch DataFemale.js DataMale.js

Next, follow the links below and copy the wine data into, DataFemale.js and DataMale.js.

About the data structure

Our chart would be displaying a wine dataset with different categories of alcohol. As such, I have further grouped the data by uses. Each of these groups consist of a list of objects that would make up the columns of our chart. ECharts would read and draw the columns on our chart based on two keys in each object, namely — “name” and “value”.
Linking data and chart

Add these two lines to your list of imports at the top of the App.js file.
// src/App.js
import React, { Component } from “react”;
import ReactEcharts from “echarts-for-react”;
import { populationDataFemale } from "./DataFemale";
import { populationDataMale } from "./DataMale";
class App extends Component {
 ...
Go to the ReactEcharts element and remove the value for the ‘option’ prop. We will instead pass our options as a function called getOption. Copy and paste the following lines of codes:
// src/App.js
class App extends Component {
 ...
  render() {
    return (
      <ReactEcharts
        option={this.getOption()}
        style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
        opts={{ renderer: "svg" }}
      />
    );
  }
}
export default App;

Next, create the getOption function and add the following codes:
// src/App.js
class App extends Component {
  getOption = () => {
    return {
      options: options
    };
  };
...
The getOption function will be returning an object. At the moment, we are only returning ‘options’.
Getting values for 'uses' and ‘consumption’
While we may already know the uses and consumption that would be displayed on the chart, it is good practice to retrieve these values from our data instead of hard-coding them.

// src/App.js
class App extends Component {
  getOption = () => {
    let districts = [];
    let years = [];
    Object.entries(populationDataFemale).forEach(entry => {
      years = [...years, entry[0]];
      entry[1].forEach(e => {
        districts = [...new Set([...districts, e.name])];
      });
    });
    return {
      options: options
    };
  };
...
As both uses and consumption data sets follow the same structure.

With uses now available, we would pack the data sets of all categories together and pass these to the chart as a list of objects, grouped by consumption. Each of these objects would be pushed to the chart at a given interval hence revealing the data for the respective consumption. Each object is also assigned a title indicating the year in which the displayed data belongs to.

// src/App.js
class App extends Component {
  getOption = () => {
  ...
    let options = years.map(year => {
      let obj = {};
      obj.title = {
        text: `Population of Singapore by District, ${year}`
      };
      obj.series = [
        {
           stack: "group",
           data: populationDataFemale[year]
        },
        {
           stack: "group",
           data: populationDataMale[year]
        }
      ];
      return obj;
    });
    return {
      options: options
      };
    };
...
Next, we will be passing “baseOption” into the returning object. Base options are the settings aside from the dynamic settings specified in options. They allow the customization of other elements within your charts such as the display settings of your x-axis, y-axis, tool tips, and grid. The official documentation by ECharts would be able to provide a better description of each settings.
Setting time step interval for updating data
Instead of having to write a function to update the chart’s data at intervals, ECharts provides a handy prop called “timeline”.
The “timeline” setting allows you to define the interval in which your data gets updated. This can be done by providing a number (in milliseconds) to “playInterval”, a child setting of “timeline”. For this project, we would be setting the interval at 1000 milliseconds (1 second).
// src/App.js
class App extends Component {
  getOption = () => {
...
  return {
    baseOption: {
      timeline: {
        autoPlay: true,
        axisType: "category",
        bottom: 20,
        data: years,
        height: null,
        inverse: true,
        left: null,
        orient: "vertical",
        playInterval: 1000,
        right: 0,
        top: 20,
        width: 55, 
        label: {
          normal: {
            textStyle: {
              color: "#aaa"
            }
          },
          emphasis: {
            textStyle: {
              color: "#333"
            }
          }
        },
        symbol: "none",
        lineStyle: { 
          color: "#aaa"
        },
        checkpointStyle: {
          color: "#354EF6",
          borderColor: "transparent",
          borderWidth: 2
        },
        controlStyle: {
          showNextBtn: false,
          showPrevBtn: false,
          normal: {
            color: "#354EF6",
            borderColor: "#354EF6"
          },
          emphasis: {
            color: "#5d71f7",
            borderColor: "#5d71f7"
          }
        }
      },
      ...
    },
    options: options
  };
};
...
Finishing up
Add the remaining “baseOption” codes below and save.
// src/App.js
class App extends Component {
  getOption = () => {
...
return {
    baseOption: {
      timeline: {
      ...
      },
      color: ["#e91e63 ", "#354EF6"],
      title: {
        subtext: "Data from the Singapore Department of Statistics",
        textAlign: "left",
        left: "5%"
      },
      tooltip: { backgroundColor: "#555", borderWidth: 0, padding: 10},
      legend: {
        data: ["Female", "Male"],
        itemGap: 35,
        itemHeight: 18,
        right: "11%",
        top: 20
      },
      calculable: true,
      grid: {
        top: 100,
        bottom: 150,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              formatter: function(params) {
                return params.value.replace("\n", "");
              }
            }
          }
        }
      },
      xAxis: [
        {
          axisLabel: {
            interval: 0,
            rotate: 55,
            textStyle: {
              baseline: "top",
              color: "#333",
              fontSize: 10,
              fontWeight: "bold"
            }
          },
          axisLine: { lineStyle: { color: "#aaa" }, show: true },
          axisTick: { show: false },
          data: districts,
          splitLine: { show: false },
          type: "category"
        }
      ],
      yAxis: [
        {
          axisLabel: {
            textStyle: { fontSize: 10 }
          },
          axisLine: { show: false },
          axisTick: { show: false },
          name: "Population",
          splitLine: {
            lineStyle: {
              type: "dotted"
            }
          },
          type: "value"
        }
      ],
      series: [{ name: "Female", type: "bar" }, { name: "Male", type: "bar" }]
    },
    options: options
  };
};
...
Return to your browser and you should be able to see your dynamic chart.
