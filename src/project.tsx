import * as React from "react";
import * as ReactDOM from "react-dom";
import { ScatterPlot } from "./lib/plotting";
import * as Plotly from 'plotly.js';
import { ScatterData} from 'plotly.js';

import { IMinimalData } from "./lib/base_classes";



const PlotContainer = document.querySelector(".plot-container");
const TestContainer = document.querySelector(".test-container");
const TestContainer2 = document.querySelector(".test-container2");

// const test_instance = {
// 	container: PlotContainer,
// 	title: "title foo",
// 	x_axis_label: "x",
// 	y_axis_label: "y"
// }


// const mainPlot = new ScatterPlot(test_instance);
// mainPlot.show()

// https://github.com/plotly/react-plotly.js#state-management

// let trace1 = {
// 	x: [1, 2, 3, 4, 5],
// 	y: [1, 6, 3, 6, 1],
// 	mode: 'markers',
// 	type: 'scatter',
// 	name: 'Team A',
// 	text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
// 	marker: { size: 12 }
// } as ScatterData;	

// Plotly.newPlot("plot_container_with_id", [trace1]);

// ReactDOM.render(< ScatterPlot />, PlotContainer);

let plot = new ScatterPlot({container:PlotContainer})
plot.show()

import ContainedButtons from './test-material-ui';
class buttonClass{
  container: Element;
  
  constructor(min_req: IMinimalData) {
  	if(min_req.container !== null){
    	this.container = min_req.container;
	}
	else{
		throw "container is not a valid html element";
		
	}
  }

  show(){
    {ReactDOM.render(< ContainedButtons />, this.container ); }
  }
}

let reactClass = new buttonClass({container:TestContainer2})
reactClass.show()
