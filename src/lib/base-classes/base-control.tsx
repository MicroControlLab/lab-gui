import * as React from 'react'
import * as ReactDOM from "react-dom"
import { Reducer, AnyAction, Store, createStore, Dispatch } from 'redux'
import { connect, Provider } from "react-redux"


import { MinimalPropRequirement, BaseView, BaseUiState, GlobalBaseUiState } from "./"

const initalBaseUiState: BaseUiState = {
	uiActive: false
}

export class BaseControl extends BaseView{
	component_class: React.ComponentClass<MinimalPropRequirement, any> = BaseControl
	defaultReducerNames: string[] = ["UiActiveState"]
	// dispatches: {[callbackName:string]: {callback: Function, args: object|undefined}} = {}

	constructor(props: MinimalPropRequirement){
		super(props)
		this.reducers["UiActiveState"] = this.uiActiveReducer
	}

	addDispatch(name: string, callback: Function, args?: object){
		this.dispatchers = { ...this.dispatchers, [name]: callback}
	}

	getMapDispatchToProps(dispatchers: {[callbackName:string]: Function}) {
		return (dispatch: Dispatch):{[callbackName:string]:Dispatch} => {
			let dispatchObj: {[callbackName:string]:Dispatch} = {}
			for(let callbackName in dispatchers){
				let callback: Function = dispatchers[callbackName]
					dispatchObj[callbackName] = ( args ) => dispatch(callback(args))
			}
			return dispatchObj
		}

	}

	uiActiveReducer(state: BaseUiState=initalBaseUiState, action: AnyAction):BaseUiState{
		switch(action.type){
    	case "ACTIVATE_UI":
    		return {...state, uiActive: true}
    	case "DEACTIVATE_UI":
    		return {...state, uiActive: false}
    	default:
    		return state
		}
	}

	getMapStateToProps(state: GlobalBaseUiState): object{
		return {uiActive: state.UiActiveState.uiActive}
	}
}