import { configureStore } from '@reduxjs/toolkit'
import  workplaceSlice  from './Slices/Workplaceslice'

export const store = configureStore({
  reducer: {
    workplaces:workplaceSlice
  },
})

export default store;