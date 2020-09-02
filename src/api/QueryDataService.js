import axios from "axios";

class QueryDataService {
  retriveAllQuery(username) {
    return axios.get(`http://localhost:8080/users/${username}/queries`);
  }

  retriveAll() {
    return axios.get("http://localhost:8080/allquery");
  }

  retrieveQuery(username, id) {
    return axios.get(`http://localhost:8080/users/${username}/queries/${id}`);
  }
  editQuery(username, id, query) {
    return axios.put(
      `http://localhost:8080/users/${username}/queries/${id}`,
      query
    );
  }
  addQuery(username, query) {
    return axios.post(`http://localhost:8080/users/${username}/queries`, query);
  }

  deleteQuery(username, id) {
    return axios.delete(
      `http://localhost:8080/users/${username}/queries/${id}`
    );
  }

  retriveSolutions(id) {
    return axios.get(`http://localhost:8080//solutions/byqid/${id}`);
  }

  postSolution(solution, username, qid) {
    return axios.post(
      `http://localhost:8080/solutions/${username}/${qid}`,
      solution
    );
  }
}
export default new QueryDataService();
