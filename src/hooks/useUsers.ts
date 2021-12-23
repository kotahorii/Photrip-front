import { useAppDispatch, useAppSelector } from 'app/hooks'
import { FormEvent, useCallback } from 'react'

import { useQueryUsers } from './queries/useQueryUsers'
import { toast } from 'react-toastify'
import { useAuth } from './useAuth'
import { useMutationUser } from './queries/useMutationUser'
import {
  selectDetailUser,
  setDetailUser,
  setIsOpenEditUserModal,
} from 'slices/userSlice'
import { UpdateUserFormData, User } from 'types/userType'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { Post } from 'types/postType'

export const useUsers = () => {
  const dispatch = useAppDispatch()
  const { data: users, isLoading: isLoadingUsers } = useQueryUsers()
  const { data: currentUser } = useQueryCurrentUser()
  const { updateUserMutation } = useMutationUser()
  const { userData } = useAuth()
  const detailUser = useAppSelector(selectDetailUser)
  const postsUser = useCallback(
    (post: Post) => users?.filter((user) => user.id === post.userId)[0],
    [users]
  )
  const openUsersPosts = useCallback(
    (user: User) => () => {
      dispatch(setDetailUser(user))
    },
    [dispatch]
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
      toast.success('ユーザーの更新に成功しました')
    },
    [currentUser, createEditFormData, updateUserMutation, dispatch]
  )

  return {
    users,
    postsUser,
    detailUser,
    openUsersPosts,
    updateUser,
    isLoadingUsers,
  }
}
