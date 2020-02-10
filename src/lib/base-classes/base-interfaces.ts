import { AnyAction } from 'redux'

export interface MinimalPropRequirement {
  container: string | Element | null
  name: string
  debug?: boolean
}

export interface BaseControlPropRequirement extends MinimalPropRequirement {
  uiActive: boolean
}

export interface BaseTriggerPropRequirement extends BaseControlPropRequirement {
  changeUiActiveState: (args: { invertedActiveState: boolean }) => AnyAction
}

export interface BaseUiState {
  uiActive: boolean
}

export interface GlobalBaseUiState {
  UiActiveState: BaseUiState
}

export interface CallBack {
  callback: (args: object) => any
  args: object
}
