Setting up-

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

$ cd src && touch Winedataset.js 
