import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { CreateComment, Post } from 'types/postType'

export const useCommentMutation = () => {
  const queryClient = useQueryClient()
  const createCommentMutation = useMutation(
    (data: CreateComment) =>
      client.post<Post>('comments', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        toast.success('コメントの作成に成功しました')
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

  const deleteCommentMutation = useMutation(
    (id: number) =>
      client.delete<Post>(`comments/${id}`, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        toast.success('コメントの削除に成功しました')
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
        toast.error('コメント削除に失敗しました')
      },
    }
  )
  return { createCommentMutation, deleteCommentMutation }
}
