import { Action, AnyAction } from 'redux'

export interface MinimalPropRequirement {
  container: string | Element | null
  name: string
  debug?: boolean
}

export interface AbstractControlPropRequirement extends MinimalPropRequirement {
  uiActive: boolean
  callbacks?: { [eventName: string]: AbstractCallback[] }
}

export interface DefaultControlProps {
  callbacks?: { [eventName: string]: AbstractCallback[] }
}

export interface AbstractTriggerPropRequirement extends AbstractControlPropRequirement {
  changeUiActiveState: () => AnyAction
}

export interface BaseUiState {
  uiActive: boolean
}

export interface GlobalBaseUiState {
  UiActiveState: BaseUiState
}

export type AbstractCallback = (self: any) => any

export interface DataAction extends Action {
  data: any
}
