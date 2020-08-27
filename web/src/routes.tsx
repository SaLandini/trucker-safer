import React from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import CreatePoint from './pages/CreatePoint'
import ShowPoints from './pages/ShowPoints'

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={CreatePoint} path="/create-point" />
                <Route component={ShowPoints} path="/show-points" />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes