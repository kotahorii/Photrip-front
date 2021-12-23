import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { Comment, CreateComment } from 'types/postType'

export const useCommentMutation = () => {
  const queryClient = useQueryClient()
  const createCommentMutation = useMutation(
    (data: CreateComment) =>
      client.post<Comment>('comments', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        const previousComments = queryClient.getQueryData<Comment[]>('comments')
        if (previousComments) {
          queryClient.setQueryData<Comment[]>('comments', [
            res.data,
            ...previousComments,
          ])
        }
      },
    }
  )
  return { createCommentMutation }
}
