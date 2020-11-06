import React from 'react'

import TeamContextProvider from './contexts/TeamContext'
import Router from './containers/Router'

const  App = () => (
  <TeamContextProvider>
    <Router />
  </TeamContextProvider>
)

export default App;
