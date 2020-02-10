import { AnyAction, Dispatch } from 'redux'

import {
  BaseControlPropRequirement,
  BaseUiState,
  GlobalBaseUiState,
  MinimalPropRequirement
} from './base-interfaces'
import { BaseView } from './base-views'

export class BaseControl extends BaseView {
  public readonly componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseControl
  public callbacks: Function[] = []
  protected deactivatesUi: boolean = false

  constructor(props: MinimalPropRequirement) {
    super(props)
    // this.addReducer('UiActiveState', this.uiActiveReducer, true)
  }

  public addCallback(callback: (self: any) => any): void {
    this.callbacks = [...this.callbacks, callback]
  }

  public addDispatcher(name: string, callback: () => AnyAction): void {
    this.dispatchers = { ...this.dispatchers, [name]: callback }
  }

  protected cleanState() {
    const cleanedState = { ...this.state } as BaseControlPropRequirement
    delete cleanedState.debug
    delete cleanedState.uiActive
    return cleanedState
  }
}
