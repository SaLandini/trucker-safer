import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreateProblem from './pages/CreateProblem'
import ShowProblems from './pages/ShowProblems'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={CreateProblem} path="/create-problem" />
                <Route component={ShowProblems} path="/show-problems" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes