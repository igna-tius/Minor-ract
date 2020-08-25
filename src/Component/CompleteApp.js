import React,{Component} from "react";
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginRoute from "./LoginRoute";
import LoginComponent from "./LoginComponent";
import HeaderComponent from "./HeaderComponent";
import LogoutComponent from "./LogoutComponent";
import FooterComponent from "./FooterComponent";
import WelcomeComponent from "./WelcomeComponent";
import QueriesComponent from "./QueriesComponent";
import EditQuery from "./EditQuery";
import AuthenticationService from "./AuthenticationService"

class CompleteApp extends Component{
	constructor(props){
		super(props);
		this.state={
			login:false,
			user:""
		};
		this.hasLoggedIn=this.hasLoggedIn.bind(this);
		this.logout=this.logout.bind(this);
	}

	hasLoggedIn(name){
		this.setState({
			login:!this.state.login,
			user:name
		})
	}
	 
	logout(){
		AuthenticationService.logout()
		this.setState({
			login:false,
			user:""
		})
	}

	render(){
		return(
			<div>
			<Router>
				<HeaderComponent log={this.state.login} logout={this.logout} user={this.state.user}/>
				<div className="sarvekshan">
				<Switch>
					<LoginRoute  exact path="/" render={(routeProps)=><LoginComponent {...routeProps} fun={this.hasLoggedIn}/> }/>
					<LoginRoute path="/login" render={(routeProps)=><LoginComponent {...routeProps} fun={this.hasLoggedIn}/>}/>
					<AuthenticatedRoute path="/welcome/"  render={(routeProps)=><WelcomeComponent {...routeProps} user={this.state.user}/>}/>
					<AuthenticatedRoute path="/queries/:id" render={(routeProps)=><EditQuery {...routeProps}/>}/>
					<AuthenticatedRoute  path="/queries" render={(routeProps)=><QueriesComponent {...routeProps}/>}/>
					<AuthenticatedRoute path="/feeds"   render={(routeProps)=><QueriesComponent {...routeProps}/>}/>
					<AuthenticatedRoute path="/logout" render={(routeProps)=><LogoutComponent {...routeProps} log={this.state.login} fun={this.hasLoggedIn}/>}/>
					<Route component={ErrorComponent}/>
				</Switch>		
				</div>
				<FooterComponent/>
				
				</Router>
				</div>
			);
	}
}





function ErrorComponent(){
	return <div>I don't know what happend.Contact Help center.</div>
}

export default CompleteApp;