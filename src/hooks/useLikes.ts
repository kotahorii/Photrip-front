import { useCallback } from 'react'
import { Post } from 'types/postType'
import { User } from 'types/userType'
import { useLikeMutation } from './queries/useMutationFavorite'
import { useQueryFavorites } from './queries/useQueryFavorites'
import { useMain } from './useMain'

export const useLikes = () => {
  const { createLikeMutation, deleteLikeMutation } = useLikeMutation()
  const { data: favorites, isLoading: isLoadingFavorites } = useQueryFavorites()
  const { currentUser, usersPost } = useMain()

  const postsFavorites = useCallback(
    (post: Post | undefined) =>
      favorites?.filter((fav) => fav.postId === post?.id),
    [favorites]
  )
  const isLiked = useCallback(
    (post: Post | undefined) =>
      postsFavorites(post) &&
      postsFavorites(post)!.filter((fav) => fav.userId === currentUser?.id)
        .length > 0,
    [postsFavorites, currentUser]
  )
  const toggleLike = useCallback(
    (post: Post | undefined) => () => {
      if (isLiked(post)) {
        const fav = postsFavorites(post)?.filter(
          (fav) => fav.userId === currentUser?.id
        )[0]
        deleteLikeMutation.mutate({ id: fav?.id, postId: post?.id })
      } else {
        createLikeMutation.mutate({ postId: post?.id })
      }
    },
    [
      createLikeMutation,
      currentUser?.id,
      deleteLikeMutation,
      isLiked,
      postsFavorites,
    ]
  )
  const getAllFav = useCallback(
    (user: User | undefined) =>
      usersPost(user) === []
        ? 0
        : usersPost(user)
            ?.map(
              (post) =>
                favorites?.filter((fav) => fav.postId === post.id).length
            )
            .reduce((sum, cur) => sum! + cur!, 0),
    [usersPost, favorites]
  )
  return { postsFavorites, isLiked, toggleLike, isLoadingFavorites, getAllFav }
}
