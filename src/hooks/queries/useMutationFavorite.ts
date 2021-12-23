import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { CreateFavorite, Post } from 'types/postType'

export const useLikeMutation = () => {
  const queryClient = useQueryClient()
  const createLikeMutation = useMutation(
    (data: CreateFavorite) =>
      client.post<Post>('favorites', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        const previousDetailPost = queryClient.getQueryData<Post>('post')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.map((post) =>
              post.id === res.data.id ? res.data : post
            )
          )
        }
        if (previousDetailPost) {
          queryClient.setQueryData<Post>('post', res.data)
        }
      },
    }
  )
  const deleteLikeMutation = useMutation(
    (id: number | undefined) =>
      client.delete<Post>(`favorites/${id}`, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        const previousDetailPost = queryClient.getQueryData<Post>('post')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.map((post) =>
              post.id === res.data.id ? res.data : post
            )
          )
        }
        if (previousDetailPost) {
          queryClient.setQueryData<Post>('post', res.data)
        }
      },
    }
  )

  return { createLikeMutation, deleteLikeMutation }
}
