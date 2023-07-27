import Auth from "./authservice"
const API_URL = "https://localhost:7254/api/Member/";

class MemberService {
  filter(q){
    const requestOptions = {
      method: 'GET',
      headers: {'Authorization':"Bearer "+Auth.getCurrentUser().accessToken},
    };
    return  fetch((API_URL+"Filter/" +q),requestOptions);
  }
  addmember(userid,workid){
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json','Authorization':"Bearer "+Auth.getCurrentUser().accessToken},
      body: JSON.stringify({
        userId: userid,
        workplaceId: workid,
      })
    };
    return  fetch((API_URL+"Workplace/AddMember"),requestOptions);
  }
}

export default new MemberService();