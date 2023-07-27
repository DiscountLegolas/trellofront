import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import BoardService from '../../services/boardservice';
import CardListService from '../../services/cardlist';
import cardservice from '../../services/cardservice';
export const getBoard = createAsyncThunk("board/getBoard", async (data) => {
    let response = await BoardService.get(data["id"])
    let json = await response.json();
    return json;})
export const createCardList = createAsyncThunk("board/CardList/create", async (data) => {
      await CardListService.create(data["title"],data["boardid"])
      let response = await BoardService.get(data["boardid"])
      let json = await response.json();
      return json;})
export const createCard = createAsyncThunk("board/Card/create", async (data) => {
        let response=await cardservice.create(data["title"],data["cardlistid"])
        let json = await response.json();
        const cardlistid=data["cardlistid"]
        return [json,cardlistid];})
const initialState = {
  board: {},
  loaded: null
}


export const boardSlice = createSlice({
  name: 'board',
  initialState,
  extraReducers: {
    [getBoard.fulfilled]: (state, action) => {
      let updatedwps = action.payload;
      state.board = updatedwps;
      console.log(state.board)
      state.loaded = true;
    },
    [getBoard.pending]: (state) => {
      state.status = "Fetching todos. Please wait a moment...";
    },
    [getBoard.rejected]: (state) => {
      state.status = "Failed to fetch data...";
    },
    [createCardList.fulfilled]: (state,action) => {
      state.board=action.payload
      state.status = "Fetching todos. Please wait a moment...";
    },
    [createCard.fulfilled]: (state,action) => {
      let [card,cardlistid]=action.payload;
      let cardlistindex=state.board.lists.findIndex(x=>x.id==cardlistid);
      state.board.lists[cardlistindex].cards.push(card)
    },
  }
})


export default boardSlice.reducer