import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import postReducer from '../slices/postSlice'
import userReducer from '../slices/userSlice'

export const store = configureStore({
  reducer: {
    post: postReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
