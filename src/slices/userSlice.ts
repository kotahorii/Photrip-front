import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SignUpData } from 'types/userType'
import { RootState } from '../app/store'

// ユーザー関連のReduxのSliceを定義
type StateType = {
  userData: SignUpData & { id: number }
  preview: string
  isOpenEditUserModal: boolean
}
const initialState: StateType = {
  userData: {
    id: 0,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    introduction: '',
    prefecture: 1,
    image: '',
  },
  preview: '',
  isOpenEditUserModal: false,
}
export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUserData: (
      state,
      action: PayloadAction<SignUpData & { id: number }>
    ) => {
      state.userData = action.payload
    },
    resetUserData: (state) => {
      state.userData = initialState.userData
    },
    setPreview: (state, action: PayloadAction<string>) => {
      state.preview = action.payload
    },
    setIsOpenEditUserModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenEditUserModal = action.payload
    },
  },
})
export const {
  setUserData,
  resetUserData,
  setPreview,
  setIsOpenEditUserModal,
} = userSlice.actions
export const selectUserData = (state: RootState) => state.user.userData
export const selectPreview = (state: RootState) => state.user.preview
export const selectIsOpenEditUserModal = (state: RootState) =>
  state.user.isOpenEditUserModal
export default userSlice.reducer
