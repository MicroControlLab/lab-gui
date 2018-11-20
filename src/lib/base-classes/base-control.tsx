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

	constructor(props: MinimalPropRequirement){
		super(props)
		this.reducers["UiActiveState"] = this.uiActiveReducer
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

	get_mapStateToProps(state: GlobalBaseUiState): object{
		return {uiActive: state.UiActiveState.uiActive}
	}

	get_mapDispatchToProps(dispatch: Dispatch){
		return {changeUiActiveState: (invertedActiveState: boolean) =>
			{dispatch(uiActiveAction(invertedActiveState))}
		}
	}
}


const uiActiveAction = (invertedActiveState: boolean):AnyAction => {
		if(invertedActiveState){
			return {type: "ACTIVATE_UI"}
		}
		else{
			return {type: "DEACTIVATE_UI"}
		}
	}