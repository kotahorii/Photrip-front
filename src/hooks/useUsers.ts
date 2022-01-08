import { useAppDispatch } from 'app/hooks'
import { FormEvent, useCallback } from 'react'
import { useQueryUsers } from './queries/useQueryUsers'
import { useAuth } from './useAuth'
import { useMutationUser } from './queries/useMutationUser'
import {
  setIsOpenEditUserModal,
} from 'slices/userSlice'
import { UpdateUserFormData } from 'types/userType'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { Post } from 'types/postType'

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { data: users, isLoading: isLoadingUsers } = useQueryUsers()
  const { data: currentUser } = useQueryCurrentUser()
  const { updateUserMutation } = useMutationUser()
  const { userData } = useAuth()

  // 投稿に対するユーザーを取得
  const postsUser = useCallback(
    (post: Post) => users?.filter((user) => user.id === post.userId)[0],
    [users]
  )

  const createEditFormData = useCallback((): UpdateUserFormData => {
    const formData = new FormData()
    formData.append('name', userData.name || '')
    formData.append('introduction', userData.introduction || '')
    formData.append('prefecture', String(userData.prefecture) || '')
    formData.append('image', userData.image)
    return formData
  }, [userData])

  const updateUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = {
        id: currentUser?.id,
        formData: createEditFormData(),
      }
      updateUserMutation.mutate(data)
      dispatch(setIsOpenEditUserModal(false))
    },
    [currentUser, createEditFormData, updateUserMutation, dispatch]
  )

  return {
    users,
    postsUser,
    updateUser,
    isLoadingUsers,
  }
}
