import { useAppDispatch, useAppSelector } from 'app/hooks'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import {
  selectPreview,
  selectUserData,
  setPreview,
  setUserData,
} from 'slices/userSlice'
import { SignUpFormData } from 'types/userType'
import { useMutationAuth } from './queries/useMutationAuth'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const userData = useAppSelector(selectUserData)
  const preview = useAppSelector(selectPreview)
  const [isLogin, setIsLogin] = useState(true)

  const { signInMutation, signUpMutation, signOutMutation } = useMutationAuth()

  const toggleIsLogin = useCallback(() => setIsLogin(!isLogin), [isLogin])

  const changeAuthData = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      const name = e.target.name
      dispatch(setUserData({ ...userData, [name]: value }))
    },
    [dispatch, userData]
  )
  const changeIntroduction = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      dispatch(setUserData({ ...userData, introduction: e.target.value })),
    [dispatch, userData]
  )

  const prefectureChange = useCallback(
    (e: ChangeEvent<{ value: unknown }>) =>
      dispatch(
        setUserData({ ...userData, prefecture: e.target.value as number })
      ),
    [dispatch, userData]
  )

  const uploadImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setUserData({ ...userData, image: file }))
    },
    [dispatch, userData]
  )

  const previewImage = useCallback(
    (e) => {
      const file = e.target.files[0] as string
      dispatch(setPreview(window.URL.createObjectURL(file)))
    },
    [dispatch]
  )

  const imageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      uploadImage(e)
      previewImage(e)
    },
    [uploadImage, previewImage]
  )

  const resetPreview = useCallback(() => dispatch(setPreview('')), [dispatch])

  const createFormData = useCallback((): SignUpFormData => {
    const formData = new FormData()
    formData.append('name', userData.name)
    formData.append('email', userData.email)
    formData.append('password', userData.password)
    formData.append('passwordConfirmation', userData.passwordConfirmation)
    formData.append('prefecture', String(userData.prefecture))
    formData.append('image', userData.image)

    return formData
  }, [userData])

  const authUser = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      const data = createFormData()

      if (isLogin) {
        signInMutation.mutate({
          email: userData.email,
          password: userData.password,
        })
      } else {
        signUpMutation.mutate(data)
      }
    },
    [isLogin, createFormData, signInMutation, signUpMutation, userData]
  )

  const guestUserLogin = useCallback(
    () =>
      signInMutation.mutate({
        email: 'guest@guest.com',
        password: 'aaaaaa',
      }),
    [signInMutation]
  )

  const isLoadingGuestUser = useCallback(
    () => signInMutation.isLoading,
    [signInMutation]
  )

  const signOut = useCallback(() => signOutMutation.mutate(), [signOutMutation])

  const isValidAuth = isLogin
    ? !userData.email || userData.password.length < 6
    : !userData.name ||
      !userData.email ||
      !userData.prefecture ||
      userData.password.length < 6 ||
      userData.passwordConfirmation !== userData.password

  const isLoadingAuth = useCallback(
    () => (isLogin ? signInMutation.isLoading : signUpMutation.isLoading),
    [isLogin, signInMutation.isLoading, signUpMutation.isLoading]
  )

  return {
    userData,
    prefectureChange,
    preview,
    previewImage,
    uploadImage,
    imageChange,
    resetPreview,
    isLogin,
    toggleIsLogin,
    changeAuthData,
    changeIntroduction,
    authUser,
    signOut,
    isValidAuth,
    isLoadingAuth,
    guestUserLogin,
    isLoadingGuestUser,
  }
}
