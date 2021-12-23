import Cookies from 'js-cookie'
import client from 'lib/client'
import { useQuery } from 'react-query'
import { Comment } from 'types/postType'

const getComments = async () => {
  const { data } = await client.get<Comment[]>('comments', {
    headers: {
      'access-token': Cookies.get('_access_token') as string,
      client: Cookies.get('_client') as string,
      uid: Cookies.get('_uid') as string,
    },
  })
  return data
}
export const useQueryComments = () => {
  return useQuery<Comment[], Error>({
    queryKey: 'comments',
    queryFn: getComments,
    staleTime: 600000,
  })
}
