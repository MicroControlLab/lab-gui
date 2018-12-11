// // import * as Plotly from 'plotly.js';

// import { IMinimalData } from "../base_classes";
// import { PlotData } from "plotly.js";

// // interface IPlotDetails{
// //   container: Element | null;
// //   title: string;
// //   x_axis_label: string;
// //   y_axis_label: string;
// // }
// interface IPlotDetails{
//   container: Element | null;
//   store: Store;
// }

// interface testInterface{
//   minimal: IMinimalData;
//   plot_labels: IPlotLabels;
// }
// interface IPlotLabels{
//   title: string;
//   x_axis_label: string;
//   y_axis_label: string;

// }

// interface plot_marker{
//   color: string;
// }

// interface plotTrace{
//   name: string,
//   x: number[],
//   y: number[],
//   type: string,
//   mode: string,
//   marker: plot_marker
// }

// // plot data interfaces
// interface reduxAction{
//   type: string;
// }

// interface plotStateExtended extends Store{
//   plot_data: Partial<PlotData>[];
// }
// interface plotState{
//   plot_data: Partial<PlotData>[];
// }

// const inital_state: plotState = {
//   plot_data:
//     [{
//       name: "scatter",
//       x: [1, 2, 3],
//       y: [2, 6, 3],
//       type: 'scatter',
//       mode: "lines+markers",
//       marker: {color: 'red'},
//     }]
// }

// // data geration functions
// function generate_data(state: plotState){
//     let x_data = state.plot_data[0].x as number[];
//     let y_data = state.plot_data[0].y as number[];
//     for (let i = 10; i > 0; i--) {
//       x_data = [...x_data, Math.max(...x_data)+1]
//       y_data = [...y_data, Math.random()*20]
//     }
//     const data = [...state.plot_data];
//     data[0].y = y_data;
//     data[0].x = x_data;
//     return data;
// }

// interface plotStateExtended extends plotState{
//   otherData: any;
// }

// // REDUCER
// function manipulate_data(current_state: plotState|undefined, action: reduxAction) {
//   if(current_state !== undefined){
//     let nextState: plotState = {plot_data: current_state.plot_data}
//     switch (action.type) {
//       case "ADD":
//         const new_data = generate_data(nextState);
//         nextState.plot_data = new_data;
//         return nextState;
//         break;

//       default:
//         return current_state;
//     }
//   }
//   return current_state;
// }

// // manipulate_data({...inital_state, otherData: 1}, {type: "foo"})

// import { createStore, Store , applyMiddleware} from 'redux';
// import { createLogger } from "redux-logger";

// import * as React from 'react';
// import * as ReactDOM from "react-dom";
// import * as Plot from 'react-plotly.js';
// import * as Button from '@material-ui/core/Button';

// export class Ploter extends React.Component <any, any>{
//   container: Element;
//   store: Store;
//   x_data: number[] = [1, 2, 3];
//   y_data: number[] = [2, 6, 3];

//   constructor(min_req: IPlotDetails) {
//     super(min_req);
//     if(min_req.container !== null){
//       this.container = min_req.container;
//     }
//     else{
//       throw "container is not a valid html element";
//     }
//     this.store = min_req.store;
//     console.log("store: ", this.store)
//     console.log("plot data: ", this.store.getState())

//     this.state = {
//       layout: {autosize: true , title: 'A Fancyer Plot'},
//       frames: [],
//       config: {
//         modeBarButtonsToRemove: ['edit'],
//         displayModeBar: true,
//         scrollZoom: true,
//         displaylogo: false
//       }
//     };
//   }

//   show(){
//     {ReactDOM.render(< Ploter />, this.container ); }
//   }

//   render() {
//     return (
//       < React.Fragment >
//         <div style={{width: "100%" }}>
//           <Button variant="contained" color="primary" onClick={() => { {console.log("store: ", store)} } } >
//             Test
//           </Button>
//           </div>
//         </ React.Fragment >
//     );
//   }
// }
