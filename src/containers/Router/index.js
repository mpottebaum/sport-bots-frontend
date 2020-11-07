import React, { useContext } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import routePaths from './routePaths'
import { TeamContext } from '../../contexts/TeamContext'

import Landing from '../Landing'
import SignUp from '../SignUp'
import LogIn from '../LogIn'
import Roster from '../Roster'



const Routes = () => {
    const { team } = useContext(TeamContext)

    const routes = [
        { path: routePaths.Home, component: team ? Roster : Landing, exact: true },
        { path: routePaths.SignUp, component: SignUp, exact: true },
        { path: routePaths.LogIn, component: LogIn, exact: true },
    ]

    return (
        <Router>
            {routes.map(r => <Route path={r.path} component={r.component} exact={r.exact} key={r.path} />)}
        </Router>
    )
}

export default Routes