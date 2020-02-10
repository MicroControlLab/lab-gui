import { BaseView } from './base-classes'
import { createStore, applyMiddleware, combineReducers, Reducer, AnyAction, Store } from 'redux'
import { logger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

export class UiGenerator {
  private store: Store | null = null
  private elementList: BaseView[] = []
  private elementNameList: string[] = []
  private reducers: { [reducerName: string]: Reducer } = {}

  add_element(element: BaseView) {
    if (!(this.elementNameList.indexOf(element.name) > -1)) {
      this.elementNameList = [...this.elementNameList, element.name]
      this.elementList = [...this.elementList, element]
    } else {
      console.warn(
        `A component with name '${element.name}' already exists, ` +
          `which is why the second component with name '${element.name}' wasn't added.` +
          `If you want to add the component, choose a different name.`
      )
    }
  }

  get_reducers(): void {
    for (let element of this.elementList) {
      const reducers = element.getReducers()
      for (let reducerName in reducers) {
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
  }

  get_store() {
    if (this.store) {
      return this.store
    } else {
      throw Error(
        "The store of the UiGenerator instance wasn't initialized yet, " +
          "please call the 'show' method before trying to access the store."
      )
    }
  }

  private configureStore(preloadedState = {}): Store {
    const middlewares = [logger]
    const middlewareEnhancer = applyMiddleware(...middlewares)
    const composeEnhancers = composeWithDevTools({})
    const composedEnhancers = composeEnhancers(middlewareEnhancer)
    const store = createStore(combineReducers(this.reducers), preloadedState, composedEnhancers)

    // allows hotswap for reducers
    if (process.env.NODE_ENV !== 'production' && module.hot) {
      module.hot.accept('./src', () => {
        store.replaceReducer(combineReducers(this.reducers))
      })
    }
    this.store = store
    return store
  }

  show() {
    this.get_reducers()
    const store = this.configureStore()
    for (let element of this.elementList) {
      element.setStore(store)
      element.show()
    }
  }
}
