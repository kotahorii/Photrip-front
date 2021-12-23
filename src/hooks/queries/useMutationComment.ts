import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
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
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>('posts', [res.data, ...previousPosts])
        }
      },
    }
  )
  return { createCommentMutation }
}
