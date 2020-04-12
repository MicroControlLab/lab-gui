import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { AnyAction, Dispatch, Reducer, Store, createStore } from 'redux'

import {
  BaseUiState,
  DataAction,
  GlobalBaseUiState,
  MinimalPropRequirement,
} from './abstract-interfaces'

const dummyreducer = (state: any = {}, action: any) => state

interface DispatchObjectState {
  dispatchObj: { [callbackName: string]: (self: any) => Dispatch }
}

const initalBaseUiState: BaseUiState = {
  uiActive: false,
}

export class AbstractView extends React.Component<MinimalPropRequirement, any> {
  public readonly componentClass: React.ComponentClass<MinimalPropRequirement, any> = AbstractView
  public readonly name: string = 'pure ReduxComponentBaseClass'
  public readonly debug: boolean = false
  public readonly reducers: { [reducerName: string]: Reducer } = {}
  public invertedActiveState: boolean = false
  public uiActive: boolean = false
  public store: Store
  public defaultReducerNames: string[] = ['UiActiveState', 'data']
  public readonly hasData = true
  public readonly dataActionType: string
  protected containerElement: Element | null = null
  protected dispatchers: { [callbackName: string]: (self: any) => AnyAction } = {}

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.state = {}
    this.name = props.name
    this.dataActionType = this.name.toUpperCase()
    if (props.debug) {
      this.debug = props.debug
    }
    this.validateContainer(props.container)
    // this initialization of store just exists to satisfy TS lint
    this.store = createStore(dummyreducer)
    this.addReducer('UiActiveState', this.uiActiveReducer, true)
  }

  public show(): void {
    const Container = this.getReduxContainer()
    ReactDOM.render(
      <Provider store={this.store}>
        <Container {...this.props} {...this.state} />
      </Provider>,
      this.containerElement
    )
  }

  public render() {
    return (
      <h1>
        The element `{this.name}` an instance of an abstract class, which is not supposed to be used
        on its own but subclassed.
      </h1>
    )
  }

  public setStore(store: Store) {
    this.store = store
  }

  public addReducer(
    reducerName: string,
    reducer: Reducer,
    allowDefaultReducerOverwrite: boolean = false
  ): void {
    if (this.defaultReducerNames.indexOf(reducerName) > -1 && !allowDefaultReducerOverwrite) {
      this.warn(
        `The reducerName '${reducerName}', in the ` +
          `element with name '${this.name}' is part of the ` +
          `default reducers of that class. Changing it could lead to ` +
          `unexpected behavior. If you are absolutely sure this is what you ` +
          `want to do, you can use 'allowDefaultReducerOverwrite=true'`
      )
    } else if (reducerName in this.reducers) {
      throw new Error(
        `The reducerName '${reducerName}' of the ` +
          `element with name '${this.name}', is already in its reducers.`
      )
    }
    this.reducers[reducerName] = reducer
  }

  public getReducers(): { [reducerName: string]: Reducer } {
    return this.reducers
  }

  public mapStateToProps(state: GlobalBaseUiState): BaseUiState {
    return { uiActive: state.UiActiveState.uiActive }
  }

  public getMapDispatchToProps() {
    let dispatchObj: DispatchObjectState | {} = {}
    const dispatchers = this.dispatchers
    const totalDispatcher = (dispatch: Dispatch<AnyAction>) => {
      for (const callbackName in dispatchers) {
        if (dispatchers.hasOwnProperty(callbackName)) {
          const callback: (self: any) => AnyAction = dispatchers[callbackName]
          dispatchObj = { ...dispatchObj, [callbackName]: (self: any) => dispatch(callback(self)) }
        }
      }
      return dispatchObj
    }
    return totalDispatcher
  }

  public getReduxContainer() {
    const mapDispatchToProps = this.getMapDispatchToProps()
    const Container = connect(this.mapStateToProps, mapDispatchToProps)(this.componentClass)
    return Container
  }

  public debugLog(...args: any[]) {
    if (this.debug) {
      if (process.env.NODE_ENV !== 'production') {
        /* tslint:disable-next-line:no-console */
        console.warn('Debug message from the element with name: ', this.name)
        /* tslint:disable-next-line:no-console */
        console.log('The Attributes of this instance are: ', this)
        /* tslint:disable-next-line:no-console */
        console.log(...args)
      }
    }
  }

  public warn(...args: any[]) {
    if (process.env.NODE_ENV !== 'production') {
      /* tslint:disable-next-line:no-console */
      console.warn(...args)
    }
  }

  public setData(data: any): void {
    this.store.dispatch({
      data,
      type: this.dataActionType,
    })
  }

  protected validateContainer(container: MinimalPropRequirement['container']) {
    if (container instanceof Element) {
      this.containerElement = this.props.container as Element
    } else if (typeof container === 'string') {
      const selectedElements = document.querySelectorAll(container)
      if (selectedElements.length === 1) {
        this.containerElement = selectedElements[0]
      } else if (selectedElements.length === 0) {
        throw new Error(
          `The container selector of ${this.name} needs to match exactly one ` +
            `valid html element. The given value of container is ${container} ` +
            `and matches no element.`
        )
      } else {
        this.warn(
          `The container selector of ${this.name} needs to match exactly one ` +
            `valid html element. The given value of container is ${container} ` +
            `and matches:`
        )
        this.containerElement = selectedElements[0]
      }
    } else {
      throw new Error(
        `The container of ${this.name} needs to be a querySelector string or ` +
          `a valid html element. The given value was ${container}.`
      )
    }
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
