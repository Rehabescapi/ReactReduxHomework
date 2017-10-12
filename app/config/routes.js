import React from 'react'
import { Router ,IndexRoute, Route , Switch } from 'react-router-dom'
import {MainContainer, HomeContainer, AuthenticateContainer, NotFoundContainer}  from 'containers'

export default function getRoutes (checkAuth, history){
    return (
    <Router history ={history}>
        <MainContainer>
            <Switch>
            <Route exact={true} path='/' component={HomeContainer}/>
            <Route path ='/login' component={checkAuth(AuthenticateContainer)}/>
           

           <Route component={NotFoundContainer}/>
            </Switch>
        </MainContainer>
    </Router>
    )
}

