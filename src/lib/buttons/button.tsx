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
	component_class: React.ComponentClass<ButtonProps, any> = ReduxButton
	color: ButtonProps["color"]
	text: string
	class_names: string|string[] = "button"
	className: string = "button"
	deactivates_ui: boolean = true

	constructor(props: ButtonProps){
		super(props)
		console.log(props)
  	this.color = props.color	
		if(typeof(props.class_names) !== "string" &&  props.class_names !== undefined){
			this.className = props.class_names.join(" ")
		}
		else if(typeof(props.class_names) === "string"){
			this.className = props.class_names
		}
		this.text = this.props.text
	}

	is_disabled(uiActive: boolean){
		if((this.deactivates_ui && !uiActive)||(!this.deactivates_ui && uiActive)){
			// this.setState({elementDisabled: true})
			return  true
		}
		else{
			return false
			// this.setState({elementDisabled: false})
		}
	}

	onClick(){
		this.uiActive = !this.uiActive
		// this.is_disabled()
	}

	render(){
		// console.log(this.props)
		const {uiActive, changeUiActiveState} = this.props
		return (
			<Provider store={this.store}>
	      <Button variant="contained" 
	      				color={this.color} 
	      				disabled={this.is_disabled(uiActive)}
	      				className={this.className}
	      				onClick={() => {changeUiActiveState(this.invertedActiveState)}}>
	        {this.text}
	      </Button>
	    </ Provider>
	  )
	}
}

export class StartBtn extends ReduxButton{
	component_class = StartBtn
	constructor(props: ButtonProps){
		super(props)
		this.text = "Start" 
	}
}

export class StopBtn extends ReduxButton{
	component_class = StopBtn
	constructor(props: ButtonProps){
		super(props)
		// this.text = "Stop"
		this.color = "secondary"
		this.deactivates_ui=false
		this.invertedActiveState = true
	}
}