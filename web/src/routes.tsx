import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreateProblem from './pages/CreateProblem'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={CreateProblem} path="/create-problem" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes