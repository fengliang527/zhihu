import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Index from '../components/index'
import Detail from "../components/detail"
import Collect from '../components/collect'
import Short from '../components/short'
const routes = [
    {
        path: '/index',
        component: Index
    },
    {
        path: '/detail',
        component: Detail,
    },
     {path:'/collect',
        component:Collect
    },{path:'/short',
        component:Short
    },
     {
         path: '*',
         redirect: '/index'
     }
]
const Router = () => {
    return (
        <div><Switch>{
            routes.map((val, index) => {
                if(val.path==="*"){
                    return <Redirect key={index} to={val.redirect}/>
                }else{
                    return <Route key={index} path={val.path} component={val.component}/>
                }
            })
        }
        </Switch>
        </div>
    )
}
export default Router