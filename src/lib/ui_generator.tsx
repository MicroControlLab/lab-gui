import { AnyAction, Reducer, Store, applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { logger } from 'redux-logger'

import { BaseView } from './base-classes'
import { DataAction } from './base-classes/base-interfaces'

export class UiGenerator {
  private store: Store | null = null
  private elementList: BaseView[] = []
  private elementNameList: string[] = []
  private elementDataActionTypeList: string[] = []
  private reducers: { [reducerName: string]: Reducer } = {}

  public addElement(element: BaseView) {
    if (!(this.elementNameList.indexOf(element.name) > -1)) {
      this.elementList = [...this.elementList, element]
      this.elementNameList = [...this.elementNameList, element.name]
      // needed to create the total data reducer
      this.elementDataActionTypeList = [...this.elementDataActionTypeList, element.dataActionType]
    } else {
      if (process.env.NODE_ENV !== 'production') {
        /* tslint:disable:no-console */
        console.warn(
          `A component with name '${element.name}' already exists, ` +
            `which is why the second component with name '${element.name}' wasn't added.` +
            `If you want to add the component, choose a different name.`
        )
      }
    }
  }

  public getReducers(): void {
    for (const element of this.elementList) {
      const reducers = element.getReducers()
      for (const reducerName in reducers) {
        if (
          reducerName in this.reducers &&
          !(element.defaultReducerNames.indexOf(reducerName) > -1)
        ) {
          throw Error(
            `The reducerName '${reducerName}' of the ` +
              `element with name '${element.name}', is already in reducers.`
          )
        } else {
          this.reducers[reducerName] = reducers[reducerName]
        }
      }
    }
    const totalDataReducer = this.getTotalDataReducer()
    this.reducers = { ...this.reducers, data: totalDataReducer }
  }

  public getStore() {
    if (this.store) {
      return this.store
    } else {
      throw Error(
        "The store of the UiGenerator instance wasn't initialized yet, " +
          "please call the 'show' method before trying to access the store."
      )
    }
  }

  public show() {
    this.getReducers()
    const store = this.configureStore()
    for (const element of this.elementList) {
      element.setStore(store)
      element.show()
    }
  }

  private getTotalDataReducer() {
    const elementDataActionTypeList = this.elementDataActionTypeList
    const elementNameList = this.elementNameList
    const totalDataReducer = (state: any = {}, action: AnyAction) => {
      const dataActionTypeIndex = elementDataActionTypeList.indexOf(action.type)
      if (dataActionTypeIndex > -1) {
        const dataName = `${elementNameList[dataActionTypeIndex]}_data`
        return { ...state, [dataName]: action.data }
      } else {
        return state
      }
    }
    return totalDataReducer
  }

  private configureStore(preloadedState = {}): Store {
    let store: Store
    if (process.env.NODE_ENV !== 'production') {
      const middlewares = [logger]
      const middlewareEnhancer = applyMiddleware(...middlewares)
      const composeEnhancers = composeWithDevTools({})
      const composedEnhancers = composeEnhancers(middlewareEnhancer)
      store = createStore(combineReducers(this.reducers), preloadedState, composedEnhancers)

      // allows hotswap for reducers
      if (module.hot) {
        module.hot.accept('./src', () => {
          store.replaceReducer(combineReducers(this.reducers))
        })
      }
    } else {
      store = createStore(combineReducers(this.reducers), preloadedState)
    }
    this.store = store
    return store
  }
}
