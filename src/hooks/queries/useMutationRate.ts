import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { CreateRate, Post, UpdateRate } from 'types/postType'

export const useRateMutate = () => {
  const queryClient = useQueryClient()

  // 新規に評価する処理。成功時にレスポンスで帰ってきた情報で、React Queryの投稿一覧、投稿詳細のキャッシュを更新する。
  const createRateMutation = useMutation(
    (data: CreateRate) =>
      client.post<Post>('rates', data, {
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

  // 評価を更新する処理。成功時にレスポンスで帰ってきた情報で、React Queryの投稿一覧、投稿詳細のキャッシュを更新する。
  const updateRateMutation = useMutation(
    (data: UpdateRate) =>
      client.put<Post>(`rates/${data.id}`, data, {
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
  return { createRateMutation, updateRateMutation }
}
