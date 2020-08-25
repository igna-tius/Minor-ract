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
import EditQuery from "./EditQuery"


class CompleteApp extends Component{
	constructor(props){
		super(props);
		this.state={login:false};
		this.hasLoggedIn=this.hasLoggedIn.bind(this);
	}

	hasLoggedIn(){
		this.setState({
			login:!this.state.login
		})
	}

	render(){
		return(
			<div>
			<Router>
				<HeaderComponent log={this.state.login} fun={this.hasLoggedIn}/>
				<div className="sarvekshan">
				<Switch>
					<LoginRoute  exact path="/" component={LoginComponent}/>
					<LoginRoute path="/login" component={LoginComponent}/>
					<AuthenticatedRoute path="/welcome/:name"component={WelcomeComponent}/>
					<AuthenticatedRoute path="/queries/:id" component={EditQuery}/>
					<AuthenticatedRoute  path="/queries"component={QueriesComponent}/>
					<AuthenticatedRoute path="/feeds" component={QueriesComponent}/>
					<AuthenticatedRoute path="/logout" component={LogoutComponent}/>
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