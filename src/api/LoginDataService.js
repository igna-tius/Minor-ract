import axios from "axios";

class LoginDataService{

	checkLogin(username,password){
		return axios.post("http://localhost:8080/login",{username,password})
	}

}

export default new LoginDataService();