import React,{Component} from "react";
import AuthenticationService from "./AuthenticationService"
import LoginDataService from "../api/LoginDataService.js"


class LoginComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			username:'shubham',
			password:'',
			invalidCredentials:false,
			loginsuccess:false
		};
		this.hanldeChange=this.hanldeChange.bind(this);
		this.loginClicked=this.loginClicked.bind(this);
	}

	hanldeChange(event){
		this.setState({
			[event.target.name]:event.target.value
		})
	}

	loginClicked(){
		LoginDataService.checkLogin(this.state.username,this.state.password)
		.then(response=>{
			console.log(response);
			AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
			this.props.history.push(`welcome/${response.data.firstname}`);
			this.setState({
				invalidCredentials:false
			})
		})
		.catch(this.setState({invalidCredentials:true}))


		
	}

	render(){
		return(

			<div className="container">
			<br/>
			<br/>
			<h1>Login</h1>
			<br/>
			<br/>
				{this.state.invalidCredentials && <div className="alert alert-warning">Invalid Credentials!!!</div>}

				Username: <input type="text" name="username" value={this.state.username} onChange={this.hanldeChange}/>
				<br/>
				<br/>
				Password: <input type="password" name="password" value={this.state.password} onChange={this.hanldeChange}/>
				<br/>
				<br/>
				<button className="btn btn-success" onClick={this.loginClicked}>Login</button>
			</div>
			);
	}
}
export default LoginComponent;