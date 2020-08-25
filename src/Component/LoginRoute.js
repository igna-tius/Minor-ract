import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

class LoginRoute extends Component {    
    render() {
        if(AuthenticationService.isUserLoggedIn()) {
            return <Redirect to="/queries"/>
        } else {
            return <Route {...this.props}/>
        }

    }
}

export default LoginRoute 