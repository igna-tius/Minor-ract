import React,{Component} from "react";
import {Link} from "react-router-dom"
class WelcomeComponent extends Component{
	
	

	
	render(){

		return(
		<div>
		<h1>Welcome!</h1>
		<div className="container">
		 Welcome {this.props.user} .
		<br/>
		You can see your Posted queries <Link to="/queries">here</Link>.
		</div>
		
		</div> 
		);
	}
}
export default WelcomeComponent;