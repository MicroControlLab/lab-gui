import { AnyAction, Dispatch } from 'redux'

import {
  AbstractCallback,
  AbstractControlPropRequirement,
  MinimalPropRequirement
} from './abstract-interfaces'
import { AbstractView } from './abstract-view'

export class AbstractControl extends AbstractView {
  public readonly componentClass: React.ComponentClass<
    MinimalPropRequirement,
    any
  > = AbstractControl
  public callbacks: { [eventName: string]: AbstractCallback[] } = {}
  protected deactivatesUi: boolean = false
  protected defaultState: any

  constructor(props: MinimalPropRequirement) {
    super(props)
  }

  public addCallback(eventName: string, callback: (self: any) => any): void {
    /* tslint:disable-next-line:prefer-conditional-expression */
    if (eventName in this.callbacks) {
      this.callbacks[eventName] = [...this.callbacks[eventName], callback]
    } else {
      this.callbacks[eventName] = [callback]
    }
  }

  public addDispatcher(dispatcherName: string, callback: (self: any) => AnyAction): void {
    this.dispatchers = { ...this.dispatchers, [dispatcherName]: callback }
  }

  protected setInitState(): void {
    this.state = { ...this.defaultState, ...this.props, callbacks: this.callbacks }
  }

  protected callCallsbacks(eventName: string, self: any): void {
    const controlProps = this.props as AbstractControlPropRequirement
    if (controlProps.callbacks !== undefined) {
      this.callbackExecuter(eventName, self, controlProps.callbacks)
    }
    this.callbackExecuter(eventName, self, this.callbacks)
  }

  protected cleanState() {
    const cleanedState = { ...this.state } as AbstractControlPropRequirement
    delete cleanedState.debug
    delete cleanedState.uiActive
    delete cleanedState.callbacks
    return cleanedState
  }

  protected isDisabled(uiActive: boolean): boolean {
    if ((!this.invertedActiveState && !uiActive) || (this.invertedActiveState && uiActive)) {
      return true
    } else {
      return false
    }
  }

  private callbackExecuter(
    eventName: string,
    self: any,
    callbacks: { [eventName: string]: AbstractCallback[] }
  ): void {
    if (eventName in callbacks) {
      for (const callback of callbacks[eventName]) {
        callback(self)
      }
    }
  }
}
