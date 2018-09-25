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

export class ScatterPlot extends React.Component <any, any>{
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

		this.state = { 
			data: [
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
		          	name: "bars"}
		          	], 
		  layout: {autosize: true , title: 'A Fancyer Plot'}, 
		  frames: [], 
		  config: {
		  	modeBarButtonsToRemove: ['edit'],
		  	displayModeBar: true,
		  	scrollZoom: true,
		  	displaylogo: false
		  } 
		};
  }

  show(){
  	{ReactDOM.render(< ScatterPlot />, this.container ); }
  }

  add_data(){
  	let x_data = this.state.data[0].x;
  	let y_data = this.state.data[1].y;
  	let start = Date.now();
  	for (let i = 1000; i > 0; i--) {
	  	x_data = [...x_data, Math.max(...x_data)+1]
	  	y_data = [...y_data, Math.random()*20]
  	}
		const data = [...this.state.data];
  	data[0].y = y_data;
  	data[0].x = x_data;
  	data[1].x = x_data;
  	data[1].y = y_data;
  	console.log(data[0]);
  	console.log(data[1]);
  	this.setState({ data: data });
	 //  const   newState = ()=> { 
	 //    items: [...this.state.items, this.state.field];
	 //  }
	 console.log(Date.now()-start)
  	console.log(this.state.data[0]);
  	console.log(this.state.data[1]);
  }

  render() {
    return (
    	< React.Fragment >
	    	<div style={{width: "100%" }}>
		    	<Button variant="contained" color="primary" onClick={() => {this.add_data()}} >
		        Add Data
		      </Button>
	      </div>


		      <Plot
            data={this.state.data}
            layout={this.state.layout}
            frames={this.state.frames}
            config={this.state.config}
            onInitialized={(figure) => this.setState(figure)}
            onUpdate={(figure) => this.setState(figure)}
            useResizeHandler={ true }
            className="responsive-plot"
		      />
      	</ React.Fragment >
    );
  }
}