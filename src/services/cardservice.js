import AuthService from "./authservice";
const API_URL = "https://localhost:7254/api/Card/";
class CardService {

  create(Title, cardlistid) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        cardListId: cardlistid,
        title: Title,
      })
    };
    return fetch((API_URL + "Create"),requestOptions);
  }
  updateindex(cardlistid, index,id) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        cardlistid: cardlistid,
        index: index,
      })
    };
    return fetch((API_URL + "Update/"+id),requestOptions);
  }
  updatetitle(title,id) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        title: title,
      })
    };
    return fetch((API_URL + "Update/"+id),requestOptions);
  }
  updatedesc(desc,id) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json','Authorization':"Bearer "+AuthService.getCurrentUser().accessToken },
      body: JSON.stringify({
        description: desc,
      })
    };
    return fetch((API_URL + "Update/"+id),requestOptions);
  }

}

export default new CardService();