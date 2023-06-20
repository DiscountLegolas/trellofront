import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import workplaceservice from '../../services/workplaceservice';
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
export const deleteWorkplace=createAsyncThunk("workplace/create",async (data)=>{
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
  }
})


export default workplaceSlice.reducer