import { Store } from "redux"


import * as React from 'react';
import * as ReactDOM from "react-dom";
import Button from '@material-ui/core/Button';
import { Provider } from 'react-redux';


export interface ButtonProps{
	container: Element|null
	color?: "primary"|"secondary"
	text?: string
	class_names?: string|string[]
}

// export interface ButtonState{
// 	color?: "primary"|"secondary"
// 	text?: string
// 	class_names?: string|string[]

// } 


export class ReduxButton extends React.Component <ButtonProps, any>{
	color: "primary"|"secondary" = "primary"
	text: string = "button text"
	class_names: string|string[] = "button"
	class_name: string = "button"
	container: Element|null = null
	// store: Store<any, any>
	constructor(props: ButtonProps){
		super(props)
		if(props.color !== undefined){
    	this.color = props.color
		}
		if(props.container !== undefined){
    	this.container = props.container
		}
		if( typeof(props.class_names) !== "string" &&  props.class_names !== undefined){
			this.class_name = props.class_names.join(" ")
		}
		else if(props.class_names !== undefined){
			this.class_name = props.class_names
		}

	}

	show(){	
		ReactDOM.render(this.render(), this.container);
	}

	render(){
		return (
			// <Provider store={this.store}>
	      <Button variant="contained" color={this.color} className={this.class_name}>
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