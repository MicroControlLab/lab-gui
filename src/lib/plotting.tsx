// import * as Plotly from 'plotly.js';

import { IMinimalData } from "./base_classes";



interface IPlotDetails{
	container: Element | null;
	title: string;
	x_axis_label: string;
	y_axis_label: string;
}

interface testInterface{
	minimal: IMinimalData;
	plot_labels: IPlotLabels;
}
interface IPlotLabels{
	title: string;
	x_axis_label: string;
	y_axis_label: string;

}

import React from 'react';
import * as ReactDOM from "react-dom";
import Plot from 'react-plotly.js';
import Button from '@material-ui/core/Button';

export class ScatterPlot extends React.Component {
  container: Element;
  x_data: number[] = [1, 2, 3];
  y_data: number[] = [2, 6, 3];
  
  constructor(min_req: IMinimalData) {
  	super(min_req);
  	if(min_req.container !== null){
    	this.container = min_req.container;
		}
		else{
			throw "container is not a valid html element";
			
		}
  }

  show(){
  	{ReactDOM.render(< ScatterPlot />, this.container ); }
  }

  add_data(){
  	for (var i = 10; i >= 0; i--) {
	  	this.x_data = [...this.x_data, Math.max(...this.x_data)+1]
	  	this.y_data = [...this.y_data, Math.random()*20]
  	}
  	console.log(this.x_data)
  }

  render() {
    return (
    	< React.Fragment >
	    	<Button variant="contained" color="primary" onClick={() => {this.add_data()}} >
	        Add Data
	      </Button>


		      <Plot
		        data={[
		          { 
		          	name: "scatter",
		            x: this.x_data,
		            y: this.y_data,
		            type: 'scatter',
		            mode: "lines+markers",
		            marker: {color: 'red'},
		          },
		          {
		          	type: 'bar', 
		          	x: this.x_data, 
		          	y: this.y_data, 
		          	name: "bars"},
		        ]}
		        layout={ {width: 500, height: 400, title: 'A Fancyer Plot'} }
		      />
      	</ React.Fragment >
    );
  }
}

// export ScatterPlot;

// let test_instance = {
// 	container: document.querySelector(".plot-container"), 
// 	title: "title",
// 	x_axis_label: "x",
// 	y_axis_label: "y"
// }

// let tests = new ScatterPlot(test_instance)
// tests.show()