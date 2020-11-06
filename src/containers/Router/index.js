import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routePaths from './routePaths'

import Landing from '../Landing'
import SignUp from '../SignUp'

const routes = [
    { path: routePaths.Home, component: Landing, exact: true },
    { path: routePaths.SignUp, component: SignUp, exact: true },
]


const Routes = () => (
    <Router>
        {routes.map(r => <Route path={r.path} component={r.component} exact={r.exact} key={r.path} />)}
    </Router>
)

export default Routes