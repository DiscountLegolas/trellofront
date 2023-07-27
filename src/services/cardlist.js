import AuthService from "./authservice";
const API_URL = "https://localhost:7254/api/CardList/";
class CardListService {
  get(id) {
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization':"Bearer "+AuthService.getCurrentUser().accessToken},
    };
    return  fetch((API_URL + "Get/"+id),requestOptions);
  }


  create(Title, boardid) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        boardid: boardid,
        title: Title,
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

export default new CardListService();