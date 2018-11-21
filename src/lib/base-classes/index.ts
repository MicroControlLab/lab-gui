import { BaseView } from "./base-views"
import { BaseControl } from "./base-control"
import { Dispatch } from 'redux'
import { BaseTrigger } from "./base-triggers"


export interface MinimalPropRequirement{
	container: string|Element|null
	name: string
	debug?:boolean
}


export interface BaseUiState{
	uiActive: boolean
}

export interface GlobalBaseUiState{
	UiActiveState: BaseUiState
}

export { BaseView, BaseControl, BaseTrigger }