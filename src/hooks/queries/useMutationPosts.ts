import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
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
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        const previousFavPosts = queryClient.getQueryData<Post[]>('postsFav')
        const previousRatePosts = queryClient.getQueryData<Post[]>('postsRate')
        const previousRateAve = queryClient.getQueryData<Post[]>('postsRateAve')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>('posts', [
            res.data,
            ...previousPosts,
          ])
        }
        if (previousFavPosts) {
          queryClient.setQueryData<Post[]>('postsFav', [
            res.data,
            ...previousFavPosts,
          ])
        }
        if (previousRatePosts) {
          queryClient.setQueryData<Post[]>('postsRate', [
            res.data,
            ...previousRatePosts,
          ])
        }
        if (previousRateAve) {
          queryClient.setQueryData<Post[]>('postsRateAve', [
            res.data,
            ...previousRateAve,
          ])
        }
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
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        const previousFavPosts = queryClient.getQueryData<Post[]>('postsFav')
        const previousRatePosts = queryClient.getQueryData<Post[]>('postsRate')
        const previousRateAve = queryClient.getQueryData<Post[]>('postsRateAve')
        const previousDetailPost = queryClient.getQueryData<Post>('post')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.map((post) =>
              post.id === variable.id ? res.data : post
            )
          )
        }
        if (previousFavPosts) {
          queryClient.setQueryData<Post[]>(
            'postsFav',
            previousFavPosts.map((post) =>
              post.id === variable.id ? res.data : post
            )
          )
        }
        if (previousRatePosts) {
          queryClient.setQueryData<Post[]>(
            'postsRate',
            previousRatePosts.map((post) =>
              post.id === variable.id ? res.data : post
            )
          )
        }
        if (previousRateAve) {
          queryClient.setQueryData<Post[]>(
            'postsRateAve',
            previousRateAve.map((post) =>
              post.id === variable.id ? res.data : post
            )
          )
        }
        if (previousDetailPost) {
          queryClient.setQueryData<Post>('post', res.data)
        }
      },
    }
  )
  const deletePostMutation = useMutation(
    (id: number) => client.delete(`posts/${id}`),
    {
      onSuccess: (res, variable) => {
        const previousPosts = queryClient.getQueryData<Post[]>('posts')
        const previousFavPosts = queryClient.getQueryData<Post[]>('postsFav')
        const previousRatePosts = queryClient.getQueryData<Post[]>('postsRate')
        const previousRateAve = queryClient.getQueryData<Post[]>('postsRateAve')
        if (previousPosts) {
          queryClient.setQueryData<Post[]>(
            'posts',
            previousPosts.filter((Post) => Post.id !== variable)
          )
        }
        if (previousFavPosts) {
          queryClient.setQueryData<Post[]>(
            'postsFav',
            previousFavPosts.filter((Post) => Post.id !== variable)
          )
        }
        if (previousRatePosts) {
          queryClient.setQueryData<Post[]>(
            'postsRate',
            previousRatePosts.filter((Post) => Post.id !== variable)
          )
        }
        if (previousRateAve) {
          queryClient.setQueryData<Post[]>(
            'postsRateAve',
            previousRateAve.filter((Post) => Post.id !== variable)
          )
        }
      },
    }
  )

  return { createPostMutation, updatePostMutation, deletePostMutation }
}
