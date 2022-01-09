import client from 'lib/client'
import { useMutation, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { UpdateUserFormData, User } from 'types/userType'

type Data = {
  id: number | undefined
  formData: UpdateUserFormData
}

export const useMutationUser = () => {
  const queryClient = useQueryClient()

  // ユーザーの情報を編集する処理。成功時にレスポンスで帰ってきた情報でReact Queryのログイン中のユーザーとユーザー一覧のキャッシュを更新する。
  const updateUserMutation = useMutation(
    (data: Data) => client.put<User>(`users/${data.id}`, data.formData),
    {
      onSuccess: (res, variable) => {
        toast.success('ユーザーの更新に成功しました')
        queryClient.setQueryData<User>('user', res.data)
        const previousUsers = queryClient.getQueryData<User[]>('users')
        if (previousUsers) {
          queryClient.setQueryData<User[]>(
            'users',
            previousUsers.map((user) =>
              user.id === variable.id ? res.data : user
            )
          )
        }
      },
      onError: () => {
        toast.error('ユーザーの更新に失敗しました')
      },
    }
  )
  return { updateUserMutation }
}
