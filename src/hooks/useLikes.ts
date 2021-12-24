import { useCallback } from 'react'
import { Post } from 'types/postType'
import { User } from 'types/userType'
import { useLikeMutation } from './queries/useMutationFavorite'
import { useMain } from './useMain'

export const useLikes = () => {
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()
  const { currentUser, usersPost } = useMain()

  const isLiked = useCallback(
    (post: Post | undefined) =>
      !post
        ? 0
        : post.favorites.filter((fav) => fav.userId === currentUser?.id)
            .length > 0,
    [currentUser]
  )
  const toggleLike = useCallback(
    (post: Post | undefined) => () => {
      if (isLiked(post)) {
        const fav = post?.favorites.filter(
          (fav) => fav.userId === currentUser?.id
        )[0]
        deleteLikeMutation.mutate(fav?.id)
      } else {
        createLikeMutation.mutate({ postId: post?.id })
      }
    },
    [createLikeMutation, currentUser?.id, deleteLikeMutation, isLiked]
  )
  const getAllFav = useCallback(
    (user: User | undefined) =>
      usersPost(user) === []
        ? 0
        : usersPost(user)
            ?.map((post) => post.favorites.length)
            .reduce((sum, cur) => sum + cur, 0),
    [usersPost]
  )
  return { isLiked, toggleLike, getAllFav }
}
