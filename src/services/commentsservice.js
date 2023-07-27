import AuthService from "./authservice";
const API_URL = "https://localhost:7254/api/Comment/";
class CommentsService {
  create(cardid, text) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        cardId: cardid,
        text: text,
      })
    };
    return fetch((API_URL + "Create"),requestOptions);
  }
  update(id,text) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        text: text,
      })
    };
    return fetch((API_URL + "Update/"+id),requestOptions);
  }
  delete(id) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
    };
    return fetch((API_URL + "Delete/"+id),requestOptions);
  }

}

export default new CommentsService();