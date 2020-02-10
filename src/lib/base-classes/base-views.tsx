import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { AnyAction, Dispatch, Reducer, Store, createStore } from 'redux'

import { MinimalPropRequirement } from './base-interfaces'

const dummyreducer = (state: any = {}, action: any) => state

interface DispatchObjectState {
  dispatchObj: { [callbackName: string]: Dispatch }
}

export class BaseView extends React.Component<MinimalPropRequirement, any> {
  public readonly componentClass: React.ComponentClass<MinimalPropRequirement, any> = BaseView
  public readonly name: string = 'pure ReduxComponentBaseClass'
  public readonly debug: boolean = false
  public readonly reducers: { [reducerName: string]: Reducer } = {}
  public invertedActiveState: boolean = false
  public uiActive: boolean = false
  public store: Store
  public defaultReducerNames: string[] = []
  protected container: Element | null = null
  protected dispatchers: { [callbackName: string]: (args: any) => AnyAction } = {}

  constructor(props: MinimalPropRequirement) {
    super(props)
    this.state = { dispatchObj: {} }
    this.name = props.name
    if (props.debug) {
      this.debug = props.debug
    }
    this.validateContainer(props.container)
    // this initialization of store just exists to satisfy TS lint
    this.store = createStore(dummyreducer)
  }

  public show(): void {
    const Container = this.getReduxContainer()
    ReactDOM.render(
      <Provider store={this.store}>
        <Container {...this.props} {...this.state} />
      </Provider>,
      this.container
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
          `unexpected behaviour. If you are absoulutly sure this is what you ` +
          `want to do, you can use 'allowDefaultReducerOverwrite=true'`
      )
    } else if (reducerName in this.reducers) {
      throw new Error(
        `The reducerName '${reducerName}' of the ` +
          `element with name '${this.name}', is allready in its reducers.`
      )
    }
    this.reducers[reducerName] = reducer
  }

  public getReducers(): { [reducerName: string]: Reducer } {
    return this.reducers
  }

  public getMapStateToProps(state: any): object {
    return {}
  }

  public getMapDispatchToProps(dispatchers: { [callbackName: string]: (args: any) => AnyAction }) {
    return {}
  }

  public getReduxContainer() {
    const mapDispatchToProps = this.getMapDispatchToProps(this.dispatchers)
    const Container = connect(this.getMapStateToProps, mapDispatchToProps)(this.componentClass)
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

  protected validateContainer(container: MinimalPropRequirement['container']) {
    if (container instanceof Element) {
      this.container = this.props.container as Element
    } else if (typeof container === 'string') {
      const selectedElements = document.querySelectorAll(container)
      if (selectedElements.length === 1) {
        this.container = selectedElements[0]
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
        this.container = selectedElements[0]
      }
    } else {
      throw new Error(
        `The container of ${this.name} needs to be a querySelector string or ` +
          `a valid html element. The given value was ${container}.`
      )
    }
  }
}
