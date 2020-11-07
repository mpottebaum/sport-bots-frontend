import React from 'react'
import TeamContextProvider from './contexts/TeamContext'
import Router from './containers/Router'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './store/index'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const  App = () => (
  <TeamContextProvider>
    <ReduxProvider store={store}>
      <Router />
    </ReduxProvider>
  </TeamContextProvider>
)

export default App;
