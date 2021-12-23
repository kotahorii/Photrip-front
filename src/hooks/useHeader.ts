import {
  PencilAltIcon,
  PlusSmIcon,
  UserIcon,
  BookOpenIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import {
  resetEditPost,
  selectIsOpenCreatePostModal,
  setIsOpenCreatePostModal,
  setPostPreview,
} from 'slices/postSlice'
import {
  selectIsOpenEditUserModal,
  setIsOpenEditUserModal,
  setUserData,
} from 'slices/userSlice'
import { MenuType } from 'types/postType'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useAuth } from './useAuth'

export const useHeader = () => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useQueryCurrentUser()
  const { userData } = useAuth()
  const isOpenCreatePostModal = useAppSelector(selectIsOpenCreatePostModal)
  const isOpenEditUserModal = useAppSelector(selectIsOpenEditUserModal)
  const navigate = useNavigate()

  const openEditUserModal = useCallback(() => {
    if (currentUser) {
      dispatch(
        setUserData({
          ...userData,
          id: currentUser.id,
          name: currentUser.name,
          introduction: currentUser.introduction,
          prefecture: currentUser.prefecture,
        })
      )
      dispatch(setIsOpenEditUserModal(true))
    }
  }, [dispatch, currentUser, userData])

  const closeEditedUserModal = useCallback(() => {
    dispatch(setIsOpenEditUserModal(false))
  }, [dispatch])

  const openCreatePostModal = useCallback(() => {
    dispatch(setIsOpenCreatePostModal(true))
  }, [dispatch])

  const closeCreatePostModal = useCallback(() => {
    dispatch(resetEditPost())
    dispatch(setIsOpenCreatePostModal(false))
    dispatch(setPostPreview(''))
  }, [dispatch])

  const myPageNavigate = useCallback(() => {
    navigate('/myPage')
  }, [navigate])

  const menuItems: MenuType = [
    {
      name: 'プロフィール編集',
      icon: PencilAltIcon,
      onClick: openEditUserModal,
    },
    {
      name: '新規投稿',
      icon: PlusSmIcon,
      onClick: openCreatePostModal,
    },
  ]

  const responsiveItems: MenuType = [
    {
      name: 'マイページへ移動',
      icon: UserIcon,
      onClick: myPageNavigate,
    },
    {
      name: '投稿一覧',
      icon: BookOpenIcon,
      onClick: () => navigate('/main'),
    },
  ]

  return {
    isOpenCreatePostModal,
    isOpenEditUserModal,
    openEditUserModal,
    closeEditedUserModal,
    openCreatePostModal,
    closeCreatePostModal,
    myPageNavigate,
    menuItems,
    responsiveItems,
  }
}
