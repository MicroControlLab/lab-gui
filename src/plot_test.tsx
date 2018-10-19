import * as React from "react";
import * as ReactDOM from "react-dom";
import { ScatterPlot } from "./lib/plotting";
import { createStore, Store , applyMiddleware} from 'redux';
import { createLogger } from "redux-logger";

import { Ploter } from "./lib/plotting/plotting_redux";

import { IMinimalData } from "./lib/base_classes";



const PlotContainer = document.querySelector(".plot-container");
const TestContainer = document.querySelector(".test-container");
const TestContainer2 = document.querySelector(".test-container2");

let loggerMiddleware = createLogger()
const store = createStore(manipulate_data, inital_state, applyMiddleware(loggerMiddleware));
const plot = new ScatterPlot({container:PlotContainer, store: store})
plot.show()