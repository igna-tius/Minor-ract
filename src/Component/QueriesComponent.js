import React,{Component} from "react";
import QueryDataService from "../api/QueryDataService.js";
import AuthenticationService from "./AuthenticationService.js"
import moment from "moment";
class QueriesComponent extends Component{
	constructor(props){
		super(props);
		this.state={
			queries:[],
			message:''
		}
		this.deleteQueryClicked=this.deleteQueryClicked.bind(this);
		this.updateQueryClicked=this.updateQueryClicked.bind(this);
		this.refreshQuery=this.refreshQuery.bind(this);
	}

	componentDidMount(){
		this.refreshQuery();
	}

	deleteQueryClicked(id){
		let username=AuthenticationService.getLoggedInUsername();
		QueryDataService.deleteQuery(username,id)
		.then(
			response=>{
				this.setState({message:`Delete of Query ${id} Successful`})
				this.refreshQuery();
			}
			)

	}

	updateQueryClicked(id){

		this.props.history.push(`/queries/${id}`)
	}


	refreshQuery(){
		let username=AuthenticationService.getLoggedInUsername();
		QueryDataService.retriveAllQuery(username)
		.then(
			response=>{
				this.setState({
					queries:response.data
				})
			})
	}

	render(){
		const querieslist=this.state.queries.map(m => <tr key={m.id}><td>{moment(m.querytDate).format("YYYY-MM-DD")}</td><td>{m.question}</td><td>{m.id}</td><td><i className="fas fa-trash-alt"  onClick={()=>this.deleteQueryClicked(m.id)}>delete</i></td><td><i className="fas fa-edit" onClick={()=>this.updateQueryClicked(m.id)}></i></td></tr>)
		return(
		<div>
		<br/>
			<h2>Queries</h2>
			<br/>
			{this.state.message && <div className="alert alert-success">{this.state.message}</div>}
			<br/>
			<div className="container">
			<table className="table">
			<thead>
				<tr>
					<th>Date</th>
					<th>Query</th>
					<th>Query id</th>
					<th></th>
					<th></th>
				</tr>
			</thead>
			<tbody>
			{querieslist}
			</tbody>
			</table>
			</div>
		</div> 

		);
	}
}


export default QueriesComponent;