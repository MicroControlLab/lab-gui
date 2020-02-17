import { AnyAction, Dispatch } from 'redux'

import {
  AbstractCallback,
  AbstractControlPropRequirement,
  MinimalPropRequirement
} from './abstract-interfaces'
import { AbstractView } from './abstract-views'

export class AbstractControl extends AbstractView {
  public readonly componentClass: React.ComponentClass<
    MinimalPropRequirement,
    any
  > = AbstractControl
  public callbacks: AbstractCallback[] = []
  protected deactivatesUi: boolean = false

  constructor(props: MinimalPropRequirement) {
    super(props)
    // this.addReducer('UiActiveState', this.uiActiveReducer, true)
  }

  public addCallback(callback: (self: any) => any): void {
    this.callbacks = [...this.callbacks, callback]
  }

  public addDispatcher(name: string, callback: (self: any) => AnyAction): void {
    this.dispatchers = { ...this.dispatchers, [name]: callback }
  }

  protected cleanState() {
    const cleanedState = { ...this.state } as AbstractControlPropRequirement
    delete cleanedState.debug
    delete cleanedState.uiActive
    return cleanedState
  }
}
