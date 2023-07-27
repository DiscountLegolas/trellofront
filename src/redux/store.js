import { configureStore } from '@reduxjs/toolkit'
import  workplaceSlice  from './Slices/Workplaceslice';
import  boardslice  from './Slices/BoardSlice';
import  userSlice  from './Slices/UserSlice';
import Commentsslice from './Slices/Commentsslice';

export const store = configureStore({
  reducer: {
    workplaces:workplaceSlice,
    board:boardslice,
    user:userSlice,
    comments:Commentsslice
  },
})

export default store;