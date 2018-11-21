import { Store, Dispatch } from "redux"


import * as React from 'react'
import { CSSProperties } from 'react'
import * as ReactDOM from "react-dom"
import Button from '@material-ui/core/Button'
import { ButtonProps } from '@material-ui/core/Button'
import { Provider } from 'react-redux'

import { MinimalPropRequirement, BaseTrigger } from "../base-classes"

export interface LabUiButtonProps extends MinimalPropRequirement, DefaultButtonProps{
	name: string
}

interface DefaultButtonProps extends ButtonProps{
	text?: string
	class_names?: string|string[]
	inLineStyles?: CSSProperties
}

class ReduxButton extends BaseTrigger{
	component_class: React.ComponentClass<LabUiButtonProps, any> = ReduxButton
	defaultState: DefaultButtonProps = {
		color: "primary",
		text: "button text",
		class_names: "button",
		className: "button",
		variant: "contained",
		inLineStyles: {
			textTransform: "none",
		}
	}
	state: DefaultButtonProps = {}

	constructor(props: LabUiButtonProps){
		super(props)
		this.set_init_state()
	}

	set_init_state(): void{
		let cleanedProps = this.props as DefaultButtonProps
		this.state = {...this.defaultState, ...cleanedProps}
	}

	changeInlineStyles(styles: CSSProperties): void{
		this.state.inLineStyles = {...this.state.inLineStyles, ...styles}
	}

	changeSettings(updateState: DefaultButtonProps): void{
		this.state = {...this.state, ...updateState}
	}

	is_disabled(uiActive: boolean): boolean{
		if((this.deactivates_ui && !uiActive)||(!this.deactivates_ui && uiActive)){
			return  true
		}
		else{
			return false
		}
	}

	clickCallback():void{

	}

	render(){
		const {uiActive, changeUiActiveState} = this.props
		return (
			<Provider store={this.store}>
	      <Button variant={this.state.variant}
	      				color={this.state.color}
	      				disabled={this.is_disabled(uiActive)}
	      				className={this.state.className}
	      				style={this.state.inLineStyles}
	      				onClick={() => {
	      					changeUiActiveState({
	      						invertedActiveState: this.invertedActiveState}
	      						)
	      				}
	      			}>
	        {this.state.text}
	      </Button>
	    </ Provider>
	  )
	}
}

export class StartBtn extends ReduxButton{
	component_class = StartBtn

	constructor(props: LabUiButtonProps){
		super(props)
		this.defaultState.text = "Start"
		this.set_init_state()
	}
}

export class StopBtn extends ReduxButton{
	component_class = StopBtn

	constructor(props: LabUiButtonProps){
		super(props)
		this.defaultState.text = "Stop"
		this.defaultState.color = "secondary"
		this.set_init_state()
		this.deactivates_ui=false
		this.invertedActiveState = true
	}
}