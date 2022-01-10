import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback } from 'react'
import {
  resetDetailPost,
  resetEditPost,
  selectDetailPost,
  selectEditedPost,
  selectIsOpenDeletePostModal,
  selectLatAndLng,
  selectPostPreview,
  setDetailPost,
  setEditPost,
  setIsOpenDeletePostModal,
  setPostPreview,
} from 'slices/postSlice'
import { CreatePostFormData, Post } from 'types/postType'
import { User } from 'types/userType'
import { useMutationPosts } from './queries/useMutationPosts'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useQueryPosts } from './queries/useQueryPosts'
import { useDetailPost } from './useDetailPost'
import { useHeader } from './useHeader'

export const useMain = () => {
  const { data: currentUser, isLoading: isLoadingUser } = useQueryCurrentUser()
  const { data: posts, isLoading: isLoadingPosts } = useQueryPosts()
  const dispatch = useAppDispatch()
  const detailUserPost = useAppSelector(selectDetailPost)
  const { detailPost } = useDetailPost()
  const editedPost = useAppSelector(selectEditedPost)
  const latAndLng = useAppSelector(selectLatAndLng)
  const isOpenDeletePostModal = useAppSelector(selectIsOpenDeletePostModal)
  const { createPostMutation, updatePostMutation, deletePostMutation } =
    useMutationPosts()
  const postPreview = useAppSelector(selectPostPreview)
  const { closeCreatePostModal } = useHeader()

  // Railsから取得した日付を変換する関数
  const formatDate = useCallback((date: string) => {
    const formedDate = new Date(date)
    const y = formedDate.getFullYear()
    const M = ('00' + (formedDate.getMonth() + 1)).slice(-2)
    const d = ('00' + formedDate.getDate()).slice(-2)
    const h = ('00' + formedDate.getHours()).slice(-2)
    const m = ('00' + formedDate.getMinutes()).slice(-2)
    return `${y}/${M}/${d} ${h}:${m}`
  }, [])

  const changePost = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name
      const value = e.target.value
      dispatch(setEditPost({ ...editedPost, [name]: value }))
    },
    [dispatch, editedPost]
  )

  const changeBody = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setEditPost({ ...editedPost, body: e.target.value })),
    [dispatch, editedPost]
  )

  const uploadPostImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setEditPost({ ...editedPost, image: file }))
    },
    [dispatch, editedPost]
  )

  const previewImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setPostPreview(window.URL.createObjectURL(file)))
    },
    [dispatch]
  )

  const postImageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      uploadPostImage(e)
      previewImage(e)
    },
    [uploadPostImage, previewImage]
  )

  const resetPostPreview = useCallback(
    () => dispatch(setPostPreview('')),
    [dispatch]
  )

  // 画像を投稿するためにFormDataに変換
  const createFormData = useCallback((): CreatePostFormData => {
    const formData = new FormData()
    formData.append('id', String(editedPost.id))
    formData.append('title', editedPost.title)
    formData.append('body', editedPost.body)
    formData.append('prefecture', editedPost.prefecture)
    formData.append('city', editedPost.city)
    formData.append('town', editedPost.town)
    formData.append('lat', String(latAndLng.lat))
    formData.append('lng', String(latAndLng.lng))
    formData.append('image', editedPost.image)

    return formData
  }, [editedPost, latAndLng])

  // idがないときは新規投稿、idがあるときは編集なのでif文で場合分け
  const submitPost = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = createFormData()
      if (editedPost.id === 0) {
        createPostMutation.mutate(data)
      } else {
        updatePostMutation.mutate({ id: detailPost?.id, formData: data })
      }
      closeCreatePostModal()
      dispatch(resetEditPost())
      dispatch(resetPostPreview())
    },
    [
      createFormData,
      createPostMutation,
      updatePostMutation,
      dispatch,
      closeCreatePostModal,
      editedPost.id,
      detailPost?.id,
      resetPostPreview,
    ]
  )

  // あるユーザーの全ての投稿を取得
  const usersPost = useCallback(
    (user: User | undefined) =>
      posts?.filter((post) => post.userId === user?.id),
    [posts]
  )

  const closeDeletePostModal = useCallback(() => {
    dispatch(setIsOpenDeletePostModal(false))
    dispatch(resetDetailPost())
  }, [dispatch])

  const openDeletePostModal = useCallback(
    (post: Post) => () => {
      dispatch(setIsOpenDeletePostModal(true))
      dispatch(setDetailPost(post))
    },
    [dispatch]
  )

  // 投稿を削除する処理
  const deletePost = useCallback(
    (id: number) => () => {
      deletePostMutation.mutate(id)
      closeDeletePostModal()
    },
    [closeDeletePostModal, deletePostMutation]
  )

  // 入力された情報が必要十分かをBooleanで返す変数
  const validationCreatePost = useCallback(
    () =>
      !editedPost.title ||
      !editedPost.prefecture ||
      !editedPost.city ||
      !editedPost.town,
    [editedPost]
  )

  return {
    posts,
    postPreview,
    currentUser,
    isLoadingPosts,
    isLoadingUser,
    changePost,
    changeBody,
    editedPost,
    usersPost,
    submitPost,
    postImageChange,
    resetPostPreview,
    formatDate,
    isOpenDeletePostModal,
    closeDeletePostModal,
    openDeletePostModal,
    deletePost,
    validationCreatePost,
    detailUserPost,
  }
}
