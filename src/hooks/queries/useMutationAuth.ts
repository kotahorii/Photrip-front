import { useAppDispatch } from 'app/hooks'
import Cookies from 'js-cookie'
import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { resetUserData } from 'slices/userSlice'
import { AuthRes, SignInData, SignUpFormData, User } from 'types/userType'

// 認証データのPOST, PUT, DELETEメソッドを定義
export const useMutationAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  // ログインの処理。POSTメソッドでアクセスし、Headerの情報をCookieに格納する処理
  const signInMutation = useMutation(
    (data: SignInData) => client.post<AuthRes>('auth/sign_in', data),
    {
      onSuccess: (res) => {
        queryClient.setQueryData('user', res.data.data)
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])
        navigate('/')
      },
      onError: () => {
        toast.error('ログインに失敗しました')
        dispatch(resetUserData())
      },
    }
  )

  // 新規登録の処理。POSTメソッドでアクセスし、Headerの情報をCookieに格納する
  const signUpMutation = useMutation(
    (data: SignUpFormData) => client.post<AuthRes>('auth', data),
    {
      onSuccess: (res) => {
        queryClient.setQueryData('user', res.data.data)
        Cookies.set('_access_token', res.headers['access-token'])
        Cookies.set('_client', res.headers['client'])
        Cookies.set('_uid', res.headers['uid'])
        navigate('/')
      },
      onError: () => {
        toast.error('新規登録に失敗しました')
        dispatch(resetUserData())
      },
    }
  )

  // ログアウトの処理。成功時にCookieに保存されているHeaderの情報を削除して認証画面に遷移する
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
        dispatch(resetUserData())
        Cookies.remove('_access_token')
        Cookies.remove('_client')
        Cookies.remove('_uid')
        navigate('/auth')
      },
      onError: () => {
        toast.error('ログアウトに失敗しました')
      },
    }
  )

  return { signInMutation, signUpMutation, signOutMutation }
}
