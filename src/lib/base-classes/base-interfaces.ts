import { Action, AnyAction } from 'redux'

export interface MinimalPropRequirement {
  container: string | Element | null
  name: string
  debug?: boolean
}

export interface BaseControlPropRequirement extends MinimalPropRequirement {
  uiActive: boolean
}

export interface BaseTriggerPropRequirement extends BaseControlPropRequirement {
  changeUiActiveState: () => AnyAction
}

export interface BaseUiState {
  uiActive: boolean
}

export interface GlobalBaseUiState {
  UiActiveState: BaseUiState
}

export interface DataAction extends Action {
  data: any
}
