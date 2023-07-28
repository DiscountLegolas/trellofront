import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import workplaceservice from '../../services/workplaceservice';
import BoardService from '../../services/boardservice';
import boardservice from '../../services/boardservice';
export const getWorkplaces = createAsyncThunk("workplace/getWorkplaces", async () => {
    let response = await workplaceservice.get()
    let json = await response.json();
    return json.workPlaces;})

const initialState = {
  workplaces: [],
  loaded: null
}
export const createWorkplace=createAsyncThunk("workplace/create",async (data)=>{
  await workplaceservice.create(data["title"],data["desc"]);
  let response = await workplaceservice.get()
  let json = await response.json();
  return json.workPlaces;
})
export const deleteWorkplace=createAsyncThunk("workplace/delete",async (data)=>{
  await workplaceservice.delete(data["id"]);
  return data["id"];
})
export const createBoard=createAsyncThunk("board/create",async (data)=>{
  await BoardService.create(data["title"],data["workplaceıd"],data["picurl"]);
  let response = await workplaceservice.get()
  let json = await response.json();
  return json.workPlaces;
})
export const deleteBoard=createAsyncThunk("board/delete",async (data)=>{
  await boardservice.delete(data["id"]);
  return data["id"];
})
export const workplaceSlice = createSlice({
  name: 'workplace',
  initialState,
  extraReducers: {
    [getWorkplaces.fulfilled]: (state, action) => {

      let updatedwps = action.payload;
      state.workplaces = updatedwps;
      state.loaded = true;
    },
    [getWorkplaces.pending]: (state) => {
      state.status = "Fetching todos. Please wait a moment...";
    },
    [getWorkplaces.rejected]: (state) => {
      state.status = "Failed to fetch data...";
    },
    [createWorkplace.fulfilled]: (state, action) => {
      let updatedwps = action.payload;
      state.workplaces = updatedwps;
      state.loaded = true;
    },
    [deleteWorkplace.fulfilled]: (state, action) => {
      let updatedwps = state.workplaces.filter(x=>x.workplaceId!==action.payload);
      state.workplaces = updatedwps;
      state.loaded = true;
    },
    [createBoard.fulfilled]: (state, action) => {
      let updatedwps = action.payload;
      state.workplaces = updatedwps;
      state.loaded = true;
    },
    [deleteBoard.fulfilled]: (state, action) => {
      let boardıd=action.payload;
      let wps = state.workplaces;
      let wpindex = state.workplaces.findIndex(x=>x.boards.filter(e => e.id === boardıd).length > 0);
      let bindex=state.workplaces[wpindex].boards.findIndex(x=>x.id===boardıd)
      console.log(state.workplaces[wpindex].boards.splice(bindex,1))
      state.loaded = true;
    },
  }
})


export default workplaceSlice.reducer