import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import routePaths from './routePaths'
import { TeamContext } from '../../contexts/TeamContext'

import Header from '../../components/Header'
import Modals from '../Modals'

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
            <Modals />
            <Header />
            <Switch>
                {routes.map(r => <Route path={r.path} component={r.component} exact={r.exact} key={r.path} />)}
            </Switch>
        </Router>
    )
}

export default Routes