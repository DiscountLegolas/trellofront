import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import commentsservice from '../../services/commentsservice'
const initialState = {list:[]}

export const createcomment = createAsyncThunk("comments/create", async (data) => {
  let response = await commentsservice.delete(data["id"])
  let json = await response.json();
  return json;})
export const updatecomment = createAsyncThunk("comments/update", async (data) => {
  let response = await commentsservice.delete(data["id"])
  let json = await response.json();
  return [data["id"],json];})
export const deletecomment = createAsyncThunk("comments/delete", async (data) => {
  return data["id"];})
const commentsslice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
      setlists(state,action) {
        state.list=action.payload
      },
    },
    extraReducers:{
      [createcomment.fulfilled]:(state,action)=>{
        state.list.push(action.payload);
      },
      [updatecomment.fulfilled]:(state,action)=>{
        let [id,comment]=action.payload
        const index = state.list.findIndex(x => x.id === id);
        state.list[index] = {
        ...state.list[index],
        ...comment,
      };
      },
      [deletecomment.fulfilled]:(state,action)=>{
        let index = state.list.findIndex(x => x.id === action.payload);
        state.list.splice(index, 1);
      }
    }
  })

  const { actions, reducer } = commentsslice
  export const { setlists } = actions;
  export default reducer;
