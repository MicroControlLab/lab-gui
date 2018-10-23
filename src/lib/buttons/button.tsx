import { Store } from "redux"


import * as React from 'react';
import * as ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux';
import { MinimalPropRequirement, ReduxComponentBaseClass} from "../base_classes"


export interface ButtonProps extends MinimalPropRequirement{
	color?: "primary"|"secondary"
	text?: string
	class_names?: string|string[]
	disabled?: boolean
}

export class ReduxButton extends ReduxComponentBaseClass{
	color: ButtonProps["color"] = "primary"
	text: string = "button text"
	class_names: string|string[] = "button"
	className: string = "button"

	constructor(props: ButtonProps){
		super(props)
		if(props.color !== undefined){
    	this.color = props.color
		}
		// if(props.container !== undefined){
  //   	this.container = props.container
		// }
		if(typeof(props.class_names) !== "string" &&  props.class_names !== undefined){
			this.className = props.class_names.join(" ")
		}
		else if(props.class_names !== undefined){
			this.className = props.class_names
		}

	}

	onClick(){
		console.log("clabback run")
		console.log(this)
	}

	render(){
		return (
			// <Provider store={this.store}>
	      <Button variant="contained" 
	      				color={this.color} 
	      				className={this.className}
	      				onClick={() => this.onClick()}>
	        {this.text}
	      </Button>
	    // </ Provider>
	  )
	}
}

export class StartBtn extends ReduxButton{

	constructor(props: ButtonProps){
		super(props)
		this.text = "Start" 
	}
}

export class StopBtn extends ReduxButton{

	constructor(props: ButtonProps){
		super(props)
		this.text = "Stop"
		this.color = "secondary"
	}
}