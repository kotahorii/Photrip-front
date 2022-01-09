import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { CreateLabel, Post } from 'types/postType'

export const useMutationLabels = () => {
  const queryClient = useQueryClient()

  // ラベルを新規作成する処理。成功時にレスポンスで帰ってきた情報で、React Queryの投稿一覧のキャッシュを更新する。
  const createLabelMutation = useMutation(
    (data: CreateLabel) =>
      client.post<Post>('labels', data, {
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
          toast.success('タグの作成に成功しました')
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
      onError: () => {
        toast.error('タグの作成に失敗しました')
      },
    }
  )

  // ラベルを削除する処理。成功時にレスポンスで帰ってきた情報で、React Queryの投稿一覧のキャッシュを更新する。
  const deleteLabelMutation = useMutation(
    (id: number) =>
      client.delete<Post>(`labels/${id}`, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        toast.success('タグの削除に成功しました')
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
      onError: () => {
        toast.error('タグの削除に失敗しました')
      },
    }
  )
  return { createLabelMutation, deleteLabelMutation }
}
