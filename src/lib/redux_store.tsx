// import { createStore, applyMiddleware, combineReducers } from 'redux'
// import { logger } from 'redux-logger'
// import { composeWithDevTools } from 'redux-devtools-extension'
// import rootReducer from './reducers'

// export default function configureStore(preloadedState = {}) {
//   const middlewares = [logger]
//   const middlewareEnhancer = applyMiddleware(...middlewares)
//   const composeEnhancers = composeWithDevTools({})
//   const composedEnhancers = composeEnhancers(middlewareEnhancer)
//   const store = createStore(rootReducer, preloadedState, composedEnhancers)

//   // allows hotswap for reducers
//   if (process.env.NODE_ENV !== 'production' && module.hot) {
//     module.hot.accept('./reducers', () => {
//       const nextReducer = require('./reducers/index').default
//       store.replaceReducer(nextReducer)
//     })
//   }
//   return store
// }
