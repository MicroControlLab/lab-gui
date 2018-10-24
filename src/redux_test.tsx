import { StartBtn, StopBtn } from "./lib/buttons/button";
import { UiGenerator } from "./lib/ui_generator";
import * as React from "react";
import * as ReactDOM from "react-dom";


import { Reducer, AnyAction } from 'redux'

// start.class_names = ["test1", "test2"]

const initialState = {
	uiActive: false
} 

const testReducer: Reducer<any, AnyAction> = 
(state: any = initialState, action: AnyAction) =>{
	let users;
  switch (action.type) {
  	case "DEACTIVATE_UI":
  		return {...state, uiActive: false};
  	case "ACTIVATE_UI":
  		return {...state, uiActive: true};
    default:
      return {...state, uiActive: false};;
  }
}



const TestContainer = document.querySelector(".test-container");
const TestContainer2 = document.querySelector(".test-container2");

const Ui = new UiGenerator()

const start = new StartBtn({container: TestContainer, name: "start"})
const stop = new StopBtn({container: TestContainer2, name: "stop"})

// start.add_reducer("uiActive1", testReducer)
// start.add_reducer("uiActive", testReducer)
// stop.add_reducer("uiActive2", testReducer)

Ui.add_element(start)
Ui.add_element(stop)
Ui.show()
