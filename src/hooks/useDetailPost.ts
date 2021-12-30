import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { useCommentMutation } from './queries/useMutationComment'
import { useParams } from 'react-router'
import { useUsers } from './useUsers'
import { Comment } from 'types/postType'
import { useQueryDetailPost } from './queries/useQueryDetailPost'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import {
  selectDeleteCommentId,
  selectEditedPost,
  selectIsOpenDeleteCommentModal,
  selectIsOpenImageModal,
  setDeleteCommentId,
  setEditPost,
  setIsOpenCreatePostModal,
  setIsOpenDeleteCommentModal,
  setIsOpenImageModal,
  setLatAndLng,
} from 'slices/postSlice'
import { User } from 'types/userType'

export const useDetailPost = () => {
  const dispatch = useAppDispatch()
  const isOpenImageModal = useAppSelector(selectIsOpenImageModal)
  const isOpenDeleteCommentModal = useAppSelector(
    selectIsOpenDeleteCommentModal
  )
  const deleteCommentId = useAppSelector(selectDeleteCommentId)
  const { users } = useUsers()
  const { createCommentMutation, deleteCommentMutation } = useCommentMutation()
  const { id } = useParams()
  const {
    data: detailPost,
    isLoading: isLoadingDetailPost,
    isRefetching: isRefechingDetailPost,
  } = useQueryDetailPost(Number(id))
  const [comment, setComment] = useState('')
  const [openDisclosure, setOpenDisClosure] = useState(false)
  const editedPost = useAppSelector(selectEditedPost)

  const commentChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value),
    []
  )

  const toggleOpenDisclosure = useCallback(
    () => setOpenDisClosure(!openDisclosure),
    [openDisclosure]
  )

  const submitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createCommentMutation.mutate({ postId: Number(id), comment: comment })
      toast.success('コメントを作成しました')
      setComment('')
    },
    [comment, createCommentMutation, id]
  )

  const commentsUser = useCallback(
    (comment: Comment) =>
      users?.filter((user) => user.id === comment.userId)[0],
    [users]
  )

  const openImageModal = useCallback(() => {
    dispatch(setIsOpenImageModal(true))
  }, [dispatch])

  const closeImageModal = useCallback(() => {
    dispatch(setIsOpenImageModal(false))
  }, [dispatch])

  const postUser = useCallback(
    (users: User[] | undefined) =>
      users?.filter((user) => user.id === detailPost?.userId)[0],
    [detailPost]
  )
  const openEditPostModal = useCallback(() => {
    dispatch(setIsOpenCreatePostModal(true))
    if (detailPost) {
      dispatch(
        setEditPost({
          ...editedPost,
          id: detailPost.id,
          title: detailPost.title,
          body: detailPost.body,
          prefecture: detailPost.prefecture,
          city: detailPost.city,
          town: detailPost.town,
        })
      )
      dispatch(setLatAndLng({ lat: detailPost.lat, lng: detailPost.lng }))
    }
  }, [dispatch, detailPost, editedPost])

  const openDeleteCommentModal = useCallback(
    (id: number) => () => {
      dispatch(setDeleteCommentId(id))
      dispatch(setIsOpenDeleteCommentModal(true))
    },
    [dispatch]
  )

  const closeDeleteCommentModal = useCallback(() => {
    dispatch(setIsOpenDeleteCommentModal(false))
  }, [dispatch])

  const deleteComment = useCallback(() => {
    deleteCommentMutation.mutate(deleteCommentId)
    closeDeleteCommentModal()
  }, [closeDeleteCommentModal, deleteCommentId, deleteCommentMutation])

  return {
    comment,
    commentChange,
    openDisclosure,
    openEditPostModal,
    toggleOpenDisclosure,
    detailPost,
    isRefechingDetailPost,
    isLoadingDetailPost,
    commentsUser,
    submitComment,
    createCommentMutation,
    id,
    openImageModal,
    closeImageModal,
    isOpenImageModal,
    isOpenDeleteCommentModal,
    openDeleteCommentModal,
    closeDeleteCommentModal,
    postUser,
    deleteComment,
  }
}
