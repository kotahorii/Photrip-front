import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { CreatePostFormData, Post, UpdatePostFormData } from 'types/postType'

type UpdateData = {
  id: number | undefined
  formData: UpdatePostFormData
}

export const useMutationPosts = () => {
  const queryClient = useQueryClient()
  const createPostMutation = useMutation(
    (data: CreatePostFormData) =>
      client.post<Post>('posts', data, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res) => {
        toast.success('新規投稿に成功しました')
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>('posts', [
            res.data,
            ...previousPosts,
          ])
        }
      },
      onError: () => {
        toast.error('新規投稿に失敗しました')
      },
    }
  )
  const updatePostMutation = useMutation(
    (data: UpdateData) =>
      client.put<Post>(`posts/${data.id}`, data.formData, {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: (res, variable) => {
        toast.success('投稿の編集に成功しました')
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        const previousDetailPost = queryClient.getQueryData<Post>('post')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.map((post) =>
              post.id === variable.id ? res.data : post
            )
          )
        }
        if (previousDetailPost) {
          queryClient.setQueryData<Post>('post', res.data)
        }
      },
      onError: () => {
        toast.error('投稿の編集に失敗ました')
      },
    }
  )
  const deletePostMutation = useMutation(
    (id: number) => client.delete(`posts/${id}`),
    {
      onSuccess: (res, variable) => {
        toast.success('削除に成功しました')
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.filter((Post) => Post.id !== variable)
          )
        }
      },
      onError: () => {
        toast.error('削除に失敗しました')
      },
    }
  )

  return { createPostMutation, updatePostMutation, deletePostMutation }
}
