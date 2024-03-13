import { configureStore } from '@reduxjs/toolkit'
import MovieReducer from './reducers/MovieSlice'
import personReducer from './reducers/personSlice'
import tvReducer from './reducers/tvSlice'

export const store = configureStore({
  reducer: {
    movie: MovieReducer,
    person:personReducer,
    tv:tvReducer

  },
}) 