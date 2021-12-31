import { useAppDispatch } from 'app/hooks'
import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { resetUserData } from 'slices/userSlice'
import { SignInData, AuthRes, User, SignUpFormData } from 'types/userType'

export const useMutationAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const signInMutation = useMutation(
    (data: SignInData) => client.post<AuthRes>('auth/sign_in', data),
    {
      onSuccess: (res) => {
        queryClient.setQueryData('user', res.data.data)
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])
        navigate('/main')
      },
      onError: () => {
        toast.error('ログインに失敗しました')
        dispatch(resetUserData())
      },
    }
  )

  const signUpMutation = useMutation(
    (data: SignUpFormData) => client.post<AuthRes>('auth', data),
    {
      onSuccess: (res) => {
        queryClient.setQueryData('user', res.data.data)
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])
        navigate('/main')
      },
      onError: () => {
        toast.error('新規登録に失敗しました')
        dispatch(resetUserData())
      },
    }
  )

  const signOutMutation = useMutation(
    () =>
      client.delete('auth/sign_out', {
        headers: {
          'access-token': Cookies.get('_access_token') as string,
          client: Cookies.get('_client') as string,
          uid: Cookies.get('_uid') as string,
        },
      }),
    {
      onSuccess: () => {
        const previousUser = queryClient.getQueryData<User>('user')
        if (previousUser) {
          queryClient.removeQueries('user')
        }
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')
        navigate('/')
      },
      onError: () => {
        toast.error('ログアウトに失敗しました')
      },
    }
  )

  return { signInMutation, signUpMutation, signOutMutation }
}
