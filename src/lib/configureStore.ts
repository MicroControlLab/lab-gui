import {
  Store,
  createStore,
  applyMiddleware,
  Reducer,
  combineReducers,
  ReducersMapObject
} from 'redux'
import { logger } from 'redux-logger'
// We'll be using Redux Devtools. We can use the `composeWithDevTools()`
// directive so we can pass our middleware along with it
import { composeWithDevTools } from 'redux-devtools-extension'
// If you use react-router, don't forget to pass in your history type.

export default function configureStore(
  // reducers: Reducer<any, any>[],
  reducers: ReducersMapObject,
  initialState: any
): Store<any> {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({})

  // We'll create our store with the combined reducers/sagas, and the initial Redux state that
  // we'll be passing from our entry point.
  const store = createStore(
    combineReducers(reducers),
    initialState,
    composeEnhancers(applyMiddleware(logger))
  )

  // allows hotswap for reducers
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers/index').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
