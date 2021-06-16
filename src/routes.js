import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Register } from './components/Registration'
import { Login } from './components/Login'
import { Profile } from './components/Profile'
import { ArticleList } from './components/ArticleList'
import { ArticleDetail } from './components/ArticleDetail'

export const useRoutes = () => {
    return (
        <Switch>
            <Route path='/' exact>
                <ArticleList />
            </Route>
            <Route path='/profile' exact>
                <Profile />
            </Route>
            <Route path='/register' exact>
                <Register />
            </Route>
            <Route path='/login' exact>
                <Login />
            </Route>    
            <Route path='/:superRubric/:rubric' exact render={({match}) => (
                <ArticleList params={match.params} />
            )}>
            </Route>
            <Route path='/:id' exact render={({match}) => (
                <ArticleDetail id={match.params.id} />
            )}>
            </Route>
        </Switch>
    )
}