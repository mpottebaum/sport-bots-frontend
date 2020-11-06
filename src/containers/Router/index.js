import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routePaths from './routePaths'

import LandingPage from '../LandingPage'

const routes = [
    { path: routePaths.Home, component: LandingPage, exact: true },
]


const Routes = () => (
    <Router>
        {routes.map(r => <Route path={r.path} component={r.component} exact={r.exact} key={r.path} />)}
    </Router>
)

export default Routes