import {
  BookOpenIcon,
  PencilAltIcon,
  PlusSmIcon,
  UserIcon,
} from '@heroicons/react/outline'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router'
import {
  resetEditPost,
  selectIsOpenCreatePostModal,
  setIsOpenCreatePostModal,
  setPostPreview,
} from 'slices/postSlice'
import {
  resetUserData,
  selectIsOpenEditUserModal,
  setIsOpenEditUserModal,
  setPreview,
  setUserData,
} from 'slices/userSlice'
import { MenuType } from 'types/postType'
import { useQueryCurrentUser } from './queries/useQueryCurrentUser'
import { useAuth } from './useAuth'

// ヘッダーで使用されている関数をまとめたカスタムフック
export const useHeader = () => {
  const dispatch = useAppDispatch()
  const { data: currentUser } = useQueryCurrentUser()
  const { userData } = useAuth()
  const isOpenCreatePostModal = useAppSelector(selectIsOpenCreatePostModal)
  const isOpenEditUserModal = useAppSelector(selectIsOpenEditUserModal)
  const navigate = useNavigate()
  const location = useLocation()

  // ユーザー編集モーダルを開く処理
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
      dispatch(setPreview(currentUser.image.url))
      dispatch(setIsOpenEditUserModal(true))
    }
  }, [dispatch, currentUser, userData])

  const closeEditedUserModal = useCallback(() => {
    dispatch(setIsOpenEditUserModal(false))
    dispatch(resetUserData())
    dispatch(setPreview(''))
  }, [dispatch])

  // 新規投稿モーダルを開く処理
  const openCreatePostModal = useCallback(() => {
    dispatch(setIsOpenCreatePostModal(true))
  }, [dispatch])

  const closeCreatePostModal = useCallback(() => {
    dispatch(resetEditPost())
    dispatch(setIsOpenCreatePostModal(false))
    dispatch(setPostPreview(''))
  }, [dispatch])

  // マイページに遷移する処理
  const myPageNavigate = useCallback(() => {
    navigate('/myPage')
  }, [navigate])

  // ヘッダーのアイコンをクリックしたときに表示されるメニューを連想配列で定義
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

  // スマホサイズのとき追加で表示されるメニューを定義
  const responsiveItems: MenuType = [
    {
      name: 'マイページへ移動',
      icon: UserIcon,
      onClick: myPageNavigate,
    },
    {
      name: '投稿一覧',
      icon: BookOpenIcon,
      onClick: () => navigate('/'),
    },
  ]

  const onClickHelpPage = useCallback(() => navigate('/help'), [navigate])
  // ページトップに戻る処理
  const goToPageTop = useCallback(() => {
    window.scrollTo({
      top: 0,
    })
  }, [])

  return {
    isOpenCreatePostModal,
    isOpenEditUserModal,
    openEditUserModal,
    closeEditedUserModal,
    openCreatePostModal,
    closeCreatePostModal,
    menuItems,
    responsiveItems,
    onClickHelpPage,
    location,
    navigate,
    goToPageTop,
  }
}
