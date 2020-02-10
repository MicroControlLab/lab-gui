import { AnyAction, Dispatch } from 'redux'

import { BaseUiState, CallBack, GlobalBaseUiState, MinimalPropRequirement } from './base-interfaces'
import { BaseView } from './base-views'

const initalBaseUiState: BaseUiState = {
  uiActive: false
}

export class BaseControl extends BaseView {
  public readonly componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseControl
  public defaultReducerNames: string[] = ['UiActiveState']
  public staticCallbacks: CallBack[] = []
  protected deactivatesUi: boolean = false

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.addReducer('UiActiveState', this.uiActiveReducer, true)
  }

  public addStaticCallback(callback: (args: any) => any, args: any): void {
    this.staticCallbacks = [...this.staticCallbacks, { callback, args }]
  }

  public addDispatcher(name: string, callback: (args: any) => AnyAction): void {
    this.dispatchers = { ...this.dispatchers, [name]: callback }
  }

  public getMapDispatchToProps(dispatchers: {
    [callbackName: string]: (args: object) => AnyAction
  }) {
    return (dispatch: Dispatch): { [callbackName: string]: (args: any) => AnyAction } => {
      const dispatchObj: { [callbackName: string]: (args: any) => AnyAction } = {}
      for (const callbackName in dispatchers) {
        if (dispatchers.hasOwnProperty(callbackName)) {
          const callback: (args: any) => AnyAction = dispatchers[callbackName]
          dispatchObj[callbackName] = (args: any) => dispatch(callback(args))
        }
      }
      return dispatchObj
    }
  }

  public getMapStateToProps(state: GlobalBaseUiState): object {
    return { uiActive: state.UiActiveState.uiActive }
  }

  protected uiActiveReducer(
    state: BaseUiState = initalBaseUiState,
    action: AnyAction
  ): BaseUiState {
    switch (action.type) {
      case 'ACTIVATE_UI':
        return { ...state, uiActive: true }
      case 'DEACTIVATE_UI':
        return { ...state, uiActive: false }
      default:
        return state
    }
  }
}
