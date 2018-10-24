import { Store } from "redux"


import * as React from 'react'
import * as ReactDOM from "react-dom"
import Button from '@material-ui/core/Button'
import { Provider } from 'react-redux'
import { MinimalPropRequirement, ReduxComponentBaseClass} from "../base_classes"


export interface ButtonProps extends MinimalPropRequirement, DefaultButtonProps{
}

interface DefaultButtonProps{
	color?: "primary"|"secondary"
	text?: string
	class_names?: string|string[]
	disabled?: boolean
}

export class ReduxButton extends ReduxComponentBaseClass{
	static defaultProps: DefaultButtonProps = {
		color: "primary",
		text: "button text",
		class_names: "button"
	}
	color: ButtonProps["color"] = "primary"
	text: string = "button text"
	class_names: string|string[] = "button"
	className: string = "button"
	deactivates_ui: boolean = true

	constructor(props: ButtonProps){
		super(props)
  	this.color = props.color	
		if(typeof(props.class_names) !== "string" &&  props.class_names !== undefined){
			this.className = props.class_names.join(" ")
		}
		else if(typeof(props.class_names) === "string"){
			this.className = props.class_names
		}

	}

	is_disabled(){
		if((this.deactivates_ui && !this.uiActive)||(!this.deactivates_ui && this.uiActive)){
			this.setState({elementDisabled: true})
		}
		else{
			this.setState({elementDisabled: false})
		}
	}

	onClick(){
		this.uiActive = !this.uiActive
		this.is_disabled()
	}

	render(){
		return (
			<Provider store={this.store}>
	      <Button variant="contained" 
	      				color={this.color} 
	      				disabled={this.state.elementDisabled}
	      				className={this.className}
	      				onClick={() => {this.is_disabled()}}>
	        {this.text}
	      </Button>
	    </ Provider>
	  )
	}
}

export class StartBtn extends ReduxButton{
	constructor(props: ButtonProps){
		super(props)
		this.text = "Start" 
	}

	show():void{
		ReactDOM.render(< StartBtn 
			{...this}
			/>, 
			this.container);
	}
}

export class StopBtn extends ReduxButton{
	constructor(props: ButtonProps){
		super(props)
		this.text = "Stop"
		this.color = "secondary"
		this.deactivates_ui=false
		this.invertedActiveState = true
	}

	show():void{
		ReactDOM.render(< StopBtn {...this}	/>, 
			this.container);
	}
}