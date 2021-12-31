import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LatLngType, Post, UpdatePost } from 'types/postType'
import { RootState } from '../app/store'

type StateType = {
  editedPost: UpdatePost
  latAndLng: LatLngType
  detailPost: Post
  deleteCommentId: number
  postPreview: string
  searchedLabel: string
  searchPrefecture: number
  selectedOption: string
  isOpenCreatePostModal: boolean
  isOpenDeletePostModal: boolean
  isOpenShopModal: boolean
  isOpenHotelModal: boolean
  isOpenImageModal: boolean
  isOpenDeleteCommentModal: boolean
}

const initialState: StateType = {
  editedPost: {
    id: 0,
    body: '',
    title: '',
    prefecture: '',
    city: '',
    town: '',
    lat: 0,
    lng: 0,
    image: '',
  },
  latAndLng: {
    lat: 0,
    lng: 0,
  },
  detailPost: {
    title: '',
    body: '',
    prefecture: '',
    city: '',
    town: '',
    userId: 0,
    image: {
      url: '',
    },
    id: 0,
    createdAt: '',
    lat: 0,
    lng: 0,
    favorites: [],
    rates: [],
    labels: [],
    comments: [],
  },
  deleteCommentId: 0,
  postPreview: '',
  searchedLabel: '',
  searchPrefecture: 1,
  isOpenCreatePostModal: false,
  isOpenDeletePostModal: false,
  isOpenShopModal: false,
  isOpenHotelModal: false,
  isOpenImageModal: false,
  isOpenDeleteCommentModal: false,
  selectedOption: '1',
}

export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    setEditPost: (state, action: PayloadAction<UpdatePost>) => {
      state.editedPost = action.payload
    },
    resetEditPost: (state) => {
      state.editedPost = initialState.editedPost
    },
    setDetailPost: (state, action: PayloadAction<Post>) => {
      state.detailPost = action.payload
    },
    resetDetailPost: (state) => {
      state.detailPost = initialState.detailPost
    },
    setPostPreview: (state, action: PayloadAction<string>) => {
      state.postPreview = action.payload
    },
    setIsOpenCreatePostModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreatePostModal = action.payload
    },
    setIsOpenDeletePostModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDeletePostModal = action.payload
    },
    setIsOpenShopModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenShopModal = action.payload
    },
    setIsOpenHotelModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenHotelModal = action.payload
    },
    setSearchedLabel: (state, action: PayloadAction<string>) => {
      state.searchedLabel = action.payload
    },
    setSearchPrefecture: (state, action: PayloadAction<number>) => {
      state.searchPrefecture = action.payload
    },
    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload
    },
    setIsOpenImageModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenImageModal = action.payload
    },
    setLatAndLng: (state, action: PayloadAction<LatLngType>) => {
      state.latAndLng = action.payload
    },
    setIsOpenDeleteCommentModal: (state, action: PayloadAction<boolean>) => {
      state.isOpenDeleteCommentModal = action.payload
    },
    setDeleteCommentId: (state, action: PayloadAction<number>) => {
      state.deleteCommentId = action.payload
    },
  },
})

export const {
  setEditPost,
  resetEditPost,
  setDetailPost,
  resetDetailPost,
  setPostPreview,
  setIsOpenShopModal,
  setIsOpenHotelModal,
  setIsOpenCreatePostModal,
  setIsOpenDeletePostModal,
  setSearchedLabel,
  setSearchPrefecture,
  setSelectedOption,
  setDeleteCommentId,
  setIsOpenImageModal,
  setIsOpenDeleteCommentModal,
  setLatAndLng,
} = postSlice.actions
export const selectEditedPost = (state: RootState) => state.post.editedPost
export const selectDetailPost = (state: RootState) => state.post.detailPost
export const selectPostPreview = (state: RootState) => state.post.postPreview
export const selectIsOpenShopModal = (state: RootState) =>
  state.post.isOpenShopModal
export const selectIsOpenHotelModal = (state: RootState) =>
  state.post.isOpenHotelModal
export const selectIsOpenCreatePostModal = (state: RootState) =>
  state.post.isOpenCreatePostModal
export const selectIsOpenDeletePostModal = (state: RootState) =>
  state.post.isOpenDeletePostModal
export const selectSearchedLabel = (state: RootState) =>
  state.post.searchedLabel
export const selectSearchPrefecture = (state: RootState) =>
  state.post.searchPrefecture
export const selectSelectedOption = (state: RootState) =>
  state.post.selectedOption
export const selectIsOpenImageModal = (state: RootState) =>
  state.post.isOpenImageModal
export const selectLatAndLng = (state: RootState) => state.post.latAndLng
export const selectIsOpenDeleteCommentModal = (state: RootState) =>
  state.post.isOpenDeleteCommentModal
export const selectDeleteCommentId = (state: RootState) =>
  state.post.deleteCommentId
export default postSlice.reducer
