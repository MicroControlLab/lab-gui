import { Store } from "redux"


import * as React from 'react'
import * as ReactDOM from "react-dom"
import Button from '@material-ui/core/Button'
import { Provider } from 'react-redux'
import { MinimalPropRequirement, ReduxComponentBaseClass} from "../base_classes"


// export interface ButtonProps extends MinimalPropRequirement, DefaultButtonProps{
// }

interface ButtonProps{
	color?: "primary"|"secondary"
	text?: string
	class_names?: string|string[]
	className?: "button"
	disabled?: boolean
}

export class ReduxButton extends ReduxComponentBaseClass{
	component_class: React.ComponentClass<MinimalPropRequirement, any> = ReduxButton
	defaultState: ButtonProps = {
		color: "primary",
		text: "button text",
		class_names: "button",
		className: "button"
	}
	state: ButtonProps = {}
	deactivates_ui: boolean = true

	constructor(props: MinimalPropRequirement){
		super(props)
		this.set_init_state()
	}

	set_init_state():void{
		console.log("set_init_state", this.defaultState)
		let cleanedProps = this.props as ButtonProps
		this.state = {...this.defaultState, ...cleanedProps}
	}

	changeSettings(updateState: ButtonProps){
		this.state = {...this.defaultState, ...this.state, ...updateState}
		console.log("changeSettings", this.state)
	}

	is_disabled(uiActive: boolean){
		if((this.deactivates_ui && !uiActive)||(!this.deactivates_ui && uiActive)){
			return  true
		}
		else{
			return false
		}
	}

	onClick(){
		this.uiActive = !this.uiActive
	}

	render(){
		const {uiActive, changeUiActiveState} = this.props
		return (
			<Provider store={this.store}>
	      <Button variant="contained"
	      				color={this.state.color}
	      				disabled={this.is_disabled(uiActive)}
	      				className={this.state.className}
	      				onClick={() => {changeUiActiveState(this.invertedActiveState)}}>
	        {this.state.text}
	      </Button>
	    </ Provider>
	  )
	}
}

export class StartBtn extends ReduxButton{
	component_class = StartBtn

	constructor(props: MinimalPropRequirement){
		super(props)
		this.defaultState.text = "Start"
	}
}

export class StopBtn extends ReduxButton{
	component_class = StopBtn

	constructor(props: MinimalPropRequirement){
		super(props)
		this.defaultState.text = "Stop"
		this.defaultState.color = "secondary"
		this.set_init_state()
		this.deactivates_ui=false
		this.invertedActiveState = true
	}
}