import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { User } from 'types/userType'

// Rails APIにGETメソッドでアクセスし、ユーザー一覧を取得する処理
const getUsers = async () => {
  const { data } = await client.get<User[]>('users', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}

// 取得したレスポンス情報をReact Queryのキャッシュに格納する処理
export const useQueryUsers = () => {
  return useQuery<User[], Error>({
    queryKey: 'users',
    queryFn: getUsers,
    staleTime: 600000,
  })
}
