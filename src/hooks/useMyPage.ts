import { useAppDispatch, useAppSelector } from 'app/hooks'
import { prefectures } from 'data/prefecture'
import { useMain } from 'hooks/useMain'
import { useCallback, useState } from 'react'
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
  // マイページでどのタブを選択しているかを表す変数
  const [postsMode, setPostsMode] = useState<ModeType>('myPosts')

  const changePostsMode = useCallback(
    (mode: ModeType) => () => setPostsMode(mode),
    []
  )

  // 自分の投稿を取得
  const myPost = useCallback(
    () => posts?.filter((post) => post.userId === currentUser?.id),
    [currentUser, posts]
  )

  // いいねした全投稿を取得
  const likedPost = useCallback(
    () =>
      posts?.filter(
        (post) =>
          post.favorites.filter((fav) => fav.userId === currentUser?.id)
            .length > 0
      ),
    [currentUser?.id, posts]
  )

  // 自分の都道府県の全投稿を取得
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

  // 削除確認用のモーダルを開く処理
  const openDeletePostModal = useCallback(
    (post: Post) => () => {
      dispatch(setDetailPost(post))
      dispatch(setIsOpenDeletePostModal(true))
    },
    [dispatch]
  )
  // 削除確認用のモーダルを閉じる処理
  const closeDeletePostModal = useCallback(
    () => dispatch(setIsOpenDeletePostModal(false)),
    [dispatch]
  )
  // 投稿を削除する処理
  const deletePost = useCallback(
    (id: number) => () => {
      deletePostMutation.mutate(id)
      closeDeletePostModal()
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
