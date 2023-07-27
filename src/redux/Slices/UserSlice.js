import  {createSlice} from '@reduxjs/toolkit';
import AuthService from '../../services/authservice';

const initialState = {
    user:AuthService.getCurrentUser()
}


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setuser(state, action) {
      state.user = action.payload
    },
  }
});


export const {  setuser } = userSlice.actions
export default userSlice.reducer;