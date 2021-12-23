import { useAppDispatch, useAppSelector } from 'app/hooks'
import { prefectures } from 'data/prefecture'
import { useMain } from 'hooks/useMain'
import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import {
  selectIsOpenDeletePostModal,
  setDetailPost,
  setIsOpenDeletePostModal,
} from 'slices/postSlice'
import { Post } from 'types/postType'
import { useMutationPosts } from './queries/useMutationPosts'
export type ModeType = 'myPosts' | 'likedPosts' | 'myPrefecturePosts'

export const useMyPage = () => {
  const { currentUser, posts } = useMain()
  const { deletePostMutation } = useMutationPosts()
  const dispatch = useAppDispatch()
  const isOpenDeletePostModal = useAppSelector(selectIsOpenDeletePostModal)
  const [postsMode, setPostsMode] = useState<ModeType>('myPosts')

  const changePostsMode = useCallback(
    (mode: ModeType) => () => setPostsMode(mode),
    []
  )
  const myPost = useCallback(
    () => posts?.filter((post) => post.userId === currentUser?.id),
    [currentUser, posts]
  )

  const likedPost = useCallback(
    () =>
      posts?.filter(
        (post) =>
          post.favorites.filter((fav) => fav.userId === currentUser?.id)
            .length > 0
      ),
    [posts]
  )

  const myPrefecturePosts = useCallback(
    () =>
      !currentUser?.prefecture
        ? null
        : posts?.filter(
            (post) =>
              post.prefecture === prefectures[currentUser?.prefecture - 1]
          ),
    [currentUser?.prefecture, posts]
  )

  const openDeletePostModal = useCallback(
    (post: Post) => () => {
      dispatch(setDetailPost(post))
      dispatch(setIsOpenDeletePostModal(true))
    },
    [dispatch]
  )

  const closeDeletePostModal = useCallback(
    () => dispatch(setIsOpenDeletePostModal(false)),
    [dispatch]
  )
  const deletePost = useCallback(
    (id: number) => () => {
      deletePostMutation.mutate(id)
      closeDeletePostModal()
      toast.success('投稿を削除しました')
    },
    [deletePostMutation, closeDeletePostModal]
  )

  return {
    myPost,
    likedPost,
    changePostsMode,
    postsMode,
    deletePost,
    isOpenDeletePostModal,
    openDeletePostModal,
    closeDeletePostModal,
    myPrefecturePosts,
  }
}
