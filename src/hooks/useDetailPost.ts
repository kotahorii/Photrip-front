import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { useParams } from 'react-router'
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
  setPostPreview,
} from 'slices/postSlice'
import { Comment } from 'types/postType'
import { User } from 'types/userType'
import { useCommentMutation } from './queries/useMutationComment'
import { useQueryDetailPost } from './queries/useQueryDetailPost'
import { useUsers } from './useUsers'

// 投稿詳細画面で使用されている関数をまとめたカスタムフック
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
  // 折りたたみ要素を開閉する処理
  const toggleOpenDisclosure = useCallback(
    () => setOpenDisClosure(!openDisclosure),
    [openDisclosure]
  )

  const submitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      createCommentMutation.mutate({ postId: Number(id), comment: comment })
      setComment('')
    },
    [comment, createCommentMutation, id]
  )

  // あるコメントをしたユーザーを取得する処理
  const commentsUser = useCallback(
    (comment: Comment) =>
      users?.filter((user) => user.id === comment.userId)[0],
    [users]
  )

  // 画像を拡大表示するモーダルを開閉する処理
  const openImageModal = useCallback(() => {
    dispatch(setIsOpenImageModal(true))
  }, [dispatch])

  const closeImageModal = useCallback(() => {
    dispatch(setIsOpenImageModal(false))
  }, [dispatch])

  // 投稿したユーザーを取得
  const postUser = useCallback(
    (users: User[] | undefined) =>
      users?.filter((user) => user.id === detailPost?.userId)[0],
    [detailPost]
  )

  // 投稿編集モーダルを開く処理
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
      dispatch(setPostPreview(detailPost.image.url))
      dispatch(setLatAndLng({ lat: detailPost.lat, lng: detailPost.lng }))
    }
  }, [dispatch, detailPost, editedPost])

  // コメント削除モーダル開閉する処理
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

  // コメントを削除する処理
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
