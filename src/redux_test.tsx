import { StartBtn, StopBtn } from "./lib/buttons/button";
import * as React from "react";
import * as ReactDOM from "react-dom";

const TestContainer = document.querySelector(".test-container");
const TestContainer2 = document.querySelector(".test-container2");

// ReactDOM.render(< StartBtn />, TestContainer );
// ReactDOM.render(< StopBtn />, TestContainer2 );

let startBtn = new StartBtn({container: TestContainer}) 
startBtn.show()

let stopBtn = new StopBtn({container: TestContainer2}) 
stopBtn.show()