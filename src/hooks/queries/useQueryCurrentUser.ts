import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { User } from 'types/userType'

const getCurrentUser = async () => {
  const { data } = await client.get<User>('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryCurrentUser = () => {
  return useQuery<User, Error>({
    queryKey: 'user',
    queryFn: getCurrentUser,
    staleTime: Infinity,
  })
}
