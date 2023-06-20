import AuthService from '../services/authservice';
const API_URL = "https://localhost:7254/api/Workplace/";

class WorkplaceService {
  get() {
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization':"Bearer "+AuthService.getCurrentUser().accessToken},
    };
    return  fetch((API_URL + "Get"),requestOptions);
  }


  create(name, description) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        name: name,
        description: description,
      })
    };
    return fetch((API_URL + "Create"),requestOptions);
  }
  delete(İD) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
    };
    return fetch((API_URL + "Delete/"+İD),requestOptions);
  }

}

export default new WorkplaceService();