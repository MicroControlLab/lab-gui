import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from "react-redux"

import { MinimalPropRequirement , BaseControl } from "./"



export class BaseTrigger extends BaseControl{
	component_class: React.ComponentClass<MinimalPropRequirement, any> = BaseControl
	deactivates_ui: boolean = true

	constructor(props: MinimalPropRequirement){
		super(props)
		this.addDispatcher("changeUiActiveState", this.uiActiveAction)
	}

	uiActiveAction(args:{invertedActiveState: boolean}):AnyAction {
	if(args.invertedActiveState){
			// return {type: "ACTIVATE_UI"}
			return {type: "REQUEST_STOP_ACTION"}
		}
		else{
			return {type: "DEACTIVATE_UI"}
		}
	}

}